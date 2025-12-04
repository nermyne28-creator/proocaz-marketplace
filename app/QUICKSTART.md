# 🚀 Guide de Démarrage Rapide - OccaSync

## ⚡ Démarrage en 3 étapes

### 1. L'application est déjà démarrée ! ✅

L'application tourne sur : **http://localhost:3000**

Accédez-y via votre navigateur.

---

## 🎯 Première Visite

### Page d'Accueil
- **Hero** avec barre de recherche
- **Catégories** cliquables (Informatique, Logistique, BTP, etc.)
- **Annonces populaires** (vide au départ)
- **Section "Pourquoi OccaSync"**

---

## 👤 Créer votre Premier Compte

### Option 1 : Via l'interface web
1. Cliquer sur **"S'inscrire"** dans le header
2. Remplir :
   - Email professionnel
   - Mot de passe
   - Nom de l'entreprise
   - SIRET (optionnel)
   - Je souhaite : Acheter / Vendre / Les deux
3. Cliquer sur **"Créer mon compte"**
4. Vous êtes automatiquement connecté !

### Option 2 : Via API (développeurs)

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "vendeur@entreprise.com",
    "password": "monmotdepasse",
    "company": "Ma Super Entreprise",
    "siret": "12345678900010",
    "role": "seller"
  }'
```

**Réponse :**
```json
{
  "message": "Compte créé avec succès",
  "token": "eyJhbGc...",
  "user": {
    "id": "...",
    "email": "vendeur@entreprise.com",
    "company": "Ma Super Entreprise",
    "role": "seller",
    "verified": false
  }
}
```

---

## 📦 Créer votre Première Annonce

### Via l'interface web (recommandé)

1. **Se connecter** avec votre compte
2. Cliquer sur **"Déposer une annonce"** dans le header
3. Remplir le formulaire :
   - **Titre** : Ex. "Ordinateur portable Dell i7"
   - **Description** : Détails du produit
   - **Catégorie** : Choisir parmi les 6 catégories
   - **État** : Excellent / Bon / Correct
   - **Prix HT** : En euros
   - **Localisation** : Ville, France
   - **Images** : Upload jusqu'à 5 images (optionnel)
4. Cliquer sur **"Publier l'annonce"**
5. Vous êtes redirigé vers la page de l'annonce

### Via API

```bash
TOKEN="votre_jwt_token"

curl -X POST http://localhost:3000/api/listings \
  -H "Authorization: Bearer $TOKEN" \
  -F "title=Ordinateur portable Dell Latitude" \
  -F "description=Excellent état, i7, 16GB RAM, 512GB SSD" \
  -F "category=informatique" \
  -F "price=850" \
  -F "condition=excellent" \
  -F "location=Paris, France"
```

---

## 🔍 Rechercher des Annonces

### Interface web
1. Utiliser la **barre de recherche** sur la homepage
2. Ou cliquer sur **"Rechercher"** dans le menu
3. Utiliser les **filtres** :
   - Catégorie
   - État
   - Prix (min/max)
   - Localisation
4. Cliquer sur une annonce pour voir les détails

### API
```bash
# Toutes les annonces
curl http://localhost:3000/api/listings

# Avec filtres
curl "http://localhost:3000/api/listings?category=informatique&minPrice=500&maxPrice=1000"
```

---

## 💳 Acheter un Article (Simulé)

1. **Trouver une annonce** intéressante
2. Cliquer sur **"Acheter maintenant"**
3. Une modal de paiement s'ouvre (simulé)
4. Cliquer sur **"Confirmer le paiement"**
5. La transaction est créée avec le statut "pending"
6. Après 2 secondes, le statut passe à "paid"
7. Vous êtes redirigé vers votre **Dashboard**

⚠️ **Note** : Les paiements sont SIMULÉS. Aucune transaction réelle n'est effectuée.

---

## 📊 Utiliser le Dashboard

### Accès
Cliquer sur **"Dashboard"** dans le menu (visible après connexion)

### Sections

#### Pour les Vendeurs
- **Statistiques** : Nombre d'annonces, vues, transactions
- **Mes annonces** : Liste avec actions (modifier, supprimer)
- **Transactions récentes** : Historique des ventes

#### Pour les Acheteurs
- **Statistiques** : Nombre d'achats
- **Transactions récentes** : Historique des achats avec statuts

---

## 🧪 Tester Rapidement

### Script de test automatique

Créez quelques annonces de test :

```bash
# Se connecter et récupérer le token
TOKEN=$(curl -s -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123","company":"Test Corp","role":"seller"}' \
  | jq -r '.token')

# Créer 3 annonces
curl -X POST http://localhost:3000/api/listings \
  -H "Authorization: Bearer $TOKEN" \
  -F "title=Laptop Dell i7" \
  -F "description=Excellent état" \
  -F "category=informatique" \
  -F "price=800" \
  -F "condition=excellent" \
  -F "location=Paris"

curl -X POST http://localhost:3000/api/listings \
  -H "Authorization: Bearer $TOKEN" \
  -F "title=Bureau professionnel" \
  -F "description=Grand bureau en L" \
  -F "category=mobilier" \
  -F "price=450" \
  -F "condition=good" \
  -F "location=Lyon"

curl -X POST http://localhost:3000/api/listings \
  -H "Authorization: Bearer $TOKEN" \
  -F "title=Chariot élévateur" \
  -F "description=Capacité 2 tonnes" \
  -F "category=logistique" \
  -F "price=12000" \
  -F "condition=good" \
  -F "location=Marseille"

echo "✅ 3 annonces créées !"
```

---

## 🎨 Personnalisation

### Modifier les couleurs

Éditez `/app/app/globals.css` :

```css
:root {
  --primary: 210 100% 18%;     /* Bleu #002E5D */
  --secondary: 145 59% 50%;     /* Vert #35C46A */
}
```

### Ajouter une catégorie

Éditez `/app/app/page.js` et ajoutez dans le tableau `categories` :

```javascript
{
  id: 'sante',
  name: 'Santé & Médical',
  icon: Heart,
  color: 'bg-red-100 text-red-700'
}
```

---

## 🐛 Résolution de Problèmes

### L'application ne démarre pas
```bash
# Vérifier les logs
tail -f /var/log/supervisor/nextjs.out.log

# Redémarrer
sudo supervisorctl restart nextjs
```

### MongoDB ne se connecte pas
```bash
# Vérifier MongoDB
sudo supervisorctl status mongodb

# Redémarrer MongoDB
sudo supervisorctl restart mongodb
```

### Erreur "JWT malformed"
- Vérifier que le token est valide
- Se reconnecter pour obtenir un nouveau token

### Les images ne s'affichent pas
- Vérifier que le dossier `/app/public/uploads/` existe
- Permissions : `chmod 755 /app/public/uploads/`

---

## 📚 Documentation Complète

- **README.md** : Documentation complète du projet
- **DEMO_ACCOUNTS.md** : Comptes et données de test
- **package.json** : Dépendances et scripts

---

## 🎯 Prochaines Étapes

1. ✅ Créer votre compte
2. ✅ Créer vos premières annonces
3. ✅ Tester la recherche et les filtres
4. ✅ Simuler un achat
5. 🔜 Ajouter la messagerie
6. 🔜 Intégrer Stripe (paiements réels)
7. 🔜 Ajouter un panel admin

---

## 💡 Astuces

### Réinitialiser les données
```bash
mongo mongodb://localhost:27017/occasync --eval "db.dropDatabase()"
```

### Voir toutes les annonces
```bash
curl http://localhost:3000/api/listings | jq
```

### Compter les utilisateurs
```bash
mongo mongodb://localhost:27017/occasync --eval "db.users.count()"
```

---

**Bon développement ! 🚀**

Pour toute question : consultez le README.md ou créez une issue.
