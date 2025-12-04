# 🎭 Comptes de Démonstration OccaSync

## Comptes Créés

### 👨‍💼 Vendeur (Seller)
- **Email** : test@example.com
- **Mot de passe** : password123
- **Entreprise** : Test Company SAS
- **SIRET** : 12345678900010
- **Rôle** : Seller
- **Annonces créées** : 4

### 👤 Acheteur (Buyer)
- **Email** : buyer@example.com
- **Mot de passe** : password123
- **Entreprise** : Buyer Corp
- **Rôle** : Buyer
- **Transactions** : 1 (achat simulé)

---

## 📦 Annonces de Test

### 1. Ordinateur portable Dell Latitude 5420
- **Catégorie** : Informatique & IT
- **Prix** : 850 €
- **État** : Excellent
- **Localisation** : Paris, France
- **Description** : Excellent état, i7 11e génération, 16GB RAM, 512GB SSD. Parfait pour le travail professionnel.

### 2. Chariot élévateur électrique Toyota
- **Catégorie** : Logistique
- **Prix** : 12 500 €
- **État** : Bon
- **Localisation** : Lyon, France
- **Description** : Chariot élévateur électrique, capacité 2 tonnes, hauteur de levage 4m. Révisé en 2024.

### 3. Bureau professionnel en L avec caisson
- **Catégorie** : Mobilier & Bureau
- **Prix** : 450 €
- **État** : Bon
- **Localisation** : Marseille, France
- **Description** : Grand bureau en L, structure métal et plateau bois. Dimensions 180x160cm. Très bon état.

### 4. Imprimante laser HP LaserJet Pro
- **Catégorie** : Informatique & IT
- **Prix** : 320 €
- **État** : Excellent
- **Localisation** : Toulouse, France
- **Description** : Imprimante réseau professionnelle, recto-verso automatique, peu utilisée.

---

## 🧪 Scénarios de Test

### Scénario 1 : Navigation visiteur
1. Accéder à la homepage : `http://localhost:3000`
2. Voir les catégories et annonces populaires
3. Cliquer sur "Rechercher" ou une catégorie
4. Filtrer les annonces par prix, état, localisation

### Scénario 2 : Inscription & Connexion
1. Cliquer sur "S'inscrire"
2. Remplir le formulaire (email, password, entreprise)
3. Se connecter automatiquement après inscription
4. Accéder au dashboard

### Scénario 3 : Création d'annonce (Vendeur)
1. Se connecter avec test@example.com
2. Aller dans Dashboard
3. Cliquer sur "Nouvelle annonce"
4. Remplir le formulaire avec images (optionnel)
5. Publier l'annonce
6. Voir l'annonce dans "Mes annonces"

### Scénario 4 : Achat simulé (Acheteur)
1. Se connecter avec buyer@example.com
2. Rechercher une annonce
3. Cliquer sur une annonce
4. Cliquer sur "Acheter maintenant"
5. Confirmer le paiement (simulé)
6. Voir la transaction dans le dashboard

### Scénario 5 : Gestion des annonces (Vendeur)
1. Se connecter avec test@example.com
2. Aller dans Dashboard
3. Voir les statistiques (annonces, vues, transactions)
4. Modifier ou supprimer une annonce

---

## 💡 Fonctionnalités Testées

### ✅ Authentification
- [x] Inscription avec email/password
- [x] Connexion JWT
- [x] Vérification du token
- [x] Déconnexion

### ✅ Annonces
- [x] Création d'annonce (avec/sans images)
- [x] Liste des annonces
- [x] Détails d'une annonce
- [x] Compteur de vues
- [x] Suppression d'annonce

### ✅ Recherche & Filtres
- [x] Recherche par mots-clés
- [x] Filtre par catégorie
- [x] Filtre par état
- [x] Filtre par prix (min/max)
- [x] Filtre par localisation

### ✅ Transactions
- [x] Création de transaction (achat)
- [x] Paiement simulé
- [x] Statuts de transaction
- [x] Historique des transactions

### ✅ Dashboard
- [x] Statistiques utilisateur
- [x] Mes annonces (vendeur)
- [x] Mes achats (acheteur)
- [x] Transactions récentes

### ✅ UI/UX
- [x] Design responsive (mobile, tablet, desktop)
- [x] Toast notifications
- [x] Loading states (skeleton)
- [x] Modal de paiement
- [x] Navigation fluide

---

## 🔜 À Tester (Prochaines Versions)

### Phase 2
- [ ] Messagerie entre vendeur/acheteur
- [ ] Génération de factures PDF
- [ ] Upload d'images vers Cloudinary
- [ ] Panel admin (validation comptes)
- [ ] Notifications email

### Phase 3
- [ ] Paiements réels (Stripe Connect)
- [ ] Vérification SIRET (API Sirene)
- [ ] Intégration logistique
- [ ] Google Maps
- [ ] Système d'avis/notations

---

## 📊 Données de Test

### Base de données MongoDB
- **Collection `users`** : 2 utilisateurs
- **Collection `listings`** : 4 annonces
- **Collection `transactions`** : 1 transaction

### Pour réinitialiser les données

```bash
# Se connecter à MongoDB
mongo mongodb://localhost:27017

# Utiliser la base occasync
use occasync

# Supprimer toutes les données
db.users.deleteMany({})
db.listings.deleteMany({})
db.transactions.deleteMany({})
db.messages.deleteMany({})
```

---

## 🎬 Démo Vidéo (À créer)

1. **Homepage** : Hero, catégories, annonces populaires
2. **Recherche** : Filtres avancés
3. **Détail annonce** : Images, description, achat
4. **Dashboard** : Statistiques, gestion annonces
5. **Paiement** : Modal simulé

---

**Profitez de la démo ! 🚀**
