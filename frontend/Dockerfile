# Utiliser une image Node
FROM node:18

# Créer le dossier de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du projet
COPY . .

# Exposer le port utilisé par React
EXPOSE 3000

# Lancer l’application React
CMD ["npm", "start"]
