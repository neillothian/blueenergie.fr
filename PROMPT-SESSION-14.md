# 🎓 Fiche de révision — Session 14 : SEO technique (JSON-LD + sitemap.xml + robots.txt)

> À lire AVANT de lancer le prompt dans Claude Code. Objectif : comprendre ce que la session va faire et pourquoi, pas juste exécuter aveuglément.

Google ne « lit » pas une page comme un humain : il parse le HTML, mais surtout il cherche des **balises structurées** qui lui disent explicitement « voilà l'adresse de l'entreprise, voilà ses horaires, voilà sa note moyenne ». Quand ces balises existent et sont valides, Google peut afficher des **résultats enrichis** (étoiles, horaires, NAP local dans la SERP), ce qui multiplie le taux de clic. Cette session ajoute 3 briques fondamentales du SEO technique : (1) du **JSON-LD `LocalBusiness`** sur toutes les pages, (2) un **`sitemap.xml`** qui liste toutes les URLs publiques, (3) un **`robots.txt`** qui pointe vers le sitemap et règle l'accès des crawlers. C'est ce qui transforme un site « bien présenté » en site « bien indexé ».

## Ce que tu vas voir passer dans le prompt

- **JSON-LD** : c'est du JSON inséré dans une balise `<script type="application/ld+json">` dans le `<head>`. Pas affiché à l'utilisateur, lu uniquement par les moteurs de recherche. Format recommandé par Google (vs les anciens microformats RDFa).
- **Schema.org** : vocabulaire commun utilisé par Google, Bing, Yandex. Définit les **types** (`LocalBusiness`, `Article`, `FAQPage`, `BreadcrumbList`…) et les **propriétés** que chaque type accepte. Tout ce qu'on met dans le JSON-LD vient de ce vocabulaire.
- **`LocalBusiness` vs `Organization`** : `Organization` est générique (toute entité morale). `LocalBusiness` est un **sous-type plus précis** pour une entreprise qui sert une zone géographique avec une adresse physique. Quand tu peux préciser, tu précises — ça donne plus de signaux à Google.
- **`areaServed`** : la liste des zones géographiques couvertes (74, 73, 01, 38 — décision déjà prise). Aide Google à proposer le site pour les requêtes locales (« installateur photovoltaïque Annecy »).
- **`telephone`** au format **E.164** : `+33761504385` (préfixe pays sans espace ni point). Format universel parsable par les moteurs et les apps mobiles (clic = appel).
- **`sitemap.xml`** : fichier XML à la racine qui liste toutes les URLs publiques avec `<lastmod>` (date dernière modif), `<changefreq>` (fréquence de mise à jour estimée), `<priority>` (importance relative). Lu par Google pour découvrir + recrawler les pages plus efficacement.
- **`robots.txt`** : fichier texte à la racine qui dit aux crawlers ce qu'ils peuvent / ne peuvent pas explorer. Aussi le lieu standard pour pointer vers le sitemap (`Sitemap: https://blueenergie.fr/sitemap.xml`).
- **Rich Snippets** : affichage enrichi dans la SERP Google (étoiles d'avis, horaires, FAQ déroulante, breadcrumbs). Déclenchés uniquement si le JSON-LD est présent ET valide ET reconnu par Google.
- **Validator officiel** : https://validator.schema.org/ (ou Google Search Console > Test des résultats enrichis) — à utiliser après upload pour confirmer 0 erreur.

## Étapes clés du prompt (vue d'avion)

1. Init : `git pull --rebase`, vérifier git propre, backup d'`index.html`.
2. Création du **JSON-LD `LocalBusiness`** (1 script identique inséré dans le `<head>` des 8 pages publiques).
3. Création d'un **JSON-LD `WebSite`** supplémentaire sur l'accueil uniquement (recommandation Google pour la requête de marque).
4. Création de **`public_html/sitemap.xml`** listant les 8 URLs publiques.
5. Création de **`public_html/robots.txt`** avec lien vers le sitemap.
6. Mise à jour automatique de `SESSIONS-CODE-A-VENIR.md` (ligne Session 14 → ✅ DÉPLOYÉ).
7. Validation : grep, vérification JSON syntaxique, commit + push direct main (livrable technique non engageant juridiquement).

## Pièges à anticiper

- **JSON cassé = SEO cassé** : un trailing comma, un guillemet mal échappé, et `validator.schema.org` rejette tout. Vérifier que le JSON parse via `node -e "JSON.parse(...)"` ou un linter.
- **`geo.latitude/longitude`** doivent être des **nombres**, pas des strings (`46.0982` et non `"46.0982"`). Erreur classique qui passe inaperçue à l'œil mais que Google rejette.
- **Horaires d'ouverture** : on met par défaut `Mo-Fr 09:00-18:00`. **Vérifie après upload** que ça correspond à ta vraie pratique commerciale — sinon Google les affichera tels quels et tu auras des clients qui appellent à 9h sans réponse.
- **Pas de réseaux sociaux confirmés** : la propriété `sameAs` (qui lie l'entité à ses profils Facebook/LinkedIn/Instagram) reste vide. Si tu actives des comptes plus tard, ajoute-les ici — c'est un signal fort pour Google.
- **`sitemap.xml` à mettre à jour à chaque nouvelle page** : ce n'est pas auto-généré par la stack actuelle. Quand on créera une nouvelle page (Session 12, 13, 15, 16, 22…), il faudra penser à l'ajouter au sitemap.
- **`robots.txt` ne bloque pas l'accès** : il indique seulement une *recommandation* aux crawlers bienveillants. Pour vraiment protéger un dossier, utiliser les règles `.htaccess` Hostinger (hors scope ici).
- **Numéro RGE non affiché** : pour rester cohérent avec les pages légales, on n'inclut pas le numéro RGE dans le JSON-LD `hasCredential`. On indique seulement la certification + l'organisme certificateur (Qualit'EnR), pas le numéro privé.

## Mini-quiz d'auto-vérification

1. Pourquoi le JSON-LD `LocalBusiness` doit-il être présent sur **toutes les pages** du site, et pas seulement sur l'accueil ?
2. Si tu mets `Disallow: /` dans `robots.txt` par erreur, qu'est-ce qui arrive au site dans les résultats Google sur les 2-4 semaines suivantes ?
3. À quoi sert exactement le format **E.164** (`+33761504385`) pour le téléphone, comparé au format français lisible (`07 61 50 43 85`) ?

## Pour aller plus loin (optionnel)

- Schema.org — type LocalBusiness : https://schema.org/LocalBusiness
- Google Search Central — Données structurées LocalBusiness : https://developers.google.com/search/docs/appearance/structured-data/local-business
- Format sitemap.xml officiel : https://www.sitemaps.org/protocol.html
- Robots.txt — Spécification : https://developers.google.com/search/docs/crawling-indexing/robots/intro

---



# Prompt Session 14 — SEO technique (JSON-LD + sitemap.xml + robots.txt)

> **Ajout des briques SEO techniques fondamentales : JSON-LD LocalBusiness sur toutes les pages + JSON-LD WebSite sur l'accueil + sitemap.xml + robots.txt.**
> Périmètre : 8 pages HTML modifiées (ajout `<script type="application/ld+json">` dans le `<head>`) + 2 fichiers créés à la racine (`sitemap.xml`, `robots.txt`) + maj `SESSIONS-CODE-A-VENIR.md`.
> Durée estimée : 1 h. Aucune question au user pendant l'exécution.

---

## Mode d'emploi (côté Neil)

1. Ouvre un terminal
2. `cd "/Users/neillothian/Documents/Claude/Projects/blueenergie.fr"`
3. Lance Claude Code : `claude`
4. Copie-colle tout ce qui est entre `=== DÉBUT PROMPT ===` et `=== FIN PROMPT ===`
5. Laisse tourner ~1 h. **Push direct main** (livrable technique non engageant).

---

## === DÉBUT PROMPT ===

Tu es développeur web senior spécialisé en **SEO technique** (Schema.org, sitemaps, robots.txt, rich snippets). Tu travailles sur **blueenergie.fr** (installation photovoltaïque résidentielle en Haute-Savoie). Stack : HTML/CSS/JS pur. Hébergement Hostinger.

**État du site** : Sessions 1+2+3+4+5+6+Blog déployées. 8 pages publiques en ligne :
- `/` (accueil)
- `/merci.html` (confirmation formulaire)
- `/blog/` (hub blog)
- `/blog/2026-05-aides-solaires-avant-1er-juillet.html`
- `/blog/2026-05-batterie-virtuelle-attention-jpme.html`
- `/mentions-legales.html`
- `/cgv.html`
- `/politique-confidentialite.html`

Session 18 (bandeau confiance) peut être déjà déployée ou non — sans incidence sur cette session.

## Ta mission

Ajouter les **3 briques SEO techniques fondamentales** :

1. **JSON-LD `LocalBusiness`** : 1 script identique inséré dans le `<head>` des 8 pages publiques (juste avant `</head>`)
2. **JSON-LD `WebSite`** : 1 script supplémentaire **uniquement sur l'accueil** (`index.html`)
3. **`public_html/sitemap.xml`** : fichier XML listant les 8 URLs publiques
4. **`public_html/robots.txt`** : fichier texte autorisant tout + lien vers le sitemap

Pas de modification du contenu visible. Pas de JS. Pas de CSS. Aucune dépendance externe.

Durée : 1 h. Aucune question au user.

## Workflow obligatoire

### Étape 0 — Initialisation (5 min)

1. TodoWrite avec 7 tâches : git pull, backup, JSON-LD LocalBusiness 8 pages, JSON-LD WebSite accueil, sitemap.xml, robots.txt, maj SESSIONS-CODE-A-VENIR.md + commit/push
2. `git pull origin main --rebase` — si échec : diagnostique, ne continue pas
3. `git status` doit retourner « nothing to commit, working tree clean »
4. Backup : `cp public_html/index.html public_html/index.html.backup-pre-session14`

### Étape 1 — Lecture contexte (5 min)

Lis dans cet ordre, et RIEN d'autre :
1. `public_html/index.html` — repérer la position de `</head>` pour insertion du JSON-LD
2. `public_html/blog/index.html` — confirmer la même structure de `<head>`

### Étape 2 — JSON-LD LocalBusiness à insérer sur les 8 pages (25 min)

Pour **chaque** page de la liste ci-dessous, insérer dans le `<head>` **juste avant** la fermeture `</head>` (et après tous les autres scripts existants) le bloc suivant **EXACTEMENT** :

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://blueenergie.fr/#localbusiness",
  "name": "Blue Energie",
  "legalName": "Blue Energie",
  "description": "Installateur photovoltaïque résidentiel RGE QualiPV en Haute-Savoie. Modules JA Solar, onduleurs Solplanet, batteries de stockage, structure K2.",
  "url": "https://blueenergie.fr/",
  "logo": "https://blueenergie.fr/images/logo-qualipv.png",
  "telephone": "+33761504385",
  "email": "neil.lothian@blueenergie.fr",
  "vatID": "FR25882483274",
  "taxID": "882483274",
  "priceRange": "€€€",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "11 Chemin de Perouza",
    "postalCode": "74520",
    "addressLocality": "Savigny",
    "addressRegion": "Haute-Savoie",
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 46.0982,
    "longitude": 6.0279
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "areaServed": [
    {"@type": "AdministrativeArea", "name": "Haute-Savoie"},
    {"@type": "AdministrativeArea", "name": "Savoie"},
    {"@type": "AdministrativeArea", "name": "Ain"},
    {"@type": "AdministrativeArea", "name": "Isère"}
  ],
  "hasCredential": {
    "@type": "EducationalOccupationalCredential",
    "credentialCategory": "certification",
    "name": "RGE QualiPV",
    "recognizedBy": {
      "@type": "Organization",
      "name": "Qualit'EnR",
      "url": "https://www.qualit-enr.org/"
    }
  },
  "founder": {
    "@type": "Person",
    "name": "Neil Lothian",
    "jobTitle": "Président"
  }
}
</script>
```

Pages à modifier :

1. `public_html/index.html`
2. `public_html/merci.html`
3. `public_html/blog/index.html`
4. `public_html/blog/2026-05-aides-solaires-avant-1er-juillet.html`
5. `public_html/blog/2026-05-batterie-virtuelle-attention-jpme.html`
6. `public_html/mentions-legales.html`
7. `public_html/cgv.html`
8. `public_html/politique-confidentialite.html`

**Important** : le bloc est strictement identique sur les 8 pages. Le `@id` (`https://blueenergie.fr/#localbusiness`) permet à Google de comprendre qu'il s'agit de la même entité, peu importe la page.

### Étape 3 — JSON-LD WebSite uniquement sur l'accueil (5 min)

Sur **`public_html/index.html` uniquement**, ajouter **un deuxième script** JSON-LD juste APRÈS le bloc LocalBusiness ajouté en Étape 2 :

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://blueenergie.fr/#website",
  "url": "https://blueenergie.fr/",
  "name": "Blue Energie",
  "description": "Installateur photovoltaïque résidentiel RGE QualiPV en Haute-Savoie, Savoie, Ain et Isère.",
  "publisher": {
    "@id": "https://blueenergie.fr/#localbusiness"
  },
  "inLanguage": "fr-FR"
}
</script>
```

Le `publisher` référence le `@id` du LocalBusiness — Google relie les deux entités.

### Étape 4 — Création de `public_html/sitemap.xml` (10 min)

Créer le fichier **`public_html/sitemap.xml`** avec ce contenu **EXACT** :

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://blueenergie.fr/</loc>
    <lastmod>2026-05-17</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://blueenergie.fr/merci.html</loc>
    <lastmod>2026-05-17</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.2</priority>
  </url>
  <url>
    <loc>https://blueenergie.fr/blog/</loc>
    <lastmod>2026-05-17</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://blueenergie.fr/blog/2026-05-aides-solaires-avant-1er-juillet.html</loc>
    <lastmod>2026-05-17</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://blueenergie.fr/blog/2026-05-batterie-virtuelle-attention-jpme.html</loc>
    <lastmod>2026-05-17</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://blueenergie.fr/mentions-legales.html</loc>
    <lastmod>2026-05-17</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://blueenergie.fr/cgv.html</loc>
    <lastmod>2026-05-17</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://blueenergie.fr/politique-confidentialite.html</loc>
    <lastmod>2026-05-17</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>
```

### Étape 5 — Création de `public_html/robots.txt` (5 min)

Créer le fichier **`public_html/robots.txt`** avec ce contenu **EXACT** :

```
# robots.txt — blueenergie.fr
# Politique : autoriser tous les crawlers à indexer tout le contenu public.

User-agent: *
Allow: /
Disallow: /_dropzone/
Disallow: /api/

Sitemap: https://blueenergie.fr/sitemap.xml
```

### Étape 6 — Mise à jour table d'avancement (3 min)

1. Lire `SESSIONS-CODE-A-VENIR.md` et localiser la ligne `| Session 14 — JSON-LD + sitemap + robots.txt |`
2. Remplacer la ligne via Edit avec ce format exact :
   ```
   | Session 14 — JSON-LD + sitemap + robots.txt | ✅ **DÉPLOYÉ** | `PROMPT-SESSION-14.md` |
   ```
3. Mettre à jour la date d'en-tête : `## État d'avancement (mise à jour 2026-05-17)`
4. Vérification : `grep -c "Session 14.*DÉPLOYÉ" SESSIONS-CODE-A-VENIR.md` doit retourner **1**
5. Inclure `SESSIONS-CODE-A-VENIR.md` dans le commit final

### Étape 7 — Validation finale (10 min)

1. **Vérifier la création des fichiers à la racine** :
   ```bash
   ls -la public_html/sitemap.xml public_html/robots.txt
   ```
   Doivent exister, sitemap.xml > 1 Ko, robots.txt > 100 b.

2. **Vérifier le JSON-LD LocalBusiness sur les 8 pages** :
   ```bash
   grep -c '"@type": "LocalBusiness"' public_html/index.html public_html/merci.html public_html/blog/*.html public_html/mentions-legales.html public_html/cgv.html public_html/politique-confidentialite.html
   ```
   Chaque page doit retourner exactement **1**.

3. **Vérifier le JSON-LD WebSite uniquement sur l'accueil** :
   ```bash
   grep -c '"@type": "WebSite"' public_html/index.html public_html/merci.html public_html/blog/index.html
   ```
   Doit retourner : `index.html: 1`, `merci.html: 0`, `blog/index.html: 0`.

4. **Vérifier la validité JSON des blocs LocalBusiness** (parsing) :
   ```bash
   for f in public_html/index.html public_html/merci.html public_html/blog/index.html public_html/blog/2026-05-aides-solaires-avant-1er-juillet.html public_html/blog/2026-05-batterie-virtuelle-attention-jpme.html public_html/mentions-legales.html public_html/cgv.html public_html/politique-confidentialite.html; do
     echo "=== $f ==="
     # Extraire le 1er bloc JSON-LD entre <script type="application/ld+json"> et </script>, et le valider
     python3 -c "
import re, json, sys
with open('$f', 'r', encoding='utf-8') as fh:
    content = fh.read()
blocks = re.findall(r'<script type=\"application/ld\+json\">(.*?)</script>', content, re.DOTALL)
for i, b in enumerate(blocks):
    try:
        data = json.loads(b)
        print(f'  Bloc {i+1} ({data.get(\"@type\", \"?\")}): JSON valide')
    except json.JSONDecodeError as e:
        print(f'  Bloc {i+1}: JSON INVALIDE — {e}')
        sys.exit(1)
"
   done
   ```
   Doit afficher « JSON valide » pour tous les blocs. Si python3 indisponible, signaler dans le rapport.

5. **Vérifier le sitemap.xml** :
   ```bash
   grep -c "<url>" public_html/sitemap.xml
   ```
   Doit retourner **8** (8 URLs).

6. **Vérifier le robots.txt** :
   ```bash
   grep -c "Sitemap: https://blueenergie.fr/sitemap.xml" public_html/robots.txt
   ```
   Doit retourner **1**.

7. **Validation Schema.org en ligne** (optionnelle, si curl + jq dispo) :
   ```bash
   curl -s -H "Content-Type: text/html; charset=utf-8" --data-binary @public_html/index.html "https://validator.w3.org/nu/?out=json" | head -30
   ```
   Mentionner les erreurs critiques dans le rapport. Les warnings non critiques (`<title>` doublé, etc.) sont à ignorer si pré-existants.

8. **Commit + push direct main** (livrable technique non engageant) :
   ```bash
   git add public_html/index.html public_html/merci.html public_html/blog/*.html public_html/mentions-legales.html public_html/cgv.html public_html/politique-confidentialite.html public_html/sitemap.xml public_html/robots.txt SESSIONS-CODE-A-VENIR.md
   git commit -m "Session 14 : JSON-LD LocalBusiness + WebSite + sitemap.xml + robots.txt"
   git push origin main
   ```
   Si auth interactive requise, commit local valide + signaler dans rapport.

## Décisions déjà prises (ne demande RIEN)

| Sujet | Décision |
|---|---|
| Type Schema.org principal | `LocalBusiness` (sous-type d'`Organization`, plus précis pour SEO local) |
| `@id` partagé entre pages | `https://blueenergie.fr/#localbusiness` (entité unique référencée partout) |
| Téléphone | `+33761504385` (format E.164) |
| Email | `neil.lothian@blueenergie.fr` (choix déjà fait, pas d'alias contact@) |
| `priceRange` | `€€€` (installation 10-25 k€ TTC ordre de grandeur) |
| `vatID` | `FR25882483274` |
| `taxID` | `882483274` (SIREN) |
| Géolocalisation | `46.0982, 6.0279` (Savigny 74520, cohérent avec OSM Session 3) |
| Horaires | Lundi-Vendredi 09:00-18:00 (à confirmer par Neil après upload, hors scope code) |
| Zones servies | Haute-Savoie + Savoie + Ain + Isère (décision déjà prise) |
| Certification RGE | `EducationalOccupationalCredential` nom « RGE QualiPV », organisme Qualit'EnR, **sans numéro** (politique privée) |
| `sameAs` (réseaux sociaux) | Absent (pas de comptes confirmés à ce jour — à ajouter plus tard) |
| `WebSite` uniquement sur accueil | Recommandation Google : 1 seule entité WebSite par site, sur la home |
| sitemap.xml | 8 URLs publiques, lastmod = date du jour 2026-05-17, priorities décroissantes (accueil 1.0, articles 0.9/0.7, hub blog 0.8, légales 0.3, merci 0.2) |
| robots.txt | Tout autorisé sauf `/_dropzone/` et `/api/` (préventif), lien vers sitemap |
| Branche git | Push direct `main` (livrable technique, pas de branche dédiée nécessaire) |
| Mise à jour table | `SESSIONS-CODE-A-VENIR.md` ligne Session 14 → ✅ DÉPLOYÉ, inclus dans le même commit |

## Interdictions strictes

- ❌ N'invente AUCUNE donnée non listée (numéro RGE, comptes réseaux sociaux, URL inventée, etc.)
- ❌ Ne pose AUCUNE question au user
- ❌ N'ajoute PAS d'autres types Schema.org que LocalBusiness et WebSite dans cette session (BreadcrumbList sur blog → session future)
- ❌ Ne touche PAS au contenu visible des pages — uniquement ajout dans `<head>` + 2 fichiers à la racine
- ❌ N'ajoute PAS de dépendance npm / outil de génération automatique de sitemap
- ❌ Ne génère PAS le sitemap dynamiquement via PHP / JS — fichier statique uniquement
- ❌ Ne refactore PAS le CSS, le JS, ni le HTML existants
- ❌ N'utilise PAS `Disallow: /` ou `Disallow: *` dans robots.txt (catastrophe SEO)
- ❌ N'oublie PAS d'ajouter `SESSIONS-CODE-A-VENIR.md` au commit final

## En cas de blocage

1. Diagnostique
2. Tente 2 solutions
3. Si la validation Python JSON échoue : corrige le JSON, ne le contourne pas
4. Si toujours bloqué sur UNE tâche, passe à la suivante et liste dans le rapport
5. NE STOPPE PAS pour poser une question

## Format du rapport final

```
## Rapport Session 14

### Fichiers créés / modifiés
- public_html/sitemap.xml — créé (8 URLs)
- public_html/robots.txt — créé
- public_html/index.html — JSON-LD LocalBusiness + WebSite ajoutés
- public_html/merci.html — JSON-LD LocalBusiness ajouté
- public_html/blog/index.html — JSON-LD LocalBusiness ajouté
- public_html/blog/2026-05-aides-solaires-avant-1er-juillet.html — JSON-LD LocalBusiness ajouté
- public_html/blog/2026-05-batterie-virtuelle-attention-jpme.html — JSON-LD LocalBusiness ajouté
- public_html/mentions-legales.html — JSON-LD LocalBusiness ajouté
- public_html/cgv.html — JSON-LD LocalBusiness ajouté
- public_html/politique-confidentialite.html — JSON-LD LocalBusiness ajouté
- SESSIONS-CODE-A-VENIR.md — ligne Session 14 passée à ✅ DÉPLOYÉ
- public_html/index.html.backup-pre-session14 — sauvegarde locale

### Vérifications passées
- ls sitemap.xml + robots.txt : OK
- grep "@type LocalBusiness" sur 8 pages : 8/8 OK
- grep "@type WebSite" sur 3 pages : index 1, merci 0, blog/index 0 → OK
- JSON parse (python3) sur 8 pages : tous valides OK / KO (préciser)
- grep <url> sitemap.xml : 8 URLs → OK
- grep "Sitemap:" robots.txt : 1 → OK
- Git pull initial : OK
- Validation W3C : X erreurs / X warnings sur page accueil (rester sur ce qui est imputable à cette session uniquement)

### Table d'avancement
- `SESSIONS-CODE-A-VENIR.md` ligne Session 14 passée à `✅ DÉPLOYÉ`
- En-tête « Mise à jour 2026-05-17 » → OK

### Git
- Branche : main
- Commit : [hash + message]
- Pushé : oui / non — raison si non

### À faire côté Neil
1. Téléverser sur Hostinger via hPanel :
   - `public_html/sitemap.xml` (racine du domaine)
   - `public_html/robots.txt` (racine du domaine)
   - Les 8 pages HTML modifiées
2. Vider le cache Hostinger
3. Tests externes :
   - https://blueenergie.fr/robots.txt → doit afficher le contenu texte
   - https://blueenergie.fr/sitemap.xml → doit afficher le XML
   - https://validator.schema.org/ → coller https://blueenergie.fr/ → 0 erreur sur LocalBusiness + WebSite
   - Google Search Console → Sitemaps → soumettre `https://blueenergie.fr/sitemap.xml`
   - Google Search Console → Test des résultats enrichis → tester l'URL de l'accueil
4. Vérifier que les **horaires** (Mo-Fr 09:00-18:00) correspondent à la réalité commerciale, sinon me signaler pour correction.

### Prochaine session recommandée
Session 7 (finition galerie réalisations : `loading="lazy"`, retrait final mentions Mylight) — finition rapide, ou Session 17 si Place ID Google + clé API Places sont disponibles.

### Blocages éventuels
[ou : aucun]
```

## === FIN PROMPT ===

---

## Notes hors prompt (pour Neil)

**Vérifications post-déploiement** :
1. **Horaires** : `Mo-Fr 09:00-18:00` est un défaut raisonnable. Si tes horaires réels diffèrent (par exemple 08:30-19:00, ou travail le samedi matin), me signaler — modif rapide dans le JSON-LD des 8 pages.
2. **Test des résultats enrichis Google** : https://search.google.com/test/rich-results — colle l'URL de la home après upload. Doit détecter LocalBusiness + WebSite + (en bonus si tarteaucitron renvoie les FAQ des articles blog) FAQPage.
3. **Soumission sitemap GSC** : https://search.google.com/search-console → propriété blueenergie.fr → Sitemaps → ajouter `sitemap.xml`. Active la découverte rapide des pages par Google.
4. **Property GSC non vérifiée ?** Si Google Search Console n'est pas encore configuré pour blueenergie.fr, c'est l'occasion : vérification via balise meta HTML ou record DNS Hostinger.

**Évolution Session 17 (avis Google)** : quand Session 17 sera faite, on enrichira le JSON-LD LocalBusiness avec `aggregateRating` (note moyenne + nombre d'avis) — déclencheur des étoiles dans la SERP. Le markup actuel est conçu pour permettre cet ajout sans refactor.

**Évolution Session 12 (pages internes)** : à chaque nouvelle page créée (Session 12, 13, 15, 16, 22…), penser à ajouter une entrée dans `sitemap.xml`. À automatiser plus tard si le nombre devient ingérable (script Python qui scanne `public_html/`).

**Prochaine session recommandée après celle-ci** : **Session 7** (finition galerie : `loading="lazy"` partout, retrait final Mylight) — quick win technique. Ou **Session 17** si tu as eu le temps de créer le projet Google Cloud + Place ID.
