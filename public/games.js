/* =========================================================
   EVENT HORIZON — GAME LIBRARY
   ---------------------------------------------------------
   To add a game, drop its .html file in a /games folder next
   to index.html and add ONE entry below:

   {
     id: "my-game",              // unique, url-safe (no spaces)
     title: "My Game",
     category: "Arcade",         // any name; filter chips build themselves
     emoji: "👾",                // shown on the card
     hue: 260,                   // 0-360, card color
     desc: "One-line description.",
     src: "games/my-game.html",  // path to your game file
     featured: true              // optional: shows in the hero row
   }

   (Built-in demo games below use `html:` instead of `src:`.
    You can delete them whenever you like.)
   ========================================================= */

window.GAMES = [

  /* ---------- YOUR GAMES GO HERE ---------- */
  {
    id: "escape-road",
    title: "Escape Road",
    category: "Racing",
    emoji: "🚓",
    hue: 60,
    desc: "Outrun the police, dodge traffic and survive as long as you can.",
    src: "games/escape-road.html",
    featured: true
  },

  {
    id: "escape-road2",
    title: "Escape Road 2",
    category: "Racing",
    emoji: "🚓",
    hue: 120,
    desc: "Outrun the police, dodge traffic and survive as long as you can. Upgraded",
    src: "games/escape-road2.html",
    featured: true
  },

  {
    id: "getaway-shootout",
    title: "Getaway Shootout",
    category: "Shooting",
    emoji: "🔫",
    hue: 175,
    desc: "Outrun the police, dodge traffic and survive as long as you can. Upgraded",
    src: "games/getaway-shootout.html",
    featured: true
  },

  {
    id: "level-devil",
    title: "Level Devil",
    category: "Platformer",
    emoji: "👺",
    hue: 700,
    desc: "Play the platformer full of devios tricks and turns!",
    src: "games/level-devil.html",
    featured: true
  },
  // Add more games above this line, like this:
  // { id:"example", title:"Example", category:"Arcade", emoji:"🚀", hue:210, desc:"Replace me.", src:"games/example.html" },


  /* ---------- BUILT-IN DEMO GAMES ---------- */
  {
    id: "nebula-snake",
    title: "Nebula Snake",
    category: "Arcade",
    emoji: "🐍",
    hue: 275,
    desc: "Eat stardust, grow longer, don't bite yourself. Arrow keys or swipe.",
    featured: true,
    html: `<!doctype html><meta name=viewport content="width=device-width,initial-scale=1">
<body style="margin:0;background:#0b0b1a;display:flex;align-items:center;justify-content:center;height:100vh;color:#cfd0ff;font-family:system-ui,sans-serif">
<div style="text-align:center"><canvas id=cv width=400 height=400 style="background:#111128;border-radius:14px;max-width:88vmin;max-height:76vmin;box-shadow:0 0 40px #7c5cff55"></canvas>
<div id=hud style="margin-top:12px;font-size:15px">Score: 0 — arrows / swipe</div></div>
<script>
var cv=document.getElementById('cv'),g=cv.getContext('2d'),hud=document.getElementById('hud'),N=20,S=20,sn,dir,food,score,alive;
function init(){sn=[{x:10,y:10}];dir={x:1,y:0};score=0;alive=true;place();hud.textContent='Score: 0 — arrows / swipe';}
function place(){food={x:Math.random()*N|0,y:Math.random()*N|0};if(sn.some(function(p){return p.x==food.x&&p.y==food.y}))place();}
function step(){if(!alive)return;var h={x:(sn[0].x+dir.x+N)%N,y:(sn[0].y+dir.y+N)%N};
 if(sn.some(function(p){return p.x==h.x&&p.y==h.y})){alive=false;hud.textContent='Game over — '+score+' pts. Space / tap to restart';return}
 sn.unshift(h);if(h.x==food.x&&h.y==food.y){score++;hud.textContent='Score: '+score;place()}else sn.pop();}
function draw(){g.fillStyle='#111128';g.fillRect(0,0,400,400);g.fillStyle='#ff4d8d';g.beginPath();g.arc(food.x*S+10,food.y*S+10,7,0,7);g.fill();
 sn.forEach(function(p,i){g.fillStyle=i?'#7c5cff':'#c9bcff';g.fillRect(p.x*S+1,p.y*S+1,S-2,S-2)})}
function turn(x,y){if(x!=-dir.x||y!=-dir.y)dir={x:x,y:y}}
addEventListener('keydown',function(e){var m={ArrowUp:[0,-1],ArrowDown:[0,1],ArrowLeft:[-1,0],ArrowRight:[1,0]}[e.key];
 if(m){e.preventDefault();turn(m[0],m[1])}if(e.key==' '){e.preventDefault();if(!alive)init()}});
var tx,ty;addEventListener('touchstart',function(e){tx=e.touches[0].clientX;ty=e.touches[0].clientY;if(!alive)init()});
addEventListener('touchend',function(e){var dx=e.changedTouches[0].clientX-tx,dy=e.changedTouches[0].clientY-ty;
 if(Math.abs(dx)>Math.abs(dy))turn(dx>0?1:-1,0);else turn(0,dy>0?1:-1)});
init();setInterval(function(){step();draw()},110);
<\/script></body>`
  },
  {
    id: "star-match",
    title: "Star Match",
    category: "Puzzle",
    emoji: "🪐",
    hue: 195,
    desc: "Flip cards and match the cosmic pairs in as few moves as you can.",
    featured: true,
    html: `<!doctype html><meta name=viewport content="width=device-width,initial-scale=1">
<body style="margin:0;background:#07142a;color:#d7efff;font-family:system-ui,sans-serif;display:flex;align-items:center;justify-content:center;height:100vh">
<div style="text-align:center"><div id=grid style="display:grid;grid-template-columns:repeat(4,min(18vmin,90px));gap:10px;justify-content:center"></div>
<p id=info style="margin:16px 0 8px">Moves: 0</p><button id=rs style="background:#1fb6ff;border:0;color:#04121f;font-weight:700;padding:8px 18px;border-radius:999px;cursor:pointer">Shuffle</button></div>
<script>
var E=['🌙','☀️','🪐','⭐','☄️','🚀','👽','🛰️'],grid=document.getElementById('grid'),info=document.getElementById('info'),first,lock,moves,found;
function start(){var d=E.concat(E).sort(function(){return Math.random()-.5});grid.innerHTML='';moves=0;found=0;first=null;lock=false;info.textContent='Moves: 0';
 d.forEach(function(e){var b=document.createElement('button');b.dataset.e=e;b.style.cssText='height:min(18vmin,90px);font-size:min(9vmin,42px);border:0;border-radius:14px;background:#12335f;color:transparent;cursor:pointer;transition:.2s';
  b.onclick=function(){if(lock||b.dataset.open)return;show(b);if(!first){first=b;return}moves++;info.textContent='Moves: '+moves;
   if(first.dataset.e==b.dataset.e){first.dataset.done=b.dataset.done=1;first=null;if(++found==8)info.textContent='Cleared in '+moves+' moves! 🎉'}
   else{lock=true;var a=first;first=null;setTimeout(function(){hide(a);hide(b);lock=false},650)}};grid.appendChild(b)})}
function show(b){b.dataset.open=1;b.style.background='#1fb6ff';b.style.color='#fff';b.textContent=b.dataset.e}
function hide(b){delete b.dataset.open;b.style.background='#12335f';b.style.color='transparent'}
document.getElementById('rs').onclick=start;start();
<\/script></body>`
  },
  {
    id: "gravity-dodge",
    title: "Gravity Dodge",
    category: "Action",
    emoji: "☄️",
    hue: 15,
    desc: "Slide through a meteor storm. Move your mouse or finger to survive.",
    featured: true,
    html: `<!doctype html><meta name=viewport content="width=device-width,initial-scale=1">
<body style="margin:0;background:#12060a;display:flex;align-items:center;justify-content:center;height:100vh;color:#ffd9c9;font-family:system-ui,sans-serif">
<div style="text-align:center"><canvas id=cv width=480 height=480 style="background:#1c0a10;border-radius:14px;max-width:88vmin;max-height:76vmin;touch-action:none;box-shadow:0 0 40px #ff6a3d44"></canvas>
<div id=hud style="margin-top:12px">Time: 0.0s</div></div>
<script>
var cv=document.getElementById('cv'),g=cv.getContext('2d'),hud=document.getElementById('hud'),px,orbs,t0,over,best=0,spawn;
function init(){px=240;orbs=[];t0=performance.now();over=false;spawn=0}
function move(cx){var r=cv.getBoundingClientRect();px=Math.max(14,Math.min(466,(cx-r.left)*480/r.width))}
cv.addEventListener('pointermove',function(e){move(e.clientX)});cv.addEventListener('pointerdown',function(e){move(e.clientX);if(over)init()});
function loop(now){var t=(now-t0)/1000;g.fillStyle='#1c0a10';g.fillRect(0,0,480,480);
 if(!over){spawn-=1;if(spawn<=0){orbs.push({x:Math.random()*480,y:-20,r:8+Math.random()*16,v:2+Math.random()*2+t/12});spawn=Math.max(8,34-t)}
  orbs.forEach(function(o){o.y+=o.v;if(Math.hypot(o.x-px,o.y-450)<o.r+12){over=true;best=Math.max(best,t)}});
  orbs=orbs.filter(function(o){return o.y<500});hud.textContent='Time: '+t.toFixed(1)+'s   Best: '+best.toFixed(1)+'s'}
 else hud.textContent='Crashed at '+((best)).toFixed(1)+'s — click to retry';
 g.fillStyle='#ff6a3d';orbs.forEach(function(o){g.beginPath();g.arc(o.x,o.y,o.r,0,7);g.fill()});
 g.fillStyle='#fff';g.beginPath();g.moveTo(px,436);g.lineTo(px-12,462);g.lineTo(px+12,462);g.fill();requestAnimationFrame(loop)}
init();requestAnimationFrame(loop);
<\/script></body>`
  }

];
