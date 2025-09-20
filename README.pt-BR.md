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

## � Regras Incluídas

### JavaScript/ES6+
- Regras recomendadas do @eslint/js
- Configuração moderna ES2022+
- Validação de import/export

### React
- Regras recomendadas do eslint-plugin-react
- Validação de hooks com react-hooks
- Hooks extras com react-hooks-extra
- Configuração React 18+

### TypeScript
- Parser @typescript-eslint/parser
- Regras recomendadas com verificação de tipos
- Modo strict habilitado
- Validação de interfaces e tipos

### Prettier
- Integração completa com eslint-config-prettier
- Conflitos de formatação resolvidos
- eslint-plugin-prettier para formatação

### Acessibilidade
- jsx-a11y com regras recomendadas
- Conformidade WCAG
- Validação de elementos acessíveis

## 🎯 Arquivos Suportados

- **JavaScript**: `.js`, `.mjs`, `.cjs`
- **TypeScript**: `.ts`, `.tsx`
- **React**: `.jsx`, `.tsx`

## 🚫 Padrões Ignorados

Por padrão, os seguintes padrões são ignorados:

- `node_modules/`
- `dist/`
- `build/`
- `.next/`
- `coverage/`
- `*.min.js`
- `*.bundle.js`

## 🛠️ Desenvolvimento

### Contribuindo

1. Faça um fork do repositório
2. Crie uma branch de feature: `git checkout -b feature/nova-regra`
3. Execute os testes: `npm run test:all`
4. Commit: `git commit -m 'Add: nova regra para React'`
5. Push: `git push origin feature/nova-regra`
6. Abra um Pull Request

## 📄 Licença

Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🤝 Suporte

- **Issues**: [GitHub Issues](https://github.com/brunodsazevedo/eslint-config-brunoazevedo/issues)
- **Discussões**: [GitHub Discussions](https://github.com/brunodsazevedo/eslint-config-brunoazevedo/discussions)

---

Feito com ❤️ por [Bruno Azevedo](https://github.com/brunodsazevedo)
