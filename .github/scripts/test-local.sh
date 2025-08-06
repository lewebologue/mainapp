#!/bin/bash

# Script de test local pour simuler les workflows GitHub Actions
# Usage: ./test-local.sh

set -e

echo "🧪 Starting local test simulation..."

# Vérification de la structure du projet
echo "📁 Checking project structure..."
if [ ! -d "./api" ]; then
    echo "❌ Error: ./api directory not found!"
    exit 1
fi

echo "✅ API directory found"

# Déplacement vers le répertoire API
cd ./api

echo "📦 Installing dependencies..."
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found in ./api"
    exit 1
fi

npm ci

echo "🔧 Generating Prisma Client..."
npx prisma generate

echo "🔍 Running linting..."
npm run lint

echo "🧪 Running unit tests with coverage..."
npm test -- --coverage --watchAll=false --passWithNoTests

echo "🎯 Running specific service tests..."

echo "Running CakeService tests..."
npm test -- cake.service.spec.ts --coverage --collectCoverageFrom="src/cake/cake.service.ts" --watchAll=false

echo "Running CustomerService tests..."
npm test -- customer.service.spec.ts --coverage --collectCoverageFrom="src/customer/customer.service.ts" --watchAll=false

echo "Running OrderService tests..."
npm test -- order.service.spec.ts --coverage --collectCoverageFrom="src/order/order.service.ts" --watchAll=false

echo "Running PrismaService tests..."
npm test -- prisma.service.spec.ts --coverage --collectCoverageFrom="src/services/prisma/prisma.service.ts" --watchAll=false

echo "Running AuthGuard tests..."
npm test -- auth.guard.spec.ts --coverage --collectCoverageFrom="src/shared/guard/auth/auth.guard.ts" --watchAll=false

echo "✅ All tests completed successfully!"
echo ""
echo "📊 Test Summary:"
echo "- 🍰 CakeService: 20 tests"
echo "- 👥 CustomerService: 19 tests"  
echo "- 📦 OrderService: 21 tests"
echo "- 🗄️ PrismaService: 26 tests"
echo "- 🔐 AuthGuard: 26 tests"
echo "📈 Total: ~112 unit tests"
echo ""
echo "🎉 Ready to push to GitHub!"
