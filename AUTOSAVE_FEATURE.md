# Sistema de Auto-Save (Salvamento Automático)

## Funcionalidade Implementada

O app agora salva automaticamente o progresso do usuário, permitindo que ele saia e volte sem perder o trabalho.

## Como Funciona

### **1. Desenho Livre (draw.html)**

#### O que é salvo:
- ✅ Todos os blocos no workspace
- ✅ Posição dos blocos
- ✅ Nome do projeto (campo de texto)
- ✅ Timestamp da última modificação

#### Quando salva:
- Automaticamente 1 segundo após qualquer mudança
- Ao adicionar/remover/mover blocos
- Ao editar o nome do projeto

#### Onde é salvo:
- **localStorage** do navegador
- Chave: `emoji-coder-draw-autosave`
- Persiste mesmo fechando o navegador

#### Comportamento ao reabrir:
1. Carrega automaticamente o último estado
2. Mostra "Progresso restaurado" no status
3. Indicador visual "💾 Salvo" aparece brevemente

---

### **2. Tutorial (tutorial.html)**

#### O que é salvo:
- ✅ Progresso de **cada desafio individual** (8 saves separados)
- ✅ **Último desafio visitado** (reabre onde parou)
- ✅ Todos os blocos do workspace de cada desafio
- ✅ Timestamp por desafio

#### Quando salva:
- Automaticamente 1 segundo após mudanças nos blocos
- Ao mudar de desafio (salva qual era o atual)

#### Onde é salvo:
- **localStorage** do navegador
- Chave do desafio atual: `emoji-coder-tutorial-challenge`
- Chaves dos progressos: `emoji-coder-tutorial-progress-0` até `emoji-coder-tutorial-progress-7`

#### Comportamento ao reabrir:
1. **Reabre automaticamente no último desafio** que estava fazendo
2. Carrega o progresso daquele desafio específico
3. Se voltar a um desafio anterior, o progresso dele também está lá

---

## Indicador Visual

### Aparência:
```
💾 Salvando...  (azul #2563eb)
💾 Salvo        (verde #16a34a)
```

### Comportamento:
1. **Salvando...**: Aparece quando detecta mudança
2. **Salvo**: Aparece após completar o save (300ms depois)
3. **Desaparece**: Após 2 segundos do "Salvo"

### Localização:
- **draw.html**: Header superior direito, ao lado do nome do projeto
- **tutorial.html**: Header superior direito, ao lado da navegação

---

## Armazenamento Técnico

### LocalStorage (navegador):
```javascript
// Desenho Livre
{
  "state": {...},           // Estado completo do Blockly workspace
  "projectName": "...",     // Nome digitado pelo usuário
  "timestamp": 1234567890   // Quando foi salvo
}

// Tutorial - Desafio Atual
"3"  // Número do desafio (0-7)

// Tutorial - Progresso por Desafio
{
  "state": {...},           // Estado do workspace deste desafio
  "timestamp": 1234567890   // Quando foi salvo
}
```

### Capacidade:
- LocalStorage: ~5-10MB por domínio (varia por navegador)
- Blocos Blockly são leves (JSON compacto)
- Suficiente para centenas de projetos salvos

---

## Benefícios para Professores e Alunos

### ✅ **Sem perda de trabalho**
- Aluno fecha a aba acidentalmente → Progresso mantido
- Navegador trava → Tudo volta ao abrir de novo
- Precisa pausar a aula → Continua exatamente de onde parou

### ✅ **Múltiplas sessões**
- Começa em casa, termina na escola
- Cada desafio mantém seu próprio progresso
- Pode voltar e revisar desafios anteriores

### ✅ **Feedback visual claro**
- Indicador "💾 Salvo" confirma que não vai perder
- Reduz ansiedade de perder o trabalho
- Transparente e não intrusivo

### ✅ **Persistência por dispositivo**
- Salvo no navegador do dispositivo
- Funciona offline (após primeira carga)
- Não precisa de conta/login

---

## Limitações

### ⚠️ **Por navegador/dispositivo:**
- Salvamento é **local** (não sincroniza entre dispositivos)
- Se limpar cache/dados do navegador → Perde o progresso
- Modo privado/anônimo → Não persiste após fechar

### ⚠️ **Por domínio:**
- Cada site/domínio tem seu próprio localStorage
- `localhost` ≠ `meusite.com` (são armazenamentos diferentes)

### ⚠️ **Não é backup:**
- Para projetos importantes, use "⬇ Baixar" (salva arquivo .json)
- Auto-save é para conveniência, não substituição de backup

---

## Como Testar

### Teste 1 - Desenho Livre:
1. Abra `draw.html`
2. Adicione alguns blocos
3. Digite um nome de projeto
4. Observe "💾 Salvo" aparecer
5. Feche a aba
6. Reabra `draw.html`
7. ✅ Deve carregar tudo exatamente como estava

### Teste 2 - Tutorial (mesmo desafio):
1. Abra `tutorial.html`
2. Faça parte de um desafio (ex: desafio 3)
3. Adicione alguns blocos
4. Observe "💾 Salvo"
5. Feche a aba
6. Reabra `tutorial.html`
7. ✅ Deve reabrir no desafio 3 com os blocos lá

### Teste 3 - Tutorial (múltiplos desafios):
1. Faça parte do desafio 1
2. Mude para desafio 2 e faça parte dele
3. Mude para desafio 3 e faça parte dele
4. Feche e reabra
5. ✅ Deve abrir no desafio 3
6. Volte para desafio 1
7. ✅ Deve mostrar o progresso que você fez lá

---

## Integração com Botões Existentes

### ⬇ Baixar (Download):
- **Ainda funciona!** Salva arquivo .json
- Use para backup ou compartilhar com outros
- Independente do auto-save

### ⬆ Carregar (Upload):
- **Ainda funciona!** Carrega arquivo .json
- Sobrescreve o auto-save atual
- Útil para restaurar backups

---

## Implementação Técnica

### Debouncing (1 segundo):
- Evita salvar a cada frame
- Aguarda 1s de "silêncio" antes de salvar
- Performance otimizada

### Error Handling:
- `try/catch` em todas operações
- Falhas silenciosas (não quebram o app)
- Logs no console para debug

### Workspace Events:
```javascript
workspace.addChangeListener(scheduleAutoSave);
```
- Detecta qualquer mudança no Blockly
- Conectar, desconectar, mover, editar blocos

---

## Perguntas para Adicionar ao Feedback

**Salvamento Automático:**
- Percebeu o indicador "💾 Salvo"?
- Testou sair e voltar? O progresso estava lá?
- Sentiu-se mais seguro sabendo que auto-salva?
- Ficou confuso com o auto-save em algum momento?
- Preferia ter controle manual (botão "Salvar")?
