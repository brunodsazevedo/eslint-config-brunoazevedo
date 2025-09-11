import { TestReporter } from './utils/test-helpers.js'
import { ConfigurationTest } from './unit/configuration.test.js'
import { ReactTest } from './unit/react.test.js'
import { TypeScriptTest } from './unit/typescript.test.js'
import { PrettierTest } from './unit/prettier.test.js'
import { AccessibilityTest } from './unit/accessibility.test.js'
import { IgnorePatternsTest } from './unit/ignore-patterns.test.js'

class TestRunner {
  constructor() {
    this.reporter = new TestReporter()
  }

  async run() {
    console.log('🧪 Executando testes unitários da configuração ESLint...\n')

    try {
      const tests = [
        new ConfigurationTest(this.reporter),
        new ReactTest(this.reporter),
        new TypeScriptTest(this.reporter),
        new PrettierTest(this.reporter),
        new AccessibilityTest(this.reporter),
        new IgnorePatternsTest(this.reporter),
      ]

      for (const test of tests) {
        await test.run()
      }

      const success = this.reporter.printResults()
      process.exit(success ? 0 : 1)
    } catch (error) {
      console.error('❌ Erro crítico nos testes:', error)
      process.exit(1)
    }
  }
}

// Executa os testes
const runner = new TestRunner()
runner.run()
