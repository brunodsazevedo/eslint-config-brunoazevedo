import { TestUtils } from '../utils/test-helpers.js'

export class PrettierTest {
  constructor(reporter) {
    this.reporter = reporter
  }

  async run() {
    this.reporter.log('🎨 Testing Prettier integration...')

    const testCases = [
      {
        name: 'Well formatted code',
        code: `const obj = { name: 'test' }\nconsole.log(obj)\n`,
        shouldPass: true,
        filename: 'formatted.js',
      },
      {
        name: 'Badly formatted code (should fail)',
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
        // For Prettier, consider only errors, not warnings
        const hasErrors = result.errorCount > 0

        if (testCase.shouldPass && !hasErrors) {
          this.reporter.pass(`Prettier: ${testCase.name}`)
        } else if (!testCase.shouldPass && hasErrors) {
          this.reporter.pass(`Prettier: ${testCase.name} (failed as expected)`)
        } else {
          const status = testCase.shouldPass ? 'should pass' : 'should fail'
          this.reporter.fail(`Prettier: ${testCase.name} (${status})`)
        }
      } catch (error) {
        this.reporter.fail(`Prettier: ${testCase.name}`, error)
      }
    }
  }
}
