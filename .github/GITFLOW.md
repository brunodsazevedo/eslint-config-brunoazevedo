# 🌊 Git Flow + CI/CD Guide

## 🎯 **Filosofia: Git Flow First**

O GitHub Actions **reage** aos comandos Git Flow, não os controla.

## 🚀 **Fluxo de Trabalho**

### **1. Desenvolvimento (Features)**
```bash
# Criar feature
git flow feature start minha-feature

# Desenvolver...
git add . && git commit -m "feat: nova funcionalidade"

# Finalizar feature
git flow feature finish minha-feature

# Push para develop
git push origin develop
# → Aciona CI/CD: Gera versão beta automaticamente
```

### **2. Release (Produção)**
```bash
# Criar release
git flow release start 1.2.0

# Ajustes finais, changelog, etc.
git add . && git commit -m "chore: prepare release 1.2.0"

# Finalizar release
git flow release finish 1.2.0

# Push tudo
git push origin main develop --tags
# → Aciona CI/CD: Publica versão 1.2.0 no npm
```

### **3. Hotfix (Correção Urgente)**
```bash
# Criar hotfix
git flow hotfix start 1.2.1

# Corrigir bug
git add . && git commit -m "fix: correção crítica"

# Finalizar hotfix
git flow hotfix finish 1.2.1

# Push tudo
git push origin main develop --tags
# → Aciona CI/CD: Publica versão 1.2.1 no npm
```

## 🤖 **O que o GitHub Actions faz automaticamente**

| Ação Git Flow | GitHub Actions Response |
|---------------|------------------------|
| `push develop` | ✅ Testes + 🧪 Beta release |
| `push main` | ✅ Testes + 🚀 Production release |
| `push tags` | ✅ Testes + 🚀 Production release |

## ⚙️ **Triggers Inteligentes**

- **Develop**: Auto-versiona betas (`1.2.0-beta.1`, `1.2.0-beta.2`...)
- **Main**: Usa versão do `package.json` (definida no release)
- **Tags**: Usa versão da tag

## 🎯 **Vantagens**

- ✅ **Git Flow Natural**: Use comandos normais
- ✅ **Automação Inteligente**: Actions apenas reagem
- ✅ **Versionamento Simples**: Beta automático, release manual
- ✅ **Zero Configuração**: Funciona out-of-the-box

## 🔧 **Setup**

1. Configure `NPM_TOKEN` no GitHub Secrets
2. Use Git Flow normalmente
3. GitHub Actions faz o resto!

---

**🎉 Agora o GitHub Actions trabalha PARA o Git Flow, não contra!**