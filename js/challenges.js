// ── Definição dos 5 Desafios ────────────────────────────────

const CHALLENGES = [
  {
    id: 1,
    title: 'Chegue ao objetivo!',
    description: 'A tartaruga precisa chegar até o bloco verde no final da linha. Use o bloco Frente para avançar!',
    tip: 'Cada Frente avança 1 passo. Quantos passos até o bloco verde?',
    grid: { cols: 8, rows: 1 },
    startPos: { row: 0, col: 0 },
    blocks: ['logo_frente'],
    preDrawn: { '0,7': '#22c55e' },
    validate() {
      return cellKey(turtle.x, turtle.y) === '0,7';
    },
    successMsg: 'Você chegou ao objetivo! Aprendeu a mover a tartaruga com precisão.'
  },
  {
    id: 2,
    title: 'Pinte a linha!',
    description: 'Pinte todos os 8 blocos da linha de azul. Use Pintar para colorir a célula e Frente para avançar.',
    tip: 'Pinte a célula atual, avance, pinte a próxima... repita para todos os 8 blocos!',
    grid: { cols: 8, rows: 1 },
    startPos: { row: 0, col: 0 },
    blocks: ['logo_frente', 'logo_cor_azul'],
    preDrawn: {},
    validate() {
      for (let c = 0; c < 8; c++) {
        if (!turtle.painted['0,' + c]) return false;
      }
      return true;
    },
    successMsg: 'Incrível! Você pintou a linha inteira — mas foi bem trabalhoso, né? Há uma forma melhor...'
  },
  {
    id: 3,
    title: 'Use o Repita!',
    description: 'Pinte a linha de azul novamente — mas desta vez use o bloco Repita para simplificar o código.',
    tip: 'Coloque Pintar + Frente dentro do Repita. Quantas vezes você precisa repetir?',
    grid: { cols: 8, rows: 1 },
    startPos: { row: 0, col: 0 },
    blocks: ['logo_frente', 'logo_cor_azul', 'controls_repeat_ext'],
    preDrawn: {},
    validate() {
      for (let c = 0; c < 8; c++) {
        if (!turtle.painted['0,' + c]) return false;
      }
      return true;
    },
    successMsg: 'Perfeito! O bloco Repita deixou o código muito menor e mais elegante!'
  },
  {
    id: 4,
    title: 'Crie uma função!',
    description: 'Pinte as duas linhas do grid. Defina uma função que pinte uma linha inteira e chame-a duas vezes — uma por linha!',
    tip: 'Dica: Defina uma função com Repita 4×(Pintar + Frente). Depois navegue até a próxima linha e chame a função de novo.',
    grid: { cols: 4, rows: 2 },
    startPos: { row: 0, col: 0 },
    blocks: ['logo_frente', 'logo_mover_baixo', 'logo_mover_esquerda', 'logo_cor_azul', 'func_definir', 'func_chamar', 'controls_repeat_ext'],
    preDrawn: {},
    validate() {
      for (let r = 0; r < 2; r++) {
        for (let c = 0; c < 4; c++) {
          if (!turtle.painted[r + ',' + c]) return false;
        }
      }
      return true;
    },
    successMsg: 'Excelente! Funções permitem reutilizar código — defina uma vez, use quantas quiser!'
  },
  {
    id: 5,
    title: 'Desenhe um quadrado!',
    description: 'Pinte o perímetro do quadrado marcado na malha. Use Frente, Girar e Repita para traçar os 4 lados.',
    tip: 'Tente: Repita 4 vezes — Repita 2×(Pintar + Frente), depois Girar direita.',
    grid: { cols: 8, rows: 8 },
    startPos: { row: 2, col: 2 },
    blocks: ['logo_frente', 'logo_esquerda', 'logo_direita', 'logo_cor', 'controls_repeat_ext'],
    preDrawn: {
      '2,2': '#e0e0e0', '2,3': '#e0e0e0', '2,4': '#e0e0e0',
      '3,4': '#e0e0e0', '4,4': '#e0e0e0', '4,3': '#e0e0e0',
      '4,2': '#e0e0e0', '3,2': '#e0e0e0'
    },
    validate() {
      const required = ['2,2','2,3','2,4','3,4','4,4','4,3','4,2','3,2'];
      return required.every(k => turtle.painted[k]);
    },
    successMsg: 'Fantástico! Você desenhou um quadrado usando código. Você é um(a) programador(a)!'
  }
];
