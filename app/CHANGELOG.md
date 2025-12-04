# Changements

## 2025-12-01
- Sécurité: CSP durcie, CORS restreint, X-Frame-Options SAMEORIGIN.
- Auth: JWT_SECRET requis, expiration 7j, cookie HttpOnly émis à l’inscription/connexion.
- Rôles: liste blanche (`buyer|seller|both`), interdiction admin à l’inscription.
- Validation: schémas `zod` pour register/login/listing/update/message/transaction.
- Uploads: vérification MIME/poids, création sécurisée du dossier `public/uploads`.
- DB: indexes (unicité email/id, listings, messages, transactions).
- Rate limiting: limiteur en mémoire sur routes sensibles.
- Dashboard: correction filtrage dépendant de l’utilisateur.
- SEO: metadata globales OpenGraph/Twitter, `robots.txt`, `sitemap.xml`.
- Navigation: recherche via `router.push` (SPA) au lieu de rechargement.
