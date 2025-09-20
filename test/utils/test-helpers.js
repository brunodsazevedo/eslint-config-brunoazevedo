import { ESLint } from 'eslint'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fs from 'fs/promises'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export class TestUtils {
  static async createESLintInstance() {
    const configPath = join(__dirname, '..', '..', 'index.js')
    const config = await import(configPath)
    
    return new ESLint({
      overrideConfigFile: true,
      overrideConfig: config.reactConfig,
    })
  }

  static async lintCode(code, filename = 'test.tsx') {
    const tempDir = join(__dirname, '..', 'temp')
    await fs.mkdir(tempDir, { recursive: true })
    
    const tempFile = join(tempDir, filename)
    await fs.writeFile(tempFile, code)
    
    const eslint = await this.createESLintInstance()
    const results = await eslint.lintFiles([tempFile])
    
    // Cleanup
    await fs.unlink(tempFile).catch(() => {})
    
    return results[0]
  }

  static async testIgnorePattern(pattern) {
    const eslint = await this.createESLintInstance()
    return await eslint.isPathIgnored(pattern)
  }
}

export class TestReporter {
  constructor() {
    this.passed = 0
    this.failed = 0
    this.errors = []
    this.verbose = process.argv.includes('--verbose')
  }

  pass(message) {
    this.passed++
    console.log(`✅ ${message}`)
  }

  fail(message, error = null) {
    this.failed++
    console.log(`❌ ${message}`)
    if (error && this.verbose) {
      console.log('  Detalhes:', error)
    }
    this.errors.push({ message, error })
  }

  log(message) {
    console.log(`\n${message}`)
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message)
    }
  }

  printResults() {
    console.log('\n' + '='.repeat(50))
    console.log('📊 TEST RESULTS')
    console.log('='.repeat(50))
    console.log(`✅ Passed: ${this.passed}`)
    console.log(`❌ Failed: ${this.failed}`)
    console.log(`📈 Total: ${this.passed + this.failed}`)
    
    if (this.failed > 0) {
      console.log('\n❌ FAILURES:')
      this.errors.forEach((error, index) => {
        console.log(`${index + 1}. ${error.message}`)
      })
    }
    
    const success = this.failed === 0
    console.log(`\n${success ? '🎉 ALL TESTS PASSED!' : '💥 SOME TESTS FAILED!'}`)
    
    return success
  }
}
