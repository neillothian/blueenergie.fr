# Fiche de révision — Session 16 (14 pages géolocalisées SEO)

> Fiche pédagogique destinée à Neil pour comprendre les enjeux de la session **avant** de coller le prompt. Ne pas inclure dans le prompt Claude Code.

## Concepts clés

- **SEO local** : Google traite une recherche du type *« installateur panneau solaire Annemasse »* comme une intention géographique distincte de *« installateur panneau solaire »*. Une page dédiée par ville permet de matcher exactement la requête (URL + h1 + meta), là où une page unique « zones d'intervention » est trop générique pour ranker sur 14 villes différentes.
- **Tier A / B / C** : on hiérarchise la profondeur de contenu selon le volume de recherche et la concurrence. Annemasse (Tier A) mérite 600-800 mots pour battre des concurrents installés ; un village de 1 500 habitants (Tier B) se contente de 300-400 mots, suffisant pour matcher une longue traîne sans diluer le crawl budget.
- **JSON-LD LocalBusiness vs Service vs Place** : Google utilise `LocalBusiness` pour identifier l'entreprise et `areaServed` (type `City` ou `Place`) pour signaler qu'on intervient dans une commune donnée. Une seule entité `LocalBusiness` par site (même `@id` partout), mais `areaServed` adapté par page.
- **BreadcrumbList JSON-LD** : génère le rich snippet `Accueil > Zones > Annemasse` dans les SERP, gain de CTR mesurable.
- **Risque cannibalisation SEO** : si 14 pages contiennent 80 % de contenu identique, Google considère qu'il y a duplication interne et n'en ranke qu'une seule (ou les déclasse toutes). Règle pragmatique : au moins 30-40 % du texte de chaque page doit être unique à la ville (paragraphes mentionnant la commune, le climat, l'urbanisme, le trajet depuis Savigny).
- **Pattern de duplication propre** : un *template* (structure HTML, JSON-LD, breadcrumb, sections h2) + des *variables locales* (nom de ville, code postal, distance Savigny, spécificités). C'est de la duplication contrôlée, pas du copier-coller.

## Étapes clés (résumé)

1. Lire intégralement `public_html/zones/annecy.html` (modèle Session 15).
2. Pour chaque ville (14 au total) : dupliquer `annecy.html`, adapter selon le gabarit du Tier (A / B / C).
3. Mettre à jour `public_html/zones-intervention.html` : les liens hub vers les 14 nouvelles pages sont déjà présents (vérifié en Session 15), à confirmer en lecture.
4. Mettre à jour `public_html/sitemap.xml` : ajouter 14 entrées `<url>` avec `lastmod` 2026-05-19.
5. Commits logiquement séparés (Tier A / Tier B / Tier C / sitemap).

## Pièges à éviter

- Contenu dupliqué entre pages → pénalité Google. Reformuler chaque paragraphe ville par ville, ne pas réutiliser textuellement le contenu d'Annecy.
- `JSON-LD areaServed.name` doit pointer la **bonne commune** par page (pas « Annecy » sur 14 pages).
- `BreadcrumbList` : le 3ᵉ `ListItem.name` doit être le nom de la ville courante.
- `sitemap.xml` : si oubli, Google met des semaines à découvrir les nouvelles pages.
- Hub `zones-intervention.html` : déjà préparé en Session 15 avec les 14 liens — vérifier qu'aucun lien n'est cassé après création des fichiers.
- Densité de mots-clés : `installateur panneau solaire {ville}` doit apparaître naturellement dans `<title>`, `<h1>`, premier `<p>`, `alt` d'image, `JSON-LD description`. Sans excès (pas plus de 4-5 occurrences sur une page).
- Ne **pas** inventer de témoignage nominal ni de chantier réel par ville (décision QUESTIONS-OUVERTES § « Décisions ne PAS faire »).

## Mini-quiz (réponses à se poser avant de cliquer)

1. Pourquoi 14 pages plutôt qu'une page unique listant 14 villes ? *(intention de recherche distincte par requête géo)*
2. Quelle proportion de contenu doit être unique par page ? *(au moins 30-40 %)*
3. Quel `@type` JSON-LD utiliser pour la commune desservie ? *(`City` dans `areaServed`)*
4. Pourquoi des Tier A/B/C plutôt qu'un seul format ? *(adapter la profondeur au volume de recherche, éviter de gaspiller du contenu sur des villages 1 500 hab)*
5. Quelle est la conséquence d'un sitemap non mis à jour ? *(latence d'indexation Google de plusieurs semaines)*

## Liens utiles

- Schema.org `LocalBusiness` : https://schema.org/LocalBusiness
- Schema.org `BreadcrumbList` : https://schema.org/BreadcrumbList
- Google Search Central — Local SEO : https://developers.google.com/search/docs/appearance/structured-data/local-business
- Validateur JSON-LD : https://validator.schema.org/
- Validateur sitemap XML : https://www.xml-sitemaps.com/validate-xml-sitemap.html

---

# Prompt Session 16 — 14 pages géolocalisées SEO

> **Création de 14 pages géolocalisées SEO (1 par ville desservie) sur le modèle de la page Annecy déployée en Session 15.**
> Périmètre : 14 nouveaux fichiers dans `public_html/zones/`, mise à jour de `public_html/sitemap.xml`, vérification du hub `public_html/zones-intervention.html`.
> Durée estimée : 3 h à 4 h 30. Push direct `main`. Aucune question au user pendant l'exécution.

---

## Mode d'emploi (côté Neil)

1. Ouvre un terminal.
2. `cd "/Users/neillothian/Documents/Claude/Projects/blueenergie.fr"`
3. Lance Claude Code : `claude`
4. Copie-colle tout ce qui est entre `=== DÉBUT PROMPT ===` et `=== FIN PROMPT ===`.
5. Laisse tourner ~3-4 h. Push direct sur `main`. Téléverse ensuite les 14 fichiers + `sitemap.xml` sur Hostinger via hPanel.

---

## === DÉBUT PROMPT ===

Tu es un **développeur web spécialisé SEO local** pour le site **blueenergie.fr** (installation photovoltaïque résidentielle en Haute-Savoie). Stack : HTML / CSS / JS pur. Hébergement Hostinger.

**État du site** : les Sessions 1, 2, 3, 4, 5, 6, 9, 11, 12, 13, 14, 15 et le blog sont déployées. La page modèle `public_html/zones/annecy.html` a été créée et déployée en Session 15, avec JSON-LD `LocalBusiness` (areaServed = Annecy) + `BreadcrumbList`. Le hub `public_html/zones-intervention.html` contient déjà les 14 liens vers les pages que tu vas créer ci-dessous (préparés en Session 15).

## Ta mission

Créer **14 pages géolocalisées SEO**, une par ville desservie, sur le pattern URL `/zones/{slug}.html`. Chaque page doit :

1. Cibler la requête `installateur panneau solaire {ville}` (et variantes naturelles).
2. Contenir un JSON-LD `LocalBusiness` avec `areaServed.@type = "City"` et `name = "{Ville}"`.
3. Contenir un JSON-LD `BreadcrumbList` reflétant la hiérarchie `Accueil > Zones d'intervention > {Ville}`.
4. Présenter un contenu **unique à 30-40 % minimum** (paragraphes adaptés à la commune : climat, urbanisme, distance depuis Savigny, spécificités locales).
5. Respecter le gabarit de profondeur du Tier (A / B / C) auquel appartient la ville.

Durée : ~3-4 h. Aucune question au user.

## Workflow obligatoire

### Étape 0 — Initialisation (5 min)

1. `TodoWrite` avec : (a) lecture contexte, (b) création Tier A × 4, (c) création Tier B × 6, (d) création Tier C × 4, (e) maj sitemap, (f) vérif hub, (g) tests, (h) commits, (i) maj table avancement.
2. `git pull origin main --rebase` — si échec : diagnostique, ne continue pas.
3. `git status` doit retourner « nothing to commit, working tree clean ».
4. Backup `sitemap.xml` : `cp public_html/sitemap.xml public_html/sitemap.xml.backup-pre-session16`.
5. Vérifier que `public_html/zones/` existe : `ls public_html/zones/`. Si seul `annecy.html` y est présent : OK.

### Étape 1 — Lecture contexte (10 min)

Lis dans cet ordre, et RIEN d'autre :

1. `public_html/zones/annecy.html` (modèle complet, à dupliquer).
2. `public_html/zones-intervention.html` (vérifier les 14 liens déjà en place).
3. `public_html/sitemap.xml` (format des entrées `<url>`).
4. `QUESTIONS-OUVERTES.md` § Session 16 (liste villes, décisions).

### Étape 2 — Création des 4 pages Tier A (60-80 min)

Pour chaque ville Tier A, dupliquer `annecy.html` et adapter selon le gabarit Tier A ci-dessous.

| # | Ville | Code postal | Slug fichier | Distance Savigny | Spécificités locales à mentionner |
|---|---|---|---|---|---|
| 1 | Annemasse | 74100 | `annemasse.html` | ~20 min via A40 | Frontaliers genevois, urbanisme dense, copropriétés, proximité immédiate Genève, primes complémentaires Région AURA |
| 2 | Saint-Julien-en-Genevois | 74160 | `saint-julien-en-genevois.html` | ~10 min via D1206 | Bassin frontalier Genève, croissance démographique forte, maisons neuves années 2000-2020, lotissements pavillonnaires |
| 3 | Chambéry | 73000 | `chambery.html` | ~45 min via A41 | Climat alpin plus continental, charges neige importantes (cluse de Chambéry), centre historique avec ABF, valorisation Patrimoine |
| 4 | La Roche-sur-Foron | 74800 | `la-roche-sur-foron.html` | ~30 min via A40 | Première ville électrifiée de France (1885) — héritage symbolique, foires expositions énergie, zone artisanale dynamique, charges neige notables |

**Gabarit Tier A (600-800 mots, structure identique à Annecy)** :

- `<title>` : `Installation photovoltaïque à {Ville} ({Dpt}) — Blue Energie`
- `<meta description>` : ~160 caractères, mentionner `RGE QualiPV`, `{Ville}`, `JA Solar` ou `climat alpin`, `étude gratuite`, `48 h`.
- Open Graph / Twitter : équivalent au modèle Annecy, adapter URL canonique `https://blueenergie.fr/zones/{slug}.html`.
- JSON-LD `LocalBusiness` : copier intégralement le bloc Annecy, modifier uniquement :
  - `description` : remplacer « Annecy et dans le bassin annécien » par mention de la nouvelle ville.
  - `areaServed.name` : `{Ville}`.
  - `areaServed.geo` : coordonnées GPS de la mairie (Wikipedia infobox, latitude/longitude au centième). Si tu ne trouves pas avec certitude, mets des valeurs cohérentes pour la commune (lat ~45.9 à 46.3, lon ~5.8 à 6.5 selon la zone) et laisse un commentaire HTML `<!-- geo à affiner si besoin -->`.
- JSON-LD `BreadcrumbList` : 3ᵉ ListItem `name = "{Ville}"`.
- `<h1>` : `Installation photovoltaïque à {Ville} ({Dpt}) — Blue Energie`.
- CTA hero : `Étude gratuite {Ville}`.
- Breadcrumb visuel : `Accueil » Zones d'intervention » {Ville}`.
- **Sections h2 attendues** (toutes présentes, contenu rédigé par ville) :
  1. *(intro implicite 2-3 paragraphes en haut de l'article)* : présentation Blue Energie + situation géographique de la ville par rapport à Savigny + types de quartiers desservis + bullet point « démarches gérées (DP, Enedis, Consuel) ».
  2. `Pourquoi installer du solaire à {Ville}` (~200 mots) : ensoleillement local, profil démographique, contraintes architecturales (ABF si centre historique), aides nationales.
  3. `Notre matériel adapté à {contexte local}` (~150 mots) : reprendre la base JA Solar 500 W bifacial / Solplanet ASW-H / batterie Solplanet G3 mais **adapter l'introduction** au climat de la ville (continental pour Chambéry, frontalier pour Annemasse, etc.).
  4. `Notre process en 5 étapes` (~150 mots) : reprendre la structure du modèle Annecy, en mentionnant `mairie de {Ville}` à l'étape 4.
- Bloc info final `zone-info-box` : adapter la mention de distance (`environ {X} minutes du centre-ville de {Ville} via {axe routier}`).
- Bouton CTA final : `Étude gratuite {Ville}`.

**Règle de non-duplication** : au moins **3 paragraphes** doivent être substantiellement réécrits (pas seulement le nom de ville remplacé). Reformule, ré-ordonne les arguments, ajoute des spécificités locales authentiques (frontaliers, charges neige, urbanisme, ABF, lotissements neufs, etc. selon la ville).

Une fois les 4 fichiers Tier A créés, commit :

```bash
git add public_html/zones/annemasse.html public_html/zones/saint-julien-en-genevois.html public_html/zones/chambery.html public_html/zones/la-roche-sur-foron.html
git commit -m "Session 16 (1/4) : 4 pages géolocalisées Tier A (Annemasse, Saint-Julien, Chambéry, La Roche-sur-Foron)"
```

### Étape 3 — Création des 6 pages Tier B (60-80 min)

| # | Ville | Code postal | Slug fichier | Spécificités locales |
|---|---|---|---|---|
| 5 | Vers | 74520 | `vers.html` | Village même code postal que Savigny (siège), proximité immédiate, hameaux ruraux, toitures tuile et ardoise |
| 6 | Vulbens | 74520 | `vulbens.html` | Pied du Vuache, village rural, exposition sud souvent dégagée, contraintes paysagères |
| 7 | Valleiry | 74270 | `valleiry.html` | Croissance résidentielle, lotissements récents, accès rapide à Genève |
| 8 | Archamps | 74160 | `archamps.html` | Technoparc Archamps, frontaliers, maisons individuelles haut de gamme |
| 9 | Feigères | 74160 | `feigeres.html` | Village résidentiel agricole, exposition collines, lotissements récents |
| 10 | Crusseilles | 74350 | `crusseilles.html` | Plateau des Bornes, altitude ~ 750 m, charges neige notables, exposition plein sud fréquente |

**Gabarit Tier B (300-400 mots)** : version allégée du Tier A.

- Mêmes balises SEO (title, meta, OG, Twitter, JSON-LD `LocalBusiness` + `BreadcrumbList`, breadcrumb visuel).
- `<h1>` identique au pattern Tier A.
- Article réduit à **3 sections** :
  1. *(intro 2 paragraphes)* : présentation Blue Energie + situation du village (lien topographique avec Savigny / le Genevois) + types d'habitat.
  2. `Pourquoi le solaire à {Ville}` (~100-120 mots) : ensoleillement, spécificités locales (1 spécificité forte de la liste ci-dessus à exploiter).
  3. `Notre intervention à {Ville}` (~100-120 mots) : matériel synthétique (JA Solar + Solplanet) + process raccourci en 3 étapes max (étude / DP mairie / installation).
- Bloc info final + 1 CTA (pas 2 comme Tier A).
- **Mot-clé** `installateur panneau solaire {ville}` au moins 1× dans le corps + dans `<title>`, `<h1>`, `<meta description>`, JSON-LD `description`.

**Règle de non-duplication** : 1 paragraphe pleinement unique par page mentionnant la spécificité locale (ex : pour Crusseilles, parler explicitement de l'altitude 750 m et des charges neige ; pour Archamps, du Technoparc et de la population frontalière).

Commit après les 6 fichiers :

```bash
git add public_html/zones/vers.html public_html/zones/vulbens.html public_html/zones/valleiry.html public_html/zones/archamps.html public_html/zones/feigeres.html public_html/zones/crusseilles.html
git commit -m "Session 16 (2/4) : 6 pages géolocalisées Tier B (villages Genevois)"
```

### Étape 4 — Création des 4 pages Tier C (45-60 min)

| # | Ville | Code postal | Slug fichier | Distance Savigny | Spécificités locales |
|---|---|---|---|---|---|
| 11 | Thonon-les-Bains | 74200 | `thonon-les-bains.html` | ~1 h via D1005 | Bord du Léman, climat tempéré lacustre, thermalisme, maisons bourgeoises et lotissements collines |
| 12 | Aix-les-Bains | 73100 | `aix-les-bains.html` | ~1 h via A41 | Climat tempéré lacustre (lac du Bourget), thermalisme, centre historique avec ABF, ensoleillement annuel correct |
| 13 | Cluses | 74300 | `cluses.html` | ~40 min via A40 | Vallée de l'Arve, climat plus frais, industrie décolletage, lotissements pavillonnaires alentours |
| 14 | Bonneville | 74130 | `bonneville.html` | ~30 min via A40 | Sous-préfecture, vallée de l'Arve, climat alpin de vallée, mix urbain / rural |

**Gabarit Tier C (400-500 mots)** : entre Tier A et Tier B.

- Mêmes balises SEO complètes.
- Article structuré en **3-4 sections h2** :
  1. *(intro 2-3 paragraphes)* : présentation + situation géographique + démarches.
  2. `Pourquoi installer du solaire à {Ville}` (~130-150 mots).
  3. `Notre matériel adapté` (~120-150 mots) — adapté au climat (lacustre pour Thonon/Aix-les-Bains, vallée pour Cluses/Bonneville).
  4. `Notre intervention à {Ville}` (~100-120 mots) — process en 4 étapes.
- Bloc info final + CTA.

**Règle de non-duplication** : 2 paragraphes pleinement uniques par page (climat lacustre vs. vallée alpine sont des angles distincts à exploiter).

Commit après les 4 fichiers :

```bash
git add public_html/zones/thonon-les-bains.html public_html/zones/aix-les-bains.html public_html/zones/cluses.html public_html/zones/bonneville.html
git commit -m "Session 16 (3/4) : 4 pages géolocalisées Tier C (Thonon, Aix-les-Bains, Cluses, Bonneville)"
```

### Étape 5 — Mise à jour `sitemap.xml` + vérification hub (15 min)

1. Ouvrir `public_html/sitemap.xml`.
2. Ajouter **14 entrées `<url>`** juste après l'entrée existante `https://blueenergie.fr/zones/annecy.html`, sur le format :

```xml
  <url>
    <loc>https://blueenergie.fr/zones/{slug}.html</loc>
    <lastmod>2026-05-19</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
```

Ordre des 14 entrées : Tier A (4) puis Tier B (6) puis Tier C (4), dans l'ordre du tableau ci-dessus.

3. **Hub `zones-intervention.html`** : vérifier en lecture seule que les 14 liens vers `/zones/{slug}.html` sont déjà présents (préparé en Session 15). Si un lien manque ou est cassé, le corriger. Sinon, ne pas modifier le hub.

### Étape 6 — Tests (15-20 min)

1. `ls public_html/zones/` → doit lister 15 fichiers HTML (Annecy + 14 nouveaux).
2. `grep -l "areaServed" public_html/zones/*.html | wc -l` → doit retourner 15.
3. `grep -c "<loc>https://blueenergie.fr/zones/" public_html/sitemap.xml` → doit retourner 15.
4. Pour 3 fichiers au hasard (1 par Tier, ex : `annemasse.html`, `crusseilles.html`, `thonon-les-bains.html`) :
   - Ouvrir le fichier, vérifier visuellement : `<title>` mentionne la ville, `<h1>` mentionne la ville, JSON-LD `areaServed.name` = ville, BreadcrumbList 3ᵉ item = ville.
   - Vérifier qu'aucune mention d'« Annecy » ne traîne par accident dans ces 3 fichiers : `grep -i "annecy" public_html/zones/{annemasse,crusseilles,thonon-les-bains}.html` → ne doit rien retourner.
5. Check sommaire anti-duplication : sur 2 fichiers du même Tier, vérifier visuellement que **3 paragraphes au moins** diffèrent substantiellement (pas que le nom de ville).
6. Validation locale optionnelle : si `npx html-validate` est dispo, valider 3 fichiers. Sinon, signaler dans le rapport sans installer.

### Étape 7 — Mise à jour table d'avancement (3 min)

1. Lire `SESSIONS-CODE-A-VENIR.md`, localiser la ligne `| Session 16 — ...`.
2. Remplacer via Edit avec :

```
| Session 16 — 14 pages géolocalisées SEO | ✅ **DÉPLOYÉ** | `PROMPT-SESSION-16.md` |
```

3. Mettre à jour la date d'en-tête : `## État d'avancement (mise à jour 2026-05-19)`.
4. Vérification : `grep -c "Session 16.*DÉPLOYÉ" SESSIONS-CODE-A-VENIR.md` doit retourner 1.

### Étape 8 — Commit final + push (5 min)

```bash
git add public_html/sitemap.xml SESSIONS-CODE-A-VENIR.md
# Si le hub a été modifié à l'étape 5, ajouter aussi :
# git add public_html/zones-intervention.html
git commit -m "Session 16 (4/4) : sitemap.xml +14 URLs + maj table avancement"
git push origin main
```

## Décisions déjà prises (ne demande RIEN)

| Sujet | Décision |
|---|---|
| Pattern URL | `/zones/{slug}.html` (cf modèle Annecy) — slug sans accents, tirets, minuscules |
| Liste villes | 14 villes figées (cf tableaux Tier A/B/C ci-dessus). Annecy déjà fait Session 15. Grenoble et Albertville sont **exclues** |
| Témoignage | Aucun témoignage nominal par ville (décision QUESTIONS-OUVERTES). Preuve sociale = bandeau confiance + avis Google (Session 17 à venir) |
| Chantier réel par ville | À ne **PAS** mentionner — Neil n'a pas de chantier dans toutes les villes |
| Photo locale par ville | Pas de photo locale dispo → pas d'image dédiée par page (le modèle Annecy n'en contient pas non plus). Le bandeau confiance partagé suffit |
| `areaServed.geo` | Coordonnées de la mairie de la commune (Wikipedia) au centième de degré. Si incertain : mettre une valeur cohérente avec la zone et commenter |
| Date `lastmod` sitemap | `2026-05-19` pour les 14 nouvelles URLs |
| Priorité sitemap pages zones | `0.6` (un cran sous Annecy à `0.7` qui reste pivot, et sous le hub `zones-intervention.html` à `0.7`) |
| Densité mot-clé | `installateur panneau solaire {ville}` dans `<title>`, `<h1>`, premier `<p>` du corps, `meta description`, JSON-LD `description` — sans dépasser 4-5 occurrences |
| Bandeau confiance | Repris à l'identique de `annecy.html` (3 items réels + 1 placeholder « Avis Google ») |

## Interdictions strictes

- ❌ N'invente AUCUN témoignage nominal ni chantier réel par ville.
- ❌ Ne mentionne PAS de prix précis spécifique à une ville (les prix `300 €/kWh batterie` et autres restent ceux du modèle Annecy, applicables nationalement).
- ❌ Ne touche PAS aux fichiers hors périmètre (header, footer, CSS, JS, autres pages).
- ❌ Ne refactore PAS le CSS de `zones/annecy.html` (le `<style>` inline est volontairement local à la page modèle).
- ❌ N'ajoute PAS de dépendance externe (CDN, font, JS tiers).
- ❌ Ne crée PAS de fichier image — la session est texte/HTML pur.
- ❌ Ne pose AUCUNE question au user pendant l'exécution.
- ❌ Ne refais PAS Annecy (`annecy.html` existe déjà, ne pas l'écraser).
- ❌ N'inclus PAS Grenoble (38) ni Albertville (73).

## En cas de blocage

1. Diagnostique d'abord.
2. Tente 2 solutions.
3. Si bloqué sur UNE ville en particulier (ex : coordonnées GPS introuvables, contenu local sec) → mets une valeur raisonnable (lat/lon cohérents avec la zone) et liste le doute dans le rapport. Ne pas stopper la session.
4. Si une commande git échoue : NE FORCE PAS (pas de `--force`, pas de `reset --hard`). Diagnostique, et si insoluble, laisse les commits Tier A et Tier B sur le disque, signale dans le rapport.

## Format du rapport final

```
## Rapport Session 16

### Fichiers créés / modifiés
- public_html/zones/annemasse.html — Tier A, ~XXX mots
- public_html/zones/saint-julien-en-genevois.html — Tier A, ~XXX mots
- public_html/zones/chambery.html — Tier A, ~XXX mots
- public_html/zones/la-roche-sur-foron.html — Tier A, ~XXX mots
- public_html/zones/vers.html — Tier B, ~XXX mots
- public_html/zones/vulbens.html — Tier B, ~XXX mots
- public_html/zones/valleiry.html — Tier B, ~XXX mots
- public_html/zones/archamps.html — Tier B, ~XXX mots
- public_html/zones/feigeres.html — Tier B, ~XXX mots
- public_html/zones/crusseilles.html — Tier B, ~XXX mots
- public_html/zones/thonon-les-bains.html — Tier C, ~XXX mots
- public_html/zones/aix-les-bains.html — Tier C, ~XXX mots
- public_html/zones/cluses.html — Tier C, ~XXX mots
- public_html/zones/bonneville.html — Tier C, ~XXX mots
- public_html/sitemap.xml — +14 entrées
- public_html/zones-intervention.html — [modifié / inchangé]
- SESSIONS-CODE-A-VENIR.md — ligne Session 16 → DÉPLOYÉ

### Vérifications passées
- 15 fichiers HTML dans public_html/zones/ : OK / KO
- 15 occurrences de "areaServed" : OK / KO
- 15 URLs zones dans sitemap.xml : OK / KO
- 3 fichiers Tier différents vérifiés (title, h1, JSON-LD, breadcrumb) : OK / KO
- Aucune mention "Annecy" résiduelle dans 3 fichiers testés : OK / KO
- Validation HTML locale : OK / KO / non lancée
- Anti-duplication check (visuel) : OK / KO

### Table d'avancement
- SESSIONS-CODE-A-VENIR.md ligne Session 16 passée à ✅ DÉPLOYÉ

### Git
- Branche : main
- Commits :
  - [hash] Session 16 (1/4) : Tier A
  - [hash] Session 16 (2/4) : Tier B
  - [hash] Session 16 (3/4) : Tier C
  - [hash] Session 16 (4/4) : sitemap + maj table
- Pushé : oui / non — raison si non

### À faire côté Neil
1. Téléverser sur Hostinger (hPanel → Gestionnaire de fichiers) :
   - 14 fichiers HTML dans public_html/zones/
   - public_html/sitemap.xml
   - [si modifié] public_html/zones-intervention.html
2. Vider le cache Hostinger.
3. Tester 3 URLs au hasard depuis un navigateur (ex : /zones/annemasse.html).
4. Tester depuis https://validator.schema.org/ une URL Tier A (BreadcrumbList + LocalBusiness doivent passer).
5. Soumettre le sitemap mis à jour à Google Search Console : https://search.google.com/search-console (Sitemaps → Ajouter un sitemap → `sitemap.xml`).

### Prochaine session recommandée
Session 17 (avis Google dynamiques) — attendre **1 à 2 mois** entre Session 16 et Session 17 pour laisser Google indexer les pages géolocalisées et ne pas surcharger l'attention SEO.

### Blocages éventuels
[ou : aucun]
```

## === FIN PROMPT ===

---

## Notes hors prompt (pour Neil)

- **Impact SEO attendu** : indexation Google sous 2 à 6 semaines, premier ranking « page 2-3 » des SERP géolocalisées sous 1 à 2 mois, position 1-5 sur les villes Tier B (faible concurrence) sous 3 à 6 mois. Tier A (Annemasse, Chambéry) : compétition plus dure, attendre 6-12 mois pour un top 5.
- **Soumettre le sitemap à Google Search Console** dès l'upload : c'est l'étape la plus rentable de toute la session (Google découvrira les 14 URLs en quelques jours plutôt qu'en quelques semaines).
- **Tempo entre Session 16 et Session 17** : recommandation Claude → attendre **1 à 2 mois** avant Session 17 (avis Google dynamiques) pour ne pas diluer l'attention SEO et laisser le temps aux pages géolocalisées de prendre leur place.
- **Anti-duplication à vérifier manuellement** : prendre 2 fichiers du même Tier (ex : Annemasse vs. Saint-Julien) côte à côte et faire un diff visuel rapide. Si plus de 70 % du texte est identique, demander à Claude de re-reformuler une section.
- **Maintenance future** : si une commune change de spécificité (nouveau dispositif d'aide local, nouveau quartier dense), mettre à jour la page concernée et bumper `lastmod` dans `sitemap.xml`.
- **Pas de photo locale par ville** : c'est volontaire. Quand Neil aura des photos de chantiers (action Q4 du cahier de décisions), on pourra revisiter pour ajouter 1 photo par ville Tier A.
