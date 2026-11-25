(function () {
  'use strict';
  const T=globalThis.TCF;
  const V=globalThis.TCFViews;
  const { esc, tag, button, link, paragraph, darija, table, icon, empty, progress, head, clock, duration, list }=V;
  const moodInfo={
    accueil: ['Bienvenue à l’atelier !', 'M153 142q12 17 24 0', 'M136 123h1m54 0h1'],
    reflexion: ['Relis la phrase et repère le mot qui guide ton choix.', 'M156 146q8-5 15 0', 'M135 121h1m54 4h1'],
    encouragement: ['Prends un instant pour comparer les propositions.', 'M151 144q12 10 24 0', 'M136 123h1m54 0h1'],
    bonne: ['Bien joué. Voyons le raisonnement qui mène à ce choix.', 'M150 141q13 23 27 0', 'M130 124q7-7 14 0m37 0q7-7 14 0'],
    mauvaise: ['On regarde ensemble le détail qui change la réponse.', 'M155 145q8 4 18-2', 'M136 121h1m54 0h1'],
    explication: ['Cherche l’indice dans la phrase, puis réessaie sur un autre exemple.', 'M151 145q13 13 26-3', 'M136 123h1m54 0h1'],
    revision: ['Rappelle-toi la règle avant de vérifier la réponse.', 'M152 143q12 10 23 0', 'M136 123h1m54 0h1'],
    victoire: ['Ta séance est terminée. Prends un moment pour voir tes progrès.', 'M148 140q17 26 31 0', 'M130 124q7-8 14 0m37 0q7-8 14 0'],
    objectif: ['Tu as atteint ton objectif du jour.', 'M149 140q16 23 30 0', 'M128 121l7 3 7-4m38 1 7 3 7-4'],
    examen: ['Examen terminé. Tu peux maintenant consulter les corrections.', 'M150 144q13 11 26 0', 'M136 123h1m54 0h1']
  };
  function mascot(mood, custom='') {
    const [message,mouth,eyes]=moodInfo[mood]??moodInfo.accueil;
    return `<div class="card flat mascot-note"><div class="mascot-inline" data-mood="${mood}"><svg class="mascot-glyph" viewBox="60 52 220 170" aria-hidden="true"><path fill="#168663" stroke="#173e34" stroke-width="5" d="M111 76h116q20 0 20 20v91q0 19-19 19H112q-18 0-18-19V94q0-18 17-18Z"/><path fill="#ebf2df" stroke="#173e34" stroke-width="4" d="M111 66h113q17 0 17 18v93q0 20-18 20H112q-17 0-17-18V83q0-17 16-17Z"/><path fill="#78eab6" stroke="#173e34" stroke-width="4" d="M110 58h109q16 0 16 16v94q0 18-17 18H111q-16 0-16-18V74q0-16 15-16Z"/><path d="M115 62v120" stroke="#288d71" stroke-width="6"/><ellipse cx="126" cy="140" rx="6" ry="3" fill="#e68879"/><ellipse cx="201" cy="140" rx="6" ry="3" fill="#e68879"/><path d="${mouth}" stroke="#173e34" stroke-width="3.2" stroke-linecap="round" fill="none"/><path d="${eyes}" stroke="#173e34" stroke-width="7" stroke-linecap="round" fill="none"/><path d="m244 70 5-11 4 11 11 4-11 5-4 11-5-11-10-5Z" fill="#efb749"/></svg><div><strong>Lingo</strong><p class="small">${esc(custom||message)}</p></div></div></div>`;
  }
  function questionText(q, filled=false) {
    const [before,after]=q.prompt.split('___');
    return `${esc(before)}${filled?`<mark class="blank">${esc(q.answer)}</mark>`:'<span class="blank" aria-label="mot manquant">…</span>'}${esc(after)}`;
  }
  const speech = (text, active, id='') => active ? `<div class="row no-print">${button('Écouter','speak','secondary small',{'data-text':text,'data-id':id},'audio')}${button('Lecture lente','speak','secondary small',{'data-text':text,'data-rate':'.74','data-id':id})}${button('Répéter','repeat','secondary small')}</div>` : '';
  function responseText(q, choice) { return Number.isInteger(choice) ? `${T.letters[choice]}. ${q.options[choice]}` : 'Sans réponse'; }
  function correction(q, response, state, summary=false) {
    const selected=response?.choice;
    const right=selected===q.correct;
    const expected=responseText(q,q.correct);
    const user=responseText(q,selected);
    const showFR=state.settings.language!=='ary';
    const showAR=state.settings.language!=='fr';
    const examples=Object.entries(q.examples??{}).map(([level,example])=>`<li><strong>${level}</strong> ${esc(T.textList(example).join(' / '))}</li>`).join('');
    const details = (label,html,open=false) => html ? `<details${open?' open':''}><summary>${esc(label)}</summary><div class="stack" style="margin-top:8px">${html}</div></details>` : '';
    return `<article class="card feedback ${right?'':'wrong'} stack" ${summary?'':'id="feedback" tabindex="-1"'}><div class="row between"><h2>${right?'Bonne réponse':selected==null?'Sans réponse':'Réponse incorrecte'}</h2>${tag(q.level,'quiet')}</div>
      <div class="grid two keep"><div><span class="small muted">Ma réponse</span><p><strong>${esc(user)}</strong></p></div><div><span class="small muted">Bonne réponse</span><p><strong>${esc(expected)}</strong></p></div></div>
      <p class="question-prompt" style="margin:0">${questionText(q,true)}</p>
      ${speech(q.full,state.settings.audio,q.id)}
      ${showFR?`<div><h3>Le raisonnement</h3><p>${esc(q.clue)}</p></div>`:''}
      ${showAR && q.darija ? `<div class="rule-box"><h3>الشرح بالدارجة</h3>${darija(q.darija)}</div>` : ''}
      ${selected!=null ? `<div><h3>Pourquoi mon choix ${right?'fonctionne':'échoue'}</h3><p>${esc(q.reasons[selected])}</p>${response?.rationale===false?'<p class="muted">La justification choisie ne correspond pas à cette phrase. Relis la règle puis refais un exercice de transfert.</p>':''}</div>`:''}
      ${details('Analyse des quatre propositions',`<ul class="analysis">${q.options.map((option,i)=>`<li><span class="letter">${T.letters[i]}</span><div><strong>${esc(option)} ${i===q.correct?'✓':''}</strong><p>${esc(q.reasons[i])}</p></div></li>`).join('')}</ul>`,!summary)}
      ${details('Règle grammaticale',paragraph(q.rule)+speech(T.textList(q.rule).join('. '),state.settings.audio),!summary)}
      ${details('Repérer le piège au TCF',paragraph(q.trap)+paragraph(q.notion?.recognize))}
      ${details('Astuce de mémorisation',paragraph(q.memory))}
      ${details('À faire et à éviter',`<div class="grid two"><div><h3>À faire</h3>${list(q.do)}</div><div><h3>À éviter</h3>${list(q.avoid)}</div></div>`)}
      ${details('Exemples supplémentaires',examples?`<ul>${examples}</ul>${speech(Object.values(q.examples).flat().join('. '),state.settings.audio)}`:'')}
      <div class="row no-print">${summary?'':button('Je n’ai pas compris','help','secondary',{'data-id':q.id})}${link('Réviser le cours',`#lesson/${q.moduleId}/${encodeURIComponent(q.notionId)}`,'secondary')}${button('Donne-moi un exercice similaire','similar','light',{'data-id':q.id})}${summary?'':button('Question suivante','next','primary',{},'arrow')}${button(state.favorites.includes(q.id)?'Retirer des favoris':'Ajouter aux favoris','favorite','secondary small',{'data-id':q.id,'aria-pressed':state.favorites.includes(q.id)},'heart')}</div>
      ${!summary&&state.active?.help?`<div class="rule-box" id="help-box" tabindex="-1"><h3>Reprenons par un exemple</h3>${paragraph(q.notion?.how)}${q.notion?.table?table(q.notion.table,q.notion.title):''}${darija(q.notion?.darija)}<div class="row">${button('Essai guidé sur cette notion','start-notion','light',{'data-key':q.key,'data-mode':'remediation'})}</div></div>`:''}
    </article>`;
  }
  function rationaleChoices(q, state) {
    const sameModule=Object.values(T.modules[q.moduleId-1].notions).filter(notion=>notion.title!==q.notion?.title);
    const broader=[...T.notionByKey.values()].filter(notion=>notion.moduleId!==q.moduleId);
    const current=[...sameModule,...broader].slice(0,2).map(notion=>T.textList(notion.rule)[0]).filter(Boolean);
    const index=(q.id.charCodeAt(q.id.length-1)+state.active.position)%3;
    current.splice(Math.min(index,current.length),0,T.textList(q.rule)[0]??q.clue);
    return current.map((rule,i)=>[rule,i===Math.min(index,current.length-1)]);
  }
  function sessionPage({ state, ev }) {
    const s=state.active;
    if (!s) return head('Ma séance')+empty('Aucune séance en cours','Choisis comment tu veux étudier.',link('Configurer une séance','#practice','primary'));
    if (s.stage==='summary') return summary(state,ev);
    const q=T.byId.get(s.ids[s.position]);
    const exam=s.mode==='exam';
    const timed=s.deadline!==null;
    const response=s.responses.find(row=>row.qid===q.id);
    const selected=s.pendingChoice??response?.choice;
    const finishable=s.stage==='choose' && selected!=null;
    const feedback=s.stage==='feedback';
    const correct=response?.choice===q.correct;
    const weak=T.weakNotions(ev).find(row=>row.id===q.key&&row.distinct>=3);
    const remaining=timed?Math.max(0,Math.ceil((s.deadline-Date.now())/1000)):0;
    const examMap=exam?`<aside class="prompt-aside"><section class="card stack"><h3>Navigation</h3><div class="session-map">${s.ids.map((id,i)=>`<button type="button" data-action="jump" data-index="${i}" aria-label="Question ${i+1}${s.responses.some(row=>row.qid===id)?', répondue':''}" ${i===s.position?'aria-current="step"':''} class="${s.responses.some(row=>row.qid===id)?'answered':''}">${i+1}</button>`).join('')}</div><p class="small muted">${s.responses.length} / ${s.ids.length} réponses enregistrées</p>${button('Terminer l’examen','finish-exam','secondary')}</section></aside>`:
      `<aside class="prompt-aside">${mascot(feedback?(s.help?'explication':correct?'bonne':'mauvaise'):s.mode==='review'?'revision':s.mode==='remediation'?'encouragement':'reflexion', weak&&!feedback?'Tu as rencontré cette difficulté plusieurs fois. Repère l’indice dans cette nouvelle phrase.':'')}${weak&&feedback?`<div class="card flat stack"><h3>Reprise proposée</h3><p class="muted small">${weak.distinct} phrases distinctes avec cette difficulté.</p>${link('Lire le cours comparatif',`#lesson/${q.moduleId}/${encodeURIComponent(q.notionId)}`,'light small')}${button('Cinq nouvelles questions','remediate','primary small',{'data-key':q.key})}</div>`:''}</aside>`;
    const rationale=s.stage==='rationale'?`<article class="card stack"><h2 id="rationale">Quelle règle justifie ton choix ?</h2><div class="options">${rationaleChoices(q,state).map(([rule,valid])=>button(rule,'justify','secondary',{'data-valid':valid?'1':'0'})).join('')}</div>${button('Passer la justification','justify','light',{'data-valid':'skip'})}</article>`:'';
    const guides=!exam && (s.mode==='learning'||s.mode==='remediation') && !feedback?`<details class="card flat"><summary>Indice de cours</summary><div class="stack" style="margin-top:8px">${button('Afficher l’indice','hint','light small',{'aria-pressed':s.hint})}${s.hint?paragraph(q.notion?.recognize):''}</div></details>`:'';
    const exercise=`<div class="exercise-layout">
      <div class="exercise-main">
        <div class="exercise-head"><div class="row between"><div><span class="small muted">${esc(V.modeLabel[s.mode]??s.label)}</span><h1 style="font-size:1.6rem">${s.label?esc(s.label):`Question ${s.position+1} sur ${s.ids.length}`}</h1></div>${timed?`<span class="clock${remaining<=30?' urgent':''}" id="clock" aria-label="Temps restant">${clock(remaining)}</span>`:''}</div>${progress(exam?s.responses.length:s.position+Number(feedback),'Avancement de la séance',s.ids.length)}</div>
        ${feedback?'':`<article class="card question-card"><div class="row">${!exam?tag(q.level)+tag(q.theme,'quiet')+tag(q.subtheme,'violet'):''}</div><p class="question-prompt" id="question-stem" tabindex="-1">${questionText(q)}</p>${!exam?speech(q.prompt.replace('___',' … '),state.settings.audio,q.id):''}
        <div class="options" aria-label="Propositions">${q.options.map((option,i)=>`<button type="button" class="option" data-action="option" data-index="${i}" aria-pressed="${selected===i}"${s.stage!=='choose'?' disabled':''}><span class="letter">${T.letters[i]}</span><span>${esc(option)}</span></button>`).join('')}</div>
        ${!exam&&state.settings.confidence&&s.stage==='choose'?`<fieldset><legend>Mon degré de confiance</legend><div class="row">${[['certain','Je suis certain'],['hesitate','J’hésite'],['guess','Au hasard']].map(([value,text])=>`<label class="check-label"><input type="radio" name="confidence" value="${value}"${s.confidence===value?' checked':''}> ${text}</label>`).join('')}</div></fieldset>`:''}
        ${s.stage==='choose'?`<div class="row between" style="margin-top:12px">${exam?button('Précédente','jump','secondary',{'data-index':s.position-1,disabled:s.position===0}):link('Quitter la séance','#practice','secondary')}${button(exam?'Valider et avancer':'Valider ma réponse','answer','primary',{disabled:!finishable},'check')}</div>`:''}</article>`}
        ${guides}${rationale}${feedback?correction(q,response,state):''}
      </div>${examMap}</div>`;
    return exercise;
  }
  function examEstimate(result) {
    if (result.answered<12) return 'Données insuffisantes';
    const bands=T.levels.map(level=>[level,result.answerRows.filter(row=>row.q.level===level)]);
    return bands.filter(([,rows])=>rows.length&&T.pct(rows.filter(row=>row.correct).length,rows.length)>=75).at(-1)?.[0]??'À consolider';
  }
  function summary(state,ev) {
    const s=state.active;
    const daily=ev.dayCounts.get(T.dateKey())??0;
    const exam=s.mode==='exam';
    const result=T.examResult(s);
    const answered=s.responses.length;
    const correct=exam?result.correct:s.responses.filter(row=>row.choice===T.byId.get(row.qid)?.correct).length;
    const total=exam?result.scored:s.ids.length;
    const topicRows=[...result.theme.values()];
    const todayGoal=state.settings.dailyGoal;
    const average=exam?(result.answered?duration(result.time/result.answered):'—'):(answered?duration(s.responses.reduce((sum,row)=>sum+row.ms,0)/answered):'—');
    const leaders=topicRows.filter(row=>row.total>=2 && row.correct===row.total);
    const improvements=topicRows.filter(row=>row.correct<row.total).sort((a,b)=>a.correct/a.total-b.correct/b.total);
    const answerMap=new Map(s.responses.map(row=>[row.qid,row]));
    return `<div class="reading">${head(exam?'Examen terminé':'Séance terminée',exam?'Repère pédagogique calculé sur les questions comptabilisées.':'Retrouve les règles à consolider après ta séance.')}${mascot(exam?'examen':daily>=todayGoal?'objectif':'victoire')}
      <div class="grid ${exam?'four':'three'} section"><div class="card stat"><span class="muted">Bonnes réponses</span><strong>${correct} / ${total}</strong>${exam&&s.pilot.length?`<span class="small muted">${s.pilot.length} items pilotes exclus</span>`:''}</div><div class="card stat"><span class="muted">Réussite</span><strong>${T.pct(correct,total)} %</strong></div><div class="card stat"><span class="muted">Temps moyen</span><strong>${average}</strong></div>${exam?`<div class="card stat"><span class="muted">Repère pédagogique</span><strong>${esc(examEstimate(result))}</strong></div>`:''}</div>
      ${exam||s.mode==='diagnostic'?`<div class="grid two"><div class="card"><h3>Thèmes bien réussis</h3>${leaders.length?list(leaders.map(row=>`${row.module} · ${row.correct}/${row.total}`)):'<p class="muted">Il faut plusieurs réussites sur un même thème.</p>'}</div><div class="card"><h3>Thèmes à améliorer</h3>${improvements.length?list(improvements.map(row=>`${row.module} · ${row.correct}/${row.total}`)):'<p class="muted">Aucun thème à reprendre sur cette séance.</p>'}</div></div>`:''}
      <div class="row section">${s.unlimited?button('Continuer l’entraînement','unlimited','primary'):link('Nouvelle séance','#practice','primary','bolt')}${link('Tableau de bord','#dashboard','secondary')}${s.mode==='diagnostic'?link('Mon parcours','#path','light'):''}</div>
      <section class="section stack"><h2>Corrections de la séance</h2>${s.ids.map((id,i)=>{
        const q=T.byId.get(id);const row=answerMap.get(id);
        return `<details class="card flat"><summary>Question ${i+1} · ${esc(q.subtheme)} · ${row?row.choice===q.correct?'Correcte':'Incorrecte':'Sans réponse'}${s.pilot.includes(id)?' · pilote':''}</summary><div style="margin-top:9px">${correction(q,row,state,true)}</div></details>`;
      }).join('')}</section></div>`;
  }
  globalThis.TCFSessionView={ sessionPage,mascot,correction,clock };
})();
