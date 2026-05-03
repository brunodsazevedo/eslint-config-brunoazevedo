# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Padrões de código

### Paradigma
OOP com **Clean Code + SOLID** — não KISS (que favorece estilo procedural plano). O código usa classes com responsabilidades bem delimitadas e injeção de dependência explícita.

### Padrões aplicados

**Dependency Injection**: `TestReporter` é injetado no construtor de cada suite de teste. Ao criar novas suites, sempre receber o reporter via construtor — nunca instanciar dentro da classe.

**Single Responsibility (SRP)**: cada classe faz exatamente uma coisa:
- `TestReporter` → rastreia e imprime resultados
- `TestUtils` → cria instâncias ESLint e executa lint no código
- `*Test` → testa somente seu domínio (React, TypeScript, etc.)
- `TestRunner` → orquestra a execução das suites

**Data-driven**: casos de teste são arrays de objetos literais com a forma `{ name, code, shouldPass, filename }`. Lógica de avaliação fica separada dos dados — nunca embutir código de teste dentro de `if/else`.

**Template Method (implícito)**: toda suite de teste segue a estrutura `run()` → `runTestCases(testCases)`. Ao criar uma nova suite, manter esse contrato.

**Static helpers**: `TestUtils` usa métodos estáticos para utilitários sem estado. Não transformar em instância.

### Convenções de estilo

- ESM puro: imports sempre com extensão `.js`; usar `fileURLToPath + dirname` para equivalente de `__dirname`
- `const` por padrão; `let` apenas quando reatribuição é necessária; nunca `var`
- Arrow functions para componentes e callbacks: `export const Foo = () => ...`
- Named exports em todos os módulos de teste; default export apenas em `react-config.js` (exigido pelo formato flat config do ESLint)
- `async/await` em todas as operações assíncronas; sem `.then()` chains
- Nomes descritivos sem abreviações; PascalCase para classes (`ConfigurationTest`), camelCase para métodos e variáveis
- Sem comentários que explicam o *quê*; comentários apenas para decisões intencionais não óbvias (ex: type-checking desabilitado em `react-config.js`)

## Preferências de interação

- **Idioma**: sempre responder em português brasileiro (pt-BR), incluindo comentários em código gerado, mensagens de commit e documentação
- **Tom**: direto e técnico, sem introduções longas nem resumos redundantes no final das respostas
- **Código**: sem comentários óbvios; adicionar comentário apenas quando o *porquê* não for evidente no próprio código
- **Escopo**: não adicionar funcionalidades, refatorações ou abstrações além do que foi pedido

## Commands

```bash
# Install dependencies
npm install

# Run unit tests (structural validation of the config)
npm test

# Run integration tests (real-world scenarios with temp files)
npm run test:integration

# Run all tests before publishing
npm run validate
```

There is no build step — the source files are the distribution. `prepublishOnly` runs `validate` automatically.

Add `--verbose` to any test command for detailed rule-level output:
```bash
node test/unit.js --verbose
node test/test-scenarios.js --verbose
```

## Architecture

This is an ESM package (`"type": "module"`) with no build pipeline. The two source files are what gets published to npm.

### Config files

**[react-config.js](react-config.js)** — the entire ESLint flat config, exported as a default array of 6 config objects applied in order:
1. `js.configs.recommended` — base JS rules (inclui as 3 novas regras do ESLint 10: `no-unassigned-vars`, `no-useless-assignment`, `preserve-caught-error`)
2. Global `languageOptions` — ecmaVersion latest, Node/browser/jest globals
3. TypeScript block (`**/*.{ts,tsx}`) — `@typescript-eslint` parser + recommended rules; type-checking rules are intentionally disabled (no `project` in parserOptions) to avoid issues with test files
4. React block (`**/*.{js,jsx,ts,tsx}`) — react (via `fixupPluginRules` do `@eslint/compat`), react-hooks, react-hooks-extra, jsx-a11y plugins
5. Prettier block — `eslint-plugin-prettier` with inline formatting options matching `.prettierrc.json`
6. Ignore patterns — node_modules, dist, build, .next, coverage, config files, dotfiles (except .github)

> **`fixupPluginRules`**: `eslint-plugin-react` v7.x usa `context.getFilename()`, removido no ESLint 10. O wrapper `fixupPluginRules` do `@eslint/compat` restaura a compatibilidade sem alterar os nomes das regras. Remover esse wrapper quando `eslint-plugin-react` v8+ for lançado com suporte nativo ao ESLint 10.

**[index.js](index.js)** — re-exports `reactConfig` (named export) from `react-config.js`. Consumers import via:
```js
import { reactConfig } from 'eslint-config-brunoazevedo'
```

### Test structure

Tests use a **custom test runner** (no jest/vitest). Node 20+ built-in `fs/promises` + `ESLint` API are sufficient.

- **[test/unit.js](test/unit.js)** — orchestrator that instantiates each test suite class and runs them sequentially via `TestRunner`
- **[test/unit/*.test.js](test/unit/)** — one class per concern (`ConfigurationTest`, `JavaScriptRulesTest`, `ReactTest`, `TypeScriptTest`, `PrettierTest`, `AccessibilityTest`, `IgnorePatternsTest`), each receiving a `TestReporter` instance
- **[test/utils/test-helpers.js](test/utils/test-helpers.js)** — `TestUtils` (creates ESLint instance from `index.js`, lints code strings via temp files) and `TestReporter` (tracks pass/fail, prints summary, supports `--verbose`)
- **[test/test-scenarios.js](test/test-scenarios.js)** — integration test that writes real React/TypeScript component files to temp dirs and lints them; includes a "must fail" scenario to verify error detection

Unit tests create temp files under `test/temp/`; integration tests under `test/.tmp-scenarios/`. Both are cleaned up after each run.

### Git Flow & CI/CD

The project follows Git Flow strictly — see [.github/GITFLOW.md](.github/GITFLOW.md).

| Branch action | CI/CD result |
|---|---|
| `push develop` | Tests + auto beta version bump + npm publish `@beta` |
| `push main` | Tests + GitHub Release + npm publish `@latest` using version from `package.json` |

**Key**: version on `main` must already be set correctly in `package.json` before merging a release branch. The `develop` branch auto-increments the prerelease suffix (`-beta.1`, `-beta.2`, ...).

Required GitHub Secret: `NPM_TOKEN`.

## Histórico de decisões relevantes

### v1.1.0 — Upgrade ESLint 10

**Node.js mínimo elevado para `>=20.19.0`** (era `>=18.0.0`). O CI/CD (`release.yml`) usa `NODE_VERSION: '20'`.

**`eslint-plugin-react-hooks-extra` v2** removeu as regras `no-unnecessary-use-callback`, `no-unnecessary-use-memo` e `prefer-use-state-lazy-initialization`. A única regra disponível na v2 é `no-direct-set-state-in-use-effect`. Migração para `eslint-plugin-react-x` planejada para v1.2.0+.

**`eslint-plugin-react` v7.x é incompatível com ESLint 10** porque usa `context.getFilename()`, removido no ESLint 10. Solução: `fixupPluginRules` do `@eslint/compat` envolve o plugin e restaura compatibilidade. `@eslint/compat` foi adicionado a `dependencies`. Remover quando `eslint-plugin-react` v8+ for lançado.

**3 novas regras ativas via `eslint:recommended` (ESLint 10):**
- `no-unassigned-vars` — variável declarada mas nunca atribuída
- `no-useless-assignment` — atribuição sobrescrita sem ser lida
- `preserve-caught-error` — erro capturado ignorado ao relançar nova exceção

Essas regras são cobertas por `JavaScriptRulesTest` (`test/unit/javascript-rules.test.js`).
