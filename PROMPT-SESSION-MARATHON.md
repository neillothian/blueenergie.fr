# 🎓 Fiche de révision — Session MARATHON : enchaînement de toutes les tâches autonomes restantes

> À lire AVANT de lancer le prompt dans Claude Code. Objectif : comprendre la stratégie, accepter le risque de dérive, et savoir où couper si besoin.

Cette **méga-session** rassemble en un seul prompt l'enchaînement des 9 sessions de code autonomes restantes (celles qui ne dépendent pas de clés API ou d'assets que Neil doit encore fournir). Charge cumulée estimée : **10 à 14 heures de dev**, soit bien au-delà de ce qui rentre confortablement dans une seule session Claude Code (le contexte devient saturé, la qualité chute, le risque d'erreur monte). Pour rendre l'exercice viable, le prompt impose **un commit + push après chaque sous-session terminée** : le travail livré est préservé même si le dev doit s'arrêter en cours. Le dev a explicitement l'autorisation de **clôturer après n'importe quel checkpoint** en signalant ce qui reste — il vaut mieux livrer 5 sous-sessions propres que 9 bâclées.

## Stratégie d'exécution

L'ordre choisi minimise les dépendances :

1. **Session 14** — JSON-LD + sitemap + robots.txt *(SEO technique, déclencheur de rich snippets)*
2. **Session 18-FIX** — diagnostic + correctif bandeau confiance *(le rendu visuel actuel est KO)*
3. **Session 7** — finition galerie *(loading=lazy + renommage assets Mylight → libellés génériques)*
4. **Mini-compression images** — 5 images > 250 KB via sips *(perf PageSpeed +5-10 points)*
5. **Session 8** — extraction CSS/JS séparés *(prérequis structurel de la 11)*
6. **Session 11** — système de partials header/footer *(prérequis de la 12)*
7. **Session 12** — 4 pages internes (installation, matériel, réalisations, contact)
8. **Session 13** — page aides 2026 avec mini-simulateur JS
9. **Session 15** — hub zones d'intervention + 1 page géo modèle (Annecy)

**Optionnel si encore du contexte** :
10. **Session 16** — 9 autres pages géo (Annemasse, St-Julien-en-Genevois, Chambéry, La Roche-sur-Foron + Tier B/C)
11. **Session 22** — 3e article blog

## Ce que tu vas voir passer dans le prompt

- **Plusieurs concepts dev clés enchaînés** : JSON-LD Schema.org, sitemap.xml, robots.txt, refactoring CSS/JS, système de partials JavaScript (fetch d'inclusion côté client), templating de pages géolocalisées, breadcrumbs SEO.
- **`fetch()` pour les partials** : technique de templating côté navigateur sans framework. Le HTML d'une page contient `<div id="header"></div>`, un script `fetch('/partials/header.html')` injecte le contenu au chargement. Pas idéal pour SEO si fait tardivement (le crawler peut ne pas l'attendre), donc on injecte SYNCHRONEMENT au tout début du `<body>`.
- **Compression images via `sips`** : `sips -s formatOptions 75` réduit la qualité JPEG/WebP. Sur WebP, on peut perdre 50 % du poids sans dégradation visuelle perceptible.
- **Pages géolocalisées (Tier A/B/C)** : convention SEO local — Tier A = villes-hub à fort contenu (600-800 mots), Tier B = villages hyperlocaux (300-400 mots), Tier C = villes secondaires (400-500 mots). JSON-LD `LocalBusiness` adapté à chaque ville (`areaServed` ciblé).
- **Système de breadcrumbs JSON-LD** : balise `BreadcrumbList` Schema.org qui fait apparaître le fil d'ariane dans la SERP Google. Très bon pour le taux de clic.
- **Simulateur JS sans backend** : page `/aides-2026.html` avec un mini-calculateur (puissance kWc → fourchette d'aides). Lookup table figée en JS, pas d'API. 100 % RGPD.

## Pièges à anticiper

- **Saturation du contexte** : à partir de la sous-session 5-6, la lecture des fichiers + leurs modifs cumulées peuvent saturer la fenêtre de contexte. Le dev DOIT s'arrêter proprement si la qualité de raisonnement chute. Mieux vaut 6 sous-sessions livrées qu'un crash à la 9e.
- **Conflit git multi-sessions** : si une autre instance Claude Code tourne en parallèle, `git pull --rebase` peut se déclencher entre 2 sous-sessions. C'est prévu — le dev doit traiter au cas par cas.
- **Compression images destructive** : sips écrase le fichier source par défaut. Le prompt impose une vérification visuelle des dimensions avant d'écraser (et un backup).
- **Système de partials qui casse le rendu** : si le `fetch()` échoue (404 sur le partial, erreur réseau), la page reste vide en haut. Le prompt impose un fallback HTML statique avec le contenu critique (logo + nav minimale) qui s'affiche pendant le fetch.
- **Pages géo dupliquées = pénalité SEO** : il ne faut PAS copier-coller le même texte avec juste le nom de ville changé. Chaque page doit avoir au moins 30 % de contenu unique (ensoleillement local, particularités architecturales, contact local si dispo).
- **Bandeau confiance Session 18** : le bug visuel est probablement lié à l'ordre d'empilement avec la navbar sticky ou à un float qui casse le flux. Diagnostic par lecture de la prod + comparaison avec le rendu attendu.

## Mini-quiz d'auto-vérification

1. Pourquoi est-ce que le système de partials avec `fetch()` JavaScript peut **dégrader le SEO** s'il est mal implémenté, alors que le contenu finit par s'afficher ?
2. Pour les pages géo (`/zones/annecy.html`, `/zones/chambery.html`...), pourquoi est-ce qu'on ne peut pas se contenter de dupliquer 10 fois le même HTML avec juste le nom de ville changé ?
3. Si la sous-session 5 (extraction CSS/JS) modifie l'ordre de chargement de tarteaucitron.js dans le `<head>`, qu'est-ce qui peut casser dans le bandeau cookies ?

## Pour aller plus loin (optionnel)

- Partials sans framework — patterns d'inclusion côté client : https://web.dev/articles/html-imports
- SEO local — guide Tier A/B/C : https://moz.com/learn/seo/local
- Schema.org BreadcrumbList : https://schema.org/BreadcrumbList
- Hellio — barème prime à l'autoconsommation 2026 : https://www.hellio.com/actualites/reglementation/arrete-tarifaire-photovoltaique

---



# Prompt Session MARATHON — enchaînement final autonome

> **Enchaîner 9 sous-sessions de dev (10-14h estimées) avec commit + push après chacune. Stratégie fail-soft : le dev s'arrête après n'importe quel checkpoint et signale ce qui reste si nécessaire.**
> Périmètre : ~25 fichiers HTML + 2 fichiers CSS/JS extraits + dossier `partials/` + dossier `zones/` + `sitemap.xml` + `robots.txt` + maj `SESSIONS-CODE-A-VENIR.md` à chaque étape.
> Durée estimée : 10-14 h. Aucune question au user pendant l'exécution.

---

## Mode d'emploi (côté Neil)

1. Ouvre un terminal
2. `cd "/Users/neillothian/Documents/Claude/Projects/blueenergie.fr"`
3. Lance Claude Code : `claude`
4. Copie-colle tout ce qui est entre `=== DÉBUT PROMPT ===` et `=== FIN PROMPT ===`
5. Laisse tourner. Le dev push après chaque sous-session, tu peux **uploader sur Hostinger au fil de l'eau** (un dossier par étape) sans attendre la fin.
6. **Si le dev s'arrête en cours**, son rapport listera précisément ce qui reste — on relancera un PROMPT-SESSION-MARATHON-2 avec uniquement les sous-sessions restantes.

---

## === DÉBUT PROMPT ===

Tu es développeur web senior **polyvalent** (SEO technique, refactoring, templating, contenu). Tu travailles sur **blueenergie.fr** (installation photovoltaïque résidentielle en Haute-Savoie). Stack : HTML/CSS/JS pur. Hébergement Hostinger. Mac local — `sips` natif macOS disponible.

**État du site au démarrage** :
- Sessions 1+2+3+4+5+6+9+Blog déployées en prod
- Session 18 déployée mais **rendu visuel KO** (bandeau confiance casse la mise en page — un fix navbar fixed→sticky a été tenté commit `ea765ea` mais insuffisant)
- 9 pages publiques : `/`, `/merci.html`, `/blog/`, 2 articles blog, 3 pages légales
- Favicon + Open Graph + GA4 conditionnel via tarteaucitron déployés
- Place ID Google Business confirmé : `ChIJHUKhFuCfDykRkkLTeN-wm3c` (utilisable mais clé Places API pas encore fournie → Session 17 toujours bloquée, hors scope MARATHON)

## Ta mission

Enchaîner **9 sous-sessions** dans l'ordre ci-dessous, avec **commit + push après chacune** (un commit = une sous-session = un message clair). Tu mets à jour `SESSIONS-CODE-A-VENIR.md` à chaque sous-session terminée (statut → ✅ DÉPLOYÉ).

**Stratégie fail-soft** : si une sous-session pose un problème non résoluble en 15 min, tu la marques « ⚠️ Partiel — à reprendre » dans `SESSIONS-CODE-A-VENIR.md`, tu commit + push ce qui est fait, et tu passes à la suivante. Tu NE BLOQUES PAS l'exécution sur une difficulté isolée.

**Stratégie checkpoint** : à partir de la 5e sous-session, **évalue ton propre état de contexte** avant de continuer. Si tu sens que la qualité de tes réponses commence à dégrader (oublis, hallucinations, lenteur), **arrête-toi proprement** au checkpoint courant, écris le rapport final avec ce qui reste, et termine. Mieux vaut 5 sous-sessions propres que 9 bâclées.

Durée estimée : 10-14 h. Aucune question au user.

## Workflow obligatoire — Étape 0 : Initialisation (5 min)

1. TodoWrite avec **11 tâches** : init, sous-session 14, 18-FIX, 7, compression, 8, 11, 12, 13, 15, rapport final
2. `git pull origin main --rebase` — si échec : diagnostique, ne continue pas
3. `git status` doit retourner « nothing to commit, working tree clean »
4. Backup global du site avant la marathon :
   ```bash
   tar czf "/tmp/blueenergie-pre-marathon-$(date +%Y%m%d-%H%M).tar.gz" public_html/
   echo "Backup tar : /tmp/blueenergie-pre-marathon-*.tar.gz"
   ```

---

## SOUS-SESSION 1 — Session 14 : JSON-LD LocalBusiness + sitemap.xml + robots.txt (~1 h)

### Lecture rapide

`PROMPT-SESSION-14.md` existe à la racine — **lis-le intégralement** et exécute toutes les étapes 2 à 7 décrites dedans, en respectant à la lettre les blocs JSON-LD et le sitemap.

### Commit & push de cette sous-session

```bash
git add public_html/index.html public_html/merci.html public_html/blog/*.html public_html/mentions-legales.html public_html/cgv.html public_html/politique-confidentialite.html public_html/sitemap.xml public_html/robots.txt SESSIONS-CODE-A-VENIR.md
git commit -m "Session 14 : JSON-LD LocalBusiness + WebSite + sitemap.xml + robots.txt"
git push origin main
```

Maj `SESSIONS-CODE-A-VENIR.md` → ligne Session 14 = `✅ **DÉPLOYÉ** | PROMPT-SESSION-14.md`.

**Checkpoint 1 → continue avec la sous-session 2 ci-dessous.**

---

## SOUS-SESSION 2 — Session 18-FIX : correctif bandeau confiance (~45 min)

### Diagnostic

1. **Recharger l'état actuel** : `cat public_html/index.html | grep -A 30 'bandeau-confiance'` pour repérer le bloc HTML.
2. **Lire le CSS courant** : `cat public_html/assets/css/bandeau-confiance.css`.
3. **Comparer avec la navbar** : `grep -B 2 -A 30 '<nav' public_html/index.html | head -50`.
4. **Hypothèses probables du bug** (par ordre de fréquence) :
   - La navbar est `position: fixed` → le bandeau s'insère sous mais est masqué par le contenu hero qui colle au top
   - La navbar est `position: sticky` mais le bandeau ne respecte pas l'ordre des z-index
   - Les emojis (🛡️ 🏢 ★) s'affichent mal sur certains OS (Windows/Linux)
   - Le `grid-template-columns: repeat(4, 1fr)` casse car un item dépasse de sa cellule (texte trop long)
   - Le fond `#f5f9fb` est invisible sur un fond gris pré-existant

### Correctif standard à appliquer

Modifier `public_html/assets/css/bandeau-confiance.css` :

```css
/* Bandeau de confiance — Session 18 FIX */
.bandeau-confiance {
  background: #ffffff;                    /* Fond pur pour contraste maximal */
  border-bottom: 2px solid #4fc7ef;      /* Bordure colorée Blue Energie pour visibilité */
  padding: 0.75rem 1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 0.875rem;
  color: #1a3a4a;
  position: relative;
  z-index: 10;                            /* Au-dessus du contenu hero */
  box-shadow: 0 2px 4px rgba(0,0,0,0.05); /* Petite ombre pour le détacher du hero */
}

.bandeau-confiance__inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  align-items: center;
}

.bandeau-confiance__item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  min-width: 0;
}

.bandeau-confiance__item img {
  height: 40px;                            /* Logo QualiPV plus visible */
  width: auto;
  flex-shrink: 0;
}

.bandeau-confiance__item-icon {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #4fc7ef;                     /* Picto sur badge coloré pour lisibilité */
  color: #ffffff;
  font-size: 1rem;
  line-height: 1;
  border-radius: 50%;
  font-weight: bold;
}

.bandeau-confiance__item-text {
  font-weight: 600;
  line-height: 1.2;
  word-break: keep-all;
  font-size: 0.85rem;
}

.bandeau-confiance__item-text small {
  display: block;
  font-weight: 400;
  font-size: 0.72rem;
  color: #6b8493;
  margin-top: 0.2rem;
}

.bandeau-confiance__item--placeholder {
  opacity: 0.6;
  font-style: italic;
}

@media (max-width: 767px) {
  .bandeau-confiance__inner {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem 1rem;
  }
  .bandeau-confiance {
    font-size: 0.8rem;
    padding: 0.5rem 0.75rem;
  }
  .bandeau-confiance__item img {
    height: 28px;
  }
  .bandeau-confiance__item-icon {
    width: 22px;
    height: 22px;
    font-size: 0.85rem;
  }
}

@media (max-width: 380px) {
  .bandeau-confiance__inner {
    grid-template-columns: 1fr;
    gap: 0.4rem;
  }
}
```

**Changements clés** :
- Fond blanc + bordure cyan = haute visibilité quelle que soit la page
- `z-index: 10` + `position: relative` = au-dessus de tout, pas masqué par hero
- Pictos transformés en badges ronds colorés (texte → fond cyan, rond) = pro et lisible
- Logo plus grand (40px desktop / 28px mobile)

Remplace **intégralement** le contenu de `public_html/assets/css/bandeau-confiance.css` par le bloc ci-dessus.

### Commit & push

```bash
git add public_html/assets/css/bandeau-confiance.css SESSIONS-CODE-A-VENIR.md
git commit -m "Session 18 FIX : bandeau confiance redesign (fond blanc + badges ronds + z-index 10)"
git push origin main
```

Maj `SESSIONS-CODE-A-VENIR.md` → ligne Session 18 = `✅ **DÉPLOYÉ** (correctif appliqué) | PROMPT-SESSION-18.md`.

**Checkpoint 2 → continue avec la sous-session 3 ci-dessous.**

---

## SOUS-SESSION 3 — Session 7 : finition galerie réalisations (~1 h)

### Travail

1. **Localiser la galerie** dans `public_html/index.html` : rechercher la section `<section id="realisations">` ou `<section id="galerie">`.

2. **Renommer les 2 fichiers images Mylight** (décision figée dans `QUESTIONS-OUVERTES.md` § Session 7) :
   ```bash
   git mv public_html/images/Mylight-crystal-400wc-sur-toiture-asymetrique.webp public_html/images/realisation-fullblack-400wc.webp
   git mv public_html/images/mylight-bifaciaux-425Wc-sur-toit-provencal.webp public_html/images/realisation-bifaciaux-425wc.webp
   ```

3. **Mettre à jour les références HTML/CSS** :
   ```bash
   grep -rln "Mylight-crystal-400wc-sur-toiture-asymetrique\|mylight-bifaciaux-425Wc-sur-toit-provencal" public_html/
   ```
   Pour chaque fichier qui matche, remplacer :
   - `Mylight-crystal-400wc-sur-toiture-asymetrique.webp` → `realisation-fullblack-400wc.webp`
   - `mylight-bifaciaux-425Wc-sur-toit-provencal.webp` → `realisation-bifaciaux-425wc.webp`
   - Et adapter les libellés visibles selon `QUESTIONS-OUVERTES.md` :
     - « Panneaux full-black 400 Wc sur toiture asymétrique »
     - « Panneaux bifaciaux 425 Wc sur toit provençal »
   - Aucune mention « Mylight » nulle part

4. **Ajouter `loading="lazy"` sur TOUTES les balises `<img>` de la galerie réalisations** dans `index.html` (ne pas toucher au logo ou à l'image hero qui restent eager).

5. **Vérifier** :
   ```bash
   grep -c 'Mylight' public_html/*.html public_html/blog/*.html
   # Doit retourner 0 partout
   grep -c 'loading="lazy"' public_html/index.html
   # Doit retourner au minimum 5-7 (toutes les images de la galerie)
   ```

### Commit & push

```bash
git add public_html/index.html public_html/images/realisation-fullblack-400wc.webp public_html/images/realisation-bifaciaux-425wc.webp SESSIONS-CODE-A-VENIR.md
git commit -m "Session 7 : finition galerie (loading=lazy + renommage assets Mylight → réalisations)"
git push origin main
```

Maj `SESSIONS-CODE-A-VENIR.md` → ligne Session 7 = `✅ **DÉPLOYÉ** | PROMPT-SESSION-MARATHON.md`.

**Checkpoint 3 → continue avec la sous-session 4 ci-dessous.**

---

## SOUS-SESSION 4 — Mini-compression images (~30 min)

### Travail

5 images > 250 KB à compresser via `sips` (qualité 75-80, format WebP préservé) :

```bash
SRCDIR=public_html/images
# Backup ciblé avant écrasement
mkdir -p /tmp/img-backup
cp "$SRCDIR/blue-energie-photovoltaique.webp" /tmp/img-backup/
cp "$SRCDIR/paysage-sur-tuile-mecanique-exposition-est_ouest.webp" /tmp/img-backup/
cp "$SRCDIR/toit-plat-0-degre.webp" /tmp/img-backup/
cp "$SRCDIR/Toit-goudron.webp" /tmp/img-backup/
cp "$SRCDIR/portrait-techicien.webp" /tmp/img-backup/

# Compression — sips ne supporte pas WebP en sortie directe, on passe par JPEG
# Approche : re-export WebP via étape PNG → JPG q80, garder le .webp comme nom (Hostinger sert le bon mime)
# Note : si sips échoue sur WebP en entrée, on garde l'original et on signale

for IMG in \
  "blue-energie-photovoltaique.webp" \
  "paysage-sur-tuile-mecanique-exposition-est_ouest.webp" \
  "toit-plat-0-degre.webp" \
  "Toit-goudron.webp" \
  "portrait-techicien.webp" \
; do
  echo "=== Compression $IMG ==="
  SIZE_BEFORE=$(stat -f%z "$SRCDIR/$IMG")
  # Étape 1 : convertir WebP → PNG temporaire
  sips -s format png "$SRCDIR/$IMG" --out "/tmp/${IMG%.webp}.png" 2>&1 | tail -3
  # Étape 2 : recompresser PNG → JPEG q=80 et resize à max 1600px largeur
  sips --resampleWidth 1600 -s format jpeg -s formatOptions 80 "/tmp/${IMG%.webp}.png" --out "/tmp/${IMG%.webp}.jpg" 2>&1 | tail -3
  # Étape 3 : remettre l'extension .webp (Hostinger sert avec le bon Content-Type basé sur le contenu)
  # ATTENTION : ce n'est pas idéal — préférer une vraie sortie WebP via cwebp si installé
  if command -v cwebp >/dev/null 2>&1; then
    cwebp -q 78 "/tmp/${IMG%.webp}.png" -o "$SRCDIR/$IMG" 2>&1 | tail -3
  else
    # Fallback : on garde le JPEG mais renomme en .jpg et on signalera de mettre à jour les références HTML
    # → trop risqué, on SKIP cette image et on signale
    echo "WARN: cwebp non installé, image $IMG non compressée (gardée à l'original)"
    rm -f "/tmp/${IMG%.webp}.png" "/tmp/${IMG%.webp}.jpg"
    continue
  fi
  rm -f "/tmp/${IMG%.webp}.png" "/tmp/${IMG%.webp}.jpg"
  SIZE_AFTER=$(stat -f%z "$SRCDIR/$IMG")
  echo "  $IMG : $SIZE_BEFORE → $SIZE_AFTER bytes"
done
```

**Si `cwebp` n'est pas installé** sur le Mac : signaler dans le rapport, ne pas tenter d'installer Homebrew. Neil le fera manuellement via squoosh.app (mode d'emploi déjà dans `PROMPT-SESSION-9.md` § Notes hors prompt).

### Commit & push

Si au moins 1 image compressée :
```bash
git add public_html/images/*.webp SESSIONS-CODE-A-VENIR.md
git commit -m "Mini-session : compression images > 250 KB via cwebp q=78 + resize max 1600px"
git push origin main
```

Si `cwebp` indisponible (rien à commit côté images) :
- Ajouter une ligne dans `SESSIONS-CODE-A-VENIR.md` : `| Mini-session compression images | ⚠️ cwebp non installé sur Mac, à faire via squoosh.app | — |`
- Commit + push juste le .md

**Checkpoint 4 → ÉVALUE ton état de contexte avant de continuer. Si tu sens que tu commences à fatiguer, arrête ici et écris le rapport final.**

---

## SOUS-SESSION 5 — Session 8 : extraction CSS/JS séparés (~1 h 30)

### Travail

1. **Créer la structure** :
   ```bash
   mkdir -p public_html/assets/css public_html/assets/js
   ```

2. **Extraire le CSS inline d'`index.html`** :
   - Localiser le bloc `<style>...</style>` dans `public_html/index.html` (probablement très long)
   - Copier tout son contenu dans un nouveau fichier `public_html/assets/css/main.css`
   - Remplacer dans `index.html` le bloc `<style>...</style>` par `<link rel="stylesheet" href="/assets/css/main.css">`
   - Important : **garder** le `<link rel="stylesheet" href="/assets/css/bandeau-confiance.css">` qui existe déjà (Session 18-FIX)

3. **Extraire le JS inline d'`index.html`** :
   - Localiser TOUS les blocs `<script>...</script>` qui ne sont PAS des `<script src="...">` (externes) ET qui ne sont PAS des `<script type="application/ld+json">` (Schema) ET qui ne sont PAS le `<script>` tarteaucitron/init.js
   - Concrètement, chercher du JS « métier » (handlers, animations, etc.) — il peut ne pas y en avoir si le site est mostly statique
   - Si du JS métier existe : copier dans `public_html/assets/js/main.js` et remplacer par `<script src="/assets/js/main.js" defer></script>` avant `</body>`
   - Si aucun JS métier : skip cette étape, juste signaler dans le rapport

4. **Faire pareil pour `merci.html`** : créer `public_html/assets/css/merci.css` et `public_html/assets/js/merci.js` si pertinent, ou utiliser `main.css` partagé si le CSS de merci.html est trivial.

5. **Ne PAS toucher aux pages blog, légales, politique** : leur CSS inline reste, on extrait progressivement (hors scope marathon).

6. **Vérifier** que le rendu visuel d'`index.html` reste identique :
   ```bash
   ls -la public_html/assets/css/main.css
   wc -l public_html/index.html  # doit être nettement plus court qu'avant
   grep -c '<style>' public_html/index.html  # doit être 0 ou 1 (si on garde un mini-style pour critical CSS)
   ```

### Commit & push

```bash
git add public_html/assets/css/ public_html/assets/js/ public_html/index.html public_html/merci.html SESSIONS-CODE-A-VENIR.md
git commit -m "Session 8 : extraction CSS/JS d'index et merci vers assets/ (deduplication)"
git push origin main
```

Maj `SESSIONS-CODE-A-VENIR.md` → ligne Session 8 = `✅ **DÉPLOYÉ** (partiel : index + merci, blog/légal hors scope) | PROMPT-SESSION-MARATHON.md`.

**Checkpoint 5 → continue ou stop selon contexte.**

---

## SOUS-SESSION 6 — Session 11 : système de partials header/footer (~2 h)

### Travail

1. **Créer le dossier** :
   ```bash
   mkdir -p public_html/partials
   ```

2. **Créer `public_html/partials/header.html`** avec le HTML du `<header>` + `<nav>` actuels d'`index.html` (sans le bandeau confiance — il reste statique dans chaque page parce que il est SEO-sensitif).

3. **Créer `public_html/partials/footer.html`** avec le HTML du `<footer>` actuel d'`index.html`, **liens légaux inclus** (Session 4).

4. **Créer `public_html/assets/js/partials-loader.js`** :
   ```javascript
   /* Loader de partials — blueenergie.fr */
   (function () {
     function inject(targetId, partialPath) {
       const target = document.getElementById(targetId);
       if (!target) return;
       fetch(partialPath)
         .then(r => r.ok ? r.text() : Promise.reject(r.status))
         .then(html => { target.innerHTML = html; })
         .catch(err => console.error('Partial load failed:', partialPath, err));
     }
     // Charge immédiatement, sans attendre DOMContentLoaded (le script est en defer dans le head)
     inject('site-header', '/partials/header.html');
     inject('site-footer', '/partials/footer.html');
   })();
   ```

5. **Refactorer `index.html`** :
   - Remplacer le bloc `<header>...</header>` par `<div id="site-header"></div>` + commentaire de fallback `<!-- header chargé via /partials/header.html -->`
   - Remplacer le bloc `<footer>...</footer>` par `<div id="site-footer"></div>`
   - Ajouter dans le `<head>` après `main.css` : `<script src="/assets/js/partials-loader.js" defer></script>`

6. **NE PAS refactorer les autres pages dans cette sous-session** — ce sera Session 12 qui les crée déjà avec les divs `#site-header` / `#site-footer`. Les pages existantes (merci, blog, légales) restent statiques pour l'instant (refactor optionnel ultérieur).

7. **Test visuel** : rendre la page en local via `open public_html/index.html` (si possible) — header + footer doivent s'injecter au chargement.

### Commit & push

```bash
git add public_html/partials/ public_html/assets/js/partials-loader.js public_html/index.html SESSIONS-CODE-A-VENIR.md
git commit -m "Session 11 : partials header/footer + loader JS (refactor index.html uniquement)"
git push origin main
```

Maj `SESSIONS-CODE-A-VENIR.md` → ligne Session 11 = `✅ **DÉPLOYÉ** (index uniquement, autres pages refactor ultérieur) | PROMPT-SESSION-MARATHON.md`.

**Checkpoint 6 → STOP si contexte saturé.**

---

## SOUS-SESSION 7 — Session 12 : pages internes (installation, matériel, réalisations, contact) (~2 h)

### Travail

Créer 4 nouvelles pages dans `public_html/` :

1. **`installation-photovoltaique.html`** : contenu = section process actuelle de `index.html` (étapes 1-5 d'un projet) + détails (durée chantier, démarches Enedis, mise en service).

2. **`materiel-panneaux-solaires.html`** : contenu = section `#materiel` mise à jour Session 6 (JA Solar / Solplanet / K2 / Tigo) + détails techniques + liens fiches PDF (si présents).

3. **`realisations.html`** : galerie complète avec toutes les cartes (à reprendre d'`index.html`), plus de cartes potentielles, mêmes images.

4. **`contact.html`** : formulaire long déplacé ici (à reprendre d'`index.html` ou de la zone formulaire). Plus la carte OSM Session 3.

### Convention pour chaque page

- DOCTYPE + lang=fr + meta description spécifique + Open Graph spécifique + JSON-LD LocalBusiness (reprise du bloc Session 14)
- Structure : `<div id="site-header"></div>` + `<aside class="bandeau-confiance">...</aside>` (HTML statique, repris d'index) + contenu principal + `<div id="site-footer"></div>`
- Script `partials-loader.js` dans le `<head>`
- Lien CSS `main.css` + `bandeau-confiance.css`
- Tag tarteaucitron + init.js
- Favicon + manifest

### Mise à jour navbar

Dans `public_html/partials/header.html` : adapter les liens de la navbar pour pointer vers ces 4 nouvelles pages internes (au lieu d'ancres `#materiel`, `#realisations`, etc. qui ne marchent que sur l'accueil).

### Sitemap

Ajouter les 4 nouvelles URLs dans `public_html/sitemap.xml` (juste après l'accueil, priority 0.8) :
```xml
<url><loc>https://blueenergie.fr/installation-photovoltaique.html</loc><lastmod>2026-05-17</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>
<url><loc>https://blueenergie.fr/materiel-panneaux-solaires.html</loc><lastmod>2026-05-17</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>
<url><loc>https://blueenergie.fr/realisations.html</loc><lastmod>2026-05-17</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>
<url><loc>https://blueenergie.fr/contact.html</loc><lastmod>2026-05-17</lastmod><changefreq>monthly</changefreq><priority>0.9</priority></url>
```

### Commit & push

```bash
git add public_html/installation-photovoltaique.html public_html/materiel-panneaux-solaires.html public_html/realisations.html public_html/contact.html public_html/partials/header.html public_html/sitemap.xml SESSIONS-CODE-A-VENIR.md
git commit -m "Session 12 : 4 pages internes (installation, matériel, réalisations, contact) + navbar partial + sitemap"
git push origin main
```

Maj `SESSIONS-CODE-A-VENIR.md` → ligne Session 12 = `✅ **DÉPLOYÉ** | PROMPT-SESSION-MARATHON.md`.

**Checkpoint 7 → STOP si contexte saturé. Si tu continues, lis les sous-sessions 8 et 9 avec d'autant plus d'attention.**

---

## SOUS-SESSION 8 — Session 13 : page aides 2026 + mini-simulateur JS (~1 h 30)

### Travail

Créer `public_html/aides-2026.html` :
- Structure standard (header partial, bandeau confiance, footer partial)
- Sections principales :
  - **H1** : « Aides solaires 2026 — Haute-Savoie »
  - **Intro** : 3 paragraphes contextualisant les aides 2026 (lien vers article blog `2026-05-aides-solaires-avant-1er-juillet.html` pour détails)
  - **Tableau des aides** : Prime à l'autoconsommation (80 €/kWc avant 1er juillet, supprimée après), Tarif rachat surplus (4 c€/kWh avant, 1,1 c€/kWh après), TVA réduite 10 % (≤ 3 kWc résidence principale), MaPrimeRénov' (info générale)
  - **Mini-simulateur JS** :
    ```html
    <section id="simulateur">
      <h2>Estimez vos aides</h2>
      <label for="puissance">Puissance souhaitée :</label>
      <select id="puissance">
        <option value="3">3 kWc</option>
        <option value="6" selected>6 kWc</option>
        <option value="9">9 kWc</option>
        <option value="12">12 kWc</option>
      </select>
      <button onclick="calculer()">Calculer</button>
      <div id="resultat"></div>
    </section>
    <script>
    const BAREME = {
      3: { prime: 240, tva: 'TVA 10 %', surplus: 120 },
      6: { prime: 480, tva: 'TVA 20 %', surplus: 240 },
      9: { prime: 720, tva: 'TVA 20 %', surplus: 360 },
      12: { prime: 960, tva: 'TVA 20 %', surplus: 480 }
    };
    function calculer() {
      const p = parseInt(document.getElementById('puissance').value, 10);
      const b = BAREME[p];
      document.getElementById('resultat').innerHTML = `
        <p><strong>Pour ${p} kWc (signature avant le 1er juillet 2026)</strong></p>
        <ul>
          <li>Prime à l'autoconsommation : ${b.prime} € (sur 5 ans)</li>
          <li>Rachat du surplus (annuel estimé) : ${b.surplus} €</li>
          <li>${b.tva}</li>
        </ul>
        <p><em>Valeurs indicatives à date du 17/05/2026. <a href="/#study-request">Contactez-nous pour une estimation personnalisée.</a></em></p>
      `;
    }
    </script>
    ```
- Disclaimer obligatoire à afficher (cf. décision figée dans `QUESTIONS-OUVERTES.md` § Session 13)

### Sitemap + navbar

- Ajouter URL dans `sitemap.xml` (priority 0.7)
- Ajouter lien dans `partials/header.html` : « Aides »

### Commit & push

```bash
git add public_html/aides-2026.html public_html/sitemap.xml public_html/partials/header.html SESSIONS-CODE-A-VENIR.md
git commit -m "Session 13 : page aides-2026 + mini-simulateur JS (lookup table figée)"
git push origin main
```

Maj `SESSIONS-CODE-A-VENIR.md` → ligne Session 13 = `✅ **DÉPLOYÉ** | PROMPT-SESSION-MARATHON.md`.

**Checkpoint 8 → STOP si fatigue contexte.**

---

## SOUS-SESSION 9 — Session 15 : hub zones d'intervention + page modèle Annecy (~1 h 30)

### Travail

1. **Créer** `public_html/zones-intervention.html` :
   - Structure standard
   - H1 « Zones d'intervention Blue Energie »
   - Texte d'intro (Haute-Savoie 74 + Savoie 73 + Ain 01 + Isère 38)
   - Carte OSM élargie (reprendre la balise iframe Session 3, élargir le bbox pour englober les 4 départements)
   - Liste des 5 villes Tier A (cf. `QUESTIONS-OUVERTES.md` § Session 16) avec un lien vers la future page géo :
     - Annecy → `/zones/annecy.html`
     - Annemasse → `/zones/annemasse.html`
     - Saint-Julien-en-Genevois → `/zones/saint-julien-en-genevois.html`
     - Chambéry → `/zones/chambery.html`
     - La Roche-sur-Foron → `/zones/la-roche-sur-foron.html`
   - Section « Notre couverture s'étend également à 10 autres communes » avec les Tier B + C en liens texte

2. **Créer le dossier** :
   ```bash
   mkdir -p public_html/zones
   ```

3. **Créer la page modèle `public_html/zones/annecy.html`** :
   - Structure standard (partials, bandeau confiance, etc.)
   - H1 « Installation photovoltaïque à Annecy (74) — Blue Energie »
   - 600-800 mots de contenu UNIQUE Annecy :
     - Intro (3 paragraphes) : Blue Energie intervient à Annecy, expertise locale, distance siège, photovoltaïque dans le Genevois
     - Section « Pourquoi installer du solaire à Annecy » : 4 paragraphes (ensoleillement bassin annécien ~1300 kWh/m²/an, contraintes architecturales centre historique vs périphérie, RGE QualiPV indispensable pour aides, retour d'expérience local)
     - Section « Notre matériel adapté au climat alpin » : 3 paragraphes (panneaux bifaciaux pour neige, onduleur intérieur garage, batterie pour autonomie hivernale)
     - Section « Notre process en 5 étapes » : étude → devis → urbanisme → installation → mise en service
     - CTA « Étude gratuite Annecy »
   - **JSON-LD `LocalBusiness` adapté** : `areaServed.name` = `Annecy`, `geo.latitude` = 45.8992, `geo.longitude` = 6.1294
   - **JSON-LD `BreadcrumbList`** :
     ```html
     <script type="application/ld+json">
     {
       "@context": "https://schema.org",
       "@type": "BreadcrumbList",
       "itemListElement": [
         {"@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://blueenergie.fr/"},
         {"@type": "ListItem", "position": 2, "name": "Zones d'intervention", "item": "https://blueenergie.fr/zones-intervention.html"},
         {"@type": "ListItem", "position": 3, "name": "Annecy"}
       ]
     }
     </script>
     ```

4. **Mise à jour sitemap** :
   ```xml
   <url><loc>https://blueenergie.fr/zones-intervention.html</loc><lastmod>2026-05-17</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>
   <url><loc>https://blueenergie.fr/zones/annecy.html</loc><lastmod>2026-05-17</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>
   ```

5. **Mise à jour `partials/header.html`** : ajouter « Zones » dans la navbar.

### Commit & push

```bash
git add public_html/zones-intervention.html public_html/zones/annecy.html public_html/sitemap.xml public_html/partials/header.html SESSIONS-CODE-A-VENIR.md
git commit -m "Session 15 : hub zones-intervention + page modèle Annecy (BreadcrumbList + JSON-LD localisé)"
git push origin main
```

Maj `SESSIONS-CODE-A-VENIR.md` → ligne Session 15 = `✅ **DÉPLOYÉ** | PROMPT-SESSION-MARATHON.md`.

**Checkpoint 9 — Marathon principal complète. STOP RECOMMANDÉ ICI** sauf si tu te sens encore parfaitement frais.

---

## SOUS-SESSIONS OPTIONNELLES (à n'attaquer que si contexte encore sain)

### SOUS-SESSION 10 — Session 16 : 9 autres pages géo (~2-3 h)

Dupliquer le modèle `zones/annecy.html` pour les 9 autres villes selon `QUESTIONS-OUVERTES.md` § Session 16 :
- **Tier A (4)** : Annemasse, Saint-Julien-en-Genevois, Chambéry, La Roche-sur-Foron — 600-800 mots chacune
- **Tier B (6)** : Vers, Vulbens, Valleiry, Archamps, Feigères, Crusseilles — 300-400 mots chacune
- **Tier C (4)** : Thonon-les-Bains, Aix-les-Bains, Cluses, Bonneville — 400-500 mots chacune

Pour chaque : adapter géo (lat/lng à chercher), areaServed, contenu spécifique (au moins 30 % unique), sitemap.

Commit + push après les 4 Tier A, puis après les 6 Tier B, puis après les 4 Tier C (3 commits séparés).

### SOUS-SESSION 11 — Session 22 : 3e article blog (~1 h 30)

Sujet à choisir parmi :
- « Pourquoi nous avons choisi JA Solar + Solplanet pour nos installations »
- « Coût réel d'une installation 10 kWc en Haute-Savoie (cas REGHEM anonymisé) »
- « Batterie ou pas batterie : guide de décision 2026 »

Format identique aux 2 articles existants (cf. `PROMPT-SESSION-BLOG.md`).

---

## Décisions déjà prises (ne demande RIEN)

| Sujet | Décision |
|---|---|
| Ordre des sous-sessions | 14 → 18-FIX → 7 → compression → 8 → 11 → 12 → 13 → 15 (+ 16, 22 optionnels) |
| Commit/push après chaque sous-session | Obligatoire — préserve le travail si arrêt en cours |
| Stratégie fail-soft | Une sous-session bloquante → marquer ⚠️ Partiel + skip + continuer |
| Arrêt prématuré | Autorisé après n'importe quel checkpoint ≥ 4 si contexte saturé |
| Système de partials | `fetch()` JS, divs `#site-header` + `#site-footer`, fallback à vide acceptable (page reste utilisable) |
| Pages géo Tier A/B/C | Cf. liste figée dans `QUESTIONS-OUVERTES.md` § Session 16 (pas Grenoble, pas Albertville) |
| Bandeau confiance | Reste statique dans chaque page (PAS dans le partial header) — SEO important |
| Simulateur aides | Niveau 1 (cf. `QUESTIONS-OUVERTES.md` Q18) : puissance → fourchette, pas de saisie revenus |
| Compression images | `cwebp` si dispo, sinon skip + signaler |
| Branche git | Push direct main pour CHAQUE sous-session (livrables techniques) |

## Interdictions strictes

- ❌ Ne fais PAS Sessions 10 (formulaire reCAPTCHA), 17 (avis Google) — clés API manquantes
- ❌ N'attends PAS la fin de toutes les sous-sessions pour commit — un commit par sous-session minimum
- ❌ N'INVENTE PAS de contenu chiffré (prix, primes, dates) au-delà de ce qui est dans ce prompt ou dans `QUESTIONS-OUVERTES.md`
- ❌ Ne supprime PAS les pages existantes (`index.html` reste l'accueil même après création des pages internes)
- ❌ N'installe AUCUN paquet (Homebrew, npm, etc.). `sips` natif et `cwebp` si présent. Sinon skip.
- ❌ Ne touche PAS à `tarteaucitron.js`, `init.js`, ou au tracking GA4
- ❌ Ne casse PAS le `<head>` existant des 8 pages déjà en prod (favicons, OG, etc.)
- ❌ N'inclus PAS la fiche pédagogique de ce prompt dans l'historique git par erreur (elle est en tête mais hors `=== DÉBUT PROMPT ===`)
- ❌ Ne pose AUCUNE question au user

## En cas de blocage

1. Diagnostique
2. Tente 2 solutions
3. Si toujours bloqué sur UNE sous-session après 15 min : marque ⚠️ Partiel, commit ce qui est fait, passe à la suivante
4. Si saturation contexte : arrête au prochain checkpoint, rapport final, fin
5. NE STOPPE PAS pour poser une question

## Format du rapport final

```
## Rapport Session MARATHON

### Sous-sessions terminées
- [ ] / [x] 14 — JSON-LD + sitemap + robots.txt
- [ ] / [x] 18-FIX — bandeau confiance corrigé
- [ ] / [x] 7 — finition galerie + renommage Mylight
- [ ] / [x] Mini-compression images (préciser : N images compressées via cwebp, ou skip)
- [ ] / [x] 8 — extraction CSS/JS index + merci
- [ ] / [x] 11 — partials header/footer + loader JS
- [ ] / [x] 12 — 4 pages internes (installation, matériel, réalisations, contact)
- [ ] / [x] 13 — page aides-2026 + simulateur
- [ ] / [x] 15 — hub zones + page Annecy
- [ ] / [x] 16 — 9 autres pages géo (optionnel)
- [ ] / [x] 22 — article blog 3 (optionnel)

### Commits poussés (1 par sous-session)
- [hash] Session 14 : ...
- [hash] Session 18 FIX : ...
- [hash] Session 7 : ...
- [...]

### Statut SESSIONS-CODE-A-VENIR.md
- N lignes passées à ✅ DÉPLOYÉ
- M lignes passées à ⚠️ Partiel (préciser lesquelles + raison)

### Vérifications globales
- Working tree clean : OK / KO
- 0 mention "Mylight" : OK / KO
- sitemap.xml à jour avec toutes les nouvelles pages : OK / KO
- Bandeau confiance visible et lisible : OK / KO (vérifier visuellement en local si possible)
- Toutes pages partials chargent header/footer : OK / KO

### À faire côté Neil
1. Téléverser sur Hostinger via hPanel les NOUVEAUX fichiers et dossiers :
   - `public_html/sitemap.xml` (écraser)
   - `public_html/robots.txt` (nouveau)
   - `public_html/assets/css/main.css` + `bandeau-confiance.css` (mis à jour)
   - `public_html/assets/js/main.js` + `partials-loader.js`
   - `public_html/partials/` (dossier complet)
   - `public_html/zones/` (dossier complet)
   - `public_html/aides-2026.html`
   - `public_html/zones-intervention.html`
   - `public_html/installation-photovoltaique.html`
   - `public_html/materiel-panneaux-solaires.html`
   - `public_html/realisations.html`
   - `public_html/contact.html`
   - Toutes les pages HTML modifiées (cf. liste commits)
2. Vider le cache Hostinger
3. Tests visuels :
   - Bandeau confiance désormais visible et propre sur https://blueenergie.fr/
   - Navigation entre nouvelles pages internes OK
   - Page aides-2026 : tester le simulateur (changer puissance → cliquer Calculer → résultat affiché)
   - Page Annecy : vérifier breadcrumb visuel + JSON-LD via https://validator.schema.org/
4. Soumettre sitemap.xml mis à jour à Google Search Console
5. Si arrêt prématuré : me signaler les sous-sessions restantes, on relance un PROMPT-SESSION-MARATHON-2 ciblé.

### Prochaine session recommandée
Si tu as fait jusqu'à 15 : Session 16 (9 pages géo) ou Session 22 (article blog 3).
Si tu as arrêté avant 15 : reprendre où tu en es via PROMPT-SESSION-MARATHON-2.
Sessions à débloquer côté Neil (clés/assets) : 10 (reCAPTCHA), 17 (Places API), photos chantiers, logos partenaires.

### Blocages rencontrés
- [Liste précise par sous-session, ou : aucun]
```

## === FIN PROMPT ===

---

## Notes hors prompt (pour Neil)

**À savoir avant de lancer** :
- Cette marathon va probablement durer **6-10 h réelles** côté Claude Code (pas 14h — le LLM est rapide tant que le contexte n'est pas saturé).
- Tu peux uploader sur Hostinger **au fur et à mesure** que les commits arrivent (chaque commit = un état fonctionnel cohérent). Pas besoin d'attendre la fin.
- Si tu vois que le dev tourne en rond ou que la qualité chute, **interromps-le** avec un message « stop, fais ton rapport ». Mieux vaut s'arrêter à mi-parcours avec 5 sous-sessions propres que continuer sur du bâclé.
- Les sous-sessions **9 (Annecy modèle)** et **10 (9 autres pages géo)** sont celles où la qualité est la plus critique pour le SEO. Si tu les vois passer rapidement avec du contenu copié-collé, signale-moi pour qu'on les reprenne à la main.

**Avant le lancement, valide ces 3 points** :
1. Le bug Session 18 (bandeau confiance) que tu m'as signalé est-il bien un problème de rendu visuel (et non un crash JS / 500 serveur) ? Si crash, le correctif standard ne suffira pas.
2. Tu acceptes que le dev s'arrête sans terminer les 9 sous-sessions si le contexte sature ?
3. Tu acceptes que le bandeau confiance change d'apparence (fond blanc + badges ronds cyan au lieu du fond gris-bleu + emojis sur fond clair) ?

**Si tu veux limiter le périmètre** : remplace la liste « 1 → 9 » par « 1 → N » dans la phrase « Enchaîner 9 sous-sessions dans l'ordre ci-dessous » au début du bloc DÉBUT PROMPT, et supprime les sous-sessions au-delà.

**Prochain coup après la marathon** : on attaque les sessions bloquées (10 reCAPTCHA, 17 avis Google) quand tu auras fourni les clés. Plus Session 16 si pas faite, plus Session 22 article blog 3.
