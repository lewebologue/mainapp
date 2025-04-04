# Utiliser une image Node.js comme base
FROM node:22.14-alpine AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Générer les fichiers Prisma
COPY prisma ./prisma
RUN npx prisma generate

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application
RUN npm run build

# Étape finale pour exécuter l'application
FROM node:22.14-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier uniquement les fichiers nécessaires depuis l'étape précédente
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Exposer le port utilisé par l'application
EXPOSE 3000

# Définir la variable d'environnement pour Prisma
ENV DATABASE_URL=
ENV PROD_FRONT=

# Commande pour démarrer l'application
CMD ["node", "dist/main"]
