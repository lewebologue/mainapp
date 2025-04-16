# Étape 1 : Construire l'application Angular
FROM node:22 AS build

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers du projet
COPY . .

# Remplacer le fichier environment.ts par celui situé dans /etc/secrets
COPY /etc/secrets/environment.ts ./src/environments/environment.ts

# Construire l'application Angular
RUN npm run build --prod

# Étape 2 : Exécuter l'application Angular
FROM node:22

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Copier les fichiers construits depuis l'étape précédente
COPY --from=build /usr/src/app/dist/app/browser /usr/src/app/dist

# Installer un serveur HTTP simple pour servir les fichiers Angular
RUN npm install -g http-server

# Exposer le port 8080
EXPOSE 8080

# Commande pour démarrer le serveur HTTP
CMD ["http-server", "dist", "-p", "8080"]