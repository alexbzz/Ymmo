# 🏠 Ymmo — Plateforme Immobilière

> Projet académique Bachelor  Informatique — Application web immobilière complète avec API REST, base de données SQL et module IA.

---

## 📋 Présentation du projet

**Ymmo** est une plateforme immobilière fictive permettant :
- L'achat et la vente de biens immobiliers
- La gestion de comptes clients et agents immobiliers
- L'analyse de données immobilières
- Des prédictions IA (tendances, prix, zones populaires)

---

## 🧱 Stack technique

| Couche | Technologie |
|---|---|
| **Backend** | Node.js + Express.js |
| **Base de données** | PostgreSQL 18 |
| **ORM** | Prisma 7 |
| **Authentification** | JWT (jsonwebtoken) + bcrypt |
| **Validation** | Joi |
| **Service IA/Data** | Python + FastAPI |
| **Frontend** | React.js + Tailwind CSS |
| **DevOps** | Docker + Docker Compose |

---

## 🏗️ Architecture

Le projet suit une architecture **monolithe modulaire** :

```
ymmo/
├── BackEnd/          # API REST Node.js + Express
│   ├── prisma/       # Schéma et migrations BDD
│   └── src/
│       ├── modules/  # auth, users, properties, agents, transactions, favorites, analytics
│       └── shared/   # middlewares, config, utils
├── Frontend/         # React.js + Tailwind CSS
└── data_service/     # Python + FastAPI (IA & Analytics)
```

---

## 🚀 Installation et lancement

### Prérequis
- Node.js v22+
- PostgreSQL 18
- Python 3.10+

### Backend

```bash
# Cloner le projet
git clone https://github.com/ton-username/ymmo.git
cd ymmo/BackEnd

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Remplir les valeurs dans .env

# Créer la base de données
psql -U postgres -c "CREATE DATABASE ymmo_db;"

# Lancer les migrations
npx prisma migrate dev --name init

# Démarrer le serveur
npm run dev
```

Le serveur démarre sur `http://localhost:3000`

---

## 🔌 API Endpoints

### Authentification
| Méthode | Route | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Créer un compte | ❌ |
| POST | `/api/auth/login` | Se connecter | ❌ |

### Biens immobiliers
| Méthode | Route | Description | Auth |
|---|---|---|---|
| GET | `/api/properties` | Liste des biens (filtres) | ❌ |
| GET | `/api/properties/:id` | Détail d'un bien | ❌ |
| POST | `/api/properties` | Créer un bien | AGENT |
| PUT | `/api/properties/:id` | Modifier un bien | AGENT |
| DELETE | `/api/properties/:id` | Supprimer un bien | AGENT |

### Transactions
| Méthode | Route | Description | Auth |
|---|---|---|---|
| POST | `/api/transactions` | Faire une offre | CLIENT |
| GET | `/api/transactions/me` | Mes transactions | CLIENT |
| PATCH | `/api/transactions/:id` | Changer le statut | AGENT |

### Favoris
| Méthode | Route | Description | Auth |
|---|---|---|---|
| POST | `/api/favorites/:propertyId` | Ajouter aux favoris | CLIENT |
| DELETE | `/api/favorites/:propertyId` | Retirer des favoris | CLIENT |
| GET | `/api/favorites` | Mes favoris | CLIENT |

### Analytics / IA
| Méthode | Route | Description | Auth |
|---|---|---|---|
| GET | `/api/analytics/predict-price` | Prédiction de prix | ❌ |
| GET | `/api/analytics/trends` | Tendances par zone | ❌ |
| GET | `/api/analytics/popular` | Biens populaires | ❌ |

---

## 🗃️ Modèle de données

```
User ──────── Agent ──────── Property ──── Photo
  │                              │
  ├── Transaction ───────────────┘
  │
  └── Favorite ─────────────────┘
```

**Entités principales :**
- `User` — CLIENT, AGENT ou ADMIN
- `Agent` — profil étendu d'un User avec numéro de licence
- `Property` — bien immobilier (APARTMENT, HOUSE, LAND, COMMERCIAL)
- `Transaction` — offre d'achat (PENDING → ACCEPTED → COMPLETED)
- `Favorite` — biens sauvegardés par un utilisateur
- `Photo` — photos associées à un bien

---

## 🔐 Sécurité

- **JWT** — authentification stateless, token valable 7 jours
- **bcrypt** — hash des mots de passe (salt rounds = 12)
- **Helmet** — sécurisation des headers HTTP
- **CORS** — restreint aux origines autorisées
- **Rate limiting** — 100 requêtes / 15 minutes
- **Joi** — validation stricte des données entrantes
- **RBAC** — contrôle d'accès basé sur les rôles (CLIENT / AGENT / ADMIN)

---

## 🧪 Tests API

Utiliser **Postman** pour tester les routes.

Exemple — Register :
```http
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "firstName": "Tahiry",
  "lastName": "Test",
  "email": "tahiry@ymmo.fr",
  "password": "123456",
  "role": "CLIENT"
}
```

Exemple — Login :
```http
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "tahiry@ymmo.fr",
  "password": "123456"
}
```

---

## 📊 Service IA / Data (Python)

```bash
cd data_service
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Fonctionnalités :
- Prédiction de prix par régression linéaire
- Clustering de zones géographiques (K-Means)
- Analyse des tendances du marché

---

## 👥 Rôles et permissions

| Action | CLIENT | AGENT | ADMIN |
|---|---|---|---|
| Consulter les biens | ✅ | ✅ | ✅ |
| Publier un bien | ❌ | ✅ | ✅ |
| Faire une offre | ✅ | ❌ | ✅ |
| Gérer les transactions | ❌ | ✅ | ✅ |
| Gérer les utilisateurs | ❌ | ❌ | ✅ |

---

## 📁 Variables d'environnement

Copier `.env.example` en `.env` et remplir :

```env
PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/ymmo_db
JWT_SECRET=votre_secret_jwt
JWT_EXPIRES_IN=7d
PYTHON_SERVICE_URL=http://localhost:8000
```

---

## 🎓 Contexte académique

Projet réalisé dans le cadre du **Bachelor 2 Informatique**.

**Contraintes respectées :**
- ✅ Architecture orientée services (monolithe modulaire)
- ✅ Base de données SQL (PostgreSQL)
- ✅ API REST
- ✅ Analyse de données Python
- ✅ Principes SOLID, DRY, KISS
- ✅ Code structuré, maintenable et scalable
