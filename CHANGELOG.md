# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-05-02

### ⚠️ Breaking Changes

- **Node.js mínimo**: elevado de `>=18.0.0` para `>=20.19.0`
- **ESLint peer dependency**: atualizado de `^9.0.0` para `^10.0.0`
- **TypeScript peer dependency**: range atualizado de `^5.0.0` para `>=5.0.0` (agora suporta TypeScript 6)

### ✨ What's New

- **ESLint v10**: upgrade para a versão mais recente do ESLint
- **3 novas regras ativas** via `eslint:recommended`:
  - `no-unassigned-vars`
  - `no-useless-assignment`
  - `preserve-caught-error`
- **TypeScript 6 support**: peerDependency atualizada para aceitar TypeScript 6.x

### 📦 Dependencies Updated

- `eslint`: 9.x → 10.x
- `@eslint/js`: 9.x → 10.x
- `@typescript-eslint/eslint-plugin`: 8.43 → 8.59
- `@typescript-eslint/parser`: 8.43 → 8.59
- `eslint-config-prettier`: 9.x → 10.x
- `eslint-plugin-react-hooks`: 5.x → 7.x
- `eslint-plugin-react-hooks-extra`: 1.x → 2.x
- `prettier`: 3.6 → 3.8
- `react` / `react-dom`: 19.1 → 19.2 (devDependencies)

## [1.0.0] - 2024-09-19

### 🎉 Initial Release

This is the first stable release of `eslint-config-brunoazevedo`!

### ✨ Features

- **ESLint v9 Flat Config**: Modern configuration format with full ES modules support
- **React 18+ Support**: Complete React configuration with hooks and JSX rules
- **TypeScript Integration**: Strict TypeScript rules with type checking
- **Prettier Integration**: Seamless Prettier integration with conflict resolution
- **Accessibility Rules**: jsx-a11y integration for better accessibility
- **Comprehensive Testing**: Full test suite with 17+ test scenarios
- **GitHub Actions CI/CD**: Automated testing, versioning, and npm publishing
- **Git Flow Integration**: Native support for Git Flow workflow
- **Multi-language Documentation**: English and Portuguese documentation

### 🚀 Configuration Options

- **Base Config**: `eslint-config-brunoazevedo` - Core ESLint rules
- **React Config**: `eslint-config-brunoazevedo/react-config` - React + TypeScript + Prettier

### 📦 Installation

```bash
npm install -D eslint-config-brunoazevedo
```

### 🔧 Usage

```javascript
// eslint.config.mjs
import { reactConfig } from 'eslint-config-brunoazevedo'

export default reactConfig
```

### 🏗️ Requirements

- Node.js >= 18.0.0
- npm >= 8.0.0
- ESLint >= 9.0.0

### 📚 Documentation

- 📖 [English README](./README.md)
- 📖 [Portuguese README](./README.pt-BR.md)
- 🌊 [Git Flow Integration Guide](./.github/workflows/GITFLOW.md)

---

## Development History

### Beta Releases

- **1.0.0-beta.2** - Git Flow integration and workflow improvements
- **1.0.0-beta.1** - Initial beta release with core functionality
- **1.0.0-rc.0** - Release candidate with documentation updates