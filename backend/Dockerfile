# backend/Dockerfile

FROM node:18

# Créer le dossier de travail
WORKDIR /usr/src/app

# Copier uniquement les fichiers nécessaires pour installer les dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du projet
COPY . .

# Construire le projet NestJS
RUN npm run start:dev

# Exposer le port
EXPOSE 3000

# Lancer l'app
CMD ["node", "dist/main"]
