# Tutorial 4º Ano - Blocos Direcionais 📚

## Visão Geral

Novo tutorial específico para **4º ano** com 4 desafios simples usando apenas **blocos direcionais** (↑↓←→).

## Arquivo Criado

**`tutorial_4ano.html`**
- Cópia adaptada do tutorial original
- 4 desafios progressivos (ao invés de 8)
- Apenas blocos direcionais (sem Frente/Trás/Girar)
- Auto-save separado (não conflita com tutorial 5º ano)

---

## Comparação: 4º Ano vs 5º Ano

### **Tutorial 4º Ano** (`tutorial_4ano.html`)
- **Desafios:** 4 (mais curto)
- **Blocos:** ↑ Cima, ↓ Baixo, ← Esquerda, → Direita, Pintar 🔵, Repita
- **Conceitos:** Movimento cardinal, Sequência, Repetição básica
- **Grid:** 1×4, 1×6, 1×4, 4×4
- **Complexidade:** Baixa (formas simples)
- **Público:** 9-10 anos
- **Duração:** ~15-25 minutos

### **Tutorial 5º Ano** (`tutorial.html`)
- **Desafios:** 8 (completo)
- **Blocos:** Frente, Trás, Girar ←→, Pintar (cor variável), Repita, Funções, ↑↓←→
- **Conceitos:** Rotação, Ângulos, Funções, Navegação complexa
- **Grid:** Variável (1×8, 4×2, 8×8, 8×9)
- **Complexidade:** Alta (padrões geométricos)
- **Público:** 10-11 anos
- **Duração:** ~45-60 minutos

---

## Os 4 Desafios do 4º Ano

### **Desafio 1: Pinte uma linha!**
**Objetivo:** Pintar 4 blocos de azul

**Grid:** 1×4 (linha horizontal)
```
[🐢] [ ] [ ] [ ]
```

**Blocos disponíveis:**
- → Direita
- Pintar 🔵

**Conceito:** Movimento + Ação

**Solução esperada:**
```
Pintar 🔵
→ Direita
Pintar 🔵
→ Direita
Pintar 🔵
→ Direita
Pintar 🔵
```

**Dica:** "Comece pintando onde está, depois vá para direita e pinte de novo!"

---

### **Desafio 2: Use o Repita!**
**Objetivo:** Pintar linha de 6 blocos usando Repita

**Grid:** 1×6 (linha horizontal)
```
[🐢] [ ] [ ] [ ] [ ] [ ]
```

**Blocos disponíveis:**
- → Direita
- Pintar 🔵
- Repita

**Conceito:** Introdução a loops/repetição

**Solução esperada:**
```
Repita 6 vezes
├─ Pintar 🔵
└─ → Direita
```

**Dica:** "Coloque Pintar + Direita dentro do Repita. Repita 6 vezes!"

**Comparação pedagógica:**
- **Sem Repita:** 12 blocos (6× Pintar + 6× Direita)
- **Com Repita:** 3 blocos (1× Repita + 2× dentro)

---

### **Desafio 3: Pinte para baixo!**
**Objetivo:** Pintar coluna vertical de 4 blocos

**Grid:** 1×4 (linha vertical)
```
[🐢]
[ ]
[ ]
[ ]
```

**Blocos disponíveis:**
- → Direita
- ↓ Baixo
- Pintar 🔵
- Repita

**Conceito:** Movimento vertical + loops

**Solução esperada:**
```
Repita 4 vezes
├─ Pintar 🔵
└─ ↓ Baixo
```

**Dica:** "Use Pintar + Baixo. Você pode usar o Repita para facilitar!"

---

### **Desafio 4: Desenhe um quadrado!**
**Objetivo:** Pintar quadrado 3×3

**Grid:** 4×4
```
[🐢] [ ] [ ] [ ]
[ ] [ ] [ ] [ ]
[ ] [ ] [ ] [ ]
[ ] [ ] [ ] [ ]
```

**Resultado esperado:**
```
[🔵] [🔵] [🔵] [ ]
[🔵] [🔵] [🔵] [ ]
[🔵] [🔵] [🔵] [ ]
[ ] [ ] [ ] [ ]
```

**Blocos disponíveis:**
- ↑ Cima
- ↓ Baixo
- ← Esquerda
- → Direita
- Pintar 🔵
- Repita

**Conceito:** Navegação em 4 direções + Loops

**Solução esperada (uma possível):**
```
Repita 3 vezes
├─ Pintar 🔵
└─ → Direita

← Esquerda
← Esquerda
↓ Baixo

Repita 3 vezes
├─ Pintar 🔵
└─ → Direita

← Esquerda
← Esquerda
↓ Baixo

Repita 3 vezes
├─ Pintar 🔵
└─ → Direita
```

**Dica:** "Comece fazendo a linha de cima (direita 3×), depois desça e faça as outras linhas!"

---

## Progressão de Conceitos

### **Desafio 1:**
- ✅ Movimento básico (uma direção)
- ✅ Contagem (quantas vezes?)

### **Desafio 2:**
- ✅ Movimento + Ação
- ✅ Sequência (faça isso, depois aquilo)

### **Desafio 3:**
- ✅ Duas direções (horizontal + vertical)
- ✅ Formas simples

### **Desafio 4:**
- ✅ Loops (Repita)
- ✅ Eficiência de código

### **Desafio 5:**
- ✅ Quatro direções
- ✅ Combinação (loops + navegação)
- ✅ Formas geométricas

---

## Auto-Save Separado

### **Chaves de LocalStorage:**
```javascript
// 4º Ano
'emoji-coder-tutorial-4ano-challenge'        // Último desafio
'emoji-coder-tutorial-4ano-progress-0'       // Desafio 1
'emoji-coder-tutorial-4ano-progress-1'       // Desafio 2
'emoji-coder-tutorial-4ano-progress-2'       // Desafio 3
'emoji-coder-tutorial-4ano-progress-3'       // Desafio 4
'emoji-coder-tutorial-4ano-progress-4'       // Desafio 5

// 5º Ano (original)
'emoji-coder-tutorial-challenge'             // Último desafio
'emoji-coder-tutorial-progress-0'            // Desafio 1
...
'emoji-coder-tutorial-progress-7'            // Desafio 8
```

**Benefício:**
- Aluno pode fazer ambos os tutoriais
- Progresso independente
- Não há conflitos

---

## Atualização do Index

### **Antes (2 cards):**
```
┌──────────┐  ┌──────────┐
│    📚    │  │    🎨    │
│ Tutorial │  │ Desenho  │
│          │  │  4º Ano  │
└──────────┘  └──────────┘
```

### **Agora (4 cards):**
```
┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│    📚    │  │    📘    │  │    🎨    │  │    🚀    │
│ Tutorial │  │ Tutorial │  │ Desenho  │  │ Desenho  │
│ 4º ANO   │  │ 5º ANO   │  │  4º Ano  │  │  5º Ano  │
└──────────┘  └──────────┘  └──────────┘  └──────────┘
```

**Detalhes:**
- **Tutorial 4º Ano:** 📚 (azul) - "5 desafios simples com blocos direcionais"
- **Tutorial 5º Ano:** 📘 (verde) - "8 desafios avançados com rotação e funções"
- **Desenho 4º Ano:** 🎨 (azul) - Mesma coisa
- **Desenho 5º Ano:** 🚀 (verde) - Mesma coisa

---

## Estratégia Pedagógica

### **Caminho Recomendado:**
```
1. Tutorial 4º Ano (simples, blocos direcionais)
   ↓
2. Desenho Livre 4º Ano (praticar livremente)
   ↓
3. Tutorial 5º Ano (avançado, rotação + funções)
   ↓
4. Desenho Livre 5º Ano (projetos complexos)
```

### **Ou por série:**

**Turma de 4º Ano:**
```
Aula 1-2: Tutorial 4º Ano
Aula 3-4: Desenho Livre 4º Ano
Aula 5+: Projetos livres, revisão
```

**Turma de 5º Ano:**
```
Aula 1 (revisão): Tutorial 4º Ano (rápido)
Aula 2-4: Tutorial 5º Ano
Aula 5-6: Desenho Livre 5º Ano
Aula 7+: Projetos complexos
```

---

## Diferenças Técnicas

### **Blocos Usados:**

#### **4º Ano:**
```javascript
blocks: [
  'logo_mover_direita',     // → Direita
  'logo_mover_esquerda',    // ← Esquerda
  'logo_mover_cima',        // ↑ Cima
  'logo_mover_baixo',       // ↓ Baixo
  'logo_cor_azul',          // Pintar 🔵 (cor fixa)
  'controls_repeat_ext'     // Repita X vezes
]
```

**NÃO usa:**
- ❌ `logo_frente` (Frente)
- ❌ `logo_tras` (Trás)
- ❌ `logo_esquerda` (Girar esquerda)
- ❌ `logo_direita` (Girar direita)
- ❌ `logo_cor` (Pintar com escolha de cor)
- ❌ `func_definir` / `func_chamar` (Funções)

#### **5º Ano:**
Usa **todos os blocos** acima + funções + cores variáveis

---

## Validação dos Desafios

### **Desafio 1:** Posição final
```javascript
validate() {
  return cellKey(turtle.x, turtle.y) === '0,4';
}
```

### **Desafio 2:** Todas células pintadas (linha)
```javascript
validate() {
  for(let c=0; c<4; c++)
    if(!turtle.painted['0,'+c]) return false;
  return true;
}
```

### **Desafio 3:** Células específicas (forma L)
```javascript
validate() {
  const L = ['0,0','0,1','0,2','0,3','1,3','2,3'];
  return L.every(k => turtle.painted[k]);
}
```

### **Desafio 4:** Mesma validação do 2 (linha de 6)
```javascript
validate() {
  for(let c=0; c<6; c++)
    if(!turtle.painted['0,'+c]) return false;
  return true;
}
```

### **Desafio 5:** Quadrado 3×3
```javascript
validate() {
  const quadrado = [
    '0,0','0,1','0,2',
    '1,0','1,1','1,2',
    '2,0','2,1','2,2'
  ];
  return quadrado.every(k => turtle.painted[k]);
}
```

---

## Mensagens de Sucesso

### **Desafio 1:**
> "Parabéns! Você moveu a tartaruga para a direita e chegou ao objetivo!"

### **Desafio 2:**
> "Muito bem! Você pintou a linha inteira de azul!"

### **Desafio 3:**
> "Incrível! Você desenhou um L usando dois tipos de movimento!"

### **Desafio 4:**
> "Perfeito! O bloco Repita deixou seu código muito mais simples!"

### **Desafio 5:**
> "Fantástico! Você desenhou um quadrado perfeito usando programação! 🎉"

---

## Testes Recomendados

### ✅ **Teste 1: Acesso**
1. Abra `index.html`
2. Veja 4 cards (Tutorial 4º, Tutorial 5º, Desenho 4º, Desenho 5º)
3. Clique "Tutorial 4º Ano"
4. Confirme: abre `tutorial_4ano.html`

### ✅ **Teste 2: Desafio 1**
1. Use 4× "→ Direita"
2. Execute
3. Confirme: tartaruga chega ao verde
4. Modal de sucesso aparece

### ✅ **Teste 3: Desafio 4 (Repita)**
1. Use "Repita 6 vezes" com "Pintar 🔵" + "→ Direita" dentro
2. Execute
3. Confirme: pinta linha de 6
4. Sucesso!

### ✅ **Teste 4: Auto-Save Separado**
1. Faça desafio 3 do 4º ano
2. Feche aba
3. Abra tutorial 5º ano (tutorial.html)
4. Confirme: começa no desafio 1 (não no 3)
5. Volte ao 4º ano
6. Confirme: volta ao desafio 3

### ✅ **Teste 5: Rotação Visual**
1. Desafio 5: use ↑↓←→
2. Execute
3. Confirme: tartaruga gira para cada direção

---

## Perguntas para Feedback

**Tutorial 4º Ano:**
- Os desafios foram muito fáceis ou muito difíceis?
- Preferiu usar blocos ↑↓←→ ao invés de Frente/Girar?
- Quantos desafios conseguiu completar sozinho?
- Qual desafio foi o mais divertido?
- Sentiu falta de algum bloco?
- 5 desafios foi pouco, suficiente ou muito?

---

## Melhorias Futuras

### **Desafios Adicionais (se precisar expandir):**
1. **Cruz:** Pintar forma de +
2. **Escada:** Pintar degraus
3. **Bandeira:** Pintar retângulo
4. **Xadrez 2×2:** Padrão xadrez pequeno

### **Variações:**
- Opção de escolher cor (azul, vermelho, verde)
- Grids maiores (desafio extra)
- Contador de blocos usados (eficiência)

---

## Resultado Final

✅ **Tutorial 4º Ano criado com sucesso!**
- 5 desafios progressivos
- Apenas blocos direcionais
- Auto-save independente
- Integrado no index.html

🎯 **Pedagogia:**
- Mais simples que 5º ano
- Foco em conceitos básicos
- Preparação para tutorial avançado
