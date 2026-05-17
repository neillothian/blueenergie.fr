# Actions à faire côté Neil

> Centralise les démarches techniques externes à exécuter par Neil (création de comptes, récupération de clés API, collecte d'assets…). Quand une action est terminée, on coche la case et on note la résolution dans `QUESTIONS-OUVERTES.md`.

---

## ☐ Q8 — Récupérer les logos officiels des partenaires

**Cible** : 5 logos haute définition (SVG ou PNG transparent ≥ 500 px de large)
- ☐ JA Solar
- ☐ Solplanet (Solplanet par AISWEI)
- ☐ K2 Systems (montage)
- ☐ Tigo (optimiseurs)
- ☐ QualitEnR (organisme certificateur)

**Logo déjà fourni** : ✅ QualiPV (`public_html/images/logo-qualipv.png`)

### Mode d'emploi

1. Ouvre une autre conversation avec un assistant qui a accès au web (Claude.ai, ChatGPT avec recherche, Perplexity…)
2. Colle ce prompt :

```
Je dois récupérer les logos officiels (SVG ou PNG haute définition, fond transparent, version horizontale si possible) des 5 marques suivantes pour les afficher en footer "nos partenaires" d'un site web d'installateur photovoltaïque :

1. JA Solar (fabricant panneaux solaires)
2. Solplanet (marque d'onduleurs photovoltaïques, filiale du groupe AISWEI)
3. K2 Systems (fabricant allemand de systèmes de montage solaire)
4. Tigo Energy (fabricant d'optimiseurs de puissance MLPE)
5. QualitEnR (organisme certificateur français des installateurs ENR)

Pour chacun :
- Trouve le lien direct vers la page "presskit" ou "media" / "brand resources" du site officiel
- Donne le lien de téléchargement direct du fichier logo (SVG préféré, sinon PNG haute déf transparent)
- Précise les conditions d'usage si elles sont mentionnées (souvent : "usage commercial autorisé pour partenaires/revendeurs avec respect de la charte graphique")
- Si pas de presskit officiel, donne le meilleur lien alternatif (ex: page "À propos" avec logo téléchargeable)

Réponds sous forme de tableau structuré :
| Marque | URL presskit | URL téléchargement direct logo | Format | Notes usage |
```

3. L'assistant te donnera 5 URL de téléchargement
4. Télécharge chaque logo
5. **Dépose les 5 fichiers dans `_dropzone/`** du projet — je m'occupe du reste (renommage, redimensionnement éventuel, intégration HTML)

**Échéance** : avant la Session 6 (catalogue matériel) si possible. Sinon, on code la section avec placeholders et tu remplaces.

---

## ☐ Q9 — Créer les clés Google reCAPTCHA v3

**Cible** : 1 site key (publique, dans le HTML) + 1 secret key (privée, côté serveur PHP)

### Mode d'emploi

1. Connecte-toi sur **https://www.google.com/recaptcha/admin/create** avec un compte Google
   - Idéalement le même compte Google qui gère la fiche Google Business (cohérence administration)

2. Remplis le formulaire :
   - **Libellé** : `Blue Energie - Site officiel`
   - **Type reCAPTCHA** : sélectionne **reCAPTCHA v3** (PAS v2 — on veut l'invisible/score)
   - **Domaines** : ajoute 2 entrées
     - `blueenergie.fr`
     - `www.blueenergie.fr`
   - **Propriétaires** : ton email Google (déjà préfilé)
   - Coche la case « Accepter les conditions d'utilisation »
   - Coche éventuellement « Envoyer des alertes aux propriétaires » (recommandé pour être notifié d'abus)

3. Clique **Envoyer**

4. Tu obtiens 2 clés à transmettre :
   - **Clé du site** (site key) — commence par `6L...`, ~40 caractères
   - **Clé secrète** (secret key) — commence par `6L...`, ~40 caractères

5. **Transmets-moi les 2 clés** dans une réponse au chat. Note : la site key sera visible dans le HTML public (c'est normal, c'est par design), la secret key restera côté serveur PHP uniquement.

**Implication RGPD (gérée en Session 10)** : reCAPTCHA pose des cookies Google. Le script sera chargé **uniquement au focus/submit du formulaire de contact** (pas au chargement de page), ce qui dispense du consent banner pour cette interaction. La politique de cookies (Session 4) mentionnera reCAPTCHA dans la liste des cookies tiers.

**Coût** : gratuit jusqu'à 1 million d'évaluations/mois. Blue Energie en utilisera < 1000/mois. Tu ne paieras jamais.

**Échéance** : avant la Session 10 (refonte formulaire de contact).

---

## ☐ Q10 — Créer la clé Google Places API

**Cible** : 1 clé API restreinte par référent HTTP, pour afficher les avis Google de la fiche Blue Energie sur le site (Session 17).

### Mode d'emploi

#### Étape 1 — Compte Google Cloud

1. Connecte-toi sur **https://console.cloud.google.com/** avec le même compte Google que la fiche Business (cohérence)
2. Si c'est ta première connexion : accepte les conditions
3. Si pas encore activé : Google demandera une **carte bancaire** pour le compte de facturation
   - **Pas d'inquiétude** : 300€ de crédit gratuit pendant 90 jours + niveau gratuit permanent (Places API Details : **10 000 requêtes/mois offertes**)
   - Blue Energie consommera ~30 requêtes/mois (1 appel par chargement de page, cache 6h côté serveur) → tu ne paieras jamais
   - Tu peux configurer une **alerte de facturation à 1€** par sécurité (étape 4 ci-dessous)

#### Étape 2 — Créer le projet

4. En haut, à droite du logo Google Cloud, clique sur le sélecteur de projet (probablement « Sélectionner un projet »)
5. Clique **« NOUVEAU PROJET »** en haut à droite de la fenêtre
6. Nom du projet : `Blue Energie Site`
   - ID du projet (auto-généré) : laisse Google choisir, ou personnalise en `blue-energie-site` si dispo
7. Organisation / Emplacement : laisse « Aucune organisation »
8. Clique **CRÉER**
9. Attends 10-30 secondes puis sélectionne le projet `Blue Energie Site` dans le menu déroulant en haut

#### Étape 3 — Activer Places API (New)

10. Dans la barre de recherche en haut de la console, tape : `Places API (New)` et sélectionne-la dans les résultats
    - ⚠️ Choisis bien « Places API **(New)** » et pas l'ancienne « Places API » qui est en cours de dépréciation
11. Sur la page Places API (New), clique **ACTIVER**
12. Patiente 30 secondes le temps que l'activation se propage

#### Étape 4 — Configurer la facturation (sécurité)

13. Menu hamburger ☰ → **Facturation** → **Budgets et alertes**
14. **CRÉER UN BUDGET**
   - Nom : `Alerte sécurité Blue Energie`
   - Plage : Mois en cours
   - Montant cible : **1 €**
   - Pourcentages de seuils : 50%, 90%, 100%
   - Méthode de notification : email
15. **Enregistrer**

→ Si jamais la consommation dépasse 1€ (ce qui n'arrivera pas en usage normal), tu reçois un email. Filet de sécurité.

#### Étape 5 — Créer la clé API

16. Menu hamburger ☰ → **APIs et services** → **Identifiants**
17. Clique **+ CRÉER DES IDENTIFIANTS** en haut → **Clé API**
18. Une popup affiche ta nouvelle clé (format : `AIzaSy...`, ~39 caractères). **Copie-la.**
19. Clique **MODIFIER LA CLÉ API** dans la popup (important : on va la restreindre)

#### Étape 6 — Restreindre la clé (CRITIQUE pour la sécurité)

20. Dans la page d'édition de la clé :
   - **Nom** : `Blue Energie - Places API frontend`
   - **Restrictions d'application** : sélectionne **« Référents HTTP (sites web) »**
   - **Restrictions de site web** → **+ AJOUTER UN ÉLÉMENT**, ajoute ces 4 entrées :
     - `https://blueenergie.fr/*`
     - `https://www.blueenergie.fr/*`
     - `http://localhost:*/*` (pour tester en local côté dev)
     - `http://127.0.0.1:*/*` (idem)
   - **Restrictions d'API** : sélectionne **« Restreindre la clé »** → coche uniquement **« Places API (New) »**
21. Clique **ENREGISTRER**

#### Étape 7 — Transmettre la clé

22. **Transmets-moi la clé API** (`AIzaSy...`) dans une réponse au chat. Comme elle est restreinte par référent HTTP, elle ne peut être utilisée que depuis blueenergie.fr → pas de risque même si elle fuite (un attaquant ne peut rien en faire depuis ailleurs).

**Échéance** : avant la Session 17 (intégration avis Google).

---

## Légende statuts

- ☐ À faire
- ☑ Fait (résolution notée dans `QUESTIONS-OUVERTES.md`)
