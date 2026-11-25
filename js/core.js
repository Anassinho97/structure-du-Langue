(function () {
  'use strict';

  const levels = ['B1', 'B2', 'C1', 'C2'];
  const difficulties = ['Facile', 'Intermédiaire', 'Difficile', 'Expert'];
  const letters = ['A', 'B', 'C', 'D'];
  const dayMs = 86_400_000;
  const intervals = [600_000, dayMs, 3 * dayMs, 7 * dayMs, 14 * dayMs];
  const moduleNames = [
    'Articles et déterminants', 'Accords', 'Pronoms compléments', 'Pronoms relatifs',
    'Présent et impératif', 'Les temps du passé', 'Futur, conditionnel et hypothèse',
    'Subjonctif', 'Participes et gérondif', 'Passif et pronominaux', 'Concordance des temps',
    'Prépositions', 'Négation et interrogation', 'Comparaison et quantité', 'Connecteurs logiques',
    'Sens et nuances', 'Registres de langue', 'Expressions figées', 'Collocations', 'Homophones'
  ];
  const priorityModules = new Set([4, 8, 9, 12, 15, 16, 18, 19]);
  const key = 'tcf-structure-master.v1';
  const defaultSettings = {
    theme: 'light', language: 'both', motion: true, audio: true, voice: '',
    dailyGoal: 15, examDate: '2026-12-02', minutes: 25,
    confidence: true
  };
  const activeModes = new Set(['learning', 'practice', 'exam', 'errors', 'duel', 'sprint', 'traps', 'justify', 'diagnostic', 'review', 'remediation']);
  const fresh = () => ({ version: 1, settings: { ...defaultSettings }, attempts: [], notes: {}, favorites: [], cards: [], studied: [], active: null });
  const fold = value => String(value ?? '').normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
  const modId = value => String(value).padStart(2, '0');
  const pct = (part, whole) => whole ? Math.round(100 * part / whole) : 0;
  const textList = value => Array.isArray(value) ? value : value ? [value] : [];
  const norm = value => fold(value).replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
  const cleanText = value => String(value ?? '').trim();
  const hash = text => {
    let value = 2166136261;
    for (const char of text) value = Math.imul(value ^ char.codePointAt(0), 16777619);
    return value >>> 0;
  };

  const sources = [...(globalThis.TCF_MODULES ?? [])].sort((a, b) => a.id - b.id);
  const modules = moduleNames.map((title, index) => {
    const id = index + 1;
    const source = sources.find(module => module.id === id);
    return { ...(source ?? {}), id, title: source?.title ?? title, notions: source?.notions ?? {}, items: source?.items ?? [], questions: [] };
  });
  const questions = [];
  const byId = new Map();
  const notionByKey = new Map();

  for (const module of modules) {
    Object.entries(module.notions).forEach(([id, notion]) => {
      notionByKey.set(`${module.id}/${id}`, { ...notion, id, moduleId: module.id });
    });
    module.items.forEach((item, index) => {
      const [level, notionId, prompt, answer, a, b, c, clue, whyA, whyB, whyC, darija, difficulty] = item;
      const notion = notionByKey.get(`${module.id}/${notionId}`);
      const id = `TCF-${modId(module.id)}-${String(index + 1).padStart(3, '0')}`;
      const correct = (index + module.id - 1) % letters.length;
      const options = [a, b, c];
      const reasons = [whyA, whyB, whyC];
      const shuffle = hash(prompt) % 3;
      for (let count = 0; count < shuffle; count += 1) {
        options.push(options.shift());
        reasons.push(reasons.shift());
      }
      options.splice(correct, 0, answer);
      reasons.splice(correct, 0, clue);
      const difficultyIndex = typeof difficulty === 'number' && difficulty >= 0 && difficulty < 4
        ? difficulty
        : difficulties.findIndex(value => fold(value) === fold(difficulty));
      const q = {
        id, moduleId: module.id, theme: module.title, notionId, key: `${module.id}/${notionId}`,
        subtheme: notion?.title ?? String(notionId), notion, level, prompt, answer, options, correct,
        difficulty: difficultyIndex < 0 ? Math.max(0, levels.indexOf(level)) : difficultyIndex,
        full: prompt.replace('___', answer), clue, reasons, darija: darija || notion?.darija,
        rule: notion?.rule, memory: notion?.memory, examples: notion?.examples,
        do: notion?.do, avoid: notion?.avoid, trap: notion?.trap
      };
      questions.push(q);
      module.questions.push(q);
      byId.set(id, q);
    });
  }

  function shuffle(values, random = Math.random) {
    const result = values.slice();
    for (let index = result.length - 1; index > 0; index -= 1) {
      const next = Math.floor(random() * (index + 1));
      [result[index], result[next]] = [result[next], result[index]];
    }
    return result;
  }

  function dateKey(timestamp = Date.now()) {
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${modId(date.getMonth() + 1)}-${modId(date.getDate())}`;
  }

  function daysBetween(start, end) {
    return Math.round((Date.parse(end + 'T00:00:00Z') - Date.parse(start + 'T00:00:00Z')) / dayMs);
  }

  function sanitized(raw) {
    if (!raw || raw.version !== 1 || !Array.isArray(raw.attempts)) throw new Error('Format de sauvegarde inconnu.');
    const state = fresh();
    const input = raw.settings ?? {};
    state.settings = {
      theme: ['light', 'dark', 'system'].includes(input.theme) ? input.theme : 'light',
      language: ['fr', 'ary', 'both'].includes(input.language) ? input.language : 'both',
      motion: input.motion !== false, audio: input.audio !== false, voice: cleanText(input.voice).slice(0, 300),
      dailyGoal: Math.min(100, Math.max(1, Number(input.dailyGoal) || defaultSettings.dailyGoal)),
      examDate: /^\d{4}-\d{2}-\d{2}$/.test(input.examDate) && Number.isFinite(Date.parse(input.examDate)) ? input.examDate : defaultSettings.examDate,
      minutes: Math.min(240, Math.max(5, Number(input.minutes) || defaultSettings.minutes)),
      confidence: input.confidence !== false
    };
    const attempts = new Map();
    for (const item of raw.attempts) {
      const question = byId.get(item?.qid);
      if (!question || typeof item.id !== 'string' || item.id.length > 150 || !Number.isFinite(item.at) || item.at < 0
        || !Number.isInteger(item.choice) || item.choice < 0 || item.choice > 3) continue;
      attempts.set(item.id, {
        id: item.id, qid: item.qid, at: item.at, choice: item.choice, correct: item.choice === question.correct,
        ms: Math.max(0, Math.min(900_000, Number(item.ms) || 0)), confidence: ['certain', 'hesitate', 'guess'].includes(item.confidence) ? item.confidence : '',
        assisted: item.assisted === true, rationale: [true, false].includes(item.rationale) ? item.rationale : null,
        mode: activeModes.has(item.mode) ? item.mode : 'practice'
      });
    }
    state.attempts = [...attempts.values()].sort((a, b) => a.at - b.at);
    if (raw.notes && typeof raw.notes === 'object') {
      for (const [id, note] of Object.entries(raw.notes)) {
        if (byId.has(id) && typeof note === 'string') state.notes[id] = note.slice(0, 5000);
      }
    }
    const keys = (values, valid) => Array.isArray(values) ? [...new Set(values.filter(value => valid.has(value)))] : [];
    state.favorites = keys(raw.favorites, byId);
    state.cards = keys(raw.cards, notionByKey);
    state.studied = keys(raw.studied, notionByKey);
    const session = raw.active;
    if (session && typeof session.id === 'string' && activeModes.has(session.mode) && Array.isArray(session.ids)
      && session.ids.length && session.ids.every(id => byId.has(id)) && Array.isArray(session.responses)) {
      state.active = {
        ...session, ids: session.ids.slice(), responses: session.responses.filter(row => row && byId.has(row.qid)
          && Number.isInteger(row.choice) && row.choice >= 0 && row.choice < 4),
        position: Math.max(0, Math.min(session.ids.length - 1, Number.isInteger(session.position) ? session.position : 0)),
        deadline: Number.isFinite(session.deadline) ? session.deadline : null,
        pilot: Array.isArray(session.pilot) ? session.pilot.filter(id => session.ids.includes(id)) : [],
        stage: ['choose', 'rationale', 'feedback', 'summary'].includes(session.stage) ? session.stage : 'choose',
        started: Number(session.started) || Date.now(), entered: Number(session.entered) || Date.now()
      };
    }
    return state;
  }

  function load() {
    try {
      const saved = globalThis.localStorage?.getItem(key);
      return saved ? sanitized(JSON.parse(saved)) : fresh();
    } catch {
      return fresh();
    }
  }

  function save(state) {
    try {
      if (!globalThis.localStorage) return false;
      globalThis.localStorage.setItem(key, JSON.stringify(state));
      return true;
    } catch {
      return false;
    }
  }

  function evidence(state) {
    const perQuestion = new Map();
    const perNotion = new Map();
    const perModule = new Map();
    const perLevel = new Map();
    const dayCounts = new Map();
    const recent = state.attempts;
    let xp = 0;
    let correct = 0;
    let time = 0;
    let run = 0;
    let longest = 0;
    const push = (map, keyValue, item) => {
      if (!map.has(keyValue)) map.set(keyValue, []);
      map.get(keyValue).push(item);
    };
    for (const attempt of recent) {
      const question = byId.get(attempt.qid);
      if (!question) continue;
      const day = dateKey(attempt.at);
      const row = { ...attempt, question };
      push(perQuestion, question.id, row);
      push(perNotion, question.key, row);
      push(perModule, question.moduleId, row);
      push(perLevel, question.level, row);
      dayCounts.set(day, (dayCounts.get(day) ?? 0) + 1);
      time += attempt.ms;
      correct += Number(attempt.correct);
      xp += attempt.correct ? (attempt.confidence === 'guess' || attempt.assisted ? 5 : 10) : 2;
      run = attempt.correct ? run + 1 : 0;
      longest = Math.max(run, longest);
    }
    const activityDays = [...dayCounts.keys()].sort().reverse();
    let streak = 0;
    if (activityDays.length && daysBetween(activityDays[0], dateKey()) <= 1) {
      streak = 1;
      while (streak < activityDays.length && daysBetween(activityDays[streak], activityDays[streak - 1]) === 1) streak += 1;
    }
    return { perQuestion, perNotion, perModule, perLevel, dayCounts, xp, correct, time, run, longest, streak, recent };
  }

  const autonomous = row => row.correct && row.confidence !== 'guess' && !row.assisted && row.rationale !== false;

  function skillStatus(rows = []) {
    const latestByQuestion = [...new Map(rows.map(row => [row.qid, row])).values()].sort((a, b) => a.at - b.at).slice(-8);
    const total = latestByQuestion.length;
    const good = latestByQuestion.filter(autonomous);
    const accuracy = pct(good.length, total);
    const spaced = good.some((row, index) => index && row.at - good[0].at >= dayMs);
    if (!total) return { name: 'À découvrir', tier: 0, total, accuracy };
    if (good.length >= 5 && accuracy >= 80 && spaced) return { name: 'Maîtrisée', tier: 5, total, accuracy };
    if (good.length >= 3 && accuracy >= 70) return { name: 'Acquise', tier: 4, total, accuracy };
    if (good.length >= 2 && accuracy >= 50) return { name: 'En progression', tier: 3, total, accuracy };
    if (good.length || latestByQuestion.some(row => row.correct)) return { name: 'Fragile', tier: 2, total, accuracy };
    return { name: 'Non acquise', tier: 1, total, accuracy };
  }

  function schedule(rows = []) {
    let stage = 0;
    let due = null;
    const seen = new Set();
    for (const row of rows) {
      if (seen.has(row.id)) continue;
      seen.add(row.id);
      if (due === null) {
        due = row.at + intervals[0];
        continue;
      }
      if (!row.correct) {
        stage = Math.max(0, stage - 1);
        due = Math.min(due, row.at + intervals[0]);
      } else if (row.at >= due) {
        stage = autonomous(row) ? Math.min(intervals.length - 1, stage + 1) : Math.max(0, stage - 1);
        due = row.at + intervals[stage];
      }
    }
    return { due, stage };
  }

  function estimates(ev) {
    let estimate = '';
    for (const level of levels) {
      const rows = ev.perLevel.get(level) ?? [];
      const samples = [...new Map(rows.map(row => [row.qid, row])).values()].slice(-30);
      if (samples.length >= 8 && new Set(samples.map(row => row.question.moduleId)).size >= 3
        && pct(samples.filter(autonomous).length, samples.length) >= 75) estimate = level;
    }
    return estimate;
  }

  function weakNotions(ev) {
    return [...ev.perNotion.entries()].map(([id, rows]) => {
      const wrong = rows.filter(row => !row.correct);
      const distinct = new Set(wrong.map(row => row.qid)).size;
      const status = skillStatus(rows);
      return { id, rows, wrong, distinct, status, notion: notionByKey.get(id) };
    }).filter(entry => entry.distinct && entry.status.tier < 4)
      .sort((a, b) => b.distinct - a.distinct || a.status.accuracy - b.status.accuracy || b.wrong.at(-1).at - a.wrong.at(-1).at);
  }

  function reviewQueue(ev, now = Date.now()) {
    return [...ev.perNotion.entries()].map(([id, rows]) => ({ key: id, notion: notionByKey.get(id), rows, ...schedule(rows) }))
      .sort((a, b) => a.due - b.due)
      .map(row => ({ ...row, ready: row.due !== null && row.due <= now }));
  }

  function select(filters = {}, state = fresh()) {
    const ev = evidence(state);
    const onlyWeak = filters.weak ? new Set(weakNotions(ev).map(row => row.id)) : null;
    const search = fold(filters.search).trim();
    const moduleIds = filters.modules?.map(Number) ?? [];
    const excluded = new Set(filters.exclude ?? []);
    const pool = questions.filter(q =>
      (!filters.levels?.length || filters.levels.includes(q.level))
      && (!moduleIds.length || moduleIds.includes(q.moduleId))
      && (!filters.notion || filters.notion === q.key)
      && (!filters.notions?.length || filters.notions.includes(q.key))
      && (!Number.isInteger(filters.difficulty) || q.difficulty === filters.difficulty)
      && (!onlyWeak || onlyWeak.has(q.key))
      && (!search || fold([q.subtheme, q.rule, q.notion?.definition, q.clue].join(' ')).includes(search))
      && !excluded.has(q.id));
    let ordered = shuffle(pool);
    if (filters.unseen) ordered.sort((a, b) => Number(ev.perQuestion.has(a.id)) - Number(ev.perQuestion.has(b.id)));
    if (filters.progressive) ordered.sort((a, b) => a.difficulty - b.difficulty);
    if (filters.priority) ordered.sort((a, b) => Number(priorityModules.has(b.moduleId)) - Number(priorityModules.has(a.moduleId)));
    return ordered;
  }

  function spread(pool, count, groupBy) {
    const groups = new Map();
    for (const item of pool) {
      const group = groupBy(item);
      if (!groups.has(group)) groups.set(group, []);
      groups.get(group).push(item);
    }
    const result = [];
    while (result.length < count && groups.size) {
      for (const [group, items] of groups) {
        result.push(items.shift());
        if (!items.length) groups.delete(group);
        if (result.length === count) break;
      }
    }
    return result;
  }

  function plan(state, ev = evidence(state)) {
    const remaining = daysBetween(dateKey(), state.settings.examDate);
    const weak = weakNotions(ev).slice(0, 5);
    const urgent = reviewQueue(ev).filter(item => item.ready);
    const minutes = state.settings.minutes;
    const timed = remaining >= 0 && remaining <= 14 && minutes >= 18;
    const suggested = Math.min(state.settings.dailyGoal, Math.max(5, Math.floor((minutes - (timed ? 15 : 0)) * 0.85)));
    return { remaining, weak, urgent, minutes, timed, suggested };
  }

  function makeSession(mode, pool, count, extra = {}, now = Date.now()) {
    const list = pool.slice(0, count);
    if (!list.length) return null;
    return {
      id: globalThis.crypto?.randomUUID?.() ?? `${now}-${Math.random().toString(36).slice(2)}`,
      mode, ids: list.map(q => q.id), position: 0, responses: [], stage: 'choose',
      started: now, entered: now, deadline: extra.seconds ? now + extra.seconds * 1000 : null,
      pilot: extra.pilot ?? [], unlimited: extra.unlimited ?? false,
      label: extra.label ?? '', hint: false
    };
  }

  function makeExam(count, now = Date.now()) {
    if (![18, 23].includes(count) || questions.length < count) return null;
    const pool = shuffle(questions);
    const quotas = [['B1', 3], ['B2', 6], ['C1', 6], ['C2', 3]];
    const scored = [];
    for (const [level, wanted] of quotas) {
      scored.push(...spread(pool.filter(q => q.level === level), wanted, q => q.moduleId));
    }
    if (scored.length !== 18) return null;
    const used = new Set(scored.map(q => q.id));
    const pilots = count === 23 ? spread(pool.filter(q => !used.has(q.id)), 5, q => q.moduleId) : [];
    const ordered = [...scored, ...pilots].sort((a, b) => a.difficulty - b.difficulty);
    return makeSession('exam', ordered, count, { seconds: 900, pilot: pilots.map(q => q.id) }, now);
  }

  function logAttempt(state, session, response) {
    const q = byId.get(response.qid);
    const id = `${session.id}:${response.qid}`;
    const previous = state.attempts.find(row => row.id === id);
    if (previous) return previous;
    const row = { ...response, id, mode: session.mode, correct: response.choice === q.correct };
    state.attempts.push(row);
    return row;
  }

  function examResult(session) {
    const scored = session.ids.filter(id => !session.pilot.includes(id));
    const answers = new Map(session.responses.map(row => [row.qid, row]));
    const answerRows = scored.map(id => {
      const q = byId.get(id);
      const response = answers.get(id);
      return { q, response, correct: response?.choice === q.correct };
    });
    const correct = answerRows.filter(row => row.correct).length;
    const theme = new Map();
    answerRows.forEach(row => {
      const current = theme.get(row.q.moduleId) ?? { total: 0, correct: 0, module: row.q.theme };
      current.total += 1;
      current.correct += Number(row.correct);
      theme.set(row.q.moduleId, current);
    });
    return {
      answerRows, correct, scored: scored.length, percent: pct(correct, scored.length),
      time: answerRows.filter(row => row.response).reduce((sum, row) => sum + row.response.ms, 0),
      answered: answerRows.filter(row => row.response).length, theme
    };
  }

  globalThis.TCF = {
    levels, difficulties, letters, modules, questions, byId, notionByKey, priorityModules, defaultSettings,
    fresh, sanitized, load, save, evidence, skillStatus, schedule, reviewQueue, weakNotions, select, spread, plan,
    makeSession, makeExam, logAttempt, examResult, estimates, autonomous, pct, shuffle, dateKey, daysBetween, fold, norm, textList, modId
  };
})();
