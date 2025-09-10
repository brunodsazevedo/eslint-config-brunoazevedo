#!/bin/bash

# Script para fazer release do pacote
# Uso: ./release.sh [patch|minor|major|beta]

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Função para mostrar help
show_help() {
    echo "Uso: $0 [patch|minor|major|beta]"
    echo ""
    echo "Tipos de release:"
    echo "  patch - 1.0.0 -> 1.0.1 (bug fixes)"
    echo "  minor - 1.0.0 -> 1.1.0 (new features)"
    echo "  major - 1.0.0 -> 2.0.0 (breaking changes)"
    echo "  beta  - 1.0.0 -> 1.0.1-beta.0 (pre-release)"
    echo ""
    echo "Exemplo: $0 patch"
    exit 0
}

# Verificar parâmetro
if [ $# -eq 0 ] || [ "$1" = "-h" ] || [ "$1" = "--help" ]; then
    show_help
fi

RELEASE_TYPE=$1

# Validar tipo de release
if [[ ! "$RELEASE_TYPE" =~ ^(patch|minor|major|beta)$ ]]; then
    echo -e "${RED}❌ Tipo de release inválido: $RELEASE_TYPE${NC}"
    show_help
fi

echo -e "${YELLOW}🚀 Iniciando release $RELEASE_TYPE...${NC}"

# Verificar se está na branch main (exceto para beta)
if [ "$RELEASE_TYPE" != "beta" ]; then
    CURRENT_BRANCH=$(git branch --show-current)
    if [ "$CURRENT_BRANCH" != "main" ]; then
        echo -e "${RED}❌ Releases devem ser feitos na branch main. Branch atual: $CURRENT_BRANCH${NC}"
        exit 1
    fi
fi

# Verificar se há mudanças não commitadas
if [ -n "$(git status --porcelain)" ]; then
    echo -e "${RED}❌ Há mudanças não commitadas. Faça commit primeiro.${NC}"
    exit 1
fi

# Pull das últimas mudanças
echo -e "${YELLOW}📥 Fazendo pull das últimas mudanças...${NC}"
git pull origin $(git branch --show-current)

# Instalar dependências
echo -e "${YELLOW}📦 Instalando dependências...${NC}"
npm ci

# Executar testes
echo -e "${YELLOW}🧪 Executando testes...${NC}"
npm test

# Build
echo -e "${YELLOW}🔨 Fazendo build...${NC}"
npm run build

# Bump version
echo -e "${YELLOW}📝 Atualizando versão...${NC}"
if [ "$RELEASE_TYPE" = "beta" ]; then
    NEW_VERSION=$(npm version prerelease --preid=beta --no-git-tag-version)
else
    NEW_VERSION=$(npm version $RELEASE_TYPE --no-git-tag-version)
fi

echo -e "${GREEN}✅ Nova versão: $NEW_VERSION${NC}"

# Commit da versão
echo -e "${YELLOW}💾 Fazendo commit da nova versão...${NC}"
git add package.json
git commit -m "chore: release $NEW_VERSION"

# Criar tag
echo -e "${YELLOW}🏷️  Criando tag...${NC}"
git tag $NEW_VERSION

# Push
echo -e "${YELLOW}📤 Fazendo push...${NC}"
git push origin $(git branch --show-current)
git push origin $NEW_VERSION

echo -e "${GREEN}✅ Release $NEW_VERSION criado com sucesso!${NC}"
echo -e "${GREEN}🚀 O GitHub Action irá publicar automaticamente no NPM.${NC}"
echo ""
echo -e "${YELLOW}📋 Próximos passos:${NC}"
echo "1. Aguarde o GitHub Action finalizar"
echo "2. Verifique no NPM: https://www.npmjs.com/package/eslint-config-brunodsazevedo"
echo "3. Teste a instalação: npm install eslint-config-brunodsazevedo@$NEW_VERSION"
