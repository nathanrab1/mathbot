// ── Tutorial Logic ──────────────────────────────────────────
// Modais, carregamento de desafios, validação e progressão

// Toolbox XML por tipo de bloco
const BLOCK_XML = {
  logo_frente:          `<block type="logo_frente"><value name="PASSOS"><block type="math_number"><field name="NUM">1</field></block></value></block>`,
  logo_tras:            `<block type="logo_tras"><value name="PASSOS"><block type="math_number"><field name="NUM">1</field></block></value></block>`,
  logo_mover_direita:   `<block type="logo_mover_direita"><value name="PASSOS"><block type="math_number"><field name="NUM">1</field></block></value></block>`,
  logo_mover_esquerda:  `<block type="logo_mover_esquerda"><value name="PASSOS"><block type="math_number"><field name="NUM">1</field></block></value></block>`,
  logo_mover_cima:      `<block type="logo_mover_cima"><value name="PASSOS"><block type="math_number"><field name="NUM">1</field></block></value></block>`,
  logo_mover_baixo:     `<block type="logo_mover_baixo"><value name="PASSOS"><block type="math_number"><field name="NUM">1</field></block></value></block>`,
  logo_esquerda:        `<block type="logo_esquerda"></block>`,
  logo_direita:         `<block type="logo_direita"></block>`,
  logo_cor:             `<block type="logo_cor"></block>`,
  logo_cor_azul:        `<block type="logo_cor_azul"></block>`,
  controls_repeat_ext:  `<block type="controls_repeat_ext"><value name="TIMES"><block type="math_number"><field name="NUM">4</field></block></value></block>`,
  func_definir:         `<block type="func_definir"></block>`,
  func_chamar:          `<block type="func_chamar"></block>`,
};

function buildToolboxXml(blockTypes) {
  const entries = blockTypes
    .map(t => BLOCK_XML[t] ? '  ' + BLOCK_XML[t] : '')
    .filter(Boolean)
    .join('\n');
  return `<xml xmlns="https://developers.google.com/blockly/xml">\n${entries}\n  <sep gap="300"></sep>\n</xml>`;
}

// ── State ───────────────────────────────────────────────────
let ws; // Blockly workspace
let currentIdx = 0;

// ── Dots progress indicator ─────────────────────────────────
function renderDots(activeIdx) {
  const container = document.getElementById('modal-dots');
  if (!container) return;
  container.innerHTML = CHALLENGES.map((_, i) => {
    const cls = i < activeIdx ? 'modal-dot done' : i === activeIdx ? 'modal-dot active' : 'modal-dot';
    return `<div class="${cls}"></div>`;
  }).join('');
}

// ── Modal helpers ───────────────────────────────────────────
function showModal({ progress, title, description, tip, primaryLabel, primaryAction, secondaryLabel, secondaryHref }) {
  document.getElementById('modal-progress').textContent    = progress;
  document.getElementById('modal-title').textContent       = title;
  document.getElementById('modal-description').textContent = description;
  document.getElementById('modal-tip').textContent         = tip || '';
  renderDots(currentIdx);

  const footer = document.getElementById('modal-footer');
  footer.innerHTML = '';

  if (secondaryLabel && secondaryHref) {
    const a = document.createElement('a');
    a.href      = secondaryHref;
    a.className = 'modal-btn-secondary';
    a.textContent = secondaryLabel;
    footer.appendChild(a);
  }

  const btn = document.createElement('button');
  btn.className   = 'modal-btn-primary';
  btn.textContent = primaryLabel;
  btn.onclick     = primaryAction;
  footer.appendChild(btn);

  document.getElementById('modal-overlay').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('modal-overlay').classList.add('hidden');
}

function showStartModal(ch) {
  showModal({
    progress:       `Desafio ${ch.id} de ${CHALLENGES.length}`,
    title:          ch.title,
    description:    ch.description,
    tip:            ch.tip,
    primaryLabel:   ch.id === 1 ? 'Vamos lá! 🚀' : 'Começar desafio!',
    primaryAction:  closeModal,
    secondaryLabel: '← Início',
    secondaryHref:  'index.html'
  });
}

function showSuccessModal(ch) {
  const isLast = currentIdx >= CHALLENGES.length - 1;
  showModal({
    progress:      `Desafio ${ch.id} de ${CHALLENGES.length}`,
    title:         '🎉 Parabéns!',
    description:   ch.successMsg,
    tip:           '',
    primaryLabel:  isLast ? '🏁 Voltar ao início' : 'Próximo desafio →',
    primaryAction: isLast
      ? () => { window.location.href = 'index.html'; }
      : () => { loadChallenge(currentIdx + 1); },
    secondaryLabel: '← Início',
    secondaryHref:  'index.html'
  });
}

// ── Challenge Loader ────────────────────────────────────────
function loadChallenge(idx) {
  currentIdx = idx;
  const ch   = CHALLENGES[idx];

  // Salva progresso no localStorage
  localStorage.setItem('tutorialProgress', idx);

  // Atualiza indicador no header
  const lbl = document.getElementById('progress-label');
  if (lbl) lbl.textContent = `Desafio ${ch.id} / ${CHALLENGES.length}`;

  // Configura grid e pre-drawn
  initGrid(ch.grid.cols, ch.grid.rows);
  setPreDrawn(ch.preDrawn);
  setTurtleStart(ch.startPos.row, ch.startPos.col);

  // Inicializa tartaruga
  turtle = makeTurtle(ch.startPos.row, ch.startPos.col);
  render();

  // Atualiza toolbox
  const xml = buildToolboxXml(ch.blocks);
  if (ws) {
    ws.updateToolbox(xml);

    // Limpa blocos do workspace (exceto ao_iniciar)
    ws.getAllBlocks().filter(b => b.type !== 'ao_iniciar').forEach(b => b.dispose());

    // Força o flyout a recalcular e re-congelar largura
    requestAnimationFrame(() => {
      Blockly.svgResize(ws);
      ws.updateToolbox(xml);
    });
  }

  // Atualiza callback de validação no motor
  initEngine(ws, () => {
    if (CHALLENGES[currentIdx].validate()) {
      showSuccessModal(CHALLENGES[currentIdx]);
    }
  });

  showStartModal(ch);
}

// ── Init ────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  const params   = new URLSearchParams(window.location.search);
  const savedIdx = parseInt(localStorage.getItem('tutorialProgress') || '0', 10);
  const startIdx = Math.max(0, Math.min(
    CHALLENGES.length - 1,
    parseInt(params.get('c') ?? savedIdx, 10)
  ));

  const firstCh = CHALLENGES[startIdx];

  // Inicializa grid antes de injetar o workspace
  initGrid(firstCh.grid.cols, firstCh.grid.rows);

  ws = Blockly.inject('blocklyDiv', {
    toolbox:    buildToolboxXml(firstCh.blocks),
    scrollbars: true,
    trashcan:   true,
    zoom: { controls: true, wheel: false, startScale: 1.0, maxScale: 3, minScale: 0.3 },
    grid: { spacing: 24, length: 6, colour: '#e0e0e0', snap: false }
  });

  ws.registerButtonCallback('noop', () => {});

  // Bloco fixo "Ao iniciar"
  Blockly.Xml.domToWorkspace(
    Blockly.utils.xml.textToDom('<xml><block type="ao_iniciar" x="40" y="40" deletable="false"></block></xml>'),
    ws
  );

  // Engine de execução
  initEngine(ws, null); // será sobrescrito em loadChallenge

  // Freeze flyout + handlers de wheel
  freezeFlyoutScale(ws);
  attachWheelHandlers(ws);
  const resize = attachResize(ws);

  // Toolbox recalcula após layout estabilizar
  requestAnimationFrame(() => {
    resize();
    Blockly.svgResize(ws);
    ws.updateToolbox(buildToolboxXml(firstCh.blocks));
  });

  // Botões
  document.getElementById('btn-executar').addEventListener('click', doRun);
  document.getElementById('btn-passo').addEventListener('click', doStep);
  document.getElementById('btn-parar').addEventListener('click', doStop);

  // Download/upload do projeto
  document.getElementById('btn-baixar').addEventListener('click', () => {
    const state = Blockly.serialization.workspaces.save(ws);
    const blob  = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url   = URL.createObjectURL(blob);
    const a     = document.createElement('a');
    a.href = url; a.download = 'desafio.json'; a.click();
    URL.revokeObjectURL(url);
  });

  const fileInput = document.getElementById('file-input');
  document.getElementById('btn-carregar').addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', function () {
    const file = this.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        Blockly.serialization.workspaces.load(JSON.parse(ev.target.result), ws);
        document.getElementById('status-text').textContent = 'Projeto carregado!';
      } catch (err) {
        document.getElementById('status-text').textContent = 'Erro ao carregar';
      }
    };
    reader.readAsText(file);
    this.value = '';
  });

  // Carrega o desafio inicial
  loadChallenge(startIdx);
});
