# Proposition de refonte du formulaire de demande d'étude

> Document de travail – validation Neil requise avant rédaction du `PROMPT-SESSION-10.md`.
> Date : 2026-05-19. Auteur : Claude (cadrage Session 10).

---

## 1. Analyse du formulaire actuel

**Localisation** : formulaire `#studyRequestForm` dupliqué à l'identique dans `public_html/index.html` (lignes 399-536) **ET** `public_html/contact.html` (lignes 91-228). Il faudra trancher : un seul emplacement canonique ou les deux ?

**Backend actuel** : Web3Forms (endpoint `https://api.web3forms.com/submit`), `access_key` exposée côté HTML, `enctype="multipart/form-data"` déjà en place, `redirect` vers `merci.html`. Pas de captcha actif aujourd'hui.

**Limitations Web3Forms identifiées** (plan gratuit, applicable ici) :
- Plafond **10 Mo par soumission, tous fichiers cumulés**
- 1 seul fichier par champ `input[type=file]` (sauf à utiliser `multiple` + tester)
- 250 soumissions/mois (plan free)
- Pas de stockage permanent : la PJ est jointe à l'email Neil et perdue côté serveur
- Pas de logique conditionnelle ni de retraitement (impossible de typer `consommations_kwh[]` en tableau propre dans l'email)

### Tableau des champs actuels

| Champ | Type | Obligatoire | Verdict | Raison |
|---|---|---|---|---|
| `proprietaire` | radio (oui/non/projet) | ✅ | **Garder** | Filtrage prospect indispensable |
| `copropriete` | radio (oui/non/ne sais pas) | ✅ | **Garder** | Impacte la faisabilité (AG, syndic) |
| `isolation` | radio (faible/bonne/très bonne/ne sais pas) | ❌ | **Supprimer** | Auto-évaluation peu fiable, sans valeur pour le dimensionnement PV |
| `dpe` | radio + upload | ✅ | **Garder** (transformer) | Utile mais déplacer dans l'étape upload documents |
| `dpe_document` | file | ❌ | **Garder** | Conserver dans la zone upload globale |
| `surface` | text "m²" | ❌ | **À transformer** | Passer en `number` avec contrainte min/max, libellé clair |
| `occupants` | number | ❌ | **Garder** | Utile au dimensionnement |
| `adresse_ligne1` / `adresse_ligne2` | 2× text | ✅ | **À transformer** | Remplacer par : autocomplete Nominatim + carte avec marqueur GPS draggable |
| `chauffage[]` | checkbox multi | ❌ | **Garder** | Discriminant PAC / EJP |
| `chauffage_autre` | text | ❌ | **Garder** | OK |
| `consommateurs[]` | checkbox multi | ❌ | **Garder** | OK |
| `consommateurs_autre` | text | ❌ | **Garder** | OK |
| `releve_document` | file | ❌ | **À transformer** | Fusionner dans la zone upload multi-fichiers |
| `releve_manuel` | textarea libre | ❌ | **Supprimer** | Remplacé par 12 champs kWh mensuels structurés |
| `projets[]` | checkbox multi | ❌ | **Garder** | Utile (PAC future, VE, piscine) |
| `projets_autre` | text | ❌ | **Garder** | OK |
| `nom` | text | ✅ | **À découper** | Séparer prénom / nom |
| `email` | email | ✅ | **Garder** | OK |
| `telephone` | tel | ✅ | **Garder** | Ajouter pattern FR + indicatif +33/+41 (zone frontalière) |

### Manques critiques vs demande Neil

1. ❌ **Pas de coordonnées GPS** capturées (Neil doit aujourd'hui géocoder à la main pour préparer l'étude).
2. ❌ **Pas de saisie kWh mensuel mois par mois** (seul un textarea libre `releve_manuel` qui n'est jamais rempli proprement).
3. ❌ **Pas d'upload multiple** (un seul fichier DPE + un seul fichier relevé, alors qu'il faudrait pouvoir charger : facture EDF, photos toiture × 3-4, devis concurrent, plan cadastral).
4. ❌ **Pas de captcha** → exposition au spam (la `access_key` Web3Forms est publique).
5. ❌ **Pas de consentement RGPD explicite** ni de mention durée de conservation / finalité.

---

## 2. Demandes Neil — interprétation en specs techniques

| Demande Neil (brouillon) | Spec technique |
|---|---|
| « Carte pour choisir son adresse avec coordonnée GPS » | Carte Leaflet + tuiles OpenStreetMap, marqueur draggable, champs cachés `latitude` / `longitude` (6 décimales), pré-rempli par autocomplete Nominatim sur l'adresse texte. Centre par défaut : Savigny (46.0982, 6.0279), zoom 9. |
| « Possibilité d'ajouter les documents utiles » | Zone d'upload **multi-fichiers** avec catégorisation (DPE, facture EDF, photos toiture, devis concurrent, autre). Limites strictes (cf. §5). |
| « Saisir les consommations en kWh mensuel mois par mois » | 12 champs `<input type="number" min="0" max="5000" step="1">` libellés Janvier→Décembre, optionnels, avec affichage automatique du **total annuel** calculé en JS. Bouton « Je ne connais pas mes relevés mensuels » qui révèle un champ unique kWh annuel + upload facture. |
| « Infos pas utiles à enlever » | Cf. §6 — suppression principale : isolation auto-déclarée, textarea relevé libre. |

---

## 3. Schéma proposé — formulaire multi-étapes (wizard 4 étapes)

UX : barre de progression en haut (`Étape 2/4`), boutons `Précédent` / `Suivant`, validation HTML5 + JS bloquante par étape, **persistance dans `sessionStorage`** (au cas où l'utilisateur recharge). Pas de submit avant l'étape 4.

### Étape 1 — Identité & adresse

| Libellé | `name` | Type | Validation | Obligatoire |
|---|---|---|---|---|
| Prénom | `prenom` | text | 2-50 car. | ✅ |
| Nom | `nom` | text | 2-50 car. | ✅ |
| Email | `email` | email | pattern email + DNS check côté JS facultatif | ✅ |
| Téléphone | `telephone` | tel | pattern `^(\+33|\+41|0)[1-9](\s?\d{2}){4}$` | ✅ |
| Adresse (autocomplete) | `adresse_texte` | text | min 8 car. ; déclenche Nominatim au blur | ✅ |
| Code postal | `code_postal` | text | pattern `^\d{5}$` (FR) ou `^\d{4}$` (CH) | ✅ |
| Ville | `ville` | text | rempli auto via Nominatim, éditable | ✅ |
| Carte interactive | — | Leaflet | marqueur draggable, met à jour `latitude`/`longitude` | ✅ (un marqueur posé) |
| `latitude` | `latitude` | hidden | float 6 décimales | ✅ |
| `longitude` | `longitude` | hidden | float 6 décimales | ✅ |

**Confirmation visuelle** : pastille verte « Position confirmée » quand le marqueur a été soit auto-placé par Nominatim soit déplacé par l'utilisateur.

### Étape 2 — Logement & projet

| Libellé | `name` | Type | Validation | Obligatoire |
|---|---|---|---|---|
| Propriétaire | `proprietaire` | radio (oui/non/projet) | — | ✅ |
| Copropriété | `copropriete` | radio (oui/non/ne sais pas) | — | ✅ |
| Type de logement | `type_logement` | radio (maison indiv. / mitoyenne / immeuble) | — | ✅ |
| Surface habitable chauffée | `surface_m2` | number | 20-1000 m² | ❌ |
| Nombre d'occupants | `occupants` | number | 1-15 | ✅ |
| Année construction | `annee_construction` | number | 1800-2026 | ❌ |
| Mode de chauffage actuel | `chauffage[]` | checkbox multi (PAC, bois, gaz, fioul, élec, autre+text) | — | ✅ |
| Gros consommateurs élec | `consommateurs[]` | checkbox multi (chauffe-eau, VE, piscine, spa, clim, autre+text) | — | ❌ |
| Projets à venir 24 mois | `projets[]` | checkbox multi (PAC, VE, piscine, spa, agrandissement, autre+text) | — | ❌ |
| Type d'installation souhaitée | `type_installation` | radio (autoconso seule / autoconso + revente surplus / revente totale / ne sais pas) | — | ❌ |
| Puissance envisagée | `puissance_envisagee` | select (3 / 6 / 9 / 12 kWc / je ne sais pas) | — | ❌ |

### Étape 3 — Consommations & documents

**Bloc consommation mensuelle** (cœur de la demande Neil) :

| Libellé | `name` | Type | Validation | Obligatoire |
|---|---|---|---|---|
| Janvier kWh | `kwh_01` | number | 0-5000 | ❌ |
| Février kWh | `kwh_02` | number | 0-5000 | ❌ |
| … (12 mois) | `kwh_03` à `kwh_12` | number | 0-5000 | ❌ |
| **Total annuel calculé** | `kwh_total` | text readonly | somme JS auto | — |

Affichage : grille CSS 4×3, mobile = 2×6. Affichage en temps réel du total + graphique sparkline simple (canvas 200×40 ou SVG). Si l'utilisateur préfère ne pas remplir mois par mois :

| Libellé | `name` | Type | Obligatoire |
|---|---|---|---|
| Toggle « Je ne connais pas les relevés mensuels » | `mode_conso` | bouton JS | — |
| Consommation annuelle estimée | `kwh_annuel_estime` | number 1000-30000 | ❌ (si toggle actif) |

**Bloc upload documents** :

| Catégorie | `name` | Limite | Obligatoire |
|---|---|---|---|
| Facture EDF récente (PDF/JPG/PNG) | `doc_facture[]` | 1 fichier max, ≤ 3 Mo | ❌ |
| Photos du site (toiture, environnement) | `doc_photos[]` | 4 fichiers max, ≤ 2 Mo / fichier | ❌ |
| DPE | `doc_dpe` | 1 fichier, ≤ 3 Mo | ❌ |
| Devis concurrent (pour analyse comparative) | `doc_devis_concurrent` | 1 fichier, ≤ 3 Mo | ❌ |
| Autre document utile | `doc_autre[]` | 2 fichiers max, ≤ 2 Mo / fichier | ❌ |

JS : checker poids cumulé < 9 Mo (marge de sécurité Web3Forms). Si dépassement → afficher erreur claire + suggérer l'option fallback (cf. §5).

### Étape 4 — Récap, RGPD, captcha & envoi

- **Récap** : tableau résumé des champs remplis (Neil voit ce qu'il enverra, possibilité de revenir aux étapes précédentes).
- **Commentaire libre** : `commentaire` (textarea, ≤ 1000 car.) — « Une précision à ajouter ? »
- **Comment nous avez-vous connus ?** : `origine_lead` (select : Google, recommandation, salon, autre+text) — utile marketing.
- **Case RGPD** (obligatoire) : `consent_rgpd` (checkbox) — texte cf. §8.
- **Case rappel commercial** (facultatif) : `consent_rappel` (checkbox) — « J'accepte d'être recontacté par téléphone ».
- **reCAPTCHA v3** : token généré au submit, champ caché `g-recaptcha-response`. Script chargé au **focus** sur le 1er champ de l'étape 1 (RGPD-friendly, déjà acté Q-Session-10).
- **Bouton submit** : désactivé tant que `consent_rgpd` n'est pas coché.

---

## 4. Composant carte GPS — recommandation tech

| Critère | **Leaflet + tuiles OSM + Nominatim** (recommandé) | Google Maps JS API | Mapbox GL JS |
|---|---|---|---|
| Coût | Gratuit, sans clé | Payant au-delà du free tier, clé API requise | Gratuit jusqu'à 50k chargements/mois |
| RGPD | OSM = serveurs FR/EU (OpenStreetMap France) — pas de cookie tiers, pas de bandeau | Google = cookies tiers → bandeau consentement bloquant | Mapbox = cookies analytics → bandeau |
| Cohérence projet | Cohérent : `index.html`, `contact.html` et `zones-intervention.html` utilisent déjà OSM en iframe | Rupture avec décisions Q2 / Session 1 | Rupture |
| Complexité dev | Faible (~80 lignes JS + 1 CDN) | Moyenne (clé, restrictions, billing) | Moyenne |
| Géocodage adresse → GPS | **Nominatim** (OSM, gratuit, fair use 1 req/sec) | Google Places (payant) | Mapbox Geocoding |
| Limitation Nominatim | 1 req/sec, User-Agent requis, pas d'usage massif | — | — |

**Recommandation : Leaflet 1.9.x + tuiles OSM standard + Nominatim**.

Détails d'implémentation :
- CDN Leaflet : `unpkg.com/leaflet@1.9.4/dist/leaflet.{css,js}` (SRI hash inclus).
- Nominatim : déclencher la requête **au blur** du champ adresse (pas à chaque frappe → respect du fair use). Throttle JS 1.2s.
- User-Agent obligatoire : Nominatim refuse les requêtes sans `User-Agent` identifiant. Côté navigateur on ne peut pas le forcer → workaround : proxy PHP léger sur Hostinger (`redirect/geocode.php`) qui ajoute le header `User-Agent: blueenergie.fr-contact-form` côté serveur. **Décision à valider §10**.
- Fallback : si Nominatim échoue (offline, quota), l'utilisateur peut placer le marqueur à la main → toujours fonctionnel.
- Attribution obligatoire : « © OpenStreetMap contributors » visible (déjà géré par Leaflet par défaut).

---

## 5. Upload de fichiers — backend

Web3Forms (plan free) **n'est pas adapté à 8 fichiers cumulés de plusieurs Mo**. Trois options :

### Option A — Garder Web3Forms, contraindre à 3 fichiers max

- Limiter à : 1 facture EDF + 1 photo toiture + 1 document libre (DPE OU devis OU autre).
- Cumul max : 9 Mo (marge sous le plafond 10 Mo).
- **Avantage** : zéro code backend, déjà en place.
- **Inconvénient** : ne couvre pas la demande de Neil (« facture + photos + devis + autre » = 4-8 fichiers).

### Option B — Script PHP custom sur Hostinger (recommandé)

- Fichier `public_html/redirect/submit-study.php` qui :
  1. Reçoit le POST multipart, valide les champs serveur-side (RGPD + sécurité).
  2. Vérifie le token reCAPTCHA v3 contre l'API Google (score ≥ 0.5).
  3. Sauvegarde temporairement les fichiers dans `public_html/redirect/uploads/{uuid}/` (hors webroot recommandé — Hostinger permet `../private_uploads/`).
  4. Envoie un email à `neil.lothian@blueenergie.fr` via `mail()` ou PHPMailer + SMTP authentifié, avec **les fichiers en pièces jointes**.
  5. Purge les fichiers temporaires après 7 jours via cron Hostinger.
  6. Redirige vers `merci.html`.
- **Avantage** : contrôle total, pas de plafond externe, captcha vérifié serveur (impératif reCAPTCHA v3), conformité RGPD plus simple à documenter.
- **Inconvénient** : ~150 lignes de PHP à écrire + tester, sécurité à soigner (validation MIME, taille, nom de fichier, anti-CSRF).
- **Limites mail Hostinger** : pièces jointes mail souvent plafonnées à ~25 Mo total → cohérent avec nos limites par catégorie.

### Option C — Envoi sans PJ + lien WeTransfer après soumission

- Le formulaire envoie les données texte uniquement (Web3Forms ou PHP).
- Page `merci.html` affiche un bouton « Envoyer vos documents » → ouvre un lien WeTransfer/SwissTransfer pré-configuré vers l'email de Neil.
- **Avantage** : aucun code backend complexe.
- **Inconvénient** : friction UX (étape supplémentaire post-submit), beaucoup de prospects ne suivront pas → on perd 50-70 % des documents → contraire à l'objectif Neil.

**Recommandation : Option B**. Justification : la demande de Neil suppose 4-8 fichiers utiles à l'étude, l'Option A ne suffit pas, l'Option C dégrade le taux de complétion. Le coût (Session 10 ~1.5 jour de dev PHP) est largement amorti par le gain qualitatif pour Neil (étude préparée sans relances).

---

## 6. Champs à supprimer

| Champ | Justification |
|---|---|
| `isolation` (radio faible/bonne/très bonne) | Auto-évaluation non fiable, aucun impact sur le dimensionnement PV, le DPE le couvre quand il existe. |
| `releve_manuel` (textarea libre) | Remplacé par la grille 12 mois structurée. Inutilisable en l'état (texte libre = pas d'agrégation possible). |
| Bloc `dpe` séparé | Le DPE devient un upload optionnel dans l'étape 3, plus de question oui/non séparée (la présence d'un fichier = oui). |
| Adresse en 2 lignes texte brutes (`adresse_ligne1`/`adresse_ligne2`) | Remplacée par autocomplete Nominatim + ville/CP séparés + carte. |

---

## 7. Champs à ajouter

| Champ | Justification métier |
|---|---|
| `latitude` / `longitude` | Cœur de la demande Neil : préparer l'étude (orientation, masques, ensoleillement) sans géocoder à la main. |
| `kwh_01` à `kwh_12` | Cœur de la demande Neil : courbe de conso saisonnière = dimensionnement précis (été/hiver, PAC, piscine). |
| `kwh_annuel_estime` (fallback) | Pour les prospects qui n'ont pas le détail mensuel sous la main. |
| `type_logement` | Discrimine maison / appartement (filtre lead). |
| `annee_construction` | Donne une indication d'isolation indirecte + éligibilité MaPrimeRénov'. |
| `type_installation` (autoconso/revente/totale) | Permet de qualifier la nature du projet en amont. |
| `puissance_envisagee` | Aligne le prospect avec le simulateur Session 13 (3/6/9/12 kWc). |
| `doc_facture`, `doc_photos[]`, `doc_devis_concurrent` | Documents utiles à l'étude (Neil). |
| `commentaire` libre | Capter les contextes spécifiques (urgence, contraintes, etc.). |
| `origine_lead` | Tracking marketing : Google / bouche-à-oreille / etc. |
| `consent_rgpd` | Obligatoire RGPD. |
| `consent_rappel` | Base légale claire pour rappel commercial téléphonique. |
| `g-recaptcha-response` | Anti-spam (déjà acté Q-Session-10). |

---

## 8. Garde-fous RGPD

**Texte à afficher sous la case de consentement** :

> Les informations recueillies via ce formulaire sont enregistrées par Blue Energie (SAS, SIREN 882 483 274) pour traiter votre demande d'étude photovoltaïque gratuite. Elles sont destinées exclusivement à Neil Lothian et à l'équipe technique de Blue Energie, et sont conservées **3 ans** à compter du dernier contact. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement, de portabilité et d'opposition que vous pouvez exercer par email à `neil.lothian@blueenergie.fr` ou par courrier au 11 Chemin de Perouza, 74520 Savigny. Vous pouvez introduire une réclamation auprès de la CNIL (www.cnil.fr).
>
> Ce formulaire est protégé par Google reCAPTCHA. La [politique de confidentialité](https://policies.google.com/privacy) et les [conditions d'utilisation](https://policies.google.com/terms) de Google s'appliquent.

**Mécanismes techniques** :
- Case `consent_rgpd` **obligatoire**, non pré-cochée (CNIL).
- Case `consent_rappel` **optionnelle**, non pré-cochée.
- reCAPTCHA chargé **au focus du 1er champ** (pas au pageload) → pas besoin de consent banner spécifique reCAPTCHA, car le script ne se charge qu'après action utilisateur explicite (clarification 2024 CNIL : OK).
- Lien direct vers `politique-confidentialite.html` dans le bloc consentement.
- Côté serveur PHP : log minimal (timestamp + IP hashée + champ `origine_lead` pour stats) — pas de stockage des données du formulaire au-delà de l'email envoyé. **Confirmation §10**.
- Documents uploadés : purge automatique après 7 jours (cron) → cohérent avec la durée d'usage immédiat (préparer l'étude).
- Mention dans `politique-confidentialite.html` à mettre à jour : ajout du formulaire d'étude + Nominatim/Leaflet + durée de conservation.

---

## 9. Plan d'implémentation

| # | Sous-tâche | Effort | Livrable |
|---|---|---|---|
| 1 | Refonte HTML : `<form>` multi-étapes, suppression du form actuel dans `index.html` + remplacement dans `contact.html` | 0.5 j | `contact.html` mis à jour, `index.html` réduit à une CTA « Demander une étude » qui pointe vers `contact.html#study-request` |
| 2 | CSS wizard : progress bar, étapes, transitions, grille kWh, états validation, responsive | 0.5 j | `css/form.css` (nouveau) |
| 3 | JS validation par étape + navigation Précédent/Suivant + persistance sessionStorage | 0.5 j | `js/form-wizard.js` |
| 4 | JS carte Leaflet + Nominatim (avec proxy PHP) | 0.5 j | `js/form-map.js`, `redirect/geocode.php` |
| 5 | JS upload : preview thumbnails, validation MIME/taille, compteur poids cumulé | 0.3 j | `js/form-upload.js` |
| 6 | JS reCAPTCHA v3 (load au focus, token au submit) | 0.2 j | intégré à `form-wizard.js` |
| 7 | Backend PHP : `redirect/submit-study.php` (réception, validation, captcha verify, email PHPMailer, purge) | 1.0 j | `redirect/submit-study.php` + `redirect/lib/PHPMailer/` |
| 8 | Page `merci.html` : ajustement du message (rappel des documents reçus, délai de réponse 24-48h) | 0.1 j | `merci.html` |
| 9 | Tracking GA4 : événement `generate_lead` au submit OK + `form_step_completed` à chaque étape | 0.2 j | intégré au JS |
| 10 | Mise à jour `politique-confidentialite.html` (durée 3 ans, Nominatim, reCAPTCHA, purge fichiers) | 0.2 j | section dédiée |
| 11 | Tests : 3 navigateurs (Chrome, Safari, Firefox) + mobile iOS/Android + cas limites upload | 0.3 j | checklist `CHECKLIST-POST-DEPLOI.md` étendue |

**Total estimé** : ~4.3 jours-développeur. Décomposable en **deux sessions** :
- **Session 10A** : HTML/CSS/JS frontend complet (étapes 1, 2, 3, 4, 5, 6, 8, 9, 10) → ~2.3 j
- **Session 10B** : Backend PHP + tests prod (étapes 7, 11) → ~1.3 j

---

## 10. Questions à trancher avant code

> Décisions explicites attendues de Neil avant rédaction du `PROMPT-SESSION-10.md`.

1. **Backend : Option B (PHP custom Hostinger) ou Option A (Web3Forms limité à 3 fichiers) ?**
   Recommandation Claude : **Option B**. Mais cela suppose que Neil accepte d'avoir un script PHP à maintenir et que `mail()` ou un SMTP soit fonctionnel sur son plan Hostinger.

2. **Proxy PHP pour Nominatim : OK ou alternative ?**
   Nominatim refuse les requêtes sans User-Agent identifiant → il faut soit un proxy PHP, soit basculer sur un service de géocodage tiers (Adresse.data.gouv.fr, API officielle française, **gratuite et sans User-Agent strict** — alternative à étudier, peut-être supérieure pour la France métropolitaine).
   → Préférence : **API adresse.data.gouv.fr** pour le géocodage adresse (FR uniquement, parfaite pour la zone 74/73/01/38), **Leaflet/OSM** pour l'affichage de la carte. Confirmer ?

3. **Emplacement du formulaire : doublon `index.html` + `contact.html` ou un seul ?**
   Recommandation : **seul dans `contact.html`**. La home affiche une CTA bouton « Demander une étude gratuite » qui pointe vers `contact.html#study-request`. Page d'accueil allégée, meilleur tracking funnel.

4. **Durée de conservation des données : 3 ans (recommandation) ou autre ?**
   3 ans = standard CNIL pour prospect commercial B2C. À confirmer.

5. **Champs obligatoires : prudence ou exigence ?**
   Position Claude : ne rendre obligatoires que les minima qualifiants (identité + contact + adresse GPS + propriétaire + occupants + chauffage). Tout le reste optionnel pour ne pas faire fuir. À confirmer.

6. **(Bonus) Notification Neil temps réel ?**
   En plus de l'email, souhaite-t-on un SMS / un message Telegram / un webhook ? (hors scope Session 10 a priori mais à noter pour Session 11+).

---

*Fin de proposition. En attente validation Neil pour rédaction du `PROMPT-SESSION-10.md`.*
