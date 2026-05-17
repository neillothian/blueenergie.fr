# Sessions de code à venir

> Découpage du plan en sessions autonomes de 1-2 heures max. Chaque session = 1 objectif clair + 1 livrable testable. Tu lances une session à la fois.
> Convention : chaque session commence par « Session X — [titre] », précise les prérequis, le périmètre, le livrable et comment tester.

---

## État d'avancement (mise à jour 2026-05-17)

| Session | Statut | Prompt source |
|---|---|---|
| Session 1 — Correctifs HTML critiques | ✅ **DÉPLOYÉ** | `PROMPT-SESSION-1-2-3.md` |
| Session 2 — Page /merci.html + GA4 | ✅ **DÉPLOYÉ** | `PROMPT-SESSION-1-2-3.md` |
| Session 3 — Remplacement Google Maps | ✅ **DÉPLOYÉ** | `PROMPT-SESSION-1-2-3.md` |
| Session 4 — Mentions légales / CGV / RGPD | ✅ **DÉPLOYÉ** | `PROMPT-SESSION-4.md` |
| Session 5 — Bandeau cookies tarteaucitron | ✅ **DÉPLOYÉ** | `PROMPT-SESSION-5.md` |
| Session 6 — Mise à jour catalogue matériel | ✅ **DÉPLOYÉ** | `PROMPT-SESSION-6.md` |
| Session 7 — Refonte galerie réalisations | ✅ **DÉPLOYÉ** | `PROMPT-SESSION-MARATHON.md` |
| Session 8 — Extraction CSS/JS séparés | ✅ **DÉPLOYÉ** (partiel : index + merci, blog/légal hors scope) | `PROMPT-SESSION-MARATHON.md` |
| Session 9 — Optimisation images + favicon + meta | ✅ **DÉPLOYÉ** (favicon + Open Graph + Twitter Card ; compression images = mini-session manuelle future) | `PROMPT-SESSION-9.md` |
| Session 10 — Refonte formulaire + hCaptcha | ⬜ À faire (besoin sitekey hCaptcha) | à créer |
| Session 11 — Multi-pages partials | ✅ **DÉPLOYÉ** (index uniquement, autres pages refactor ultérieur) | `PROMPT-SESSION-MARATHON.md` |
| Session 12 — Pages internes principales | ✅ **DÉPLOYÉ** | `PROMPT-SESSION-MARATHON.md` |
| Session 13 — Page aides 2026 | ✅ **DÉPLOYÉ** | `PROMPT-SESSION-MARATHON.md` |
| Session 14 — JSON-LD + sitemap + robots.txt | ✅ **DÉPLOYÉ** | `PROMPT-SESSION-14.md` |
| Session 15 — Hub zones + 1 page géo modèle | ✅ **DÉPLOYÉ** | `PROMPT-SESSION-MARATHON.md` |
| Session 16 — 9 autres pages géo | ⬜ À faire (besoin validation liste villes) | à créer |
| Session 17 — Avis Google dynamiques | ⬜ À faire (besoin Place ID + clé API) | à créer |
| Session 18 — Bandeau confiance RGE + décennale | ✅ **DÉPLOYÉ** (correctif appliqué) | `PROMPT-SESSION-18.md` |
| Session 19 — Hub blog + template | ✅ **DÉPLOYÉ** (intégré dans Session Blog) | `PROMPT-SESSION-BLOG.md` |
| Session 20 — Article aides 2026 | ✅ **DÉPLOYÉ** (intégré dans Session Blog) | `PROMPT-SESSION-BLOG.md` |
| Session 21 — Article batterie virtuelle JPME | ✅ **DÉPLOYÉ** (intégré dans Session Blog) | `PROMPT-SESSION-BLOG.md` |
| Session 22 — Article 3e (au choix) | ⬜ À faire | à créer |
| Mini-session compression images | ⚠️ cwebp non installé sur Mac, à faire via squoosh.app | — |

**Synthèse** : sessions 1-7, 14, 18 (correctif) + Blog hub + 2 articles blog = 11 sessions déployées sur ~22 prévues (mi-marathon). **Compression images en attente** (cwebp absent). Prochaines : sous-sessions 6-9 du marathon (partials, 4 pages internes, aides, hub zones) à relancer dans une 2e exécution.

---

## SESSION 1 — Correctifs critiques HTML (1 h)

**Chantier** : 1 — Bugs critiques
**Prérequis** : aucun
**Périmètre** :
- Ajouter `<!DOCTYPE html>` en première ligne
- Ajouter `lang="fr"` sur la balise `<html>`
- Supprimer la balise `<base href="." />`
- Fermer le bloc CSS `<style>` non clos (ligne 629)
- Corriger l'URL de redirection formulaire : `blue-energie.fr` → `blueenergie.fr`
- Corriger les liens externes pour ajouter `rel="noopener noreferrer"` à côté de `target="_blank"`

**Livrable** : `index.html` à jour
**Test** : valider sur https://validator.w3.org/ (zéro erreur), tester soumission formulaire (redirection ne tombe plus en 404 — même si /merci.html n'existe pas encore)

---

## SESSION 2 — Page /merci.html + tracking conversion (1 h)

**Chantier** : 1 + 5
**Prérequis** : Session 1
**Périmètre** :
- Créer `public_html/merci.html` avec header simplifié, message confirmation, 3 CTAs secondaires, footer
- Ajouter le tracking GA4 d'événement `generate_lead` au chargement
- Tester la chaîne complète : soumettre le formulaire → redirection → page de confirmation

**Livrable** : `merci.html`
**Test** : remplir formulaire → vérifier redirection vers `/merci.html` → vérifier événement GA4 dans Realtime

---

## SESSION 3 — Remplacement Google Maps (1 h)

**Chantier** : 1
**Prérequis** : Session 1
**Périmètre** :
- Supprimer le code Google Maps + clé placeholder cassée
- Intégrer à la place une iframe OpenStreetMap (gratuit, pas de clé, pas de RGPD lourd) :
  ```html
  <iframe src="https://www.openstreetmap.org/export/embed.html?bbox=...&marker=46.0982,6.0279" loading="lazy"></iframe>
  ```
- Centrer sur 11 Chemin de Perouza, 74520 Savigny

**Livrable** : section contact avec carte qui s'affiche correctement
**Test** : ouvrir page contact → vérifier que la carte affiche bien Savigny avec un marqueur

---

## SESSION 4 — Mentions légales + CGV + Politique de confidentialité (1,5 h)

**Chantier** : 1
**Prérequis** : aucun (peut se faire en parallèle de la 1-3)
**Périmètre** :
- Créer `mentions-legales.html`, `cgv.html`, `politique-confidentialite.html`
- Remplir avec données réelles (SAS 882 483 274, Neil Lothian, etc.)
- Ajouter les liens dans le footer principal (à dupliquer dans `index.html`)

**Livrable** : 3 pages légales accessibles depuis le footer
**Test** : naviguer depuis le footer vers chaque page, vérifier l'affichage, vérifier que toutes les infos obligatoires sont présentes

**⚠️ Action côté toi avant la session** : me confirmer hébergeur, N° TVA intra, N° RGE exact

---

## SESSION 5 — Bandeau cookies tarteaucitron + GA4 conditionnel (1,5 h)

**Chantier** : 1
**Prérequis** : Session 4
**Périmètre** :
- Télécharger tarteaucitron.js (open source, gratuit)
- Intégrer le bandeau de consentement avec services : Google Analytics, YouTube (pour les iframes)
- Conditionner le chargement de GA4 au consentement utilisateur
- Lien « Gérer mes cookies » dans le footer

**Livrable** : bandeau cookies fonctionnel au premier visit
**Test** : ouvrir en navigation privée → bandeau s'affiche → cliquer "Refuser" → vérifier qu'aucune requête GA4 n'est envoyée → ouvrir une iframe YouTube → écran de consentement spécifique apparaît

---

## SESSION 6 — Mise à jour catalogue matériel (1,5 h)

**Chantier** : 2
**Prérequis** : aucun
**Périmètre** :
- Réécrire la section `#materiel` de `index.html` avec :
  - Modules : **JA Solar 500 W bifacial type N**
  - Onduleur : **Solplanet ASW-H S2**
  - Batterie : **Solplanet G3 modulaire (5,12 kWh par module)**
  - Structure : **K2 Systems**
  - Optimiseurs : **Tigo TS4** (option)
- Remplacer ou supprimer les iframes YouTube SolarEdge
- Récupérer les fiches techniques PDF depuis le dossier REGHEM et les placer dans `public_html/fiches-techniques/`
- Ajouter les liens « Fiche technique PDF » sur chaque équipement

**Livrable** : section matériel à jour
**Test** : visiter page → vérifier que les marques affichées correspondent aux devis réels → cliquer sur les liens PDF, vérifier ouverture

**⚠️ Action côté toi avant la session** : me confirmer les marques officielles si je dois ajouter logos partenaires

---

## SESSION 7 — Refonte galerie réalisations + retrait Mylight (1 h)

**Chantier** : 2
**Prérequis** : Session 6
**Périmètre** :
- Réécrire les 7 cartes de réalisations sans mention « Mylight » (sauf si on a effectivement des chantiers Mylight historiques à valoriser → à confirmer)
- Renommer / réétiqueter les images avec les vraies marques (JA Solar, Solplanet)
- Ajouter `loading="lazy"` sur toutes les images de la grille

**Livrable** : galerie réalisations à jour
**Test** : vérifier qu'aucune mention de marque non-utilisée n'apparaît, vérifier le lazy-loading via DevTools

**⚠️ Action côté toi avant la session** : me dire si les anciennes réalisations Mylight doivent rester (historique) ou être remplacées (cohérence)

---

## SESSION 8 — Extraction CSS et JS en fichiers séparés (1,5 h)

**Chantier** : 7
**Prérequis** : Sessions 1-3
**Périmètre** :
- Créer `public_html/assets/css/style.css` (clean, dédupliqué)
- Créer `public_html/assets/js/script.js` (clean, dédupliqué)
- Déplacer tout le CSS inline `<style>` vers le fichier externe
- Déplacer tout le JS inline `<script>` vers le fichier externe
- Ajouter dans `<head>` : `<link rel="stylesheet" href="assets/css/style.css">`
- Ajouter avant `</body>` : `<script src="assets/js/script.js" defer></script>`
- Supprimer les anciens `css/style.css` et `js/script.js` orphelins

**Livrable** : `index.html` allégé + fichiers externes
**Test** : visuellement identique à avant, mais DevTools → Network montre `style.css` et `script.js` chargés séparément

---

## SESSION 9 — Optimisation images + favicon + meta tags de base (1 h)

**Chantier** : 7 + 4 (préparation SEO)
**Prérequis** : aucun
**Périmètre** :
- Compresser toutes les images WebP (cible : hero 250 KB, autres 150 KB max) — utiliser `cwebp` en CLI ou squoosh.app
- Convertir le logo PNG en SVG (si possible, sinon le compresser en PNG optimisé)
- Créer un favicon (16x16, 32x32, apple-touch-icon 180x180) et le déclarer dans le `<head>`
- Ajouter dans le `<head>` d'`index.html` :
  - `<meta name="description" content="...">`
  - `<meta name="theme-color" content="#4fc7ef">`
  - `<link rel="canonical" href="https://blueenergie.fr/">`
  - Open Graph (og:title, og:description, og:image, og:url, og:type)
  - Twitter Card (summary_large_image)

**Livrable** : performances améliorées + meta tags présents
**Test** : PageSpeed Insights → score mobile avant/après ; opengraph.xyz → vérifier aperçu partage

---

## SESSION 10 — Refonte formulaire UX + hCaptcha + honeypot (2 h)

**Chantier** : 5
**Prérequis** : Sessions 1, 2
**Périmètre** :
- Refondre le HTML du formulaire pour aligner les radios horizontalement
- Découper visuellement en 4 étapes (avec barre de progression simple)
- Ajouter validation HTML5 inline (rouge/vert en temps réel via CSS `:valid` / `:invalid`)
- Ajouter un champ honeypot invisible (`<input type="text" name="_gotcha" style="display:none">`)
- Intégrer hCaptcha (compte gratuit chez hcaptcha.com) :
  - Script tag dans `<head>`
  - Widget dans le formulaire
- Tester le flux complet : remplir → captcha → envoi → redirection /merci.html

**Livrable** : formulaire refondu et sécurisé
**Test** : essayer de spammer 5 fois rapidement → captcha bloque ; un bot sans JS → honeypot rempli, on rejette côté serveur (à valider avec Web3Forms)

**⚠️ Action côté toi avant la session** : créer un compte hCaptcha et me fournir la sitekey

---

## SESSION 11 — Architecture multi-pages : header/footer partagés (2 h)

**Chantier** : 3
**Prérequis** : Sessions 4, 8
**Périmètre** :
- Créer un système simple de partials :
  - `public_html/partials/header.html`
  - `public_html/partials/footer.html`
- Charger ces partials via `fetch()` en JS au DOMContentLoaded
- Refactorer `index.html` pour utiliser ces partials
- Documenter dans un README court le système d'inclusion

**Livrable** : `index.html` qui charge header/footer dynamiquement
**Test** : modifier `partials/footer.html` → vérifier que le changement apparaît partout sans toucher aux pages

**Note** : alternative plus simple si tu préfères = juste copier-coller header/footer dans chaque page et accepter le coût de maintenance.

---

## SESSION 12 — Création des pages internes principales (2 h)

**Chantier** : 3
**Prérequis** : Sessions 6, 11
**Périmètre** :
- Créer les pages :
  - `installation-photovoltaique.html` (contenu = section process actuelle + détails)
  - `materiel-panneaux-solaires.html` (contenu = section matériel mise à jour)
  - `realisations.html` (galerie complète, plus de cartes)
  - `contact.html` (formulaire long déplacé ici)
- Mettre à jour la navbar pour pointer vers ces pages
- Raccourcir `index.html` pour pointer vers ces pages internes (synthèse + CTAs)

**Livrable** : 4 pages internes opérationnelles
**Test** : naviguer depuis la navbar → chaque page s'ouvre avec son contenu propre

---

## SESSION 13 — Page aides 2026 (1,5 h)

**Chantier** : 3
**Prérequis** : Session 12
**Périmètre** :
- Créer `aides-2026.html` avec contenu structuré (prime autoconso, vente surplus, TVA réduite, MaPrimeRénov')
- Ajouter un tableau interactif par puissance
- Ajouter un simulateur très simple (JS local, pas d'API)

**Livrable** : page aides complète et à jour
**Test** : ouvrir, lire, faire fonctionner le simulateur

**⚠️ Action côté toi avant la session** : me confirmer les montants exacts des primes autoconso 2026 selon arrêté en vigueur

---

## SESSION 14 — JSON-LD Schema.org + sitemap + robots.txt (1 h)

**Chantier** : 4
**Prérequis** : Session 12 (toutes les pages doivent exister)
**Périmètre** :
- Ajouter JSON-LD `Organization` sur toutes les pages (footer)
- Ajouter JSON-LD `LocalBusiness` sur la page contact (avec adresse, horaires, areaServed)
- Ajouter JSON-LD `Service` sur la page installation
- Générer `sitemap.xml` (statique, à mettre à jour à chaque nouvelle page)
- Créer `robots.txt` avec lien vers sitemap

**Livrable** : SEO technique en place
**Test** : tester sur https://validator.schema.org/ — zéro erreur

---

## SESSION 15 — Hub zones d'intervention + 1 page géo modèle (1,5 h)

**Chantier** : 4
**Prérequis** : Session 12
**Périmètre** :
- Créer `zones-intervention.html` (hub avec carte + liens vers villes)
- Créer le dossier `public_html/zones/`
- Créer `zones/annecy.html` comme modèle complet (à dupliquer pour les autres villes)
- Ajouter JSON-LD `LocalBusiness` avec `areaServed = Annecy`

**Livrable** : modèle de page géo opérationnel
**Test** : ouvrir, lire, vérifier JSON-LD valide

---

## SESSION 16 — Duplication pages géo pour 9 autres villes (1,5 h)

**Chantier** : 4
**Prérequis** : Session 15
**Périmètre** :
- Dupliquer le modèle Annecy pour : Annemasse, Thonon, La Roche-sur-Foron, Cluses, Chambéry, Aix-les-Bains, Albertville, Bourg-en-Bresse, Grenoble
- Adapter contenu local (ensoleillement, particularités, témoignage si dispo)
- Adapter JSON-LD pour chaque ville

**Livrable** : 10 pages géo au total
**Test** : naviguer depuis le hub → chaque page s'ouvre avec contenu adapté

**⚠️ Action côté toi avant la session** : me confirmer si on garde les 10 villes ou si on en retire (ex: Grenoble si pas de chantier prévu)

---

## SESSION 17 — Intégration avis Google Places API (2 h)

**Chantier** : 6
**Prérequis** : avoir clé Google Places API + Place ID Blue Energie
**Périmètre** :
- Créer endpoint PHP `public_html/api/google-reviews.php` :
  - Appelle Google Places API côté serveur
  - Cache la réponse en JSON sur disque (TTL 24h)
  - Retourne les avis + note moyenne en JSON
- Côté front : `fetch('/api/google-reviews.php')` au chargement, affichage dynamique des 5 derniers avis
- Affichage : note + nombre d'avis dans le header, 3-5 avis sur l'accueil

**Livrable** : avis Google live sur le site
**Test** : ouvrir → voir les avis ; modifier un avis sur Google → vérifier mise à jour après 24h (ou vider le cache)

**⚠️ Action côté toi avant la session** : créer projet Google Cloud, activer Places API, créer clé API restreinte au domaine blueenergie.fr, me fournir clé + Place ID

---

## SESSION 18 — Bandeau confiance RGE + Décennale + certifications (1 h)

**Chantier** : 6
**Prérequis** : aucun
**Périmètre** :
- Créer un composant `[BLOC] bandeau-confiance` (HTML + CSS)
- Y inclure : logo RGE QualiPV, mention décennale, SIRET visible, note Google live
- Intégrer ce bloc dans le header de toutes les pages

**Livrable** : bandeau confiance présent partout
**Test** : visuel cohérent sur toutes les pages

**⚠️ Action côté toi avant la session** : me fournir les logos RGE QualiPV en SVG ou PNG haute résolution

---

## SESSION 19 — Hub blog + template article (1,5 h)

**Chantier** : 8
**Prérequis** : Session 11 (header/footer partials)
**Périmètre** :
- Créer `public_html/blog/index.html` (hub)
- Créer `public_html/blog/template-article.html` (squelette à dupliquer)
- Définir convention de nommage : `blog/YYYY-MM-titre-slug.html`
- Ajouter JSON-LD `Article` dans le template
- Ajouter dans la navbar : « Blog »

**Livrable** : structure blog opérationnelle, sans articles encore
**Test** : ouvrir le hub (vide pour l'instant) + ouvrir le template

---

## SESSION 20 — Article 1 : Combien coûte une installation 10 kWc en Haute-Savoie ? (2 h)

**Chantier** : 8
**Prérequis** : Session 19
**Périmètre** :
- Rédiger l'article complet (1200-1500 mots) en se basant sur les chiffres réels REGHEM (anonymisés) :
  - Prix total TTC
  - Décomposition du prix
  - Aides déduites
  - Production estimée
  - Retour sur investissement
- Ajouter FAQ Schema (5 questions)
- Image vedette à fournir
- Publier sous `blog/2026-05-prix-installation-10kwc-haute-savoie.html`

**Livrable** : premier article publié
**Test** : ouvrir l'article, vérifier FAQ Schema sur https://validator.schema.org/

---

## SESSION 21 — Article 2 : Aides et primes 2026 (2 h)

**Chantier** : 8
**Prérequis** : Session 19, 13
**Périmètre** : article complémentaire à la page `/aides-2026.html`, format blog (plus narratif, exemples concrets, FAQ)

**Livrable** : deuxième article publié

---

## SESSION 22 — Article 3 : Pourquoi nous avons choisi JA Solar + Solplanet (2 h)

**Chantier** : 8
**Prérequis** : Session 19, 6
**Périmètre** : article expert/technique, valorisation des choix matériel, comparaison rapide avec alternatives (sans dénigrer)

**Livrable** : troisième article publié

---

## Total

22 sessions × ~1,5h moyenne = **~33 h de dev**

Découpage hebdomadaire suggéré :
- **S1** : Sessions 1, 2, 3, 4 (4-5 h) — déblocage critique
- **S2** : Sessions 5, 6, 7, 8 (5-6 h)
- **S3** : Sessions 9, 10, 11, 12 (6-7 h)
- **S4** : Sessions 13, 14, 15, 16 (5-6 h)
- **S5** : Sessions 17, 18, 19 (4-5 h)
- **S6+** : Sessions 20, 21, 22 + suite blog (en continu)

---

## Comment lancer une session

Quand tu lances une session, tu me dis simplement :
> « On fait la Session N »

Je relis ce fichier, je vérifie les prérequis, je te demande les actions manuelles éventuelles, et on attaque le code.
