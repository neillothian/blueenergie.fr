# État du projet blueenergie.fr — 2026-05-19 (clôture session pilotage)

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

✅ **Déployées en prod** sur https://blueenergie.fr (au 2026-05-17) :
- Sessions 1+2+3 (correctifs HTML critiques, `/merci.html`, carte OpenStreetMap)
- Session 4 (mentions légales + CGV + politique de confidentialité)
- Session 5 (bandeau cookies tarteaucitron v1.18.x + GA4 conditionnel)
- Session 6 (catalogue matériel JA Solar / Solplanet / K2 / Tigo + badge prix batterie « < 300 €/kWh »)
- Session 9 (favicon multi-format + site.webmanifest + og-image + Open Graph + Twitter Card + meta description accueil)
- Session Blog (hub `/blog/` + 2 articles : aides 2026, batteries virtuelles JPME)

✅ **Commitées sur git mais PAS encore uploadées Hostinger** (action Neil) :
- Session 7 (galerie réalisations : `loading="lazy"`, renommage Mylight → libellés génériques)
- Session 8 (extraction CSS/JS vers `assets/` pour index + merci)
- Session 11 (partials header/footer + JS loader sur index uniquement)
- Session 12 (4 pages internes : installation, matériel, réalisations, contact + sitemap)
- Session 13 (page aides-2026 + mini-simulateur JS)
- Session 14 (JSON-LD LocalBusiness + sitemap.xml + robots.txt)
- Session 15 (hub `zones-intervention.html` + page modèle `zones/annecy.html`)
- Session 18 (bandeau confiance + correctif appliqué)

→ **26 fichiers public_html/ en attente d'upload**. Détail complet : `ACTIONS-NEIL.md` § Upload Hostinger en attente.

⏳ **Prompts prêts à lancer** (rédigés par superviseur, à exécuter dans une session Claude Code dev) :
- `PROMPT-SESSION-6-BIS.md` — ajout SolarEdge/Enphase + offre Back-up 600 € HT
- `PROMPT-SESSION-18-V2.md` — nettoyage bandeau confiance (retire SAS/SIRET/avis Google + « Numéro sur demande »)
- `PROMPT-SESSION-BLOG-IMAGES.md` — images en-tête sur hub blog + 2 articles
- `PROMPT-SESSION-16.md` — 14 pages géolocalisées SEO (Tier A × 4, B × 6, C × 4)

📝 **Proposition en attente de validation Neil** :
- `PROPOSITION-FORMULAIRE.md` — refonte formulaire étude (wizard 4 étapes, carte GPS Leaflet/OSM, upload docs, 12 champs conso mensuels, backend PHP custom). 5 questions à trancher avant rédaction de PROMPT-SESSION-10.md.

⬜ **Sessions restantes après celles ci-dessus** :
- Session 10 (formulaire refondu + reCAPTCHA v3) — bloquée par validation `PROPOSITION-FORMULAIRE.md` + clés reCAPTCHA
- Session 17 (avis Google dynamiques) — Place ID confirmé, clé API Places à fournir (cf. `ACTIONS-NEIL.md` Q10)
- Session 22 (3e article blog — sujet à définir)
- **Mini-session manuelle** : compression des 5 images > 250 KB via https://squoosh.app

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
| `PROMPT-SESSION-*.md` | Prompts Claude Code archivés (1-2-3, 4, 5, 6, 6-BIS, BLOG, BLOG-IMAGES, 9, 14, 16, 18, 18-V2) |
| `PROPOSITION-FORMULAIRE.md` | Proposition de refonte du formulaire d'étude (en attente validation Neil) |
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

- **⚠️ Divergence prod ↔ git (26 fichiers)** : tout ce qui a été commité depuis Session 9 (Sessions 7, 8, 11→15, 18) n'est PAS encore en ligne. Les pages internes (installation, matériel, réalisations, contact, aides-2026, zones/*) renvoient 404. Sitemap.xml et robots.txt aussi en 404 → soumission Search Console à reporter après upload. **Action Neil prioritaire** : cf. `ACTIONS-NEIL.md` § Upload Hostinger en attente.
- **Dropzone `_dropzone/`** : 10 items en attente d'arbitrage. 4 dossiers clients (`01 Ballabriga`, `74 Collion`, `74 Mauny`, `74 reghem`) contiennent **données RGPD sensibles** (devis, mandats Enedis, factures EDF, noms/adresses/téléphones/emails clients) — à **exfiltrer hors repo** dans un dossier confidentiel local. Photos chantier potentiellement anonymisables (toiture, onduleur, batterie) pourraient nourrir Session 7/12 après accord clients + nettoyage EXIF. Portrait Neil + visuels Solplanet (Ai-LB-G3, GALLERY-Solplanet-App02) intégrables immédiatement. 2 captures d'écran 17/05 = contenu à préciser avec Neil.
- **Argument commercial « batterie < 300 €/kWh »** : Neil a validé les chiffres (342 €/kWh à 5 kWh, 300 €/kWh dès 10 kWh). Mentionné sur le site avec mention « à partir de 10 kWh ». Si changement de tarif fournisseur, mettre à jour la carte matériel.
- **Email exposé `neil.lothian@`** : risque de spam, Neil a fait le choix de garder cet email pour l'instant.
- **Filtrage avis Google négatifs (Session 17)** : risque juridique gris (L.121-1 Code de la consommation). Garde-fous documentés dans `QUESTIONS-OUVERTES.md` § Annexe risque Q16. À basculer en « tout afficher » dès qu'un avis négatif arrive.
- **Le repo ne contient pas le code des fiches techniques PDF** des fournisseurs (JA Solar, Solplanet) — à ajouter via dropzone si on veut les exposer publiquement.
- **Le dossier client REGHEM** (devis, fiche-client.md) **n'est PAS dans ce repo** (à juste titre — confidentiel). Il est à `/Users/neillothian/Library/CloudStorage/.../1 Clients /reghem 74/` (Google Drive). À consulter en lecture seule pour info matériel.
- **Actions externes Neil en attente** : 6 cases ouvertes dans `QUESTIONS-OUVERTES.md` § Actions à exécuter (logos partenaires, reCAPTCHA, Places API, photos chantiers, portrait, bio).
