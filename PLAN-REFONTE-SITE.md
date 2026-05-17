# Plan de refonte — blueenergie.fr

> Document de pilotage de la refonte. Source : `audit-blueenergie.md` (38 points identifiés) + dossier client REGHEM (matériel réel 2025/2026) + objectifs business validés le 17/05/2026.
> Stack cible : HTML/CSS/JS pur, fichiers séparés. Pas de framework, pas de build complexe.

---

## Objectifs business validés

1. **Améliorer la conversion** du formulaire de demande d'étude
2. **Refléter le matériel réellement proposé** (JA Solar + Solplanet + K2 + Tigo en option) — le site parle aujourd'hui de SolarEdge/Mylight/Esdec, obsolètes
3. **Capitaliser sur les avis Google** (intégration dynamique via Places API)
4. **Référencement local Haute-Savoie + Savoie + Ain + Isère** (74+73+01+38)

---

## 8 chantiers priorisés

| # | Chantier | Priorité | Effort |
|---|---|---|---|
| 1 | Bugs critiques + obligations légales | 🔴 P0 | 4-5 h |
| 2 | Mise à jour du matériel (JA Solar / Solplanet / K2) | 🔴 P0 | 2-3 h |
| 3 | Éclatement mono-page → multi-pages | 🟠 P1 | 5-6 h |
| 4 | SEO local 4 départements | 🟠 P1 | 4-5 h |
| 5 | Refonte formulaire + sécurisation + page merci | 🟠 P1 | 3-4 h |
| 6 | Preuve sociale (RGE + avis Google dynamiques) | 🟠 P1 | 4-5 h |
| 7 | Refactor technique (CSS/JS séparés, perf, lazy) | 🟡 P2 | 4 h |
| 8 | Démarrage blog + 3 articles fondateurs | 🟡 P2 | 6-8 h |

Total estimé : **32 à 40 heures de développement**, réparties sur ~20 sessions de 1-2 h.

---

## Détail des chantiers

### 🔴 P0 — Chantier 1 — Bugs critiques + obligations légales

**Pourquoi** : 9 bugs critiques identifiés à l'audit (dont 3 bloquent les leads en prod), et 3 obligations légales françaises non respectées (mentions légales, RGPD/cookies, CGV) qui exposent à des sanctions CNIL et à la perte de confiance des prospects.

**Quoi** :
- Ajouter `<!DOCTYPE html>` et `<html lang="fr">`
- Corriger l'URL de redirection post-formulaire (`blue-energie.fr` → `blueenergie.fr`)
- Créer la page `/merci.html` (redirection cible)
- Supprimer `<base href="." />` inutile
- Fermer le bloc CSS `<style>` non clos
- Réparer ou remplacer Google Maps (clé placeholder cassée)
- Créer les pages `mentions-legales.html`, `cgv.html`, `politique-confidentialite.html` avec données réelles (SAS 882 483 274, Neil Lothian Président, Savigny 74520)
- Intégrer un bandeau de consentement cookies (tarteaucitron.js, gratuit, open source)
- Conditionner le chargement de GA4 au consentement

**Effort estimé** : 4-5 h (3 sessions)

---

### 🔴 P0 — Chantier 2 — Mise à jour du matériel

**Pourquoi** : Le site vitrine présente du matériel qui n'est plus proposé (SolarEdge, Mylight, Esdec). Tous les devis 2025/2026 sont sur JA Solar + Solplanet + K2 + Tigo. Le décalage tue la crédibilité dès qu'un prospect compare la vitrine au devis reçu.

**Quoi** :
- Réécrire la section « Choix du matériel » avec les vraies marques :
  - **Modules** : JA Solar bifacial type N (500 W, gain 5-10 %)
  - **Onduleur hybride** : Solplanet ASW-H S2 (avec backup, EN 50549-1 certifié)
  - **Batterie modulaire** : Solplanet G3 (5,12 kWh par module, jusqu'à plusieurs modules empilables)
  - **Structure** : K2 Systems (étude technique projet par projet, assurance décennale K2 incluse)
  - **Optimiseurs** : Tigo TS4 universel (option, gestion par module)
- Remplacer les vidéos YouTube SolarEdge par des vidéos JA Solar / Solplanet (à fournir par toi) ou retirer le bloc vidéos si pas de remplacement
- Ajouter un encart « Pourquoi ces marques » (gamme premium, garanties 25 ans, fabrication européenne pour onduleur, certifications)
- Mettre à jour les sections « Réalisations » qui mentionnent Mylight Crystal

**Effort estimé** : 2-3 h (1-2 sessions)

---

### 🟠 P1 — Chantier 3 — Éclatement mono-page → multi-pages

**Pourquoi** : Un site mono-page = une seule URL indexable = surface SEO minimale. Impossible de capter les requêtes long-tail. Concurrents avec pages dédiées prennent automatiquement l'avantage. Aussi nécessaire pour les chantiers 4 (SEO local) et 8 (blog).

**Quoi** :
- Créer l'arborescence finale :
  - `index.html` (accueil, plus court qu'aujourd'hui, redirige vers pages internes)
  - `installation-photovoltaique.html` (offre détaillée particuliers)
  - `materiel-panneaux-solaires.html` (catalogue détaillé)
  - `aides-2026.html` (prime autoconso, MaPrimeRénov', TVA réduite, vente surplus)
  - `realisations.html` (galerie complète, plus de cartes)
  - `zones-intervention.html` (hub vers pages locales — voir chantier 4)
  - `contact.html` (formulaire complet)
  - `mentions-legales.html`, `cgv.html`, `politique-confidentialite.html`
  - `merci.html`
- Extraire **header + footer + navbar** en partials inclus via `fetch()` JS (sans build, compatible débutant) ou via copier-coller maîtrisé si tu préfères la simplicité

**Effort estimé** : 5-6 h (3 sessions)

---

### 🟠 P1 — Chantier 4 — SEO local 4 départements

**Pourquoi** : Objectif #4 explicite. La zone 74+73+01+38 couvre ~3,5 millions d'habitants. Sans pages géolocalisées, impossible de remonter sur « panneaux solaires Annecy », « installateur photovoltaïque Chambéry », etc.

**Quoi** :
- Créer 1 page par ville prioritaire (10 villes max pour démarrer) :
  - **74** : Annecy, Annemasse, Thonon-les-Bains, La Roche-sur-Foron, Cluses
  - **73** : Chambéry, Aix-les-Bains, Albertville
  - **01** : Bourg-en-Bresse (à valider)
  - **38** : Grenoble (à valider)
- Pour chaque page : titre `Installation panneaux solaires [Ville] ([dpt]) — Blue Energie`, contenu original 400-600 mots (ensoleillement local, aides locales si pertinent, témoignage local, CTA étude gratuite), JSON-LD `LocalBusiness` avec `areaServed`
- Meta tags optimisés sur toutes les pages : `description`, Open Graph (image partage), Twitter Card
- JSON-LD `Organization` global avec SIRET, RGE, adresse
- Sitemap.xml + robots.txt
- Soumission Google Search Console
- Création / optimisation Google Business Profile (action côté toi, pas dev)

**Effort estimé** : 4-5 h (3 sessions)

⚠️ **Attention** : 4 départements c'est ambitieux. On commence par 10 villes max, on monte en charge si Google Search Console montre du trafic.

---

### 🟠 P1 — Chantier 5 — Refonte formulaire + sécurisation + page merci

**Pourquoi** : Aujourd'hui la clé Web3Forms est exposée sans protection (spam imminent), la page de redirection post-soumission est cassée (404 garanti), et l'UX du formulaire est dégradée (radios empilées, longueur excessive).

**Quoi** :
- Activer **hCaptcha** ou **Cloudflare Turnstile** (gratuit, supporté nativement par Web3Forms)
- Ajouter un **champ honeypot** invisible (filtre les bots basiques)
- Créer la **page `/merci.html`** : confirmation de réception, prochaines étapes, lien retour accueil, déclenchement d'événement GA4 conversion
- Corriger la redirection : `blue-energie.fr` → `blueenergie.fr`
- Refondre l'**UX du formulaire** :
  - Radios alignés en ligne avec espacement correct
  - Sections clairement séparées (titres visuels)
  - Indicateur de progression (étape 1/4, 2/4…)
  - Validation inline (vert/rouge en temps réel)
  - Réduire les champs obligatoires au minimum vital, le reste en optionnel
- Email pro : créer alias `contact@blueenergie.fr` pour ne plus exposer `neil.lothian@`

**Effort estimé** : 3-4 h (2 sessions)

---

### 🟠 P1 — Chantier 6 — Preuve sociale (RGE + avis Google dynamiques)

**Pourquoi** : Objectif #3 explicite. Aujourd'hui aucune preuve sociale visible : pas de logo RGE, pas d'avis, pas de certifications. Le secteur du solaire est miné par les arnaques → la confiance est le levier de conversion #1.

**Quoi** :
- **Bandeau de confiance permanent** en header ou sticky :
  - Logo RGE QualiPV
  - Mention « Assurance décennale »
  - SIRET visible
  - Note Google moyenne (alimentée par l'API)
- **Section « Ils nous ont fait confiance »** sur l'accueil :
  - 3-5 derniers avis Google **dynamiques** via Google Places API (côté serveur PHP, cache 24h)
  - Note moyenne + nombre total d'avis
  - Lien « Voir tous les avis » vers la fiche Google Business
- **Section « Certifications »** sur page contact / about :
  - Certificat RGE (image)
  - Certificat assurance décennale (image)
  - Membre QualiPV / QualitEnR
- **Optionnel** : témoignages texte longs avec photo client (3 cas types, dont REGHEM si autorisation)

**Effort estimé** : 4-5 h (3 sessions)

⚠️ Prérequis : avoir une **clé Google Places API** (~5 min de setup côté toi sur console.cloud.google.com), et que la fiche **Google Business Profile soit créée et vérifiée**.

---

### 🟡 P2 — Chantier 7 — Refactor technique

**Pourquoi** : 19 points de qualité de code identifiés à l'audit. Le code actuel est un copier-coller IA peu maintenable (CSS dupliqué 3x, JS et CSS inlinés alors qu'ils existent en fichiers, iframes YouTube non lazy, image hero de 707 KB).

**Quoi** :
- **Extraire** tout le CSS inline dans `assets/css/style.css` (unique fichier minifié)
- **Extraire** tout le JS inline dans `assets/js/script.js` (unique fichier)
- **Supprimer** les anciens `css/style.css` et `js/script.js` orphelins (versions obsolètes)
- **Dédupliquer** les règles CSS (notamment `.presentation` qui apparaît 3x)
- **Lazy-load** les images sous la ligne de flottaison (`loading="lazy"`)
- **Lazy-load** les iframes YouTube (`loading="lazy"` + facade « lite-youtube »)
- **Compresser** les images (hero 707 KB → cible 250 KB, autres images en proportion)
- **Convertir** le logo PNG en SVG
- **Ajouter** `<link rel="canonical">`, favicon, theme-color, manifest.json basique
- **Tester** sur PageSpeed Insights : viser score mobile ≥ 90

**Effort estimé** : 4 h (2 sessions)

---

### 🟡 P2 — Chantier 8 — Démarrage blog + 3 articles fondateurs

**Pourquoi** : Le SEO local seul ne suffit pas — il faut du contenu éditorial pour capter les requêtes informationnelles (« combien coûte une installation 6 kWc », « rentabilité photovoltaïque 2026 », « MaPrimeRénov panneaux solaires »). Sans blog, les concurrents qui publient régulièrement passent devant.

**Quoi** :
- Créer le hub `blog/index.html` avec liste des articles
- Template `blog/article.html` (titre, date, auteur, contenu, FAQ, CTA, articles liés)
- Rédiger **3 articles fondateurs** :
  1. **« Combien coûte une installation photovoltaïque de 10 kWc en Haute-Savoie en 2026 ? »** (prix réels REGHEM, fourchettes selon batterie, retour sur investissement)
  2. **« Aides et primes pour le solaire en 2026 : guide complet »** (prime autoconso, MaPrimeRénov', TVA réduite, vente surplus)
  3. **« Pourquoi nous avons choisi JA Solar + Solplanet pour nos clients »** (technique, garanties, traçabilité, comparaison rapide)
- Chaque article : 800-1500 mots, structuré H2/H3, FAQ, JSON-LD `Article`
- Calendrier de publication : 1-2 articles par mois ensuite

**Effort estimé** : 6-8 h (4-5 sessions, dont 2 sessions de pur rédactionnel à valider avec toi)

---

## Phasage recommandé

| Semaine | Chantiers |
|---|---|
| **S1** | Chantier 1 (P0 légal/bugs) — déblocage immédiat |
| **S2** | Chantier 2 (matériel) + Chantier 5 (formulaire) |
| **S3** | Chantier 3 (multi-pages) |
| **S4** | Chantier 4 (SEO local) + Chantier 6 (preuve sociale) |
| **S5** | Chantier 7 (refactor) |
| **S6+** | Chantier 8 (blog, en continu) |

Total : ~6 semaines de travail répartis en sessions courtes.

---

## Hors-scope (à traiter séparément)

- Migration vers WordPress ou CMS : pas justifié pour ce volume
- Refonte graphique complète (nouveau logo, nouvelle charte) : pas demandé
- E-commerce / paiement en ligne : pas demandé
- Espace client connecté : pas demandé
- Application mobile : pas demandé

---

## Indicateurs de succès (à mesurer après refonte)

- **Bugs prod** : 0 (vs 9 aujourd'hui)
- **Mentions légales** : conformes (vs absentes)
- **Score Lighthouse mobile** : ≥ 90 (à mesurer en baseline)
- **Pages indexées par Google** : ≥ 15 (vs 1 aujourd'hui)
- **Position moyenne sur « panneau solaire [ville 74] »** : top 20 à 3 mois
- **Taux de conversion formulaire** : à mesurer (baseline à établir via GA4)
- **Note Google Business** : visible et alimentée dynamiquement
