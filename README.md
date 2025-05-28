# Messagerie Sécurisée avec IAM et MFA

Ce projet est une messagerie sécurisée multi-plateforme avec gestion des identités et des accès (IAM) et authentification multifacteur (MFA). Il inclut une version web et une version desktop, avec un backend sécurisé, une base de données PostgreSQL, et un chiffrement de bout en bout des messages à l'aide de Libsodium.

## Technologies utilisées

- **Backend** : Node.js, NestJS
- **Frontend** : React.js (Web), Electron.js (Desktop)
- **Base de données** : PostgreSQL
- **Chiffrement** : Libsodium
- **Authentification** : Authentification multifacteur (MFA) via Google Authenticator
- **Conteneurisation** : Docker / Podman
- **Sécurisation du réseau** : OpenVPN

## Prérequis

- Node.js >= 18.x
- PostgreSQL >= 14.x
- Docker / Podman
- OpenVPN (pour sécuriser les connexions)

## Installation

### 1. Cloner le dépôt

Clonez le projet depuis GitHub :

```bash
git clone https://github.com/votre-utilisateur/messagerie-securisee.git
cd messagerie-securisee
