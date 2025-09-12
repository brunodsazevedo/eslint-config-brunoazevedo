import { TestUtils, TestReporter } from '../utils/test-helpers.js'

export class ConfigurationTest {
  constructor(reporter) {
    this.reporter = reporter
  }

  async run() {
    this.reporter.log('📋 Testing configuration loading...')
    
    try {
      const eslint = await TestUtils.createESLintInstance()
      await eslint.calculateConfigForFile('test.tsx')
      
      this.reporter.pass('Configuration loads correctly')
    } catch (error) {
      this.reporter.fail('Failed to load configuration', error)
    }
  }
}
