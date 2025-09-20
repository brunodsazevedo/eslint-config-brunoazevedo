# 🚀 GitHub Actions Workflow - Release & Publish

Este workflow automatiza o processo de CI/CD para o pacote `eslint-config-brunoazevedo`, incluindo testes, versionamento e publicação no npm.

## 📋 Funcionalidades

### 🔄 Triggers Automáticos
- **Push na `master`**: Gera release automaticamente (incremento patch)
- **Push na `develop`**: Gera pre-release beta automaticamente (incremento patch)

### 🎛️ Controle Manual
- **Workflow Dispatch**: Permite escolher o tipo de versionamento e branch

## 🏷️ Tipos de Versionamento

| Tipo | Exemplo | Uso |
|------|---------|-----|
| `patch` | 1.0.0 → 1.0.1 | Bug fixes, pequenas correções |
| `minor` | 1.0.0 → 1.1.0 | Novas features, melhorias |
| `major` | 1.0.0 → 2.0.0 | Breaking changes |

## 🌿 Branches e Versões

### Master Branch
- **Versões**: Release normal (ex: `1.0.1`)
- **npm tag**: `latest`
- **GitHub Release**: Release normal
- **Instalação**: `npm install -D eslint-config-brunoazevedo`

### Develop Branch
- **Versões**: Beta (ex: `1.0.1-beta.1`)
- **npm tag**: `beta`
- **GitHub Release**: Pre-release
- **Instalação**: `npm install -D eslint-config-brunoazevedo@beta`

## ⚙️ Configuração Necessária

### 1. Secrets do GitHub
Você precisa adicionar estes secrets no GitHub:

```
Settings > Secrets and variables > Actions > New repository secret
```

- **`NPM_TOKEN`**: Token de autenticação do npm
  - Vá em npmjs.com > Account > Access Tokens
  - Crie um token com permissão de "Automation"

### 2. Permissões do GITHUB_TOKEN
O workflow precisa das seguintes permissões:
- `contents: write` (para commits e tags)
- `issues: write` (para releases)

## 🚀 Como Usar

### 1. Release Automático (Push)

```bash
# Para release normal (master)
git checkout master
git merge develop
git push origin master
# → Gera versão 1.0.x automaticamente

# Para beta (develop)
git checkout develop
git commit -m "feat: nova funcionalidade"
git push origin develop
# → Gera versão 1.0.x-beta.y automaticamente
```

### 2. Release Manual (Workflow Dispatch)

1. Vá em **Actions** no GitHub
2. Selecione **"🚀 Release & Publish"**
3. Clique em **"Run workflow"**
4. Escolha:
   - **Branch**: `master` ou `develop`
   - **Version type**: `patch`, `minor`, ou `major`
5. Clique em **"Run workflow"**

## 📦 Exemplos de Versionamento

### Cenário 1: Bug Fix
```
Versão atual: 1.0.5
Tipo: patch
Branch: master
Nova versão: 1.0.6
```

### Cenário 2: Nova Feature
```
Versão atual: 1.0.5
Tipo: minor
Branch: master
Nova versão: 1.1.0
```

### Cenário 3: Breaking Change
```
Versão atual: 1.5.3
Tipo: major
Branch: master
Nova versão: 2.0.0
```

### Cenário 4: Feature Beta
```
Versão atual: 1.0.5
Tipo: minor
Branch: develop
Nova versão: 1.1.0-beta.1
```

## 🔍 Processo do Workflow

1. **CI (Continuous Integration)**:
   - ✅ Checkout do código
   - 📦 Instalação de dependências
   - 🧪 Execução de testes (`npm run validate`)

2. **CD (Continuous Deployment)**:
   - 🏷️ Bump da versão no `package.json`
   - 📝 Commit e push das alterações
   - 🏷️ Criação de tag Git
   - 📋 Geração de changelog
   - 🎉 Criação de GitHub Release
   - 📦 Publicação no npm

## 🛠️ Troubleshooting

### ❌ Erro: "npm publish failed"
- Verifique se o `NPM_TOKEN` está configurado corretamente
- Confirme se a versão não já existe no npm

### ❌ Erro: "Permission denied"
- Verifique as permissões do `GITHUB_TOKEN`
- Confirme se a branch está protegida

### ❌ Erro: "Tests failed"
- O workflow para se os testes falharem
- Verifique os logs do CI para identificar o problema

## 📈 Monitoramento

- **GitHub Actions**: Visualize o progresso em tempo real
- **GitHub Releases**: Acompanhe todas as versões
- **npm Package**: Verifique as publicações em npmjs.com

## 🎯 Próximos Passos

1. Adicione o `NPM_TOKEN` aos secrets
2. Teste com um push na `develop`
3. Verifique se a versão beta foi publicada
4. Teste um release manual via workflow dispatch