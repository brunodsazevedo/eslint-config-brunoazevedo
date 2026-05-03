import { TestUtils } from '../utils/test-helpers.js'

export class JavaScriptRulesTest {
  constructor(reporter) {
    this.reporter = reporter
  }

  async run() {
    this.reporter.log('📐 Testing JavaScript recommended rules (ESLint 10)...')
    await this.runTestCases(testCases)
  }

  async runTestCases(testCases) {
    for (const testCase of testCases) {
      try {
        const result = await TestUtils.lintCode(testCase.code, testCase.filename)
        const hasErrors = result.errorCount > 0 || result.warningCount > 0

        if (testCase.shouldPass && !hasErrors) {
          this.reporter.pass(`JS Rules: ${testCase.name}`)
        } else if (!testCase.shouldPass && hasErrors) {
          this.reporter.pass(`JS Rules: ${testCase.name} (failed as expected)`)
        } else {
          const status = testCase.shouldPass ? 'should pass' : 'should fail'
          this.reporter.fail(`JS Rules: ${testCase.name} (${status})`)
        }
      } catch (error) {
        this.reporter.fail(`JS Rules: ${testCase.name}`, error)
      }
    }
  }
}

const testCases = [
  {
    name: 'no-unassigned-vars: variável sempre atribuída antes do uso (valid)',
    code: `export function fn() {
  let x
  if (Date.now() > 0) {
    x = 0
  } else {
    x = 1
  }
  return x
}
`,
    shouldPass: true,
    filename: 'test-unassigned-valid.js',
  },
  {
    name: 'no-unassigned-vars: variável declarada mas nunca atribuída (should fail)',
    code: `export function fn() {
  let counter
  return counter
}
`,
    shouldPass: false,
    filename: 'test-unassigned-invalid.js',
  },
  {
    name: 'no-useless-assignment: atribuição inicial lida antes de sobrescrita (valid)',
    code: `export function fn() {
  let x = 1
  const previous = x
  x = 2
  return x + previous
}
`,
    shouldPass: true,
    filename: 'test-useless-assign-valid.js',
  },
  {
    name: 'no-useless-assignment: atribuição sobrescrita sem ser lida (should fail)',
    code: `export function fn() {
  let x = 1
  x = 2
  return x
}
`,
    shouldPass: false,
    filename: 'test-useless-assign-invalid.js',
  },
  {
    name: 'preserve-caught-error: erro capturado reutilizado no relançamento (valid)',
    code: `export function fn() {
  try {
    JSON.parse('')
  } catch (e) {
    throw new Error('falhou', { cause: e })
  }
}
`,
    shouldPass: true,
    filename: 'test-caught-error-valid.js',
  },
  {
    name: 'preserve-caught-error: erro capturado ignorado ao relançar (should fail)',
    code: `export function fn() {
  try {
    JSON.parse('')
  } catch (e) {
    throw new Error('falhou')
  }
}
`,
    shouldPass: false,
    filename: 'test-caught-error-invalid.js',
  },
]
