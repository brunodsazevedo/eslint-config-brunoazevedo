# 🌊 Git Flow Integration Guide

Este documento explica como usar nosso workflow de CI/CD com Git Flow.

## 🔄 **Como Funciona com Git Flow**

### **Estrutura de Branches**

```mermaid
gitgraph
    commit id: "Initial"
    branch develop
    checkout develop
    commit id: "Feature A"
    commit id: "Feature B"
    
    branch release/1.1.0
    checkout release/1.1.0
    commit id: "Release prep"
    
    checkout master
    merge release/1.1.0
    commit id: "v1.1.0" tag: "v1.1.0"
    
    checkout develop
    merge master
    
    branch hotfix/1.1.1
    checkout hotfix/1.1.1
    commit id: "Critical fix"
    
    checkout master
    merge hotfix/1.1.1
    commit id: "v1.1.1" tag: "v1.1.1"
```

### **Triggers Automáticos**

| Branch/Action | Trigger | Versioning | Release Type |
|---------------|---------|------------|--------------|
| `develop` push | ✅ Automático | `patch` | Beta (`-beta.1`) |
| `master` push | ✅ Automático | `patch` | Release |
| `release/*` → `master` | ✅ Automático | `minor` | Release |
| `hotfix/*` → `master` | ✅ Automático | `patch` | Release |
| Manual trigger | ⚙️ Manual | Escolha | Escolha |

## 🚀 **Fluxo de Trabalho Recomendado**

### **1. Desenvolvimento Normal**
```bash
# Trabalhar em features
git checkout develop
git flow feature start nova-feature
# ... desenvolvimento ...
git flow feature finish nova-feature

# Push para develop → cria beta automaticamente
git push origin develop
# → Gera: 1.0.1-beta.1
```

### **2. Preparar Release**
```bash
# Criar branch de release
git flow release start 1.1.0

# Ajustes finais de release
git commit -m "docs: update changelog for 1.1.0"

# Finalizar release
git flow release finish 1.1.0
git push origin master
git push origin develop
git push --tags

# → Workflow detecta merge e gera: 1.1.0 (release)
```

### **3. Hotfix Urgente**
```bash
# Criar hotfix
git flow hotfix start 1.1.1

# Fazer correção
git commit -m "fix: critical security issue"

# Finalizar hotfix
git flow hotfix finish 1.1.1
git push origin master
git push origin develop
git push --tags

# → Workflow detecta merge e gera: 1.1.1 (patch)
```

### **4. Release Manual (Controle Total)**
```bash
# No GitHub Actions: Run Workflow
# Escolher:
# - Version Type: minor/major/patch
# - Branch: master/develop
```

## ⚙️ **Configuração Git Flow**

### **Inicializar Git Flow**
```bash
git flow init

# Configurações recomendadas:
# Branch name for production releases: master
# Branch name for "next release" development: develop
# Feature branches: feature/
# Release branches: release/
# Hotfix branches: hotfix/
# Support branches: support/
# Version tag prefix: v
```

### **Configurar Branch Protection**

No GitHub, proteja as branches principais:

**Branch `master`:**
- ✅ Require pull request reviews
- ✅ Require status checks (CI)
- ✅ Require branches to be up to date
- ✅ Include administrators

**Branch `develop`:**
- ✅ Require pull request reviews
- ✅ Require status checks (CI)

## 🔧 **Scripts Úteis**

### **package.json scripts:**
```json
{
  "scripts": {
    "release:start": "git flow release start",
    "release:finish": "git flow release finish",
    "hotfix:start": "git flow hotfix start",
    "hotfix:finish": "git flow hotfix finish",
    "feature:start": "git flow feature start",
    "feature:finish": "git flow feature finish"
  }
}
```

### **Aliases Git:**
```bash
git config --global alias.fs 'flow feature start'
git config --global alias.ff 'flow feature finish'
git config --global alias.rs 'flow release start'
git config --global alias.rf 'flow release finish'
```

## 🎯 **Vantagens desta Integração**

### **✅ Benefícios**
- 🚀 **Automação Total**: Sem versionamento manual
- 🔄 **Git Flow Padrão**: Mantém o fluxo conhecido
- 🧪 **Betas Automáticos**: Develop gera betas
- 🏷️ **Versionamento Inteligente**: Release = minor, Hotfix = patch
- 📦 **Publicação Automática**: npm publish automático

### **⚠️ Considerações**
- 📋 Requer disciplina nas conventions de commit
- 🔧 Setup inicial um pouco mais complexo
- 🎯 Branches de feature não acionam workflow (intencional)

## 🔍 **Troubleshooting**

### **Workflow não acionou após merge**
```bash
# Verificar se o merge foi feito corretamente
git log --oneline --graph -10

# Forçar trigger manual se necessário
# GitHub → Actions → Release & Publish → Run workflow
```

### **Versão incorreta gerada**
```bash
# Verificar último tag
git describe --tags --abbrev=0

# Corrigir manualmente se necessário
git tag -d v1.0.1
git push origin :refs/tags/v1.0.1
# Run workflow manual com versão correta
```

## 📚 **Links Úteis**

- 📖 [Git Flow Cheatsheet](https://danielkummer.github.io/git-flow-cheatsheet/)
- 🔧 [Git Flow AVH](https://github.com/petervanderdoes/gitflow-avh)
- 📋 [Conventional Commits](https://conventionalcommits.org/)
- 🚀 [Semantic Versioning](https://semver.org/)