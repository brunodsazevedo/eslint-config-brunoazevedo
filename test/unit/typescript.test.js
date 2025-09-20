import { TestUtils } from '../utils/test-helpers.js'

export class TypeScriptTest {
  constructor(reporter) {
    this.reporter = reporter
  }

  async run() {
    this.reporter.log('🔷 Testing TypeScript rules...')

    const testCases = [
      {
        name: 'Valid TypeScript',
        code: `/* eslint-disable prettier/prettier */
interface User {
  name: string
  age: number
}

export const createUser = (data: User): User => {
  return { ...data }
}

export const user = createUser({ name: 'John', age: 30 })`,
        shouldPass: true,
        filename: 'valid-typescript.ts',
      },
      {
        name: 'Usage of any (should warn)',
        code: `export const badFunction = (param: any) => {
  return param
}`,
        shouldPass: false,
        filename: 'any-usage.ts',
      },
      {
        name: 'Unused variable (should fail)',
        code: `export const unusedVar = () => {
  const unused = 'never used'
  return 'hello'
}`,
        shouldPass: false,
        filename: 'unused-var.ts',
      },
    ]

    await this.runTestCases(testCases)
  }

  async runTestCases(testCases) {
    for (const testCase of testCases) {
      try {
        const result = await TestUtils.lintCode(testCase.code, testCase.filename)
        const hasErrors = result.errorCount > 0 || result.warningCount > 0

        if (testCase.shouldPass && !hasErrors) {
          this.reporter.pass(`TypeScript: ${testCase.name}`)
        } else if (!testCase.shouldPass && hasErrors) {
          this.reporter.pass(`TypeScript: ${testCase.name} (failed as expected)`)
        } else {
          const status = testCase.shouldPass ? 'should pass' : 'should fail'
          this.reporter.fail(`TypeScript: ${testCase.name} (${status})`)
        }
      } catch (error) {
        this.reporter.fail(`TypeScript: ${testCase.name}`, error)
      }
    }
  }
}
