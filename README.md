# MeuPortalFit

Portal de Bem estar e Qualidade de vida personalizado com quiz de avaliação e recomendações personalizadas.

## 🎯 STATUS ATUAL DO PROJETO
**Última atualização:** 27 de Agosto, 2025  
**Estado:** ✅ SISTEMA MERCADO COMPLETO - Produtos selecionados funcionando  
**Branch:** main  

### Implementado ✅
- Estrutura base Next.js 15 com App Router
- Quiz básico com navegação por steps
- Layout responsivo com CSS inline (sem Tailwind)
- Sistema de testes com Jest configurado
- Arquitetura limpa sem dependências desnecessárias

### Em Andamento 🔄
- Sistema de checkpoint automático (README + TODOs)
- Documentação de contexto e decisões

### Próximos Passos 📋
- Completar funcionalidades do quiz
- Implementar sistema de recomendações
- Melhorar UX/UI
- Expandir cobertura de testes

## 🚀 Desenvolvimento

```bash
# Desenvolvimento
npm run dev

# Testes
npm test
npm run test:watch

# Build
npm run build
npm start
```

## 📁 Estrutura do Projeto

```
app/
├── quiz/[step]/     # Quiz com roteamento dinâmico
├── globals.css      # Estilos globais
├── layout.jsx       # Layout principal
└── page.jsx         # Homepage

docs/                # Documentação técnica
scripts/             # Scripts de utilidade
```

## 🔧 Stack Técnica

- **Framework:** Next.js 15
- **Frontend:** React 18 
- **Linguagem:** TypeScript + JavaScript (híbrido)
- **Testes:** Jest + Testing Library
- **Estilos:** CSS inline (sem frameworks)
- **Deploy:** Preparado para Vercel

## 📋 TODOs Rápidos
Para encontrar TODOs no código: `grep -r "// TODO\|// FIXME\|// CLAUDE:" .`

## 🤖 Para Claude Code
**Contexto:** Este é um projeto de meuportalfit em desenvolvimento colaborativo.
**Última sessão:** Implementando sistema de checkpoint para continuidade entre sessões.
**Padrões:** Usar CSS inline, manter simplicidade, documentar decisões importantes.
