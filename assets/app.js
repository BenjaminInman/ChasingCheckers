const REGIONS=[
  {id:'southeast',name:'Southeast — TN, GA, NC, SC, AL, FL'},
  {id:'midwest',name:'Midwest — IN, OH, IL, MO, MI'},
  {id:'northeast',name:'Northeast — NY, PA, NJ, New England'},
  {id:'southcentral',name:'South Central — TX, OK, LA'},
  {id:'west',name:'West — CA, AZ, NV, CO'},
  {id:'canada',name:'Canada'}
];
const CLASSES=[
  {id:'206sr',label:'206 Senior',wants:'flex',hp:'~9 hp'},
  {id:'206mast',label:'206 Masters 35+',wants:'flex',hp:'~9 hp'},
  {id:'206cadet',label:'206 Cadet',wants:'flex',hp:'~9 hp'},
  {id:'microswift',label:'Micro / Mini Swift',wants:'flex',hp:'~9–15 hp'},
  {id:'ka100',label:'KA100 Senior',wants:'mid',hp:'~22 hp'},
  {id:'tag',label:'Rotax / TaG Sr',wants:'mid',hp:'~28 hp'},
  {id:'dd2',label:'Rotax DD2',wants:'stiff',hp:'~34 hp'},
  {id:'kz',label:'Shifter — KZ',wants:'stiff',hp:'~45 hp'},
  {id:'stockhonda',label:'Shifter — Stock Honda',wants:'stiff',hp:'~40 hp'}
];
const KARTS=[
  {name:'Margay Ignite K3/206',origin:'St. Louis, Missouri',classes:['206sr','206mast'],price:4095,used:1800,
   tubes:[32,28],axle:40,brg:2,
   front:'Adjustable Ackerman, adjustable front ride height, 17mm billet spindles, 10° KPI / 15° caster',
   wheelbase:'41.25 in',brakes:'MCP 2-piston, 200mm wave rotor',
   note:'Mixed tubing with the smallest axle and fewest bearings here — the most compliant package on the list. Narrower tuning range than the CompKart, which is arguably a feature in a first season. The published setup guide is the best documented of any 206 chassis.',
   support:[{name:'Comet Kart Sales',city:'Greenfield, IN',region:'midwest'},{name:'Topp Racing',city:'Midwest',region:'midwest'},{name:'Point Karting',city:'Ontario',region:'canada'}]},
  {name:'CompKart Covert 4R',origin:'Italy — broad US dealer network',classes:['206sr','206mast','ka100'],price:3995,used:1900,
   tubes:[32,28],axle:40,brg:3,
   front:'Sniper caster adjusters, adjustable Ackerman, adjustable front + rear ride height, 25mm billet spindles, front torsion bar',
   wheelbase:null,brakes:null,
   note:'Same mixed tubing and 40mm axle as the Margay, but three adjustable bearing cassettes stiffen the rear — pull the center bearing for low-grip days. Sniper caster adjusters give finer front increments than a multi-hole bushing. Widest tuning window in 206, which only pays once you can read the changes.',
   support:[{name:'Karting Concepts',city:'multiple',region:'west'},{name:'Lost Boyz Motorsports',city:'multiple',region:'southeast'}]},
  {name:'MGM Espionage',origin:'Kannapolis, North Carolina',classes:['206sr','206mast'],price:4325,used:2100,
   tubes:null,axle:null,brg:null,
   front:'Adjustable caster/camber, torsion bar, adjustable front and rear track width and ride height',
   wheelbase:null,brakes:null,
   note:'Strongest 206 competition record on this list — multiple CKNA Grand, Spring, Summer and Winter National finals across nearly a decade, plus SKUSA, WKA, Florida Winter Tour and Battle at the Brickyard. Tubing spec is not published; call Paul or April Rice. Small shop, direct support, closest builder to the Southeast.',
   support:[{name:'MGM Chassis — factory direct',city:'Kannapolis, NC',region:'southeast'},{name:'Point Karting',city:'Ontario',region:'canada'}]},
  {name:'Tony Kart STV 450',origin:'Italy — largest US dealer network',classes:['206sr','206mast','ka100'],price:4022,used:2000,
   tubes:[30],axle:50,brg:2,
   front:'Multi-hole bushing with 8mm pin, 25mm spindles',
   wheelbase:'1045 mm',brakes:'BSM self-ventilated disc',
   note:'OTK’s dedicated 4-cycle frame, but uniform 30mm tubing with a 50mm axle makes it the stiffest of the 206-intended chassis. The 2025 redesign moved it from a 40mm axle to 50mm. Four-cycle designated more than four-cycle engineered — a real kart with real results, just less compliant than the mixed-tube American frames.',
   support:[{name:'Word Racing',city:'multiple',region:'southeast'},{name:'KartStore-USA',city:'multiple',region:'northeast'},{name:'Acceleration Karting',city:'Las Vegas, NV',region:'west'},{name:'Kartspeed Motorsports',city:'multiple',region:'midwest'}]},
  {name:'Swift A-Flyer',origin:'United States',classes:['206sr','206mast'],price:null,used:1700,
   tubes:null,axle:'40/50',brg:null,
   front:'Full Ackermann, caster and camber adjustment',wheelbase:null,
   brakes:'Martin Mini Lite with MCP BDL lightweight rotor',
   note:'Built in Docol steel specifically for LO206, with a choice of 40mm or 50mm axle in hard, medium or soft. That axle menu is the most tunable rear end here — you set flex by spec rather than swapping parts later. Low-inertia brake package is a deliberate momentum-racing choice.',
   support:[{name:'Swift Karting — factory direct',city:'USA',region:'midwest'}]},
  {name:'Comet Eagle',origin:'Indiana',classes:['206sr','206mast'],price:null,used:1400,
   tubes:null,axle:null,brg:null,front:null,wheelbase:null,brakes:null,
   note:'Comet Kart Sales’ house chassis, long-running through Ohio and Indiana and reputed to be forgiving to set up. Buying the house brand from a full-service shop usually means the deepest setup support they can offer. Specs not published — worth a call.',
   support:[{name:'Comet Kart Sales',city:'Greenfield, IN',region:'midwest'}]},
  {name:'Top Kart Dreamer X5',origin:'Brownsburg, Indiana',classes:['206sr','206mast','ka100','tag'],price:null,used:1900,
   tubes:null,axle:null,brg:null,front:null,wheelbase:null,brakes:null,
   note:'2026 model, marketed as compatible across a wide engine range from LO206 upward. Multi-class compatibility is convenient on paper but usually means a compromise at the low-power end. US-based with an Indiana factory.',
   support:[{name:'Top Kart USA',city:'Brownsburg, IN',region:'midwest'}]},
  {name:'Tony Kart Racer 401 T',origin:'Italy',classes:['ka100','tag'],price:6298,used:2900,
   tubes:[30],axle:50,brg:2,front:null,wheelbase:'1045 mm',brakes:null,
   note:'CIK-homologated frame built for OK and TaG power. Excellent in its class and supported everywhere. Uniform 30mm with a 50mm axle means it will not flex enough to rotate under 206 power — do not buy it for four-cycle.',
   support:[{name:'Word Racing',city:'multiple',region:'southeast'},{name:'KartStore-USA',city:'multiple',region:'northeast'},{name:'Acceleration Karting',city:'Las Vegas, NV',region:'west'}]},
  {name:'Praga Dark Evo',origin:'Italy (IPK) — single US importer',classes:['ka100','tag'],price:null,used:2400,
   tubes:[30],axle:null,brg:null,front:null,wheelbase:null,
   brakes:'Hydraulic rear, 195mm ventilated floating disc',
   note:'IPK’s entry-level CIK chassis at 30 × 2mm throughout. Sensible in TaG, wrong under 206. Distribution runs through one US importer in Oklahoma, so trackside parts and resale are thinner than OTK — weigh that against the price.',
   support:[{name:'Tanda Racing — US importer',city:'Oklahoma',region:'southcentral'}]},
  {name:'Praga Dragon Evo 3',origin:'Italy (IPK) — single US importer',classes:['kz'],price:null,used:3200,
   tubes:[30],axle:null,brg:null,front:null,wheelbase:null,brakes:null,
   note:'IPK’s top-line 30mm frame and a legitimate KZ choice — this is where Praga equipment is correctly specified rather than adapted. Confirm dealer coverage within reach before ordering; a shifter without local parts gets expensive fast.',
   support:[{name:'Tanda Racing — US importer',city:'Oklahoma',region:'southcentral'}]},
  {name:'Tony Kart Racer 401 T — KZ',origin:'Italy',classes:['kz'],price:7209,used:3400,
   tubes:[30],axle:50,brg:2,front:null,wheelbase:'1045 mm',brakes:null,
   note:'Separate SKU from the direct-drive 401 — different bracing and brakes, so a single-speed frame cannot be converted. Deepest parts availability of any shifter chassis in North America.',
   support:[{name:'Word Racing',city:'multiple',region:'southeast'},{name:'Acceleration Karting',city:'Las Vegas, NV',region:'west'}]},
  {name:'Italkart Supersonic KZ',origin:'Italy',classes:['kz'],price:5975,used:2900,
   tubes:null,axle:null,brg:null,front:null,wheelbase:null,brakes:null,
   note:'Lowest new-roller price among current KZ chassis. Smaller dealer footprint than OTK, so check parts access at your track before committing.',
   support:[{name:'Italian Motors USA',city:'multiple',region:'west'}]},
  {name:'Tony Kart Racer 401 T — DD2',origin:'Italy',classes:['dd2'],price:null,used:null,
   tubes:[30],axle:40,brg:null,
   front:'Multi-hole eccentric bushings with integrated uniball — camber, caster and ride height',
   wheelbase:null,brakes:'BWZ system, 180mm or 206mm rear disc',
   note:'OTK’s flagship in its DD2 form. Ø30mm chrome-molybdenum throughout, and the axle drops to 40mm for DD2 where the OK and KZ versions run 50mm. Carries a removable exhaust support designed specifically for this engine. Deepest parts network of any DD2 frame in North America.',
   support:[{name:'Word Racing',city:'multiple',region:'southeast'},{name:'KartStore-USA',city:'multiple',region:'northeast'},{name:'Acceleration Karting',city:'Las Vegas, NV',region:'west'}]},
  {name:'CompKart Covert 3.0 — DD2',origin:'J3 Competition — United States',classes:['dd2'],price:null,used:null,
   tubes:[30],axle:null,brg:null,front:null,wheelbase:null,
   brakes:'Self-adjusting ventilated system',
   note:'CIK-FIA homologated 34/CH/20, uniform 30mm molybdenum steel built for DD2. The only DD2 frame here from a US-based operation, which usually means faster answers on the phone than an importer can give you.',
   support:[{name:'Karting Concepts',city:'multiple',region:'west'},{name:'Lost Boyz Motorsports',city:'multiple',region:'southeast'}]},
  {name:'Praga Fighter / Dragon Evo — DD2',origin:'Italy (IPK) — single US importer',classes:['dd2'],price:null,used:null,
   tubes:[30],axle:null,brg:null,front:null,wheelbase:null,brakes:null,
   note:'IPK builds both the Fighter and the Dragon Evo in DD2 trim. Distribution runs through one US importer, so confirm parts and lead times before ordering — that matters more on a two-speed than it does on a 206.',
   support:[{name:'Tanda Racing — US importer',city:'Oklahoma',region:'southcentral'}]},
  {name:'Kart Republic KR2 — DD2',origin:'Italy',classes:['dd2'],price:null,used:null,
   tubes:[30],axle:null,brg:null,front:null,wheelbase:null,brakes:null,
   note:'30mm frame with current homologation, configurable to order. Strong in Europe; verify who carries it near you before committing.',
   support:[]},
  {name:'CRG DD2 V13',origin:'Italy',classes:['dd2'],price:null,used:null,
   tubes:null,axle:null,brg:null,front:null,wheelbase:null,brakes:null,
   note:'CRG’s dedicated DD2 frame, long-running and regularly updated. Tubing spec not published in the material we could verify.',
   support:[]},
  {name:'Formula K EVO3 DD2',origin:'Italy',classes:['dd2'],price:null,used:null,
   tubes:null,axle:null,brg:null,front:null,wheelbase:null,brakes:null,
   note:'Current DD2 model from Formula K. Specs not published — worth a call before you shortlist it.',
   support:[]},
  {name:'Sodikart Sigma DD2',origin:'France',classes:['dd2'],price:null,used:null,
   tubes:null,axle:null,brg:null,front:null,wheelbase:null,brakes:null,
   note:'Built specifically around the Rotax DD2 engine block. Sodi is enormous in rental and European competition; US competition support is the open question, not the chassis.',
   support:[]},
  {name:'Croc Promotions MC-01',origin:'Italy',classes:['kz'],price:6295,used:3000,
   tubes:null,axle:null,brg:null,front:null,wheelbase:null,brakes:null,
   note:'Mid-priced KZ roller. Niche in North America — support is the open question, not the chassis.',
   support:[]}
];

function flexScore(k){
  if(k.tubes===null&&k.axle===null)return null;
  let s=0;
  if(k.tubes){s+=(k.tubes.length>1)?3:(k.tubes[0]<=29?1:0);}
  if(k.axle===40)s+=2;else if(k.axle==='40/50')s+=2;else if(k.axle===50)s+=0;else s+=1;
  if(k.brg===2)s+=1;else if(k.brg===3)s+=0;else s+=0.5;
  return Math.min(6,Math.round(s));
}
function verdict(k,cls){
  const c=CLASSES.find(x=>x.id===cls),f=flexScore(k);
  if(cls==='dd2')return{cls:'b-fit',txt:'Built for DD2'};
  if(f===null)return{cls:'b-partial',txt:'Spec unverified'};
  if(c.wants==='flex')return f>=4?{cls:'b-fit',txt:'Suits the class'}:f>=2?{cls:'b-partial',txt:'Stiff for 206'}:{cls:'b-miss',txt:'Too stiff'};
  if(c.wants==='mid')return(f>=2&&f<=4)?{cls:'b-fit',txt:'Suits the class'}:{cls:'b-partial',txt:'Workable'};
  return f<=2?{cls:'b-fit',txt:'Suits the class'}:{cls:'b-partial',txt:'Soft for shifter'};
}

const state={cls:'206sr',cond:'new',budget:9000,region:'southeast',sort:'support'};

function chipGroup(el,items,key){
  el.innerHTML=items.map(i=>`<button class="chip" aria-pressed="${state[key]===i.id}" data-v="${i.id}">${i.label}</button>`).join('');
  el.querySelectorAll('.chip').forEach(b=>b.addEventListener('click',()=>{state[key]=b.dataset.v;chipGroup(el,items,key);render();}));
}

const PX=1.42;
const RAMP=['#D6202A','#CB3A2B','#BF542D','#B36D30','#C6913D','#E0B44A'];
function circle(mm,label){
  const d=mm*PX,r=d/2;
  return `<div class="tube-unit"><svg width="${d}" height="${d}" viewBox="0 0 ${d} ${d}" aria-hidden="true">
    <circle cx="${r}" cy="${r}" r="${r-3}" fill="none" stroke="#F4F5F6" stroke-width="2.5"/>
    <circle cx="${r}" cy="${r}" r="${Math.max(2,r-8)}" fill="none" stroke="#39404A" stroke-width="1"/>
    </svg><div class="tube-cap">${label}</div></div>`;
}
function gauge(k){
  let viz='';
  if(k.tubes)viz+=k.tubes.map(t=>circle(t,t+'mm')).join('');
  if(typeof k.axle==='number')viz+=circle(k.axle,k.axle+'mm axle');
  else if(k.axle==='40/50')viz+=circle(40,'40mm')+circle(50,'50mm');
  if(!viz)viz=`<div class="tube-cap unk" style="padding-top:30px">Specs not published</div>`;
  const f=flexScore(k);
  const segs=[0,1,2,3,4,5].map(i=>{const on=f!==null&&i<f;
    return `<div class="seg${on?' on':''}"${on?` style="background:${RAMP[i]}"`:''}></div>`;}).join('');
  return `<div class="gauge"><div class="gauge-label">Section — drawn to scale</div>
    <div class="tube-row">${viz}</div><div class="flexbar">${segs}</div>
    <div class="flex-cap">${f===null?'Not enough data':`Compliance ${f} / 6 — tubing, axle, bearings`}</div></div>`;
}

function render(){
  const capped=state.budget<9000;
  document.getElementById('budget-val').textContent=capped?'$'+state.budget.toLocaleString():'No cap';
  document.getElementById('budget-note').textContent=state.cond==='new'?'rolling chassis, engine not included':'typical used roller, 2–3 seasons old';
  const cObj=CLASSES.find(c=>c.id===state.cls);
  document.getElementById('stamp').textContent=cObj.label+' · '+cObj.hp;
  let list=KARTS.filter(k=>k.classes.includes(state.cls)).filter(k=>{
    const p=state.cond==='new'?k.price:k.used;
    if(p===null)return true;return !capped||p<=state.budget;});
  const near=k=>k.support.filter(s=>s.region===state.region).length;
  list.sort((a,b)=>{
    if(state.sort==='support')return near(b)-near(a)||a.name.localeCompare(b.name);
    if(state.sort==='flex')return(flexScore(b)??-1)-(flexScore(a)??-1);
    const pa=(state.cond==='new'?a.price:a.used)??99999,pb=(state.cond==='new'?b.price:b.used)??99999;
    return pa-pb;});
  document.getElementById('count').innerHTML=`<span>${list.length} chassis match — presented unranked</span><span>${cObj.label}</span>`;
  const out=document.getElementById('results');
  if(!list.length){
    const isCadet=['206cadet','microswift'].includes(state.cls);
    const isDD2=state.cls==='dd2';
    if(isDD2){
      out.innerHTML=`<div class="empty"><h4>DD2 runs a frame of its own</h4>
        <p>Every frame listed for DD2 is a DD2-specific model, and that is not marketing.
        The DD2 is a chainless design &mdash; the rear axle runs through the engine, so there is no chain
        and no conventional rear end. That, plus front brakes and the extra seat support the regulations
        require, means a DD2 frame is a separate product from a direct-drive or KZ chassis, not a fitment
        of one.</p>
        <p style="margin-top:12px">What the Rotax Max Challenge regulations do fix for you: rear axle no
        more than 50mm, wheelbase up to 1,050mm, and a chassis with valid CIK-FIA homologation for
        international events &mdash; nationally, any chassis sanctioned by an authorised Rotax distributor.
        Start with your distributor rather than a spec sheet.</p></div>`;
      return;
    }
    out.innerHTML=`<div class="empty"><h4>${isCadet?'No cadet data yet':'Nothing under that cap'}</h4>
      <p>${isCadet?'Cadet chassis aren’t in the database yet. It’s the biggest gap here and probably the most valuable one to fill — karting parents make this decision under more pressure and with less information than anyone else in the sport.'
      :'No chassis in this class comes in under that budget. Raise the cap or switch to used.'}</p></div>`;
    return;}
  out.innerHTML=list.map(k=>{
    const v=verdict(k,state.cls),p=state.cond==='new'?k.price:k.used;
    const spec=[
      ['Tubing',k.tubes?(k.tubes.length>1?k.tubes.join('mm / ')+'mm — mixed':k.tubes[0]+'mm — uniform'):null],
      ['Rear axle',typeof k.axle==='number'?k.axle+'mm':(k.axle?k.axle+'mm selectable':null)],
      ['Bearings',k.brg?k.brg+(k.brg===3?' — adjustable cassettes':''):null],
      ['Front adj.',k.front],['Wheelbase',k.wheelbase],['Brakes',k.brakes]
    ].map(([t,d])=>`<dt>${t}</dt><dd>${d?d:'<span class="unk">not published</span>'}</dd>`).join('');
    const nearN=near(k);
    const sup=k.support.length
      ?k.support.map(s=>{const n=s.region===state.region;
        return `<div${n?' class="near"':''}><b>${s.name}</b> — ${s.city}${n?'  ◂ your region':''}</div>`;}).join('')
        +(nearN?'':'<div class="faraway">No dealer in your region — parts by mail</div>')
      :'<div class="faraway">No dealer listed — verify before ordering</div>';
    return `<article class="card"><div class="card-top">
      <div><div class="name">${k.name}</div><div class="origin">${k.origin}</div></div>
      <div class="verdict"><span class="badge ${v.cls}">${v.txt}</span>
      <div class="price">${p===null?'Quote only':'$'+p.toLocaleString()}<small>${state.cond==='new'?'new roller':'used, est.'}</small></div></div>
      </div><div class="card-body">${gauge(k)}<div class="detail"><dl class="spec">${spec}</dl>
      <p class="note">${k.note}</p><div class="support">${sup}</div></div></div></article>`;
  }).join('');
}

function boot(){
  chipGroup(document.getElementById('f-class'),CLASSES,'cls');
  chipGroup(document.getElementById('f-cond'),[{id:'new',label:'New roller'},{id:'used',label:'Used, 2–3 yrs'}],'cond');
  chipGroup(document.getElementById('f-sort'),[{id:'support',label:'Support near me'},{id:'flex',label:'Most compliant'},{id:'price',label:'Lowest price'}],'sort');
  const regSel=document.getElementById('f-region');
  regSel.innerHTML=REGIONS.map(r=>`<option value="${r.id}"${r.id===state.region?' selected':''}>${r.name}</option>`).join('');
  regSel.addEventListener('change',e=>{state.region=e.target.value;render();});
  document.getElementById('f-budget').addEventListener('input',e=>{state.budget=+e.target.value;render();});
  render();
}
document.addEventListener('DOMContentLoaded',boot);
