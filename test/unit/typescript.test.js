import { TestUtils } from '../utils/test-helpers.js'

export class TypeScriptTest {
  constructor(reporter) {
    this.reporter = reporter
  }

  async run() {
    this.reporter.log('🔷 Testando regras do TypeScript...')

    const testCases = [
      {
        name: 'TypeScript válido',
        code: `/* eslint-disable prettier/prettier */
interface User {
  id: number
  name: string
  email?: string
}

export const createUser = (data: Omit<User, 'id'>): User => {
  return {
    id: Math.random(),
    ...data,
  }
}

export const users: User[] = []`,
        shouldPass: true,
        filename: 'user.ts',
      },
      {
        name: 'Uso de any (deve dar warning)',
        code: `export const processData = (data: any) => {
  return data.whatever
}`,
        shouldPass: false,
        filename: 'any-usage.ts',
      },
      {
        name: 'Variável não utilizada (deve falhar)',
        code: `export const calculate = () => {
  const unusedVariable = 'test'
  const result = 42
  return result
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
          this.reporter.pass(`TypeScript: ${testCase.name} (falhou como esperado)`)
        } else {
          const status = testCase.shouldPass ? 'deveria passar' : 'deveria falhar'
          this.reporter.fail(`TypeScript: ${testCase.name} (${status})`)
        }
      } catch (error) {
        this.reporter.fail(`TypeScript: ${testCase.name}`, error)
      }
    }
  }
}
