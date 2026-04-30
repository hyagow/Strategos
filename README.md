# 🚀 React + Vite

Este projeto utiliza React com Vite, oferecendo uma configuração mínima e rápida para desenvolvimento moderno com suporte a HMR (Hot Module Replacement) e regras básicas de ESLint.

## 📦 Tecnologias
```
- React
- Vite
- ESLint
```
## ⚡ Plugins disponíveis

Atualmente, existem dois plugins oficiais para integração do React com Vite:

- @vitejs/plugin-react
Utiliza Babel (ou OXC, quando usado com rolldown-vite) para habilitar o Fast Refresh.
- @vitejs/plugin-react-swc
Utiliza SWC para Fast Refresh, oferecendo uma alternativa mais rápida em alguns cenários.

## 🧠 React Compiler

O React Compiler não está habilitado neste template por padrão, devido ao impacto no desempenho durante o desenvolvimento e build.

Caso queira utilizá-lo, consulte a documentação oficial do React para instruções de configuração.

## 🔍 ESLint e boas práticas

Este template inclui uma configuração básica de ESLint.

Para aplicações em produção, recomenda-se:

Utilizar TypeScript
Habilitar regras de lint com análise de tipos (type-aware linting)

👉 Consulte o template oficial com TypeScript para aprender a integrar:

TypeScript
typescript-eslint
## 🛠️ Como rodar o projeto
```Bash
# Instalar dependências
npm install

# Rodar em ambiente de desenvolvimento
npm run dev

# Build para produção
npm run build


# Visualizar build
npm run preview
```
## 📁 Estrutura básica
```Bash
├── src/
├── public/
├── index.html
├── package.json
├── vite.config.js
```
## 📌 Considerações

Este template é ideal para:

- Projetos rápidos
- Prototipagem
- Aplicações que não exigem configuração complexa inicial

Para projetos maiores, considere adicionar:

- TypeScript
- Gerenciamento de estado (Redux, Zustand, etc.)
- Testes (Vitest, Jest)
- Estrutura de pastas mais robusta
