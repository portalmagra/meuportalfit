# 🤖 Claude Code - Context & Checkpoint

## Sistema de Save State
Este arquivo é o "save game" do projeto para continuidade entre sessões do Claude Code.

## 📊 Status Atual (27 Ago 2025)
- **Versão:** Minimalista funcional
- **Estado:** Sistema de checkpoint implementado
- **Última ação:** Documentando TODOs no código

## 🎯 Contexto Atual
Estamos implementando um sistema onde toda vez que encerrar uma sessão, o Claude:
1. ✅ Atualiza o README com status atual
2. 🔄 Documenta TODOs no código com padrão `// CLAUDE:`, `// TODO:`, `// FIXME:`
3. ⏳ Atualiza documentação técnica

## 🔍 TODOs Encontrados no Código
Para buscar: `grep -r "// TODO\|// FIXME\|// CLAUDE:" .`

### Homepage (app/page.jsx)
- Conectar botão com rota /quiz
- Adicionar animações de entrada
- Implementar tracking de analytics

### Quiz Principal (app/quiz/page.jsx)
- Implementar steps do quiz com estado
- Adicionar validação de formulários
- Conectar com API de recomendações
- **FIXME:** Classes CSS não definidas (hero-section, blob, etc.)

### Quiz Steps (app/quiz/[step]/page.tsx)
- Implementar lógica de navegação entre steps
- Adicionar validação por step
- Salvar progresso em localStorage
- Conectar com sistema de scoring

## 🏗️ Próximas Prioridades
1. **Corrigir CSS quebrado** - Classes não definidas no quiz
2. **Conectar homepage ao quiz** - Link funcional
3. **Implementar steps básicos** - Navegação funcional
4. **Sistema de estado** - Context ou localStorage

## 💡 Decisões Tomadas
- **Sem Tailwind:** Removido para simplicidade, usando CSS inline
- **Sem ESLint:** Removido para deploy mais simples
- **Híbrido JS/TS:** Mantendo flexibilidade
- **Comentários padrão:** `// CLAUDE:` para contexto, `// TODO:` para tarefas

## 🚀 Comandos Úteis
```bash
# Encontrar TODOs
grep -r "// TODO\|// FIXME\|// CLAUDE:" .

# Desenvolvimento
npm run dev

# Testes
npm test
```

## 🔄 Para Nova Sessão
1. Ler este arquivo primeiro
2. Verificar README.md para status
3. Executar grep para ver TODOs pendentes
4. Checar git status para mudanças
5. Continuar de onde parou!