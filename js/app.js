(function () {
  'use strict';
  const T=globalThis.TCF;
  const V=globalThis.TCFViews;
  const S=globalThis.TCFSessionView;
  const main=document.getElementById('main-content');
  const rail=document.getElementById('rail');
  const topbar=document.getElementById('topbar');
  const footer=document.getElementById('site-foot');
  const dialog=document.getElementById('dialog');
  const toastNode=document.getElementById('toast');
  const media=globalThis.matchMedia?.('(prefers-color-scheme: dark)');
  let state=T.load();
  let storageOkay=T.save(state);
  let menu=false;
  let ev=T.evidence(state);
  let activePage='';
  let timerId;
  let toastId;
  let installPrompt;
  let lastSpeech;
  let flash={ keys:[], index:0, back:false, source:null };
  let approve=null;
  let noteDelay;

  const pages={
    dashboard:V.dashboard,home:V.home,path:V.pathPage,modules:V.modulesPage,lesson:V.lessonPage,levels:V.levelsPage,
    practice:V.practicePage,exam:V.examPage,session:S.sessionPage,errors:V.errorPage,review:V.reviewPage,cards:V.cardsPage,
    stats:V.statsPage,intensive:V.intensivePage,settings:V.settingsPage,flash:V.flashPage
  };
  function routeInfo() {
    const [raw,query]=location.hash.slice(1).split('?');
    const route=(raw||'dashboard').split('/').map(part=>{
      try { return decodeURIComponent(part); } catch { return part; }
    });
    const page=pages[route[0]]?route[0]:'dashboard';
    return { page, route, params:new URLSearchParams(query) };
  }

  function persist(refresh=false) {
    storageOkay=T.save(state);
    if (refresh) ev=T.evidence(state);
  }
  function toast(message) {
    window.clearTimeout(toastId);
    toastNode.textContent=message;
    toastNode.classList.toggle('show',Boolean(message));
    if (message) toastId=window.setTimeout(()=>toastNode.classList.remove('show'),5200);
  }
  function confirm(title,message,callback,label='Confirmer') {
    approve=callback;
    dialog.innerHTML=`<h2 id="dialog-title">${V.esc(title)}</h2><p>${V.esc(message)}</p><form method="dialog" class="row"><button class="button secondary" value="cancel" autofocus>Annuler</button><button class="button primary" value="confirm">${V.esc(label)}</button></form>`;
    dialog.showModal();
  }
  dialog.addEventListener('close',()=>{
    const cb=approve;
    approve=null;
    if (dialog.returnValue==='confirm') cb?.();
  });
  function focus(selector) {
    requestAnimationFrame(()=>{
      const element=document.querySelector(selector);
      if (element) element.focus({preventScroll:false});
    });
  }
  function go(href) {
    if (location.hash===href) {
      render();
      focus('#main-content');
    } else {
      location.hash=href;
    }
  }
  function syncTheme() {
    const theme=state.settings.theme;
    document.documentElement.dataset.theme=theme==='system'?(media?.matches?'dark':'light'):theme;
    document.body.dataset.motion=String(state.settings.motion);
    document.body.dataset.menu=String(menu);
  }
  function voices() {
    return globalThis.speechSynthesis?.getVoices().filter(voice=>/^fr(?:[-_]|$)/i.test(voice.lang))??[];
  }
  function render(scroll=false) {
    const {page,route,params}=routeInfo();
    if (scroll) window.scrollTo(0,0);
    if (flash.source!==location.hash&&page==='flash') {
      const key=params.get('key');
      flash={keys:key&&T.notionByKey.has(key)?[key]:[...T.notionByKey.keys()],index:0,back:false,source:location.hash};
    } else if (page!=='flash') {
      flash.source=null;
    }
    activePage=page;
    syncTheme();
    const rendered=V.frame(page,state,ev,menu);
    rail.innerHTML=rendered.rail;
    topbar.innerHTML=rendered.top;
    footer.innerHTML=rendered.foot;
    main.innerHTML=pages[page]({ state,ev,route,params,flash,voices:voices(),installReady:Boolean(installPrompt),storageOkay });
    document.title=`${V.labels[page]??'Atelier'} · TCF Structure Master`;
    if (page==='practice') updateFilters();
    if (scroll) focus('#main-content');
    timeTick();
  }
  function refreshFrame() {
    syncTheme();
    const rendered=V.frame(activePage,state,ev,menu);
    rail.innerHTML=rendered.rail;
    topbar.innerHTML=rendered.top;
  }
  function setMenu(value) {
    menu=value;
    document.body.dataset.menu=String(menu);
    document.querySelector('[data-action="menu"]')?.setAttribute('aria-expanded',String(menu));
  }
  function commitSession(session) {
    if (!session) {
      toast('Cette sélection ne contient pas assez de questions. Modifie les critères.');
      return;
    }
    const current=state.active;
    const save=()=>{
      state.active=session;
      persist();
      go('#session');
    };
    if (current&&current.stage!=='summary'&&current.id!==session.id&&current.mode==='exam') {
      confirm('Remplacer l’examen en cours ?', 'Les réponses de cet examen en cours seront abandonnées.', save, 'Lancer la nouvelle séance');
    } else save();
  }
  function practiceData(form) {
    const fd=new FormData(form);
    const mode=String(fd.get('mode')||'practice');
    const filter={
      levels:fd.getAll('level'),
      modules:fd.getAll('module').map(Number),
      notion:String(fd.get('notion')||''),
      search:String(fd.get('search')||''),
      weak:fd.has('weak'),
      unseen:mode==='errors'||mode==='diagnostic'||mode==='duel',
      progressive:fd.get('difficulty')==='progressive'
    };
    if (/^[0-3]$/.test(fd.get('difficulty'))) filter.difficulty=Number(fd.get('difficulty'));
    return { mode, filter, second:String(fd.get('second')||''), amount:fd.get('amount')==='all'?'all':Number(fd.get('amount')) };
  }
  function practicePool(config) {
    const {mode,filter,second}=config;
    if (mode==='errors') filter.weak=true;
    let pool=T.select(filter,state);
    if (mode==='errors') {
      const wrong=new Set(state.attempts.filter(row=>!row.correct).map(row=>row.qid));
      pool=pool.filter(q=>!wrong.has(q.id));
    }
    if (mode==='traps') pool=pool.filter(q=>q.difficulty>=2&&q.trap);
    if (mode==='duel') {
      if (second&&filter.notion!==second) {
        const first=filter.notion?pool:pool.filter(q=>q.key!==second);
        const next=T.select({...filter,notion:second},state);
        const interleaved=[];
        for(let index=0;index<Math.max(first.length,next.length);index+=1){
          if(first[index]) interleaved.push(first[index]);
          if(next[index]) interleaved.push(next[index]);
        }
        pool=interleaved;
      } else if (!filter.notion && !filter.modules.length && !filter.search) {
        pool=pool.filter(q=>q.moduleId===12);
      }
    }
    if (mode==='diagnostic') pool=T.spread(pool,pool.length,q=>q.moduleId);
    return pool;
  }
  function updateFilters() {
    const form=main.querySelector('form[data-form="practice"]');
    if (!form) return;
    const config=practiceData(form);
    const pool=practicePool(config);
    const requested=config.amount;
    const info=form.querySelector('[data-filter-info]');
    info.textContent=pool.length===0?'Aucune question pour ces critères.':requested!=='all'&&pool.length<requested?`${pool.length} questions disponibles sur les ${requested} demandées. Réduis la quantité ou élargis la sélection.`:`${pool.length} questions correspondent à la sélection.`;
  }
  function startPractice(form) {
    const config=practiceData(form);
    const pool=practicePool(config);
    const limit=config.amount==='all'?pool.length:config.amount;
    if (!limit||pool.length<limit) {
      updateFilters();
      form.querySelector('[data-filter-info]').focus?.();
      toast('Ajuste les filtres pour obtenir le nombre demandé.');
      return;
    }
    const extras={unlimited:config.amount==='all',seconds:config.mode==='sprint'?Math.min(900,Math.max(30,limit*60)):null};
    commitSession(T.makeSession(config.mode,pool,limit,extras));
  }
  function startMode(mode) {
    if (mode==='diagnostic') {
      commitSession(T.makeSession('diagnostic',T.spread(T.select({unseen:true},state),20,q=>q.moduleId),20));
    } else go('#practice?mode='+encodeURIComponent(mode));
  }
  function targeted(key, mode='learning', count=5, exclude=[], strict=false) {
    const notion=T.notionByKey.get(key);
    if (!notion) return;
    const exclusions= strict ? [...new Set([...exclude,...state.attempts.map(item=>item.qid)])] : exclude;
    const filters={notion:key,unseen:true,exclude:exclusions,progressive:mode==='learning'};
    const pool=T.select(filters,state);
    if (strict&&pool.length<count) {
      toast(`Cette notion compte ${pool.length} nouvelle(s) question(s) disponible(s).`);
      if (!pool.length) return;
    }
    commitSession(T.makeSession(mode,pool,Math.min(count,pool.length),{label:notion.title}));
  }
  function populateResponses(session,response) {
    const index=session.responses.findIndex(item=>item.qid===response.qid);
    if (index>=0) session.responses[index]=response;
    else session.responses.push(response);
  }
  function moveTo(position) {
    const s=state.active;
    if (!s||position<0||position>=s.ids.length) return;
    s.position=position;
    s.entered=Date.now();
    s.pendingChoice=null;
    s.confidence='';
    s.hint=false;
    s.help=false;
    s.stage='choose';
    persist();
    render();
    window.scrollTo(0,0);
    focus('#question-stem');
  }
  function choose(index) {
    const s=state.active;
    if (!s||s.stage!=='choose'||!Number.isInteger(index)||index<0||index>3) return;
    s.pendingChoice=index;
    if (s.mode==='exam') {
      const qid=s.ids[s.position];
      const existing=s.responses.find(row=>row.qid===qid);
      populateResponses(s,{qid, choice:index, at:Date.now(), ms:Math.min(900_000,(existing?.ms??0)+Date.now()-s.entered),confidence:'',assisted:false,rationale:null});
      s.entered=Date.now();
    }
    persist();
    main.querySelectorAll('[data-action="option"]').forEach(item=>item.setAttribute('aria-pressed',String(Number(item.dataset.index)===index)));
    const answer=main.querySelector('[data-action="answer"]');
    if (answer) answer.disabled=false;
    if (s.mode==='exam') {
      const nav=main.querySelector(`.session-map [data-index="${s.position}"]`);
      nav?.classList.add('answered');
      nav?.setAttribute('aria-label',`Question ${s.position+1}, répondue`);
      const live=main.querySelector('.session-map + p');
      if(live) live.textContent=`${s.responses.length} / ${s.ids.length} réponses enregistrées`;
      const p=main.querySelector('.progress');
      if(p)p.value=s.responses.length;
    }
  }
  function validateAnswer() {
    const s=state.active;
    if (!s||s.stage!=='choose') return;
    if (s.deadline!==null&&Date.now()>=s.deadline) {
      finish(true);
      return;
    }
    if (s.mode==='exam') {
      if (!s.responses.some(row=>row.qid===s.ids[s.position])) return;
      if (s.position===s.ids.length-1) askFinishExam();
      else moveTo(s.position+1);
      return;
    }
    if (!Number.isInteger(s.pendingChoice)) return;
    const response={qid:s.ids[s.position],choice:s.pendingChoice,at:Date.now(),ms:Math.max(0,Math.min(900_000,Date.now()-s.entered)),confidence:s.confidence??'',assisted:s.hint,rationale:null};
    populateResponses(s,response);
    const ask=s.mode==='justify'||(s.mode==='diagnostic'&&s.position%4===2);
    s.stage=ask?'rationale':'feedback';
    if (!ask) T.logAttempt(state,s,response);
    persist(true);
    render();
    focus(ask?'#rationale + .options button':'#feedback');
  }
  function validateRationale(value) {
    const s=state.active;
    if (!s||s.stage!=='rationale') return;
    const response=s.responses.find(row=>row.qid===s.ids[s.position]);
    response.rationale=value==='skip'?null:value==='1';
    T.logAttempt(state,s,response);
    s.stage='feedback';
    persist(true);
    render();
    focus('#feedback');
  }
  function finish(fromTimer=false) {
    const s=state.active;
    if (!s||s.stage==='summary') return;
    if (s.mode==='exam') {
      [...s.responses].sort((a,b)=>a.at-b.at).forEach(row=>T.logAttempt(state,s,row));
    }
    if (s.stage==='rationale') {
      const row=s.responses.find(response=>response.qid===s.ids[s.position]);
      if(row) T.logAttempt(state,s,row);
    }
    s.stage='summary';
    s.deadline=null;
    state.attempts.sort((a,b)=>a.at-b.at);
    persist(true);
    if(activePage==='session') {
      render(true);
      if(fromTimer) toast('Temps écoulé. La correction est disponible.');
    }
  }
  function askFinishExam() {
    const s=state.active;
    if (!s||s.mode!=='exam'||s.stage==='summary') return;
    const unanswered=s.ids.length-s.responses.length;
    if (!unanswered) finish();
    else confirm('Terminer l’examen ?', `${unanswered} ${unanswered===1?'question reste':'questions restent'} sans réponse.`, ()=>finish(), 'Remettre mes réponses');
  }
  function timeTick() {
    const s=state.active;
    if (!s||s.stage==='summary'||s.deadline===null) return;
    const left=Math.max(0,Math.ceil((s.deadline-Date.now())/1000));
    const clock=main.querySelector('#clock');
    if (clock) {
      clock.textContent=V.clock(left);
      clock.classList.toggle('urgent',left<=30);
    }
    if (!left) finish(true);
  }
  function entriesForErrors() {
    const {params}=routeInfo();
    return [...ev.perQuestion.values()].map(rows=>{
      const q=rows[0].question;
      const errors=rows.filter(row=>!row.correct);
      return {q,rows,errors};
    }).filter(({q,errors})=>(errors.length||params.get('favorite')==='on'&&state.favorites.includes(q.id))
      &&(!params.get('level')||q.level===params.get('level'))&&(!params.get('module')||q.moduleId===Number(params.get('module')))
      &&(params.get('recurring')!=='on'||errors.length>=2)&&(params.get('favorite')!=='on'||state.favorites.includes(q.id)));
  }
  function daily() {
    const pool=T.select({priority:true,unseen:true},state);
    if (!pool.length) return;
    const slice=pool.filter(q=>T.priorityModules.has(q.moduleId));
    const day=Number(T.dateKey().replaceAll('-',''));
    const dailyQuestions=(slice.length>=5?slice:pool).sort((a,b)=>a.id.localeCompare(b.id));
    const offset=(day*17)%dailyQuestions.length;
    const set=[...dailyQuestions.slice(offset),...dailyQuestions.slice(0,offset)].slice(0,5);
    commitSession(T.makeSession('practice',set,set.length,{label:'Défi du jour'}));
  }
  function download(name,object) {
    const url=URL.createObjectURL(new Blob([JSON.stringify(object,null,2)],{type:'application/json'}));
    const anchor=document.createElement('a');
    anchor.href=url;
    anchor.download=name;
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  async function readBackup(input) {
    const file=input.files?.[0];
    if (!file) return;
    input.value='';
    if (file.size>30_000_000) {
      toast('Le fichier de sauvegarde dépasse 30 Mo.');
      return;
    }
    try {
      const candidate=T.sanitized(JSON.parse(await file.text()));
      confirm('Importer la sauvegarde ?', `La progression actuelle sera remplacée par ${candidate.attempts.length} tentative(s) validée(s).`,()=>{
        state=candidate;
        persist(true);
        render();
        toast('Sauvegarde importée.');
      },'Importer');
    } catch (error) { toast(error.message||'Ce fichier JSON est illisible.'); }
  }
  function speak(text,rate=1) {
    if (!state.settings.audio) { toast('Active la lecture à voix haute dans Paramètres.');return; }
    if (!globalThis.speechSynthesis||!globalThis.SpeechSynthesisUtterance) { toast('La synthèse vocale est indisponible dans ce navigateur.');return; }
    if (!text) { toast('Aucun passage à lire.');return; }
    const utterance=new SpeechSynthesisUtterance(text);
    utterance.lang='fr-FR';
    const voice=voices().find(item=>item.voiceURI===state.settings.voice)??voices().find(item=>item.lang==='fr-FR')??voices()[0];
    if (voice) utterance.voice=voice;
    utterance.rate=rate;
    utterance.onerror=event=>{ if (!['canceled','interrupted'].includes(event.error)) toast('La lecture est indisponible pour cette voix.'); };
    lastSpeech={text,rate};
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  }
  function printSelectedCard(key) {
    const detail=document.getElementById('fiche-'+key.replace('/','-'));
    if(!detail)return;
    const siblings=[...detail.parentElement.children].filter(node=>node!==detail);
    const open=detail.open;
    detail.open=true;
    siblings.forEach(node=>node.classList.add('print-hide'));
    window.print();
    siblings.forEach(node=>node.classList.remove('print-hide'));
    detail.open=open;
  }
  function toggleFrom(list,value) {
    return list.includes(value)?list.filter(item=>item!==value):[...list,value];
  }
  function action(actionName,element) {
    const data=element.dataset;
    const s=state.active;
    switch(actionName){
      case 'menu': setMenu(!menu);break;
      case 'theme':
        state.settings.theme=document.documentElement.dataset.theme==='dark'?'light':'dark';
        persist();refreshFrame();focus('[data-action="theme"]');break;
      case 'start-mode': startMode(data.mode);break;
      case 'start-exam': commitSession(T.makeExam(Number(data.count)));break;
      case 'start-notion': targeted(data.key,data.mode||'learning');break;
      case 'remediate': targeted(data.key,'remediation',5,[],true);break;
      case 'daily': daily();break;
      case 'option': choose(Number(data.index));break;
      case 'answer': validateAnswer();break;
      case 'justify': validateRationale(data.valid);break;
      case 'finish-exam': askFinishExam();break;
      case 'jump': if(s?.mode==='exam'&&s.stage!=='summary') moveTo(Number(data.index));break;
      case 'next':
        if(s?.stage==='feedback') { if(s.position===s.ids.length-1) finish();else moveTo(s.position+1); }
        break;
      case 'unlimited':
        if(s?.unlimited){
          const pool=T.shuffle(s.ids.map(id=>T.byId.get(id)));
          commitSession(T.makeSession(s.mode,pool,pool.length,{unlimited:true}));
        } break;
      case 'hint':
        if(s&&s.stage==='choose') {s.hint=true;persist();render();const hint=main.querySelector('[data-action="hint"]');if(hint){hint.closest('details').open=true;hint.focus();}}
        break;
      case 'help':
        if(s?.stage==='feedback'){s.help=true;persist();render();focus('#help-box');}
        break;
      case 'similar': {
        const q=T.byId.get(data.id);
        if(q) targeted(q.key,'remediation',1,[q.id],true);
        break;
      }
      case 'favorite': {
        state.favorites=toggleFrom(state.favorites,data.id);
        const favorite=state.favorites.includes(data.id);
        element.setAttribute('aria-pressed',String(favorite));
        element.lastChild.textContent=favorite?'Retirer des favoris':'Ajouter aux favoris';
        persist();toast(favorite?'Question ajoutée aux favoris.':'Question retirée des favoris.');
        break;
      }
      case 'favorite-card': {
        state.cards=toggleFrom(state.cards,data.key);
        const favorite=state.cards.includes(data.key);
        element.setAttribute('aria-pressed',String(favorite));
        element.lastChild.textContent=favorite?'Retirer des favoris':'Ajouter aux favoris';
        persist();toast(favorite?'Fiche ajoutée aux favoris.':'Fiche retirée des favoris.');
        break;
      }
      case 'studied':
        state.studied=toggleFrom(state.studied,data.key);persist();render();focus('[data-action="studied"]');break;
      case 'flash-flip':
        flash.back=!flash.back;render();focus('[data-action="flash-flip"]');break;
      case 'flash-prev':
        flash.index=Math.max(0,flash.index-1);flash.back=false;render();focus('[data-action="flash-flip"]');break;
      case 'flash-next':
        flash.index=Math.min(flash.keys.length-1,flash.index+1);flash.back=false;render();focus('[data-action="flash-flip"]');break;
      case 'error-target': {
        const entries=entriesForErrors().filter(item=>item.errors.length);
        const keys=[...new Set(entries.map(item=>item.q.key))];
        const pool=keys.length?T.select({notions:keys,exclude:entries.map(item=>item.q.id),unseen:true},state):[];
        commitSession(T.makeSession('errors',T.spread(pool,10,q=>q.key),10));
        break;
      }
      case 'review-due': {
        const keys=T.reviewQueue(ev).filter(row=>row.ready).map(row=>row.key);
        const pool=keys.length?T.select({notions:keys,unseen:true},state):[];
        const selected=T.spread(pool,Math.min(10,keys.length*2),q=>q.key);
        commitSession(T.makeSession('review',selected,selected.length));
        break;
      }
      case 'intensive-start': {
        const weak=T.weakNotions(ev).map(row=>row.id);
        const due=T.reviewQueue(ev).filter(row=>row.ready).map(row=>row.key);
        const pool=T.select({notions:[...new Set([...weak,...due])],unseen:true,priority:!weak.length},state);
        const count=Number(data.count)||10;
        commitSession(T.makeSession('remediation',T.spread(pool,count,q=>q.key),count));
        break;
      }
      case 'choose-levels': {
        const form=element.closest('form');
        form.querySelector('[name="all-levels"]').checked=false;
        form.querySelectorAll('[name="level"]').forEach(box=>{box.checked=['B2','C1'].includes(box.value);});
        updateFilters();break;
      }
      case 'speak': speak(data.text,Number(data.rate)||1);break;
      case 'repeat': if(lastSpeech)speak(lastSpeech.text,lastSpeech.rate);else toast('Aucun passage n’a encore été lu.');break;
      case 'print': window.print();break;
      case 'print-card': printSelectedCard(data.key);break;
      case 'export': download('tcf-sauvegarde-'+T.dateKey()+'.json',state);break;
      case 'export-errors':
        download('tcf-erreurs-'+T.dateKey()+'.json',entriesForErrors().map(({q,errors})=>({
          id:q.id,question:q.prompt,level:q.level,module:q.theme,notion:q.subtheme,correct:q.answer,rule:q.rule,
          explanation:q.clue,darija:q.darija,status:T.skillStatus(ev.perNotion.get(q.key)).name,
          errors:errors.map(row=>({response:q.options[row.choice],at:new Date(row.at).toISOString()})),
          note:state.notes[q.id]??'',favorite:state.favorites.includes(q.id)
        })));break;
      case 'choose-import': document.getElementById('backup-file')?.click();break;
      case 'reset':
        confirm('Réinitialiser la progression ?', 'Les tentatives, les notes, les favoris et les réglages locaux seront effacés.',()=>{
          state=T.fresh();persist(true);render();toast('Progression réinitialisée.');
        },'Réinitialiser');break;
      case 'install':
        if(installPrompt) {installPrompt.prompt();installPrompt=null;render();}break;
      default: break;
    }
  }

  document.addEventListener('click',event=>{
    if(!(event.target instanceof Element))return;
    const element=event.target.closest('[data-action]');
    if(element){ action(element.dataset.action,element);return; }
    const anchor=event.target.closest('a[href^="#"]');
    if(anchor?.classList.contains('skip-link')){
      event.preventDefault();
      focus('#main-content');
    }
  });
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'&&menu){setMenu(false);focus('[data-action="menu"]');}
  });
  document.addEventListener('submit',event=>{
    const form=event.target;
    const name=form.dataset.form;
    if(!name)return;
    event.preventDefault();
    if(name==='practice'){startPractice(form);return;}
    const data=new FormData(form);
    if(name==='intensive') {
      const date=data.get('date');
      const minutes=Number(data.get('minutes'));
      if(!date||!minutes)return;
      state.settings.examDate=date;
      state.settings.minutes=minutes;
      persist();render();toast('Le programme a été mis à jour.');
      return;
    }
    const query=new URLSearchParams([...data.entries()].filter(([,value])=>value));
    go('#'+name+(query.toString()?'?'+query.toString():''));
  });
  document.addEventListener('change',event=>{
    const target=event.target;
    if(target.id==='backup-file'){readBackup(target);return;}
    if(target.dataset.setting){
      const key=target.dataset.setting;
      const value=target.type==='checkbox'?target.checked:target.value;
      state.settings[key]=target.type==='number'?Math.min(Number(target.max),Math.max(Number(target.min),Number(value)||T.defaultSettings[key])):value;
      if(key==='audio'&&!value) globalThis.speechSynthesis?.cancel();
      persist();
      if(key==='theme') refreshFrame();
      else syncTheme();
      toast('Réglage enregistré.');
      return;
    }
    if(target.name==='confidence'&&state.active){
      state.active.confidence=target.value;persist();return;
    }
    const form=target.closest('form[data-form="practice"]');
    if(form){
      const all=form.querySelector('[name="all-levels"]');
      if(target.name==='all-levels'&&target.checked)form.querySelectorAll('[name="level"]').forEach(box=>{box.checked=false;});
      if(target.name==='level')all.checked=!form.querySelector('[name="level"]:checked');
      updateFilters();
    }
  });
  document.addEventListener('input',event=>{
    const target=event.target;
    if(target.dataset.note){
      state.notes[target.dataset.note]=target.value.slice(0,5000);
      window.clearTimeout(noteDelay);
      noteDelay=window.setTimeout(()=>persist(),250);
    }
    if(target.name==='search')updateFilters();
  });
  window.addEventListener('hashchange',()=>{setMenu(false);globalThis.speechSynthesis?.cancel();render(true);});
  window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();installPrompt=event;if(activePage==='settings')render();});
  window.addEventListener('appinstalled',()=>{installPrompt=null;toast('Application installée.');if(activePage==='settings')render();});
  window.addEventListener('pagehide',()=>{persist();globalThis.speechSynthesis?.cancel();});
  window.addEventListener('storage',event=>{if(event.key==='tcf-structure-master.v1'&&event.newValue){state=T.load();ev=T.evidence(state);render();}});
  globalThis.speechSynthesis?.addEventListener('voiceschanged',()=>{if(activePage==='settings'&&document.activeElement?.dataset.setting!=='voice')render();});
  media?.addEventListener('change',()=>{if(state.settings.theme==='system')refreshFrame();});
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)timeTick();});
  if('serviceWorker' in navigator&&location.protocol!=='file:')navigator.serviceWorker.register('./sw.js').catch(()=>{});
  timerId=window.setInterval(timeTick,500);
  render();
  if(!storageOkay) toast('Sauvegarde locale indisponible. Pense à exporter tes données.');
})();
