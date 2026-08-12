/* ============================================================
   Chasing Checkerz — shared site furniture
   Injects: floating social rail, footer social row, race ticker.
   Loaded on every page. Edit handles + calendar here, once.
   ============================================================ */

/* ---- 1. SOCIAL HANDLES ------------------------------------
   Icons always render. A platform only becomes a real link when
   it has BOTH a url and enabled:true. Until then it draws as an
   inert, dimmed icon — no href, nothing to click or crawl.
------------------------------------------------------------ */
const SOCIALS = [
  // NOT CONNECTED. Leave url empty and enabled false until the
  // domain and the accounts exist. Then paste the real profile
  // URL and flip enabled to true. One edit, every page.
  {id:'youtube',   label:'YouTube',   url:'', enabled:false},
  {id:'instagram', label:'Instagram', url:'', enabled:false},
  {id:'tiktok',    label:'TikTok',    url:'', enabled:false},
  {id:'facebook',  label:'Facebook',  url:'', enabled:false},
  {id:'x',         label:'X',         url:'', enabled:false}
];

const ICONS = {
  youtube:'<path d="M23 12s0-3.4-.4-5a2.6 2.6 0 0 0-1.8-1.8C19.1 4.8 12 4.8 12 4.8s-7.1 0-8.8.4A2.6 2.6 0 0 0 1.4 7C1 8.6 1 12 1 12s0 3.4.4 5a2.6 2.6 0 0 0 1.8 1.8c1.7.4 8.8.4 8.8.4s7.1 0 8.8-.4A2.6 2.6 0 0 0 22.6 17c.4-1.6.4-5 .4-5z"/><path d="M9.8 15.3V8.7l5.7 3.3z" fill="currentColor" stroke="none"/>',
  instagram:'<rect x="2.5" y="2.5" width="19" height="19" rx="5.2"/><circle cx="12" cy="12" r="4.3"/><circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" stroke="none"/>',
  tiktok:'<path d="M15.6 3.2c.5 2.3 2 4 4.4 4.3v3.1a7.9 7.9 0 0 1-4.4-1.5v6.4a5.9 5.9 0 1 1-5.9-5.9c.3 0 .6 0 .9.1v3.2a2.8 2.8 0 1 0 2 2.7V3.2z"/>',
  facebook:'<path d="M14.6 21.5v-8.4h2.9l.5-3.4h-3.4V7.5c0-1 .3-1.7 1.7-1.7h1.8V2.7a24 24 0 0 0-2.6-.2c-2.6 0-4.4 1.6-4.4 4.6v2.6H8.2v3.4h2.9v8.4z"/>',
  x:'<path d="M3 3l7.6 9.9L3.4 21h2.2l6-6.7 5.1 6.7H21l-8-10.4L20.4 3h-2.2l-5.6 6.2L7.9 3z"/>'
};

/* ---- 2. RACE CALENDAR -------------------------------------
   2026 national rounds, from the series' own published
   schedules. The ticker sorts these against today's date, so
   past events fall off and upcoming ones surface by themselves.
   Add rounds as calendars are published. Dates are ISO.
------------------------------------------------------------ */
const RACES = [
  {series:'CKNA',   round:'Winter Nationals',    track:'103rd Street Sports Complex',  loc:'Jacksonville, FL', start:'2026-01-01', end:'2026-01-03'},
  {series:'CKNA',   round:'South Round 1',       track:'Finishline Performance Karting',loc:'Biloxi, MS',      start:'2026-02-20', end:'2026-02-22'},
  {series:'CotA',   round:'Round 1',             track:'K1 Circuit',                   loc:'Winchester, CA',   start:'2026-02-20', end:'2026-02-22'},
  {series:'CKNA',   round:'Spring Nationals',    track:'Charlotte Motor Speedway',     loc:'Concord, NC',      start:'2026-03-06', end:'2026-03-08'},
  {series:'CKNA',   round:'South Round 2',       track:'Daytona International Speedway',loc:'Daytona Beach, FL',start:'2026-03-20', end:'2026-03-22'},
  {series:'USPKS',  round:'Carolina Grand Prix', track:'Trackhouse Motorplex',         loc:'Mooresville, NC',  start:'2026-04-10', end:'2026-04-12'},
  {series:'CotA',   round:'Round 2',             track:'Phoenix Kart Racing Association',loc:'Glendale, AZ',   start:'2026-04-17', end:'2026-04-19'},
  {series:'CKNA',   round:'South Round 3',       track:'Music City Kartplex',          loc:'Shelbyville, TN',  start:'2026-04-24', end:'2026-04-26'},
  {series:'Route 66',round:'Round 1',            track:'New Castle Motorsports Park',  loc:'New Castle, IN',   start:'2026-04-24', end:'2026-04-26'},
  {series:'CKNA',   round:'North Round 1',       track:'G&J Kartway',                  loc:'Camden, OH',       start:'2026-05-02', end:'2026-05-03'},
  {series:'CotA',   round:'Round 3',             track:'Colorado Karting Circuit',     loc:'Centennial, CO',   start:'2026-05-29', end:'2026-05-31'},
  {series:'CKNA',   round:'East Round 1',        track:'Quaker City Motorsports Park', loc:'Salem, OH',        start:'2026-06-06', end:'2026-06-07'},
  {series:'SKUSA',  round:'SpringNationals',     track:'Motorsports Country Club of Cincinnati', loc:'Batavia, OH', start:'2026-06-12', end:'2026-06-14'},
  {series:'USPKS',  round:'Heartland Grand Prix',track:'New Castle Motorsports Park',  loc:'New Castle, IN',   start:'2026-06-25', end:'2026-06-28'},
  {series:'CotA',   round:'Round 4',             track:'Sonoma Raceway',               loc:'Sonoma, CA',       start:'2026-07-10', end:'2026-07-12'},
  {series:'SKUSA',  round:'SummerNationals',     track:'New Castle Motorsports Park',  loc:'New Castle, IN',   start:'2026-07-24', end:'2026-07-26'},
  {series:'Rotax',  round:'RMC Trophy Final',    track:'New Castle Motorsports Park',  loc:'New Castle, IN',   start:'2026-07-31', end:'2026-08-02'},
  {series:'USPKS',  round:'Ohio Grand Prix',     track:'Motorsports Country Club of Cincinnati', loc:'Batavia, OH', start:'2026-08-07', end:'2026-08-09'},
  {series:'Route 66',round:'Round 4',            track:'Briggs & Stratton Motorplex at Road America', loc:'Elkhart Lake, WI', start:'2026-08-14', end:'2026-08-16'},
  {series:'ROK',    round:'ROK Vegas',           track:'Rio All-Suites Hotel & Casino',loc:'Las Vegas, NV',    start:'2026-10-28', end:'2026-11-01'}
];

/* ---- 3. RENDER -------------------------------------------- */
(function(){
  // Every platform renders. Those without a live url render as inert
  // markup — no href, not focusable, nothing to click or crawl.
  const all  = SOCIALS.filter(s=>ICONS[s.id]);
  const live = all.filter(s=>s.enabled && s.url);
  const anyLive = live.length>0;
  if(!all.length) return;

  function icon(id,size){
    return '<svg viewBox="0 0 24 24" width="'+size+'" height="'+size+'" fill="none" '+
           'stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true">'+
           ICONS[id]+'</svg>';
  }
  function node(s,size){
    if(s.enabled && s.url){
      return '<a href="'+s.url+'" target="_blank" rel="noopener noreferrer" title="'+s.label+
             '" aria-label="Chasing Checkerz on '+s.label+'">'+icon(s.id,size)+'</a>';
    }
    return '<span class="soon" role="img" title="'+s.label+' \u2014 coming soon" '+
           'aria-label="'+s.label+' \u2014 coming soon">'+icon(s.id,size)+'</span>';
  }

  /* floating rail */
  const rail=document.createElement('nav');
  rail.className='srail';
  rail.setAttribute('aria-label','Chasing Checkerz on social media');
  rail.innerHTML='<span class="srail-spine" aria-hidden="true"></span>'+
    all.map(s=>node(s,26)).join('')+
    (anyLive?'':'<span class="srail-soon">Soon</span>')+
    '<span class="srail-spine" aria-hidden="true"></span>';
  document.body.appendChild(rail);

  /* footer row */
  const row='<span class="sfoot">'+all.map(s=>node(s,20)).join('')+
            (anyLive?'':'<span class="sfoot-soon">Launching soon</span>')+'</span>';
  const foot=document.querySelector('.sitefoot');
  if(foot){
    const r=foot.querySelector('.r');
    if(r) r.insertAdjacentHTML('beforebegin',row); else foot.insertAdjacentHTML('beforeend',row);
  } else {
    const alt=document.querySelector('.switcher-in');
    if(alt){const sp=alt.querySelector('.sp'); if(sp) sp.insertAdjacentHTML('beforebegin',row); else alt.insertAdjacentHTML('beforeend',row);}
  }

  /* ticker */
  const slot=document.getElementById('ticker');
  if(slot){
    const today=new Date(); today.setHours(0,0,0,0);
    const parse=d=>{const p=d.split('-');return new Date(+p[0],+p[1]-1,+p[2]);};
    const fmt=r=>{
      const s=parse(r.start), e=parse(r.end);
      const M=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      return s.getMonth()===e.getMonth()
        ? M[s.getMonth()]+' '+s.getDate()+'\u2013'+e.getDate()
        : M[s.getMonth()]+' '+s.getDate()+'\u2013'+M[e.getMonth()]+' '+e.getDate();
    };
    const upcoming=RACES.filter(r=>parse(r.end)>=today).sort((a,b)=>parse(a.start)-parse(b.start));
    const recent  =RACES.filter(r=>parse(r.end)< today).sort((a,b)=>parse(b.start)-parse(a.start)).slice(0,4);

    const item=(r,kind)=>'<span class="tk-item"><b class="tk-'+kind+'">'+
      (kind==='next'?'Next':'Latest')+'</b><span class="tk-ser">'+r.series+'</span>'+
      '<span class="tk-rd">'+r.round+'</span><span class="tk-tr">'+r.track+'</span>'+
      '<span class="tk-loc">'+r.loc+'</span><span class="tk-dt">'+fmt(r)+'</span></span>';

    let items=upcoming.slice(0,4).map(r=>item(r,'next')).concat(recent.map(r=>item(r,'past')));
    if(!items.length){
      slot.innerHTML='<div class="ticker"><div class="tk-rail"><span class="tk-item">'+
        '<b class="tk-past">Season</b><span class="tk-rd">2026 national calendar complete</span>'+
        '<span class="tk-loc">2027 schedules publish over the winter</span></span></div></div>';
      return;
    }
    const strip=items.join('');
    slot.innerHTML='<div class="ticker" aria-label="Race calendar">'+
      '<span class="tk-tag">Calendar</span>'+
      '<div class="tk-win"><div class="tk-rail">'+strip+strip+'</div></div></div>';
  }
})();

/* Grouped nav menus. Keyboard and touch friendly: Escape closes, clicking
   outside closes, arrow keys walk the items, and only one menu opens at a time. */
(function(){
  var groups = Array.prototype.slice.call(document.querySelectorAll('.sitenav .navgrp'));
  if(!groups.length) return;

  function closeAll(except){
    groups.forEach(function(g){
      if(g===except) return;
      g.querySelector('.navmenu').classList.remove('open');
      g.querySelector('button').setAttribute('aria-expanded','false');
    });
  }

  groups.forEach(function(g){
    var btn=g.querySelector('button'), menu=g.querySelector('.navmenu');
    if(!btn||!menu) return;

    btn.addEventListener('click', function(e){
      e.stopPropagation();
      var open=menu.classList.contains('open');
      closeAll(g);
      menu.classList.toggle('open', !open);
      btn.setAttribute('aria-expanded', String(!open));
    });

    btn.addEventListener('keydown', function(e){
      if(e.key==='ArrowDown'){
        e.preventDefault();
        closeAll(g);
        menu.classList.add('open');
        btn.setAttribute('aria-expanded','true');
        var first=menu.querySelector('a'); if(first) first.focus();
      }
    });

    menu.addEventListener('keydown', function(e){
      var items=Array.prototype.slice.call(menu.querySelectorAll('a'));
      var i=items.indexOf(document.activeElement);
      if(e.key==='ArrowDown'){ e.preventDefault(); (items[i+1]||items[0]).focus(); }
      else if(e.key==='ArrowUp'){ e.preventDefault(); (items[i-1]||items[items.length-1]).focus(); }
    });
  });

  document.addEventListener('click', function(){ closeAll(null); });
  document.addEventListener('keydown', function(e){
    if(e.key!=='Escape') return;
    var open=document.querySelector('.navmenu.open');
    if(!open) return;
    var g=open.closest('.navgrp');
    closeAll(null);
    if(g) g.querySelector('button').focus();
  });
})();
