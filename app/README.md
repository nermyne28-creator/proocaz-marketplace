# 🚀 OccaSync - Marketplace B2B d'Occasion

**Slogan :** "Achetez et vendez l'occasion pro. Simplement."

OccaSync est une plateforme B2B complète permettant aux professionnels d'acheter et de vendre du matériel d'occasion dans différents secteurs : informatique, logistique, BTP, industrie, mobilier, etc.

---

## ✨ Fonctionnalités

### 🔐 Authentification
- **Inscription/Connexion** : Système JWT sécurisé
- **Rôles utilisateurs** : Buyer (acheteur), Seller (vendeur), Admin
- **Vérification entreprise** : Support SIRET (optionnel)

### 📦 Gestion des Annonces
- **Création d'annonces** : Formulaire multi-étapes avec upload d'images (max 5)
- **Catégories** : Informatique, Logistique, BTP, Industrie, Mobilier, Autres
- **États** : Excellent, Bon, Correct
- **Recherche & Filtres** : Par catégorie, prix, état, localisation

### 💳 Transactions (Simulées)
- **Paiement sécurisé** : Interface de paiement Stripe (simulé pour MVP)
- **Statuts** : Pending → Paid → Shipped → Delivered
- **Factures** : Numéro de facture automatique (génération PDF à venir)

### 💬 Messagerie (À venir)
- Contact vendeur/acheteur
- Système de conversations

### 📊 Dashboard
- **Vendeurs** : Gestion des annonces, statistiques, vues
- **Acheteurs** : Historique d'achats, transactions
- **Statistiques** : Nombre d'annonces, transactions, messages, vues

### 👨‍💼 Panel Admin (À venir)
- Validation des comptes
- Modération des annonces
- Gestion des transactions

---

## 🎨 Design & UI/UX

### Charte Couleurs
- **Bleu minéral** (`#002E5D`) : Confiance, sérieux
- **Vert vibrant** (`#35C46A`) : Seconde main, durable
- **Gris clair** (`#F7F8F9`) : Sobriété
- **Noir** (`#1C1C1C`) : Textes

### Typographies
- **Titres** : Outfit (Google Fonts)
- **Textes** : Inter (Google Fonts)

### Responsive Design
- ✅ **Mobile-first** : Interface optimisée pour mobile
- ✅ **Tablet** : Layout adaptatif avec grilles
- ✅ **Desktop** : Sidebar dashboard, cartes larges

---

## 🛠️ Stack Technique

### Frontend
- **Next.js 14** (App Router)
- **React 18**
- **TailwindCSS** : Styling moderne
- **shadcn/ui** : Composants UI (Radix UI)
- **Lucide Icons** : Icônes
- **Sonner** : Toast notifications

### Backend
- **Next.js API Routes** : API REST complète
- **MongoDB** : Base de données NoSQL
- **JWT** : Authentification sécurisée
- **bcryptjs** : Hachage des mots de passe
 - **Rate limiting** : Limiteur en mémoire sur routes sensibles

### Autres
- **Upload local** : Stockage des images dans `/public/uploads/`
- **UUID** : Identifiants uniques

---

## 📁 Structure du Projet

```
/app/
├── app/
│   ├── api/[[...path]]/route.js   # API Backend (REST)
│   ├── page.js                     # Homepage
│   ├── layout.js                   # Layout principal
│   ├── globals.css                 # Styles globaux
│   ├── auth/
│   │   ├── login/page.js           # Page de connexion
│   │   └── register/page.js        # Page d'inscription
│   ├── dashboard/page.js           # Dashboard utilisateur
│   ├── search/page.js              # Recherche & filtres
│   ├── create-listing/page.js      # Création d'annonce
│   └── listing/[id]/page.js        # Détails d'une annonce
│   ├── entreprise/page.js          # Page Entreprise
│   ├── a-propos/page.js            # Page À propos
│   ├── contact/page.js             # Page Contact + API /api/contact
│   ├── blog/page.js                # Blog avec recherche/filtres
│   ├── blog/[slug]/page.js         # Articles de blog
│   ├── support/page.js             # Page Support
│   ├── aide/page.js                # Centre d'aide (+ recherche)
│   ├── legal/page.js               # Vue d'ensemble légal
│   ├── cgu/page.js                 # CGU
│   ├── confidentialite/page.js     # Politique de confidentialité
│   ├── mentions-legales/page.js    # Mentions légales
│   └── cookies/page.js             # Politique cookies
│
├── components/
│   ├── Header.jsx                  # Header responsive
│   ├── Footer.jsx                  # Footer
│   └── ui/                         # Composants shadcn/ui
│       ├── button.jsx
│       ├── card.jsx
│       ├── input.jsx
│       ├── badge.jsx
│       └── dialog.jsx
│
├── lib/
│   ├── db.js                       # Connexion MongoDB
│   ├── auth.js                     # Fonctions d'authentification
│   └── utils.js                    # Utilitaires (formatPrice, etc.)
│
├── public/uploads/                 # Images uploadées
├── .env                            # Variables d'environnement
└── package.json                    # Dépendances
```

---

## 🚀 Installation & Démarrage

### Prérequis
- Node.js 18+
- MongoDB (local ou distant)
- Yarn

### 1. Installation des dépendances

```bash
yarn install
```

### 2. Configuration

Variables d’environnement requises (exemples) :

```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=occasync
JWT_SECRET=change-me
CORS_ORIGINS=http://localhost:3000
NEXT_PUBLIC_BASE_URL=http://localhost:3000
# CLOUDINARY_CLOUD_NAME=xxx
# CLOUDINARY_API_KEY=xxx
# CLOUDINARY_API_SECRET=xxx
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Les fichiers `.env` sont ignorés par Git (voir `.gitignore`).
```

### 3. Démarrage

```bash
yarn dev
```

L'application sera disponible sur : **http://localhost:3000**

---

## 📡 API Endpoints

### Auth
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/auth/me` - Profil utilisateur

### Listings (Annonces)
- `GET /api/listings` - Liste des annonces (avec filtres)
- `POST /api/listings` - Créer une annonce (FormData avec images)
- `GET /api/listings/[id]` - Détails d'une annonce
- `PUT /api/listings/[id]` - Modifier une annonce
- `DELETE /api/listings/[id]` - Supprimer une annonce

### Transactions
- `GET /api/transactions` - Liste des transactions utilisateur
- `POST /api/transactions` - Créer une transaction (achat)
- `PUT /api/transactions/[id]/status` - Mettre à jour le statut

### Messages (À venir)
- `GET /api/messages` - Liste des messages
- `POST /api/messages` - Envoyer un message
- `GET /api/conversations` - Liste des conversations

### Admin (À venir)
- `GET /api/admin/users` - Liste des utilisateurs
- `POST /api/admin/verify-user` - Vérifier un utilisateur

---

## 🧪 Tests

### Créer un compte de test

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "company": "Test Company",
    "role": "seller"
  }'
```

### Créer une annonce de test

```bash
TOKEN="YOUR_JWT_TOKEN"

curl -X POST http://localhost:3000/api/listings \
  -H "Authorization: Bearer $TOKEN" \
  -F "title=Ordinateur portable" \
  -F "description=Excellent état" \
  -F "category=informatique" \
  -F "price=850" \
  -F "condition=excellent" \
  -F "location=Paris"
```

---

## 🔒 Sécurité

- ✅ **Mots de passe hachés** (bcryptjs)
- ✅ **JWT sécurisé** (expiration 7 jours, secret requis via env)
- ✅ **Validation des entrées** (schémas `zod` côté serveur)
- ✅ **Protection des routes** (Bearer + rôles whitelistes)
- ✅ **Rate limiting** (auth, listings, messages, transactions)
- ✅ **En‑têtes sécurité** (CSP, X‑Frame‑Options, CORS restreint)
- 🔜 **Cookies HttpOnly côté client** (serveur déjà prêt)
- 🔜 **HTTPS obligatoire** (production)

---

## 📈 Roadmap

### Phase 1 - MVP ✅
- [x] Authentification JWT
- [x] Gestion des annonces (CRUD)
- [x] Recherche & filtres
- [x] Dashboard utilisateur
- [x] Transactions simulées
- [x] Design responsive

### Phase 2 - Fonctionnalités avancées 🚧
- [ ] Messagerie temps réel (Socket.io)
- [ ] Génération de factures PDF
- [ ] Upload Cloudinary
- [ ] Panel admin complet
- [ ] Notifications email
- [ ] Système d'avis/notations

### Phase 3 - Intégrations 🔜
- [ ] Stripe Connect (paiements réels)
- [ ] API Sirene (vérification SIRET)
- [ ] Intégration logistique (Bring4You/Chronopost)
- [ ] Google Maps (localisation)
- [ ] Algolia (recherche avancée)

---

## 🎯 Cas d'Usage

### Pour un Vendeur
1. S'inscrire avec email + info entreprise
2. Créer une annonce avec photos
3. Recevoir des messages d'acheteurs
4. Gérer les transactions
5. Suivre les statistiques (vues, ventes)

### Pour un Acheteur
1. Parcourir les annonces
2. Filtrer par catégorie, prix, état
3. Contacter le vendeur
4. Acheter en 1 clic (paiement sécurisé)
5. Suivre ses achats

### Pour un Admin
1. Valider les comptes entreprises
2. Modérer les annonces
3. Gérer les litiges
4. Analyser les données (tableaux de bord)

---

## 🤝 Contributeurs

- **Développement** : AI Assistant (Emergent)
- **Design** : OccaSync Design System

---

## 📄 Licence

Tous droits réservés © 2024 OccaSync

---

## 🆘 Support

Pour toute question ou problème :
- 📧 Email : support@occasync.com
- 💬 Discord : [Rejoindre la communauté](#)
- 📖 Documentation : [docs.occasync.com](#)

---

**Fait avec ❤️ par l'équipe OccaSync**
## 🧭 Pages Institutionnelles

- Entreprise: vision, valeurs, engagements
- À propos: histoire et différenciation
- Contact: formulaire + API
- Blog: articles, recherche et filtres
- Support: parcours d’assistance
- Centre d’aide: catégories + recherche
- Légal: liens vers documents
- CGU, Confidentialité, Mentions légales, Cookies

## 📊 Analytics

- Support GA4 conditionnel au consentement cookies
- Définir `NEXT_PUBLIC_GA_ID` pour activer le chargement
