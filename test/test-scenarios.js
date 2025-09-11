import { ESLint } from 'eslint'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fs from 'fs/promises'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

class ScenarioTester {
  constructor() {
    this.verbose = process.argv.includes('--verbose')
    this.scenarios = []
  }

  async run() {
    console.log('🎭 Testando cenários reais de projetos...\n')

    await this.createScenarios()

    for (const scenario of this.scenarios) {
      await this.testScenario(scenario)
    }

    this.printSummary()
  }

  async createScenarios() {
    // Cenário 1: Next.js App
    this.scenarios.push({
      name: 'Next.js App Router',
      files: {
        'app/page.tsx': `
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface User {
  id: number
  name: string
  email: string
}

export default function HomePage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users')
        const userData = await response.json()
        setUsers(userData)
      } catch (error) {
        console.error('Erro ao buscar usuários:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) {
    return <div aria-live="polite">Carregando...</div>
  }

  return (
    <main>
      <h1>Usuários</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link href={\`/users/\${user.id}\`}>
              {user.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
`,
        'app/layout.tsx': `
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Minha App',
  description: 'Descrição da aplicação',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
`,
        'components/UserCard.tsx': `
interface UserCardProps {
  user: {
    id: number
    name: string
    email: string
    avatar?: string
  }
  onEdit: (id: number) => void
  onDelete: (id: number) => void
}

export const UserCard = ({ user, onEdit, onDelete }: UserCardProps) => {
  const handleEdit = () => onEdit(user.id)
  const handleDelete = () => onDelete(user.id)

  return (
    <div className="user-card">
      {user.avatar ? (
        <img 
          src={user.avatar} 
          alt={\`Avatar de \${user.name}\`}
          width={50}
          height={50}
        />
      ) : (
        <div className="avatar-placeholder" />
      )}
      
      <div>
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </div>
      
      <div>
        <button 
          onClick={handleEdit}
          aria-label={\`Editar \${user.name}\`}
        >
          Editar
        </button>
        <button 
          onClick={handleDelete}
          aria-label={\`Excluir \${user.name}\`}
        >
          Excluir
        </button>
      </div>
    </div>
  )
}
`,
      },
    })

    // Cenário 2: React SPA com hooks customizados
    this.scenarios.push({
      name: 'React SPA com Custom Hooks',
      files: {
        'src/hooks/useApi.ts': `
import { useState, useEffect, useCallback } from 'react'

interface ApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

type ApiOptions = {
  immediate?: boolean
}

export const useApi = <T>(
  url: string, 
  options: ApiOptions = { immediate: true }
): ApiState<T> & { refetch: () => Promise<void> } => {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const fetchData = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`)
      }
      
      const data = await response.json()
      setState({ data, loading: false, error: null })
    } catch (error) {
      setState({ 
        data: null, 
        loading: false, 
        error: error instanceof Error ? error.message : 'Erro desconhecido' 
      })
    }
  }, [url])

  useEffect(() => {
    if (options.immediate) {
      fetchData()
    }
  }, [fetchData, options.immediate])

  return {
    ...state,
    refetch: fetchData,
  }
}
`,
        'src/components/ProductList.tsx': `
import { useApi } from '../hooks/useApi'

interface Product {
  id: number
  name: string
  price: number
  description: string
  image?: string
}

export const ProductList = () => {
  const { data: products, loading, error, refetch } = useApi<Product[]>('/api/products')

  if (loading) {
    return (
      <div role="status" aria-live="polite">
        <span className="sr-only">Carregando produtos...</span>
        <div className="spinner" />
      </div>
    )
  }

  if (error) {
    return (
      <div role="alert" className="error">
        <h2>Erro ao carregar produtos</h2>
        <p>{error}</p>
        <button onClick={refetch}>Tentar novamente</button>
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <div className="empty-state">
        <h2>Nenhum produto encontrado</h2>
        <p>Não há produtos disponíveis no momento.</p>
      </div>
    )
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <article key={product.id} className="product-card">
          {product.image && (
            <img 
              src={product.image} 
              alt={product.name}
              loading="lazy"
            />
          )}
          <div className="product-info">
            <h3>{product.name}</h3>
            <p className="description">{product.description}</p>
            <p className="price">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(product.price)}
            </p>
          </div>
        </article>
      ))}
    </div>
  )
}
`,
      },
    })

    // Cenário 3: Componentes com problemas (devem falhar)
    this.scenarios.push({
      name: 'Componentes com Problemas (Devem Falhar)',
      files: {
        'bad-examples/ProblematicComponent.tsx': `
import React, { useState, useEffect } from 'react'

// Múltiplos problemas intencionais
export const ProblematicComponent = ({ data }: any) => {
  const [count, setCount] = useState(0)
  const unused = 'variável não utilizada'
  
  // Hook com dependência faltando
  useEffect(() => {
    setCount(data.length)
  }, [])
  
  // Imagem sem alt
  const BadImage = () => <img src="test.jpg" />
  
  // Botão sem acessibilidade
  const BadButton = () => <div onClick={() => alert('clicado')}>Clique aqui</div>
  
  // Código mal formatado
  const badFormatted={a:1,b:2,c:function(){return"test"}}
  
  return(<div><BadImage/><BadButton/><span>{count}</span></div>)
}
`,
        'bad-examples/TypeScriptProblems.ts': `
// Problemas de TypeScript
export const problematicFunction = (param: any) => {
  var oldStyleVar = 'use let/const instead'
  let unusedVariable = 'not used'
  
  // Non-null assertion sem necessidade
  const result = param!.someProperty
  
  // Console em produção
  console.log('debug info')
  
  return result
}

// Interface mal definida
interface BadInterface {
  [key: string]: any
}

// Função sem tipo de retorno explícito quando necessário
export function complexFunction(data: BadInterface) {
  if (data) {
    return data.whatever.deeply.nested.property
  }
}
`,
      },
    })
  }

  async testScenario(scenario) {
    console.log(`\n🎬 Testando cenário: ${scenario.name}`)
    console.log('─'.repeat(50))

    let totalErrors = 0
    let totalWarnings = 0
    let filesTested = 0

    try {
      const configPath = join(__dirname, '..', 'index.js')
      const config = await import(configPath)

      const eslint = new ESLint({
        overrideConfigFile: true,
        overrideConfig: config.default,
      })

      for (const [filename, code] of Object.entries(scenario.files)) {
        const tempDir = join(
          __dirname,
          'fixtures',
          'scenarios',
          scenario.name.replace(/\s+/g, '-'),
        )
        await fs.mkdir(tempDir, { recursive: true })

        const tempFile = join(tempDir, filename)
        await fs.mkdir(dirname(tempFile), { recursive: true })
        await fs.writeFile(tempFile, code)

        const results = await eslint.lintFiles([tempFile])
        const result = results[0]

        filesTested++
        totalErrors += result.errorCount
        totalWarnings += result.warningCount

        const status =
          result.errorCount === 0 && result.warningCount === 0
            ? '✅'
            : result.errorCount > 0
              ? '❌'
              : '⚠️'

        console.log(
          `${status} ${filename}: ${result.errorCount} erros, ${result.warningCount} warnings`,
        )

        if (this.verbose && result.messages.length > 0) {
          result.messages.forEach((msg) => {
            console.log(
              `   ${msg.severity === 2 ? 'ERROR' : 'WARN'}: ${msg.message} (${msg.ruleId})`,
            )
          })
        }

        // Limpa arquivo temporário
        await fs.unlink(tempFile).catch(() => {})
      }

      // Valida expectativas do cenário
      this.validateScenarioExpectations(
        scenario.name,
        totalErrors,
        totalWarnings,
      )
    } catch (error) {
      console.log(`❌ Erro ao testar cenário: ${error.message}`)
    }

    console.log(
      `\n📊 Resumo: ${filesTested} arquivos, ${totalErrors} erros, ${totalWarnings} warnings`,
    )
  }

  validateScenarioExpectations(scenarioName, errors, warnings) {
    if (scenarioName.includes('Problemas')) {
      if (errors > 0) {
        console.log('✅ Cenário de problemas detectou erros como esperado')
      } else {
        console.log('❌ Cenário de problemas deveria ter detectado erros')
      }
    } else {
      if (errors === 0) {
        console.log('✅ Cenário válido passou sem erros')
      } else {
        console.log('⚠️  Cenário válido teve erros - revisar configuração')
      }
    }
  }

  printSummary() {
    console.log(`\n${'='.repeat(60)}`)
    console.log('🎭 RESUMO DOS CENÁRIOS TESTADOS')
    console.log('='.repeat(60))
    console.log(`Total de cenários: ${this.scenarios.length}`)
    console.log('\nOs cenários testaram:')
    console.log('• ⚛️  Componentes React modernos')
    console.log('• 🪝 Custom Hooks')
    console.log('• 🔷 TypeScript rigoroso')
    console.log('• ♿ Acessibilidade')
    console.log('• 🎨 Formatação Prettier')
    console.log('• 🚫 Detecção de problemas')
    console.log('\n✨ Cenários de teste concluídos!')
  }
}

// Executa os testes de cenário
const tester = new ScenarioTester()
tester.run()
