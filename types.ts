export interface ReactConfigOptions {
  printWidth?: number
  tabWidth?: number
  singleQuote?: boolean
  trailingComma?: 'all' | 'es5' | 'none'
  arrowParens?: 'always' | 'avoid'
  semi?: boolean
  endOfLine?: 'auto' | 'lf' | 'crlf' | 'cr'
}

export interface GlobalsConfig {
  readonly [key: string]: 'readonly' | 'writable' | 'off' | boolean
}

export interface ESLintPlugin {
  configs?: Record<string, any>
  rules?: Record<string, any>
  processors?: Record<string, any>
  environments?: Record<string, any>
  meta?: {
    name?: string
    version?: string
  }
}
