# ESLint Config Bruno Azevedo

[🇧🇷 Portuguese](./README.pt-BR.md) | **🇺🇸 English**

A modern ESLint v9 configuration for React projects with TypeScript, following clean code best practices and using only official packages.

## 🚀 Features

- **ESLint v9** with flat config format
- **React 18+** with hooks validation
- **TypeScript** with strict rules
- **Prettier** complete integration
- **Accessibility** with jsx-a11y

## 📦 Installation

### Prerequisites

First, make sure you have ESLint and Prettier installed as dev dependencies:

```bash
npm install -D eslint prettier
```

### Install the config

```bash
npm install -D eslint-config-brunoazevedo
```

> **Note**: If you're using TypeScript, also install: `npm install -D typescript`

## 🔧 Configuration

Create an `eslint.config.mjs` file in your project root:

```javascript
import { reactConfig } from 'eslint-config-brunoazevedo'

export default reactConfig
```

### Custom Configuration

```javascript
import { reactConfig } from 'eslint-config-brunoazevedo'

export default [
  ...reactConfig,
  {
    rules: {
      // Your custom rules
      'react/jsx-uses-react': 'off',
    },
  },
]
```

### Disabling Specific Rules

You can disable specific rules by extending the configuration:

```javascript
import { reactConfig } from 'eslint-config-brunoazevedo'

export default [
  ...reactConfig,
  {
    rules: {
      // Disable specific rules
      '@typescript-eslint/no-unused-vars': 'off',
      'react-hooks/exhaustive-deps': 'warn',
      'prettier/prettier': 'off',
      
      // Override rule severity
      'jsx-a11y/alt-text': 'warn', // Change from error to warning
    },
  },
]
```

### Framework-Specific Configurations

**For Next.js projects:**
```javascript
import { reactConfig } from 'eslint-config-brunoazevedo'

export default [
  ...reactConfig,
  {
    rules: {
      // Next.js specific adjustments
      'react/react-in-jsx-scope': 'off',
      '@next/next/no-img-element': 'error',
    },
  },
]
```

**For Vite projects:**
```javascript
import { reactConfig } from 'eslint-config-brunoazevedo'

export default [
  ...reactConfig,
  {
    ignores: ['dist/**', 'vite.config.ts'],
  },
]
```

**For testing files with custom rules:**
```javascript
import { reactConfig } from 'eslint-config-brunoazevedo'

export default [
  ...reactConfig,
  {
    // Configuration for test files
    files: ['**/*.test.{js,ts,jsx,tsx}', '**/*.spec.{js,ts,jsx,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'react-hooks/rules-of-hooks': 'off',
    },
  },
]

```
## 📋 Included Rules

### JavaScript/ES6+
- Recommended @eslint/js rules
- Modern ES2022+ configuration
- Import/export validation

### React
- Recommended eslint-plugin-react rules
- Hooks validation with react-hooks
- Extra hooks with react-hooks-extra
- React 18+ configuration

### TypeScript
- @typescript-eslint/parser parser
- Recommended type-checked rules
- Strict mode enabled
- Interface and type validation

### Prettier
- Complete integration with eslint-config-prettier
- Formatting conflicts resolved
- eslint-plugin-prettier for formatting

### Accessibility
- jsx-a11y with recommended rules
- WCAG compliance
- Accessible elements validation

## 🎯 Supported Files

- **JavaScript**: `.js`, `.mjs`, `.cjs`
- **TypeScript**: `.ts`, `.tsx`
- **React**: `.jsx`, `.tsx`

## 🚫 Ignored Patterns

By default, the following patterns are ignored:

- `node_modules/`
- `dist/`
- `build/`
- `.next/`
- `coverage/`
- `*.min.js`
- `*.bundle.js`

## 🛠️ Development

### Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-rule`
3. Run tests: `npm run test:all`
4. Commit: `git commit -m 'Add: new rule for React'`
5. Push: `git push origin feature/new-rule`
6. Open a Pull Request

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

- **Issues**: [GitHub Issues](https://github.com/brunodsazevedo/eslint-config-brunoazevedo/issues)
- **Discussions**: [GitHub Discussions](https://github.com/brunodsazevedo/eslint-config-brunoazevedo/discussions)

---

Made with ❤️ by [Bruno Azevedo](https://github.com/brunodsazevedo)
