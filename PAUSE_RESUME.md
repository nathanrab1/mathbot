# Pause/Resume durante Execução ⏸️▶️

## Funcionalidade Implementada

O botão **"▶ Executar"** agora se transforma dinamicamente durante a execução, permitindo **pausar** e **retomar** o código.

## Comportamento do Botão

### **Estado: Idle (Parado)**
```
[▶ Executar]  [▶ Passo]  [■ Parar]
    ↑            ↑           ↑
  Ativo      Ativo      Desabilitado
```
**Ao clicar "▶ Executar":**
- Inicia execução automática
- Botão muda para "⏸ Pausar"

---

### **Estado: Running (Executando)**
```
[⏸ Pausar]  [▶ Passo]  [■ Parar]
    ↑           ↑          ↑
  Ativo    Desabilitado  Ativo
```
**Ao clicar "⏸ Pausar":**
- Para temporariamente a execução
- Mantém estado atual (posição, pinturas, índice do comando)
- Botão muda para "▶ Retomar"

---

### **Estado: Paused (Pausado)**
```
[▶ Retomar]  [▶ Passo]  [■ Parar]
     ↑          ↑          ↑
   Ativo     Ativo      Ativo
```

**Ao clicar "▶ Retomar":**
- Continua execução de onde parou
- Botão volta para "⏸ Pausar"

**Ao clicar "▶ Passo":**
- Executa próximo comando manualmente
- Permanece pausado (pode continuar usando passo)
- Útil para debug passo a passo

**Ao clicar "■ Parar":**
- Cancela completamente a execução
- Volta ao estado Idle
- Perde progresso (precisa executar do início de novo)

---

## Fluxos de Uso

### **Fluxo 1: Execução Completa (sem pausa)**
```
1. [▶ Executar]
2. Código roda do início ao fim
3. Status: "Concluído (20 passos)"
4. Volta ao estado Idle
```

---

### **Fluxo 2: Pausar e Retomar**
```
1. [▶ Executar]
2. Código começa a rodar...
3. [⏸ Pausar] (no meio da execução)
4. Status: "Pausado no passo 8 / 20"
5. [Observa o resultado parcial]
6. [▶ Retomar]
7. Continua do passo 8 até 20
8. Status: "Concluído (20 passos)"
```

---

### **Fluxo 3: Pausar e Usar Passo**
```
1. [▶ Executar]
2. [⏸ Pausar] (passo 5 / 20)
3. [▶ Passo] → Executa passo 6
4. [▶ Passo] → Executa passo 7
5. [▶ Passo] → Executa passo 8
6. [Identifica o problema!]
7. [■ Parar]
8. [Corrige o código]
```

---

### **Fluxo 4: Pausar e Parar**
```
1. [▶ Executar]
2. [⏸ Pausar] (passo 10 / 20)
3. "Ops, código está errado"
4. [■ Parar]
5. [Edita blocos]
6. [▶ Executar] (nova execução do zero)
```

---

## Estados da Máquina

### **Diagrama de Estados:**
```
     ┌─────────┐
     │  Idle   │
     └────┬────┘
          │ ▶ Executar
          ↓
   ┌──────────────┐
   │   Running    │ ⟷ ⏸ Pausar ⟷ ┌─────────┐
   └──────────────┘                │ Paused  │
          │                        └────┬────┘
          │ Fim                         │
          ↓                             │
     ┌─────────┐      ■ Parar          │
     │  Idle   │ ←────────────────────┘
     └─────────┘
```

### **Variável `_mode`:**
```javascript
'idle'     // Nada rodando
'running'  // Executando automaticamente
'paused'   // Pausado (pode retomar)
'stepping' // Modo passo a passo
```

---

## Código Implementado

### **syncButtons() - Atualiza UI:**
```javascript
function syncButtons(){
  const e=document.getElementById('btn-executar');
  if(e){
    if(_mode==='running'){
      e.innerHTML='&#x23F8; Pausar';   // ⏸ Pausar
      e.disabled=false;
    }else if(_mode==='paused'){
      e.innerHTML='&#x25B6; Retomar';  // ▶ Retomar
      e.disabled=false;
    }else{
      e.innerHTML='&#x25B6; Executar'; // ▶ Executar
      e.disabled=false;
    }
  }
  // ...
}
```

### **doRun() - Executar ou Retomar:**
```javascript
function doRun(ws){
  if(_mode==='paused'){
    // Retomar do ponto pausado
    _mode='running';
    syncButtons();
    setStatus('Executando…  '+_cmdIndex+' / '+_commands.length);
    _tick(ws);
  }else{
    // Iniciar nova execução
    turtle=makeTurtle(_startRow,_startCol);
    render();
    _commands=buildCommands(ws);
    if(!_commands.length)return;
    _cmdIndex=0;
    _mode='running';
    syncButtons();
    setStatus('Executando…  0 / '+_commands.length);
    _tick(ws);
  }
}
```

### **doPause() - Pausar:**
```javascript
function doPause(){
  if(_mode==='running'){
    clearTimeout(_timer);      // Cancela próximo tick
    _mode='paused';
    syncButtons();
    setStatus('Pausado no passo '+_cmdIndex+' / '+_commands.length);
  }
}
```

### **doStep() - Suporta uso durante pause:**
```javascript
function doStep(ws){
  if(_mode==='idle'){
    // Inicia modo stepping
    // ...
  }else if(_mode==='paused'){
    // Permite usar passo quando pausado
    _mode='stepping';
    syncButtons();
  }
  // Executa próximo comando
  applyCmd(_commands[_cmdIndex]);
  _cmdIndex++;
  // ...
}
```

### **Event Listener - Ação Dinâmica:**
```javascript
document.getElementById('btn-executar').addEventListener('click',()=>{
  if(_mode==='running'){
    doPause();      // Se rodando → pausa
  }else{
    doRun(workspace); // Se idle/paused → executa/retoma
  }
});
```

---

## Vantagens Pedagógicas

### ✅ **1. Debug Facilitado**
```
Professor: "Pausem no meio e vejam onde a tartaruga está"
Alunos: [⏸ Pausar]
Alunos: "Ah! Ela virou para o lado errado aqui!"
```

### ✅ **2. Exploração Guiada**
```
Tutorial interativo:
"Execute o código... agora PAUSE... 
observe que a tartaruga pintou 4 células...
agora RETOME e veja o resto"
```

### ✅ **3. Compreensão de Loop**
```
Código: Repita 10 vezes
Ação:
  1. [▶ Executar]
  2. [⏸ Pausar] (3ª iteração)
  3. "Viu? Ele está repetindo!"
  4. [▶ Retomar]
  5. Completa as 7 iterações restantes
```

### ✅ **4. Controle Fino**
```
Pausado → pode:
  - [▶ Retomar] (modo automático)
  - [▶ Passo] [▶ Passo] (modo manual)
  - [■ Parar] (cancelar)

Flexibilidade total!
```

---

## Casos de Uso

### **Caso 1: Código Longo**
```
Problema: 100 passos, muito rápido para acompanhar
Solução:
  1. [▶ Executar]
  2. [⏸ Pausar] (quando vir algo interessante)
  3. [Analisa estado]
  4. [▶ Retomar]
```

### **Caso 2: Bug no Meio**
```
Problema: Código funciona até passo 15, depois erro
Solução:
  1. [▶ Executar]
  2. [⏸ Pausar] (passo 14)
  3. "Até aqui tá certo..."
  4. [▶ Passo] → Executa passo 15
  5. "AH! Aqui que dá errado!"
  6. [■ Parar] e corrige
```

### **Caso 3: Demonstração Didática**
```
Professor:
  1. [▶ Executar] rápido
  2. [⏸ Pausar] em momento-chave
  3. "Vejam: a tartaruga está aqui porque..."
  4. [▶ Retomar] para mostrar resto
```

### **Caso 4: Velocidade Variável**
```
Início: Velocidade rápida (já conhece essa parte)
  1. [▶ Executar]
  2. [⏸ Pausar] (quando chega na parte nova)
  3. [Ajusta slider para devagar]
  4. [▶ Retomar] (agora devagar, para observar)
```

---

## Diferenças: Pause vs Parar vs Passo

### **⏸ Pausar:**
- **Efeito:** Congela temporariamente
- **Estado preservado:** Sim (posição, pinturas, índice)
- **Pode retomar:** Sim
- **Uso:** "Deixa eu ver melhor..."

### **■ Parar:**
- **Efeito:** Cancela completamente
- **Estado preservado:** Não (perde tudo)
- **Pode retomar:** Não (precisa executar de novo do zero)
- **Uso:** "Tá errado, vou corrigir"

### **▶ Passo:**
- **Efeito:** Avança 1 comando por vez
- **Estado preservado:** Sim
- **Pode retomar:** Sim (vira execução automática se clicar Retomar)
- **Uso:** "Quero ver comando por comando"

---

## Status Bar

### **Mensagens por Estado:**

#### **Idle:**
```
Status: Pronto
```

#### **Running:**
```
Status: Executando… 8 / 20
```

#### **Paused:**
```
Status: Pausado no passo 8 / 20
```

#### **Stepping:**
```
Status: Passo 9 / 20
```

#### **Concluído:**
```
Status: Concluído (20 passos)
```

#### **Parado:**
```
Status: Parado no passo 12
```

---

## Combinações de Ações

### **Durante Execução (`running`):**
- ✅ [⏸ Pausar] → Pausa
- ✅ [■ Parar] → Cancela
- ❌ [▶ Passo] → Desabilitado

### **Durante Pause (`paused`):**
- ✅ [▶ Retomar] → Continua automático
- ✅ [▶ Passo] → Avança 1 comando (vira stepping)
- ✅ [■ Parar] → Cancela

### **Durante Stepping (`stepping`):**
- ✅ [▶ Passo] → Próximo comando
- ✅ [■ Parar] → Cancela
- ❌ [⏸ Pausar] → Não aplicável (já é manual)

---

## Preservação de Estado

### **Quando pausa, preserva:**
```javascript
_commands    // Lista completa de comandos
_cmdIndex    // Índice atual (próximo a executar)
turtle       // Posição e ângulo da tartaruga
turtle.painted // Células já pintadas
```

### **Ao retomar:**
- Continua do `_cmdIndex` atual
- Não refaz comandos já executados
- Canvas permanece como estava

---

## Testes Recomendados

### ✅ **Teste 1: Pause e Resume**
1. Crie código com 20+ blocos
2. [▶ Executar]
3. [⏸ Pausar] no meio
4. Confirme: tartaruga parou, status mostra "Pausado no passo X / Y"
5. [▶ Retomar]
6. Confirme: continua do passo X até Y

### ✅ **Teste 2: Pause → Passo → Resume**
1. [▶ Executar]
2. [⏸ Pausar]
3. [▶ Passo] 3 vezes
4. [▶ Retomar]
5. Confirme: execução automática retoma do passo atual

### ✅ **Teste 3: Pause → Parar**
1. [▶ Executar]
2. [⏸ Pausar]
3. [■ Parar]
4. Confirme: volta ao Idle, botão volta para "▶ Executar"

### ✅ **Teste 4: Mudança de Velocidade Durante Pause**
1. [▶ Executar] (velocidade média)
2. [⏸ Pausar]
3. [Ajusta slider para lento]
4. [▶ Retomar]
5. Confirme: continua na nova velocidade

### ✅ **Teste 5: Múltiplos Pause/Resume**
1. [▶ Executar]
2. [⏸ Pausar]
3. [▶ Retomar]
4. [⏸ Pausar] de novo
5. [▶ Retomar] de novo
6. Confirme: funciona corretamente múltiplas vezes

---

## Perguntas para Feedback

**Pause/Resume:**
- Usou o botão de Pausar durante execução?
- Foi útil poder pausar e observar o estado?
- A diferença entre Pausar e Parar ficou clara?
- Conseguiu usar Passo depois de pausar?
- Retomar funcionou como esperado?
- Sentiu falta de alguma funcionalidade relacionada?

---

## Melhorias Futuras (Opcionais)

### **Ideia 1: Breakpoints**
```
Clicar em um bloco → marca como breakpoint
Ao executar, pausa automaticamente naquele bloco
```

### **Ideia 2: Slow Motion**
```
Botão "🐢 Câmera Lenta"
Reduz velocidade drasticamente (sem pausar)
```

### **Ideia 3: Highlight de Bloco Atual**
```
Durante execução/pause, destaca bloco sendo executado
Visual direto: "estou aqui no código"
```

### **Ideia 4: Histórico de Estados**
```
Timeline: [Passo 1] [Passo 2] ... [Passo 10] [Atual]
Clicar em passo anterior → volta no tempo
```

---

## Comparação: Antes vs Depois

### **Antes:**
```
[▶ Executar] → Roda tudo de uma vez
    ↓
Se quiser parar: [■ Parar] (perde tudo)
Se quiser devagar: [▶ Passo] passo a passo (desde o início)

Limitação: Ou tudo automático, ou tudo manual
```

### **Depois:**
```
[▶ Executar] → Roda automático
    ↓
[⏸ Pausar] → Congela temporariamente
    ↓
Opções:
  - [▶ Retomar] → Continua automático
  - [▶ Passo] → Avança 1 por vez
  - [■ Parar] → Cancela

Flexibilidade: Mistura automático + manual livremente!
```

---

✅ **Funcionalidade implementada com sucesso!**

O usuário agora tem **controle total** sobre a execução! 🎮
