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
    js.configs.recommended,
    {
      files: ['**/*.{js,jsx,ts,tsx}'],
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
      },
      rules: {
        // JavaScript recommended rules
        ...js.configs.recommended.rules,
        
        // TypeScript recommended rules
        ...typescript.configs.recommended.rules,
        
        // React recommended rules
        ...react.configs.recommended.rules,
        
        // React Hooks rules
        ...reactHooks.configs.recommended.rules,
        
        // JSX A11y recommended rules
        ...jsxA11y.configs.recommended.rules,
        
        // Prettier rules (should come last to override conflicting rules)
        ...prettierConfig.rules,
        
        // Custom rules
        'react/self-closing-comp': 'error',
        'prettier/prettier': [
          'error',
          prettierOptions,
        ],
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
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
        'react/no-unknown-property': 'error',
      },
      settings: {
        react: {
          version: 'detect',
        },
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts'],
        },
      },
    },
    {
      ignores: ['node_modules/**', 'dist/**', 'build/**'],
    },
  ]
}

// Export default configuration
const config: Linter.FlatConfig[] = createReactConfig()
export default config

// Export the function for custom configurations
export { createReactConfig }
export type { ReactConfigOptions }
