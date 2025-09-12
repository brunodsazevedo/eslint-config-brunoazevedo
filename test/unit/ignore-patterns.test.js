import { TestUtils } from '../utils/test-helpers.js'

export class IgnorePatternsTest {
  constructor(reporter) {
    this.reporter = reporter
  }

  async run() {
    this.reporter.log('🚫 Testing ignore patterns...')

    const patterns = [
      'node_modules/some-package/index.js',
      'dist/main.js',
      'build/app.js',
      '.next/static/chunks/main.js',
      'coverage/lcov-report/index.html',
    ]

    for (const pattern of patterns) {
      try {
        const eslint = await TestUtils.createESLintInstance()
        const isIgnored = await eslint.isPathIgnored(pattern)
        
        if (isIgnored) {
          this.reporter.pass(`Pattern '${pattern}' is correctly ignored`)
        } else {
          this.reporter.fail(`Pattern '${pattern}' should be ignored but isn't`)
        }
      } catch (error) {
        this.reporter.fail(`Testing ignore pattern '${pattern}'`, error)
      }
    }
  }
}
