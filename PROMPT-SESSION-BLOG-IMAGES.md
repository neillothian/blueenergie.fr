# Fiche de révision — Session BLOG-IMAGES (images en-tête blog)

> À lire AVANT de lancer le prompt dans Claude Code. Objectif : comprendre POURQUOI on ajoute ces images, pas juste exécuter.

Le blog Blue Energie a aujourd'hui 1 hub + 2 articles correctement balisés (SEO, JSON-LD Article + FAQPage, Open Graph), mais **aucun visuel en tête de page**. Le hub affiche des dégradés CSS dans les cartes ; les articles ouvrent directement sur le `<h1>` après le fil d'Ariane. Conséquence : aperçus de partage social peu attractifs (og:image générique du site sur les 2 articles), pas d'image dans le JSON-LD `Article` (Google Discover et la plupart des rich results l'exigent), et impression visuelle plate à l'ouverture d'un article.

## Concepts non triviaux

- **Hero image et LCP (Largest Contentful Paint)** : l'image en haut de page est presque toujours l'élément le plus gros visible au chargement. Google Core Web Vitals mesure le temps que met cet élément à apparaître. Conséquence concrète : **on NE met PAS `loading="lazy"` sur le hero** (sinon le navigateur attend avant de la télécharger → LCP dégradé). On peut même la précharger via `<link rel="preload" as="image" href="...">` dans le `<head>` pour gagner quelques centaines de ms.
- **Trois usages distincts d'une image, à ne pas confondre** :
  1. **Image hero affichée** dans la page (balise `<img>` ou `<picture>`) — dimensions d'affichage, sert l'expérience visuelle. Idéal : 1600×900 (16:9).
  2. **`og:image`** (meta Open Graph) — utilisée quand quelqu'un partage l'URL sur LinkedIn / Facebook / WhatsApp / Slack. **Spec Open Graph : 1200×630 px minimum**, ratio 1.91:1, idéalement < 1 Mo, URL absolue obligatoire.
  3. **`image` du JSON-LD Article** — utilisée par Google Discover, Google Actualités, rich results. URL absolue obligatoire. Mêmes dimensions que `og:image` conviennent.
  Aujourd'hui sur Blue Energie, les 2 articles utilisent le même `og:image` générique du site et n'ont **aucune** `image` dans leur JSON-LD Article. Cette session corrige les deux.
- **Sources d'images libres de droits** (à privilégier dans cet ordre) :
  - **Unsplash** (https://unsplash.com) — licence Unsplash (équivalent CC0 commercial, attribution non obligatoire mais recommandée éthiquement)
  - **Pexels** (https://pexels.com) — Pexels License, gratuit usage commercial, attribution recommandée
  - **Pixabay** (https://pixabay.com) — Pixabay License, gratuit usage commercial
  - **Toujours noter dans un commentaire HTML adjacent à l'image** : `<!-- Photo: Prénom Nom on Unsplash (URL source) -->` (traçabilité légale, pas affiché à l'utilisateur)
- **Format WebP vs JPEG** : WebP compresse ~25-35 % de plus que JPEG à qualité visuelle équivalente. Tous les navigateurs modernes le supportent depuis 2021. C'est le format à utiliser. Fallback JPEG inutile en 2026.
- **`alt` descriptif vs décoratif** : ces images sont éditoriales (renforcent le contenu), donc `alt` informatif obligatoire (pas `alt=""`). Ex : `alt="Toiture en tuiles avec panneaux solaires photovoltaïques en Haute-Savoie"` — pas `alt="image"` ni `alt="hero"`.
- **RGPD images** : si une photo contient une personne identifiable, on ne peut pas l'afficher sans son consentement écrit, même libre de droits. Donc **privilégier des photos sans personne** (toits, panneaux, batteries, paysages).

## Étapes vue d'avion

1. Initialisation : `git pull`, vérifier working tree propre, TodoWrite.
2. Décider de la source des images : option A (Unsplash, recommandée, rapide) ou option B (Neil pose dans `_dropzone/`).
3. Récupérer / acquérir 3 images sources.
4. Optimiser à `1600×900` WebP < 200 KB (squoosh.app si pas de cwebp local).
5. Créer `public_html/blog/images/` et y placer les 3 fichiers nommés explicitement.
6. Pour chaque page (hub + 2 articles) : insérer `<img class="blog-hero">` au bon endroit, ajouter CSS `.blog-hero`, mettre à jour `og:image` et JSON-LD `Article.image`.
7. Précharger l'image hero des 2 articles via `<link rel="preload" as="image">`.
8. Validation : grep des `og:image` (3 valeurs uniques), grep `"image"` dans JSON-LD (2 trouvés), test visuel local.
9. Commit + push + maj `SESSIONS-CODE-A-VENIR.md`.

## Pièges à anticiper

- **Ne pas oublier `og:image` PAR ARTICLE** (pas seulement sur le hub) — chaque article doit avoir SA propre image dans son `<meta property="og:image">`.
- **Ne pas oublier le JSON-LD `Article.image`** — c'est une URL absolue (`https://blueenergie.fr/blog/images/...`). Sans cette propriété, Google Search Console signale un warning « Champ image manquant » sur les articles.
- **Pas de `loading="lazy"` sur le hero** — c'est l'erreur classique. Le hero doit s'afficher immédiatement.
- **Taille de fichier** : viser < 200 KB par WebP hero. Au-delà, on dégrade le LCP mobile en 4G.
- **Alt vide ou inutile** : pénalité accessibilité + petit signal SEO négatif. Toujours un alt descriptif.
- **URLs absolues vs relatives** : dans le HTML on peut mettre `/blog/images/...` (relatif racine), mais dans `og:image` ET dans JSON-LD `Article.image` il faut **obligatoirement** l'URL absolue `https://blueenergie.fr/blog/images/...`.
- **Crédit photo** : noter en commentaire HTML l'auteur Unsplash / Pexels même si pas obligatoire — Neil garde une trace en cas de question ultérieure.

## Mini-quiz d'auto-vérification

1. Pourquoi ne PAS mettre `loading="lazy"` sur l'image hero d'un article ?
2. Quelles sont les 3 « cibles » à mettre à jour pour qu'une image soit pleinement utilisée par Google et les réseaux sociaux ?
3. Quelle taille minimale recommande la spec Open Graph pour `og:image` ?
4. Pourquoi privilégier WebP sur JPEG pour les images du blog en 2026 ?
5. Si une photo Unsplash montre clairement le visage d'une personne, peut-on l'utiliser sur un site commercial sans démarche supplémentaire ?

## Liens (lecture optionnelle)

- Schema.org Article (champ `image`) : https://schema.org/Article
- Open Graph protocol : https://ogp.me/
- Google Search Central — Guidelines Article structured data : https://developers.google.com/search/docs/appearance/structured-data/article
- Unsplash (recherche « solar panels rooftop ») : https://unsplash.com/s/photos/solar-panels-rooftop
- Squoosh (optimisation WebP en ligne, sans installer cwebp) : https://squoosh.app

---


# Prompt Session BLOG-IMAGES — Images en-tête blog

> **Ajout d'images hero (et mise à jour og:image + JSON-LD image) sur le hub blog et les 2 articles existants.**
> Périmètre : 3 fichiers HTML existants + 3 images à placer dans `public_html/blog/images/`.
> Durée estimée : 1 h 30. Aucune question au user pendant l'exécution.

---

## Mode d'emploi (côté Neil)

1. **Avant de lancer** : choisir l'option A ou B (voir § « Sources des images » ci-dessous).
   - Option A (recommandée) : on laisse Claude Code se servir des 3 URLs Unsplash listées plus bas → rapide, pas d'action côté toi.
   - Option B : tu déposes toi-même 3 images dans `_dropzone/` avant de lancer le prompt (nommées `blog-hero-hub.jpg`, `blog-hero-aides.jpg`, `blog-hero-batterie.jpg`).
2. Ouvre un terminal.
3. `cd "/Users/neillothian/Documents/Claude/Projects/blueenergie.fr"`
4. Lance Claude Code : `claude`
5. Copie-colle tout ce qui est entre `=== DÉBUT PROMPT ===` et `=== FIN PROMPT ===`.
6. Laisse tourner ~1 h 30. Push direct sur `main` (livrable technique, pas de garde-fou requis).

---

## === DÉBUT PROMPT ===

Tu es développeur web senior spécialisé en performance / SEO front-end. Tu travailles sur **blueenergie.fr** (installation photovoltaïque résidentielle en Haute-Savoie). Stack : HTML/CSS/JS pur. Hébergement Hostinger. Repo Git : `github.com/neillothian/blueenergie.fr`, branche `main`.

État du site : Sessions 1→9, 11→15 et Blog déployées. Le blog comporte un hub et 2 articles, tous balisés SEO / JSON-LD / Open Graph. Aucun visuel en-tête à ce jour.

## Ta mission

Ajouter une **image en en-tête** (hero) au hub blog et aux 2 articles existants, et propager cette image vers :
- la balise `<meta property="og:image">` propre à chaque page (URL absolue) ;
- le champ `image` du JSON-LD `Article` des 2 articles ;
- un `<link rel="preload" as="image">` dans le `<head>` des 2 articles (LCP).

Aucune réécriture du contenu rédactionnel. Aucune retouche du CSS hors `.blog-hero`. Pas d'images sur les autres pages du site cette fois.

Durée : 1 h 30. Aucune question au user.

## Workflow obligatoire

### Étape 0 — Initialisation (5 min)

1. **TodoWrite** avec ces 10 tâches : (1) git pull (2) lecture contexte (3) acquisition 3 images (4) optimisation WebP (5) hub blog (6) article aides (7) article batterie (8) preload + JSON-LD (9) validation grep (10) commit + push + maj table d'avancement.
2. `git pull origin main --rebase` — si échec : diagnostique, ne continue pas.
3. `git status` doit retourner « nothing to commit, working tree clean ».
4. Pas de branche dédiée (livrable technique non-engageant).
5. Pas de backup nécessaire (les 3 HTML modifiés sont versionnés git).

### Étape 1 — Lecture contexte (5 min)

Lis dans cet ordre, et RIEN d'autre :
1. `public_html/blog/index.html` — repérer le bloc `<header class="blog-header">` (ligne ~448) et le bloc `.blog-header` du CSS (ligne ~112). L'image hero du hub viendra **en remplacement du dégradé bleu actuel** (overlay sombre + image en background) ou **juste sous la navbar avant le bloc h1** (au choix, esthétique au mieux — décide selon lisibilité du titre).
2. `public_html/blog/2026-05-aides-solaires-avant-1er-juillet.html` — repérer le breadcrumb (`<nav class="breadcrumb">` ligne ~589) et le `<article class="post">` qui suit. L'image hero s'insère **entre le breadcrumb et le `<h1>`**, dans une balise `<figure class="blog-hero">` placée juste avant `<article class="post">` ou en tant que premier enfant de `<article>`.
3. `public_html/blog/2026-05-batterie-virtuelle-attention-jpme.html` — même structure, même point d'insertion.

Ne lis aucun autre fichier sauf si nécessaire pour résoudre un blocage.

### Étape 2 — Acquisition des 3 images (15 min)

**Décision binaire à prendre AU DÉBUT** :

#### Option A — Photos Unsplash (à privilégier, plus rapide)

Télécharge ces 3 photos depuis Unsplash (résolution « Medium » ou « Large », ~1920×1280 environ) :

1. **Hub blog** — Toiture moderne avec panneaux solaires, paysage de montagne en arrière-plan (cohérent Haute-Savoie) :
   URL : `https://unsplash.com/photos/aerial-photography-of-grass-field-with-blue-solar-panels-1zfeg6w_DjY` (auteur : American Public Power Association)
   Fallback si indisponible : `https://unsplash.com/s/photos/solar-panels-roof-house` → choisir une photo nette d'une toiture résidentielle avec panneaux, sans personne identifiable.

2. **Article aides solaires** — Pièces euros + maison miniature OU calculatrice + panneau solaire (thème financement / aides) :
   URL : `https://unsplash.com/photos/a-pile-of-coins-sitting-on-top-of-each-other-Q5QspluNZmM` (auteur : Mathieu Stern) OU thématique calendrier/échéance.
   Fallback : `https://unsplash.com/s/photos/euro-coins-house` → photo neutre pièces + petite maison.

3. **Article batterie virtuelle** — Batterie domestique murale OU compteur électrique / onduleur (thème stockage électricité) :
   URL : `https://unsplash.com/photos/silver-and-black-electric-meter-mZNRsYE9Qi4` (auteur : Frédéric Paulussen) OU une batterie résidentielle murale type Powerwall/Solplanet.
   Fallback : `https://unsplash.com/s/photos/home-battery-storage` → photo claire d'une batterie murale ou d'un onduleur.

**Si une URL spécifique renvoie 404 ou que la photo a été retirée** : remplace par un résultat équivalent depuis l'URL de recherche associée. Note systématiquement dans le rapport final : URL exacte téléchargée + nom de l'auteur.

**Méthode de téléchargement** :
- `curl -L -o /tmp/blog-hero-hub-raw.jpg "<URL de téléchargement directe Unsplash>"` (l'URL directe est `https://images.unsplash.com/photo-<id>?w=1920&q=80`, pas la page de présentation).
- Si curl bloque (DNS, certificat, etc.), bascule en Option B et signale dans le rapport.

#### Option B — Images posées par Neil dans `_dropzone/`

Vérifie la présence de **3 fichiers** dans `_dropzone/` :
- `blog-hero-hub.*` (jpg / jpeg / png / webp)
- `blog-hero-aides.*`
- `blog-hero-batterie.*`

Si les 3 sont présents → utilise-les (workflow `_dropzone/` standard : intégrer puis déplacer les originaux vers `_dropzone/corbeille/` à la fin).
Si aucun ou seulement une partie → bascule sur Option A pour combler les manquants.

### Étape 3 — Optimisation WebP (10 min)

Cible : **1600×900 pixels, format WebP, < 200 KB par fichier**.

1. Teste si `cwebp` est dispo : `which cwebp`.
   - Si présent : `cwebp -q 78 -resize 1600 900 /tmp/blog-hero-hub-raw.jpg -o public_html/blog/images/blog-hero-hub.webp` (idem pour les 2 autres).
   - Si absent : utilise `sips` (natif macOS) + un convertisseur WebP. Commandes :
     ```bash
     sips -Z 1600 /tmp/blog-hero-hub-raw.jpg --out /tmp/blog-hero-hub-resized.jpg
     # Conversion WebP via ImageMagick si dispo :
     magick /tmp/blog-hero-hub-resized.jpg -quality 78 public_html/blog/images/blog-hero-hub.webp
     ```
   - **Si ni cwebp ni magick ne sont dispos** : signale dans le rapport, garde les fichiers en `.jpg` (1600×900, qualité 80) optimisés via `sips`, ajoute une ligne dans « À faire côté Neil » → conversion WebP via https://squoosh.app à faire manuellement avant upload Hostinger.
2. Vérifie la taille finale : `ls -lh public_html/blog/images/` — chaque fichier doit faire < 250 KB (idéal < 200 KB).
3. Crée le dossier `public_html/blog/images/` AVANT toute écriture : `mkdir -p public_html/blog/images`.

### Étape 4 — Hub blog `public_html/blog/index.html` (15 min)

**Insertion HTML** : juste avant `<header class="blog-header">` (ou en background du header — tranche). Recommandation : nouveau bloc `<figure class="blog-hero blog-hero--hub">` placé entre `</aside>` (bandeau confiance) et `<header class="blog-header">`.

```html
<figure class="blog-hero blog-hero--hub">
  <img src="/blog/images/blog-hero-hub.webp" alt="Panneaux solaires photovoltaïques sur toiture résidentielle en Haute-Savoie" width="1600" height="900">
  <!-- Photo: <Auteur> on Unsplash -->
</figure>
```

**CSS à ajouter** (à coller dans le `<style>` du hub, après le bloc `.blog-header`) :

```css
.blog-hero {
  width: 100%;
  max-height: 420px;
  overflow: hidden;
  margin: 0;
  background: #1a1a1a;
}

.blog-hero img {
  width: 100%;
  height: 100%;
  max-height: 420px;
  object-fit: cover;
  display: block;
}

@media (max-width: 768px) {
  .blog-hero {
    max-height: 240px;
  }
  .blog-hero img {
    max-height: 240px;
  }
}
```

**Mise à jour `og:image` du hub** : remplacer la ligne actuelle (si elle existe) ou ajouter dans le bloc Open Graph :
```html
<meta property="og:image" content="https://blueenergie.fr/blog/images/blog-hero-hub.webp">
<meta property="og:image:width" content="1600">
<meta property="og:image:height" content="900">
<meta property="og:image:alt" content="Panneaux solaires photovoltaïques sur toiture en Haute-Savoie">
```

**Pas de modification du JSON-LD LocalBusiness existant** dans le hub (il décrit l'entreprise, pas un article).

### Étape 5 — Article aides solaires (15 min)

Fichier : `public_html/blog/2026-05-aides-solaires-avant-1er-juillet.html`

**5.1 — Preload dans le `<head>`** (à insérer juste avant le bloc `<style>`) :

```html
<link rel="preload" as="image" href="/blog/images/blog-hero-aides.webp">
```

**5.2 — Mise à jour Open Graph** (remplacer la ligne existante `<meta property="og:image" content="https://blueenergie.fr/images/blue-energie-photovoltaique.webp">`) :

```html
<meta property="og:image" content="https://blueenergie.fr/blog/images/blog-hero-aides.webp">
<meta property="og:image:width" content="1600">
<meta property="og:image:height" content="900">
<meta property="og:image:alt" content="Aides financières solaires 2026 : pièces euros et maquette de maison">
```

**5.3 — Mise à jour du JSON-LD Article** : ajouter la clé `"image"` (chaîne, URL absolue) dans le bloc `Article`, juste après `"description"` :

```json
"image": "https://blueenergie.fr/blog/images/blog-hero-aides.webp",
```

Le bloc final doit ressembler à :
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "...",
  "description": "...",
  "image": "https://blueenergie.fr/blog/images/blog-hero-aides.webp",
  "datePublished": "2026-05-17",
  ...
}
```

**5.4 — Insertion de l'image dans le `<body>`** : entre `</nav>` du breadcrumb (ligne ~591) et `<article class="post">` (ligne ~593) :

```html
<figure class="blog-hero">
  <img src="/blog/images/blog-hero-aides.webp" alt="Aides financières solaires 2026 : pièces euros empilées et maquette de maison" width="1600" height="900" fetchpriority="high">
  <!-- Photo: <Auteur> on Unsplash -->
</figure>
```

Note `fetchpriority="high"` : signal navigateur que cette image est critique (renforce le preload).

**5.5 — CSS à ajouter** dans le `<style>` de l'article (après `.breadcrumb { ... }` qui se trouve vers ligne 165) :

```css
.blog-hero {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  background: #1a1a1a;
  overflow: hidden;
}

.blog-hero img {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  display: block;
}

@media (max-width: 768px) {
  .blog-hero img {
    aspect-ratio: 16 / 10;
  }
}
```

### Étape 6 — Article batterie virtuelle (10 min)

Fichier : `public_html/blog/2026-05-batterie-virtuelle-attention-jpme.html`

Mêmes 5 sous-étapes que l'Étape 5, en remplaçant **partout** :
- `blog-hero-aides.webp` → `blog-hero-batterie.webp`
- alt → `Batterie domestique de stockage électrique et onduleur Solplanet pour autoconsommation solaire`
- og:image:alt → `Batterie de stockage électrique pour autoconsommation solaire`

### Étape 7 — Validation finale (10 min)

1. **Structure des fichiers images** :
   ```bash
   ls -lh public_html/blog/images/
   ```
   Doit afficher 3 fichiers `.webp` (ou `.jpg` si conversion WebP échouée et reportée), chacun < 250 KB.

2. **og:image distincts sur les 3 pages** :
   ```bash
   grep -h "og:image\"" public_html/blog/*.html | sort -u
   ```
   Doit retourner **3 URLs distinctes** (hub, aides, batterie). Si 2 lignes seulement → une page a été oubliée.

3. **JSON-LD `image` présent sur les 2 articles** :
   ```bash
   grep -c '"image":' public_html/blog/2026-05-aides-solaires-avant-1er-juillet.html
   grep -c '"image":' public_html/blog/2026-05-batterie-virtuelle-attention-jpme.html
   ```
   Chaque commande doit retourner au moins 1.

4. **Preload présent sur les 2 articles** :
   ```bash
   grep -c "rel=\"preload\" as=\"image\"" public_html/blog/2026-05-*.html
   ```
   Doit retourner 2.

5. **Pas de `loading="lazy"` sur le hero** :
   ```bash
   grep "blog-hero" public_html/blog/*.html | grep -i "lazy"
   ```
   Doit retourner **vide**.

6. **Alt non vide** :
   ```bash
   grep "blog-hero" public_html/blog/*.html | grep 'alt=""'
   ```
   Doit retourner **vide**.

7. Si l'option B (`_dropzone/`) a été utilisée : déplacer les originaux vers `_dropzone/corbeille/` :
   ```bash
   mv _dropzone/blog-hero-* _dropzone/corbeille/
   ```

### Étape 8 — Mise à jour table d'avancement (3 min)

1. Ouvrir `SESSIONS-CODE-A-VENIR.md`.
2. Mettre à jour la date d'en-tête : `## État d'avancement (mise à jour 2026-05-19)`.
3. Ajouter une nouvelle ligne dans le tableau, **juste après la ligne « Session 22 — Article 3e »** :
   ```
   | Session BLOG-IMAGES — Images en-tête hub + 2 articles | ✅ **DÉPLOYÉ** | `PROMPT-SESSION-BLOG-IMAGES.md` |
   ```
4. Vérification : `grep -c "BLOG-IMAGES.*DÉPLOYÉ" SESSIONS-CODE-A-VENIR.md` doit retourner 1.

### Étape 9 — Commit + push (5 min)

```bash
git add public_html/blog/images/ public_html/blog/index.html public_html/blog/2026-05-aides-solaires-avant-1er-juillet.html public_html/blog/2026-05-batterie-virtuelle-attention-jpme.html SESSIONS-CODE-A-VENIR.md
git commit -m "Session BLOG-IMAGES : images en-tête sur hub blog + 2 articles (og:image + JSON-LD image)"
git push origin main
```

Si l'option B a été utilisée, ajouter aussi `_dropzone/corbeille/` à `git add` (seulement si tracké — le `_dropzone/` est gitignored, donc en pratique rien à committer pour cette partie).

Si `git push` échoue pour auth : ne pas insister, le commit local reste valide, signaler dans le rapport « push manuel requis ».

## Décisions déjà prises (ne demande RIEN)

| Sujet | Décision |
|---|---|
| Dimensions hero affichage | 1600×900 (16:9) max, hauteur affichée max 420 px desktop / 240 px mobile |
| Dimensions og:image | 1600×900 (au-dessus de la spec OG minimale 1200×630, idéal pour LinkedIn) |
| Format | WebP qualité 78, fallback JPG si cwebp/magick absents |
| Poids cible | < 200 KB par image, max 250 KB toléré |
| Emplacement fichiers | `public_html/blog/images/` (nouveau dossier dédié) |
| Nommage | `blog-hero-hub.webp`, `blog-hero-aides.webp`, `blog-hero-batterie.webp` |
| Source par défaut | Option A — Unsplash (URLs proposées dans le prompt, fallback recherche si 404) |
| Crédit photo | Commentaire HTML adjacent à chaque `<img>` (non visible, traçabilité) |
| Preload | OUI sur les 2 articles, `fetchpriority="high"` sur l'`<img>` hero |
| Lazy-loading | NON sur le hero (anti-pattern LCP) |
| Alt | Descriptif obligatoire, jamais vide |
| Modification CSS existant | Aucune. On AJOUTE uniquement `.blog-hero { ... }` |
| Modification contenu rédactionnel | Aucune |
| og:image hub | Différent de l'og-image générique du site (image hub spécifique blog) |

## Interdictions strictes

- ❌ Ne touche PAS aux fichiers hors `public_html/blog/` (sauf `SESSIONS-CODE-A-VENIR.md` étape 8)
- ❌ Ne refactore PAS le CSS existant des 3 pages blog
- ❌ Ne réécris PAS le contenu rédactionnel des articles
- ❌ N'ajoute PAS `loading="lazy"` sur les images hero
- ❌ N'utilise PAS d'image avec un visage de personne identifiable (RGPD)
- ❌ N'invente PAS un auteur Unsplash si tu ne le vois pas sur la page source — note « Unsplash, auteur à vérifier » dans le rapport
- ❌ N'utilise PAS de service tiers (Cloudinary, Imgix…) — toutes les images sont auto-hébergées sur Hostinger
- ❌ Ne télécharge PAS d'image > 5 Mo en source (cap raisonnable, gros fichiers ralentissent l'opti)
- ❌ Ne crée PAS de nouvelle branche git, push direct main
- ❌ Ne pose AUCUNE question au user

## En cas de blocage

1. Diagnostique.
2. Tente 2 solutions (ex : autre photo Unsplash, autre outil d'opti).
3. Si toujours bloqué sur UN livrable (ex : conversion WebP impossible), garde le `.jpg` 1600×900 optimisé via `sips`, signale dans le rapport et liste la conversion WebP dans « À faire côté Neil ».
4. NE STOPPE PAS pour poser une question.

## Format du rapport final

```
## Rapport Session BLOG-IMAGES

### Source images utilisée
- Option A (Unsplash) / Option B (_dropzone) — préciser

### Fichiers créés
- public_html/blog/images/blog-hero-hub.webp (XXX KB, 1600×900) — Photo: <Auteur> on Unsplash (<URL source>)
- public_html/blog/images/blog-hero-aides.webp (XXX KB, 1600×900) — Photo: <Auteur> on Unsplash (<URL source>)
- public_html/blog/images/blog-hero-batterie.webp (XXX KB, 1600×900) — Photo: <Auteur> on Unsplash (<URL source>)

### Fichiers modifiés
- public_html/blog/index.html : +figure hero, +og:image dédié, +CSS .blog-hero
- public_html/blog/2026-05-aides-solaires-avant-1er-juillet.html : +preload, +figure hero, +og:image, +JSON-LD image, +CSS .blog-hero
- public_html/blog/2026-05-batterie-virtuelle-attention-jpme.html : idem
- SESSIONS-CODE-A-VENIR.md : ligne Session BLOG-IMAGES ✅ DÉPLOYÉ

### Vérifications passées
- ls public_html/blog/images/ : 3 fichiers, total XXX KB
- 3 og:image distincts : OK
- "image": présent dans 2 JSON-LD Article : OK
- preload présent sur 2 articles : OK
- Aucun lazy sur hero : OK
- Aucun alt vide : OK

### Git
- Branche : main
- Commit : <hash> — Session BLOG-IMAGES : images en-tête...
- Push : OK / manuel requis

### À faire côté Neil
1. Téléverser sur Hostinger via hPanel :
   - public_html/blog/images/ (dossier complet)
   - public_html/blog/index.html
   - public_html/blog/2026-05-aides-solaires-avant-1er-juillet.html
   - public_html/blog/2026-05-batterie-virtuelle-attention-jpme.html
2. Vider le cache Hostinger
3. Test rich results : https://search.google.com/test/rich-results (coller URL d'un article → vérifier image détectée)
4. Test partage OG : https://opengraph.xyz (coller URL d'un article → vérifier image affichée)
5. PageSpeed Insights mobile sur un article : LCP ≤ 2,5 s attendu

### Prochaine session recommandée
- Session 22 (Article 3e) — bénéficiera désormais d'un template d'image hero qu'on peut dupliquer
- OU correctif formulaire d'étude (demande dans brouillon perso de Neil)

### Blocages éventuels
(vide si tout OK, sinon détailler)
```

## === FIN PROMPT ===

---

## Notes hors prompt (pour Neil)

### Compression WebP : pourquoi squoosh.app si rien d'installé

`cwebp` (utilitaire CLI officiel WebP) n'est pas installé sur ton Mac (confirmé Session 9). `magick` (ImageMagick) n'est probablement pas non plus installé. Si Claude Code se rabat sur `sips` + livraison `.jpg`, fais une passe finale via https://squoosh.app **avant** de téléverser sur Hostinger :

1. Ouvrir squoosh.app dans un navigateur (100 % côté client, rien n'est envoyé sur un serveur).
2. Glisser-déposer le `.jpg` produit par Claude Code.
3. Côté droit, choisir « WebP » et qualité ~78.
4. Télécharger le `.webp` résultant.
5. Renommer en `blog-hero-XXX.webp` et le mettre à la place du `.jpg` avant upload Hostinger.

Si tu veux installer `cwebp` proprement une fois pour toutes : `brew install webp` (nécessite Homebrew). Pour la durée de cette session, ce n'est pas nécessaire.

### RGPD images

Les 3 URLs Unsplash proposées sont volontairement choisies sans visage identifiable :
- Hub : panneaux + toit, pas de personne ;
- Aides : pièces de monnaie, pas de personne ;
- Batterie : équipement électrique, pas de personne.

Si une fallback Unsplash montre clairement quelqu'un, refuse-la et choisis-en une autre — pas de risque à prendre, même sur du libre de droits.

### Cohérence avec les conventions Q5 / Q6 (QUESTIONS-OUVERTES Sessions 20+)

Le portrait Neil et la bio courte (cases Q5 et Q6 dans `QUESTIONS-OUVERTES.md` § Actions Neil) **ne sont PAS utilisés cette session** — ce sont des images thématiques de hero, pas un bloc auteur. La photo portrait `_dropzone/photo portrait Neil lothian.jpeg` reste dispo pour une session ultérieure dédiée au bloc auteur en pied d'article.

### Future itération possible

- Ajouter un système `<picture>` avec `<source>` AVIF + WebP pour gagner ~15 % de poids supplémentaire (AVIF support 95 %+ en 2026). Pas indispensable pour cette session.
- Générer des variantes responsives (`srcset`) 800w / 1200w / 1600w pour servir une image plus légère en mobile. Idem, pas pour cette session.
- Si Neil veut un titre overlay sur l'image du hub (par ex. « Blog Blue Energie » en grand sur fond panneaux), c'est une variante CSS du `.blog-hero--hub` à voir en V2.

### Liens utiles pour test post-déploiement

- Rich Results Test (Google) : https://search.google.com/test/rich-results
- OpenGraph debug : https://opengraph.xyz
- LinkedIn Post Inspector : https://www.linkedin.com/post-inspector/
- Facebook Sharing Debugger : https://developers.facebook.com/tools/debug/
- PageSpeed Insights : https://pagespeed.web.dev/
