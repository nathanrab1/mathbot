// ── Turtle Graphics Engine ──────────────────────────────────
// Grid configurável — compartilhado entre draw.html e tutorial.html

const CELL = 40;
let GRID_COLS = 8;
let GRID_ROWS = 8;
let CANVAS_W  = 320;
let CANVAS_H  = 320;
let GRID_MIN_X, GRID_MAX_X, GRID_MIN_Y, GRID_MAX_Y;

let preDrawnCells = {};

function initGrid(cols, rows) {
  GRID_COLS  = cols;
  GRID_ROWS  = rows;
  CANVAS_W   = cols * CELL;
  CANVAS_H   = rows * CELL;
  GRID_MIN_X = CELL / 2;
  GRID_MAX_X = (cols - 1) * CELL + CELL / 2;
  GRID_MIN_Y = CELL / 2;
  GRID_MAX_Y = (rows - 1) * CELL + CELL / 2;

  const canvas = document.getElementById('turtle-canvas');
  if (canvas) {
    canvas.width  = CANVAS_W;
    canvas.height = CANVAS_H;
  }
}

function setPreDrawn(cells) {
  preDrawnCells = cells || {};
}

function cellKey(cx, cy) {
  const col = Math.round((cx - CELL / 2) / CELL);
  const row = Math.round((cy - CELL / 2) / CELL);
  return row + ',' + col;
}

function makeTurtle(startRow = 0, startCol = 0) {
  return {
    x: startCol * CELL + CELL / 2,
    y: startRow * CELL + CELL / 2,
    angle: 90,   // 90° = leste = direita
    penColor: '#e74c3c',
    painted: {}
  };
}

let turtle = makeTurtle();

function paintCurrentCell() {
  turtle.painted[cellKey(turtle.x, turtle.y)] = turtle.penColor;
}

function render() {
  const canvas = document.getElementById('turtle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

  // 1. Xadrez de fundo
  for (let r = 0; r < GRID_ROWS; r++) {
    for (let c = 0; c < GRID_COLS; c++) {
      ctx.fillStyle = (r + c) % 2 === 0 ? '#f8f9fb' : '#ffffff';
      ctx.fillRect(c * CELL, r * CELL, CELL, CELL);
    }
  }

  // 2. Células pré-desenhadas (guias do desafio)
  for (const [key, color] of Object.entries(preDrawnCells)) {
    const [r, c] = key.split(',').map(Number);
    ctx.fillStyle = color;
    ctx.fillRect(c * CELL, r * CELL, CELL, CELL);
  }

  // 3. Células pintadas pelo programa
  for (const [key, color] of Object.entries(turtle.painted)) {
    const [r, c] = key.split(',').map(Number);
    ctx.fillStyle = color;
    ctx.fillRect(c * CELL, r * CELL, CELL, CELL);
  }

  // 4. Linhas de grade
  ctx.save();
  ctx.strokeStyle = 'rgba(0,0,0,0.12)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= GRID_COLS; i++) {
    ctx.beginPath(); ctx.moveTo(i * CELL, 0); ctx.lineTo(i * CELL, CANVAS_H); ctx.stroke();
  }
  for (let i = 0; i <= GRID_ROWS; i++) {
    ctx.beginPath(); ctx.moveTo(0, i * CELL); ctx.lineTo(CANVAS_W, i * CELL); ctx.stroke();
  }
  ctx.restore();

  // 5. Tartaruga
  const rad = turtle.angle * Math.PI / 180;
  ctx.save();
  ctx.translate(turtle.x, turtle.y);
  ctx.rotate(rad);

  ctx.shadowColor   = 'rgba(0,0,0,0.22)';
  ctx.shadowBlur    = 5;
  ctx.shadowOffsetY = 2;
  ctx.fillStyle   = '#3cb371';
  ctx.strokeStyle = '#2d8653';
  ctx.lineWidth   = 1.5;
  ctx.beginPath();
  ctx.ellipse(0, 2, 10, 8, 0, 0, Math.PI * 2);
  ctx.fill(); ctx.stroke();

  ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;

  ctx.strokeStyle = 'rgba(0,0,0,0.15)'; ctx.lineWidth = 0.8;
  ctx.beginPath(); ctx.moveTo(-5,-1); ctx.lineTo(5,-1); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-7, 4); ctx.lineTo(7, 4); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0, -4); ctx.lineTo(0,10); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-5,-1); ctx.lineTo(-7,4); ctx.stroke();
  ctx.beginPath(); ctx.moveTo( 5,-1); ctx.lineTo( 7,4); ctx.stroke();

  ctx.fillStyle = '#2d8653'; ctx.strokeStyle = '#1e6640'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.ellipse(0,-13,5,5,0,0,Math.PI*2); ctx.fill(); ctx.stroke();

  ctx.fillStyle = '#fff';
  ctx.beginPath(); ctx.arc(2,-14,2.2,0,Math.PI*2); ctx.fill();
  ctx.fillStyle = '#111';
  ctx.beginPath(); ctx.arc(2.5,-14,1.1,0,Math.PI*2); ctx.fill();

  ctx.fillStyle = '#1e6640';
  ctx.beginPath(); ctx.arc(0,-18,2,0,Math.PI*2); ctx.fill();

  ctx.restore();
}

function clampTurtle() {
  turtle.x = Math.max(GRID_MIN_X, Math.min(GRID_MAX_X, turtle.x));
  turtle.y = Math.max(GRID_MIN_Y, Math.min(GRID_MAX_Y, turtle.y));
}

function applyCmd(cmd) {
  const rad = turtle.angle * Math.PI / 180;
  const dx  = Math.sin(rad);
  const dy  = -Math.cos(rad);

  switch (cmd.t) {
    case 'f':  turtle.x += dx * cmd.n * CELL; turtle.y += dy * cmd.n * CELL; clampTurtle(); break;
    case 'b':  turtle.x -= dx * cmd.n * CELL; turtle.y -= dy * cmd.n * CELL; clampTurtle(); break;
    case 'l':  turtle.angle = (turtle.angle - cmd.n % 360 + 360) % 360; break;
    case 'r':  turtle.angle = (turtle.angle + cmd.n) % 360; break;
    case 'rd': turtle.x += cmd.n * CELL; clampTurtle(); break;
    case 'ld': turtle.x -= cmd.n * CELL; clampTurtle(); break;
    case 'ud': turtle.y -= cmd.n * CELL; clampTurtle(); break;
    case 'dd': turtle.y += cmd.n * CELL; clampTurtle(); break;
    case 'cor': turtle.penColor = cmd.cor; paintCurrentCell(); break;
  }
  render();
}

// ── Execution Engine ────────────────────────────────────────
const SPEED_DELAYS = [900, 500, 280, 150, 80, 40, 18, 8, 2, 0];

function getDelay() {
  const v = parseInt(document.getElementById('speed-slider').value, 10);
  return SPEED_DELAYS[v - 1] ?? 0;
}

let _workspace    = null;
let _onComplete   = null;
let _commands     = [];
let _cmdIndex     = 0;
let _mode         = 'idle';
let _timer        = null;

function initEngine(ws, onComplete) {
  _workspace  = ws;
  _onComplete = onComplete || null;
}

function setStatus(txt) {
  const el = document.getElementById('status-text');
  if (el) el.textContent = txt;
}

function syncButtons() {
  const btnEx    = document.getElementById('btn-executar');
  const btnPasso = document.getElementById('btn-passo');
  const btnParar = document.getElementById('btn-parar');
  if (btnEx)    btnEx.disabled    = _mode !== 'idle';
  if (btnPasso) btnPasso.disabled = _mode === 'running';
  if (btnParar) btnParar.disabled = _mode === 'idle';
}

function buildCommands() {
  const start = _workspace.getTopBlocks(true).find(b => b.type === 'ao_iniciar');
  if (!start) { setStatus('Conecte blocos ao "Ao iniciar"'); return []; }

  gen.init(_workspace);

  let funcCode = '';
  _workspace.getBlocksByType('func_definir').forEach(b => {
    const c = gen.blockToCode(b);
    funcCode += typeof c === 'string' ? c : '';
  });

  const rawMain = gen.blockToCode(start);
  const mainCode = typeof rawMain === 'string' ? rawMain : '';

  const full = gen.finish('var funcoes = {};\nvar vars = {};\n' + funcCode + mainCode);
  const cmds = [];
  try {
    // eslint-disable-next-line no-new-func
    new Function('commands', full)(cmds);
  } catch (e) {
    setStatus('Erro: ' + e.message);
    console.error(e);
  }
  return cmds;
}

function _done(msg) {
  clearTimeout(_timer);
  _mode = 'idle';
  _commands = [];
  _cmdIndex = 0;
  syncButtons();
  setStatus(msg);
  if (_onComplete && msg.startsWith('Concluído')) _onComplete();
}

function _tick() {
  if (_mode !== 'running') return;
  applyCmd(_commands[_cmdIndex]);
  _cmdIndex++;
  setStatus('Executando…  ' + _cmdIndex + ' / ' + _commands.length);
  if (_cmdIndex < _commands.length) {
    _timer = setTimeout(_tick, getDelay());
  } else {
    _done('Concluído (' + _commands.length + ' passos)');
  }
}

function doRun() {
  const startBlock = _workspace && _workspace.getTopBlocks(true).find(b => b.type === 'ao_iniciar');
  if (!startBlock) return;

  // Reset turtle to challenge start position
  if (typeof _currentStartRow !== 'undefined') {
    turtle = makeTurtle(_currentStartRow, _currentStartCol);
  } else {
    turtle = makeTurtle(0, 0);
  }
  render();

  _commands = buildCommands();
  if (!_commands.length) return;
  _cmdIndex = 0;
  _mode     = 'running';
  syncButtons();
  setStatus('Executando…  0 / ' + _commands.length);
  _tick();
}

function doStep() {
  if (_mode === 'idle') {
    if (typeof _currentStartRow !== 'undefined') {
      turtle = makeTurtle(_currentStartRow, _currentStartCol);
    } else {
      turtle = makeTurtle(0, 0);
    }
    render();
    _commands = buildCommands();
    if (!_commands.length) return;
    _cmdIndex = 0;
    _mode     = 'stepping';
    syncButtons();
  }
  if (_cmdIndex >= _commands.length) { _done('Concluído'); return; }
  applyCmd(_commands[_cmdIndex]);
  _cmdIndex++;
  setStatus('Passo ' + _cmdIndex + ' / ' + _commands.length);
  if (_cmdIndex >= _commands.length) _done('Concluído (' + _commands.length + ' passos)');
}

function doStop() {
  clearTimeout(_timer);
  _done('Parado no passo ' + _cmdIndex);
}

// Posição inicial da tartaruga (configurada por desafio)
let _currentStartRow = 0;
let _currentStartCol = 0;

function setTurtleStart(row, col) {
  _currentStartRow = row;
  _currentStartCol = col;
}

// ── Flyout scale freeze ─────────────────────────────────────
// Chamado após injeção do workspace para congelar a escala da
// biblioteca de blocos independente do zoom da área de programação.
function freezeFlyoutScale(workspace) {
  const _origSetScale = workspace.setScale;
  workspace.setScale = function (s) {
    _origSetScale.call(this, s);
    const fly = this.getFlyout && this.getFlyout();
    const fw  = fly && (fly.getWorkspace ? fly.getWorkspace() : fly.workspace_);
    if (!fw || fw.scale === 1) return;
    fw.scale = 1;
    const cv = fw.svgBlockCanvas_;
    if (cv) {
      const t = cv.getAttribute('transform') || '';
      cv.setAttribute('transform', t.replace(/scale\s*\([^)]+\)/g, '').trim());
    }
  };

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const fly   = workspace.getFlyout();
      const flyEl = document.querySelector('.blocklyFlyout');
      const cv    = flyEl && flyEl.querySelector('.blocklyBlockCanvas');

      if (fly) {
        const grp   = fly.svgGroup_;
        const baseW = (typeof fly.width_ === 'number' && fly.width_ > 0)
                      ? fly.width_
                      : (grp && parseFloat(grp.getAttribute('width'))) || 0;
        if (baseW > 0) {
          try {
            Object.defineProperty(fly, 'width_', {
              get: () => baseW, set: () => {}, configurable: true
            });
          } catch (e) {}
          if (grp) {
            let wb = false;
            new MutationObserver(() => {
              if (wb) return;
              const w = parseFloat(grp.getAttribute('width'));
              if (w && Math.abs(w - baseW) > 0.5) {
                wb = true; grp.setAttribute('width', baseW); wb = false;
              }
            }).observe(grp, { attributes: true, attributeFilter: ['width'] });
          }
        }
      }

      if (!cv) return;
      let busy = false;
      new MutationObserver(() => {
        if (busy) return;
        const t = cv.getAttribute('transform') || '';
        const f = t.replace(/scale\s*\([^)]+\)/g, '').trim();
        if (f !== t) { busy = true; cv.setAttribute('transform', f); busy = false; }
      }).observe(cv, { attributes: true, attributeFilter: ['transform'] });
    });
  });
}

// ── Wheel handlers ──────────────────────────────────────────
function attachWheelHandlers(workspace) {
  // Scroll correto na biblioteca (captura antes do handler do Blockly)
  window.addEventListener('wheel', function (e) {
    const flyoutEl = document.querySelector('.blocklyFlyout');
    if (!flyoutEl) return;
    const r = flyoutEl.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right ||
        e.clientY < r.top  || e.clientY > r.bottom) return;

    e.preventDefault();
    e.stopImmediatePropagation();

    const fly = workspace.getFlyout();
    if (!fly) return;
    const fw = fly.getWorkspace ? fly.getWorkspace() : fly.workspace_;
    const cv = fw && fw.svgBlockCanvas_;
    if (!cv) return;

    const t  = cv.getAttribute('transform') || '';
    const m  = t.match(/translate\s*\(\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\)/);
    const tx = m ? parseFloat(m[1]) : 0;
    const ty = m ? parseFloat(m[2]) : 0;
    cv.setAttribute('transform', `translate(${tx},${Math.min(0, ty - e.deltaY)})`);
  }, { capture: true, passive: false });

  // Zoom manual — apenas fora do flyout
  document.getElementById('blocklyDiv').addEventListener('wheel', function (e) {
    const flyoutEl = document.querySelector('.blocklyFlyout');
    if (flyoutEl) {
      const r = flyoutEl.getBoundingClientRect();
      if (e.clientX >= r.left && e.clientX <= r.right &&
          e.clientY >= r.top  && e.clientY <= r.bottom) return;
    }
    const svg = workspace.getParentSvg();
    const pt  = svg.createSVGPoint();
    pt.x = e.clientX; pt.y = e.clientY;
    const ctm = svg.getScreenCTM();
    if (ctm) {
      const svgPt = pt.matrixTransform(ctm.inverse());
      workspace.zoom(svgPt.x, svgPt.y, e.deltaY < 0 ? 1 : -1);
    }
    e.preventDefault();
  }, { passive: false });
}

// ── Resize helper ───────────────────────────────────────────
function attachResize(workspace) {
  function resize() {
    const area = document.getElementById('workspace-container');
    const div  = document.getElementById('blocklyDiv');
    div.style.left   = '0';
    div.style.top    = '0';
    div.style.width  = area.offsetWidth  + 'px';
    div.style.height = area.offsetHeight + 'px';
    Blockly.svgResize(workspace);
  }
  window.addEventListener('resize', resize);
  resize();
  return resize;
}
