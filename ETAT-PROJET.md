# État du projet blueenergie.fr — 2026-05-17 (clôture session pilotage)

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

✅ **Déployées sur https://blueenergie.fr** (9 sessions) :
- Sessions 1+2+3 (correctifs HTML critiques, page `/merci.html`, carte OpenStreetMap)
- Session 6 (catalogue matériel JA Solar / Solplanet / K2 / Tigo + badge prix batterie « < 300 €/kWh »)
- Session Blog (hub `/blog/` + 2 articles : aides 2026, batteries virtuelles JPME)
- Session 4 (mentions légales + CGV + politique de confidentialité + liens footer sur 5 pages) — vérifié live 2026-05-17
- Session 5 (bandeau cookies tarteaucitron v1.18.x + GA4 conditionnel + lien « Gérer mes cookies » footer) — vérifié live 2026-05-17 (highPrivacy + DenyAllCta actifs)
- Session 9 (favicon multi-format + site.webmanifest + og-image + Open Graph + Twitter Card + meta description accueil) — déployée 2026-05-17

⚠️ **À reprendre** :
- Session 18 (bandeau confiance RGE) — code déployé techniquement, rendu visuel KO. À diagnostiquer + correctif ciblé.

⏳ **Prompt prêt à lancer** :
- Session 14 (JSON-LD LocalBusiness + sitemap.xml + robots.txt) — `PROMPT-SESSION-14.md`

⬜ **Restantes / prioritaires après Session 14** :
- Session 7 (finition galerie réalisations : `loading="lazy"`, renommage assets Mylight → libellés génériques)
- Session 17 (avis Google dynamiques) — Place ID `ChIJHUKhFuCfDykRkkLTeN-wm3c` confirmé, clé API Places à fournir
- Session 10 (formulaire + reCAPTCHA v3) — clés reCAPTCHA à fournir
- Sessions 11, 12, 13, 15, 16, 22 (cf. dépendances dans `SESSIONS-CODE-A-VENIR.md`)
- **Mini-session manuelle** : compression des 5 images > 250 KB via https://squoosh.app (détaillée dans `PROMPT-SESSION-9.md` § Notes hors prompt)

Détail complet : `SESSIONS-CODE-A-VENIR.md` (bloc « État d'avancement » en haut du fichier).

---

## Documents de pilotage (à lire dans cet ordre)

| Fichier | Rôle |
|---|---|
| `README.md` | Présentation projet (stack, déploiement) |
| `ETAT-PROJET.md` | **Ce fichier** — snapshot état courant |
| `QUESTIONS-OUVERTES.md` | **Cahier de décisions** — Q1→Q20 résolues, constantes entreprise, décisions par session |
| `ACTIONS-NEIL.md` | Modes d'emploi pas-à-pas des actions externes Neil (logos Q8, reCAPTCHA Q9, Places API Q10) |
| `SESSIONS-CODE-A-VENIR.md` | Découpage en sessions autonomes + tableau « État d'avancement » |
| `CHECKLIST-POST-DEPLOI.md` | Procédure de vérification post-upload Hostinger (Chrome MCP) |
| `TEMPLATE-PROMPT-SESSION.md` | Template de référence pour rédiger un nouveau `PROMPT-SESSION-X.md` |
| `PROMPT-PASSATION.md` | Prompt à coller dans une nouvelle session Claude Code pour reprendre le pilotage |
| `audit-blueenergie.md` | Audit initial du site (38 points identifiés) |
| `PLAN-REFONTE-SITE.md` | Plan stratégique en 8 chantiers P0/P1/P2 |
| `WIREFRAMES-PAGES.md` | Structure cible de chaque page (12 pages) |
| `PROMPT-SESSION-*.md` | Prompts Claude Code archivés (1-2-3, 4, 5, 6, BLOG, 9, 14, 18) |
| `note et idees site web - brouillon` | **Brouillon perso Neil** — remarques générales / idées vrac. Gitignoré, hors versionnement, à consulter au besoin. |

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
- **N° TVA intra** : ✅ `FR25882483274` (à vérifier sur VIES https://ec.europa.eu/taxation_customs/vies/ avant impression / engagement écrit)
- **Place ID Google Business** : ✅ `ChIJHUKhFuCfDykRkkLTeN-wm3c`

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

- **Session 18 (bandeau confiance) — rendu KO** : code en prod mais bug visuel à diagnostiquer. Capture d'écran + description précise du problème côté Neil → on prépare un `PROMPT-SESSION-18-FIX` ciblé.
- **Argument commercial « batterie < 300 €/kWh »** : Neil a validé les chiffres (342 €/kWh à 5 kWh, 300 €/kWh dès 10 kWh). Mentionné sur le site avec mention « à partir de 10 kWh ». Si changement de tarif fournisseur, mettre à jour la carte matériel.
- **Email exposé `neil.lothian@`** : risque de spam, Neil a fait le choix de garder cet email pour l'instant.
- **Filtrage avis Google négatifs (Session 17)** : risque juridique gris (L.121-1 Code de la consommation). Garde-fous documentés dans `QUESTIONS-OUVERTES.md` § Annexe risque Q16. À basculer en « tout afficher » dès qu'un avis négatif arrive.
- **Le repo ne contient pas le code des fiches techniques PDF** des fournisseurs (JA Solar, Solplanet) — à ajouter via dropzone si on veut les exposer publiquement.
- **Le dossier client REGHEM** (devis, fiche-client.md) **n'est PAS dans ce repo** (à juste titre — confidentiel). Il est à `/Users/neillothian/Library/CloudStorage/.../1 Clients /reghem 74/` (Google Drive). À consulter en lecture seule pour info matériel.
- **Actions externes Neil en attente** : 6 cases ouvertes dans `QUESTIONS-OUVERTES.md` § Actions à exécuter (logos partenaires, reCAPTCHA, Places API, photos chantiers, portrait, bio).
