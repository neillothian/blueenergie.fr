# `_dropzone/` — Zone de dépôt utilisateur

## Règle d'or

**Seul l'utilisateur (Neil) dépose des fichiers dans ce dossier.**
Claude ne crée jamais de fichiers ici, ne déplace rien depuis l'extérieur vers ici. Il peut uniquement **lire** les fichiers déposés et les **déplacer vers `corbeille/`** une fois intégrés.

## À quoi ça sert

C'est une **boîte aux lettres entrante** pour transmettre à Claude des éléments à intégrer au projet :
- Logos partenaires (JA Solar, Solplanet, K2, Tigo, RGE QualiPV, QualitEnR…)
- Photos de chantiers réels (avant/après, toiture, coffret onduleur…)
- Captures d'écran / wireframes annotés
- PDF (devis, fiches techniques, témoignages clients)
- Tout autre asset à indexer, mapper, ou utiliser quelque part dans le site

## Workflow

1. **Neil** dépose un fichier dans `_dropzone/` (drag & drop depuis le Finder, l'app Google Drive, etc.)
2. **Neil** indique à Claude (dans le chat) le contexte du fichier :
   - À quoi il sert
   - Où il doit aller (ou « à toi de me dire »)
3. **Claude** :
   - Lit / analyse le fichier
   - L'**intègre** au projet : le copie/déplace vers son emplacement final dans `public_html/` (ex: `public_html/assets/img/partners/qualipv.png`), met à jour le code qui le référence, met à jour l'inventaire si besoin
   - **Déplace l'original** depuis `_dropzone/` vers `_dropzone/corbeille/` (jamais de suppression sèche — la corbeille sert de trace + de filet de sécurité)
4. **Neil** vide manuellement `corbeille/` quand il veut (ou jamais, selon son humeur)

## Ce qu'il ne faut PAS faire

- ❌ Claude ne dépose rien dans `_dropzone/` lui-même
- ❌ Claude ne supprime pas les fichiers de `_dropzone/` directement avec `rm` — il les déplace vers `corbeille/`
- ❌ On ne commite pas `_dropzone/` dans Git (à exclure via `.gitignore` si ce n'est pas déjà fait)
- ❌ Pas de fichiers sensibles ici (mots de passe, clés API en clair) — ce dossier est temporaire et lu par Claude

## État courant

Contenu déposé en attente d'intégration : voir `ls _dropzone/` (hors `corbeille/` et ce README).
