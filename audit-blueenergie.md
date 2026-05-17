# Audit détaillé du code — blueenergie.fr

Audit réalisé le 17 mai 2026 sur l'arborescence reçue (`public_html/`).

## Structure du projet

```
public_html/
├── index.html       (1148 lignes, tout-en-un)
├── css/style.css    (présent mais JAMAIS chargé par index.html)
├── js/script.js     (présent mais JAMAIS chargé par index.html)
├── images/          (13 fichiers webp + 1 png)
└── redirect/index.php  (simple redirection 301-like)
```

---

## 🔴 BUGS CRITIQUES (à corriger immédiatement)

### 1. `<!DOCTYPE html>` manquant
Ligne 1 : `<html><head>...` — le doctype est absent. Le navigateur passe potentiellement en *quirks mode* (rendu non-standard, box model legacy). Ajouter `<!DOCTYPE html>` en toute première ligne.

### 2. Clé Google Maps en placeholder
Ligne 1070 :
```js
script.src = "https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&callback=initMap";
```
La carte est cassée en production (erreur visible : « Petit problème… Une erreur s'est produite »). Soit créer une vraie clé Google Maps (avec restriction par domaine), soit remplacer par une iframe OpenStreetMap / Mapbox gratuite.

### 3. Bloc CSS `<style>` non refermé
Lignes 625-629 :
```css
.presentation-image {
    width: 100%;
    max-width: 300px;
    height: auto;
    </style>
```
La règle `.presentation-image` n'est pas fermée par `}`. Le navigateur est tolérant mais c'est une bombe à retardement : si tu ajoutes du CSS plus bas, il sera mangé par cette règle.

### 4. URL de redirection post-formulaire incorrecte
Ligne 883 :
```html
<input type="hidden" name="redirect" value="https://blue-energie.fr/merci">
```
Le domaine est `blueenergie.fr` (sans tiret), pas `blue-energie.fr`. Après envoi du formulaire, l'utilisateur est redirigé vers un domaine **inexistant**. Tous les leads tombent dans le vide UX.

### 5. Page `/merci` inexistante
Même si on corrige le tiret, aucune page de remerciement n'existe dans le dossier. → 404 après chaque soumission de lead.

### 6. Sécurité — clé `access_key` web3forms exposée
Lignes 881 et 1033 : la clé `9a707883-3074-41d8-b85c-5e806407c211` est en clair dans le HTML, sans aucune protection anti-spam. Quiconque inspecte la page peut :
- Spammer ton inbox via cette clé jusqu'à ce que ton quota Web3Forms explose
- Envoyer des emails depuis ton formulaire en ton nom

**Solutions** : activer hCaptcha ou Cloudflare Turnstile (option native de Web3Forms), ajouter un champ honeypot, et idéalement passer par un endpoint serveur intermédiaire.

### 7. CSS et JS externes ignorés
`css/style.css` et `js/script.js` existent mais aucun `<link rel="stylesheet">` ni `<script src=>` ne les charge. Tout est dupliqué en inline dans `index.html`. Conséquences :
- **Toute modification est faite à deux endroits** (risque de désynchronisation déjà constaté : les fichiers externes contiennent du code légèrement différent)
- **Aucune mise en cache navigateur** des CSS/JS
- **Aucune minification possible**
- Le HTML pèse beaucoup trop lourd à chaque visite

### 8. Données GA4 envoyées sans consentement RGPD
Lignes 631-639 : Google Analytics 4 (G-JEG722VJTV) est chargé dès le premier paintsans bannière de consentement. Violation RGPD / directive ePrivacy. La CNIL peut sanctionner. Il faut une CMP (Cookiebot, Axeptio, tarteaucitron.js gratuit…).

### 9. Pas de Mentions légales / CGV / Politique de confidentialité
Obligations légales françaises (LCEN art. 6, RGPD art. 13-14). Aucun lien vers ces pages. Risque juridique direct.

---

## 🟠 PROBLÈMES SEO MAJEURS

### 10. `<html>` sans attribut `lang`
Ligne 1 : `<html>` au lieu de `<html lang="fr">`. Google et les lecteurs d'écran ne savent pas que la page est en français.

### 11. Meta description absente
Aucune `<meta name="description">`. Le snippet dans les résultats Google est généré automatiquement, sans contrôle.

### 12. Aucun balisage Open Graph / Twitter Card
Quand quelqu'un partage le site sur WhatsApp/Facebook/LinkedIn, l'aperçu est nu : pas d'image, pas de titre formaté.

### 13. Aucune donnée structurée Schema.org
Pas de JSON-LD `LocalBusiness`, `Organization`, ni `Service`. Tu te coupes du Pack Local Google (la box avec carte + avis qui s'affiche en tête des SERP locales) et des rich snippets.

### 14. Title court et générique
`Blue Energie - Solutions Photovoltaïques` = 38 caractères / 60 disponibles. Pas de zone géographique (« Haute-Savoie »), pas de bénéfice. Suggérer : `Panneaux Solaires Haute-Savoie | Étude Gratuite – Blue Energie`.

### 15. H1 ne porte pas le mot-clé
`<h1>Blue Energie</h1>`. Devrait être : `<h1>Installation de panneaux photovoltaïques en Haute-Savoie</h1>`.

### 16. Aucune balise `<link rel="canonical">`
Risque de duplicate content si le site est accessible via `www.blueenergie.fr` ET `blueenergie.fr`.

### 17. Favicon non déclaré
Pas de `<link rel="icon">`. L'onglet du navigateur affiche l'icône par défaut.

### 18. `<base href="." />` inutile et risqué
Ligne 1 : peut causer des comportements imprévus avec les ancres `#section`. À supprimer.

### 19. Email exposé en clair
Ligne 1046 : `neil.lothian@blueenergie.fr` en texte brut dans le footer. Sera moissonné par les bots de spam dans les jours qui viennent. Soit obfusquer (entités HTML, JS), soit utiliser un alias `contact@`.

---

## 🟡 PROBLÈMES DE QUALITÉ DE CODE

### 20. CSS dupliqué massivement
La règle `.presentation` est définie **3 fois** (lignes 510, 611-619, et dans la media query 442). `.presentation-image` également 3 fois avec des valeurs contradictoires. La media query `@media (max-width: 768px)` apparaît à 3 endroits différents (lignes 97, 385, 583). Cela rend le CSS imprévisible et impossible à maintenir.

### 21. Règles `.navbar` contradictoires en mobile
Ligne 97-148 : navbar fixed avec menu en slide depuis la droite. Ligne 385-402 : `flex-direction: column` qui empile tout. Les deux blocs `@media (max-width: 768px)` s'écrasent l'un l'autre.

### 22. iFrames YouTube non lazy-loadées
4 iframes `<iframe src="https://www.youtube.com/embed/...">` chargées dès le premier paint, sans `loading="lazy"`. Chaque iframe = ~500 KB de player YouTube + cookies tiers. Ajouter `loading="lazy"` ou utiliser une « lite-youtube » façade.

### 23. Images sans `loading="lazy"`
Les 7 cartes de réalisations chargent toutes leurs images au premier paint, alors qu'elles sont sous la ligne de flottaison.

### 24. Image hero trop lourde
`blue-energie-photovoltaique.webp` = 707 KB. Pour une image hero plein écran, 200-300 KB devrait suffire avec une compression WebP plus agressive (quality 75 au lieu de 90).

### 25. `alert()` natifs pour feedback
Lignes 1133 et 1140 :
```js
alert('Message envoyé avec succès!');
alert('Une erreur est survenue. Veuillez réessayer.');
```
UX très datée (2005). Préférer un toast/modal personnalisée.

### 26. JS sans gestion d'erreur sur les scroll smooth
Ligne 1078 :
```js
document.querySelector(this.getAttribute('href')).scrollIntoView(...)
```
Si l'ancre cible n'existe pas, exception JS bloquante. Ajouter `?.scrollIntoView(...)`.

### 27. `script.js` externe contient du code différent
La version dans `js/script.js` :
- N'a pas le bloc `const dpeRadios` (incompatible avec le HTML actuel)
- N'a aucune différence fonctionnelle avec la version inline

→ Le fichier semble être un vestige obsolète. À supprimer ou à resynchroniser.

### 28. `from_name` côté client manipulable
Ligne 884 : `<input type="hidden" name="from_name" value="Blue Energie - Demande Étude">`. Trivialement modifiable depuis la console.

### 29. Radio « isolation » sans `required`
Lignes 911-914 : les 4 radios isolation n'ont pas `required`, alors que le label « Mon isolation » suggère que c'est attendu. Incohérence avec les autres champs.

### 30. Champs sans `<label for="">`
La plupart des inputs ont des `<label>` qui les enveloppent (bon), mais pas d'attribut `for=""` ni d'`id` sur les inputs. Acceptable mais sub-optimal pour les lecteurs d'écran et l'autocomplete.

### 31. Le formulaire utilise `enctype="multipart/form-data"` partout
Même pour le formulaire de contact court (ligne 1032) qui n'a pas de fichier. → soumissions plus lourdes inutilement.

### 32. CSS inliné dans le HTML pour des styles ponctuels
Plein de `style="..."` inline dans le HTML (lignes 661, 689, 690, 766, 769, 770, 786, 789, 797, 798, etc.). Devrait être centralisé dans une classe CSS.

### 33. Logo PNG au lieu de SVG
`Logo-blue-energie.png` : un logo en PNG se pixellise sur écran retina et pèse plus lourd qu'un SVG.

### 34. `<button>` sans `type="button"` dans le menu mobile
Ligne 646 : `<button class="mobile-menu-button">` sans type explicite. Dans un `<form>`, ça soumettrait le formulaire. Ici hors form donc OK, mais bonne pratique.

### 35. Pas de `name` dans `dpe_document`
OK il y est, mais l'attribut `accept="image/*,application/pdf"` serait plus moderne que la liste d'extensions.

### 36. JS chargé deux fois avec deux `DOMContentLoaded`
Lignes 1068 et 1085 : deux écouteurs `DOMContentLoaded` séparés. Pas un bug mais peu propre, fusionner.

### 37. Pas de meta `theme-color`
Pas de couleur d'app pour la barre Chrome mobile.

### 38. Pas de manifest.json
Aucun support PWA / icône d'écran d'accueil.

---

## 🟢 POINTS POSITIFS

- Utilisation correcte de **WebP** pour les photos (gain ~30% vs JPEG)
- Attributs `width`/`height` sur les images (évite le CLS Layout Shift)
- Variables CSS dans `:root` pour la palette
- Menu mobile fonctionnel avec hamburger
- Formulaire structuré en sections logiques
- Smooth scroll natif sur les ancres
- Mobile-first responsive avec media queries
- Alt text descriptifs sur la plupart des images
- Téléphone cliquable (`tel:`)
- `aria-label` sur le bouton hamburger
- `target="_blank"` sur les liens externes (bien, mais ajouter `rel="noopener noreferrer"`)
- DOMContentLoaded utilisé pour le JS (pas de bloquage du render)

---

## Récapitulatif par priorité

| Priorité | Nb items | Effort dev |
|---|---|---|
| 🔴 Critique (bugs en prod, sécurité, légal) | 9 | 1-2 jours |
| 🟠 SEO majeur | 10 | 0,5 jour |
| 🟡 Qualité de code & perf | 19 | 2-3 jours |
| 🟢 Points positifs | — | — |

### Top 5 à attaquer en premier

1. **Ajouter `<!DOCTYPE html>` et `lang="fr"`** (5 secondes)
2. **Réparer ou supprimer Google Maps** (placeholder de clé = bug visible)
3. **Corriger `blue-energie.fr` → `blueenergie.fr`** dans la redirection (perte de leads garantie)
4. **Ajouter hCaptcha + page /merci** (sinon spam et UX cassée)
5. **Publier Mentions légales + CGV + RGPD + bandeau consentement** (obligation légale)

---

## Note de fin

Le site fait clairement penser à un **prototype généré par IA** (style, structure, duplications CSS, placeholder Google Maps oublié, fichiers externes vestiges). Ce n'est pas un défaut en soi, mais il manque une passe humaine de finalisation, notamment sur :
- Les obligations légales françaises
- Les fondamentaux SEO (description, JSON-LD, lang)
- La sécurité du formulaire
- La factorisation CSS/JS

Une fois ces points traités, le site sera commercialement et techniquement solide pour générer des leads.
