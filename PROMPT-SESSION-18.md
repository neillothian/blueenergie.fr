# 🎓 Fiche de révision — Session 18 : bandeau confiance RGE + décennale + SIRET

> À lire AVANT de lancer le prompt dans Claude Code. Objectif : comprendre ce que la session va faire et pourquoi, pas juste exécuter aveuglément.

Quand un visiteur arrive sur ton site, il a 5 secondes pour décider si tu es un installateur sérieux ou un démarcheur louche. Aujourd'hui, ton site annonce « RGE QualiPV » dans le texte courant mais sans aucun signal visuel fort. Cette session ajoute un **bandeau de confiance** juste sous la navbar de toutes les pages : un mini-bloc avec logo QualiPV + mention décennale + SIRET + (placeholder note Google qui sera activé en Session 17). C'est un des éléments les plus rentables en conversion sur un site de prestation à forte intensité contractuelle.

## Ce que tu vas voir passer dans le prompt

- **Composant réutilisable** : un bloc HTML + son CSS qu'on duplique manuellement sur chaque page (pas de système de partial — c'est prévu en Session 11). Donc 8 copies identiques à intégrer ; si tu changes le bandeau plus tard, il faudra le faire dans les 8 pages.
- **Logo `logo-qualipv.png`** : déjà présent dans `public_html/images/`. On l'utilise tel quel. Pas besoin de le générer ou de le compresser dans cette session (la compression viendra en Session 9).
- **`alt`** d'une image : attribut HTML qui décrit l'image pour les lecteurs d'écran (accessibilité) ET pour Google (SEO). Une image sans `alt` perd des points sur les deux fronts. Ici on mettra `alt="Logo RGE QualiPV — qualification installateur photovoltaïque"`.
- **`loading="lazy"`** : indique au navigateur de ne charger l'image que quand elle entre dans le viewport. Inutile pour le logo QualiPV (au-dessus du fold) — on N'y met PAS `loading="lazy"` parce que ça retarderait l'affichage initial. À réserver aux images du milieu ou du bas de page.
- **Responsive « mobile-first »** : on conçoit d'abord pour téléphone (largeur ~375 px), puis on adapte pour desktop. Le bandeau aura 4 éléments → sur desktop ils s'alignent horizontalement, sur mobile ils s'empilent en grille 2x2 (sinon le texte devient illisible).
- **`role="region"` + `aria-label`** : balises ARIA d'accessibilité pour qu'un lecteur d'écran annonce « zone de confiance » au lieu d'une suite de logos décontextualisés.
- **Placeholder note Google** : on prévoit l'emplacement (un 4e mini-bloc avec « ★ 4.X/5 ») mais on l'affiche en grisé / muet tant que Session 17 (API Google Places) n'est pas faite. Quand Session 17 arrivera, il suffira de remplacer le contenu statique par l'appel dynamique.

## Étapes clés du prompt (vue d'avion)

1. Synchroniser le dossier local avec GitHub (`git pull --rebase`), backup, vérifier git propre.
2. Lecture du contexte : repérer la position de la navbar dans `index.html` (le bandeau s'insérera juste après la fermeture de `</nav>` ou de `<header>`).
3. Création d'un fichier `public_html/assets/css/bandeau-confiance.css` avec le CSS du bandeau (~80 lignes, responsive, mobile-first).
4. Pour chaque page (8 pages) : ajouter `<link>` vers le CSS dans le `<head>`, puis insérer le bloc HTML `<aside class="bandeau-confiance">` juste après la navbar.
5. Vérifier que le SIRET affiché correspond bien à 882 483 274 et que le lien logo pointe bien vers `/images/logo-qualipv.png`.
6. Validation finale : grep, W3C, commit + push.

## Pièges à anticiper

- **Logo introuvable** : si pour une raison X le fichier `logo-qualipv.png` est absent de `public_html/images/`, le bandeau affichera un placeholder cassé. Le prompt prévoit un `ls` de vérification avant intégration.
- **CSS qui casse la navbar existante** : la navbar a déjà ses propres styles. Le nouveau CSS doit utiliser un sélecteur strict (`.bandeau-confiance`) sans toucher aux variables globales. Si tu vois la navbar se déformer après upload, c'est un conflit CSS à corriger.
- **Mobile illisible** : si les 4 mini-blocs restent alignés en horizontal sur petit écran, ils deviennent illisibles. Le prompt impose une media query `max-width: 640px` qui passe en grille 2x2. Teste sur ton téléphone après upload.
- **Logo trop gros / pixelisé** : le PNG actuel est peut-être 500 px de large alors qu'il s'affichera en 80 px. Pas dramatique côté visuel (le navigateur le réduit), mais ça consomme inutilement de la bande passante. La vraie optimisation viendra en Session 9.
- **8 copies à maintenir** : un bug typo de fin de session = bug sur les 8 pages. Le grep de vérification finale détectera les pages ratées (par exemple si une seule oubliée).

## Mini-quiz d'auto-vérification

1. Pourquoi on N'utilise PAS `loading="lazy"` sur le logo du bandeau confiance, alors qu'on a dit que c'était une bonne pratique pour les images ?
2. À quoi sert l'attribut `aria-label="Garanties Blue Energie"` sur le bandeau ?
3. Si la Session 17 (avis Google) n'arrive jamais, que faire du 4e mini-bloc « ★ 4.X/5 » placeholder ? Le retirer ou le laisser ?

## Pour aller plus loin (optionnel)

- WCAG (accessibilité web) — pourquoi `alt` et `aria-label` comptent : https://www.w3.org/WAI/tutorials/
- MDN — `loading="lazy"` : https://developer.mozilla.org/fr/docs/Web/HTML/Element/img#loading
- RGE — Bénéfices de l'affichage du logo QualiPV : https://www.qualit-enr.org/qualifications/qualipv/

---



# Prompt Session 18 — pour Claude Code

> **Bandeau confiance haut de page sur toutes les pages : logo RGE QualiPV + mention décennale + SIRET + placeholder note Google.**
> Périmètre strict : 1 CSS partagé + intégration HTML sur 8 pages. Pas de logique JS, pas d'appel API.
> Durée estimée : 1 h. Le dev travaille seul, sans poser de questions.

---

## Mode d'emploi (côté Neil)

1. Ouvre un terminal
2. `cd "/Users/neillothian/Documents/Claude/Projects/blueenergie.fr"`
3. Lance Claude Code : `claude`
4. Copie-colle tout ce qui est entre `=== DÉBUT PROMPT ===` et `=== FIN PROMPT ===`
5. Laisse tourner ~1 h. Rapport final à la fin.

---

## === DÉBUT PROMPT ===

Tu es développeur web senior + UX. Tu travailles sur **blueenergie.fr** (installation photovoltaïque résidentielle en Haute-Savoie). Stack : HTML/CSS/JS pur. Hébergement Hostinger.

Les **Sessions 1+2+3+4+5+6+Blog sont déjà déployées** : bugs corrigés, page /merci.html, carte OSM, catalogue matériel, 3 pages légales avec footer enrichi, bandeau cookies tarteaucitron, hub blog + 2 articles.

## Ta mission

Créer un **bandeau de confiance** (composant statique, pas de JS) inséré juste sous la navbar de **toutes les pages publiques** (8 pages). Ce bandeau contient 4 mini-blocs :

1. **Logo RGE QualiPV** (image `public_html/images/logo-qualipv.png` déjà présente) + texte court « Installateur RGE QualiPV »
2. **Garantie décennale** : pictogramme + « Décennale active »
3. **SIRET** : « SAS Blue Energie — SIRET 882 483 274 »
4. **Note Google (placeholder)** : « ★ Avis Google » en grisé/muet tant que Session 17 n'est pas faite (on prépare l'emplacement)

Le bandeau est :
- Discret mais visible (fond très clair, bordure fine)
- Responsive : 4 colonnes sur desktop ≥ 768 px, grille 2x2 sur mobile < 768 px
- Accessible : `<aside role="region" aria-label="Garanties Blue Energie">`, `alt` sur le logo
- Sans `loading="lazy"` sur le logo (above the fold)
- Sans JSON-LD (c'est Session 14)
- Sans JavaScript

Durée : 1 h. Aucune question au user. Toutes les données factuelles sont dans ce prompt.

## Workflow obligatoire

### Étape 0 — Initialisation (5 min)

1. TodoWrite avec 6 tâches : git pull, backup, vérifier logo, CSS bandeau, intégration 8 pages, validation + git push
2. **Synchroniser avec le remote GitHub** :
   ```bash
   git pull origin main --rebase
   ```
   Si le pull échoue (conflit, auth), diagnostique et résous.
3. Backup local : `cp public_html/index.html public_html/index.html.backup-pre-session18`
4. `git status` doit retourner « nothing to commit, working tree clean ».
5. **Vérifier que le logo existe** :
   ```bash
   ls -la public_html/images/logo-qualipv.png
   ```
   Si absent, **stoppe et signale dans le rapport** — pas d'intégration sans le logo.

### Étape 1 — Lecture contexte (5 min)

Lis dans cet ordre :
1. `public_html/index.html` — repérer la position de la fin de `</nav>` (ou `</header>` selon la structure) pour savoir où insérer le bandeau
2. `public_html/merci.html` — confirmer que la structure navbar/header est similaire
3. `public_html/blog/index.html` — idem pour les pages sous `/blog/`

Ne lis rien d'autre.

### Étape 2 — Création du CSS partagé (15 min)

Créer `public_html/assets/css/bandeau-confiance.css` avec ce contenu exact :

```css
/* Bandeau de confiance — Session 18 — blueenergie.fr */
.bandeau-confiance {
  background: #f5f9fb;
  border-bottom: 1px solid #d6e3ea;
  padding: 0.75rem 1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 0.875rem;
  color: #2a4a5a;
}

.bandeau-confiance__inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  align-items: center;
}

.bandeau-confiance__item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
}

.bandeau-confiance__item img {
  height: 32px;
  width: auto;
  flex-shrink: 0;
}

.bandeau-confiance__item-icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #4fc7ef;
  font-size: 1.25rem;
  line-height: 1;
}

.bandeau-confiance__item-text {
  font-weight: 500;
  line-height: 1.2;
  word-break: keep-all;
}

.bandeau-confiance__item-text small {
  display: block;
  font-weight: 400;
  font-size: 0.75rem;
  color: #6b8493;
  margin-top: 0.15rem;
}

.bandeau-confiance__item--placeholder {
  opacity: 0.55;
  font-style: italic;
}

@media (max-width: 767px) {
  .bandeau-confiance__inner {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem 1rem;
  }
  .bandeau-confiance {
    font-size: 0.8rem;
    padding: 0.5rem 0.75rem;
  }
  .bandeau-confiance__item img {
    height: 24px;
  }
}

@media (max-width: 360px) {
  .bandeau-confiance__inner {
    grid-template-columns: 1fr;
  }
}
```

### Étape 3 — Bloc HTML à insérer (5 min — définition)

Le bloc HTML à intégrer (identique sur les 8 pages) est :

```html
<aside class="bandeau-confiance" role="region" aria-label="Garanties Blue Energie">
  <div class="bandeau-confiance__inner">
    <div class="bandeau-confiance__item">
      <img src="/images/logo-qualipv.png" alt="Logo RGE QualiPV — qualification installateur photovoltaïque">
      <span class="bandeau-confiance__item-text">Installateur RGE QualiPV<small>Numéro sur demande</small></span>
    </div>
    <div class="bandeau-confiance__item">
      <span class="bandeau-confiance__item-icon" aria-hidden="true">🛡️</span>
      <span class="bandeau-confiance__item-text">Garantie décennale<small>Couverture 10 ans</small></span>
    </div>
    <div class="bandeau-confiance__item">
      <span class="bandeau-confiance__item-icon" aria-hidden="true">🏢</span>
      <span class="bandeau-confiance__item-text">SAS Blue Energie<small>SIRET 882 483 274</small></span>
    </div>
    <div class="bandeau-confiance__item bandeau-confiance__item--placeholder">
      <span class="bandeau-confiance__item-icon" aria-hidden="true">★</span>
      <span class="bandeau-confiance__item-text">Avis Google<small>Activation prochaine</small></span>
    </div>
  </div>
</aside>
```

**Note** : les emojis (🛡️ 🏢 ★) sont utilisés ici comme pictogrammes universels et accessibles. Si Neil préfère des icônes SVG ultérieurement, c'est une amélioration Session 9.

### Étape 4 — Intégration sur les 8 pages (25 min)

Pour **chacune** de ces 8 pages :

1. `public_html/index.html`
2. `public_html/merci.html`
3. `public_html/blog/index.html`
4. `public_html/blog/2026-05-aides-solaires-avant-1er-juillet.html`
5. `public_html/blog/2026-05-batterie-virtuelle-attention-jpme.html`
6. `public_html/mentions-legales.html`
7. `public_html/cgv.html`
8. `public_html/politique-confidentialite.html`

#### 4.a — Ajouter le lien CSS dans le `<head>`

Insérer dans le `<head>`, **juste avant** la fermeture `</head>` (ou avant l'import tarteaucitron.js qui doit rester en dernier) :

```html
<link rel="stylesheet" href="/assets/css/bandeau-confiance.css">
```

Le chemin en racine `/assets/...` fonctionne depuis l'accueil ET depuis `/blog/`.

#### 4.b — Insérer le bloc HTML

Repérer la fin de la navbar (`</nav>` ou `</header>` selon la structure de la page) et insérer le bloc HTML du bandeau **juste après** sa fermeture. Le bandeau doit être visible immédiatement sous la navigation, avant le contenu principal de la page.

**Important** :
- Sur `index.html` : insérer après la navbar principale, avant la section hero
- Sur `merci.html` : insérer après la navbar simplifiée, avant le contenu de remerciement
- Sur les 3 pages blog : idem, juste sous la navbar
- Sur les 3 pages légales : idem

### Étape 5 — Validation finale (10 min)

1. **Vérifier que le CSS est bien créé** :
   ```bash
   ls -la public_html/assets/css/bandeau-confiance.css
   ```
   Doit exister et faire > 1 Ko.

2. **Vérifier le lien CSS sur les 8 pages** :
   ```bash
   grep -c "bandeau-confiance.css" public_html/index.html public_html/merci.html public_html/blog/*.html public_html/mentions-legales.html public_html/cgv.html public_html/politique-confidentialite.html
   ```
   Chaque page doit retourner au minimum 1.

3. **Vérifier le bloc HTML sur les 8 pages** :
   ```bash
   grep -c 'class="bandeau-confiance"' public_html/index.html public_html/merci.html public_html/blog/*.html public_html/mentions-legales.html public_html/cgv.html public_html/politique-confidentialite.html
   ```
   Chaque page doit retourner exactement 1.

4. **Vérifier la présence du SIRET et du logo dans le bandeau** :
   ```bash
   grep -c "SIRET 882 483 274" public_html/index.html
   grep -c "logo-qualipv.png" public_html/index.html
   ```
   Doivent retourner 1+ chacun.

5. **Validation HTML W3C** des 8 pages modifiées :
   ```bash
   for f in public_html/index.html public_html/merci.html public_html/blog/index.html public_html/blog/2026-05-aides-solaires-avant-1er-juillet.html public_html/blog/2026-05-batterie-virtuelle-attention-jpme.html public_html/mentions-legales.html public_html/cgv.html public_html/politique-confidentialite.html; do
     echo "=== $f ==="
     curl -s -H "Content-Type: text/html; charset=utf-8" --data-binary @"$f" "https://validator.w3.org/nu/?out=json" | head -30
   done
   ```

6. **Commit + push GitHub** :
   ```bash
   git add -A
   git commit -m "Session 18: bandeau confiance RGE + décennale + SIRET (8 pages)"
   git push origin main
   ```
   Si auth interactive requise, commit local valide + signaler.

## Décisions déjà prises (ne demande RIEN)

| Sujet | Décision |
|---|---|
| Composant | Bloc HTML + CSS partagé `assets/css/bandeau-confiance.css` |
| Position | Juste sous la navbar, au-dessus du contenu principal |
| Persistance | Statique (pas sticky, pas fixed) — l'utilisateur le voit en haut et il disparaît au scroll |
| Pictos | Emojis Unicode (🛡️ 🏢 ★) pour rapidité — SVG en Session 9 si besoin |
| Logo | `public_html/images/logo-qualipv.png` (déjà présent) |
| Numéro RGE | Pas affiché — formulation « Numéro sur demande » sous le label |
| SIRET | Format `882 483 274` (espaces, sans extension établissement dans le bandeau) |
| Note Google | Placeholder grisé « Avis Google · Activation prochaine » — sera dynamique en Session 17 |
| Responsive | Desktop : 4 colonnes ; ≤ 767 px : 2x2 ; ≤ 360 px : empilé |
| Accessibilité | `role="region"` + `aria-label`, `alt` descriptif sur le logo, `aria-hidden` sur les pictos décoratifs |
| JS | Aucun JS |
| JSON-LD | Aucun (c'est Session 14) |
| Git workflow | Pull au début, commit + push à la fin sur `origin/main` |

## Interdictions strictes

- ❌ N'ajoute PAS de JavaScript pour le bandeau (statique uniquement)
- ❌ Ne mets PAS `loading="lazy"` sur le logo (above the fold)
- ❌ N'ajoute PAS de JSON-LD ici (Session 14)
- ❌ Ne fais PAS de bandeau sticky/fixed (statique, scrolle avec la page)
- ❌ Ne touche PAS au contenu existant des pages (sections matériel, articles blog, footer, etc.) — uniquement ajout dans `<head>` + un bloc HTML après la navbar
- ❌ N'invente PAS un numéro RGE — formulation « Numéro sur demande » obligatoire
- ❌ Ne crée PAS de variantes du bandeau pour différentes pages — le même bloc HTML partout (cohérence visuelle)
- ❌ Ne change PAS la navbar ou le footer existants
- ❌ Ne refactore PAS le CSS global (c'est Session 8)
- ❌ Ne pose AUCUNE question au user

## En cas de blocage

1. Diagnostique
2. Tente 2 solutions
3. Si le logo `logo-qualipv.png` est introuvable : **stoppe** et signale dans le rapport, n'invente pas un logo de remplacement
4. Si toujours bloqué sur UNE autre tâche, passe à la suivante et liste dans le rapport
5. NE STOPPE PAS pour poser une question

## Tone et style code

- Pas de blabla, pas de « bien sûr »
- Pas d'emoji dans le rapport final (uniquement dans le bandeau HTML où ils sont fonctionnels)
- Travail silencieux, rapport à la fin

## Format du rapport final

```markdown
# Session 18 — Terminé

## Fichiers créés
- public_html/assets/css/bandeau-confiance.css (X lignes)
- public_html/index.html.backup-pre-session18 (sauvegarde)

## Fichiers modifiés (8 pages — ajout link CSS + bloc HTML)
- public_html/index.html
- public_html/merci.html
- public_html/blog/index.html
- public_html/blog/2026-05-aides-solaires-avant-1er-juillet.html
- public_html/blog/2026-05-batterie-virtuelle-attention-jpme.html
- public_html/mentions-legales.html
- public_html/cgv.html
- public_html/politique-confidentialite.html

## Logo
- public_html/images/logo-qualipv.png : présent (X Ko)

## Vérifications
- ls bandeau-confiance.css : présent (> 1 Ko)
- grep "bandeau-confiance.css" : 1+ par page (✅ link CSS présent)
- grep 'class="bandeau-confiance"' : 1 par page (✅ bloc HTML présent)
- grep "SIRET 882 483 274" + grep "logo-qualipv.png" : OK dans index.html
- Validation W3C : X erreurs / X warnings par page (détail)
- Git pull initial : OK / KO
- Git commit local : OK
- Git push vers GitHub origin/main : OK / manuel requis

## À faire côté toi (Neil)
1. Téléverser sur Hostinger via hPanel :
   - public_html/assets/css/bandeau-confiance.css (nouveau dossier)
   - Les 8 pages HTML modifiées
2. Vider le cache Hostinger
3. Tester sur https://blueenergie.fr/ :
   - Le bandeau apparaît juste sous la navbar, sur fond gris-bleu très clair
   - Les 4 mini-blocs sont visibles avec leur picto + texte
   - Le logo QualiPV s'affiche correctement
   - Sur mobile (largeur < 768 px) : les 4 blocs passent en grille 2x2
4. Tester sur 2-3 autres pages (/blog/, /merci.html, /mentions-legales.html) pour vérifier cohérence visuelle
5. Vérifier qu'aucune régression visuelle sur la navbar ou le contenu existant

## Prochaines sessions disponibles
- Session 14 : JSON-LD Organization + sitemap.xml + robots.txt (SEO technique)
- Session 7 : finition galerie réalisations (loading=lazy, retrait Mylight)
- Session 17 : intégration avis Google Places API (activera le placeholder)

## Blocages éventuels
(vide si tout OK, sinon détailler)
```

## === FIN PROMPT ===

---

## Notes hors prompt (pour Neil)

**Vérifications visuelles post-déploiement** :
1. Cohérence des couleurs : `#f5f9fb` (fond bandeau) + `#d6e3ea` (bordure) + `#4fc7ef` (icônes) doivent s'harmoniser avec ta charte actuelle (la couleur principale du site est `#4fc7ef`). Si tu trouves le bandeau trop terne ou trop voyant, on ajuste.
2. Lisibilité mobile : prends ton téléphone et teste sur les 8 pages — la grille 2x2 doit rester lisible. Si non, on baisse la taille de police.
3. **Logo QualiPV** : le fichier actuel est un PNG. Si tu trouves qu'il s'affiche pixelisé, Session 9 (optimisation images) le remplacera par une version optimisée ou un SVG.

**Évolution Session 17** : quand on activera l'API Google Places, on remplacera le 4e bloc placeholder par un appel JS qui injecte la vraie note (par exemple « ★ 4.8/5 · 23 avis »). Le markup HTML actuel est conçu pour permettre ce remplacement sans toucher au CSS.

**Prochaine session recommandée après celle-ci** : **Session 14** (JSON-LD Organization + sitemap.xml + robots.txt) — boost SEO important maintenant que la structure du site est complète (légal + cookies + bandeau confiance).
