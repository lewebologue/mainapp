# 🧪 Test Strategy - API Unit Tests

Ce document décrit la stratégie de tests unitaires mise en place pour l'API de l'application de pâtisserie.

## 📋 Vue d'ensemble

### Tests générés

- **112+ tests unitaires** couvrant tous les services critiques
- **Couverture de code élevée** avec mocks appropriés
- **Tests de sécurité** pour l'authentification
- **Tests d'erreurs** exhaustifs

### Services testés

| Service                | Tests    | Description                                 |
| ---------------------- | -------- | ------------------------------------------- |
| 🍰 **CakeService**     | 20 tests | CRUD complet, validation couleur par défaut |
| 👥 **CustomerService** | 19 tests | CRUD, champs optionnels, contraintes FK     |
| 📦 **OrderService**    | 21 tests | Relations complexes, méthodes de paiement   |
| 🗄️ **PrismaService**   | 26 tests | Connexion DB, transactions, requêtes brutes |
| 🔐 **AuthGuard**       | 26 tests | JWT, routes publiques, sécurité             |

## 🚀 GitHub Actions

### 1. Unit Tests (`.github/workflows/unit-tests.yml`)

**Déclenchement :** Push sur `main`, `develop` et PRs

- Tests sur Node.js 18.x et 20.x
- Couverture de code avec Codecov
- Tests spécifiques par service
- Artifacts de rapport de couverture

### 2. Quick Tests (`.github/workflows/quick-tests.yml`)

**Déclenchement :** Push sur branches de feature

- Tests rapides sans couverture
- Validation de base du code
- Feedback rapide pour les développeurs

### 3. Code Quality (`.github/workflows/code-quality.yml`)

**Déclenchement :** PRs et quotidien (2h UTC)

- TypeScript compilation
- ESLint et Prettier
- Seuils de couverture (80%)
- Audit de sécurité npm

### 4. Performance Tests (`.github/workflows/performance-tests.yml`)

**Déclenchement :** Manuel et hebdomadaire

- Tests de performance répétés
- Analyse de la mémoire
- Métriques de temps d'exécution

## 🧩 Architecture des tests

### Stratégie de Mock

```typescript
// Exemple de mock PrismaService
const mockPrismaService = {
  cake: {
    create: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findUnique: jest.fn(),
  },
};
```

### Pattern utilisé

1. **Arrange** : Préparation des mocks et données
2. **Act** : Exécution de la méthode testée
3. **Assert** : Vérification des résultats et appels

### Couverture

- ✅ **Cas normaux** : Flux fonctionnels standards
- ✅ **Cas d'erreur** : Gestion des exceptions
- ✅ **Cas limites** : Valeurs nulles, vides, invalides
- ✅ **Sécurité** : Tests d'authentification et autorisation

## 📊 Métriques

### Objectifs de qualité

- **Couverture de code** : > 80%
- **Temps d'exécution** : < 30 secondes pour tous les tests
- **Maintenance** : Tests lisibles et maintenables
- **Fiabilité** : Pas de tests flaky

### KPIs surveillés

- Nombre de tests qui passent
- Temps d'exécution des tests
- Couverture par service
- Détection d'erreurs de régression

## 🔧 Utilisation locale

### Exécuter tous les tests

```bash
cd api
npm test
```

### Tests avec couverture

```bash
npm test -- --coverage
```

### Test d'un service spécifique

```bash
npm test -- cake.service.spec.ts
npm test -- customer.service.spec.ts
npm test -- order.service.spec.ts
npm test -- prisma.service.spec.ts
npm test -- auth.guard.spec.ts
```

### Mode watch pour développement

```bash
npm test -- --watch
```

## 📝 Convention de nommage

### Structure des tests

```
describe('ServiceName', () => {
  describe('methodName', () => {
    it('should do something specific', () => {
      // Test implementation
    });
  });
});
```

### Nommage des mocks

- `mockPrismaService` : Mock du service Prisma
- `mockJwtService` : Mock du service JWT
- `mockReflector` : Mock du Reflector NestJS

## 🎯 Prochaines étapes

### Tests d'intégration

- Tests avec vraie base de données de test
- Tests de bout en bout des API
- Tests de performance avec charge

### Tests E2E

- Tests utilisateur complets
- Validation des workflows métier
- Tests de régression UI

### Monitoring

- Métriques de performance en continu
- Alertes sur les échecs de tests
- Dashboard de qualité de code

## 🤝 Contribution

### Ajouter des tests

1. Créer le fichier `.spec.ts` à côté du service
2. Suivre le pattern de mock établi
3. Ajouter le test à la GitHub Action si nécessaire
4. Vérifier la couverture de code

### Guidelines

- **Un test = une responsabilité**
- **Noms de tests descriptifs** en français
- **Mocks appropriés** pour éviter les dépendances externes
- **Tests rapides** (< 100ms par test)

---

_Dernière mise à jour : 6 août 2025_
_Tests générés pour la branche : `chore/setup-unit-tests-on-api`_
