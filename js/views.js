(function () {
  'use strict';
  const T = globalThis.TCF;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  const count = value => new Intl.NumberFormat('fr-FR').format(value);
  const date = (value, long = false) => new Intl.DateTimeFormat('fr-FR', long ? { dateStyle: 'long' } : { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(value));
  const duration = value => value < 60_000 ? `${Math.round(value / 1000)} s` : `${Math.floor(value / 60_000)} min`;
  const clock = value => `${String(Math.floor(value / 60)).padStart(2, '0')}:${String(value % 60).padStart(2, '0')}`;
  const marks = {
    home: '<path d="M3 11 12 3l9 8v9a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.2"/><rect x="14" y="3" width="7" height="7" rx="1.2"/><rect x="3" y="14" width="7" height="7" rx="1.2"/><rect x="14" y="14" width="7" height="7" rx="1.2"/>',
    path: '<circle cx="5" cy="18" r="2"/><circle cx="19" cy="5" r="2"/><path d="M7 18h8a3 3 0 0 0 0-6H8a3.5 3.5 0 0 1 0-7h9"/>',
    layers: '<path d="m3 8 9-5 9 5-9 5-9-5Zm0 5 9 5 9-5m-18 5 9 5 9-5"/>',
    book: '<path d="M3 5c3-1 6-1 9 1 3-2 6-2 9-1v14c-3-1-6-1-9 1-3-2-6-2-9-1V5Zm9 1v14"/>',
    bolt: '<path d="m13 2-9 12h7l-1 8 10-12h-7l1-8Z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',
    note: '<path d="M5 3h10l4 4v14H5V3Zm9 0v5h5M8 12h8m-8 4h6"/>',
    rotate: '<path d="M20 7v5h-5M4 17v-5h5"/><path d="M20 12a8 8 0 0 0-14-5m-2 5a8 8 0 0 0 14 5"/>',
    cards: '<rect x="4" y="3" width="13" height="16" rx="2"/><path d="M17 7h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9m-2-13h7m-7 4h5"/>',
    stats: '<path d="M4 20h16M7 16v-4m5 4V8m5 8V4"/>',
    settings: '<path d="M4 7h16M4 12h16M4 17h16"/><circle cx="9" cy="7" r="2" fill="currentColor"/><circle cx="16" cy="12" r="2" fill="currentColor"/><circle cx="10" cy="17" r="2" fill="currentColor"/>',
    flag: '<path d="M5 21V3m0 1c4-3 8 3 14 0v11c-6 3-10-3-14 0"/>',
    chevron: '<path d="m9 6 6 6-6 6"/>',
    arrow: '<path d="M4 12h15m-6-6 6 6-6 6"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    flame: '<path d="M13 3c2 4 5 6 5 10a6 6 0 0 1-12 1c0-2 1-4 3-6 0 3 1 3 2 3 2-2 3-4 2-8Z"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    moon: '<path d="M20 15A9 9 0 0 1 9 4a8.5 8.5 0 1 0 11 11Z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2m0-14-2 2M7 17l-2 2"/>',
    audio: '<path d="M4 9h4l5-4v14l-5-4H4V9Zm12 0a4 4 0 0 1 0 6m2-9a8 8 0 0 1 0 12"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    close: '<path d="m6 6 12 12M6 18 18 6"/>',
    heart: '<path d="M20 6a4 4 0 0 0-6 0l-2 2-2-2a4 4 0 0 0-6 6l8 8 8-8a4 4 0 0 0 0-6Z"/>',
    download: '<path d="M12 3v12m-4-4 4 4 4-4M4 16v4h16v-4"/>',
    trophy: '<path d="M8 3h8v7a4 4 0 1 1-8 0V3ZM8 6H4v2a4 4 0 0 0 4 4m8-6h4v2a4 4 0 0 1-4 4m-4 2v5m-4 2h8"/>'
  };
  const icon = (name, size = '') => `<svg class="icon ${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${marks[name] ?? marks.book}</svg>`;
  const attrs = value => Object.entries(value).map(([key, item]) => item === false || item == null ? '' : item === true ? ` ${key}` : ` ${key}="${esc(item)}"`).join('');
  const tag = (label, kind = '') => `<span class="tag ${kind}">${esc(label)}</span>`;
  const button = (label, action, kind = 'secondary', data = {}, glyph = '') => `<button type="button" class="button ${kind}" data-action="${esc(action)}"${attrs(data)}>${glyph ? icon(glyph, 'sm') : ''}${esc(label)}</button>`;
  const link = (label, href, kind = 'secondary', glyph = '') => `<a class="button ${kind}" href="${esc(href)}">${glyph ? icon(glyph, 'sm') : ''}${esc(label)}</a>`;
  const progress = (value, label, maximum = 100) => `<progress class="progress" value="${Number(value) || 0}" max="${Math.max(1, maximum)}" aria-label="${esc(label)}"></progress>`;
  const head = (title, detail = '') => `<div class="page-head"><h1>${esc(title)}</h1>${detail ? `<p>${esc(detail)}</p>` : ''}</div>`;
  const section = (title, rest, right = '', name = '') => `<section class="section ${name}"><div class="section-head"><h2>${esc(title)}</h2>${right}</div>${rest}</section>`;
  const empty = (title, detail = '', controls = '') => `<div class="empty"><strong>${esc(title)}</strong>${detail ? `<p>${esc(detail)}</p>` : ''}${controls ? `<div class="row">${controls}</div>` : ''}</div>`;
  const tile = (name, color = '') => `<span class="tile-symbol ${color}">${icon(name)}</span>`;
  const list = value => {
    const rows = T.textList(value);
    return rows.length ? `<ul>${rows.map(item => `<li>${esc(item)}</li>`).join('')}</ul>` : '';
  };
  const paragraph = value => T.textList(value).map(item => `<p>${esc(item)}</p>`).join('');
  function darija(value) {
    return T.textList(value).map(text => {
      const mixed = String(text).split(/(«[^»]+»|[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ0-9’'-]*(?: [A-Za-zÀ-ÿ][A-Za-zÀ-ÿ0-9’'-]*)*)/g);
      return `<p class="darija" lang="ary" dir="rtl">${mixed.map((part, index) => index % 2 && /[A-Za-zÀ-ÿ]/.test(part) ? `<bdi lang="fr" dir="ltr">${esc(part)}</bdi>` : esc(part)).join('')}</p>`;
    }).join('');
  }
  function table(rows, label) {
    if (!Array.isArray(rows) || !rows.length) return '';
    const selected = rows.filter(Array.isArray);
    if (!selected.length) return '';
    return `<div class="table-wrap"><table aria-label="${esc(label)}"><thead><tr>${selected[0].map(value => `<th scope="col">${esc(value)}</th>`).join('')}</tr></thead><tbody>${selected.slice(1).map(row => `<tr>${row.map(value => `<td>${esc(value)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  }

  const navigation = [
    ['Étudier', [['home','Accueil','home'],['dashboard','Tableau de bord','grid'],['path','Parcours pédagogique','path'],['modules','Les 20 modules','book'],['levels','Niveaux B1–C2','layers']]],
    ['Pratiquer', [['practice','Entraînement','bolt'],['exam','Examen blanc','clock'],['intensive','Préparation intensive','flag']]],
    ['Consolider', [['errors','Mes erreurs','note'],['review','Révision intelligente','rotate'],['cards','Fiches de grammaire','cards'],['stats','Statistiques','stats']]]
  ];
  const labels = Object.fromEntries(navigation.flatMap(([, items]) => items.map(([page, title]) => [page, title])));
  Object.assign(labels, { lesson: 'Cours', session: 'Séance', settings: 'Paramètres', flash: 'Flashcards' });

  function frame(page, state, ev, menu) {
    const active = page === 'lesson' ? 'modules' : page === 'session' ? 'practice' : page === 'flash' ? 'cards' : page;
    const rail = `<a href="#dashboard" class="brand-link"><img src="assets/icon.svg" alt=""><span><strong>TCF Structure<br>Master</strong><small>Atelier de français</small></span></a><nav aria-label="Menu principal">${navigation.map(([group, items]) =>
      `<div class="nav-group"><p>${group}</p>${items.map(([id, title, glyph]) => `<a href="#${id}"${attrs({ 'aria-current': id === active ? 'page' : '' })}>${icon(glyph, 'sm')}${title}</a>`).join('')}</div>`).join('')}</nav><div class="rail-bottom"><a href="#settings"${attrs({ 'aria-current': active === 'settings' ? 'page' : '' })}>${icon('settings','sm')} Paramètres</a></div>`;
    const top = `<div class="row"><button class="icon-btn mobile-menu" aria-label="Menu de navigation" aria-expanded="${menu}" aria-controls="rail" data-action="menu">${icon('menu')}</button><div class="crumb"><span>Mon espace</span>${icon('chevron','sm')}<span>${esc(labels[page] ?? 'Tableau de bord')}</span></div></div><div class="top-actions"><span class="top-xp">${icon('bolt','sm')}${count(ev.xp)} XP</span><button class="icon-btn" aria-label="${document.documentElement.dataset.theme === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre'}" data-action="theme">${icon(document.documentElement.dataset.theme === 'dark' ? 'sun' : 'moon')}</button></div>`;
    const foot = `<div class="row between"><span>TCF Structure Master · Entraînement indépendant</span><span>Progression enregistrée sur cet appareil</span></div>`;
    return { rail, top, foot };
  }

  function hero(title, detail, first, second, lead = '') {
    return `<section class="hero"><div class="hero-content">${lead ? `<span class="badge">${esc(lead)}</span>` : ''}<h1>${esc(title)}</h1><p>${esc(detail)}</p><div class="row">${first}${second}</div></div><picture class="hero-illustration"><img src="assets/lingo.svg" alt="Lingo, un carnet vert qui prend vie" width="390" height="295"></picture></section>`;
  }

  function stat(label, value, glyph, kind, note = '') {
    return `<article class="card stat"><div class="row"><span class="muted">${esc(label)}</span>${tile(glyph, kind)}</div><strong>${esc(value)}</strong>${note ? `<span class="small muted">${esc(note)}</span>` : ''}</article>`;
  }
  function moduleProgress(module, ev) {
    const rows = ev.perModule.get(module.id) ?? [];
    const unique = new Set(rows.map(row => row.qid)).size;
    return { rows, unique, value: T.pct(unique, module.questions.length) };
  }
  function heat(ev) {
    return `<div class="card"><p class="muted">Chaque case ouvre le cours. La couleur indique la maîtrise observée.</p><div class="heatmap">${T.modules.map(module => {
      const status = T.skillStatus(ev.perModule.get(module.id));
      return `<a class="heat-cell" href="#lesson/${module.id}" data-tier="${status.tier}" title="${esc(module.title + ' · ' + status.name)}" aria-label="${esc(module.title + ', ' + status.name)}">${T.modId(module.id)}</a>`;
    }).join('')}</div><div class="meta" style="margin-top:10px">${['À découvrir','Non acquise','Fragile','En progression','Acquise','Maîtrisée'].map((item, index) => tag(item, ['quiet','error','warn','violet','',''][index])).join('')}</div></div>`;
  }
  function levelProgress(ev) {
    return `<div class="card stack">${T.levels.map(level => {
      const total = T.questions.filter(q => q.level === level).length;
      const seen = new Set((ev.perLevel.get(level) ?? []).map(row => row.qid)).size;
      return `<div><div class="row between"><strong>${level}</strong><span class="muted small">${count(seen)} sur ${count(total)} parcourues</span></div>${progress(seen, `Progression ${level}`, total)}</div>`;
    }).join('')}</div>`;
  }
  function weakList(ev, limit = 5) {
    const weak = T.weakNotions(ev).slice(0, limit);
    return weak.length ? `<ul class="steps">${weak.map(item => `<li><div><strong>${esc(item.notion?.title)}</strong><span class="muted small">${item.distinct} ${item.distinct === 1 ? 'erreur sur une phrase distincte' : 'phrases distinctes en erreur'}</span></div>${button('Retravailler','start-notion','light small',{'data-key':item.id})}</li>`).join('')}</ul>` : empty('Aucune difficulté confirmée', 'Le diagnostic et tes prochaines réponses alimenteront cette liste.');
  }
  function bestList(ev) {
    const strengths = [...ev.perNotion.entries()].map(([id, rows]) => ({ id, status:T.skillStatus(rows) })).filter(entry => entry.status.tier >= 3).sort((a,b) => b.status.tier-a.status.tier || b.status.accuracy-a.status.accuracy).slice(0,5);
    return strengths.length ? `<ul class="steps">${strengths.map(item => `<li><strong>${esc(T.notionByKey.get(item.id)?.title)}</strong>${tag(item.status.name)}</li>`).join('')}</ul>` : empty('Tes meilleures compétences apparaîtront ici', 'Plusieurs réponses autonomes sont nécessaires pour mesurer une progression.');
  }
  function badges(ev) {
    const pool = [
      ['Expert du subjonctif', T.skillStatus(ev.perModule.get(8)).tier === 5],
      ['Maître des prépositions', T.skillStatus(ev.perModule.get(12)).tier === 5],
      ['Champion des pronoms', T.skillStatus(ev.perModule.get(3)).tier === 5 && T.skillStatus(ev.perModule.get(4)).tier >= 4],
      ['Objectif B2', ['B2','C1','C2'].includes(T.estimates(ev))],
      ['En route vers C1', ['C1','C2'].includes(T.estimates(ev))],
      ['Maître des connecteurs',T.skillStatus(ev.perModule.get(15)).tier === 5],
      ['Série de 10 bonnes réponses', ev.longest >= 10]
    ];
    return `<div class="row">${pool.map(([name, unlocked]) => tag(`${unlocked ? '✓ ' : ''}${name}${unlocked ? '' : ' (à gagner)'}`, unlocked ? '' : 'quiet')).join('')}</div>`;
  }
  function dashboard(context) {
    const { ev, state } = context;
    const total = ev.recent.length;
    const daily = ev.dayCounts.get(T.dateKey()) ?? 0;
    const ready = T.reviewQueue(ev).filter(item => item.ready).length;
    const estimate = T.estimates(ev);
    const active = state.active && state.active.stage !== 'summary';
    const weakness = T.weakNotions(ev)[0];
    const recommendations = [
      [ready ? `${ready} ${ready === 1 ? 'notion à revoir' : 'notions à revoir'}` : 'Révision intelligente', ready ? 'Des rappels sont arrivés à échéance.' : 'Retrouve les notions travaillées à leur prochaine échéance.', '#review', 'rotate'],
      [weakness?.notion?.title ?? 'Faire le diagnostic', weakness ? 'Retravailler une difficulté observée sur tes réponses.' : 'Identifie tes forces et les règles à reprendre.', weakness ? '#lesson/' + weakness.notion.moduleId + '/' + encodeURIComponent(weakness.notion.id) : '#practice?mode=diagnostic', 'target'],
      ['Préparation intensive', 'Organise les révisions jusqu’à la date de ton examen.', '#intensive', 'flag']
    ];
    return hero('Maîtrise les structures du français', 'Prépare le TCF Tout Public avec des cours en français et en darija, des exercices ciblés et des corrections qui expliquent chaque choix.', active ? link('Reprendre ma séance','#session','primary','bolt') : link('Commencer une séance','#practice','primary','bolt'), link('Explorer les modules','#modules','secondary','book'), 'TCF Tout Public · B1–C2') +
      section('Ma progression', `<div class="grid four">${stat('Niveau pédagogique', estimate || 'À établir','target','','Estimation interne')}${stat('Questions réalisées',count(ev.perQuestion.size),'check','violet',`${T.pct(ev.perQuestion.size,T.questions.length)} % de la banque`)}${stat('Taux de réussite',total ? `${T.pct(ev.correct,total)} %` : '—','stats','neutral',total ? `${count(total)} tentatives` : 'Aucune tentative')}${stat('Série quotidienne',`${ev.streak} ${ev.streak === 1 ? 'jour' : 'jours'}`,'flame','warn',`${duration(ev.time)} d’entraînement`)}</div>`) +
      `<div class="grid split"><div>${section('Recommandations', `<div class="card"><ul class="steps">${recommendations.map(([title, detail, url, glyph]) => `<li><div class="row"><span>${tile(glyph)}</span><div><strong>${esc(title)}</strong><span class="muted small">${esc(detail)}</span></div></div><a href="${esc(url)}" class="icon-btn" aria-label="${esc(title)}">${icon('chevron','sm')}</a></li>`).join('')}</ul></div>`, '', 'compact')}</div><div>${section('Objectif du jour', `<div class="card daily-card"><div class="row between">${tile('flag','warn')}<strong>${count(daily)} / ${count(state.settings.dailyGoal)}</strong></div>${progress(daily,'Objectif quotidien',state.settings.dailyGoal)}<p class="muted">${daily >= state.settings.dailyGoal ? 'Lingo te félicite, ton objectif quotidien est atteint.' : 'Chaque question te rapproche de ton objectif.'}</p>${button('Défi du jour','daily','light','', 'bolt')}</div>`, '', 'compact')}</div></div>` +
      `<div class="grid split"><div>${section('Carte des compétences',heat(ev),'<a href="#modules">Voir les modules</a>')}</div><div>${section('Progression par niveau',levelProgress(ev))}</div></div>` +
      `<div class="grid two">${section('Mes difficultés',`<div class="card">${weakList(ev)}</div>`)}${section('Mes meilleures compétences',`<div class="card">${bestList(ev)}</div>`)}</div>` +
      section('Mes badges', `<div class="card">${badges(ev)}</div>`);
  }
  function home() {
    return hero('Ton atelier de grammaire française','Choisis une notion, essaie une phrase et découvre le raisonnement qui mène à la bonne réponse.',link('Ouvrir le tableau de bord','#dashboard','primary','grid'),link('Voir les cours','#modules','secondary','book'),'B1 à C2') +
      section('Choisis comment commencer', `<div class="grid three">${[['Lire un cours','Découvre les règles en français et en darija.','#modules','book'],['M’entraîner','Choisis les niveaux, la difficulté et le nombre de questions.','#practice','bolt'],['Faire un examen blanc','Travaille ton temps et analyse tes réponses à la fin.','#exam','clock']].map(([title,body,url,glyph]) => `<a class="card card-link" href="${url}">${tile(glyph)}<div><h3>${title}</h3><p class="muted">${body}</p></div>${icon('arrow','sm')}</a>`).join('')}</div>`);
  }
  function modulesPage({ ev, params }) {
    const query = params.get('q') ?? '';
    const clean = T.fold(query).trim();
    const modules = T.modules.filter(module => !clean || T.fold([module.title,...Object.values(module.notions).map(n => n.title)].join(' ')).includes(clean));
    return head('Les 20 modules', `${count(T.questions.length)} questions originales, réparties du B1 au C2.`) +
      `<form class="card row" data-form="modules" role="search"><label for="module-search">Rechercher un thème</label><input id="module-search" name="q" value="${esc(query)}" style="max-width:300px"><button class="button light">Rechercher</button>${query ? link('Tout afficher','#modules','secondary small') : ''}</form>` +
      section('Catalogue des cours', modules.length ? `<div class="module-grid">${modules.map(module => {
        const coverage = moduleProgress(module,ev);
        return `<article class="card module-card"><div class="row between"><span class="module-id">${T.modId(module.id)}</span>${tag(module.questions.length ? `${module.questions.length} questions` : 'Cours indisponible', 'quiet')}</div><div><h3>${esc(module.title)}</h3>${module.summary ? `<p class="muted small">${esc(module.summary)}</p>` : ''}</div><div>${progress(coverage.value, module.title)}<p class="muted small">${coverage.value} % parcouru</p></div>${module.questions.length ? `<div class="row">${link('Ouvrir le cours','#lesson/'+module.id,'light small','book')}${link('Exercices','#practice?modules='+module.id,'secondary small')}</div>` : ''}</article>`;
      }).join('')}</div>` : empty('Aucun module ne correspond','Essaie le nom d’une règle ou d’une grande famille grammaticale.'));
  }
  function levelsPage({ ev }) {
    const descriptions = ['Consolider les décisions fréquentes et les formes usuelles.', 'Différencier des structures proches en contexte.', 'Traiter la syntaxe complexe et justifier les nuances.', 'Perfectionner les choix fins, les exceptions et les registres.'];
    return head('Sélection des niveaux','Les niveaux sont des estimations pédagogiques de la difficulté des questions.') +
      `<div class="grid two">${T.levels.map((level,i) => {
        const total=T.questions.filter(q=>q.level===level).length;
        const seen=new Set((ev.perLevel.get(level)??[]).map(row=>row.qid)).size;
        return `<article class="card stack"><div class="row between"><span class="module-id">${level}</span>${tag(`${total} questions`,i===1||i===2?'violet':'quiet')}</div><h2>${['Consolidation','Approfondissement','Maîtrise','Perfectionnement'][i]}</h2><p class="muted">${descriptions[i]}</p>${progress(seen,level,total)}${link(`Travailler le ${level}`,'#practice?levels='+level,'light')}</article>`;
      }).join('')}</div>`;
  }
  function pathPage({ ev, state }) {
    const weak = T.weakNotions(ev).slice(0,5);
    const starting = [12,8,4,9,15];
    return head('Mon parcours pédagogique','Commence avec un diagnostic. Le parcours s’ajuste ensuite à tes réponses et aux rappels arrivés à échéance.') +
      `<div class="grid two">${section('Première étape', `<div class="card stack">${tile('target')}<h3>Test diagnostique transversal</h3><p>Explore les modules à l’aide de phrases variées et indique ton degré de confiance.</p>${button('Lancer le diagnostic','start-mode','primary',{'data-mode':'diagnostic'})}</div>`)}${section('Étape suivante',`<div class="card stack">${tile('rotate','violet')}<h3>Révisions planifiées</h3><p>Un rappel autonome renseigne sur ce que tu as retenu.</p>${link('Consulter le calendrier','#review','light')}</div>`)}</div>` +
      section(weak.length?'Notions à reprendre':'Priorités de départ',`<div class="card">${weak.length ? weakList(ev) : `<ul class="steps">${starting.map(id=>`<li><span>${esc(T.modules[id-1].title)}</span>${link('Consulter','#lesson/'+id,'light small')}</li>`).join('')}</ul>`}</div>`) +
      section('Progression observée',heat(ev));
  }
  function lessonPage({ route, state }) {
    const module = T.modules[Number(route[1])-1];
    if (!module || !Object.keys(module.notions).length) return head('Cours indisponible') + empty('Ce cours n’est pas disponible dans cette version','',link('Retour aux modules','#modules','light'));
    const notions = Object.entries(module.notions);
    const [id, notion] = notions.find(([key]) => key === route[2]) ?? notions[0];
    const key = `${module.id}/${id}`;
    const showFR = state.settings.language !== 'ary';
    const showAR = state.settings.language !== 'fr';
    const block = (title, value) => value ? `<div><h3>${esc(title)}</h3>${paragraph(value)}</div>` : '';
    const options = Object.entries(notion.examples ?? {}).map(([level, phrase]) => [level,...T.textList(phrase)]);
    return `<div class="reading">${head(module.title,showFR ? module.summary : '')}${showAR && module.darijaIntro ? `<section class="card flat" style="margin-bottom:14px">${darija(module.darijaIntro)}</section>` : ''}
      <nav class="chapter-nav" aria-label="Notions du cours">${notions.map(([slug,entry])=>`<a class="button secondary small" href="#lesson/${module.id}/${encodeURIComponent(slug)}"${attrs({'aria-current':slug===id?'location':null})}>${esc(entry.title)}</a>`).join('')}</nav>
      <article class="card lesson-block"><div class="row between"><h2>${esc(notion.title)}</h2>${tag(`Module ${T.modId(module.id)}`,'quiet')}</div>
      ${showFR ? block('Définition', notion.definition)+block('À quoi ça sert ?',notion.purpose)+block('Quand l’utiliser ?',notion.when)+block('Comment l’utiliser ?',notion.how)+block('Le reconnaître en QCM',notion.recognize)+`<div class="rule-box"><h3>Règle</h3>${paragraph(notion.rule)}</div>` : ''}
      ${showAR && notion.darija ? `<div class="rule-box"><h3>Explication en darija</h3>${darija(notion.darija)}</div>` : ''}
      ${notion.table ? `<div><h3>Tableau comparatif</h3>${table(notion.table,notion.title)}</div>` : ''}
      ${options.length ? `<div><h3>Exemples du B1 au C2</h3>${table([['Niveau','Exemple'],...options.map(([level,...examples])=>[level,examples.join(' / ')])], 'Exemples par niveau')}${button('Écouter les exemples','speak','secondary small',{'data-text':options.map(row=>row.slice(1).join('. ')).join(' ')},'audio')}</div>` : ''}
      ${showFR ? block('Exceptions et limites',notion.exceptions)+block('Confusions fréquentes',notion.confusions)+block('Pièges de l’épreuve',notion.trap)+`<div class="grid two"><div><h3>À faire</h3>${list(notion.do)}</div><div><h3>À éviter</h3>${list(notion.avoid)}</div></div>`+block('Astuce de mémorisation',notion.memory): ''}
      <div class="card flat"><h3>À toi de jouer</h3><div class="row" style="margin-top:8px">${button('Exercices d’application','start-notion','primary',{'data-key':key})}${button('Mini-évaluation','start-notion','secondary',{'data-key': key,'data-mode':'diagnostic'})}${button(state.studied.includes(key)?'Notion lue ✓':'Marquer comme lue','studied','light',{'data-key':key,'aria-pressed':state.studied.includes(key)})}</div></div>
      </article></div>`;
  }

  const modes = [
    ['learning','Apprentissage','Une règle, puis des exercices progressifs.','book'],
    ['practice','Entraînement libre','Construis ta séance à la carte.','bolt'],
    ['exam','Examen blanc','18 ou 23 questions en 15 minutes.','clock'],
    ['errors','Révision des erreurs','Retrouve des variantes sur tes difficultés.','rotate'],
    ['duel','Duel grammatical','Compare deux constructions proches.','layers'],
    ['sprint','Sprint TCF','Cinq minutes pour cinq questions.','flag'],
    ['traps','Questions pièges','Travaille des confusions avancées.','target'],
    ['flash','Flashcards','Rappelle la règle avant de retourner la carte.','cards'],
    ['justify','Explique ton choix','Choisis la règle qui justifie ta réponse.','note'],
    ['diagnostic','Test diagnostique','Construis un premier profil à partir de tes réponses.','stats']
  ];
  const modeLabel = Object.fromEntries(modes.map(([id,title])=>[id,title]));
  Object.assign(modeLabel,{review:'Révision intelligente',remediation:'Session de remédiation'});
  function practicePage({ params }) {
    const mode = params.get('mode') ?? 'practice';
    const selected = (params.get('levels') ?? '').split(',');
    const chosen = (params.get('modules') ?? '').split(',').map(Number);
    const selectedNotion = params.get('notion') ?? '';
    const options = T.modules.flatMap(module=>Object.entries(module.notions).map(([slug,notion])=>[`${module.id}/${slug}`,`${T.modId(module.id)} · ${notion.title}`]));
    return head('Entraînement', 'Choisis le type de séance et les contenus que tu veux travailler.') +
      `<div class="grid three">${modes.map(([id,title,body,glyph],i)=>`<a class="card card-link" href="${id==='exam'?'#exam':id==='flash'?'#flash':'#practice?mode='+id}"${mode===id?' aria-current="location"':''}>${tile(glyph,i%3===1?'violet':i%3===2?'warn':'')}<div><h3>${title}</h3><p class="muted small">${body}</p></div></a>`).join('')}</div>` +
      section('Configurer la séance', `<form class="card stack" data-form="practice">
      <input type="hidden" name="mode" value="${esc(mode)}"><div class="row between"><strong>${esc(modeLabel[mode] ?? modeLabel.practice)}</strong>${tag('B1–C2','quiet')}</div>
      <fieldset><legend>Niveaux</legend><div class="row"><label class="check-label"><input type="checkbox" value="all" name="all-levels" ${!T.levels.some(level=>selected.includes(level))?'checked':''}> Tous</label>${T.levels.map(level=>`<label class="check-label"><input type="checkbox" name="level" value="${level}"${selected.includes(level)?' checked':''}> ${level}</label>`).join('')}${button('B2 + C1','choose-levels','secondary small')}</div></fieldset>
      <fieldset><legend>Modules</legend><div class="choice-grid">${T.modules.map(module=>`<label class="check-label"><input type="checkbox" name="module" value="${module.id}"${chosen.includes(module.id)?' checked':''}${module.questions.length?'':' disabled'}> ${esc(module.title)}</label>`).join('')}</div><p class="muted small">Sans sélection, tous les modules disponibles sont inclus.</p></fieldset>
      <div class="grid two"><div class="form-line"><label for="notion-select">Sous-thème</label><select name="notion" id="notion-select"><option value="">Tous les sous-thèmes</option>${options.map(([value,label])=>`<option value="${esc(value)}"${value===selectedNotion?' selected':''}>${esc(label)}</option>`).join('')}</select></div><div class="form-line"><label for="topic-search">Mot-clé grammatical</label><input id="topic-search" name="search" type="search" placeholder="Ex. subjonctif"></div></div>
      ${mode==='duel'?`<div class="form-line"><label for="duel-select">Notion à comparer</label><select name="second" id="duel-select"><option value="">Même notion, emplois contrastés</option>${options.map(([key,label])=>`<option value="${esc(key)}">${esc(label)}</option>`).join('')}</select></div>`:''}
      <div class="grid two"><div class="form-line"><label for="amount">Nombre de questions</label><select name="amount" id="amount">${[5,10,15,20,30,50,100].map(n=>`<option${n===(mode==='sprint'?5:mode==='diagnostic'?20:10)?' selected':''}>${n}</option>`).join('')}<option value="all">Entraînement illimité</option></select></div>
      <div class="form-line"><label for="difficulty">Difficulté</label><select name="difficulty" id="difficulty"><option value="random">Aléatoire</option><option value="progressive"${mode==='learning'?' selected':''}>Progressif</option>${T.difficulties.map((item,i)=>`<option value="${i}">${item}</option>`).join('')}</select></div></div>
      <label class="check-label"><input type="checkbox" name="weak"${mode==='errors'?' checked':''}> Uniquement mes points faibles</label><p class="muted" data-filter-info aria-live="polite"></p><button class="button primary" type="submit">${icon('bolt','sm')} Lancer la séance</button></form>`);
  }
  function examPage({ state }) {
    const resume = state.active?.mode==='exam' && state.active.stage!=='summary';
    return head('Examen blanc','Simule l’épreuve de maîtrise des structures. Le temps continue si tu changes d’onglet ou quittes la page.') +
      `<div class="grid two">${[18,23].map(n=>`<article class="card stack">${tile('clock',n===23?'violet':'')}<h2>${n===18?'Format standard':'Format ordinateur'}</h2><p>${n} questions en 15 minutes.${n===23?' Cinq items pilotes ne comptent pas dans le résultat.':''}</p>${button(`Démarrer · ${n} questions`,'start-exam','primary',{'data-count':n})}</article>`).join('')}</div>` +
      section('Pendant le test', `<div class="card"><p>Choisis une proposition par question. Tu peux naviguer entre les questions et modifier tes choix jusqu’à la remise. La correction et la ventilation par thème arrivent à la fin.</p><p class="muted">La simulation utilise des questions originales et propose un repère pédagogique interne. <a href="https://www.france-education-international.fr/test/tcf-tout-public" target="_blank" rel="noopener">Format de référence de France Éducation international</a></p>${resume?`<div class="row" style="margin-top:12px">${link('Reprendre l’examen','#session','light')}</div>`:''}</div>`);
  }
  function errorPage({ ev, state, params }) {
    const level=params.get('level')??'';
    const module=params.get('module')??'';
    const recurring=params.get('recurring')==='on';
    const favorites=params.get('favorite')==='on';
    const items=[...ev.perQuestion.values()].map(rows=>({rows,errors:rows.filter(row=>!row.correct), q:rows[0].question})).filter(({q,errors})=>
      (errors.length || favorites && state.favorites.includes(q.id))&&(!level||q.level===level)&&(!module||q.moduleId===Number(module))&&(!recurring||errors.length>=2)&&(!favorites||state.favorites.includes(q.id))
    ).sort((a,b)=>(b.errors.at(-1)?.at??0)-(a.errors.at(-1)?.at??0));
    return head('Mes erreurs','Retrouve tes réponses, les règles et tes notes. Une erreur répétée propose une nouvelle variante de la même notion.') +
      `<form class="card stack" data-form="errors"><div class="grid two"><div class="form-line"><label for="error-level">Niveau</label><select name="level" id="error-level"><option value="">Tous</option>${T.levels.map(value=>`<option${level===value?' selected':''}>${value}</option>`).join('')}</select></div><div class="form-line"><label for="error-module">Module</label><select name="module" id="error-module"><option value="">Tous</option>${T.modules.map(item=>`<option value="${item.id}"${Number(module)===item.id?' selected':''}>${esc(item.title)}</option>`).join('')}</select></div></div>
      <div class="row"><label class="check-label"><input type="checkbox" name="recurring"${recurring?' checked':''}> Erreurs récurrentes</label><label class="check-label"><input type="checkbox" name="favorite"${favorites?' checked':''}> Favoris</label><button class="button light">Filtrer</button></div></form>
      <div class="section-head section no-print"><h2>${items.length} ${items.length===1?'question':'questions'}</h2><div class="row">${button('Test ciblé','error-target','light small')}${button('Exporter en JSON','export-errors','secondary small',{},'download')}${button('Imprimer','print','secondary small')}</div></div>
      ${items.length?`<div class="stack">${items.map(({q,errors,rows})=>{
        const last=errors.at(-1)??rows.at(-1);
        const status=T.skillStatus(ev.perNotion.get(q.key));
        return `<article class="card"><div class="row">${tag(q.level)}${tag(q.theme,'quiet')}${tag(status.name,status.tier<3?'warn':'violet')}<span class="muted small">${errors.length} erreur(s) · ${date(last.at)}</span></div><h3 style="margin:8px 0">${esc(q.prompt)}</h3><p><strong>Ma réponse</strong> ${esc(q.options[last.choice])} · <strong>Bonne réponse</strong> ${esc(q.answer)}</p><details><summary>Voir la règle et les explications</summary><div class="stack"><p>${esc(q.clue)}</p>${paragraph(q.rule)}${darija(q.darija)}</div></details><div class="form-line" style="margin-top:10px"><label for="note-${q.id}">Note personnelle</label><textarea id="note-${q.id}" data-note="${q.id}">${esc(state.notes[q.id]??'')}</textarea></div><div class="row" style="margin-top:8px">${button(state.favorites.includes(q.id)?'Retirer des favoris':'Ajouter aux favoris','favorite','secondary small',{'data-id':q.id,'aria-pressed':state.favorites.includes(q.id)},'heart')}${button('Exercice similaire','similar','light small',{'data-id':q.id})}</div></article>`;
      }).join('')}</div>`:empty('Aucune erreur pour ces filtres','Tes prochaines réponses alimenteront ton carnet.',link('M’entraîner','#practice','light'))}`;
  }
  function reviewPage({ ev }) {
    const items=T.reviewQueue(ev);
    const ready=items.filter(item=>item.ready);
    return head('Révision intelligente','Les rappels sont espacés selon tes réussites autonomes et tes difficultés.') +
      `<div class="grid two">${stat('Rappels dus',ready.length,'rotate',ready.length?'warn':'')}${stat('Notions suivies',items.length,'layers','violet')}</div>` +
      section('Mes prochaines révisions', items.length?`<div class="card stack">${button('Réviser les notions dues','review-due','primary',{disabled:!ready.length},'rotate')}<ul class="steps">${items.slice(0,60).map(item=>`<li><div><strong>${esc(item.notion?.title)}</strong><span class="muted small">${item.ready?'À réviser maintenant':date(item.due)+' · '+new Intl.DateTimeFormat('fr-FR',{timeStyle:'short'}).format(item.due)}</span></div>${button('Réviser','start-notion','light small',{'data-key':item.key,'data-mode':'review'})}</li>`).join('')}</ul></div>`:empty('Aucun rappel planifié','Une première tentative déclenche un rappel dans 10 minutes.',link('Commencer une séance','#practice','light')));
  }
  function cardsPage({ state, params }) {
    const recommended = ['subjonctif','indicatif','infinitif','condition','préposition','accord','relatif','connecteur','homophone','soutenu','collocation','idiom','synonym'];
    const favorites=params.get('favorite')==='1';
    const cards=[...T.notionByKey.entries()].filter(([key])=>!favorites||state.cards.includes(key));
    cards.sort(([,a],[,b])=>Number(recommended.some(term=>T.fold(b.title).includes(T.fold(term))))-Number(recommended.some(term=>T.fold(a.title).includes(T.fold(term)))));
    return head('Fiches de grammaire','Les règles de tes cours sous forme de fiches à lire, pratiquer et imprimer.') +
      `<div class="row">${link('Toutes les fiches','#cards',favorites?'secondary':'light')}${link('Mes favoris','#cards?favorite=1',favorites?'light':'secondary')}${link('Ouvrir les flashcards','#flash','primary','cards')}</div>` +
      section(favorites?'Favoris':'Bibliothèque', cards.length?`<div class="stack">${cards.map(([key,entry])=>`<details class="card" id="fiche-${esc(key.replace('/','-'))}"><summary>${esc(entry.title)} <span class="muted small">· ${esc(T.modules[entry.moduleId-1].title)}</span></summary><article class="lesson-block" style="margin-top:12px"><div class="rule-box">${paragraph(entry.rule)}</div>${darija(entry.darija)}${entry.table?table(entry.table,entry.title):''}${paragraph(entry.trap)}<div class="row no-print">${link('Réviser cette fiche','#flash?key='+encodeURIComponent(key),'light small')}${button('Tester mes connaissances','start-notion','secondary small',{'data-key':key})}${button(state.cards.includes(key)?'Retirer des favoris':'Ajouter aux favoris','favorite-card','secondary small',{'data-key':key,'aria-pressed':state.cards.includes(key)},'heart')}${button('Imprimer la fiche','print-card','secondary small',{'data-key':key})}</div></article></details>`).join('')}</div>`:empty('Aucune fiche favorite','Marque une fiche comme favorite pour l’afficher ici.'));
  }
  function flashPage({ flash }) {
    const entry=flash.keys[flash.index];
    const notion=T.notionByKey.get(entry);
    return head('Flashcards','Essaie de formuler la règle de mémoire avant de retourner la fiche.')+
      (notion?`<div class="reading stack"><div class="meta">${tag(`Carte ${flash.index+1} / ${flash.keys.length}`,'quiet')}${tag(T.modules[notion.moduleId-1].title)}</div><div class="card flash" aria-live="polite"><h2>${esc(notion.title)}</h2>${flash.back?`<div class="rule-box">${paragraph(notion.rule)}</div>${paragraph(notion.trap)}${notion.examples?.B2?paragraph(notion.examples.B2):''}${darija(notion.darija)}`:''}</div><div class="row between">${button('Précédente','flash-prev','secondary',{disabled:flash.index===0})}${button(flash.back?'Voir le recto':'Retourner la fiche','flash-flip','primary')}${button('Suivante','flash-next','secondary',{disabled:flash.index>=flash.keys.length-1})}</div><div class="row">${button('Tester cette règle','start-notion','light',{'data-key':entry})}${link('Voir toutes les fiches','#cards','secondary')}</div></div>`:empty('Aucune fiche disponible'));
  }
  function statsPage({ ev }) {
    const xpLevel=1+Math.floor(ev.xp/100);
    const dates=new Map();
    for(let i=6;i>=0;i-=1){const d=new Date();d.setDate(d.getDate()-i);const k=T.dateKey(d);dates.set(k,ev.dayCounts.get(k)??0);}
    return head('Statistiques','Tes indicateurs se calculent à partir des tentatives stockées sur cet appareil.') +
      `<div class="grid four">${stat('XP total',count(ev.xp),'bolt','warn')}${stat('Niveau d’expérience',xpLevel,'trophy','violet')}${stat('Meilleure série',ev.longest,'flame','warn')}${stat('Durée totale',duration(ev.time),'clock','neutral')}</div>` +
      `<div class="grid two">${section('Activité des sept derniers jours', `<div class="card stack">${[...dates].map(([day,n])=>`<div><div class="row between"><span>${date(day+'T12:00:00')}</span><strong>${n}</strong></div>${progress(n,day,Math.max(1,...dates.values()))}</div>`).join('')}</div>`)}${section('Progression par niveau',levelProgress(ev))}</div>` +
      section('Carte des compétences',heat(ev))+section('Badges',`<div class="card">${badges(ev)}</div>`);
  }
  function intensivePage({ state, ev }) {
    const p=T.plan(state,ev);
    const title=p.remaining<0?'Date passée':p.remaining===0?'Jour de l’examen':`${p.remaining} ${p.remaining===1?'jour restant':'jours restants'}`;
    return head('Préparation intensive','Planifie ton entraînement selon la date de l’examen, le temps disponible et les difficultés observées.') +
      `<div class="grid three">${stat('Avant l’examen',title,'flag','violet')}${stat('Temps quotidien',`${p.minutes} min`,'clock')}${stat('Rappels urgents',p.urgent.length,'rotate','warn')}</div>` +
      section('Mon programme',`<div class="card stack"><form class="grid two no-print" data-form="intensive"><div class="form-line"><label for="intensive-date">Date de l’examen</label><input type="date" required id="intensive-date" name="date" value="${state.settings.examDate}"></div><div class="form-line"><label for="intensive-minutes">Minutes disponibles par jour</label><input type="number" min="5" max="240" required id="intensive-minutes" name="minutes" value="${state.settings.minutes}"></div><button class="button light">Enregistrer</button></form>${p.remaining<0?'<p>Modifie la date pour préparer une nouvelle session.</p>':''}<ul class="steps"><li><span>${p.suggested} questions ciblées aujourd’hui</span>${button('Démarrer','intensive-start','primary small',{'data-count':p.suggested})}</li><li><span>${p.urgent.length} rappels urgents</span>${link('Voir les rappels','#review','light small')}</li><li><span>${p.timed?'Examen blanc conseillé aujourd’hui':'Examen blanc à placer dans une séance d’au moins 15 minutes'}</span>${link('Passer à l’examen','#exam','light small')}</li></ul></div>`) +
      section('Mes modules prioritaires',`<div class="card">${p.weak.length?weakList(ev):`<ul class="steps">${[12,8,4,9,15,18].map(id=>`<li><span>${esc(T.modules[id-1].title)}</span>${link('Consulter','#lesson/'+id,'light small')}</li>`).join('')}</ul>`}</div>`);
  }
  function settingsPage({ state, voices, installReady, storageOkay }) {
    const s=state.settings;
    return head('Paramètres','Personnalise ton atelier et sauvegarde ta progression.')+
      section('Affichage et entraînement',`<div class="card"><label class="setting-row">Thème<select data-setting="theme"><option value="light"${s.theme==='light'?' selected':''}>Clair</option><option value="dark"${s.theme==='dark'?' selected':''}>Sombre</option><option value="system"${s.theme==='system'?' selected':''}>Système</option></select></label>
      <label class="setting-row">Langue des cours et corrigés<select data-setting="language"><option value="both"${s.language==='both'?' selected':''}>Français et darija</option><option value="fr"${s.language==='fr'?' selected':''}>Français</option><option value="ary"${s.language==='ary'?' selected':''}>Darija marocaine</option></select></label>
      <label class="setting-row">Animations de Lingo<input type="checkbox" data-setting="motion"${s.motion?' checked':''}></label>
      <label class="setting-row">Demander le niveau de confiance<input type="checkbox" data-setting="confidence"${s.confidence?' checked':''}></label>
      <label class="setting-row">Objectif quotidien (questions)<input type="number" min="1" max="100" data-setting="dailyGoal" value="${s.dailyGoal}"></label></div>`) +
      section('Audio',`<div class="card"><label class="setting-row">Lecture à voix haute<input type="checkbox" data-setting="audio"${s.audio?' checked':''}></label><label class="setting-row">Voix française<select data-setting="voice"><option value="">Voix française par défaut</option>${voices.map(voice=>`<option value="${esc(voice.voiceURI)}"${s.voice===voice.voiceURI?' selected':''}>${esc(voice.name)} (${esc(voice.lang)})</option>`).join('')}</select></label><p class="small muted">Les voix disponibles dépendent du navigateur et de l’appareil.</p></div>`) +
      section('Progression et sauvegarde',`<div class="card stack"><p>${storageOkay?'La progression est sauvegardée automatiquement dans ce navigateur.':'La sauvegarde locale est indisponible. Exporte ta progression avant de fermer cette page.'}</p><div class="row">${button('Exporter une sauvegarde','export','light',{},'download')}${button('Importer une sauvegarde','choose-import')}${button('Réinitialiser','reset','danger')}</div><input type="file" id="backup-file" accept=".json,application/json" hidden></div>`) +
      section('Installation',`<div class="card stack"><p>Sur iPhone, ouvre l’application hébergée dans Safari, puis choisis Partager et Sur l’écran d’accueil.</p>${installReady?button('Installer l’application','install','primary'):'<p class="small muted">L’installation PWA et le cache hors connexion nécessitent HTTPS ou localhost.</p>'}</div>`);
  }

  Object.assign(globalThis, { TCFViews: {
    esc,count,date,duration,clock,icon,attrs,tag,button,link,progress,head,section,empty,tile,list,paragraph,darija,table,
    labels,modeLabel,frame,dashboard,home,modulesPage,levelsPage,pathPage,lessonPage,practicePage,examPage,errorPage,reviewPage,cardsPage,flashPage,statsPage,intensivePage,settingsPage
  } });
})();
