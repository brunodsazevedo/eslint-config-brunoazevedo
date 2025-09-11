import { TestUtils } from '../utils/test-helpers.js'

export class IgnorePatternsTest {
  constructor(reporter) {
    this.reporter = reporter
  }

  async run() {
    this.reporter.log('🚫 Testando padrões de ignore...')

    try {
      const patterns = [
        'node_modules/some-package/index.js',
        'dist/main.js',
        'build/app.js',
        '.next/static/chunks/main.js',
        'coverage/lcov-report/index.html',
      ]

      for (const pattern of patterns) {
        const isIgnored = await TestUtils.testIgnorePattern(pattern)
        if (isIgnored) {
          this.reporter.pass(`Padrão '${pattern}' é ignorado corretamente`)
        } else {
          this.reporter.fail(`Padrão '${pattern}' deveria ser ignorado`)
        }
      }
    } catch (error) {
      this.reporter.fail('Falha nos padrões de ignore', error)
    }
  }
}
