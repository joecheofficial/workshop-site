// The full p5.js game, moved unchanged from the old page (15 Oct 2026). Only the
// three em dashes in code comments became colons (pack page rule: no em dashes).
// Paste into editor.p5js.org to play.

export const GAME_CODE = `// ============================================================
// GEOMETRY DASH CLONE: Your Build
// Made with p5.js · Paste into editor.p5js.org to play!
// ============================================================

// =============================================
// CHANGE THESE TO CUSTOMIZE YOUR GAME
// =============================================

// How the game feels
const GRAVITY      = 0.70;   // higher = heavier (try 0.5 or 1.2)
const JUMP_FORCE   = -13.5;  // more negative = higher jump (try -18)
const PLAYER_SPEED = 6.5;    // starting speed (try 9 for speed run)
const MAX_FALL     = 15;     // how fast the cube falls

// Your cube
const CUBE_SIZE    = 38;
const GROUND_Y     = 400;    // where the ground is

// Colors: change any hex code to any color you want!
const CUBE_COLOR   = '#FFD700';  // your cube (gold)
const SPIKE_COLOR  = '#FF3300';  // spikes
const PLAT_COLOR   = '#2244DD';  // platforms
const BG_START     = '#0d0020';  // sky color at start (dark purple)
const BG_END       = '#001830';  // sky color at end (dark blue)

// =============================================
// LEVEL DESIGN: add your own obstacles here!
// =============================================
// spike:    { type: 'spike', x: 700 }
// double:   { type: 'double', x: 900 }
// platform: { type: 'platform', x: 1400, yOff: -115, w: 120 }
//   yOff = how high above ground (negative). w = width.

const LEVEL_DEFS = [
  { type: 'spike',    x: 650 },
  { type: 'spike',    x: 850 },
  { type: 'spike',    x: 1050 },
  { type: 'double',   x: 1250 },
  { type: 'platform', x: 1520, yOff: -115, w: 130 },
  { type: 'spike',    x: 1760 },
  { type: 'double',   x: 1950 },
  { type: 'spike',    x: 2150 },
  { type: 'spike',    x: 2230 },
  { type: 'spike',    x: 2310 },
  { type: 'double',   x: 2500 },
  { type: 'platform', x: 2750, yOff: -120, w: 110 },
  { type: 'double',   x: 2960 },
  { type: 'spike',    x: 3160 },
  { type: 'double',   x: 3310 },
  { type: 'spike',    x: 3470 },
  { type: 'double',   x: 3620 },
  { type: 'spike',    x: 3760 },
  { type: 'double',   x: 3900 },
];

const LEVEL_LENGTH = 4400;

// =============================================
// GAME ENGINE
// =============================================
let worldX = 0, player, particles = [], gameState = 'playing', attempts = 1, jumpHeld = false, obstacles;

function setup() {
  createCanvas(800, 480);
  frameRate(60);
  obstacles = buildObstacles();
  resetPlayer();
}

function resetPlayer() {
  player = { x: 150, y: GROUND_Y - CUBE_SIZE, vy: 0, onGround: true, rotation: 0 };
}

function draw() {
  drawBG();
  if (gameState === 'playing') {
    updatePlayer();
    checkCollisions();
    if (worldX >= LEVEL_LENGTH) gameState = 'win';
  }
  updateParticles();
  drawGround();
  drawAllObstacles();
  drawPlayer();
  drawParticles();
  drawHUD();
  if (gameState === 'dead') drawDeathScreen();
  if (gameState === 'win')  drawWinScreen();
}

function drawBG() {
  let t = constrain(worldX / LEVEL_LENGTH, 0, 1);
  let top = lerpColor(color(BG_START), color(BG_END), t);
  let bot = lerpColor(color('#000010'), color('#002244'), t);
  for (let y = 0; y < height; y++) {
    stroke(lerpColor(top, bot, map(y, 0, height, 0, 1)));
    line(0, y, width, y);
  }
  stroke(255, 255, 255, 14); strokeWeight(0.5);
  let gx = (-worldX % 60 + 60) % 60;
  for (let x = gx; x < width; x += 60) line(x, GROUND_Y, x, height);
  for (let y = GROUND_Y; y < height; y += 60) line(0, y, width, y);
  strokeWeight(1);
}

function drawGround() {
  noStroke(); fill(20, 20, 50);
  rect(0, GROUND_Y, width, height - GROUND_Y);
  drawingContext.shadowBlur = 14; drawingContext.shadowColor = '#5566FF';
  stroke('#5566FF'); strokeWeight(2);
  line(0, GROUND_Y, width, GROUND_Y);
  drawingContext.shadowBlur = 0; strokeWeight(1);
}

function updatePlayer() {
  player.vy += GRAVITY; player.vy = min(player.vy, MAX_FALL); player.y += player.vy;
  if (player.y >= GROUND_Y - CUBE_SIZE) {
    player.y = GROUND_Y - CUBE_SIZE; player.vy = 0; player.onGround = true;
    player.rotation = round(player.rotation / 90) * 90;
    if (jumpHeld) doJump();
  } else { player.onGround = false; }
  if (!player.onGround) player.rotation += 7;
  worldX += PLAYER_SPEED + map(worldX, 0, LEVEL_LENGTH, 0, 3.5);
}

function doJump() {
  if (player.onGround) { player.vy = JUMP_FORCE; player.onGround = false; }
}

function drawPlayer() {
  push();
  translate(player.x + CUBE_SIZE / 2, player.y + CUBE_SIZE / 2);
  rotate(radians(player.rotation));
  drawingContext.shadowBlur = 20; drawingContext.shadowColor = CUBE_COLOR;
  fill(CUBE_COLOR); noStroke(); rectMode(CENTER);
  rect(0, 0, CUBE_SIZE, CUBE_SIZE, 5);
  drawingContext.shadowBlur = 0; fill(255, 255, 255, 90);
  rect(0, 0, CUBE_SIZE * 0.52, CUBE_SIZE * 0.52, 2);
  fill(CUBE_COLOR); rotate(PI / 4);
  rect(0, 0, CUBE_SIZE * 0.2, CUBE_SIZE * 0.2);
  pop(); rectMode(CORNER); drawingContext.shadowBlur = 0;
}

function buildObstacles() {
  let list = [];
  for (let def of LEVEL_DEFS) {
    let sz = def.size || 55;
    if (def.type === 'spike')  list.push(makeSpike(def.x, sz, GROUND_Y));
    if (def.type === 'double') { list.push(makeSpike(def.x, sz, GROUND_Y)); list.push(makeSpike(def.x + sz + 2, sz, GROUND_Y)); }
    if (def.type === 'platform') {
      let w = def.w || 120, ph = 18, py = GROUND_Y + (def.yOff || -100) - ph;
      list.push({ type:'platform', wx:def.x, drawY:py, w, h:ph, hx:def.x, hy:py, hw:w, hh:ph });
    }
  }
  return list;
}

function makeSpike(wx, sz, baseY) {
  return { type:'spike', wx, drawY:baseY-sz, size:sz, hx:wx-sz/2+10, hy:baseY-sz+12, hw:sz-20, hh:sz-12 };
}

function drawAllObstacles() {
  for (let obs of obstacles) {
    let sx = obs.wx - worldX;
    if (sx < -120 || sx > width + 120) continue;
    if (obs.type === 'spike')    drawSpike(sx, obs.drawY, obs.size);
    if (obs.type === 'platform') drawPlatform(sx, obs.drawY, obs.w, obs.h);
  }
}

function drawSpike(cx, y, sz) {
  drawingContext.shadowBlur = 14; drawingContext.shadowColor = '#FF4400';
  fill(SPIKE_COLOR); stroke('#FF7700'); strokeWeight(1.5);
  triangle(cx, y, cx - sz/2, y + sz, cx + sz/2, y + sz);
  stroke(255, 180, 50, 160); strokeWeight(1);
  line(cx, y, cx - sz/2, y + sz);
  strokeWeight(1); drawingContext.shadowBlur = 0;
}

function drawPlatform(sx, y, w, h) {
  drawingContext.shadowBlur = 10; drawingContext.shadowColor = '#4466FF';
  fill(PLAT_COLOR); stroke('#5577FF'); strokeWeight(1.5);
  rect(sx, y, w, h, 3);
  stroke('#88AAFF'); strokeWeight(2);
  line(sx + 3, y + 2, sx + w - 3, y + 2);
  strokeWeight(1); drawingContext.shadowBlur = 0;
}

function checkCollisions() {
  let px = player.x + 5, py = player.y + 5, pw = CUBE_SIZE - 10, ph = CUBE_SIZE - 10;
  for (let obs of obstacles) {
    let osx = obs.hx - worldX;
    if (osx + obs.hw < 0 || osx > width) continue;
    if (!aabb(px, py, pw, ph, osx, obs.hy, obs.hw, obs.hh)) continue;
    if (obs.type === 'spike') { triggerDeath(); return; }
    if (obs.type === 'platform') {
      let prevBot = py + ph - player.vy;
      if (player.vy > 0 && prevBot <= obs.hy + 3) {
        player.y = obs.hy - CUBE_SIZE; player.vy = 0; player.onGround = true;
        player.rotation = round(player.rotation / 90) * 90;
        if (jumpHeld) doJump();
      } else { triggerDeath(); return; }
    }
  }
}

function aabb(ax, ay, aw, ah, bx, by, bw, bh) {
  return ax < bx+bw && ax+aw > bx && ay < by+bh && ay+ah > by;
}

function triggerDeath() {
  gameState = 'dead';
  let cx = player.x + CUBE_SIZE/2, cy = player.y + CUBE_SIZE/2;
  for (let i = 0; i < 30; i++) {
    let a = random(TWO_PI), spd = random(2.5, 11);
    particles.push({ x:cx, y:cy, vx:cos(a)*spd, vy:sin(a)*spd-random(1,5),
      life:255, size:random(3,10), shape:random()>0.5?'rect':'tri',
      rot:random(TWO_PI), rs:random(-0.3,0.3), col:random([CUBE_COLOR,'#FFFFFF','#FFB300']) });
  }
}

function updateParticles() {
  for (let i = particles.length-1; i>=0; i--) {
    let p = particles[i];
    p.vy += 0.4; p.x += p.vx; p.y += p.vy; p.rot += p.rs; p.life -= 5;
    if (p.life <= 0) particles.splice(i,1);
  }
}

function drawParticles() {
  noStroke();
  for (let p of particles) {
    push(); translate(p.x, p.y); rotate(p.rot);
    let c = color(p.col); fill(red(c), green(c), blue(c), p.life);
    if (p.shape === 'rect') { rectMode(CENTER); rect(0,0,p.size,p.size); }
    else triangle(0,-p.size,-p.size/2,p.size/2,p.size/2,p.size/2);
    pop();
  }
  rectMode(CORNER);
}

function drawHUD() {
  let prog = constrain(worldX / LEVEL_LENGTH, 0, 1);
  noStroke(); fill(0,0,0,100); rect(40,10,width-80,15,7);
  fill(lerpColor(color('#00FFCC'), color('#FFDD00'), prog));
  drawingContext.shadowBlur = 8; drawingContext.shadowColor = '#00FFCC';
  rect(40,10,(width-80)*prog,15,7);
  drawingContext.shadowBlur = 0;
  fill(255,255,255,200); noStroke(); textSize(11); textAlign(CENTER,CENTER);
  text(floor(prog*100)+'%', width/2, 17);
  textAlign(LEFT,TOP); fill(255,255,255,100); textSize(11);
  text('Attempt '+attempts, 8, 30);
}

function drawDeathScreen() {
  if (particles.length > 8) return;
  fill(0,0,0,165); noStroke(); rect(0,0,width,height);
  fill('#FF5555'); textSize(52); textAlign(CENTER,CENTER);
  text(floor(constrain(worldX/LEVEL_LENGTH,0,1)*100)+'%', width/2, height/2-45);
  fill(255,255,255,210); textSize(16);
  text('Click or press SPACE to try again', width/2, height/2+12);
  fill(255,255,255,70); textSize(11);
  text('Attempt '+attempts, width/2, height/2+42);
}

function drawWinScreen() {
  fill(0,0,0,170); noStroke(); rect(0,0,width,height);
  fill('#FFD700'); textSize(56); textAlign(CENTER,CENTER);
  text('100%', width/2, height/2-55);
  fill('#FFFFFF'); textSize(24); text('LEVEL COMPLETE', width/2, height/2+5);
  fill(255,255,255,140); textSize(14);
  text('Click or press SPACE to play again', width/2, height/2+48);
}

function keyPressed()  { if (key===' '||keyCode===UP_ARROW) { jumpHeld=true;  handleAction(); } }
function keyReleased() { if (key===' '||keyCode===UP_ARROW)   jumpHeld=false; }
function mousePressed()  { jumpHeld=true;  handleAction(); }
function mouseReleased() { jumpHeld=false; }
function touchStarted()  { jumpHeld=true;  handleAction(); return false; }
function touchEnded()    { jumpHeld=false; return false; }

function handleAction() {
  if (gameState==='playing') { doJump(); return; }
  if (gameState==='dead' && particles.length<=8) { restart(); return; }
  if (gameState==='win') { restart(); return; }
}

function restart() {
  attempts++; worldX=0; particles=[]; gameState='playing'; resetPlayer();
}`
