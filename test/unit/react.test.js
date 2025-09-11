import { TestUtils } from '../utils/test-helpers.js'

export class ReactTest {
  constructor(reporter) {
    this.reporter = reporter
  }

  async run() {
    this.reporter.log('⚛️  Testando regras do React...')

    const testCases = [
      {
        name: 'Componente React válido',
        code: `/* eslint-disable prettier/prettier */
import React from 'react'

interface Props {
  name: string
  age?: number
}

export const UserCard = ({ name, age }: Props) => {
  return (
    <div>
      <h1>{name}</h1>
      {age && <p>Idade: {age}</p>}
    </div>
  )
}`,
        shouldPass: true,
        filename: 'UserCard.tsx',
      },
      {
        name: 'Componente com tag não auto-fechada (deve falhar)',
        code: `export const BadComponent = () => {
  return <div><br></br></div>
}`,
        shouldPass: false,
        filename: 'BadComponent.tsx',
      },
      {
        name: 'Hook useEffect mal usado (deve falhar)',
        code: `import { useEffect, useState } from 'react'

export const BadHook = () => {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    setCount(count + 1)
  }, []) // Missing dependency
  
  return <div>{count}</div>
}`,
        shouldPass: false,
        filename: 'BadHook.tsx',
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
          this.reporter.pass(`React: ${testCase.name}`)
        } else if (!testCase.shouldPass && hasErrors) {
          this.reporter.pass(`React: ${testCase.name} (falhou como esperado)`)
        } else {
          const status = testCase.shouldPass ? 'deveria passar' : 'deveria falhar'
          this.reporter.fail(`React: ${testCase.name} (${status})`)
        }
      } catch (error) {
        this.reporter.fail(`React: ${testCase.name}`, error)
      }
    }
  }
}
