# 🎓 Fiche de révision — Session 18-V2 (nettoyage bandeau confiance)

> À lire AVANT de lancer le prompt dans Claude Code. Objectif : comprendre pourquoi on retire des éléments d'un bandeau qu'on vient juste de poser, et ce que ça change concrètement.

## Pourquoi alléger un bandeau de confiance ?

Un bandeau de confiance, c'est un sous-titre visuel du site. Sa puissance vient de sa **rapidité de lecture** : un visiteur le scanne en 1-2 secondes, sans vraiment lire, juste en captant des "signaux de sérieux" (logo certifiant, mention décennale, etc.).

Quand on y empile trop d'éléments — surtout du texte juridique long type « SAS X — SIRET 123 456 789 » — on bascule de **réassurance** vers **clutter**. Le visiteur ne traite plus l'info, son œil glisse, et au passage le hero juste en-dessous (la vraie zone de conversion) perd de la place et de l'attention. Sur mobile c'est pire : 4 mini-blocs en grille 2x2 deviennent vite illisibles quand chaque bloc contient 3-4 lignes.

La V1 (Session 18 + son fix) a posé 4 mini-blocs : logo QualiPV + décennale + SIRET + placeholder « Avis Google ». À l'usage, Neil veut nettoyer :

1. Sous le logo QualiPV → retirer le texte « Numéro sur demande ». Le logo se suffit à lui-même comme signal RGE, le sous-texte fait redite et ajoute du bruit.
2. Bloc « SAS Blue Energie — SIRET 882 483 274 » → retirer du bandeau. **Aucune obligation légale ne le force à apparaître dans le bandeau de header**. La seule exigence légale (LCEN art. 19 + C. com. art. R.123-237) c'est qu'il soit accessible « facilement » sur le site → mentions légales + CGV remplissent déjà cette obligation. Le mettre en bandeau header, c'est du zèle juridique qui parasite l'UX.
3. Bloc placeholder « ★ Avis Google · Activation prochaine » → retirer. Neil a décidé que les avis Google iront ailleurs (probablement dans la home et la page réalisations) en Session 17. Un placeholder grisé qui annonce « activation prochaine » envoie un signal d'inachèvement, pas de confiance.

Reste donc dans le bandeau : **logo QualiPV** (sans sous-texte) + **mention décennale**. Deux signaux forts, peu de bruit, lecture en 1 seconde.

## Ce que tu vas voir passer dans le prompt

- **15 fichiers HTML à modifier**. Le bandeau a été dupliqué manuellement à l'époque de Session 18 sur toutes les pages publiques (la Session 11 partials n'a refactoré que `index.html`). Le `header.html` du dossier `partials/` ne contient PAS le bandeau — donc rien à faire côté partial.
- **Modifications HTML chirurgicales** : on retire 2 blocs `<div class="bandeau-confiance__item">…</div>` complets (le bloc SIRET et le bloc Avis Google), et à l'intérieur du bloc QualiPV on retire le `<small>Numéro sur demande</small>`. C'est tout.
- **Réajustement CSS** : aujourd'hui le bandeau est en `grid-template-columns: repeat(4, 1fr)` (desktop) et `repeat(2, 1fr)` (mobile). Avec 2 éléments restants, garder 4 colonnes vides serait moche. On passe à 2 colonnes desktop / 2 colonnes mobile (ou 1 colonne sur très petit écran). Une seule règle CSS à toucher.
- **SIRET ailleurs** : on vérifie que le SIRET 882 483 274 reste bien présent dans `mentions-legales.html`, `cgv.html` et `politique-confidentialite.html`. C'est une obligation légale, pas une option.

## Pièges à anticiper

- **Bandeau dupliqué dans 15 pages** : un grep oublié = un bloc qui survit quelque part. Le prompt impose un grep de validation final (compter les occurrences de « SIRET 882 483 274 » et « Avis Google » dans `public_html/*.html` et `public_html/blog/*.html` et `public_html/zones/*.html` → doivent retomber à 0 hors pages légales).
- **CSS qui se déforme** : si on garde `grid-template-columns: repeat(4, 1fr)` avec 2 enfants, on aura 2 cellules occupées + 2 cellules vides à droite → bandeau visuellement bancal. Il faut basculer à `repeat(2, 1fr)` desktop. Sur mobile (≤ 767 px), 2 colonnes restent OK, voire on peut passer à 1 colonne pour respirer.
- **Ne PAS toucher au logo QualiPV** ni à la **mention décennale** : ce sont les deux survivants. Le bandeau garde son identité visuelle.
- **Ne PAS supprimer le SIRET partout** : il reste obligatoirement dans `mentions-legales.html` et `cgv.html`. Le grep de vérification finale doit confirmer sa présence dans ces deux fichiers.
- **Pas de header.html à modifier** : le bandeau n'est PAS dans le partial. C'est encore du code dupliqué à 15 endroits. Refactorer le bandeau en partial = autre session, hors scope V2.
- **Backup pré-modif** : 15 fichiers touchés, mieux vaut un `cp` de chacun en `.backup-pre-session18v2` au cas où.

## Mini-quiz d'auto-vérification

1. Pourquoi peut-on retirer le SIRET du bandeau header alors que c'est une donnée légale obligatoire ?
2. Si on garde `grid-template-columns: repeat(4, 1fr)` avec seulement 2 blocs restants, qu'est-ce qui se passe visuellement ?
3. Combien de fichiers HTML faut-il modifier au total, et pourquoi pas juste le partial `header.html` ?
4. Si Neil change d'avis et veut réafficher le SIRET dans le bandeau plus tard, est-ce simple à refaire ?
5. Quel est le seul fichier CSS à toucher dans cette session, et combien de règles environ ?

## Pour aller plus loin (optionnel)

- LCEN art. 19 (mentions légales obligatoires sur un site marchand) : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032227262
- Article C. com. R.123-237 (mentions obligatoires SAS) : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000019290811

---



# Prompt Session 18-V2 — Nettoyage bandeau confiance

> **Retirer 3 éléments du bandeau de confiance sur les 15 pages où il vit (SIRET, mention SAS, placeholder Avis Google, sous-texte « Numéro sur demande »).**
> Périmètre : modifications HTML chirurgicales + 1 ajustement CSS (grid columns). Pas de JS, pas de refactor.
> Durée estimée : 45 min. Le dev travaille seul, sans poser de questions.

---

## Mode d'emploi (côté Neil)

1. Ouvre un terminal
2. `cd "/Users/neillothian/Documents/Claude/Projects/blueenergie.fr"`
3. Lance Claude Code : `claude`
4. Copie-colle tout ce qui est entre `=== DÉBUT PROMPT ===` et `=== FIN PROMPT ===`
5. Laisse tourner ~45 min. Push direct main (livrable technique, pas engageant).

---

## === DÉBUT PROMPT ===

Tu es développeur web senior + UX. Tu travailles sur **blueenergie.fr** (installation photovoltaïque résidentielle en Haute-Savoie). Stack : HTML/CSS/JS pur. Hébergement Hostinger.

État du site au démarrage : Sessions 1-15, Blog, 18 (avec correctif) déjà déployées en prod. Le **bandeau de confiance** est en place sur 15 pages publiques, contient 4 mini-blocs (logo QualiPV + décennale + SIRET + placeholder Avis Google), et fonctionne visuellement. Cette session V2 le nettoie.

## Ta mission

Sur le bandeau de confiance présent sur 15 pages HTML (et sur le CSS partagé), effectuer **3 retraits ciblés** :

1. **Retirer le texte `<small>Numéro sur demande</small>`** sous le logo QualiPV. Le logo reste, le label « Installateur RGE QualiPV » reste, seul le sous-texte part.
2. **Retirer entièrement le bloc** `<div class="bandeau-confiance__item">` qui contient « SAS Blue Energie » + « SIRET 882 483 274 » (avec son icône 🏢). Le SIRET reste dans les pages légales (mentions-légales, CGV) — ne pas y toucher.
3. **Retirer entièrement le bloc** `<div class="bandeau-confiance__item bandeau-confiance__item--placeholder">` qui contient « Avis Google » + « Activation prochaine » (avec son icône ★).

Après ces retraits, le bandeau ne contient plus que 2 mini-blocs : **logo QualiPV** (sans sous-texte) + **garantie décennale**. Le CSS doit passer en grille 2 colonnes desktop (au lieu de 4) pour rester équilibré.

Durée : 45 min. Aucune question au user. Toutes les données sont dans ce prompt.

## Workflow obligatoire

### Étape 0 — Initialisation (5 min)

1. TodoWrite avec 6 tâches : git pull, repérage fichiers, backup, modifs HTML 15 pages, ajustement CSS, validation + commit + push
2. **Synchroniser avec le remote GitHub** :
   ```bash
   git pull origin main --rebase
   ```
   Si le pull échoue : diagnostique et résous, ne continue pas.
3. `git status` doit retourner « nothing to commit, working tree clean ».
4. **Repérer toutes les pages où vit le bandeau** :
   ```bash
   grep -rl "bandeau-confiance" public_html/ --include="*.html"
   ```
   Tu dois retrouver **15 fichiers** (vérifie le compte). Si le nombre diffère, signale-le dans le rapport et adapte la liste à ce qui est trouvé.
5. **Backup pré-modif** des fichiers concernés :
   ```bash
   for f in $(grep -rl "bandeau-confiance" public_html/ --include="*.html"); do
     cp "$f" "$f.backup-pre-session18v2"
   done
   cp public_html/assets/css/bandeau-confiance.css public_html/assets/css/bandeau-confiance.css.backup-pre-session18v2
   ```

### Étape 1 — Lecture contexte (5 min)

Lis dans cet ordre, et **rien d'autre** :
1. `public_html/index.html` — repérer le bloc `<aside class="bandeau-confiance">` actuel (entre les lignes 117-136 environ)
2. `public_html/assets/css/bandeau-confiance.css` — comprendre la grille actuelle (4 colonnes desktop, 2 colonnes ≤ 767 px, 1 colonne ≤ 380 px)
3. `public_html/partials/header.html` — confirmer qu'il ne contient PAS le bandeau (juste la navbar). Aucune modif à faire dessus.

### Étape 2 — Modifications HTML sur les 15 pages (20 min)

Sur **chacune** des 15 pages contenant le bandeau, appliquer **3 modifications** au bloc `<aside class="bandeau-confiance">`.

**Liste des 15 pages** (à confirmer avec le grep de l'étape 0) :
1. `public_html/index.html`
2. `public_html/aides-2026.html`
3. `public_html/cgv.html`
4. `public_html/contact.html`
5. `public_html/installation-photovoltaique.html`
6. `public_html/materiel-panneaux-solaires.html`
7. `public_html/mentions-legales.html`
8. `public_html/merci.html`
9. `public_html/politique-confidentialite.html`
10. `public_html/realisations.html`
11. `public_html/zones-intervention.html`
12. `public_html/blog/index.html`
13. `public_html/blog/2026-05-aides-solaires-avant-1er-juillet.html`
14. `public_html/blog/2026-05-batterie-virtuelle-attention-jpme.html`
15. `public_html/zones/annecy.html`

**Modification 1 — Bloc QualiPV (à éditer)** :

Remplacer ce fragment :
```html
      <span class="bandeau-confiance__item-text">Installateur RGE QualiPV<small>Numéro sur demande</small></span>
```
par :
```html
      <span class="bandeau-confiance__item-text">Installateur RGE QualiPV</span>
```

**Modification 2 — Bloc SIRET (à supprimer intégralement)** :

Supprimer ce bloc complet (incluant les espaces/indentation) :
```html
    <div class="bandeau-confiance__item">
      <span class="bandeau-confiance__item-icon" aria-hidden="true">🏢</span>
      <span class="bandeau-confiance__item-text">SAS Blue Energie<small>SIRET 882 483 274</small></span>
    </div>
```

**Modification 3 — Bloc Avis Google placeholder (à supprimer intégralement)** :

Supprimer ce bloc complet :
```html
    <div class="bandeau-confiance__item bandeau-confiance__item--placeholder">
      <span class="bandeau-confiance__item-icon" aria-hidden="true">★</span>
      <span class="bandeau-confiance__item-text">Avis Google<small>Activation prochaine</small></span>
    </div>
```

**Structure finale attendue du bandeau** (sur les 15 pages) :
```html
<aside class="bandeau-confiance" role="region" aria-label="Garanties Blue Energie">
  <div class="bandeau-confiance__inner">
    <div class="bandeau-confiance__item">
      <img src="/images/logo-qualipv.png" alt="Logo RGE QualiPV — qualification installateur photovoltaïque">
      <span class="bandeau-confiance__item-text">Installateur RGE QualiPV</span>
    </div>
    <div class="bandeau-confiance__item">
      <span class="bandeau-confiance__item-icon" aria-hidden="true">🛡️</span>
      <span class="bandeau-confiance__item-text">Garantie décennale<small>Couverture 10 ans</small></span>
    </div>
  </div>
</aside>
```

Note : on **garde** le `<small>Couverture 10 ans</small>` sous la décennale (info utile, pas redondante). Seul le `<small>Numéro sur demande</small>` du bloc QualiPV part.

### Étape 3 — Ajustement CSS (5 min)

Éditer `public_html/assets/css/bandeau-confiance.css` :

**Changement 1 — Grille desktop : passer de 4 à 2 colonnes**

Remplacer :
```css
.bandeau-confiance__inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  align-items: center;
}
```
par :
```css
.bandeau-confiance__inner {
  max-width: 900px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  align-items: center;
  justify-items: center;
}
```

Justification : avec 2 enfants au lieu de 4, on resserre la largeur max (900 px au lieu de 1200) et on centre les items pour un rendu équilibré.

**Changement 2 — Media query mobile : passer à 1 colonne empilée**

Remplacer le bloc `@media (max-width: 767px)` actuel :
```css
@media (max-width: 767px) {
  .bandeau-confiance__inner {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem 1rem;
  }
  ...
}
```
par :
```css
@media (max-width: 767px) {
  .bandeau-confiance__inner {
    grid-template-columns: 1fr;
    gap: 0.5rem;
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
```

Justification : avec 2 blocs seulement, sur mobile on les empile verticalement (1 colonne) plutôt que de garder 2 colonnes étroites. Lecture plus rapide, blocs plus larges.

**Changement 3 — Supprimer la media query 380 px devenue inutile**

Supprimer entièrement ce bloc (la 1-colonne est déjà appliquée dès 767 px) :
```css
@media (max-width: 380px) {
  .bandeau-confiance__inner {
    grid-template-columns: 1fr;
    gap: 0.4rem;
  }
}
```

**Changement 4 — Nettoyer le style placeholder devenu orphelin**

Supprimer la règle `.bandeau-confiance__item--placeholder` (plus aucun élément ne porte cette classe) :
```css
.bandeau-confiance__item--placeholder {
  opacity: 0.6;
  font-style: italic;
}
```

### Étape 4 — Validation finale (10 min)

1. **Vérifier qu'aucun fichier HTML ne contient plus « SIRET 882 483 274 » dans le bandeau** :
   ```bash
   grep -l "SIRET 882 483 274" public_html/*.html public_html/blog/*.html public_html/zones/*.html
   ```
   Doit retourner **uniquement** `public_html/mentions-legales.html`, `public_html/cgv.html` et `public_html/politique-confidentialite.html` (où le SIRET reste, normal). Toute autre page = bug, à corriger.

2. **Vérifier qu'aucun fichier HTML ne contient plus « Numéro sur demande »** :
   ```bash
   grep -rn "Numéro sur demande" public_html/
   ```
   Doit retourner **0 résultat**.

3. **Vérifier qu'aucun fichier HTML ne contient plus « Avis Google » dans le bandeau** :
   ```bash
   grep -rn "Avis Google" public_html/
   ```
   Doit retourner **0 résultat** (la mention « Avis Google » sera réintégrée ailleurs en Session 17).

4. **Vérifier qu'aucun fichier HTML ne contient plus « Activation prochaine »** :
   ```bash
   grep -rn "Activation prochaine" public_html/
   ```
   Doit retourner **0 résultat**.

5. **Vérifier que le logo QualiPV et la mention décennale restent présents sur les 15 pages** :
   ```bash
   grep -c "logo-qualipv.png" public_html/index.html public_html/aides-2026.html public_html/cgv.html public_html/contact.html public_html/installation-photovoltaique.html public_html/materiel-panneaux-solaires.html public_html/mentions-legales.html public_html/merci.html public_html/politique-confidentialite.html public_html/realisations.html public_html/zones-intervention.html public_html/blog/index.html public_html/blog/2026-05-aides-solaires-avant-1er-juillet.html public_html/blog/2026-05-batterie-virtuelle-attention-jpme.html public_html/zones/annecy.html
   grep -c "Garantie décennale" public_html/index.html public_html/aides-2026.html public_html/cgv.html public_html/contact.html public_html/installation-photovoltaique.html public_html/materiel-panneaux-solaires.html public_html/mentions-legales.html public_html/merci.html public_html/politique-confidentialite.html public_html/realisations.html public_html/zones-intervention.html public_html/blog/index.html public_html/blog/2026-05-aides-solaires-avant-1er-juillet.html public_html/blog/2026-05-batterie-virtuelle-attention-jpme.html public_html/zones/annecy.html
   ```
   Chaque page doit retourner **1+** pour les deux greps.

6. **Vérifier que le CSS est cohérent** :
   ```bash
   grep -n "repeat(2, 1fr)" public_html/assets/css/bandeau-confiance.css
   grep -c "repeat(4" public_html/assets/css/bandeau-confiance.css
   grep -c "placeholder" public_html/assets/css/bandeau-confiance.css
   ```
   `repeat(2, 1fr)` doit être présent. `repeat(4` doit retourner **0**. `placeholder` doit retourner **0**.

7. **Vérifier que le SIRET reste bien présent dans les pages légales** :
   ```bash
   grep -c "882 483 274" public_html/mentions-legales.html public_html/cgv.html public_html/politique-confidentialite.html
   ```
   Chaque ligne doit retourner **1+**.

### Étape 5 — Mise à jour table d'avancement (3 min)

1. Ouvrir `SESSIONS-CODE-A-VENIR.md` et localiser la ligne `| Session 18 — Bandeau confiance RGE + décennale |`.
2. Juste après cette ligne, **insérer une nouvelle ligne** :
   ```
   | Session 18-V2 — Nettoyage bandeau confiance | ✅ **DÉPLOYÉ** | `PROMPT-SESSION-18-V2.md` |
   ```
3. Mettre à jour la date d'en-tête : `## État d'avancement (mise à jour 2026-05-19)`.
4. Vérification : `grep -c "Session 18-V2.*DÉPLOYÉ" SESSIONS-CODE-A-VENIR.md` doit retourner **1**.

### Étape 6 — Commit + push (5 min)

```bash
git add public_html/assets/css/bandeau-confiance.css \
        public_html/index.html public_html/aides-2026.html public_html/cgv.html \
        public_html/contact.html public_html/installation-photovoltaique.html \
        public_html/materiel-panneaux-solaires.html public_html/mentions-legales.html \
        public_html/merci.html public_html/politique-confidentialite.html \
        public_html/realisations.html public_html/zones-intervention.html \
        public_html/blog/index.html \
        "public_html/blog/2026-05-aides-solaires-avant-1er-juillet.html" \
        "public_html/blog/2026-05-batterie-virtuelle-attention-jpme.html" \
        public_html/zones/annecy.html \
        SESSIONS-CODE-A-VENIR.md
git commit -m "Session 18-V2 : nettoyage bandeau confiance (retire SIRET/SAS/Avis Google + \"Numéro sur demande\")"
git push origin main
```

Si la liste des 15 pages diffère de ce qui a été trouvé par grep à l'étape 0, adapter le `git add` en conséquence. **Ne PAS faire `git add -A`** (risque d'inclure des fichiers de backup ou des fichiers hors scope).

## Décisions déjà prises (ne demande RIEN)

| Sujet | Décision |
|---|---|
| Éléments à retirer du bandeau | « Numéro sur demande » (sous QualiPV) + bloc SAS/SIRET + bloc placeholder Avis Google |
| Éléments qui RESTENT dans le bandeau | Logo QualiPV (avec label « Installateur RGE QualiPV »), mention « Garantie décennale » (avec sous-texte « Couverture 10 ans ») |
| SIRET ailleurs | Reste dans `mentions-legales.html`, `cgv.html`, `politique-confidentialite.html` — ne pas y toucher |
| Avis Google | Ne va PAS dans le bandeau. Sera intégré dans home/réalisations en Session 17 (hors scope V2) |
| Grille CSS desktop | `repeat(2, 1fr)` au lieu de `repeat(4, 1fr)`, `max-width: 900px` |
| Grille CSS mobile (≤ 767 px) | `1fr` (empilement vertical) |
| Media query 380 px | Supprimée (redondante avec la nouvelle règle 767 px) |
| Règle `--placeholder` | Supprimée du CSS (devenue orpheline) |
| Header.html partial | Pas concerné (ne contient pas le bandeau) |
| Backup | `.backup-pre-session18v2` sur chaque fichier touché |
| Git workflow | Pull au début, commit + push direct sur `origin/main` |

## Interdictions strictes

- ❌ Ne supprime PAS le logo QualiPV ni le label « Installateur RGE QualiPV »
- ❌ Ne supprime PAS la mention « Garantie décennale » + « Couverture 10 ans »
- ❌ Ne supprime PAS le SIRET des pages légales (`mentions-legales.html`, `cgv.html`, `politique-confidentialite.html`) — uniquement du bandeau
- ❌ Ne touche PAS à `public_html/partials/header.html` (il ne contient pas le bandeau)
- ❌ N'ajoute PAS de JS
- ❌ Ne refactore PAS le bandeau en partial (autre session)
- ❌ Ne change PAS les couleurs, polices, espacements généraux du bandeau (uniquement la grille)
- ❌ Ne pose AUCUNE question au user
- ❌ Ne fais PAS `git add -A` (risque d'inclure les `.backup-pre-session18v2`)

## En cas de blocage

1. Diagnostique
2. Tente 2 solutions
3. Si une page sur 15 résiste (structure HTML légèrement différente, indentation inattendue) → adapte localement et signale la page dans le rapport
4. Si toujours bloqué, passe à la page suivante et liste les pages KO dans le rapport
5. NE STOPPE PAS pour poser une question

## Tone et style code

- Pas de blabla, pas de « bien sûr »
- Pas d'emoji dans le rapport final
- Travail silencieux, rapport à la fin

## Format du rapport final

```markdown
# Session 18-V2 — Terminé

## Fichiers modifiés (HTML — 15 pages attendues)
- public_html/index.html
- public_html/aides-2026.html
- public_html/cgv.html
- public_html/contact.html
- public_html/installation-photovoltaique.html
- public_html/materiel-panneaux-solaires.html
- public_html/mentions-legales.html
- public_html/merci.html
- public_html/politique-confidentialite.html
- public_html/realisations.html
- public_html/zones-intervention.html
- public_html/blog/index.html
- public_html/blog/2026-05-aides-solaires-avant-1er-juillet.html
- public_html/blog/2026-05-batterie-virtuelle-attention-jpme.html
- public_html/zones/annecy.html

(Si le grep initial trouve un nombre différent, lister ici la vraie liste.)

## Fichier modifié (CSS)
- public_html/assets/css/bandeau-confiance.css (grille 4→2 cols, mobile 2→1 col, suppression .--placeholder et media 380 px)

## Backups créés
- 15 × *.backup-pre-session18v2 HTML
- 1 × bandeau-confiance.css.backup-pre-session18v2

## Vérifications
- grep "SIRET 882 483 274" : présent uniquement dans mentions-legales.html / cgv.html / politique-confidentialite.html (✅)
- grep "Numéro sur demande" : 0 résultat (✅)
- grep "Avis Google" : 0 résultat (✅)
- grep "Activation prochaine" : 0 résultat (✅)
- grep "logo-qualipv.png" sur les 15 pages : 1+ par page (✅)
- grep "Garantie décennale" sur les 15 pages : 1+ par page (✅)
- CSS : `repeat(2, 1fr)` présent, `repeat(4` absent, `placeholder` absent (✅)
- SESSIONS-CODE-A-VENIR.md : ligne Session 18-V2 ajoutée (✅)

## Git
- Branche : main
- Pull initial : OK / KO
- Commit : [hash + message]
- Push origin main : OK / manuel requis

## À faire côté Neil
1. Téléverser sur Hostinger via hPanel :
   - public_html/assets/css/bandeau-confiance.css
   - Les 15 pages HTML modifiées
2. Vider le cache Hostinger
3. Tester sur https://blueenergie.fr/ :
   - Le bandeau ne contient plus que 2 blocs (logo QualiPV + décennale)
   - Plus de mention SIRET dans le header
   - Plus de placeholder « Avis Google · Activation prochaine »
   - Plus de sous-texte « Numéro sur demande »
   - Layout équilibré desktop (2 cols centrées) et mobile (1 col empilée)
4. Vérifier 2-3 autres pages (/blog/, /merci.html, /zones/annecy.html, /mentions-legales.html) pour cohérence visuelle
5. Vérifier que les pages légales (`/mentions-legales.html`, `/cgv.html`) affichent toujours le SIRET dans leur corps de texte

## Prochaine session recommandée
Session 17 (avis Google dynamiques) — Place ID déjà connu (`ChIJHUKhFuCfDykRkkLTeN-wm3c`), clé API Places à récupérer côté Neil. Le module avis ira dans home + page réalisations (pas dans le bandeau, décision V2).

Alternative : Session 16 (9 autres pages géolocalisées) ou Session 10 (formulaire + reCAPTCHA).

## Blocages éventuels
(vide si tout OK, sinon détailler par page)
```

## === FIN PROMPT ===

---

## Notes hors prompt (pour Neil)

- **Avis Google séparé (Session 17)** : la décision de cette V2 c'est que les avis Google vont **ailleurs** (home + page réalisations, en module dédié). On retire donc dès maintenant le placeholder du bandeau pour ne pas envoyer un signal d'inachèvement aux visiteurs entre maintenant et la Session 17.

- **Vérification visuelle après upload** : prends bien quelques secondes pour vérifier que le bandeau ne paraît pas « vide » avec 2 blocs seulement. La grille a été resserrée (`max-width: 900px` + `justify-items: center`) précisément pour éviter ça. Si tu trouves le rendu trop dépouillé, deux options pour une V3 ultérieure :
  - Réintégrer une mini-stat (« 100+ installations en Haute-Savoie » ou similaire) à la place du SIRET, plus orientée preuve sociale que mention légale.
  - Centrer le bandeau en flex plutôt que grid, avec un séparateur visuel (`|`) entre les deux blocs.

- **Refactor en partial (futur)** : aujourd'hui le bandeau est dupliqué 15 fois. Quand tu auras du temps calme, ça mérite une mini-session pour le sortir dans `public_html/partials/bandeau-confiance.html` et le charger via le loader JS comme `header.html` / `footer.html`. Ça évitera de devoir refaire ce genre de modif sur 15 fichiers à la prochaine itération. Ce n'est PAS le scope V2 (trop intrusif pour un simple nettoyage).

- **SIRET dans le footer ?** : à vérifier de ton côté — si le footer (partial `footer.html`) contient déjà le SIRET, alors l'info reste visible sur toutes les pages sans avoir besoin de la mettre dans le bandeau. Si elle n'y est PAS, c'est probablement une bonne idée de l'ajouter au footer (mais hors scope V2 aussi).
