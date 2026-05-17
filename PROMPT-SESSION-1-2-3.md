# Prompt Session 1+2+3 — pour Claude Code

> **À coller dans une nouvelle session Claude Code lancée DEPUIS la racine `blueenergie.fr/`.**
> Le dev (Claude Code) doit travailler ~3 h sans poser une seule question.
> Toutes les décisions sont prises ci-dessous.

---

## Mode d'emploi (côté Neil)

1. Ouvre un terminal
2. `cd "/Users/neillothian/Documents/Claude/Projects/blueenergie.fr"`
3. Lance Claude Code : `claude`
4. Quand le chat s'ouvre, copie-colle tout ce qui est entre `=== DÉBUT PROMPT ===` et `=== FIN PROMPT ===`
5. Laisse tourner. Le dev rend son rapport à la fin.

---

## === DÉBUT PROMPT ===

Tu es développeur web senior. Tu travailles sur le site **blueenergie.fr** (installation de panneaux photovoltaïques en Haute-Savoie). Stack : HTML/CSS/JS pur, pas de framework. Hébergement Hostinger.

Tu travailles maintenant dans une session Claude Code lancée depuis la racine du projet. Le code source du site est dans `public_html/`.

## Ta mission

Exécuter d'une traite les **Sessions 1, 2 et 3** du plan de refonte décrit dans `SESSIONS-CODE-A-VENIR.md`. Tu ne dois poser **AUCUNE question** au user jusqu'à la livraison finale. Toutes les décisions sont prises ci-dessous.

Durée estimée : 2-3 heures. Autonomie totale.

## Workflow obligatoire

### Étape 0 — Initialisation (5 min)

1. Crée une todo list interne avec TodoWrite (10 tâches : 7 modifs Session 1 + 1 création Session 2 + 1 modif Session 3 + 1 validation finale)
2. Sauvegarde le fichier actuel : `cp public_html/index.html public_html/index.html.backup-pre-session1`
3. Si git n'est pas init, propose-le mais ne bloque pas dessus. Si git est init, fais un commit de l'état avant modif : `git add -A && git commit -m "snapshot avant session 1"` (silencieux, ne pas bloquer si erreur)

### Étape 1 — Lecture contexte (10 min)

Lis dans cet ordre, uniquement :
1. `audit-blueenergie.md` — les 38 problèmes identifiés (lire en entier)
2. `SESSIONS-CODE-A-VENIR.md` — uniquement sections Session 1, 2, 3
3. `WIREFRAMES-PAGES.md` — uniquement section « 9. merci.html »
4. `public_html/index.html` — lecture complète (1148 lignes)

Ne lis pas les autres .md sauf besoin spécifique pendant le travail.

### Étape 2 — Session 1 (45 min) — Correctifs HTML critiques

Modifs à appliquer sur `public_html/index.html` :

1. **Ajouter `<!DOCTYPE html>`** en toute première ligne (avant `<html>`)
2. **Remplacer `<html>`** par `<html lang="fr">`
3. **Supprimer entièrement** la balise `<base href="." />` (ligne 1 ou début du `<head>`)
4. **Fermer le bloc CSS** non clos vers la ligne 629 : la règle `.presentation-image { width: 100%; max-width: 300px; height: auto;` doit être fermée par `}` avant le `</style>`. Vérifier qu'aucune autre règle CSS n'est cassée.
5. **Corriger la redirection formulaire** : chercher `https://blue-energie.fr/merci` et remplacer par `https://blueenergie.fr/merci.html` (avec extension)
6. **Ajouter `rel="noopener noreferrer"`** à tous les `target="_blank"` (3 occurrences : SOLAREDGE, K2 Systems, Esdec). Pattern à chercher : `target="_blank"` sans `rel=` à côté.
7. Vérifier qu'aucune balise n'est mal fermée. Compter les `<div>` vs `</div>`, `<section>` vs `</section>`, etc.

Marque chaque tâche `completed` au fur et à mesure dans la todo list.

### Étape 3 — Session 2 (45 min) — Création de merci.html

Crée `public_html/merci.html` avec :

- DOCTYPE html5 + `<html lang="fr">`
- `<head>` :
  - charset UTF-8, viewport responsive (`width=device-width, initial-scale=1.0`)
  - `<title>Demande envoyée — Blue Energie</title>`
  - `<meta name="description" content="Votre demande d'étude solaire a bien été reçue. Nous vous recontactons sous 24-48h.">`
  - `<meta name="robots" content="noindex,nofollow">` (pas d'indexation)
  - CSS inline (variables couleurs : `--primary-blue: #4fc7ef`, `--primary-orange: #fb9641`, blanc)
  - Font system : `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`
  - Charger le Google tag GA4 : `G-JEG722VJTV` (copier le bloc depuis index.html lignes ~630-639)
- `<body>` :
  - Navbar minimaliste : juste le logo Blue Energie (réutiliser `images/Logo-blue-energie.png`), cliquable vers `/`
  - Section centrale (flex column, centré, padding généreux) :
    - Icône check verte (SVG inline, cercle vert avec coche blanche, ~80px)
    - `<h1>Merci pour votre demande !</h1>`
    - Paragraphe : « Nous avons bien reçu votre demande d'étude photovoltaïque. Notre équipe vous recontacte sous 24 à 48 heures ouvrées au numéro que vous avez indiqué. »
    - Sous-paragraphe : « En attendant, vous pouvez : »
    - 3 boutons-liens (style cohérent avec `.cta-button` du site) :
      - « Voir nos réalisations » → `/#realisations`
      - « Découvrir notre processus » → `/#processus`
      - « Retour à l'accueil » → `/`
  - Footer minimal :
    - `<p>Blue Energie - Solutions Photovoltaïques</p>`
    - `<p>Téléphone : <a href="tel:0761504385">07 61 50 43 85</a></p>`
    - `<p>Email : neil.lothian@blueenergie.fr</p>`
    - `<!-- TODO: ajouter lien mentions-legales.html quand créé (Session 4) -->`
- `<script>` juste avant `</body>` :
  - Déclencher événement GA4 conversion :
    ```js
    document.addEventListener('DOMContentLoaded', function() {
      if (typeof gtag === 'function') {
        gtag('event', 'generate_lead', {
          'event_category': 'form',
          'event_label': 'study_request'
        });
      }
    });
    ```

Tout en single-file. Cohérence visuelle obligatoire avec `index.html`.

### Étape 4 — Session 3 (30 min) — Remplacement Google Maps

Dans `public_html/index.html` :

1. **Localiser** le `<div id="map" style="height: 300px; ...">` (ligne ~1028)
2. **Localiser** le bloc JavaScript Google Maps en bas de page : la fonction `initMap()`, le `document.addEventListener('DOMContentLoaded', ...)` qui crée le script Google Maps avec `YOUR_GOOGLE_MAPS_API_KEY`. C'est lignes ~1049-1074.
3. **Supprimer** le `<div id="map">` ET tout le bloc JS Google Maps
4. **Remplacer** le `<div id="map">` par cette iframe OpenStreetMap :

```html
<div style="margin-top: 20px; border-radius: 10px; overflow: hidden;">
  <iframe
    src="https://www.openstreetmap.org/export/embed.html?bbox=6.020%2C46.094%2C6.036%2C46.103&layer=mapnik&marker=46.0982%2C6.0279"
    width="100%"
    height="300"
    style="border: 0;"
    loading="lazy"
    title="Localisation Blue Energie - 11 Chemin de Perouza, 74520 Savigny"
    referrerpolicy="no-referrer-when-downgrade">
  </iframe>
  <p style="margin-top: 8px; font-size: 0.85em; text-align: center;">
    <a href="https://www.openstreetmap.org/?mlat=46.0982&mlon=6.0279#map=16/46.0982/6.0279" target="_blank" rel="noopener noreferrer" style="color: var(--primary-blue);">Voir en plein écran sur OpenStreetMap</a>
  </p>
</div>
```

5. **Vérifier** que tout le bloc JS Google Maps est bien supprimé. Aucune référence à `google.maps`, `initMap`, ou `maps.googleapis.com` ne doit subsister dans le fichier.

### Étape 5 — Validation finale (20 min)

1. **Validation HTML** : utilise `curl` pour passer `public_html/index.html` au validateur W3C :
   ```bash
   curl -H "Content-Type: text/html; charset=utf-8" --data-binary @public_html/index.html "https://validator.w3.org/nu/?out=json" | head -200
   ```
   Pareil pour `merci.html`. Logger les erreurs. Viser 0 erreur (les warnings sont acceptables).

2. **Vérifier la cohérence interne** :
   ```bash
   grep -c "<div" public_html/index.html
   grep -c "</div>" public_html/index.html
   ```
   Les deux nombres doivent être égaux.

3. **Vérifier qu'aucune référence cassée ne subsiste** :
   ```bash
   grep -n "YOUR_GOOGLE_MAPS_API_KEY" public_html/index.html
   grep -n "blue-energie.fr/merci" public_html/index.html
   grep -n "<base " public_html/index.html
   ```
   Les 3 commandes doivent retourner 0 résultats.

4. **Vérifier que les ancres du formulaire fonctionnent** : chercher `href="#study-request"` et confirmer que `id="study-request"` existe.

5. **Si git est init**, commit propre :
   ```bash
   git add -A
   git commit -m "Sessions 1-2-3: correctifs HTML critiques + page merci + OpenStreetMap"
   ```

## Décisions déjà prises (ne demande RIEN)

| Sujet | Décision |
|---|---|
| Stack | HTML/CSS/JS inline pour cette session (refactor en fichiers externes prévu Session 8) |
| Charset | UTF-8 partout |
| Lang | `fr` partout |
| Couleurs | `--primary-blue: #4fc7ef` / `--primary-orange: #fb9641` / blanc |
| Font | Segoe UI (chargée par défaut, pas de Google Fonts) |
| Tracking GA4 | `G-JEG722VJTV` (existant, on garde) |
| Carte | OpenStreetMap iframe (pas de clé API, pas de RGPD lourd) |
| Coordonnées GPS Blue Energie | 46.0982, 6.0279 (Savigny 74520) |
| URL page merci | `/merci.html` (avec extension, cohérent avec Hostinger statique) |
| Email contact | `neil.lothian@blueenergie.fr` (validé par le client, pas d'alias contact@) |
| RGE, TVA, hCaptcha, Places API | Hors scope de cette session, traités plus tard |
| Mentions légales | Pas créées dans cette session (Session 4), lien mis en commentaire HTML |
| Backup | OUI, créer `index.html.backup-pre-session1` avant tout |
| Git commit | OUI si git init, sinon ignorer silencieusement |

## Interdictions strictes

- ❌ Ne crée AUCUNE autre page que `merci.html`
- ❌ Ne touche PAS aux fichiers `public_html/css/style.css` ni `public_html/js/script.js` (orphelins, supprimés à la Session 8)
- ❌ Ne refactore PAS le CSS inline (Session 8)
- ❌ Ne change PAS le contenu du formulaire (Session 10)
- ❌ Ne mets PAS à jour le catalogue matériel (Session 6)
- ❌ Ne pose AUCUNE question au user sauf si bloqué par erreur tech bloquante
- ❌ N'ajoute PAS hCaptcha, Schema.org, sitemap, robots.txt, JSON-LD (sessions ultérieures)
- ❌ N'ajoute PAS de mentions légales / CGV / RGPD (Session 4)
- ❌ Ne supprime PAS le tracking GA4 (Session 5 traitera le consentement cookies)
- ❌ Ne lance PAS de serveur local (`python -m http.server`, etc.) — la validation W3C suffit

## En cas de blocage

Si une erreur technique survient (fichier illisible, validateur W3C indisponible, etc.) :
1. Diagnostique le problème
2. Tente 2 solutions avant d'abandonner cette tâche
3. Si toujours bloqué sur UNE tâche, passe à la suivante et liste le blocage dans le rapport
4. NE STOPPE PAS pour poser une question intermédiaire — termine au maximum ce que tu peux

## Tone et style

- Pas de blabla, pas de « bien sûr », pas de « avec plaisir »
- Pas d'emoji dans le code généré (uniquement dans le rapport final si utile)
- Tu travailles silencieusement, tu rapportes à la fin
- Garde la todo list à jour en interne (TodoWrite)

## Format du rapport final

À la fin, écris au user un seul message structuré :

```markdown
# Sessions 1, 2, 3 — Terminé

## Session 1 — Correctifs HTML critiques
- [x] DOCTYPE ajouté
- [x] lang="fr" sur <html>
- [x] <base> supprimé
- [x] Bloc CSS fermé (ligne X)
- [x] Redirection formulaire corrigée
- [x] rel="noopener noreferrer" sur N liens externes
- [x] Vérification balises ouvrantes/fermantes : OK

## Session 2 — Page merci.html
- [x] Fichier créé (X lignes)
- [x] Tracking GA4 conversion intégré
- [x] Design cohérent avec le site
- [x] noindex/nofollow positionné

## Session 3 — Carte OpenStreetMap
- [x] Code Google Maps supprimé
- [x] iframe OpenStreetMap intégrée
- [x] Marqueur sur Savigny 74520
- [x] Aucune référence à google.maps ou clé API ne subsiste

## Tests effectués
- Validation HTML W3C index.html : X erreurs / X warnings
- Validation HTML W3C merci.html : X erreurs / X warnings
- Cohérence balises : OK
- Grep YOUR_GOOGLE_MAPS_API_KEY : 0 résultat
- Grep blue-energie.fr/merci : 0 résultat
- Grep <base : 0 résultat

## Fichiers modifiés / créés
- public_html/index.html (modifié)
- public_html/merci.html (créé, X lignes)
- public_html/index.html.backup-pre-session1 (sauvegarde)
- Git commit : oui/non

## À faire côté toi (Neil)
1. Téléverser via Hostinger hPanel ou FTP :
   - public_html/index.html
   - public_html/merci.html
2. Tester en prod :
   - https://blueenergie.fr/ → vérifier visuel OK
   - https://blueenergie.fr/merci.html → vérifier page accessible
   - Soumettre le formulaire de test → doit rediriger vers /merci.html
   - Vérifier événement GA4 "generate_lead" dans la console Realtime
3. Si problème, restaurer la backup :
   cp public_html/index.html.backup-pre-session1 public_html/index.html

## Prochaines sessions disponibles
- Session 4 : mentions légales (besoin RGE confirmé + n° TVA via VIES)
- Session 5 : bandeau cookies tarteaucitron (autonome, OK)
- Session 6 : mise à jour matériel JA Solar / Solplanet / K2 (autonome, OK)

## Blocages éventuels
(liste vide si tout OK, sinon détailler ici)
```

## === FIN PROMPT ===

---

## Notes hors prompt (pour Neil)

**Si Claude Code n'a pas accès au dossier** : vérifie qu'il est lancé DEPUIS la racine `blueenergie.fr/`. Le `cd` est crucial avant `claude`.

**Tu peux laisser tourner sans surveillance** : aucune action interactive demandée. Tu reviens dans 2-3 h voir le rapport.

**Si tu veux que Claude Code commit/push sur git** : initialise le repo avant (`git init`) et configure les remotes. Sinon il ignorera silencieusement la partie git.

**Validateur W3C** : peut ne pas répondre en JSON propre dans certains cas. Si Claude Code rapporte un échec de validation, ce n'est pas grave — l'important est qu'il ait essayé. Tu valideras en prod après upload.

**Pour enchaîner les sessions suivantes** : reviens me voir avec le rapport de la Session 1+2+3, je te génère le prompt pour les sessions suivantes en tenant compte de ce qui a (ou pas) fonctionné.
