import { TestUtils } from '../utils/test-helpers.js'

export class AccessibilityTest {
  constructor(reporter) {
    this.reporter = reporter
  }

  async run() {
    this.reporter.log('♿ Testando regras de acessibilidade...')

    const testCases = [
      {
        name: 'Imagem com alt text',
        code: `/* eslint-disable prettier/prettier */
export const GoodImage = () => {
  return <img src='photo.jpg' alt='Foto do usuário' />
}`,
        shouldPass: true,
        filename: 'good-image.tsx',
      },
      {
        name: 'Imagem sem alt text (deve dar warning)',
        code: `export const BadImage = () => {
  return <img src='photo.jpg' />
}`,
        shouldPass: false,
        filename: 'bad-image.tsx',
      },
      {
        name: 'Botão com aria-label',
        code: `/* eslint-disable prettier/prettier */
export const AccessibleButton = () => {
  return (
    <button aria-label='Fechar modal' onClick={() => {}}>
      ✕
    </button>
  )
}`,
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
          this.reporter.pass(`Acessibilidade: ${testCase.name}`)
        } else if (!testCase.shouldPass && hasErrors) {
          this.reporter.pass(`Acessibilidade: ${testCase.name} (falhou como esperado)`)
        } else {
          const status = testCase.shouldPass ? 'deveria passar' : 'deveria falhar'
          this.reporter.fail(`Acessibilidade: ${testCase.name} (${status})`)
        }
      } catch (error) {
        this.reporter.fail(`Acessibilidade: ${testCase.name}`, error)
      }
    }
  }
}
