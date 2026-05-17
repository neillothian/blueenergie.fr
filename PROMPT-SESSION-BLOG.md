# 🎓 Fiche de révision — Session Blog : hub + 2 articles SEO fondateurs

> À lire AVANT de lancer le prompt dans Claude Code. Objectif : comprendre ce que la session va faire et pourquoi, pas juste exécuter aveuglément.

Le site n'a aujourd'hui aucun contenu éditorial pour le SEO ni pour rassurer un prospect qui se renseigne. Cette session crée la fondation du blog (un hub + 2 articles) avec deux objectifs : faire monter le site dans Google sur les bonnes requêtes (« aides solaires 2026 », « batterie virtuelle JPME »), et capter des leads via un bouton « étude gratuite » placé à la fin de chaque article. Le contenu rédactionnel des 2 articles est fourni mot pour mot — le job du dev, c'est l'habillage HTML, pas l'écriture.

## Ce que tu vas voir passer dans le prompt

- **SEO** (Search Engine Optimization) : tout ce qu'on fait pour qu'une page remonte dans les résultats Google. Ici : titres avec mots-clés, balisage structuré, maillage interne entre articles, sources externes de qualité.
- **JSON-LD** (JSON for Linked Data) : bloc `<script type="application/ld+json">` placé dans le `<head>` qui dit à Google « voici la structure de mon contenu » sous forme de données. Permet d'apparaître avec des FAQ dépliables dans les résultats Google.
- **Schema.org Article + FAQPage** : les deux « types » de JSON-LD utilisés ici. `Article` décrit l'article (auteur, date, titre) ; `FAQPage` décrit les questions/réponses pour qu'elles s'affichent directement dans Google.
- **Open Graph** : balises `<meta property="og:...">` dans le `<head>` qui contrôlent l'aspect de l'aperçu quand quelqu'un partage l'URL sur LinkedIn, Facebook, etc.
- **Maillage interne** : faire des liens d'un article vers un autre article du même site. Bon pour le SEO, et permet au lecteur de continuer sa lecture.
- **`rel="noopener noreferrer nofollow"`** sur les liens sortants : sécurité (noopener/noreferrer) + indication à Google « je ne recommande pas particulièrement ce site, ne donne pas mon autorité SEO à cette page ». Utile sur les sources externes.
- **CTA** (Call To Action) : bouton d'appel à l'action. Ici, à la fin de chaque article, un bouton orange « Demander mon étude gratuite » qui scrolle vers le formulaire de la page d'accueil.
- **Breadcrumb** : fil d'Ariane (« Accueil > Blog > Aides solaires »). Aide la navigation et le SEO.

## Étapes clés du prompt (vue d'avion)

1. Initialisation : `git pull origin main --rebase`, backup, vérifier working tree propre.
2. Lecture contexte : wireframes blog, CSS du site, structure de page secondaire (`merci.html`).
3. Création du dossier `public_html/blog/` avec 3 fichiers : hub `index.html` + 2 articles aux URL parlantes (`2026-05-aides-solaires-avant-1er-juillet.html` et `2026-05-batterie-virtuelle-attention-jpme.html`).
4. Rédaction du hub blog : navbar, header, 2 cartes articles avec badges « URGENT » et « ALERTE », CTA en bas.
5. Article 1 (60 min) : urgence avant la réforme des aides du 1er juillet 2026, 7 sections, 5 FAQ, JSON-LD Article + FAQPage, CTA final.
6. Article 2 (60 min) : alerte sur les batteries virtuelles à travers le cas JPME, structure similaire.
7. Ajout du lien « Blog » dans la navbar de `index.html` et `merci.html` (entre Réalisations et Contact).
8. Validation : structure de dossier, liens internes, balisage `nofollow` sur les externes, validation W3C, commit + push GitHub.

## Pièges à anticiper

- **Le contenu rédactionnel est fourni MOT POUR MOT** dans le prompt. Si tu vois Claude Code reformuler les phrases « pour faire mieux », c'est interdit (instruction explicite : « habiller en HTML uniquement »). Les chiffres (80 €/kWc, 4 c€/kWh, 1,1 c€/kWh) sont sourcés et engageants — pas de drift.
- **Les 4 liens sortants par article** doivent tous avoir `target="_blank" rel="noopener noreferrer nofollow"`. Sans `nofollow`, tu donnes ton autorité SEO à ces sites externes — c'est dommage pour les sources « informatives » qui ne sont pas tes partenaires.
- **Le JSON-LD doit être un JSON valide** : une virgule oubliée et Google ne le lit pas. Un validateur officiel existe (`validator.schema.org`) — à passer après upload prod.
- **Cas JPME** : l'article 2 cite nommément cette société qui s'est fait retirer son autorisation. Les faits sont publics et documentés par le médiateur national de l'énergie, donc pas de risque diffamation. MAIS ne laisse pas Claude Code étendre l'accusation à d'autres fournisseurs cités.
- **Le push GitHub interactif** peut bloquer sur authentification — même piège que la Session 4. Le commit local restera valide, à pousser manuellement après.

## Mini-quiz d'auto-vérification

1. Pourquoi un JSON-LD `FAQPage` est intéressant pour le SEO d'un article qui contient une section « Foire aux questions » ?
2. Qu'est-ce qui se passerait si tu oubliais `rel="nofollow"` sur les 4 liens sortants d'un article (vers UFC, Hellio, etc.) — quel effet SEO indésirable ?
3. Pourquoi est-ce important que les URL des articles soient au format `2026-05-titre-explicite.html` plutôt que `article1.html` ou `?id=1` ?

## Pour aller plus loin (optionnel)

- Schema.org Article : https://schema.org/Article
- Google — Données structurées FAQ : https://developers.google.com/search/docs/appearance/structured-data/faqpage
- Open Graph protocol : https://ogp.me/

---




# Prompt Session Blog — pour Claude Code

> **Création du blog Blue Energie : hub + 2 articles SEO fondateurs.**
> Article 1 : urgence avant la réforme des aides solaires du 1er juillet 2026.
> Article 2 : alerte sur les batteries virtuelles (cas JPME).
> Durée estimée : 3 heures. Le dev travaille seul, sans poser de questions.

---

## Mode d'emploi (côté Neil)

1. Ouvre un terminal
2. `cd "/Users/neillothian/Documents/Claude/Projects/blueenergie.fr"`
3. Lance Claude Code : `claude`
4. Copie-colle tout ce qui est entre `=== DÉBUT PROMPT ===` et `=== FIN PROMPT ===`
5. Laisse tourner ~3 h. Rapport final à la fin.

---

## === DÉBUT PROMPT ===

Tu es développeur web senior + rédacteur SEO. Tu travailles sur **blueenergie.fr** (installation photovoltaïque en Haute-Savoie). Stack : HTML/CSS/JS pur. Hébergement Hostinger.

Les **Sessions 1+2+3+6 sont déjà déployées** : bugs corrigés, page /merci.html, carte OSM, catalogue matériel JA Solar / Solplanet / K2 mis à jour.

## Ta mission

Créer la section blog du site avec **deux articles fondateurs** qui :
1. Renforcent le SEO (titres avec mots-clés, balisage Schema.org Article + FAQ, maillage interne)
2. Informent honnêtement les prospects (urgence aides + risques batterie virtuelle)
3. Pointent vers des **sources de qualité** (organismes officiels, presse nationale, médiateur)
4. Génèrent des leads (CTA « étude gratuite » dans chaque article)

Durée : 3 heures. Aucune question au user. Toutes les données factuelles sont dans ce prompt.

## Workflow obligatoire

### Étape 0 — Initialisation (5 min)

1. TodoWrite avec 9 tâches : git pull, structure dossier blog, hub blog, article 1, article 2, navbar update, JSON-LD, validation, git push
2. **Synchroniser avec le remote GitHub** :
   ```bash
   git pull origin main --rebase
   ```
   Si le pull échoue (conflit, auth), diagnostique et résous. Ne continue PAS tant que le working tree n'est pas à jour avec le remote.
3. Backup local de sécurité (en plus de git) : `cp public_html/index.html public_html/index.html.backup-pre-blog`
4. Vérifier que git est propre avant de commencer : `git status` doit retourner « nothing to commit, working tree clean ».

### Étape 1 — Lecture contexte (10 min)

Lis dans cet ordre :
1. `WIREFRAMES-PAGES.md` — sections « 10. blog/index.html » et « 11. blog/[article].html »
2. `public_html/index.html` — pour reprendre le style CSS (variables, navbar, footer)
3. `public_html/merci.html` — bon exemple de page secondaire propre (référence visuelle)

Ne lis rien d'autre.

### Étape 2 — Structure de dossier (5 min)

Crée :
```
public_html/blog/
├── index.html                                    (hub)
├── 2026-05-aides-solaires-avant-1er-juillet.html (article 1)
└── 2026-05-batterie-virtuelle-attention-jpme.html (article 2)
```

### Étape 3 — Hub blog : `public_html/blog/index.html` (30 min)

Structure :
- DOCTYPE html5, `<html lang="fr">`
- `<head>` complet :
  - charset UTF-8, viewport responsive
  - `<title>Blog Blue Energie | Actualités photovoltaïque Haute-Savoie</title>`
  - `<meta name="description" content="Conseils, aides, actualités du solaire : tout savoir sur le photovoltaïque résidentiel en Haute-Savoie. Réforme des aides 2026, batteries virtuelles, rentabilité, retours d'expérience.">`
  - Open Graph (og:title, og:description, og:type=website, og:url=https://blueenergie.fr/blog/)
  - Google tag GA4 G-JEG722VJTV (reprendre depuis index.html)
  - CSS inline cohérent avec le reste du site (variables couleurs, font Segoe UI)
- `<body>` :
  - Navbar identique à index.html avec « Blog » highlighted
  - Header simple : H1 « Blog Blue Energie » + sous-titre « Conseils & actualités du photovoltaïque en Haute-Savoie »
  - Grille des articles (2 cartes pour l'instant) :
    - Carte 1 : image (placeholder ou photo générique solaire), date « Mai 2026 », badge « URGENT », titre « Aides solaires : la fin d'une époque — souscrivez avant le 1er juillet 2026 », extrait 2 lignes, lien « Lire l'article »
    - Carte 2 : image, date « Mai 2026 », badge « ALERTE », titre « Batteries virtuelles : promesses séduisantes, vraies déconvenues », extrait 2 lignes, lien « Lire l'article »
  - Bloc CTA en bas : « Vous avez un projet solaire ? » + bouton « Étude gratuite » → /#study-request
  - Footer identique au site (coordonnées + lien retour accueil)

Style des cartes : fond blanc, ombre légère, hover translateY(-5px), badge orange/rouge en haut à droite, padding généreux.

### Étape 4 — Article 1 : Aides solaires & urgence 1er juillet 2026 (60 min)

Fichier : `public_html/blog/2026-05-aides-solaires-avant-1er-juillet.html`

#### Structure HTML

- DOCTYPE html5, `<html lang="fr">`
- `<head>` :
  - `<title>Aides solaires : la fin d'une époque — Souscrivez avant le 1er juillet 2026 | Blue Energie</title>`
  - `<meta name="description" content="Le gouvernement supprime la prime à l'autoconsommation et divise par 4 le tarif de rachat du surplus à partir du 1er juillet 2026. Comment sécuriser vos aides avant l'échéance.">`
  - `<link rel="canonical" href="https://blueenergie.fr/blog/2026-05-aides-solaires-avant-1er-juillet.html">`
  - Open Graph complet (og:type=article, og:title, og:description, og:image, article:published_time, article:author)
  - JSON-LD Schema Article (voir ci-dessous)
  - JSON-LD Schema FAQPage (voir ci-dessous)
  - GA4 G-JEG722VJTV
  - CSS inline cohérent
- `<body>` :
  - Navbar avec « Blog » highlighted (lien retour vers /blog/)
  - Article structuré (largeur max 800px, centré, lecture confortable)
  - Footer identique site

#### Contenu rédactionnel (à reprendre TEL QUEL, juste habiller en HTML)

```
[BREADCRUMB]
Accueil > Blog > Aides solaires : la fin d'une époque

[H1]
Aides solaires : la fin d'une époque — Souscrivez avant le 1er juillet 2026

[META article]
Publié le 17 mai 2026 · 7 min de lecture · Catégorie : Aides & réglementation

[INTRO]
Le gouvernement vient de transmettre au Conseil supérieur de l'énergie un projet d'arrêté qui modifie en profondeur le soutien public au photovoltaïque résidentiel. À partir du 1er juillet 2026, trois changements drastiques entreront en vigueur : la suppression totale de la prime à l'autoconsommation, l'effondrement du tarif de rachat du surplus de 75 %, et la suspension du rachat pendant les prix négatifs du marché.

Pour les particuliers qui envisagent une installation, le message est clair : déposer un dossier de raccordement complet avant le 1er juillet 2026 permet de verrouiller les aides actuelles pour 20 ans. Au-delà, le calcul de rentabilité change radicalement.

[H2] Ce que change la réforme du 1er juillet 2026

[H3] 1. La prime à l'autoconsommation supprimée
Aujourd'hui, un particulier qui installe des panneaux solaires en autoconsommation reçoit une prime versée sur 5 ans. Au premier trimestre 2026, son montant est de 80 €/kWc, soit 480 € pour une installation de 6 kWc, 800 € pour 10 kWc. Cette prime disparaît purement et simplement après le 1er juillet.

[H3] 2. Le tarif de rachat du surplus divisé par presque 4
Le surplus de production solaire que vous ne consommez pas est aujourd'hui racheté par EDF Obligation d'Achat à 4 c€/kWh pour les installations jusqu'à 9 kWc (4,73 c€ entre 9 et 100 kWc). Le projet d'arrêté abaisse ce tarif à seulement 1,1 c€/kWh — soit une baisse de 75 %.

[H3] 3. Le rachat suspendu pendant les prix négatifs
Quand le marché de gros enregistre des prix négatifs (phénomène en forte augmentation depuis 2024), EDF ne rachètera plus le surplus solaire. Concrètement : votre production sera perdue à chaque épisode de surproduction nationale.

[H2] Pourquoi cette réforme ?

Le gouvernement justifie sa décision par deux arguments : le coût budgétaire du soutien au photovoltaïque (la prime et le rachat sont financés par la CSPE, taxe sur l'électricité), et la volonté d'orienter les particuliers vers une autoconsommation plus poussée (en clair : moins d'injection sur le réseau, plus de consommation directe ou via batterie).

L'effet attendu : un retour de l'attractivité des batteries de stockage, qui permettent de consommer le soir ce qui a été produit en journée — sans dépendre d'un tarif de rachat devenu marginal.

[H2] Qui est concerné ?

[BULLET]
- Tous les particuliers qui n'ont PAS encore déposé de demande complète de raccordement Enedis au 1er juillet 2026
- Les installations en projet ou en cours d'étude
- Les copropriétés et entreprises (≤ 100 kWc) qui n'ont pas finalisé leur dossier

[H2] Comment sécuriser les aides actuelles ?

La date qui compte n'est pas celle de la signature du devis, ni celle de la pose des panneaux : c'est la date de **demande complète de raccordement Enedis**.

Pour qu'un dossier soit considéré « complet », il doit comporter :
- Le mandat de raccordement signé
- L'attestation de propriété du logement
- L'étude de dimensionnement (avec puissance et configuration validées)
- Le formulaire de demande Enedis renseigné en intégralité
- Le justificatif de l'autorisation d'urbanisme (déclaration préalable accordée ou non-opposition)

Délai à prévoir entre la signature d'un devis et le dépôt de la demande Enedis : **3 à 5 semaines** en moyenne, selon le délai d'instruction de la déclaration préalable d'urbanisme par votre mairie.

Pour ceux qui veulent verrouiller les aides 2026, il faut donc signer un devis avant fin mai / début juin au plus tard.

[H2] L'impact concret sur la rentabilité d'un projet

Prenons l'exemple d'une installation type de 10 kWc en autoconsommation avec batterie 10 kWh, dans le Genevois (74) :

**Avant le 1er juillet 2026 :**
- Production estimée : 11 000 kWh/an
- Économies sur la facture (autoconsommation 70 %) : ~1 700 €/an
- Vente du surplus (30 %, à 4 c€/kWh) : ~130 €/an
- Prime à l'autoconsommation (800 € versés sur 5 ans) : ~160 €/an pendant 5 ans
- Revenu total année 1 à 5 : ~2 000 €/an
- Retour sur investissement : ~7 ans

**Après le 1er juillet 2026 :**
- Économies sur la facture : ~1 700 €/an (inchangé)
- Vente du surplus (à 1,1 c€/kWh) : ~36 €/an
- Plus de prime à l'autoconsommation
- Revenu total : ~1 740 €/an
- Retour sur investissement : ~8-9 ans

Soit **un manque à gagner cumulé de 1 200 à 1 800 €** sur les 5 premières années pour une installation comparable signée après le 1er juillet 2026.

[H2] Que recommandons-nous chez Blue Energie ?

Si vous étudiez sérieusement un projet solaire, ne tardez pas. Une étude technique gratuite vous permet en 48-72 h de savoir si votre projet est viable, et en cas de feu vert, nous démarrons immédiatement les démarches Enedis et urbanisme pour que votre dossier soit complet avant le 1er juillet.

Si vous hésitez encore, sachez que l'investissement reste rentable même sans les aides — l'autoconsommation directe représente l'essentiel des économies. Mais c'est 1 200 à 1 800 € qui sortent de votre poche si vous attendez.

[H2] Foire aux questions

[FAQ — à mettre en HTML <details> + JSON-LD FAQPage]

Q : J'ai déjà signé un devis, suis-je protégé ?
R : Pas tant que la demande de raccordement Enedis n'a pas été déposée et acceptée. Vérifiez avec votre installateur l'avancement du dossier.

Q : La réforme est-elle déjà votée ?
R : Le projet d'arrêté a été transmis au Conseil supérieur de l'énergie le 2 avril 2026. La publication au Journal officiel est attendue avant le 1er juillet 2026. Le calendrier peut bouger mais la tendance à la baisse est inéluctable (3 baisses consécutives depuis mars 2025).

Q : Faut-il se précipiter sur n'importe quel installateur ?
R : Non. Un installateur RGE QualiPV est obligatoire pour bénéficier des aides. Méfiez-vous des démarcheurs téléphoniques (interdits depuis 2020 dans le solaire) et des offres « gratuites ».

Q : La batterie devient-elle indispensable ?
R : Pas indispensable, mais beaucoup plus rentable avec la réforme. Plus le tarif de rachat baisse, plus stocker pour autoconsommer le soir devient intéressant. Voir notre article sur les batteries Solplanet à moins de 300 €/kWh.

Q : Et MaPrimeRénov' ?
R : MaPrimeRénov' ne concerne pas directement le photovoltaïque (sauf solaire thermique). Pour le photovoltaïque, c'est la prime à l'autoconsommation qui s'applique — et c'est elle qui disparaît.

[H2] Pour aller plus loin

[LIENS SORTANTS — sources de qualité, target="_blank" rel="noopener noreferrer nofollow"]
- Médiateur national de l'énergie : https://www.energie-mediateur.fr/
- Photovoltaïque.info (organisme officiel ADEME) : https://www.photovoltaique.info/
- Hellio — Arrêté tarifaire photovoltaïque 2026 : https://www.hellio.com/actualites/reglementation/arrete-tarifaire-photovoltaique
- L'Énergeek — Réforme du solaire résidentiel : https://lenergeek.com/2026/04/28/solaire-residentiel-risque-devenir-moins-interessant/

[CTA en fin d'article — encart orange visible]
"Votre projet doit être verrouillé avant le 1er juillet 2026"
[Bouton] Demander mon étude gratuite → /#study-request

[ARTICLES LIÉS]
- Batteries virtuelles : promesses séduisantes, vraies déconvenues → /blog/2026-05-batterie-virtuelle-attention-jpme.html
- Notre catalogue matériel → /#materiel
```

#### JSON-LD à insérer dans `<head>`

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Aides solaires : la fin d'une époque — Souscrivez avant le 1er juillet 2026",
  "description": "Le gouvernement supprime la prime à l'autoconsommation et divise par 4 le tarif de rachat du surplus à partir du 1er juillet 2026.",
  "datePublished": "2026-05-17",
  "dateModified": "2026-05-17",
  "author": {
    "@type": "Person",
    "name": "Neil Lothian",
    "url": "https://blueenergie.fr/"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Blue Energie",
    "url": "https://blueenergie.fr/"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://blueenergie.fr/blog/2026-05-aides-solaires-avant-1er-juillet.html"
  }
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {"@type": "Question", "name": "J'ai déjà signé un devis, suis-je protégé ?", "acceptedAnswer": {"@type": "Answer", "text": "Pas tant que la demande de raccordement Enedis n'a pas été déposée et acceptée. Vérifiez avec votre installateur l'avancement du dossier."}},
    {"@type": "Question", "name": "La réforme est-elle déjà votée ?", "acceptedAnswer": {"@type": "Answer", "text": "Le projet d'arrêté a été transmis au Conseil supérieur de l'énergie le 2 avril 2026. La publication au Journal officiel est attendue avant le 1er juillet 2026."}},
    {"@type": "Question", "name": "Faut-il se précipiter sur n'importe quel installateur ?", "acceptedAnswer": {"@type": "Answer", "text": "Non. Un installateur RGE QualiPV est obligatoire pour bénéficier des aides. Méfiez-vous des démarcheurs téléphoniques et des offres gratuites."}},
    {"@type": "Question", "name": "La batterie devient-elle indispensable ?", "acceptedAnswer": {"@type": "Answer", "text": "Pas indispensable, mais beaucoup plus rentable avec la réforme. Plus le tarif de rachat baisse, plus stocker pour autoconsommer le soir devient intéressant."}},
    {"@type": "Question", "name": "Et MaPrimeRénov' ?", "acceptedAnswer": {"@type": "Answer", "text": "MaPrimeRénov' ne concerne pas directement le photovoltaïque (sauf solaire thermique). Pour le photovoltaïque, c'est la prime à l'autoconsommation qui s'applique."}}
  ]
}
</script>
```

### Étape 5 — Article 2 : Batteries virtuelles & cas JPME (60 min)

Fichier : `public_html/blog/2026-05-batterie-virtuelle-attention-jpme.html`

Structure HTML identique au schéma de l'article 1 (navbar, footer, CSS inline, GA4, JSON-LD).

#### Meta tags

- `<title>Batteries virtuelles : promesses séduisantes, vraies déconvenues | Blue Energie</title>`
- `<meta name="description" content="Les offres de batterie virtuelle promettent de stocker votre surplus sans investir dans une vraie batterie. Mais le retrait d'autorisation de JPME en janvier 2026 montre les risques de ce modèle.">`
- `<link rel="canonical" href="https://blueenergie.fr/blog/2026-05-batterie-virtuelle-attention-jpme.html">`

#### Contenu rédactionnel (à reprendre TEL QUEL, juste habiller en HTML)

```
[BREADCRUMB]
Accueil > Blog > Batteries virtuelles : attention aux promesses

[H1]
Batteries virtuelles : promesses séduisantes, vraies déconvenues

[META]
Publié le 17 mai 2026 · 6 min de lecture · Catégorie : Conseil & vigilance

[INTRO]
La « batterie virtuelle » est un concept commercial séduisant : au lieu d'investir 3 000 à 6 000 € dans une vraie batterie physique pour stocker votre surplus solaire, vous le « stockez chez votre fournisseur » qui s'engage à vous restituer la même quantité d'électricité quand vous en avez besoin. Sur le papier, c'est miraculeux : zéro investissement matériel, autoconsommation maximisée, indépendance énergétique.

Dans les faits, le modèle est beaucoup plus fragile que ce que la communication commerciale laisse penser. Le retrait d'autorisation de la société JPME en janvier 2026, dénoncé pendant 18 mois par le médiateur national de l'énergie, vient le rappeler de manière éclatante.

[H2] Qu'est-ce qu'une batterie virtuelle, vraiment ?

Une batterie virtuelle n'est pas une batterie. C'est un **service commercial proposé par un fournisseur d'électricité**. Le mécanisme est le suivant :

1. Vos panneaux produisent plus d'électricité que vous n'en consommez à un moment donné
2. Ce surplus est injecté sur le réseau électrique national
3. Votre fournisseur de batterie virtuelle « crédite » votre compte d'un nombre de kWh
4. Plus tard, quand votre consommation dépasse votre production, vous pouvez « consommer » ces kWh stockés — sans payer la part énergie de votre facture pour cette quantité

Côté technique, **rien n'est physiquement stocké**. Votre surplus est simplement vendu au prix du marché par le fournisseur, et il s'engage à vous restituer la quantité équivalente plus tard.

[H2] Pourquoi c'est risqué : le cas JPME

JPME (filiale d'Actelios Solutions) était l'un des principaux acteurs de la batterie virtuelle en France, avec environ **4 760 producteurs solaires sous contrat**.

Le 15 janvier 2026, un arrêté du ministre de l'Économie publié au Journal officiel a **retiré à JPME l'autorisation de fournir de l'électricité**, avec effet au 22 janvier 2026.

Les griefs accumulés contre l'entreprise depuis 2024 :
- **Pratiques commerciales trompeuses** (l'État utilise ce terme dans son enquête)
- **Affichage de prix mensonger**
- **Retards de paiement des producteurs solaires**

Le médiateur national de l'énergie avait sonné l'alarme dès septembre 2024 et formellement demandé le retrait d'autorisation en novembre 2024. Le recours juridique déposé par JPME a été rejeté.

Conséquence immédiate pour les clients : leur contrat de fourniture bascule vers EDF (fournisseur de secours sur 95 % du territoire). Mais pour le rachat de leur production, environ 4 760 producteurs doivent désormais **trouver eux-mêmes un nouvel acheteur** sur le marché. Beaucoup ont en outre des factures impayées par JPME qui s'accumulent depuis des mois.

[H2] Les vraies limites des batteries virtuelles (au-delà du cas JPME)

Même avec un fournisseur sérieux, le modèle pose plusieurs questions structurelles :

[H3] 1. Vous dépendez de la solvabilité d'une entreprise privée
Une vraie batterie chez vous est votre propriété, garantie 10 ans par le fabricant. Une batterie virtuelle est un crédit en kWh stocké chez un fournisseur qui peut faire faillite, perdre son autorisation, ou changer ses CGV.

[H3] 2. La part énergie représente seulement 35 à 40 % de votre facture
Quand vous « consommez » vos kWh virtuels, vous ne payez que la part énergie. Le reste de la facture (acheminement TURPE, taxes CSPE, contribution tarifaire d'acheminement, TVA) continue de s'appliquer normalement. L'économie réelle est donc bien inférieure à ce que laisse penser une équivalence « 1 kWh produit = 1 kWh gratuit consommé ».

[H3] 3. Les contrats imposent souvent des abonnements majorés
Pour bénéficier de la batterie virtuelle, vous devez généralement souscrire l'offre d'électricité du même fournisseur, avec un abonnement plus cher que le marché. Sur l'année, ce surcoût peut grignoter une partie significative des économies promises.

[H3] 4. Des conditions de restitution restrictives
Plafonds de stockage, durée de validité des kWh stockés, frais cachés sur dépassement, restrictions saisonnières — les conditions générales sont souvent défavorables et opaques.

[H2] Vraie batterie ou batterie virtuelle : comment trancher ?

Une vraie batterie physique (type Solplanet G3, BYD, Pylontech…) représente un investissement initial de 2 500 à 4 000 € pour 10 kWh installés. Garantie 10 ans, propriété pleine, fonctionne même en cas de coupure réseau (mode backup).

Une batterie virtuelle représente 0 € d'investissement mais des engagements contractuels sur plusieurs années avec un acteur privé dont la viabilité économique peut évoluer.

Notre conviction chez Blue Energie : **la vraie batterie est plus prudente sur le long terme** — surtout depuis que les prix au kWh installé sont devenus très compétitifs (moins de 300 €/kWh à partir de 10 kWh chez Solplanet par exemple). Vous restez propriétaire de votre matériel, indépendant des aléas commerciaux, et vous bénéficiez de la fonction backup en cas de coupure réseau.

[H2] Que faire si vous êtes déjà client d'une batterie virtuelle ?

Si vous êtes chez JPME : votre contrat fourniture a basculé vers EDF automatiquement. Pour le rachat de votre production, contactez EDF OA (Obligation d'Achat) ou un autre acheteur (Engie, TotalEnergies, etc.). Le médiateur national de l'énergie a mis en ligne une page d'information dédiée.

Si vous êtes chez un autre fournisseur de batterie virtuelle : lisez attentivement vos CGV, suivez les actualités du fournisseur (santé financière, démêlés réglementaires), et envisagez une bascule vers une vraie batterie si les conditions deviennent défavorables.

[H2] Foire aux questions

[FAQ — HTML <details> + JSON-LD FAQPage]

Q : Toutes les batteries virtuelles sont-elles à fuir ?
R : Non. Certains fournisseurs sérieux proposent des offres correctes. Mais le modèle économique reste structurellement fragile, et le cas JPME montre que même un acteur installé peut chuter brutalement.

Q : Quelle est la différence avec un contrat EDF OA classique ?
R : Avec EDF OA, vous vendez votre surplus à prix fixe (4 c€/kWh aujourd'hui, 1,1 c€/kWh après réforme), sans engagement de restitution. Avec une batterie virtuelle, vous « stockez » sans vendre, mais vous payez l'abonnement majoré.

Q : Et si je n'ai pas envie d'investir dans une vraie batterie ?
R : Vous pouvez très bien faire du solaire pur autoconsommation + vente du surplus EDF OA. Avec une bonne adéquation entre production et consommation diurne (chauffe-eau, lave-linge, voiture électrique pendant la journée), vous pouvez atteindre 60-70 % d'autoconsommation directe sans batterie.

Q : Combien coûte une vraie batterie en 2026 ?
R : Comptez 1 700 € pour 5 kWh installés (premier pack), puis ~1 300 € par module supplémentaire de 5 kWh. À partir de 10 kWh, vous passez sous 300 €/kWh installé, ce qui est très compétitif sur le marché.

[H2] Pour aller plus loin

[LIENS SORTANTS — sources de qualité]
- Médiateur national de l'énergie — Retrait d'autorisation JPME : https://www.energie-mediateur.fr/jpme-retrait-dautorisation-de-fourniture/
- Énergie-Info — Je suis client JPME, que faire ? : https://www.energie-info.fr/je-suis-client-de-jpme-que-faire/
- UFC-Que Choisir — Enquête sur JPME : https://www.quechoisir.org/actualite-rachat-d-electricite-solaire-le-ciel-s-assombrit-pour-jpme-et-ses-centaines-de-factures-encore-impayees-n167720/
- Tecsol Quotidien — JPME et l'avenir de la batterie virtuelle : https://tecsol-quotidien.fr/jpme-qui-sest-vu-retirer-lautorisation-ministerielle-du-fournisseur-delectricite-depose-un-refere/

[CTA en fin d'article]
"Vous hésitez entre vraie batterie et batterie virtuelle ?"
"On vous accompagne dans le choix le plus prudent et le plus rentable pour votre projet."
[Bouton] Demander une étude gratuite → /#study-request

[ARTICLES LIÉS]
- Aides solaires : souscrivez avant le 1er juillet 2026 → /blog/2026-05-aides-solaires-avant-1er-juillet.html
- Notre catalogue matériel (batterie Solplanet < 300 €/kWh) → /#materiel
```

#### JSON-LD identique à l'article 1 (adapté avec les nouvelles meta) + FAQPage propre à cet article.

### Étape 6 — Ajouter « Blog » dans la navbar de index.html (15 min)

Dans `public_html/index.html`, modifier le `<ul>` de la navbar pour ajouter un lien « Blog » :

```html
<li><a href="/blog/">Blog</a></li>
```

À insérer **entre** le lien « Réalisations » et le lien « Contact ». Vérifier que le lien fonctionne en relatif (depuis n'importe quelle page).

Faire pareil dans `public_html/merci.html` (navbar simplifiée — ajouter aussi le lien Blog si pertinent).

### Étape 7 — Validation finale (15 min)

1. **Vérifier la structure** :
   ```bash
   ls -la public_html/blog/
   ```
   Doit afficher : `index.html`, `2026-05-aides-solaires-avant-1er-juillet.html`, `2026-05-batterie-virtuelle-attention-jpme.html`

2. **Vérifier les liens internes** :
   ```bash
   grep -n "/blog/" public_html/index.html
   grep -n "/blog/" public_html/merci.html
   grep -n "study-request" public_html/blog/*.html
   ```

3. **Vérifier les liens sortants nofollow** :
   ```bash
   grep -n "noopener noreferrer" public_html/blog/*.html | head -20
   ```
   Tous les liens externes doivent avoir `target="_blank" rel="noopener noreferrer nofollow"`.

4. **Validation HTML W3C** des 3 nouvelles pages :
   ```bash
   for f in public_html/blog/index.html public_html/blog/2026-05-aides-solaires-avant-1er-juillet.html public_html/blog/2026-05-batterie-virtuelle-attention-jpme.html; do
     echo "=== $f ==="
     curl -s -H "Content-Type: text/html; charset=utf-8" --data-binary @"$f" "https://validator.w3.org/nu/?out=json" | head -50
   done
   ```

5. **Validation Schema.org** : copier l'URL prod future dans https://validator.schema.org (à faire après upload par Neil)

6. **Commit + push GitHub** (git est déjà init avec remote `origin` vers `github.com/neillothian/blueenergie.fr`) :
   ```bash
   git add -A
   git commit -m "Session blog: hub + 2 articles SEO (aides 2026 + batteries virtuelles JPME)"
   git push origin main
   ```
   Si le `git push` échoue pour cause d'auth :
   - Vérifie `git remote -v` (doit pointer vers https://github.com/neillothian/blueenergie.fr.git)
   - Tente une seule fois — si l'auth interactive est requise, n'essaie pas d'inventer un token, signale juste dans le rapport « push manuel requis par Neil »
   - Le commit local reste valide dans les deux cas (Neil pourra push manuellement depuis son terminal après coup)

## Décisions déjà prises (ne demande RIEN)

| Sujet | Décision |
|---|---|
| URLs articles | Format `YYYY-MM-titre-slug.html` (SEO-friendly, dates parlantes) |
| Ton éditorial | Informatif, factuel, légèrement militant côté défense client (anti-arnaques) |
| Liens sortants | `target="_blank" rel="noopener noreferrer nofollow"` (nofollow car ce ne sont pas des recommandations partenaires) |
| Sources autorisées | Médiateur national, énergie-info, UFC-Que Choisir, Tecsol, Hellio, L'Énergeek, photovoltaique.info |
| Sources interdites | Ouest-France (paywall), pas de site partenaire Blue Energie |
| Images articles | Pas d'images pour l'instant (placeholders CSS dans les cartes du hub), Neil fournira plus tard |
| Auteur affiché | « Neil Lothian » (extrait de fiche-client REGHEM) |
| Date publication | 2026-05-17 (date du jour côté serveur) |
| Categories | Pas de système de catégories pour l'instant (juste 2 articles, on n'a pas besoin) |
| Commentaires | Pas de commentaires (pas pour démarrer) |
| Newsletter | Pas pour l'instant (futur chantier) |
| Git workflow | Pull au début, commit + push à la fin sur `origin/main` (GitHub : neillothian/blueenergie.fr). Si auth interactive requise, commit local valide + signaler dans rapport |

## Interdictions strictes

- ❌ Ne touche PAS à l'article 1 et 2 contenu (rédigé tel quel par Neil, à habiller en HTML uniquement)
- ❌ N'invente AUCUN chiffre ou date supplémentaire au-delà de ce qui est dans ce prompt
- ❌ Ne cite PAS d'études ou rapports non listés dans les sources autorisées
- ❌ N'ajoute PAS d'images JPG/PNG (placeholders CSS suffisent)
- ❌ Ne mets PAS de témoignages clients fictifs
- ❌ Ne touche PAS au reste du site (sections matériel, réalisations, formulaire, contact)
- ❌ Ne refactore PAS le CSS existant (Session 7-8)
- ❌ N'ajoute PAS hCaptcha / Schema.org Organization / sitemap (sessions ultérieures)
- ❌ Ne pose AUCUNE question au user

## En cas de blocage

1. Diagnostique
2. Tente 2 solutions
3. Si toujours bloqué sur UNE tâche, passe à la suivante et liste dans le rapport
4. NE STOPPE PAS pour poser une question

## Tone et style code

- Pas de blabla, pas de « bien sûr »
- Pas d'emoji dans le code (uniquement dans le rapport final si utile)
- Travail silencieux, rapport à la fin

## Format du rapport final

```markdown
# Session Blog — Terminé

## Fichiers créés
- public_html/blog/index.html (hub, X lignes)
- public_html/blog/2026-05-aides-solaires-avant-1er-juillet.html (article 1, X lignes)
- public_html/blog/2026-05-batterie-virtuelle-attention-jpme.html (article 2, X lignes)
- public_html/index.html.backup-pre-blog (sauvegarde)

## Modifications appliquées
- [x] Hub blog avec 2 cartes articles
- [x] Article 1 : 7 sections, 5 FAQ, 4 liens sortants, JSON-LD Article + FAQPage
- [x] Article 2 : 7 sections, 4 FAQ, 4 liens sortants, JSON-LD Article + FAQPage
- [x] Navbar index.html : lien « Blog » ajouté
- [x] Navbar merci.html : lien « Blog » ajouté

## Vérifications
- ls public_html/blog/ : 3 fichiers présents
- grep liens internes /#study-request : N occurrences dans les articles
- grep "nofollow" : tous les liens externes balisés correctement
- Validation W3C hub : X erreurs / X warnings
- Validation W3C article 1 : X erreurs / X warnings
- Validation W3C article 2 : X erreurs / X warnings
- Git pull initial : OK / KO
- Git commit local : OK
- Git push vers GitHub origin/main : OK / manuel requis (préciser pourquoi)

## À faire côté toi (Neil)
1. Téléverser sur Hostinger via hPanel ou FTP :
   - public_html/index.html (mis à jour avec lien Blog navbar)
   - public_html/merci.html (mis à jour avec lien Blog navbar)
   - public_html/blog/ (dossier complet)
2. Vider le cache Hostinger
3. Tester :
   - https://blueenergie.fr/blog/ → hub doit s'afficher avec 2 cartes
   - Clic sur chaque carte → article entier
   - Vérifier que le CTA "Étude gratuite" en fin d'article scrolle bien vers le formulaire
   - Test Schema.org : copier l'URL d'un article dans https://validator.schema.org
4. Soumettre les nouvelles URLs à Google Search Console pour indexation accélérée

## Prochaines sessions disponibles
- Session 4 : mentions légales (besoin RGE confirmé)
- Session 5 : bandeau cookies tarteaucitron
- Session 14 : JSON-LD Organization global + sitemap.xml + robots.txt (recommandé après création blog)
- Session 17 : intégration avis Google (besoin Place ID)
- Session 18 : bandeau confiance RGE + décennale

## Blocages éventuels
(vide si tout OK, sinon détailler)
```

## === FIN PROMPT ===

---

## Notes hors prompt (pour Neil)

**Important — vérifications avant publication** :
- Les **chiffres** de l'article 1 (80 €/kWc, 4 c€/kWh, 1,1 c€/kWh, dates) sont issus de sources publiques de mai 2026. Vérifie qu'ils correspondent toujours à la situation au moment de la publication — la réglementation bouge vite.
- L'exemple chiffré de rentabilité (10 kWc avec/sans aides) est une projection raisonnable, pas un engagement contractuel. Le client REGHEM est un cas réel mais chaque projet est différent.
- Le ton de l'article 2 est volontairement direct sur JPME — les faits sont publics et documentés par le médiateur national, donc pas de risque diffamation. Mais ne pas étendre l'accusation à d'autres fournisseurs nommément cités.

**Après publication** :
- Soumets les 3 nouvelles URLs à Google Search Console (Indexation > Inspection d'URL > Demander une indexation)
- Partage les articles sur LinkedIn / réseaux pros (chaque article = 1 post)
- Idéalement : trouver 2-3 sites partenaires (annuaires solaires, sites locaux 74) qui peuvent linker tes articles → boost SEO

**Prochaine session recommandée** : Session 14 (JSON-LD Organization global + sitemap.xml + robots.txt) pour que Google indexe ton blog rapidement et bien.
