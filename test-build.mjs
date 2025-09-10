#!/usr/bin/env node

// Script de teste simples para verificar se a configuração pode ser importada
// Este script é executado durante o CI para validar a build

import config from './dist/index.js'
import { createReactConfig } from './dist/index.js'

console.log('🧪 Testando importação da configuração...')

// Teste 1: Configuração padrão
if (!config || !Array.isArray(config)) {
  console.error('❌ Erro: Configuração padrão inválida')
  process.exit(1)
}

console.log('✅ Configuração padrão importada com sucesso')

// Teste 2: Função de criação de configuração
if (typeof createReactConfig !== 'function') {
  console.error('❌ Erro: createReactConfig não é uma função')
  process.exit(1)
}

console.log('✅ createReactConfig importada com sucesso')

// Teste 3: Configuração customizada
try {
  const customConfig = createReactConfig({
    printWidth: 100,
    singleQuote: true
  })
  
  if (!customConfig || !Array.isArray(customConfig)) {
    console.error('❌ Erro: Configuração customizada inválida')
    process.exit(1)
  }
  
  console.log('✅ Configuração customizada criada com sucesso')
} catch (error) {
  console.error('❌ Erro ao criar configuração customizada:', error.message)
  process.exit(1)
}

console.log('🎉 Todos os testes passaram!')
console.log('📦 Pacote pronto para publicação')
