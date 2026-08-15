(() => {
  'use strict';

  const STORAGE_KEY = 'umaPreferenceMatchStateV01';
  const AXES = window.UMA_AXIS_DEFS;
  const AXIS_COLUMNS = {
    cheerful:'명랑도', extroversion:'외향성', selfConfidence:'자기확신', eccentricity:'기행성', playfulness:'장난기',
    effort:'노력성', talent:'천재성', adversity:'역경성', rationality:'이성성', impulsivity:'충동성',
    consideration:'배려성', independence:'독립성', perfectionism:'완벽주의', competitiveness:'승부집착', responsibility:'책임감'
  };

  const clone = obj => JSON.parse(JSON.stringify(obj));
  const defaults = { characters: clone(window.UMA_CHARACTERS), questions: clone(window.UMA_DEFAULT_QUESTIONS) };
  let state = loadState();
  let answers = {};
  let currentQuestionEditId = 1;
  let changedCharacterAxes = new Set();
  let lastResult = null;

  function loadState(){
    try{
      const raw = localStorage.getItem(STORAGE_KEY);
      if(!raw) return clone(defaults);
      const parsed = JSON.parse(raw);
      if(!Array.isArray(parsed.characters) || !Array.isArray(parsed.questions)) return clone(defaults);
      return parsed;
    }catch(e){ console.warn(e); return clone(defaults); }
  }
  function saveState(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
  function clamp(n,min,max){ return Math.max(min,Math.min(max,n)); }
  function axisLabel(key){ return AXES.find(a=>a.key===key)?.label || key; }
  function esc(s){ return String(s).replace(/[&<>'"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }

  // ---------- navigation ----------
  function showView(name){
    document.querySelectorAll('.view').forEach(v=>v.classList.toggle('active', v.id===`view-${name}`));
    document.querySelectorAll('.nav-btn').forEach(b=>b.classList.toggle('active', b.dataset.view===name));
    if(name==='admin') renderAdmin();
    if(name==='results') renderResults();
    window.scrollTo({top:0,behavior:'smooth'});
  }
  document.querySelectorAll('.nav-btn').forEach(btn=>btn.addEventListener('click',()=>showView(btn.dataset.view)));
  document.querySelectorAll('[data-go]').forEach(btn=>btn.addEventListener('click',()=>showView(btn.dataset.go)));
  document.getElementById('start-test').addEventListener('click',()=>showView('test'));

  // ---------- intro ----------
  document.getElementById('axis-chips').innerHTML = AXES.map(a=>`<span class="chip">${esc(a.label)}</span>`).join('');

  // ---------- test ----------
  function renderQuestions(){
    const list = document.getElementById('question-list');
    list.innerHTML = state.questions.map((q,idx)=>{
      const options=[1,2,3,4,5].map(v=>`<div class="scale-option"><input type="radio" name="q${q.id}" id="q${q.id}-${v}" value="${v}" ${answers[q.id]===v?'checked':''}><label for="q${q.id}-${v}">${v===3?'중간':v}</label></div>`).join('');
      return `<article class="question-card card" data-qid="${q.id}">
        <div class="question-title"><span class="q-no">Q${idx+1}</span><h3>${esc(q.prompt)}</h3></div>
        <div class="choice-scale"><div class="choice-label">${esc(q.left)}</div>${options}<div class="choice-label right">${esc(q.right)}</div></div>
      </article>`;
    }).join('');
    list.querySelectorAll('input[type=radio]').forEach(input=>input.addEventListener('change',e=>{
      const qid = Number(e.target.name.slice(1)); answers[qid]=Number(e.target.value); updateProgress();
    }));
    updateProgress();
  }
  function updateProgress(){
    const total=state.questions.length, done=Object.keys(answers).filter(id=>answers[id]!=null).length;
    const pct=Math.round(done/total*100);
    document.getElementById('progress-text').textContent=`${done} / ${total}`;
    document.getElementById('progress-percent').textContent=`${pct}%`;
    document.getElementById('progress-bar').style.width=`${pct}%`;
    const remain=total-done;
    document.getElementById('unanswered-count').textContent=remain?`${remain}문항 남음`:'모든 문항 완료';
    document.getElementById('calculate-result').disabled=remain!==0;
  }
  document.getElementById('calculate-result').addEventListener('click',()=>{
    lastResult = calculateResult();
    showView('results');
  });
  document.getElementById('load-sample').addEventListener('click',()=>{
    answers={}; state.questions.forEach(q=>answers[q.id]=1+Math.floor(Math.random()*5)); renderQuestions();
    lastResult=calculateResult(); showView('results');
  });

  function preferenceVector(){
    const accum={}; AXES.forEach(a=>accum[a.key]={num:0,den:0});
    state.questions.forEach(q=>{
      const ans=answers[q.id]; if(ans==null) return;
      const signed=(ans-3)/2; // -1 ... +1
      Object.entries(q.effects||{}).forEach(([axis,coef])=>{
        if(!accum[axis]) return;
        const w=(Number(q.weight)||1)*Number(coef||0);
        accum[axis].num += signed*w;
        accum[axis].den += Math.abs(w);
      });
    });
    const vector={}, coverage={};
    AXES.forEach(a=>{
      const x=accum[a.key];
      const norm=x.den?x.num/x.den:0;
      vector[a.key]=clamp(2+2*norm,0,4);
      coverage[a.key]=x.den;
    });
    return {vector,coverage};
  }

  function calculateResult(){
    const {vector,coverage}=preferenceVector();
    const ranked=state.characters.map(c=>{
      let sum=0, wsum=0;
      AXES.forEach(a=>{
        const diff=(Number(c.traits[a.key])-vector[a.key])/4;
        const conf=Number(c.confidence?.[a.key] ?? 0.7);
        const w=0.75+0.25*conf; // confidence is a small modifier, not a veto
        sum += w*diff*diff; wsum += w;
      });
      const rms=Math.sqrt(sum/wsum);
      const similarity=clamp((1-rms)*100,0,100);
      return {...c, similarity, distance:rms};
    }).sort((a,b)=>b.similarity-a.similarity);
    return {vector,coverage,ranked};
  }

  // ---------- results ----------
  function renderResults(){
    const empty=document.getElementById('results-empty'), content=document.getElementById('results-content');
    if(!lastResult){ empty.classList.remove('hidden'); content.classList.add('hidden'); return; }
    empty.classList.add('hidden'); content.classList.remove('hidden');
    const best=lastResult.ranked[0];
    document.getElementById('best-name').textContent=best.name;
    document.getElementById('best-score').textContent=best.similarity.toFixed(1)+'%';
    document.getElementById('best-summary').textContent=`142명 중 선호 성향 벡터와 가장 가까운 캐릭터입니다. 2위와의 차이는 ${(best.similarity-lastResult.ranked[1].similarity).toFixed(1)}%p.`;
    document.getElementById('ranking-list').innerHTML=lastResult.ranked.slice(0,10).map((c,i)=>`<div class="rank-row"><span class="rank-no">${i+1}</span><span class="rank-name">${esc(c.name)}</span><span class="rank-score">${c.similarity.toFixed(1)}%</span></div>`).join('');
    document.getElementById('trait-compare').innerHTML=AXES.map(a=>{
      const u=lastResult.vector[a.key], c=best.traits[a.key];
      return `<div class="trait-row"><span class="trait-name">${esc(a.label)}</span><div class="dual-bars"><div class="bar-track"><div class="bar-user" style="width:${u/4*100}%"></div></div><div class="bar-track"><div class="bar-char" style="width:${c/4*100}%"></div></div></div><span class="trait-values">${u.toFixed(1)} / ${Number(c).toFixed(0)}</span></div>`;
    }).join('');
    const reasons=AXES.map(a=>{
      const u=lastResult.vector[a.key], c=best.traits[a.key];
      const closeness=1-Math.abs(u-c)/4;
      const distinct=0.45+0.55*Math.max(Math.abs(u-2),Math.abs(c-2))/2;
      return {label:a.label,u,c,score:closeness*distinct};
    }).sort((a,b)=>b.score-a.score).slice(0,6);
    document.getElementById('reason-list').innerHTML=reasons.map(r=>`<span class="reason-pill">${esc(r.label)} · 선호 ${r.u.toFixed(1)} / ${Number(r.c).toFixed(0)}</span>`).join('');
  }

  // ---------- admin tabs ----------
  document.querySelectorAll('.admin-tab').forEach(btn=>btn.addEventListener('click',()=>{
    document.querySelectorAll('.admin-tab').forEach(b=>b.classList.toggle('active',b===btn));
    document.querySelectorAll('.admin-panel').forEach(p=>p.classList.toggle('active',p.id===`admin-${btn.dataset.admin}`));
  }));

  function renderAdmin(){ renderCharacterSelect(); renderCharacterEditor(); renderQuestionAdminList(); renderQuestionEditor(); }
  function renderCharacterSelect(filter=''){
    const select=document.getElementById('character-select');
    const current=select.value;
    const filtered=state.characters.filter(c=>c.name.includes(filter));
    select.innerHTML=filtered.map(c=>`<option value="${c.id}">${esc(c.name)}</option>`).join('');
    if(filtered.some(c=>String(c.id)===current)) select.value=current;
  }
  function selectedCharacter(){
    const id=Number(document.getElementById('character-select').value || state.characters[0].id);
    return state.characters.find(c=>c.id===id) || state.characters[0];
  }
  function renderCharacterEditor(){
    const c=selectedCharacter(); if(!c) return;
    changedCharacterAxes=new Set();
    document.getElementById('character-editor').innerHTML=AXES.map(a=>`<div class="trait-control"><div class="trait-control-head"><strong>${esc(a.label)}</strong><span class="trait-value" id="value-${a.key}">${Number(c.traits[a.key]).toFixed(0)}</span></div><input type="range" min="0" max="4" step="1" value="${c.traits[a.key]}" data-axis="${a.key}"></div>`).join('');
    document.querySelectorAll('#character-editor input[type=range]').forEach(el=>el.addEventListener('input',e=>{
      const key=e.target.dataset.axis; document.getElementById(`value-${key}`).textContent=e.target.value; changedCharacterAxes.add(key);
    }));
  }
  document.getElementById('character-select').addEventListener('change',renderCharacterEditor);
  document.getElementById('character-search').addEventListener('input',e=>{renderCharacterSelect(e.target.value.trim()); renderCharacterEditor();});
  document.getElementById('save-character').addEventListener('click',()=>{
    const c=selectedCharacter(); if(!c) return;
    document.querySelectorAll('#character-editor input[type=range]').forEach(el=>{
      const key=el.dataset.axis; c.traits[key]=Number(el.value); if(changedCharacterAxes.has(key)) c.confidence[key]=1;
    });
    saveState(); lastResult=null; alert(`${c.name} 수치를 저장했습니다. 직접 수정한 축의 확신도는 1.0으로 처리했습니다.`); renderCharacterEditor();
  });

  function renderQuestionAdminList(){
    const box=document.getElementById('question-admin-list');
    if(!state.questions.some(q=>q.id===currentQuestionEditId)) currentQuestionEditId=state.questions[0]?.id;
    box.innerHTML=state.questions.map((q,i)=>`<div class="qa-item ${q.id===currentQuestionEditId?'active':''}" data-id="${q.id}"><strong>Q${i+1} · 가중치 ${Number(q.weight).toFixed(1)}</strong><span>${esc(q.prompt)}</span></div>`).join('');
    box.querySelectorAll('.qa-item').forEach(el=>el.addEventListener('click',()=>{currentQuestionEditId=Number(el.dataset.id);renderQuestionAdminList();renderQuestionEditor();}));
  }
  function renderQuestionEditor(){
    const q=state.questions.find(x=>x.id===currentQuestionEditId); if(!q) return;
    const effects=AXES.map(a=>`<label class="effect-field"><span>${esc(a.label)}</span><input type="number" step="0.05" min="-2" max="2" data-effect="${a.key}" value="${Number(q.effects?.[a.key]||0)}"></label>`).join('');
    const editor=document.getElementById('question-editor');
    editor.innerHTML=`<div class="editor-field"><label>문항</label><textarea id="edit-prompt">${esc(q.prompt)}</textarea></div>
      <div class="editor-field"><label>왼쪽 선택지</label><input id="edit-left" value="${esc(q.left)}"></div>
      <div class="editor-field"><label>오른쪽 선택지</label><input id="edit-right" value="${esc(q.right)}"></div>
      <div class="editor-field"><label>문항 전체 가중치</label><input id="edit-weight" type="number" min="0.1" max="3" step="0.1" value="${q.weight}"></div>
      <div class="editor-field"><label>축별 영향값 (-2 ~ +2)</label><div class="effects-grid">${effects}</div></div>
      <div class="button-row"><button id="save-question" class="primary">문항 저장</button></div>`;
    document.getElementById('save-question').addEventListener('click',()=>{
      q.prompt=document.getElementById('edit-prompt').value.trim(); q.left=document.getElementById('edit-left').value.trim(); q.right=document.getElementById('edit-right').value.trim(); q.weight=clamp(Number(document.getElementById('edit-weight').value)||1,0.1,3);
      q.effects={}; editor.querySelectorAll('[data-effect]').forEach(inp=>{const v=Number(inp.value)||0;if(Math.abs(v)>0.0001)q.effects[inp.dataset.effect]=clamp(v,-2,2);});
      saveState(); renderQuestions(); renderQuestionAdminList(); alert('문항과 가중치를 저장했습니다.');
    });
  }

  // ---------- import/export ----------
  function download(name,text,type){ const blob=new Blob([text],{type}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000); }
  document.getElementById('export-json').addEventListener('click',()=>download('uma_preference_match_config.json',JSON.stringify(state,null,2),'application/json'));
  document.getElementById('export-csv').addEventListener('click',()=>{
    const headers=['No','캐릭터명',...AXES.map(a=>`${AXIS_COLUMNS[a.key]}_점수`)];
    const lines=[headers,...state.characters.map(c=>[c.id,c.name,...AXES.map(a=>c.traits[a.key])])].map(row=>row.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(','));
    download('uma_character_traits_scores.csv','\ufeff'+lines.join('\n'),'text/csv;charset=utf-8');
  });
  document.getElementById('import-json').addEventListener('change',async e=>{
    const file=e.target.files[0]; if(!file)return;
    try{const obj=JSON.parse(await file.text());if(!Array.isArray(obj.characters)||!Array.isArray(obj.questions))throw new Error('형식 오류');state=obj;saveState();lastResult=null;renderQuestions();renderAdmin();alert('JSON 설정을 불러왔습니다.');}catch(err){alert('JSON을 불러오지 못했습니다: '+err.message);} e.target.value='';
  });
  document.getElementById('import-csv').addEventListener('change',async e=>{
    const file=e.target.files[0]; if(!file)return;
    try{
      const rows=parseCSV(await file.text()); if(rows.length<2)throw new Error('행이 없습니다.');
      const head=rows[0]; const nameIdx=head.indexOf('캐릭터명'); if(nameIdx<0)throw new Error('캐릭터명 열이 없습니다.');
      let count=0;
      rows.slice(1).forEach(r=>{const c=state.characters.find(x=>x.name===r[nameIdx]);if(!c)return;AXES.forEach(a=>{const idx=head.indexOf(`${AXIS_COLUMNS[a.key]}_점수`);if(idx>=0&&r[idx]!==''&&!Number.isNaN(Number(r[idx]))){c.traits[a.key]=clamp(Number(r[idx]),0,4);c.confidence[a.key]=1;}});count++;});
      saveState();lastResult=null;renderAdmin();alert(`${count}명의 캐릭터 점수를 불러왔습니다.`);
    }catch(err){alert('CSV를 불러오지 못했습니다: '+err.message);} e.target.value='';
  });
  function parseCSV(text){
    text=text.replace(/^\ufeff/,''); const rows=[]; let row=[],field='',quoted=false;
    for(let i=0;i<text.length;i++){
      const ch=text[i];
      if(quoted){if(ch==='"'&&text[i+1]==='"'){field+='"';i++;}else if(ch==='"'){quoted=false;}else field+=ch;}
      else if(ch==='"')quoted=true; else if(ch===','){row.push(field);field='';} else if(ch==='\n'){row.push(field.replace(/\r$/,''));rows.push(row);row=[];field='';} else field+=ch;
    }
    if(field.length||row.length){row.push(field.replace(/\r$/,''));rows.push(row);} return rows;
  }
  document.getElementById('reset-data').addEventListener('click',()=>{
    if(!confirm('브라우저에 저장된 모든 수정값을 기본값으로 되돌릴까요?'))return;
    state=clone(defaults);saveState();answers={};lastResult=null;renderQuestions();renderAdmin();alert('기본값으로 초기화했습니다.');
  });

  // ---------- bootstrap ----------
  renderQuestions();
})();
