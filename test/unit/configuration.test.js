import { TestUtils, TestReporter } from '../utils/test-helpers.js'

export class ConfigurationTest {
  constructor(reporter) {
    this.reporter = reporter
  }

  async run() {
    this.reporter.log('📋 Testando carregamento da configuração...')
    
    try {
      const eslint = await TestUtils.createESLintInstance()
      await eslint.calculateConfigForFile('test.tsx')
      
      this.reporter.pass('Configuração carrega corretamente')
    } catch (error) {
      this.reporter.fail('Falha ao carregar configuração', error)
    }
  }
}
