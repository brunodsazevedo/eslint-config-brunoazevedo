# ESLint Config Bruno Azevedo

**🇧🇷 Português** | [🇺🇸 English](./README.md)

Uma configuração moderna do ESLint v10 para projetos React com TypeScript, seguindo as melhores práticas de clean code e usando apenas pacotes oficiais.

## 🚀 Características

- **ESLint v10** com flat config format
- **React 18+** com hooks validation
- **TypeScript** com regras rigorosas
- **Prettier** integração completa
- **Acessibilidade** com jsx-a11y

## ⚠️ Breaking Changes na v1.1.0

Esta versão atualiza para o **ESLint v10** e eleva a versão mínima do Node.js.

### Requisitos

| Requisito | v1.0.x | v1.1.0 |
|---|---|---|
| Node.js | >= 18.0.0 | >= 20.19.0 |
| ESLint | ^9.0.0 | ^10.0.0 |
| TypeScript (opcional) | ^5.0.0 | >= 5.0.0 |

### Novas regras ativas

Três novas regras agora estão ativas via `eslint:recommended` (ESLint 10):

- **`no-unassigned-vars`** — variáveis declaradas mas nunca atribuídas
- **`no-useless-assignment`** — atribuições cujo valor nunca é lido antes de ser sobrescrito
- **`preserve-caught-error`** — erros capturados ignorados ao relançar uma nova exceção

Isso pode introduzir novos erros em codebases existentes. Para desabilitar qualquer uma delas:

```javascript
import { reactConfig } from 'eslint-config-brunoazevedo'

export default [
  ...reactConfig,
  {
    rules: {
      'no-unassigned-vars': 'off',
      'no-useless-assignment': 'off',
      'preserve-caught-error': 'off',
    },
  },
]
```

### Migração

1. Atualize o Node.js para v20.19.0 ou superior
2. Atualize o ESLint: `npm install -D eslint@^10.0.0`
3. Execute `npx eslint .` e corrija os novos erros das três novas regras

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
