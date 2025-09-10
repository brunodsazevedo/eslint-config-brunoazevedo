import js from '@eslint/js'
// @ts-ignore - No types available for these packages
import react from 'eslint-plugin-react'
// @ts-ignore - No types available for these packages
import reactHooks from 'eslint-plugin-react-hooks'
// @ts-ignore - No types available for these packages  
import jsxA11y from 'eslint-plugin-jsx-a11y'
import typescript from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
// @ts-ignore - No types available for these packages
import prettier from 'eslint-plugin-prettier'
// @ts-ignore - No types available for these packages
import prettierConfig from 'eslint-config-prettier'
// @ts-ignore - No types available for these packages
import importPlugin from 'eslint-plugin-import'

import type { Linter } from 'eslint'

import type { ReactConfigOptions, GlobalsConfig } from './types'

const createReactConfig = (options: ReactConfigOptions = {}): Linter.FlatConfig[] => {
  const prettierOptions: ReactConfigOptions = {
    printWidth: 80,
    tabWidth: 2,
    singleQuote: true,
    trailingComma: 'all',
    arrowParens: 'always',
    semi: false,
    endOfLine: 'auto',
    ...options,
  }

  return [
    // Ignores should come first
    {
      ignores: [
        '**/node_modules/**',
        '**/dist/**', 
        '**/build/**',
        '**/.next/**',
        '**/coverage/**',
        '**/.cache/**',
        '**/public/**',
        '**/*.min.js'
      ],
    },
    // Base JS config
    {
      ...js.configs.recommended,
      files: ['**/*.{js,mjs,cjs}'],
    },
    // Main TypeScript/React config
    {
      files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}'],
      languageOptions: {
        parser: typescriptParser,
        parserOptions: {
          ecmaVersion: 'latest',
          sourceType: 'module',
          ecmaFeatures: {
            jsx: true,
          },
        },
        globals: {
          // Browser globals
          window: 'readonly',
          document: 'readonly',
          console: 'readonly',
          // Jest globals
          describe: 'readonly',
          test: 'readonly',
          expect: 'readonly',
          beforeEach: 'readonly',
          afterEach: 'readonly',
          beforeAll: 'readonly',
          afterAll: 'readonly',
          jest: 'readonly',
        } as GlobalsConfig,
      },
      plugins: {
        react: react as any,
        'react-hooks': reactHooks as any,
        'jsx-a11y': jsxA11y as any,
        '@typescript-eslint': typescript as any,
        prettier: prettier as any,
        import: importPlugin as any,
      },
      rules: {
        // JavaScript recommended rules
        ...js.configs.recommended.rules,
        
        // TypeScript recommended rules (only for TS files)
        ...(typescript.configs?.recommended?.rules || {}),
        
        // React recommended rules
        ...(react.configs?.recommended?.rules || {}),
        
        // React Hooks rules
        ...(reactHooks.configs?.recommended?.rules || {}),
        
        // JSX A11y recommended rules
        ...(jsxA11y.configs?.recommended?.rules || {}),
        
        // Prettier integration
        'prettier/prettier': [
          'error',
          {
            printWidth: prettierOptions.printWidth,
            tabWidth: prettierOptions.tabWidth,
            singleQuote: prettierOptions.singleQuote,
            trailingComma: prettierOptions.trailingComma,
            arrowParens: prettierOptions.arrowParens,
            semi: prettierOptions.semi,
            endOfLine: prettierOptions.endOfLine,
          },
        ],
        
        // Custom React rules
        'react/self-closing-comp': 'error',
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        'react/no-unknown-property': 'error',
        
        // Custom JSX A11y rules
        'jsx-a11y/alt-text': [
          'warn',
          {
            elements: ['img'],
            img: ['Image'],
          },
        ],
        'jsx-a11y/aria-props': 'warn',
        'jsx-a11y/aria-proptypes': 'warn',
        'jsx-a11y/aria-unsupported-elements': 'warn',
        'jsx-a11y/role-has-required-aria-props': 'warn',
        'jsx-a11y/role-supports-aria-props': 'warn',
        
        // TypeScript specific rules
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        
        // Import rules
        'import/order': [
          'error',
          {
            groups: [
              'builtin',
              'external',
              'internal',
              'parent',
              'sibling',
              'index',
            ],
            'newlines-between': 'always',
          },
        ],
        
        // General rules
        'no-console': 'warn',
        'prefer-const': 'error',
        'no-var': 'error',
      },
      settings: {
        react: {
          version: 'detect',
        },
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true,
            project: './tsconfig.json',
          },
          node: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
          },
        },
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
      },
    },
    // TypeScript specific configuration
    {
      files: ['**/*.{ts,tsx}'],
      languageOptions: {
        parser: typescriptParser,
        parserOptions: {
          ecmaVersion: 'latest',
          sourceType: 'module',
          ecmaFeatures: {
            jsx: true,
          },
          project: true,
        },
      },
      rules: {
        // Additional TypeScript-only rules
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/consistent-type-imports': [
          'error',
          { prefer: 'type-imports' },
        ],
      },
    },
  ]
}

// Export default configuration
const config: Linter.Config[] = createReactConfig()
export default config

// Export the function for custom configurations
export { createReactConfig }
export type { ReactConfigOptions }
