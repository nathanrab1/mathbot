// ── Block Definitions + Code Generators ────────────────────
// Compartilhado entre draw.html e tutorial.html

if (typeof registerFieldColour === 'function') registerFieldColour();

Blockly.defineBlocksWithJsonArray([
  {
    type: 'ao_iniciar',
    message0: 'Ao iniciar',
    nextStatement: null,
    colour: '#16a34a',
    tooltip: 'Ponto de início — conecte os blocos aqui'
  },
  {
    type: 'logo_frente',
    message0: 'Frente %1 passos',
    args0: [{ type: 'input_value', name: 'PASSOS', check: 'Number' }],
    inputsInline: true,
    previousStatement: null, nextStatement: null,
    colour: '#CC9900'
  },
  {
    type: 'logo_tras',
    message0: 'Trás %1 passos',
    args0: [{ type: 'input_value', name: 'PASSOS', check: 'Number' }],
    inputsInline: true,
    previousStatement: null, nextStatement: null,
    colour: '#CC9900'
  },
  {
    type: 'logo_mover_direita',
    message0: '→ Direita %1 passos',
    args0: [{ type: 'input_value', name: 'PASSOS', check: 'Number' }],
    inputsInline: true,
    previousStatement: null, nextStatement: null,
    colour: '#CC9900'
  },
  {
    type: 'logo_mover_esquerda',
    message0: '← Esquerda %1 passos',
    args0: [{ type: 'input_value', name: 'PASSOS', check: 'Number' }],
    inputsInline: true,
    previousStatement: null, nextStatement: null,
    colour: '#CC9900'
  },
  {
    type: 'logo_mover_cima',
    message0: '↑ Cima %1 passos',
    args0: [{ type: 'input_value', name: 'PASSOS', check: 'Number' }],
    inputsInline: true,
    previousStatement: null, nextStatement: null,
    colour: '#CC9900'
  },
  {
    type: 'logo_mover_baixo',
    message0: '↓ Baixo %1 passos',
    args0: [{ type: 'input_value', name: 'PASSOS', check: 'Number' }],
    inputsInline: true,
    previousStatement: null, nextStatement: null,
    colour: '#CC9900'
  },
  {
    type: 'logo_esquerda',
    message0: '↶ Girar esquerda',
    previousStatement: null, nextStatement: null,
    colour: '#CC9900',
    tooltip: 'Gira 90° para a esquerda'
  },
  {
    type: 'logo_direita',
    message0: '↷ Girar direita',
    previousStatement: null, nextStatement: null,
    colour: '#CC9900',
    tooltip: 'Gira 90° para a direita'
  },
  {
    type: 'logo_cor',
    message0: 'Pintar %1',
    args0: [{ type: 'field_colour', name: 'COR', colour: '#4361ee' }],
    inputsInline: true,
    previousStatement: null, nextStatement: null,
    colour: '#E91E63',
    tooltip: 'Pinta a célula com a cor escolhida'
  },
  // Bloco especial para tutoriais: cor azul fixa, sem seletor
  {
    type: 'logo_cor_azul',
    message0: 'Pintar 🔵',
    previousStatement: null, nextStatement: null,
    colour: '#E91E63',
    tooltip: 'Pinta a célula com azul'
  },
  {
    type: 'func_definir',
    message0: 'Definir %1',
    args0: [{ type: 'field_input', name: 'NOME', text: 'minha_funcao' }],
    message1: '%1',
    args1: [{ type: 'input_statement', name: 'CORPO' }],
    colour: '#9C27B0',
    tooltip: 'Define uma função reutilizável'
  },
  {
    type: 'func_chamar',
    message0: 'Chamar %1',
    args0: [{ type: 'field_input', name: 'NOME', text: 'minha_funcao' }],
    inputsInline: true,
    previousStatement: null, nextStatement: null,
    colour: '#9C27B0',
    tooltip: 'Executa uma função pelo nome'
  }
]);

// Bloco "Repita" nativo com cor azul
(function () {
  const _orig = Blockly.Blocks['controls_repeat_ext'].init;
  Blockly.Blocks['controls_repeat_ext'].init = function () {
    _orig.call(this);
    this.setColour('#2563eb');
  };
})();

// ── Code Generators ─────────────────────────────────────────
const gen   = Blockly.JavaScript;
const Order = javascript.Order;

gen.forBlock['ao_iniciar'] = function () { return ''; };

gen.forBlock['logo_frente'] = function (block, g) {
  const n = g.valueToCode(block, 'PASSOS', Order.ATOMIC) || '1';
  return `commands.push({t:'f',n:${n}});\n`;
};
gen.forBlock['logo_tras'] = function (block, g) {
  const n = g.valueToCode(block, 'PASSOS', Order.ATOMIC) || '1';
  return `commands.push({t:'b',n:${n}});\n`;
};
gen.forBlock['logo_mover_direita'] = function (block, g) {
  const n = g.valueToCode(block, 'PASSOS', Order.ATOMIC) || '1';
  return `commands.push({t:'rd',n:${n}});\n`;
};
gen.forBlock['logo_mover_esquerda'] = function (block, g) {
  const n = g.valueToCode(block, 'PASSOS', Order.ATOMIC) || '1';
  return `commands.push({t:'ld',n:${n}});\n`;
};
gen.forBlock['logo_mover_cima'] = function (block, g) {
  const n = g.valueToCode(block, 'PASSOS', Order.ATOMIC) || '1';
  return `commands.push({t:'ud',n:${n}});\n`;
};
gen.forBlock['logo_mover_baixo'] = function (block, g) {
  const n = g.valueToCode(block, 'PASSOS', Order.ATOMIC) || '1';
  return `commands.push({t:'dd',n:${n}});\n`;
};
gen.forBlock['logo_esquerda'] = function () { return `commands.push({t:'l',n:90});\n`; };
gen.forBlock['logo_direita']  = function () { return `commands.push({t:'r',n:90});\n`; };

gen.forBlock['logo_cor'] = function (block) {
  const cor = block.getFieldValue('COR');
  return `commands.push({t:'cor',cor:'${cor}'});\n`;
};
gen.forBlock['logo_cor_azul'] = function () {
  return `commands.push({t:'cor',cor:'#2563eb'});\n`;
};

gen.forBlock['func_definir'] = function (block, g) {
  const nome  = JSON.stringify(block.getFieldValue('NOME') || 'funcao');
  const corpo = g.statementToCode(block, 'CORPO');
  return `funcoes[${nome}] = function() {\n${corpo}};\n`;
};
gen.forBlock['func_chamar'] = function (block) {
  const nome = JSON.stringify(block.getFieldValue('NOME') || 'funcao');
  return `if(funcoes[${nome}]) funcoes[${nome}]();\n`;
};
