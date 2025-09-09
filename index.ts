// Main configuration file that can be used directly
import reactConfig from './react'
import type { Linter } from 'eslint'

const config: Linter.FlatConfig[] = reactConfig
export default config

// Also export named configs for flexibility
export { default as react } from './react'
export { createReactConfig } from './react'
export type { ReactConfigOptions } from './types'

// You can add more specific configs here, for example:
// export { default as node } from './node'
// export { default as next } from './next'
