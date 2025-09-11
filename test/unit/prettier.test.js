import { TestUtils } from '../utils/test-helpers.js'

export class PrettierTest {
  constructor(reporter) {
    this.reporter = reporter
  }

  async run() {
    this.reporter.log('🎨 Testando integração com Prettier...')

    const testCases = [
      {
        name: 'Código bem formatado',
        code: `const obj = { name: 'test' }\nconsole.log(obj)\n`,
        shouldPass: true,
        filename: 'formatted.js',
      },
      {
        name: 'Código mal formatado (deve falhar)',
        code: `const   obj={name:"test"};console.log(obj)`,
        shouldPass: false,
        filename: 'bad-formatted.js',
      },
    ]

    await this.runTestCases(testCases)
  }

  async runTestCases(testCases) {
    for (const testCase of testCases) {
      try {
        const result = await TestUtils.lintCode(testCase.code, testCase.filename)
        // Para o Prettier, consideramos apenas erros, não warnings
        const hasErrors = result.errorCount > 0

        if (testCase.shouldPass && !hasErrors) {
          this.reporter.pass(`Prettier: ${testCase.name}`)
        } else if (!testCase.shouldPass && hasErrors) {
          this.reporter.pass(`Prettier: ${testCase.name} (falhou como esperado)`)
        } else {
          const status = testCase.shouldPass ? 'deveria passar' : 'deveria falhar'
          this.reporter.fail(`Prettier: ${testCase.name} (${status})`)
        }
      } catch (error) {
        this.reporter.fail(`Prettier: ${testCase.name}`, error)
      }
    }
  }
}
