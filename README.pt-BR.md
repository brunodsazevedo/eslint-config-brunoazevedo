# ESLint Config Bruno Azevedo

**🇧🇷 Português** | [🇺🇸 English](./README.md)

Uma configuração moderna do ESLint v9 para projetos React com TypeScript, seguindo as melhores práticas de clean code e usando apenas pacotes oficiais.

## 🚀 Características

- **ESLint v9** com flat config format
- **React 18+** com hooks validation
- **TypeScript** com regras rigorosas
- **Prettier** integração completa
- **Acessibilidade** com jsx-a11y

## 📦 Instalação

### Pré-requisitos

Primeiro, certifique-se de ter o ESLint e Prettier instalados como dependências de desenvolvimento:

```bash
npm install -D eslint prettier
```

### Instalar a configuração

```bash
npm install -D eslint-config-brunoazevedo
```

> **Nota**: Se você estiver usando TypeScript, instale também: `npm install -D typescript`

## 🔧 Configuração

Crie um arquivo `eslint.config.mjs` na raiz do seu projeto:

```javascript
import { reactConfig } from 'eslint-config-brunoazevedo'

export default reactConfig
```

### Configuração Personalizada

```javascript
import { reactConfig } from 'eslint-config-brunoazevedo'

export default [
  ...reactConfig,
  {
    rules: {
      // Suas regras personalizadas
      'react/jsx-uses-react': 'off',
    },
  },
]
```

### Desabilitando Regras Específicas

Você pode desabilitar regras específicas estendendo a configuração:

```javascript
import { reactConfig } from 'eslint-config-brunoazevedo'

export default [
  ...reactConfig,
  {
    rules: {
      // Desabilitar regras específicas
      '@typescript-eslint/no-unused-vars': 'off',
      'react-hooks/exhaustive-deps': 'warn',
      'prettier/prettier': 'off',
      
      // Alterar severidade das regras
      'jsx-a11y/alt-text': 'warn', // Muda de erro para warning
    },
  },
]
```

### Configurações Específicas por Framework

**Para projetos Next.js:**
```javascript
import { reactConfig } from 'eslint-config-brunoazevedo'

export default [
  ...reactConfig,
  {
    rules: {
      // Ajustes específicos para Next.js
      'react/react-in-jsx-scope': 'off',
      '@next/next/no-img-element': 'error',
    },
  },
]
```

**Para projetos Vite:**
```javascript
import { reactConfig } from 'eslint-config-brunoazevedo'

export default [
  ...reactConfig,
  {
    ignores: ['dist/**', 'vite.config.ts'],
  },
]
```

**Para arquivos de teste com regras customizadas:**
```javascript
import { reactConfig } from 'eslint-config-brunoazevedo'

export default [
  ...reactConfig,
  {
    // Configuração específica para arquivos de teste
    files: ['**/*.test.{js,ts,jsx,tsx}', '**/*.spec.{js,ts,jsx,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'react-hooks/rules-of-hooks': 'off',
    },
  },
]
```

## Scripts recomendados

Adicione ao seu `package.json`:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "type-check": "tsc --noEmit"
  }
}
```

## Configuração do Prettier

Crie `.prettierrc.json`:

```json
{
  "printWidth": 80,
  "tabWidth": 2,
  "singleQuote": true,
  "trailingComma": "all",
  "arrowParens": "always",
  "semi": false,
  "endOfLine": "auto"
}
```

## Principais recursos do ESLint v9

### 🆕 Flat Config
- Sintaxe mais simples e intuitiva
- Melhor performance
- Configuração baseada em ES Modules

### 🔧 Regras incluídas
- **JavaScript**: Regras essenciais do ESLint
- **TypeScript**: Verificação de tipos + regras strict
- **React**: Regras modernas para React 18+
- **React Hooks**: Validação completa de hooks
- **Acessibilidade**: jsx-a11y otimizado
- **Prettier**: Formatação consistente

### 📁 Padrões ignorados
- `node_modules/`, `dist/`, `build/`, `.next/`
- `coverage/`, arquivos de configuração
- Arquivos ocultos (exceto `.github/`)

## Migração do ESLint v8

Se você está migrando do ESLint v8:

1. **Remova** `.eslintrc.{js,json,yml}`
2. **Crie** `eslint.config.mjs` com a nova sintaxe
3. **Atualize** dependências para versões compatíveis
4. **Teste** a configuração: `npm run lint`

## Licença

MIT © Bruno Azevedo
