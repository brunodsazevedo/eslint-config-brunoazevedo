import { TestUtils } from '../utils/test-helpers.js'

export class ReactTest {
  constructor(reporter) {
    this.reporter = reporter
  }

  async run() {
    this.reporter.log('⚛️  Testing React rules...')

    const testCases = [
      {
        name: 'Valid React component',
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
      {age && <p>Age: {age}</p>}
    </div>
  )
}`,
        shouldPass: true,
        filename: 'UserCard.tsx',
      },
      {
        name: 'Component with non-self-closing tag (should fail)',
        code: `export const BadComponent = () => {
  return <div></div>
}`,
        shouldPass: false,
        filename: 'BadComponent.tsx',
      },
      {
        name: 'Misused useEffect hook (should fail)',
        code: `import { useEffect, useState } from 'react'

export const BadHook = () => {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    console.log(count)
  }, []) // Missing count in dependency array
  
  return <div onClick={() => setCount(count + 1)}>Count: {count}</div>
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
          this.reporter.pass(`React: ${testCase.name} (failed as expected)`)
        } else {
          const status = testCase.shouldPass ? 'should pass' : 'should fail'
          this.reporter.fail(`React: ${testCase.name} (${status})`)
        }
      } catch (error) {
        this.reporter.fail(`React: ${testCase.name}`, error)
      }
    }
  }
}
