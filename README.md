# ESLint Config DotAzevedo

## What's included?

- ESLint flat config;
- TypeScript support;
- React plugin;
- React Hooks plugin;
- JSX a11y plugin;
- Prettier;

## Setup

### React (TypeScript)

Install dependencies:
```bash
npm i -D eslint eslint-config-brunodsazevedo
```

Create or update your `eslint.config.js`:
```javascript
import config from 'eslint-config-brunodsazevedo'

export default config
```

Or for custom configuration:
```javascript
import { createReactConfig } from 'eslint-config-brunodsazevedo'

export default createReactConfig({
  printWidth: 100,
  singleQuote: true,
  semi: false
})
```

### TypeScript Configuration

Make sure you have a `tsconfig.json` file in your project root for proper TypeScript support.
  "extends": "@rocketseat/eslint-config/node"
}
```
