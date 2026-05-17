# État du projet blueenergie.fr — 2026-05-17

> Snapshot consolidé pour reprise du pilotage en nouvelle session.
> Ce fichier est la **première lecture obligatoire** de tout nouveau superviseur (humain ou Claude).
> Maintenu à jour à chaque clôture de session.

---

## Identité du projet

| Élément | Valeur |
|---|---|
| Nom | Blue Energie — installation photovoltaïque Haute-Savoie |
| Domaine | https://blueenergie.fr |
| Hébergeur | Hostinger (mutualisé) |
| Stack | HTML / CSS / JS pur, pas de framework |
| Path local | `/Users/neillothian/Documents/Claude/Projects/blueenergie.fr` |
| Path bash sandbox | `/sessions/<session>/mnt/Projects--blueenergie.fr` |
| Repo Git | https://github.com/neillothian/blueenergie.fr.git (branche `main`) |
| Forme juridique | SAS Blue Energie, capital 18 000 €, SIRET 882 483 274 |
| Représentant | Neil Lothian, Président |
| RGE | ✅ QualiPV actif (numéro privé, logo intégré) |
| Décennale | ✅ Active |

---

## Avancement des sessions

✅ **Déployées sur https://blueenergie.fr** :
- Sessions 1+2+3 (correctifs HTML critiques, page `/merci.html`, carte OpenStreetMap)
- Session 6 (catalogue matériel JA Solar / Solplanet / K2 / Tigo + badge prix batterie « < 300 €/kWh »)
- Session Blog (hub `/blog/` + 2 articles : aides 2026, batteries virtuelles JPME)

⬜ **À faire en priorité** :
- Session 4 (mentions légales / CGV / RGPD) — débloquée
- Session 18 (bandeau confiance RGE + décennale) — débloquée
- Session 14 (JSON-LD Organization + sitemap.xml + robots.txt) — recommandé après blog
- Session 5 (bandeau cookies tarteaucitron) — autonome

Détail complet : `SESSIONS-CODE-A-VENIR.md` (bloc « État d'avancement » en haut du fichier).

---

## Documents de pilotage (à lire dans cet ordre)

| Fichier | Rôle |
|---|---|
| `README.md` | Présentation projet (stack, déploiement) |
| `ETAT-PROJET.md` | **Ce fichier** — snapshot état courant |
| `audit-blueenergie.md` | Audit initial du site (38 points identifiés) |
| `PLAN-REFONTE-SITE.md` | Plan stratégique en 8 chantiers P0/P1/P2 |
| `WIREFRAMES-PAGES.md` | Structure cible de chaque page (12 pages) |
| `SESSIONS-CODE-A-VENIR.md` | Découpage en sessions autonomes + statut |
| `QUESTIONS-OUVERTES.md` | Inconnues, blocages, décisions à prendre |
| `PROMPT-SESSION-1-2-3.md` | Prompt Claude Code Sessions 1+2+3 (passé) |
| `PROMPT-SESSION-6.md` | Prompt Claude Code Session 6 (passé) |
| `PROMPT-SESSION-BLOG.md` | Prompt Claude Code Session Blog (passé) |
| `PROMPT-PASSATION.md` | Prompt à coller dans une nouvelle session Cowork pour reprendre le pilotage |

---

## Workflow opérationnel

### Cycle de travail standard

1. **Superviseur (session Cowork)** : analyse l'état, décide de la prochaine session, rédige un prompt Claude Code blindé dans un fichier `PROMPT-SESSION-X.md` à la racine du repo
2. **Neil** : ouvre Claude Code dans le dossier, colle le prompt, laisse tourner
3. **Dev Claude Code** : git pull → travail → commit → git push (workflow intégré dans chaque prompt)
4. **Neil** : téléverse les fichiers modifiés sur Hostinger via hPanel, vide le cache
5. **Superviseur** : vérifie en live sur le site, met à jour `ETAT-PROJET.md` et `SESSIONS-CODE-A-VENIR.md`

### Drop zone utilisateur (`_dropzone/`)

Boîte de dépôt entrante. Neil y ajoute des assets (logos, photos, PDF). Claude les lit, les intègre dans `public_html/`, puis déplace l'original vers `_dropzone/corbeille/`. Voir `_dropzone/README.md` pour les règles complètes.

### Git workflow

- Branche : `main`
- Remote : `origin` → https://github.com/neillothian/blueenergie.fr.git
- Auth : token GitHub côté Neil (macOS Keychain)
- Convention commits : `[Session X|chore|docs]: description courte`
- Chaque prompt Claude Code intègre : `git pull` au début, `git commit + push` à la fin

### Déploiement Hostinger

- File Manager : hPanel → Tableau de bord blueenergie.fr → Gestionnaire de fichiers
- Le file browser ouvre directement sur le webroot (le « DO_NOT_UPLOAD_HERE » est trompeur, c'est bien le bon dossier)
- Penser à **vider le cache** après chaque upload (hPanel → Vider le cache)

---

## Coordonnées entreprise (pour mentions légales)

- **Raison sociale** : Blue Energie (SAS)
- **Capital** : 18 000 €
- **SIRET** : 882 483 274
- **Adresse** : 11 Chemin de Perouza, 74520 Savigny
- **Représentant** : Neil Lothian, Président
- **Téléphone** : 07 61 50 43 85
- **Email** : neil.lothian@blueenergie.fr
- **N° TVA intra** : à récupérer via VIES (https://ec.europa.eu/taxation_customs/vies/) avec SIREN `882483274`

---

## Backups locaux (filet de sécurité)

Dans `public_html/` :
- `index.html.backup-pre-session1`
- `index.html.backup-pre-session6`
- `index.html.backup-pre-blog`

Rollback : `cp index.html.backup-pre-XXX index.html` puis re-upload.
Ignorés par git (`.gitignore` : `*.backup-*`).

---

## Risques / vigilances

- **TVA intra non encore renseignée** : à faire avant Session 4
- **Argument commercial « batterie < 300 €/kWh »** : Neil a validé les chiffres (342 €/kWh à 5 kWh, 300 €/kWh dès 10 kWh). Mentionné sur le site avec mention « à partir de 10 kWh ». Si changement de tarif fournisseur, mettre à jour la carte matériel.
- **Email exposé `neil.lothian@`** : risque de spam, Neil a fait le choix de garder cet email pour l'instant.
- **Le repo ne contient pas le code des fiches techniques PDF** des fournisseurs (JA Solar, Solplanet) — à ajouter via dropzone si on veut les exposer publiquement.
- **Le dossier client REGHEM** (devis, fiche-client.md) **n'est PAS dans ce repo** (à juste titre — confidentiel). Il est à `/Users/neillothian/Library/CloudStorage/.../1 Clients /reghem 74/` (Google Drive). À consulter en lecture seule pour info matériel.
