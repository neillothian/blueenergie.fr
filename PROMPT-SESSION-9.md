# 🎓 Fiche de révision — Session 9 : favicon + Open Graph + Twitter Card + meta SEO/social

> À lire AVANT de lancer le prompt dans Claude Code. Objectif : comprendre ce que la session va faire et pourquoi, pas juste exécuter aveuglément.

Quand quelqu'un partage ton lien sur WhatsApp, LinkedIn, Slack ou Facebook, l'application va lire ton HTML et chercher des **meta tags spéciaux** pour afficher un aperçu (titre + description + image). Si ces tags sont absents, le partage affiche une URL brute moche ou, pire, une image aléatoire du site mal recadrée. Cette session ajoute (1) un **jeu de favicons** complet (l'icône dans l'onglet du navigateur + sur l'écran d'accueil des smartphones), (2) les balises **Open Graph** + **Twitter Card** pour les partages sociaux, et (3) finit la couverture de **`meta description`** qui manque encore sur l'accueil. Pas de compression d'image lourde ici (réservé à une mini-session manuelle séparée).

## Ce que tu vas voir passer dans le prompt

- **Favicon** : la petite icône affichée dans l'onglet du navigateur ET dans les marque-pages. Standard moderne : 4 fichiers (`favicon.ico` 32×32, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png` 180×180 pour iOS) + un `site.webmanifest` pour les ajouts à l'écran d'accueil Android. Sans ça, le navigateur affiche un globe générique.
- **`sips`** : outil natif macOS qui redimensionne / crop / convertit des images en CLI sans rien installer. Ex : `sips -z 32 32 Logo.png --out favicon-32x32.png`. Le dev s'en sert pour générer les favicons à partir du logo existant `Logo-blue-energie.png`.
- **Open Graph** (Facebook, LinkedIn, WhatsApp, Slack, Discord, Telegram…) : protocole créé par Facebook en 2010, adopté par tout le monde. 5 tags critiques : `og:title`, `og:description`, `og:image`, `og:url`, `og:type`. Sans ça, le partage est moche.
- **`og:image`** : 1200×630 px recommandé (ratio 1.91:1). C'est l'image qui s'affiche en grand dans l'aperçu. On va la générer à partir d'une photo existante (`blue-energie-photovoltaique.webp`) via `sips`.
- **Twitter Card** : équivalent Open Graph pour X (ex-Twitter). 4 tags : `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`. Valeur `summary_large_image` pour l'affichage avec grande image.
- **`theme-color`** : meta tag qui colorise la barre d'adresse du navigateur mobile Chrome/Edge avec ta couleur de marque. Petit détail, gros effet de pro. Couleur Blue Energie : `#4fc7ef`.
- **`meta description`** : 150-160 caractères qui apparaissent SOUS le titre dans la SERP Google. Influence le taux de clic. Présente sur 7 pages déjà — **manque sur l'accueil**, à ajouter.
- **`site.webmanifest`** : fichier JSON décrivant l'app Web (nom, icônes, couleur de thème, couleur de fond). Lu par Android quand l'utilisateur ajoute le site à l'écran d'accueil — il devient une vraie « PWA légère ».

## Étapes clés du prompt (vue d'avion)

1. Init : `git pull --rebase`, vérifier git propre, backup d'`index.html`.
2. Génération du **jeu de favicons** via `sips` à partir de `public_html/images/Logo-blue-energie.png` → 4 fichiers + `site.webmanifest` dans `public_html/`.
3. Génération de l'**`og-image.jpg`** (1200×630) à partir de `public_html/images/blue-energie-photovoltaique.webp` via `sips`.
4. Ajout des **déclarations favicon + theme-color + canonical** dans le `<head>` des 8 pages.
5. Ajout de **`meta description`** sur `index.html` (manque actuel).
6. Ajout des **Open Graph + Twitter Card** sur les 5 pages qui n'en ont pas (index, merci, mentions-légales, cgv, politique-confidentialite). Pages blog déjà couvertes — ne pas dupliquer.
7. Maj automatique de `SESSIONS-CODE-A-VENIR.md` (ligne Session 9 → ✅ DÉPLOYÉ).
8. Validation (grep, JSON parse du manifest, taille des fichiers) + commit + push direct main.

## Pièges à anticiper

- **`sips` indisponible** : sur les Mac récents `sips` est toujours installé. Si pour une raison X il manque, le dev signale dans le rapport et passe à l'étape suivante (Neil pourra générer manuellement via https://realfavicongenerator.net).
- **Image source pour favicon trop rectangulaire** : `Logo-blue-energie.png` doit être idéalement carré ou presque. Si trop large, l'icône sera déformée. Le dev fait un crop carré centré avant le resize.
- **`og:image` trop lourde** : la version générée doit faire < 200 KB pour ne pas ralentir l'affichage de l'aperçu (Facebook timeout). Qualité JPEG 80 recommandée via `sips -s formatOptions 80`.
- **URL absolue obligatoire pour `og:image`** : `https://blueenergie.fr/images/og-image.jpg` et **pas** `/images/og-image.jpg` — les scrapers Facebook ne résolvent pas les chemins relatifs.
- **Dédoublement Open Graph sur blog** : les 3 pages blog ont **déjà** des og: et twitter:. Le dev doit vérifier puis **ne PAS dupliquer** — seulement compléter si certains tags manquent (og:locale, theme-color).
- **`meta description` sur l'accueil** : doit être unique et différente de la balise `<title>`. Cible : 150-160 caractères, contenant « photovoltaïque », « Haute-Savoie », « RGE QualiPV ».
- **Webmanifest `start_url` relatif vs absolu** : utiliser `/` (racine relative à l'origine) — fonctionne avec n'importe quel sous-chemin.

## Mini-quiz d'auto-vérification

1. Pourquoi l'`og:image` doit-elle être une URL **absolue** (`https://blueenergie.fr/images/og-image.jpg`) et pas un chemin **relatif** (`/images/og-image.jpg`) ?
2. Si tu mets une `meta description` identique sur les 8 pages, qu'est-ce que ça pénalise dans Google ?
3. À quoi sert exactement `apple-touch-icon.png` 180×180 — et qu'est-ce qui se passe sur iOS s'il est absent ?

## Pour aller plus loin (optionnel)

- The Open Graph protocol : https://ogp.me/
- realfavicongenerator.net (alternative manuelle si `sips` indisponible) : https://realfavicongenerator.net
- Validator Open Graph (LinkedIn Post Inspector) : https://www.linkedin.com/post-inspector/
- Validator Open Graph (Facebook Sharing Debugger) : https://developers.facebook.com/tools/debug/

---



# Prompt Session 9 — Favicon + Open Graph + Twitter Card + meta SEO/social

> **Compléter l'identité visuelle (favicon multi-format) et l'aperçu sur les partages sociaux (Open Graph + Twitter Card) sur les 8 pages publiques. Ajouter la `meta description` manquante sur l'accueil.**
> Périmètre : 4 fichiers favicon + `site.webmanifest` + `og-image.jpg` créés dans `public_html/` ; `<head>` des 8 pages enrichi ; maj `SESSIONS-CODE-A-VENIR.md`.
> Durée estimée : 1 h. Aucune question au user pendant l'exécution.

---

## Mode d'emploi (côté Neil)

1. Ouvre un terminal
2. `cd "/Users/neillothian/Documents/Claude/Projects/blueenergie.fr"`
3. Lance Claude Code : `claude`
4. Copie-colle tout ce qui est entre `=== DÉBUT PROMPT ===` et `=== FIN PROMPT ===`
5. Laisse tourner ~1 h. **Push direct main** (livrable technique non engageant).

---

## === DÉBUT PROMPT ===

Tu es développeur web senior + UX. Tu travailles sur **blueenergie.fr** (installation photovoltaïque résidentielle en Haute-Savoie). Stack : HTML/CSS/JS pur. Hébergement Hostinger. Mac local — `sips` natif macOS disponible.

**État du site** : Sessions 1+2+3+4+5+6+Blog déployées. Session 18 (bandeau confiance) déployée mais rendu KO, à reprendre plus tard. Session 14 (JSON-LD + sitemap) en cours ou déployée — sans incidence sur cette session.

**Audit existant** :
- Favicon : **absent** (aucun fichier `favicon*` à la racine)
- `og:`, `twitter:`, `theme-color` : présents uniquement sur les 3 pages `/blog/` (5 pages sans : index, merci, mentions-legales, cgv, politique-confidentialite)
- `meta description` : présent sur 7 pages, **manque sur `index.html`**
- Image source pour favicon : `public_html/images/Logo-blue-energie.png` (103 KB, dimensions à vérifier)
- Image source pour OG : `public_html/images/blue-energie-photovoltaique.webp` (707 KB, image hero)

## Ta mission

1. Générer le **jeu de favicons** complet à partir de `Logo-blue-energie.png` via `sips`
2. Créer **`site.webmanifest`** à la racine de `public_html/`
3. Générer **`og-image.jpg`** (1200×630, qualité 80) à partir de `blue-energie-photovoltaique.webp` via `sips`
4. **Ajouter dans le `<head>` des 8 pages** : déclarations favicon + theme-color
5. **Ajouter `meta description`** uniquement sur `index.html`
6. **Ajouter Open Graph + Twitter Card** uniquement sur les **5 pages qui n'en ont pas** (index, merci, mentions-legales, cgv, politique-confidentialite). Ne PAS dupliquer sur les 3 pages blog.
7. Mettre à jour la table d'avancement (`SESSIONS-CODE-A-VENIR.md`)

Pas de compression d'image lourde (out of scope). Pas de modif du contenu visible. Pas de CSS, pas de JS nouveau.

Durée : 1 h. Aucune question au user.

## Workflow obligatoire

### Étape 0 — Initialisation (5 min)

1. TodoWrite avec 8 tâches : git pull, backup, favicons sips, webmanifest, og-image, head 8 pages, maj table, commit/push
2. `git pull origin main --rebase` — si échec : diagnostique, ne continue pas
3. `git status` doit retourner « nothing to commit, working tree clean » (ou ne contenir que des fichiers untracked de pilotage hors `public_html/`)
4. Backup : `cp public_html/index.html public_html/index.html.backup-pre-session9`

### Étape 1 — Vérification des assets sources (3 min)

```bash
sips --version || echo "ERREUR : sips indisponible — stop et signale"
ls -la public_html/images/Logo-blue-energie.png public_html/images/blue-energie-photovoltaique.webp
sips -g pixelWidth -g pixelHeight public_html/images/Logo-blue-energie.png
sips -g pixelWidth -g pixelHeight public_html/images/blue-energie-photovoltaique.webp
```

Si `sips` indisponible → stop, signale dans le rapport, Neil utilisera realfavicongenerator.net manuellement.

Si `Logo-blue-energie.png` n'est pas carré (largeur ≠ hauteur) : crop carré centré nécessaire à l'étape suivante.

### Étape 2 — Génération des favicons (10 min)

À partir de `public_html/images/Logo-blue-energie.png`, générer dans `public_html/` :

```bash
SRC=public_html/images/Logo-blue-energie.png

# Si l'image n'est pas carrée, crop carré centré préalable
# Détecter dimension min puis cropToHeightWidth
W=$(sips -g pixelWidth "$SRC" | awk 'NR==2{print $2}')
H=$(sips -g pixelHeight "$SRC" | awk 'NR==2{print $2}')
MIN=$(( W < H ? W : H ))
sips -c "$MIN" "$MIN" "$SRC" --out /tmp/logo-square.png

# Génération des tailles favicon
sips -z 16 16 /tmp/logo-square.png --out public_html/favicon-16x16.png
sips -z 32 32 /tmp/logo-square.png --out public_html/favicon-32x32.png
sips -z 180 180 /tmp/logo-square.png --out public_html/apple-touch-icon.png
sips -z 192 192 /tmp/logo-square.png --out public_html/android-chrome-192x192.png
sips -z 512 512 /tmp/logo-square.png --out public_html/android-chrome-512x512.png

# favicon.ico (en réalité un PNG renommé — accepté par tous les navigateurs modernes)
cp public_html/favicon-32x32.png public_html/favicon.ico

# Nettoyage
rm /tmp/logo-square.png

# Vérification
ls -la public_html/favicon* public_html/apple-touch-icon.png public_html/android-chrome-*
```

### Étape 3 — Création de `public_html/site.webmanifest` (5 min)

Créer le fichier **`public_html/site.webmanifest`** avec ce contenu **EXACT** :

```json
{
  "name": "Blue Energie",
  "short_name": "Blue Energie",
  "description": "Installateur photovoltaïque RGE QualiPV en Haute-Savoie",
  "lang": "fr",
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    }
  ],
  "theme_color": "#4fc7ef",
  "background_color": "#ffffff",
  "display": "browser",
  "start_url": "/"
}
```

### Étape 4 — Génération de `og-image.jpg` (5 min)

À partir de `public_html/images/blue-energie-photovoltaique.webp`, générer une image OG 1200×630 :

```bash
# sips ne lit pas toujours bien le WebP — convertir d'abord en PNG intermédiaire si besoin
sips -s format png public_html/images/blue-energie-photovoltaique.webp --out /tmp/og-src.png 2>/dev/null || {
  echo "WARN: conversion webp → png échouée, tentative directe"
  cp public_html/images/blue-energie-photovoltaique.webp /tmp/og-src.png
}

# Resize avec contrainte de hauteur, puis crop centré 1200x630
sips -z 630 1200 /tmp/og-src.png --out /tmp/og-resized.png
sips -c 630 1200 /tmp/og-resized.png --out /tmp/og-cropped.png

# Export final en JPEG qualité 80 (taille cible < 200 KB)
sips -s format jpeg -s formatOptions 80 /tmp/og-cropped.png --out public_html/images/og-image.jpg

# Nettoyage
rm -f /tmp/og-src.png /tmp/og-resized.png /tmp/og-cropped.png

# Vérification
ls -la public_html/images/og-image.jpg
sips -g pixelWidth -g pixelHeight public_html/images/og-image.jpg
```

Si la chaîne `sips` échoue sur le WebP, signaler dans le rapport et passer à l'étape suivante — Neil pourra créer manuellement l'image OG via squoosh.app ou Photoshop. Dans ce cas, dans les meta tags OG ci-dessous, garder quand même la déclaration vers `/images/og-image.jpg` (Neil l'uploadera).

### Étape 5 — Bloc HTML à insérer (définition, 5 min)

#### 5.a — Bloc « favicon + theme-color + canonical » (à insérer dans toutes les 8 pages)

À insérer dans le `<head>` **juste avant** la fermeture `</head>`, après tous les autres scripts :

```html
<!-- Favicon -->
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#4fc7ef">
```

**Important** : si une page possède déjà un `<meta name="theme-color">` (cas des 3 pages blog), **ne pas dupliquer** — laisser celui existant et n'ajouter que les `<link rel="icon">` et `apple-touch-icon` + manifest.

#### 5.b — Bloc « Open Graph + Twitter Card » (uniquement sur les 5 pages qui n'en ont pas)

À insérer dans le `<head>`, à côté des autres meta (avant le bloc favicon) :

**Pour `index.html`** :
```html
<!-- Meta description -->
<meta name="description" content="Blue Energie, installateur photovoltaïque RGE QualiPV en Haute-Savoie. Modules JA Solar 500Wc, onduleurs et batteries Solplanet. Étude gratuite, devis personnalisé.">

<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://blueenergie.fr/">
<meta property="og:title" content="Blue Energie — Installation photovoltaïque RGE QualiPV en Haute-Savoie">
<meta property="og:description" content="Études personnalisées, modules JA Solar 500Wc, onduleurs et batteries Solplanet. Installation clé en main en Haute-Savoie, Savoie, Ain et Isère.">
<meta property="og:image" content="https://blueenergie.fr/images/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="fr_FR">
<meta property="og:site_name" content="Blue Energie">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Blue Energie — Installation photovoltaïque RGE QualiPV en Haute-Savoie">
<meta name="twitter:description" content="Études personnalisées, modules JA Solar 500Wc, onduleurs et batteries Solplanet. Installation clé en main en Haute-Savoie, Savoie, Ain et Isère.">
<meta name="twitter:image" content="https://blueenergie.fr/images/og-image.jpg">
```

**Pour `merci.html`** : remplacer dans le bloc OG/Twitter ci-dessus :
- `og:url` → `https://blueenergie.fr/merci.html`
- `og:title` + `twitter:title` → `Merci — votre demande est bien reçue | Blue Energie`
- `og:description` + `twitter:description` → `Votre demande d'étude photovoltaïque a bien été transmise à Blue Energie. Réponse personnalisée sous 48 h ouvrées.`

**Pour `mentions-legales.html`** :
- `og:url` → `https://blueenergie.fr/mentions-legales.html`
- `og:title` + `twitter:title` → `Mentions légales | Blue Energie`
- `og:description` + `twitter:description` → `Mentions légales de la SAS Blue Energie, installateur photovoltaïque RGE QualiPV en Haute-Savoie. SIRET, hébergement, propriété intellectuelle.`

**Pour `cgv.html`** :
- `og:url` → `https://blueenergie.fr/cgv.html`
- `og:title` + `twitter:title` → `Conditions Générales de Vente | Blue Energie`
- `og:description` + `twitter:description` → `CGV applicables aux prestations d'installation photovoltaïque réalisées par Blue Energie auprès des particuliers : rétractation, garanties, paiement, médiation.`

**Pour `politique-confidentialite.html`** :
- `og:url` → `https://blueenergie.fr/politique-confidentialite.html`
- `og:title` + `twitter:title` → `Politique de confidentialité | Blue Energie`
- `og:description` + `twitter:description` → `Comment Blue Energie traite vos données personnelles : finalités, bases légales, durées de conservation, vos droits RGPD, gestion des cookies.`

### Étape 6 — Intégration sur les 8 pages (15 min)

Pour **chaque** page de la liste ci-dessous :

1. `public_html/index.html` → ajouter bloc 5.a + bloc 5.b (avec contenu spécifique index)
2. `public_html/merci.html` → ajouter bloc 5.a + bloc 5.b (variante merci)
3. `public_html/mentions-legales.html` → ajouter bloc 5.a + bloc 5.b (variante mentions)
4. `public_html/cgv.html` → ajouter bloc 5.a + bloc 5.b (variante cgv)
5. `public_html/politique-confidentialite.html` → ajouter bloc 5.a + bloc 5.b (variante politique)
6. `public_html/blog/index.html` → ajouter **uniquement bloc 5.a** (sans le theme-color si déjà présent)
7. `public_html/blog/2026-05-aides-solaires-avant-1er-juillet.html` → ajouter **uniquement bloc 5.a** sans dupliquer theme-color si déjà présent
8. `public_html/blog/2026-05-batterie-virtuelle-attention-jpme.html` → idem

**Important** : sur les 3 pages blog, **vérifier d'abord** avec un grep si `theme-color` existe déjà. Si oui, retirer cette ligne du bloc 5.a inséré.

### Étape 7 — Mise à jour table d'avancement (3 min)

1. Lire `SESSIONS-CODE-A-VENIR.md` et localiser la ligne `| Session 9 — Optimisation images + favicon + meta |`
2. Remplacer la ligne via Edit avec ce format exact :
   ```
   | Session 9 — Optimisation images + favicon + meta | ✅ **DÉPLOYÉ** (favicon + Open Graph + Twitter Card ; compression images = mini-session manuelle future) | `PROMPT-SESSION-9.md` |
   ```
3. Mettre à jour la date d'en-tête : `## État d'avancement (mise à jour 2026-05-17)`
4. Vérification : `grep -c "Session 9.*DÉPLOYÉ" SESSIONS-CODE-A-VENIR.md` doit retourner **1**
5. Inclure `SESSIONS-CODE-A-VENIR.md` dans le commit final

### Étape 8 — Validation finale (10 min)

1. **Vérifier les favicons créés à la racine** :
   ```bash
   ls -la public_html/favicon* public_html/apple-touch-icon.png public_html/android-chrome-* public_html/site.webmanifest
   ```
   Doivent tous exister et faire > 100 b.

2. **Vérifier l'og-image** :
   ```bash
   ls -la public_html/images/og-image.jpg
   sips -g pixelWidth -g pixelHeight public_html/images/og-image.jpg
   ```
   Dimensions attendues : 1200×630. Taille < 200 KB idéalement.

3. **Vérifier le webmanifest JSON valide** :
   ```bash
   python3 -c "import json; json.load(open('public_html/site.webmanifest')); print('webmanifest JSON valide')"
   ```

4. **Vérifier le favicon déclaré sur les 8 pages** :
   ```bash
   grep -c "favicon-32x32.png" public_html/index.html public_html/merci.html public_html/blog/*.html public_html/mentions-legales.html public_html/cgv.html public_html/politique-confidentialite.html
   ```
   Chaque page doit retourner exactement **1**.

5. **Vérifier Open Graph sur les 5 pages cibles** :
   ```bash
   grep -c 'property="og:title"' public_html/index.html public_html/merci.html public_html/mentions-legales.html public_html/cgv.html public_html/politique-confidentialite.html
   ```
   Chaque page doit retourner exactement **1**.

6. **Vérifier non-duplication theme-color sur les 3 pages blog** :
   ```bash
   grep -c 'theme-color' public_html/blog/*.html
   ```
   Chaque page blog doit retourner exactement **1** (pas 2).

7. **Vérifier meta description sur index** :
   ```bash
   grep -c 'name="description"' public_html/index.html
   ```
   Doit retourner exactement **1**.

8. **Commit + push direct main** (livrable technique non engageant) :
   ```bash
   git add public_html/favicon* public_html/apple-touch-icon.png public_html/android-chrome-* public_html/site.webmanifest public_html/images/og-image.jpg public_html/index.html public_html/merci.html public_html/blog/*.html public_html/mentions-legales.html public_html/cgv.html public_html/politique-confidentialite.html SESSIONS-CODE-A-VENIR.md
   git commit -m "Session 9 : favicons + Open Graph + Twitter Card + meta description accueil"
   git push origin main
   ```
   Si auth interactive requise, commit local valide + signaler dans rapport.

## Décisions déjà prises (ne demande RIEN)

| Sujet | Décision |
|---|---|
| Source favicon | `public_html/images/Logo-blue-energie.png` (crop carré si nécessaire) |
| Source OG image | `public_html/images/blue-energie-photovoltaique.webp` (recrop 1200×630, JPEG q=80) |
| Tailles favicon générées | 16×16, 32×32, 180×180 (apple), 192×192 + 512×512 (android), `favicon.ico` = copie du 32×32 |
| Webmanifest | `public_html/site.webmanifest` (pas `manifest.json`) — standard W3C |
| Couleur thème | `#4fc7ef` (couleur principale du site) |
| Couleur fond manifest | `#ffffff` |
| Display manifest | `browser` (pas standalone — on n'est pas une vraie PWA) |
| `start_url` manifest | `/` |
| OG locale | `fr_FR` |
| Twitter Card type | `summary_large_image` |
| OG image URL | `https://blueenergie.fr/images/og-image.jpg` (URL **absolue**, obligatoire pour scrapers) |
| Compression images existantes | **Hors scope** Session 9 (mini-session manuelle séparée, via squoosh.app côté Neil) |
| Pages avec OG nouveaux | 5 (index, merci, mentions-legales, cgv, politique-confidentialite) |
| Pages blog | OG déjà présents — ne pas dupliquer, seulement ajouter favicon |
| Branche git | Push direct `main` |
| Mise à jour table | Auto dans le commit final |

## Interdictions strictes

- ❌ Ne touche PAS aux images existantes (compression réservée à une session manuelle)
- ❌ N'ajoute PAS de balise OG sur les 3 pages blog (déjà présentes, risque de duplication)
- ❌ N'invente PAS de mots-clés / descriptions « racoleurs » — rester factuel
- ❌ Ne change PAS la couleur thème `#4fc7ef` (cohérence charte)
- ❌ N'utilise PAS d'outil de génération de favicon en ligne — `sips` natif uniquement
- ❌ N'installe AUCUN paquet npm / brew (cwebp, ImageMagick, etc.) — `sips` suffit
- ❌ N'ajoute PAS de JSON-LD ici (Session 14)
- ❌ Ne refactore PAS le CSS ou la structure HTML
- ❌ N'oublie PAS d'ajouter `SESSIONS-CODE-A-VENIR.md` au commit final
- ❌ Ne pose AUCUNE question au user

## En cas de blocage

1. Diagnostique
2. Tente 2 solutions
3. Si `sips` indispo ou échec sur WebP : signale, passe à la suivante, le bloc OG/Twitter peut être ajouté même sans og-image (Neil l'uploadera après)
4. Si crop carré du logo donne un résultat moche (le logo est très rectangulaire) : favicons générés sur l'image originale + warning dans le rapport
5. NE STOPPE PAS pour poser une question

## Format du rapport final

```
## Rapport Session 9

### Fichiers créés
- public_html/favicon-16x16.png
- public_html/favicon-32x32.png
- public_html/favicon.ico
- public_html/apple-touch-icon.png
- public_html/android-chrome-192x192.png
- public_html/android-chrome-512x512.png
- public_html/site.webmanifest
- public_html/images/og-image.jpg (1200×630, X KB)
- public_html/index.html.backup-pre-session9

### Fichiers modifiés
- public_html/index.html — favicon + theme-color + meta description + Open Graph + Twitter Card
- public_html/merci.html — favicon + theme-color + Open Graph + Twitter Card
- public_html/mentions-legales.html — favicon + theme-color + Open Graph + Twitter Card
- public_html/cgv.html — favicon + theme-color + Open Graph + Twitter Card
- public_html/politique-confidentialite.html — favicon + theme-color + Open Graph + Twitter Card
- public_html/blog/index.html — favicon (sans dupliquer theme-color déjà présent)
- public_html/blog/2026-05-aides-solaires-avant-1er-juillet.html — favicon
- public_html/blog/2026-05-batterie-virtuelle-attention-jpme.html — favicon
- SESSIONS-CODE-A-VENIR.md — ligne Session 9 passée à ✅ DÉPLOYÉ

### Vérifications passées
- sips disponible : OK / KO
- Logo source dimensions : W×H
- Tous favicons générés et > 100 b : OK / KO
- webmanifest JSON valide (parse python3) : OK / KO
- og-image.jpg 1200×630 et < 200 KB : OK / KO (taille effective : X KB)
- favicon-32x32 déclaré sur 8 pages : 8/8
- og:title sur 5 pages cibles : 5/5
- theme-color non dupliqué sur blog : OK / KO
- meta description sur index : OK
- Git pull initial : OK
- Git commit local : OK
- Git push origin main : OK / KO

### Table d'avancement
- `SESSIONS-CODE-A-VENIR.md` ligne Session 9 passée à `✅ DÉPLOYÉ`

### Git
- Branche : main
- Commit : [hash + message]
- Pushé : oui / non — raison si non

### À faire côté Neil
1. Téléverser sur Hostinger via hPanel :
   - Tous les `favicon*`, `apple-touch-icon.png`, `android-chrome-*`, `site.webmanifest` à la racine du domaine
   - `public_html/images/og-image.jpg`
   - Les 8 pages HTML modifiées
2. Vider le cache Hostinger
3. Tests externes après upload :
   - Recharger https://blueenergie.fr/ → favicon visible dans l'onglet du navigateur
   - https://realfavicongenerator.net/favicon_checker → coller blueenergie.fr → vérifier que tous les formats sont détectés
   - https://www.linkedin.com/post-inspector/ → coller https://blueenergie.fr/ → vérifier preview LinkedIn
   - https://developers.facebook.com/tools/debug/ → vérifier preview Facebook (cliquer « Scrape Again » pour purger leur cache)
   - Test mobile : ajouter le site à l'écran d'accueil iOS / Android → icône Blue Energie doit apparaître
4. Si le logo source est trop rectangulaire et que le favicon est moche : me dire pour qu'on regénère depuis une version carrée propre.

### Prochaine session recommandée
Session 7 (finition galerie : `loading="lazy"` partout, retrait final Mylight) — quick win technique. Ou reprise Session 18 (correctif bandeau confiance). Ou Session 17 si Place ID Google + clé API Places sont disponibles.

### Blocages éventuels
[ou : aucun]
```

## === FIN PROMPT ===

---

## Notes hors prompt (pour Neil)

**Vérifications post-déploiement** :
1. **Aperçu réseaux sociaux** : utiliser https://www.linkedin.com/post-inspector/ et https://developers.facebook.com/tools/debug/ pour forcer le re-scrape (sinon LinkedIn / Facebook cachent l'ancien preview vide pendant 7 jours).
2. **Favicon dans l'onglet** : un navigateur cache les favicons agressivement (Chrome jusqu'à 1 mois). Pour vérifier le nouveau : navigation privée ou DevTools → Application → Storage → Clear site data.
3. **iOS Add to Home Screen** : ouvre Safari iOS, navigue sur blueenergie.fr, partage → Sur l'écran d'accueil → vérifie que l'icône apparaît bien (pas une capture d'écran).
4. **Logo trop rectangulaire ?** Le `Logo-blue-energie.png` actuel a peut-être un ratio défavorable pour un favicon (16×16 c'est petit). Si le rendu est moche, recommandation : créer une version carrée minimaliste « BE » sur fond `#4fc7ef` pour les petites tailles, puis la déposer dans `_dropzone/` pour intégration.

**Compression images (mini-session manuelle séparée)** : 5 images > 250 KB à compresser via https://squoosh.app (drag&drop, WebP qualité 80, garder le même nom de fichier) :
- `blue-energie-photovoltaique.webp` 707 KB → cible 250 KB
- `paysage-sur-tuile-mecanique-exposition-est_ouest.webp` 501 KB → cible 200 KB
- `toit-plat-0-degre.webp` 343 KB → cible 200 KB
- `Toit-goudron.webp` 268 KB → cible 150 KB
- `portrait-techicien.webp` 249 KB → cible 150 KB
Gain attendu : ~1,5 MB → score PageSpeed mobile +5-10 points.

**Prochaine session recommandée après celle-ci** : **Session 7** (finition galerie) — petite mais utile, ou **reprise Session 18** avec un diagnostic visuel précis (capture d'écran + description de ce qui foire) → on prépare un PROMPT-SESSION-18-FIX ciblé.
