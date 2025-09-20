import { TestUtils } from '../utils/test-helpers.js'

export class AccessibilityTest {
  constructor(reporter) {
    this.reporter = reporter
  }

  async run() {
    this.reporter.log('♿ Testing accessibility rules...')

    const testCases = [
      {
        name: 'Image with alt text',
        code: `/* eslint-disable prettier/prettier */
import React from 'react'
export const GoodImage = () => <img src="test.jpg" alt="Description" />`,
        shouldPass: true,
        filename: 'good-image.tsx',
      },
      {
        name: 'Image without alt text (should warn)',
        code: `/* eslint-disable prettier/prettier */
import React from 'react'
export const BadImage = () => <img src="test.jpg" />`,
        shouldPass: false,
        filename: 'bad-image.tsx',
      },
      {
        name: 'Button with aria-label',
        code: `/* eslint-disable prettier/prettier */
import React from 'react'
export const AccessibleButton = () => <button aria-label="Close">×</button>`,
        shouldPass: true,
        filename: 'accessible-button.tsx',
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
          this.reporter.pass(`Accessibility: ${testCase.name}`)
        } else if (!testCase.shouldPass && hasErrors) {
          this.reporter.pass(`Accessibility: ${testCase.name} (failed as expected)`)
        } else {
          const status = testCase.shouldPass ? 'should pass' : 'should fail'
          this.reporter.fail(`Accessibility: ${testCase.name} (${status})`)
        }
      } catch (error) {
        this.reporter.fail(`Accessibility: ${testCase.name}`, error)
      }
    }
  }
}
