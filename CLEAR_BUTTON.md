# Botão "Limpar Tudo" 🗑️

## Funcionalidade Implementada

Adicionado botão **"🗑️ Limpar Tudo"** no painel lateral de Projeto, tanto no **draw.html** quanto no **tutorial.html**.

## Localização

### **Painel Lateral - Seção Projeto:**
```
┌─────────────────────────────┐
│  Projeto                    │
│                             │
│  [⬇ Baixar]  [⬆ Carregar]  │
│                             │
│  [🗑️ Limpar Tudo]           │
└─────────────────────────────┘
```

## Como Funciona

### **1. Usuário clica "🗑️ Limpar Tudo"**

### **2. Diálogo de Confirmação aparece:**
```
⚠️ Tem certeza que deseja apagar todos os blocos?

Esta ação não pode ser desfeita.

[Cancelar]  [OK]
```

### **3a. Se clicar "Cancelar":**
- Nada acontece
- Blocos permanecem intactos

### **3b. Se clicar "OK":**
- ✅ Remove **todos os blocos** exceto "Ao iniciar"
- ✅ Reseta a tartaruga para posição inicial
- ✅ Limpa o canvas (remove pinturas)
- ✅ Mostra status "Blocos apagados" por 2 segundos
- ✅ Auto-save registra o estado limpo

---

## Código Implementado

### **JavaScript:**
```javascript
document.getElementById('btn-limpar').addEventListener('click',()=>{
  if(confirm('⚠️ Tem certeza que deseja apagar todos os blocos?\n\nEsta ação não pode ser desfeita.')){
    // Remove todos os blocos exceto "ao_iniciar"
    workspace.getAllBlocks()
      .filter(b=>b.type!=='ao_iniciar')
      .forEach(b=>b.dispose());
    
    // Reseta tartaruga
    turtle=makeTurtle(0,0);
    render();
    
    // Feedback visual
    setStatus('Blocos apagados');
    setTimeout(()=>setStatus('Pronto'),2000);
  }
});
```

### **HTML:**
```html
<button class="btn btn-project" id="btn-limpar" 
        style="background: #dc2626; color: #fff; margin-top: 8px;">
  🗑️ Limpar Tudo
</button>
```

---

## Comportamento por Arquivo

### **draw.html (Desenho Livre):**
```javascript
turtle=makeTurtle(0,0);  // Sempre reseta para (0,0)
```
- Posição inicial: canto superior esquerdo (0,0)
- Ângulo: 90° (apontando para direita)

### **tutorial.html (Tutorial):**
```javascript
turtle=makeTurtle(_startR,_startC);  // Usa posição do desafio
```
- Posição inicial: definida pelo desafio atual
- Exemplo: Desafio 5 começa em (2,2)

---

## Estilo Visual

### **Cor Vermelha:**
```css
background: #dc2626;  /* Vermelho */
color: #fff;          /* Texto branco */
```

### **Por que vermelho?**
- ✅ **Ação destrutiva** - Convenção universal (vermelho = perigo)
- ✅ **Chama atenção** - Usuário pensa duas vezes antes de clicar
- ✅ **Diferenciação clara** - Contrasta com botões cinza (Baixar/Carregar)

### **Posicionamento:**
```
[⬇ Baixar]  [⬆ Carregar]  ← Lado a lado (cinza)
     ↓
[🗑️ Limpar Tudo]           ← Linha separada (vermelho)
```

---

## Interação com Auto-Save

### **Sequência de Eventos:**

1. Usuário clica "🗑️ Limpar Tudo"
2. Confirma a ação
3. Blocos são removidos
4. Workspace muda → dispara `changeListener`
5. Auto-save agenda salvamento (1s depois)
6. Estado limpo é salvo no localStorage

### **Resultado:**
- ✅ Se fechar e reabrir, workspace estará limpo
- ✅ Auto-save funciona normalmente
- ✅ Pode desfazer via "⬆ Carregar" (se tiver backup)

---

## Casos de Uso

### **1. Recomeçar do Zero**
```
Situação: Código ficou muito confuso
Ação: Limpar tudo e começar de novo
Resultado: Workspace limpo, pronto para nova solução
```

### **2. Testar Solução Alternativa**
```
Situação: "E se eu fizer de outro jeito?"
Ação: 
  1. [⬇ Baixar] (salva versão atual)
  2. [🗑️ Limpar Tudo]
  3. Tenta nova abordagem
  4. Se não gostar: [⬆ Carregar] (restaura)
```

### **3. Demonstração em Sala**
```
Professor:
  1. Mostra exemplo completo
  2. [🗑️ Limpar Tudo]
  3. "Agora vocês tentam!"
  4. Alunos começam com workspace limpo
```

### **4. Fim de Sessão**
```
Situação: Acabou a aula, próximo aluno vai usar
Ação: [🗑️ Limpar Tudo]
Resultado: Próximo aluno não vê código anterior
```

---

## Proteções de Segurança

### ✅ **1. Confirmação Obrigatória**
```javascript
if(confirm('⚠️ Tem certeza...'))
```
- Previne cliques acidentais
- Usuário precisa confirmar explicitamente

### ✅ **2. Bloco "Ao iniciar" Protegido**
```javascript
.filter(b=>b.type!=='ao_iniciar')
```
- Nunca remove o bloco inicial
- Workspace sempre tem ponto de partida

### ✅ **3. Mensagem Clara**
```
"Esta ação não pode ser desfeita."
```
- Usuário sabe que é permanente
- Incentiva salvar antes (se quiser)

### ✅ **4. Feedback Visual**
```javascript
setStatus('Blocos apagados');
setTimeout(()=>setStatus('Pronto'),2000);
```
- Confirma que a ação foi executada
- Volta ao estado normal após 2s

---

## Diferença: Limpar vs Baixar/Carregar

### **🗑️ Limpar Tudo:**
- **O que faz:** Remove blocos do workspace atual
- **Irreversível:** Sim (exceto se tiver backup/auto-save)
- **Uso:** "Quero começar do zero"

### **⬇ Baixar:**
- **O que faz:** Salva arquivo .json
- **Irreversível:** Não (cria cópia)
- **Uso:** "Quero guardar este código"

### **⬆ Carregar:**
- **O que faz:** Restaura de arquivo .json
- **Irreversível:** Sobrescreve workspace atual
- **Uso:** "Quero continuar código salvo"

---

## Fluxo Recomendado: Backup + Limpar

### **Prática Segura:**
```
1. [⬇ Baixar]         ← Salva backup
2. [🗑️ Limpar Tudo]   ← Limpa workspace
3. [Cria novo código]
4. [Se não gostar:]
   → [⬆ Carregar]     ← Restaura backup
```

### **Por que não desfazer automático (Ctrl+Z)?**
- Blockly não tem undo nativo multi-nível robusto
- "Limpar Tudo" é ação única e grande
- Melhor pedir confirmação do que implementar undo complexo

---

## Testes Recomendados

### ✅ **Teste 1: Básico**
1. Adicione vários blocos
2. Clique "🗑️ Limpar Tudo"
3. Confirme
4. Verifique: apenas "Ao iniciar" permanece

### ✅ **Teste 2: Cancelar**
1. Adicione blocos
2. Clique "🗑️ Limpar Tudo"
3. Clique "Cancelar"
4. Verifique: blocos permanecem intactos

### ✅ **Teste 3: Tartaruga Reseta**
1. Execute código que move/pinta
2. Clique "🗑️ Limpar Tudo"
3. Confirme
4. Verifique: tartaruga volta ao início, canvas limpo

### ✅ **Teste 4: Auto-Save**
1. Limpe tudo
2. Feche aba
3. Reabra
4. Verifique: workspace ainda está limpo (auto-save funcionou)

### ✅ **Teste 5: Tutorial - Posição Correta**
1. Vá para desafio 5 (inicia em 2,2)
2. Adicione blocos
3. Clique "🗑️ Limpar Tudo"
4. Verifique: tartaruga volta para (2,2) - posição do desafio

---

## Perguntas para Feedback

**Botão Limpar Tudo:**
- Usou o botão "🗑️ Limpar Tudo"?
- A confirmação deixou claro que era permanente?
- Sentiu falta de um botão "Desfazer" depois?
- Preferia que tivesse backup automático antes de limpar?
- Cor vermelha ajudou a identificar ação destrutiva?
- Ficou claro que o bloco "Ao iniciar" não é removido?

---

## Melhorias Futuras (Opcionais)

### **Ideia 1: Backup Automático**
```javascript
// Antes de limpar, salva no localStorage temporário
const backup = Blockly.serialization.workspaces.save(workspace);
localStorage.setItem('last-before-clear', JSON.stringify(backup));
```
- Permite "desfazer" uma vez
- Útil para cliques acidentais

### **Ideia 2: Histórico de Versões**
```javascript
// Salva últimas 5 versões
versions = [v1, v2, v3, v4, v5];
```
- Botão "Ver versões anteriores"
- Escolhe qual restaurar

### **Ideia 3: Contagem de Blocos**
```
⚠️ Tem certeza que deseja apagar 12 blocos?
```
- Mostra quantos blocos serão perdidos
- Decisão mais informada

---

## Acessibilidade

### ✅ **Touch-Friendly:**
```css
min-height: 44px;  /* Padrão Apple HIG */
```
- Botão grande o suficiente para tablets

### ✅ **Texto Claro:**
```
🗑️ Limpar Tudo
```
- Ícone + texto
- Não depende só do ícone

### ✅ **Confirmação Acessível:**
```javascript
confirm('⚠️ ...')  // Diálogo nativo do navegador
```
- Leitores de tela suportados
- Navegação por teclado funciona

---

## Resultado Visual

### **Antes de Limpar:**
```
Workspace:
├── Ao iniciar
├── Frente
├── Pintar 🔵
├── Repita 4 vezes
│   ├── Frente
│   └── Girar direita
└── ...

Canvas: [Desenho pintado]
```

### **Depois de Limpar:**
```
Workspace:
└── Ao iniciar

Canvas: [Limpo]
```

Clean slate! Pronto para novo código. ✨

---

✅ **Funcionalidade implementada com sucesso!**
