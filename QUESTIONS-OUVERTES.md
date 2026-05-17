# Cahier de décisions — refonte blueenergie.fr

> **État au 2026-05-17** : toutes les questions ouvertes sont résolues. Ce document fige les décisions de cadrage prises avec Neil pour piloter les sessions de développement. Document transmissible (dev, partenaires, archives).

---

## 📌 Résumé exécutif

- ✅ **20 questions de cadrage closes** (Q1 → Q20)
- ✅ **Sessions 1, 2, 3, 6 et Blog déjà livrées**
- ⏳ **6 actions externes attendues côté Neil** (cf. § « Actions Neil » ci-dessous)
- 📄 **Modes d'emploi détaillés** disponibles dans `ACTIONS-NEIL.md`

---

## 🎯 Actions à exécuter côté Neil

> Cases à cocher au fur et à mesure. Les modes d'emploi pas-à-pas sont dans `ACTIONS-NEIL.md`. Quand une action est faite, transmettre les résultats à Claude pour intégration.

| # | Action | Échéance (session bloquée) | Statut |
|---|---|---|---|
| 1 | Récupérer 5 logos partenaires (JA Solar, Solplanet, K2 Systems, Tigo, QualitEnR) via le prompt fourni dans un autre assistant, puis déposer les fichiers dans `_dropzone/` | Session 6 (catalogue matériel) + Session 18 (footer/certifications) | ☐ |
| 2 | Créer les clés **Google reCAPTCHA v3** (site key + secret key) via https://www.google.com/recaptcha/admin/create et les transmettre à Claude | Session 10 (formulaire de contact) | ☐ |
| 3 | Créer la **clé Google Places API** restreinte par référent HTTP via Google Cloud Console, puis la transmettre à Claude | Session 17 (avis Google) | ☐ |
| 4 | Déposer **5 à 10 photos HD de chantiers réels** dans `_dropzone/` (toiture extérieur + coffret/onduleur intérieur) avec contexte en chat (ville approx, année, matériel posé) | Session 7 (réalisations) + Session 12 (page réalisations) | ☐ |
| 5 | Déposer une **photo portrait pro de Neil** dans `_dropzone/` (format carré 400×400 minimum, fond neutre) | Session 20+ (articles de blog) | ☐ |
| 6 | Valider la **bio courte de Neil** que Claude aura pré-rédigée (2 lignes : RGE + expertise) | Session 20+ (articles de blog) | ☐ |

---

## 🏢 Constantes entreprise (figées)

| Attribut | Valeur |
|---|---|
| Raison sociale | **Blue Energie** (SAS) |
| SIREN / SIRET | 882 483 274 |
| Forme juridique | SAS, capital 18 000 € |
| Représentant légal | Neil Lothian, Président |
| Siège social | 11 Chemin de Perouza, 74520 Savigny |
| Téléphone | 07 61 50 43 85 |
| Email contact | `neil.lothian@blueenergie.fr` (choix du client malgré risque spam) |
| N° TVA intra | **`FR25882483274`** (à vérifier sur VIES avant publication) |
| Certification RGE | **QualiPV actif** — numéro non divulgué publiquement (transmis sur demande client) |
| Logo QualiPV affiché | `public_html/images/logo-qualipv.png` |
| Hébergeur | Hostinger (mutualisé, FTP/SFTP dispo) |
| Domaine | blueenergie.fr |
| Place ID Google Business | **`ChIJHUKhFuCfDykRkkLTeN-wm3c`** |
| Adresse fiche GBP | Blue Energie, 11 Chem. de Perouza, 74520 Savigny, France |
| Stack technique | HTML / CSS / JS purs (fichiers séparés, pas de framework) |
| Zone d'intervention | Haute-Savoie (74), Savoie (73), Ain (01), Isère (38) |
| Matériel standard | Panneaux JA Solar + onduleurs Solplanet + montage K2 Systems + optimiseurs Tigo (option) |
| Langue site | Français seul (pas de version EN) |
| Analytics | Google Analytics 4 uniquement (pas de Microsoft Clarity) |
| Réseaux sociaux | Aucun lien dans le footer (pas de comptes actifs) |

---

## 📋 Décisions par session de développement

### Session 4 — Mentions légales / RGPD / cookies

- **Bandeau confiance** : afficher le logo QualiPV (`public_html/images/logo-qualipv.png`) sans le numéro RGE
- **N° TVA** : afficher `FR25882483274` (préalablement vérifié sur VIES https://ec.europa.eu/taxation_customs/vies/)
- **Aides éligibles** : OUI on peut mentionner MaPrimeRénov', CEE, prime à l'autoconsommation, TVA réduite — l'entreprise est bien RGE QualiPV
- **Politique de cookies** : mentionner reCAPTCHA Google (chargé conditionnellement) + GA4 + (PDF téléchargeables ne posent pas de cookies)
- **Email contact mentions légales** : `neil.lothian@blueenergie.fr`

### Session 7 — Refonte galerie réalisations

- **Réalisations Mylight existantes** : conserver les **photos** (chantiers réels) mais retirer toute mention de marque « Mylight »
- **Renommer** :
  - `images/Mylight-crystal-400wc-sur-toiture-asymetrique.webp` → `images/realisation-fullblack-400wc.webp`
  - `images/mylight-bifaciaux-425Wc-sur-toit-provencal.webp` → `images/realisation-bifaciaux-425wc.webp`
  - Mettre à jour les références HTML/CSS partout
- **Libellés génériques** : « Panneaux full-black 400 Wc sur toiture asymétrique » / « Panneaux bifaciaux 425 Wc sur toit provençal »
- **Photos chantiers** : intégrer celles que Neil aura déposées dans `_dropzone/` (sinon placeholders, remplacement plus tard)
- **Pas de témoignage nominal** (REGHEM non utilisé) — la preuve sociale est portée par les avis Google (Session 17)

### Session 10 — Refonte formulaire de contact

- **Captcha** : **Google reCAPTCHA v3** (invisible, score-based, pas hCaptcha)
- **Chargement RGPD-friendly** : charger le script reCAPTCHA UNIQUEMENT au **focus** ou **submit** du formulaire (pas au chargement de la page) → pas besoin de consent banner pour cette interaction
- **Clés** : Neil fournira `RECAPTCHA_SITE_KEY` (HTML) et `RECAPTCHA_SECRET_KEY` (PHP serveur)
- **Email destinataire** : `neil.lothian@blueenergie.fr`

### Session 12 — Page réalisations (dédiée)

- **PDF cas clients anonymisés** : produire 3 à 5 fiches PDF format type :
  - « Cas N°X : 6 kWc en Haute-Savoie, exposition Sud, production 7 100 kWh/an, économies 850 €/an, ROI 8 ans »
  - Pas de nom, pas d'adresse précise, données issues des chantiers réels
- **PDF plaquette commerciale** : 1 plaquette générique (offre Blue Energie, process en 5 étapes, garanties, contact) — Claude pré-rédige, Neil valide
- **Stockage PDF** : `public_html/docs/`
- **Aucun fichier client identifiable** dans le repo public

### Session 13 — Page Aides & Financements

- **Calculateur Niveau 1** : simulateur côté JS uniquement
  - Input : puissance souhaitée (3 / 6 / 9 / 12 kWc)
  - Output : fourchette d'aides totale (prime à l'autoconsommation + tarif de rachat surplus + TVA réduite si < 3 kWc + estimation MaPrimeRénov' générique)
  - **Pas de saisie de revenus ni de données personnelles** → 100% RGPD compatible
- **Données** : lookup table figée dans le JS, à actualiser ~1×/an au gré des barèmes
- **Disclaimer obligatoire** : « Valeurs indicatives à date du JJ/MM/AAAA. Contactez-nous pour une estimation personnalisée. »

### Session 16 — Pages géolocalisées SEO (15 pages)

**Pattern URL** : `/installateur-panneau-solaire-{ville-slug}.html`

**Tier A — 5 villes hub** (contenu riche 600-800 mots, photo locale, étude de cas, témoignage local) :
1. Annecy (74)
2. Annemasse (74)
3. Saint-Julien-en-Genevois (74)
4. Chambéry (73)
5. La Roche-sur-Foron (74)

**Tier B — 6 villages hyperlocaux Genevois** (contenu court 300-400 mots, mention spécificités locales : architecture, exposition, urbanisme commune) :
6. Vers (74520)
7. Vulbens (74520)
8. Valleiry (74270)
9. Archamps (74160)
10. Feigères (74160)
11. Crusseilles (74350)

**Tier C — 4 villes secondaires** (contenu moyen 400-500 mots) :
12. Thonon-les-Bains (74)
13. Aix-les-Bains (73)
14. Cluses (74)
15. Bonneville (74)

**Retirés de la liste initiale** : Grenoble (38) et Albertville (73) — trop loin / concurrence trop forte / ROI SEO faible.

### Session 17 — Avis Google dynamiques

- **Place ID** : `ChIJHUKhFuCfDykRkkLTeN-wm3c`
- **Clé API** : Neil la fournira (créée via Google Cloud Console, restreinte par référent HTTP)
- **Endpoint** : `redirect/index.php` (PHP côté serveur Hostinger)
- **Filtrage** : ne renvoyer au front **que les avis ≥ 4 étoiles** (filtrage côté serveur)
- **Garde-fous juridiques** (voir § Annexe risque Q16) :
  - **Ne PAS afficher de note moyenne globale** qui inclurait les avis filtrés (sinon = pratique commerciale trompeuse évidente)
  - **Ne PAS écrire « X avis vérifiés »** avec un chiffre supérieur au nombre réellement affiché
  - **Libellé recommandé** : « Sélection d'avis Google de nos clients » (pas « tous nos avis »)
- **Cache serveur** : ~6h pour rester sous le quota gratuit Places API
- **Préférence à terme** : passer à « tout afficher » dès qu'un avis négatif arrive → réponse publique soignée = preuve de sérieux et zéro risque légal

### Sessions 20+ — Articles de blog

- **Auteur** : Neil Lothian signe en propre
- **Bloc auteur** en fin de chaque article : photo + nom + titre « Président, Blue Energie » + bio courte 2 lignes (RGE QualiPV + expertise photovoltaïque Haute-Savoie)
- **Pas de page auteur dédiée**, mais ajout du schéma JSON-LD `Person` + `author` dans chaque article pour EEAT Google

---

## ❌ Décisions « ne PAS faire »

- ❌ **Pas de page À propos / équipe** dédiée (présentation minimale en home + footer)
- ❌ **Pas de version multilingue** (français seul, même en zone frontalière suisse)
- ❌ **Pas de témoignage nominal** sur le site (cohérent avec le souhait de discrétion client de Neil)
- ❌ **Pas de réseaux sociaux** liés dans le footer
- ❌ **Pas de Microsoft Clarity / heatmaps** (GA4 suffit)
- ❌ **Pas de divulgation du numéro RGE** publiquement (transmis à la demande)
- ❌ **Pas de page SEO Grenoble ni Albertville**
- ❌ **Pas de calculateur d'aides avec saisie de revenus** (RGPD + complexité injustifiée)

---

## ⚠️ Annexe — Risque juridique sur le filtrage des avis (Q16)

Le filtrage des avis Google négatifs sur un site marchand est juridiquement gris.

**Cadre légal** : art. L.121-1 du code de la consommation — pratique commerciale trompeuse. Risque non nul mais maîtrisable.

**Stratégie défensive retenue** :
- Filtrer côté serveur (PHP) avant renvoi au navigateur (pas de filtrage JS visible)
- Ne **jamais** afficher la note moyenne « 4.8/5 sur X avis » si X correspond au total Google (avis masqués inclus)
- Libeller la section « Sélection d'avis Google » et non « Tous nos avis »
- Documenter le choix dans la politique de confidentialité

**Recommandation à long terme** : dès qu'un avis négatif arrive, basculer en « tout afficher » + réponse publique professionnelle = preuve de sérieux et zéro risque légal. Le filtrage est une mesure de précaution court terme, pas une politique pérenne.

---

## 📁 Annexe — Convention `_dropzone/`

Le dossier `_dropzone/` à la racine du projet est une **boîte aux lettres entrante** :
- **Seul Neil dépose** des fichiers ici (logos, photos, PDF, captures…)
- **Claude intègre** les fichiers dans `public_html/`, met à jour le code, puis **déplace les originaux vers `_dropzone/corbeille/`**
- `.gitignore` ignore `_dropzone/*` sauf `_dropzone/README.md` (qui documente la convention)

Cf. `_dropzone/README.md` pour le détail complet.

---

## Historique du document

- **2026-05-17** — Création initiale + résolution complète des 20 questions de cadrage (Q1 à Q20) lors de la session « cahier de décisions ». Sessions 1, 2, 3, 6 et Blog déjà livrées avant cette date.
