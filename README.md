# ESLint Config DotAzevedo

## What's included?

- ESLint flat config;
- TypeScript support;
- React plugin;
- React Hooks plugin;
- JSX a11y plugin;
- Import plugin;
- Prettier integration;

## Setup

### React (TypeScript)

Install dependencies:
```bash
npm i -D eslint eslint-config-brunodsazevedo
```

Create `eslint.config.js` in your project root:
```javascript
import config from 'eslint-config-brunodsazevedo'

export default config
```

### Custom Configuration

For custom Prettier options:
```javascript
import { createReactConfig } from 'eslint-config-brunodsazevedo'

export default createReactConfig({
  printWidth: 100,
  singleQuote: true,
  semi: false,
  trailingComma: 'all'
})
```

### TypeScript Configuration

Make sure you have a `tsconfig.json` file in your project root:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Features

- ✅ Validates JavaScript, TypeScript, JSX, and TSX files
- ✅ Excludes node_modules and build directories automatically  
- ✅ Prettier integration with consistent formatting
- ✅ React and React Hooks best practices
- ✅ Accessibility rules with jsx-a11y
- ✅ Import ordering and organization
- ✅ TypeScript-specific rules and type checking
  "extends": "@rocketseat/eslint-config/node"
}
```
