# Prompt Session 4 — pour Claude Code

> **Création des 3 pages légales obligatoires : mentions légales, CGV, politique de confidentialité.**
> Périmètre strict : 3 fichiers HTML + mise à jour du footer sur 5 pages existantes.
> Durée estimée : 1 h 30. Le dev travaille seul, sans poser de questions. Toutes les données factuelles sont dans ce prompt.

---

## Mode d'emploi (côté Neil)

1. Ouvre un terminal
2. `cd "/Users/neillothian/Documents/Claude/Projects/blueenergie.fr"`
3. Lance Claude Code : `claude`
4. Copie-colle tout ce qui est entre `=== DÉBUT PROMPT ===` et `=== FIN PROMPT ===`
5. Laisse tourner ~1 h 30. Rapport final à la fin.

---

## === DÉBUT PROMPT ===

Tu es développeur web senior spécialisé en conformité légale (LCEN, RGPD, Code de la consommation). Tu travailles sur **blueenergie.fr** (installation photovoltaïque résidentielle en Haute-Savoie). Stack : HTML/CSS/JS pur. Hébergement Hostinger.

Les **Sessions 1+2+3+6 et la Session Blog sont déjà déployées** : bugs corrigés, page /merci.html, carte OSM, catalogue matériel JA Solar / Solplanet / K2, hub blog + 2 articles.

## Ta mission

Créer **3 pages légales** conformes aux obligations françaises 2026 (LCEN art. 6, RGPD, Code de la conso B2C art. L221-1 et suivants) :

1. `public_html/mentions-legales.html`
2. `public_html/cgv.html`
3. `public_html/politique-confidentialite.html`

Puis mettre à jour le **footer de 5 pages existantes** pour pointer vers ces nouvelles pages :
- `public_html/index.html`
- `public_html/merci.html`
- `public_html/blog/index.html`
- `public_html/blog/2026-05-aides-solaires-avant-1er-juillet.html`
- `public_html/blog/2026-05-batterie-virtuelle-attention-jpme.html`

Durée : 1 h 30. Aucune question au user. Toutes les données factuelles sont dans ce prompt.

## Workflow obligatoire

### Étape 0 — Initialisation (5 min)

1. TodoWrite avec 8 tâches : git pull, backup, mentions légales, CGV, politique conf, footer index+merci, footer blog (3 pages), validation + git push
2. **Synchroniser avec le remote GitHub** :
   ```bash
   git pull origin main --rebase
   ```
   Si le pull échoue (conflit, auth), diagnostique et résous. Ne continue PAS tant que le working tree n'est pas à jour avec le remote.
3. Backup local de sécurité : `cp public_html/index.html public_html/index.html.backup-pre-session4`
4. Vérifier que git est propre avant de commencer : `git status` doit retourner « nothing to commit, working tree clean ».

### Étape 1 — Lecture contexte (10 min)

Lis dans cet ordre :
1. `public_html/index.html` — repérer le bloc `<style>` (variables couleurs, font), la navbar, le footer actuel
2. `public_html/merci.html` — référence visuelle de page secondaire propre
3. `public_html/blog/index.html` — pour confirmer la structure de navbar et footer utilisée sur les pages secondaires

Ne lis rien d'autre.

### Étape 2 — Page 1 : `public_html/mentions-legales.html` (25 min)

Structure HTML standard d'une page secondaire (cf. `merci.html` et `blog/index.html`) :
- DOCTYPE html5, `<html lang="fr">`
- `<head>` :
  - charset UTF-8, viewport responsive
  - `<title>Mentions légales | Blue Energie</title>`
  - `<meta name="description" content="Mentions légales de Blue Energie (SAS) — installateur photovoltaïque RGE QualiPV en Haute-Savoie. SIRET, hébergeur, conditions d'utilisation du site.">`
  - `<meta name="robots" content="index, follow">`
  - `<link rel="canonical" href="https://blueenergie.fr/mentions-legales.html">`
  - Google tag GA4 G-JEG722VJTV (reprendre depuis index.html)
  - CSS inline cohérent avec le reste du site (variables couleurs, font Segoe UI). Tu peux reprendre le bloc CSS de `merci.html` ou `blog/index.html` et l'adapter.
- `<body>` :
  - Navbar identique à celle de `blog/index.html` (sans surlignage particulier pour cette page)
  - `<main>` avec largeur max 800px, padding généreux, lecture confortable
  - Footer identique aux autres pages secondaires, **avec les 3 liens légaux** (cf. Étape 5)

Contenu rédactionnel (à reprendre TEL QUEL, juste habiller en HTML) :

```
[H1] Mentions légales

[INTRO]
Le présent site https://blueenergie.fr est édité par la société Blue Energie. Les présentes mentions légales sont conformes à l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN).

[H2] Éditeur du site

Raison sociale : Blue Energie
Forme juridique : Société par actions simplifiée (SAS)
Capital social : 18 000 €
Siège social : 11 Chemin de Perouza, 74520 Savigny, France
SIREN : 882 483 274
SIRET : 882 483 274 00010
RCS : Annecy
Numéro de TVA intracommunautaire : FR25882483274
Représentant légal : Neil Lothian, Président
Téléphone : 07 61 50 43 85
Email : neil.lothian@blueenergie.fr

[H2] Directeur de la publication

Neil Lothian, en qualité de Président de la SAS Blue Energie.

[H2] Hébergeur du site

Hostinger International Ltd
61 Lordou Vironos Street
6023 Larnaca, Chypre
Site web : https://www.hostinger.fr

[H2] Activité professionnelle réglementée

Blue Energie exerce l'activité d'installation d'équipements photovoltaïques résidentiels et de stockage d'énergie.

Qualification RGE : Blue Energie est titulaire de la qualification RGE QualiPV délivrée par l'organisme Qualit'EnR. Le numéro de qualification peut être communiqué sur simple demande à neil.lothian@blueenergie.fr — il est notamment nécessaire pour permettre à nos clients de bénéficier des aides publiques liées à la transition énergétique (prime à l'autoconsommation, MaPrimeRénov', éco-PTZ).

Assurance responsabilité civile professionnelle et garantie décennale : conformément à l'article L.241-1 du Code des assurances, Blue Energie a souscrit une assurance couvrant sa responsabilité civile professionnelle et sa garantie décennale. Les coordonnées de l'assureur peuvent être communiquées sur simple demande écrite.

[H2] Propriété intellectuelle

L'ensemble des éléments du site (textes, images, graphismes, logo, icônes, sons, logiciels) est la propriété exclusive de Blue Energie ou de ses partenaires, et est protégé par les lois françaises et internationales relatives à la propriété intellectuelle.

Toute reproduction, représentation, modification, publication, adaptation ou exploitation, totale ou partielle, des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans autorisation écrite préalable de Blue Energie.

Les marques citées sur le site (JA Solar, Solplanet, K2 Systems, Tigo, Qualit'EnR, etc.) sont la propriété de leurs détenteurs respectifs.

[H2] Liens hypertextes

Le site https://blueenergie.fr peut contenir des liens hypertextes vers d'autres sites internet. Blue Energie n'exerce aucun contrôle sur le contenu de ces sites tiers et ne saurait être tenue responsable de leur contenu ou de leur disponibilité.

[H2] Données personnelles et cookies

Le traitement des données personnelles collectées via ce site est décrit dans notre Politique de confidentialité, accessible à l'adresse https://blueenergie.fr/politique-confidentialite.html.

[H2] Crédits

Conception et développement : Blue Energie.
Cartographie : OpenStreetMap (© OpenStreetMap contributors, sous licence ODbL).
Analyse d'audience : Google Analytics 4.
Service de transmission du formulaire de contact : Web3Forms.

[H2] Droit applicable et juridiction compétente

Les présentes mentions légales sont régies par le droit français. En cas de litige relatif à l'utilisation du site, et après échec d'une résolution amiable, les tribunaux français seront seuls compétents.

[H2] Mise à jour

Les présentes mentions légales ont été mises à jour le 17 mai 2026. Blue Energie se réserve le droit de les modifier à tout moment, sans préavis.
```

### Étape 3 — Page 2 : `public_html/cgv.html` (35 min)

Structure HTML identique au schéma de la page mentions légales (navbar, footer, CSS inline, GA4).

`<head>` :
- `<title>Conditions Générales de Vente | Blue Energie</title>`
- `<meta name="description" content="Conditions générales de vente (CGV) applicables aux prestations d'installation photovoltaïque réalisées par Blue Energie auprès des particuliers. Délai de rétractation, garanties, paiement, médiation.">`
- `<meta name="robots" content="index, follow">`
- `<link rel="canonical" href="https://blueenergie.fr/cgv.html">`

Contenu rédactionnel (à reprendre TEL QUEL, juste habiller en HTML) :

```
[H1] Conditions Générales de Vente

[META] Version applicable au 17 mai 2026

[H2] Article 1 — Objet et champ d'application

Les présentes Conditions Générales de Vente (ci-après « CGV ») régissent les relations contractuelles entre la société Blue Energie, Société par actions simplifiée au capital de 18 000 €, immatriculée au RCS d'Annecy sous le numéro 882 483 274, dont le siège social est situé 11 Chemin de Perouza, 74520 Savigny (ci-après « Blue Energie » ou « le Prestataire ») et toute personne physique non commerçante (ci-après « le Client ») commandant une prestation d'installation photovoltaïque ou de stockage d'énergie.

Les présentes CGV s'appliquent à toute commande passée par un Client à Blue Energie, à l'exclusion de toutes autres conditions. Le fait pour le Client de signer un devis ou un bon de commande emporte acceptation pleine et entière des présentes CGV.

Les présentes CGV sont fournies au Client au plus tard au moment de la signature du devis. Elles peuvent être modifiées à tout moment par Blue Energie ; la version applicable est celle en vigueur à la date de signature du devis.

[H2] Article 2 — Devis et formation du contrat

Tout projet d'installation fait l'objet d'une étude personnalisée et d'un devis détaillé, gratuit et sans engagement, valable 30 jours à compter de sa date d'émission.

Le devis précise notamment :
- La désignation et les caractéristiques techniques du matériel (modules, onduleur, batterie le cas échéant, structure)
- La puissance crête installée (en kWc)
- Le prix unitaire et le prix total HT et TTC
- Le taux de TVA applicable (10 % pour les installations ≤ 3 kWc en résidence principale, 20 % au-delà — selon réglementation en vigueur)
- Le délai d'exécution
- Les conditions de paiement
- Les aides publiques estimées (à titre indicatif)

Le contrat est formé à la date à laquelle le Client retourne à Blue Energie le devis daté et signé, accompagné de l'acompte mentionné à l'article 4.

[H2] Article 3 — Droit de rétractation

Conformément aux articles L.221-18 et suivants du Code de la consommation, lorsque le contrat est conclu hors établissement (au domicile du Client) ou à distance, le Client dispose d'un délai de **14 jours calendaires** à compter de la signature du devis pour exercer son droit de rétractation, sans avoir à motiver sa décision ni à supporter d'autres coûts que ceux prévus par la loi.

Pour exercer ce droit, le Client adresse à Blue Energie, avant l'expiration du délai, une déclaration sans ambiguïté exprimant sa volonté de se rétracter. Il peut utiliser le formulaire-type de rétractation mis à sa disposition sur demande à neil.lothian@blueenergie.fr, ou toute autre déclaration dénuée d'ambiguïté (lettre, email).

En cas d'exercice du droit de rétractation, Blue Energie rembourse au Client la totalité des sommes versées, dans un délai maximum de 14 jours à compter de la date à laquelle elle est informée de la décision de rétractation.

**Demande d'exécution anticipée** : si le Client souhaite que les prestations soient exécutées avant la fin du délai de rétractation, il doit en faire la demande expresse et par écrit. Dans ce cas, en cas d'exercice du droit de rétractation après le début d'exécution, le Client devra payer un montant proportionnel à ce qui a été fourni.

[H2] Article 4 — Conditions de paiement

Le prix de la prestation est payable selon l'échéancier suivant :
- Acompte de 30 % à la signature du devis (encaissable uniquement à l'issue du délai de rétractation, sauf demande expresse du Client)
- Solde de 70 % au plus tard à la fin des travaux, après réception et signature du procès-verbal de réception

Les paiements sont effectués par virement bancaire ou par chèque à l'ordre de Blue Energie.

En cas de retard de paiement, et conformément à l'article L.441-10 du Code de commerce, des pénalités de retard seront appliquées au taux légal en vigueur, ainsi qu'une indemnité forfaitaire pour frais de recouvrement.

[H2] Article 5 — Délais d'exécution

Le délai d'exécution est précisé dans le devis. Il court à compter de la date de réalisation des conditions suivantes :
- Encaissement de l'acompte
- Obtention de l'autorisation d'urbanisme (déclaration préalable accordée ou tacitement acquise)
- Acceptation de la convention de raccordement par Enedis

Blue Energie s'engage à informer le Client de l'avancement des démarches administratives et à respecter les délais annoncés sauf cas de force majeure ou de cause indépendante de sa volonté (intempéries, défaillance d'un fournisseur, retards Enedis, etc.).

[H2] Article 6 — Réception des travaux

À l'achèvement des travaux, un procès-verbal de réception est établi contradictoirement entre Blue Energie et le Client. La réception peut être prononcée avec ou sans réserves. En cas de réserves, Blue Energie s'engage à lever les réserves dans un délai raisonnable.

La mise en service de l'installation est soumise à la validation de l'attestation de conformité électrique (Consuel) et à la mise en service du compteur de production par Enedis.

[H2] Article 7 — Garanties

L'installation et le matériel posés par Blue Energie bénéficient des garanties suivantes :

**Garantie légale de conformité** (articles L.217-3 et suivants du Code de la consommation) : le Client dispose d'un délai de 2 ans à compter de la délivrance du bien pour agir.

**Garantie légale des vices cachés** (articles 1641 et suivants du Code civil) : le Client dispose d'un délai de 2 ans à compter de la découverte du vice pour agir.

**Garantie décennale** (article 1792 du Code civil) : Blue Energie a souscrit une assurance couvrant sa garantie décennale pour les dommages compromettant la solidité de l'ouvrage ou le rendant impropre à sa destination. Cette garantie est de 10 ans à compter de la réception des travaux.

**Garanties commerciales constructeurs** : les équipements installés (modules photovoltaïques, onduleur, batterie, structure) bénéficient des garanties constructeur, transmises au Client à la livraison. Les durées et conditions de ces garanties varient selon les marques et sont précisées sur les fiches techniques fournies.

[H2] Article 8 — Responsabilité

Blue Energie s'engage à exécuter ses prestations dans le respect des règles de l'art et des normes en vigueur (norme NF C 15-100, guide UTE C 15-712 pour le photovoltaïque, etc.).

La responsabilité de Blue Energie ne saurait être engagée en cas de :
- Mauvaise utilisation de l'installation par le Client ou par un tiers
- Intervention sur l'installation par un tiers non autorisé par Blue Energie
- Cas de force majeure (intempéries exceptionnelles, événements politiques, sanitaires, etc.)
- Défaut imputable à un sous-traitant désigné par le Client
- Inadéquation de l'installation existante (charpente, tableau électrique) avec les recommandations de Blue Energie lorsque le Client a refusé les travaux complémentaires préconisés

[H2] Article 9 — Aides publiques

Blue Energie informe le Client, à titre indicatif et selon la réglementation en vigueur au jour du devis, des aides publiques mobilisables (prime à l'autoconsommation, tarif de rachat du surplus, TVA réduite à 10 %, etc.).

L'attribution effective de ces aides relève des organismes compétents (EDF Obligation d'Achat, Direction Générale des Finances Publiques, etc.) et reste soumise aux conditions d'éligibilité du Client et aux évolutions réglementaires intervenant entre la signature du devis et la mise en service.

Blue Energie ne peut être tenue responsable d'un éventuel refus, d'une réduction ou d'un changement des aides publiques entre la date de signature et la date de versement effectif.

[H2] Article 10 — Réclamations et médiation de la consommation

En cas de litige, le Client est invité à contacter en premier lieu Blue Energie par écrit à l'adresse neil.lothian@blueenergie.fr ou par courrier au siège social, en exposant les faits et en formulant ses demandes.

Conformément aux articles L.616-1 et R.616-1 du Code de la consommation, le Client a la possibilité, après échec d'une démarche amiable, de recourir gratuitement à un médiateur de la consommation en vue d'une résolution amiable du litige.

Le Client peut également déposer une réclamation via la plateforme européenne de règlement en ligne des litiges (RLL) : https://ec.europa.eu/consumers/odr/

[H2] Article 11 — Protection des données personnelles

Le traitement des données personnelles du Client est décrit dans la Politique de confidentialité accessible à l'adresse https://blueenergie.fr/politique-confidentialite.html.

[H2] Article 12 — Droit applicable et juridiction compétente

Les présentes CGV sont soumises au droit français. En cas de litige et après échec d'une résolution amiable ou d'une médiation, les tribunaux français seront seuls compétents.
```

### Étape 4 — Page 3 : `public_html/politique-confidentialite.html` (25 min)

Structure HTML identique aux deux pages précédentes.

`<head>` :
- `<title>Politique de confidentialité | Blue Energie</title>`
- `<meta name="description" content="Politique de confidentialité Blue Energie : traitement des données personnelles, base légale, durée de conservation, droits RGPD, cookies analytics.">`
- `<meta name="robots" content="index, follow">`
- `<link rel="canonical" href="https://blueenergie.fr/politique-confidentialite.html">`

Contenu rédactionnel (à reprendre TEL QUEL, juste habiller en HTML) :

```
[H1] Politique de confidentialité

[META] Version applicable au 17 mai 2026

[INTRO]
La présente Politique de confidentialité a pour objet d'informer les utilisateurs du site https://blueenergie.fr sur la manière dont leurs données personnelles sont collectées, utilisées, conservées et protégées par la société Blue Energie, conformément au Règlement (UE) 2016/679 du 27 avril 2016 (« RGPD ») et à la loi française n° 78-17 du 6 janvier 1978 modifiée dite « Informatique et Libertés ».

[H2] 1. Responsable du traitement

Le responsable du traitement des données personnelles collectées sur le site est :

Blue Energie (SAS)
11 Chemin de Perouza, 74520 Savigny
Représentée par Neil Lothian, Président
Email : neil.lothian@blueenergie.fr
Téléphone : 07 61 50 43 85

La société Blue Energie n'a pas l'obligation de désigner un Délégué à la protection des données (DPO) au sens de l'article 37 du RGPD. Toute question relative au traitement de vos données peut être adressée à l'email ci-dessus.

[H2] 2. Données collectées

Les données personnelles suivantes sont susceptibles d'être collectées lorsque l'utilisateur remplit le formulaire de contact ou de demande d'étude :

- Identité : nom, prénom
- Coordonnées : adresse email, numéro de téléphone
- Adresse postale du projet (commune, code postal)
- Informations relatives au projet : type de logement, surface, consommation électrique annuelle, équipements, message libre
- Données techniques de navigation collectées par l'outil d'analyse d'audience : adresse IP (anonymisée), navigateur, système d'exploitation, pages visitées, durée de visite, source de trafic

[H2] 3. Finalités et bases légales du traitement

Vos données sont collectées pour les finalités suivantes :

| Finalité | Base légale |
|---|---|
| Répondre à votre demande d'étude ou de devis | Mesures précontractuelles à votre demande (RGPD art. 6.1.b) |
| Vous adresser des informations commerciales relatives à nos services | Intérêt légitime (RGPD art. 6.1.f) — vous pouvez vous y opposer à tout moment |
| Mesurer l'audience du site et améliorer son fonctionnement | Consentement préalable (RGPD art. 6.1.a) recueilli via bandeau cookies |
| Respecter nos obligations légales et comptables | Obligation légale (RGPD art. 6.1.c) |

[H2] 4. Destinataires des données

Vos données sont destinées exclusivement à Blue Energie et à ses collaborateurs habilités. Elles peuvent être communiquées aux sous-traitants suivants, agissant pour le compte de Blue Energie et soumis à des obligations contractuelles de confidentialité et de sécurité :

- **Hostinger International Ltd** (Chypre) — hébergement du site
- **Web3Forms** (États-Unis, certifié Data Privacy Framework) — service de transmission du formulaire de contact
- **Google Ireland Ltd** (Irlande) — outil d'analyse d'audience Google Analytics 4, sous réserve de votre consentement

Vos données ne sont jamais vendues, louées, ni transmises à des fins commerciales à des tiers.

[H2] 5. Transferts hors Union européenne

Certains sous-traitants (Web3Forms, Google) peuvent être amenés à traiter vos données hors de l'Union européenne. Ces transferts sont encadrés par les garanties appropriées prévues par le RGPD (clauses contractuelles types de la Commission européenne, certification Data Privacy Framework pour les transferts vers les États-Unis).

[H2] 6. Durée de conservation

| Type de données | Durée |
|---|---|
| Demandes d'étude / devis n'ayant pas donné lieu à une commande | 3 ans à compter du dernier contact |
| Données clients (commande signée) | Durée du contrat + 10 ans (obligations légales comptables et garantie décennale) |
| Données de navigation Google Analytics | 14 mois maximum |
| Données collectées via les cookies | Selon la durée propre à chaque cookie (cf. section 9) |

[H2] 7. Sécurité

Blue Energie met en œuvre les mesures techniques et organisationnelles appropriées pour garantir un niveau de sécurité adapté au risque, notamment :
- Hébergement sur serveurs sécurisés
- Connexion HTTPS systématique (certificat SSL/TLS)
- Accès aux données limité aux personnes habilitées
- Mots de passe robustes et renouvelés régulièrement

[H2] 8. Vos droits

Conformément au RGPD, vous disposez à tout moment des droits suivants sur vos données personnelles :

- **Droit d'accès** : obtenir la communication des données vous concernant
- **Droit de rectification** : corriger des données inexactes
- **Droit à l'effacement** (« droit à l'oubli ») : demander la suppression de vos données
- **Droit à la limitation** du traitement
- **Droit d'opposition** au traitement
- **Droit à la portabilité** : récupérer vos données dans un format structuré
- **Droit de retirer votre consentement** à tout moment lorsque le traitement repose sur ce fondement
- **Droit de définir des directives** relatives au sort de vos données après votre décès

Pour exercer ces droits, adressez une demande écrite à neil.lothian@blueenergie.fr ou par courrier au siège social, accompagnée d'un justificatif d'identité. Une réponse vous sera adressée dans un délai maximum d'un mois.

Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL :

Commission Nationale de l'Informatique et des Libertés (CNIL)
3 place de Fontenoy — TSA 80715
75334 Paris cedex 07
Téléphone : 01 53 73 22 22
Site web : https://www.cnil.fr

[H2] 9. Cookies

Le site https://blueenergie.fr utilise des cookies pour assurer son bon fonctionnement et, sous réserve de votre consentement, pour mesurer son audience.

| Cookie | Émetteur | Finalité | Durée |
|---|---|---|---|
| _ga, _ga_* | Google Analytics 4 | Mesure d'audience | 13 mois |
| Cookie de consentement | Blue Energie | Mémoriser vos choix | 6 mois |

Vous pouvez à tout moment modifier vos préférences de cookies en cliquant sur le lien « Gérer mes cookies » présent en pied de page (à venir). En l'absence de bandeau de gestion des cookies au moment de votre visite, vous pouvez désactiver Google Analytics depuis les paramètres de votre navigateur ou installer l'extension officielle de désactivation : https://tools.google.com/dlpage/gaoptout

[H2] 10. Modification de la présente politique

Blue Energie se réserve le droit de modifier la présente Politique de confidentialité à tout moment, notamment pour tenir compte d'évolutions législatives ou techniques. La date de dernière mise à jour figure en tête de document. Nous vous invitons à consulter régulièrement cette page.
```

### Étape 5 — Mise à jour du footer sur les 5 pages existantes (15 min)

Sur les 5 pages suivantes, ajouter **dans le footer** une rangée de liens vers les 3 pages légales :

1. `public_html/index.html`
2. `public_html/merci.html`
3. `public_html/blog/index.html`
4. `public_html/blog/2026-05-aides-solaires-avant-1er-juillet.html`
5. `public_html/blog/2026-05-batterie-virtuelle-attention-jpme.html`

Repère le bloc `<footer>` actuel dans chaque page (ou son équivalent — bas de page contenant les coordonnées). Ajoute juste avant la fermeture `</footer>` (ou dans une `<div>` en bas du footer, en dernière ligne au-dessus du copyright) un bloc HTML du type :

```html
<div class="footer-legal-links" style="margin-top:1.5rem; padding-top:1rem; border-top:1px solid rgba(255,255,255,0.15); text-align:center; font-size:0.85rem;">
  <a href="/mentions-legales.html">Mentions légales</a>
  &nbsp;·&nbsp;
  <a href="/cgv.html">CGV</a>
  &nbsp;·&nbsp;
  <a href="/politique-confidentialite.html">Politique de confidentialité</a>
</div>
```

**Important** :
- Adapte le style (couleur du séparateur, taille de police) au style de chaque footer existant pour ne PAS casser l'harmonie visuelle. Si le footer a un fond clair, change `rgba(255,255,255,0.15)` en `rgba(0,0,0,0.1)`.
- Les chemins sont en racine (`/mentions-legales.html`) → fonctionnent depuis l'accueil ET depuis `/blog/`. Vérifie après mise à jour.
- Sur `index.html`, **ne casse PAS** le footer existant (réalisations, contact, etc.) — tu n'ajoutes qu'un sous-bloc en bas.
- Sur `merci.html`, le footer est minimaliste : ajoute le bloc en respectant le style discret.
- Sur les 3 pages blog, le footer est partagé visuellement — ajoute le bloc cohérent dans chacun des 3 fichiers (pas de partial dans cette stack, donc 3 modifications identiques).

### Étape 6 — Validation finale (15 min)

1. **Vérifier la structure** :
   ```bash
   ls -la public_html/mentions-legales.html public_html/cgv.html public_html/politique-confidentialite.html
   ```
   Les 3 fichiers doivent exister et faire chacun > 5 Ko (sinon contenu trop léger).

2. **Vérifier les liens internes ajoutés dans les footers** :
   ```bash
   grep -c "mentions-legales.html" public_html/index.html public_html/merci.html public_html/blog/*.html
   ```
   Chaque page doit retourner au minimum 1.

3. **Vérifier que les pages légales sont auto-cohérentes** :
   ```bash
   grep -c "FR25882483274" public_html/mentions-legales.html
   grep -c "882 483 274" public_html/mentions-legales.html
   grep -c "rétractation" public_html/cgv.html
   grep -c "CNIL" public_html/politique-confidentialite.html
   ```

4. **Validation HTML W3C** des 3 nouvelles pages :
   ```bash
   for f in public_html/mentions-legales.html public_html/cgv.html public_html/politique-confidentialite.html; do
     echo "=== $f ==="
     curl -s -H "Content-Type: text/html; charset=utf-8" --data-binary @"$f" "https://validator.w3.org/nu/?out=json" | head -50
   done
   ```

5. **Commit + push GitHub** (git est déjà init avec remote `origin` vers `github.com/neillothian/blueenergie.fr`) :
   ```bash
   git add -A
   git commit -m "Session 4: pages légales (mentions, CGV, politique confidentialité) + liens footer"
   git push origin main
   ```
   Si le `git push` échoue pour cause d'auth :
   - Vérifie `git remote -v`
   - Tente une seule fois — si l'auth interactive est requise, n'invente pas un token, signale juste dans le rapport « push manuel requis par Neil »
   - Le commit local reste valide dans les deux cas

## Décisions déjà prises (ne demande RIEN)

| Sujet | Décision |
|---|---|
| Hébergeur officiel | Hostinger International Ltd, 61 Lordou Vironos Street, 6023 Larnaca, Chypre |
| SIRET complet | 882 483 274 00010 (extension siège 00010 standard pour SAS unique établissement) |
| RCS | Annecy (chef-lieu Haute-Savoie, ressort du siège) |
| TVA intra | FR25882483274 (validé) |
| Numéro RGE | Pas affiché publiquement — formulation « communiqué sur simple demande » |
| Médiateur de la consommation | **Non nommément désigné** dans les CGV (pas encore d'adhésion confirmée à un médiateur précis). Formulation générique avec lien plateforme RLL européenne. À enrichir plus tard si Neil adhère à MEDICYS / CM2C / autre. |
| Coordonnées assurance décennale | Non affichées (communiquées sur demande) |
| Email contact unique | neil.lothian@blueenergie.fr (pas d'alias contact@ pour l'instant) |
| Sous-traitants RGPD à citer | Hostinger + Web3Forms + Google Analytics |
| DPO | Non désigné (non obligatoire pour SAS de cette taille) — formulation conforme |
| Style des 3 pages | Reprise du CSS inline de `merci.html` / `blog/index.html`, largeur max 800 px, lecture confortable, pas de fioritures |
| Footer | Bloc de 3 liens ajouté en bas du footer existant, séparé par bordure subtile |
| Date publication | 2026-05-17 (date du jour côté serveur) |
| Git workflow | Pull au début, commit + push à la fin sur `origin/main`. Si auth interactive requise, commit local valide + signaler |

## Interdictions strictes

- ❌ N'invente AUCUNE donnée non listée dans ce prompt (numéro RGE, n° police d'assurance, nom du médiateur, etc.)
- ❌ Ne touche PAS au contenu existant des pages (sections matériel, formulaire, articles blog, etc.) — uniquement le bloc footer
- ❌ Ne supprime PAS le footer existant — tu ajoutes un sous-bloc dedans
- ❌ N'ajoute PAS de bandeau cookies tarteaucitron (c'est Session 5)
- ❌ N'ajoute PAS de JSON-LD Organization (c'est Session 14)
- ❌ N'ajoute PAS de témoignages, de chiffres commerciaux ou de promesses dans les pages légales
- ❌ Ne modifie PAS les liens existants du footer (réalisations, contact, etc.)
- ❌ Ne crée PAS de système de partial / inclusion (pas dans le périmètre, c'est Session 11)
- ❌ Ne pose AUCUNE question au user
- ❌ Ne refactore PAS le CSS

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
# Session 4 — Terminé

## Fichiers créés
- public_html/mentions-legales.html (X lignes)
- public_html/cgv.html (X lignes)
- public_html/politique-confidentialite.html (X lignes)
- public_html/index.html.backup-pre-session4 (sauvegarde)

## Fichiers modifiés (footer enrichi)
- public_html/index.html
- public_html/merci.html
- public_html/blog/index.html
- public_html/blog/2026-05-aides-solaires-avant-1er-juillet.html
- public_html/blog/2026-05-batterie-virtuelle-attention-jpme.html

## Vérifications
- ls : 3 pages légales présentes (> 5 Ko chacune)
- grep liens footer : N occurrences /mentions-legales.html dans les 5 pages
- grep FR25882483274 / 882 483 274 dans mentions-legales : OK
- grep "rétractation" dans cgv : OK
- grep "CNIL" dans politique : OK
- Validation W3C mentions : X erreurs / X warnings
- Validation W3C cgv : X erreurs / X warnings
- Validation W3C politique : X erreurs / X warnings
- Git pull initial : OK / KO
- Git commit local : OK
- Git push vers GitHub origin/main : OK / manuel requis (préciser pourquoi)

## À faire côté toi (Neil)
1. Téléverser sur Hostinger via hPanel :
   - public_html/mentions-legales.html
   - public_html/cgv.html
   - public_html/politique-confidentialite.html
   - public_html/index.html (footer enrichi)
   - public_html/merci.html (footer enrichi)
   - public_html/blog/index.html (footer enrichi)
   - public_html/blog/2026-05-aides-solaires-avant-1er-juillet.html (footer enrichi)
   - public_html/blog/2026-05-batterie-virtuelle-attention-jpme.html (footer enrichi)
2. Vider le cache Hostinger
3. Tester :
   - https://blueenergie.fr/mentions-legales.html s'affiche
   - https://blueenergie.fr/cgv.html s'affiche
   - https://blueenergie.fr/politique-confidentialite.html s'affiche
   - Footer de l'accueil + footer du blog → cliquer chaque lien → vérifier qu'il ouvre la bonne page
   - Soumettre les 3 nouvelles URLs à Google Search Console

## Prochaines sessions disponibles
- Session 5 : bandeau cookies tarteaucitron (maintenant que politique de confidentialité existe)
- Session 14 : JSON-LD Organization global + sitemap.xml + robots.txt (recommandé pour SEO)
- Session 18 : bandeau confiance RGE + décennale (logo QualiPV déjà dans images/)

## Blocages éventuels
(vide si tout OK, sinon détailler)
```

## === FIN PROMPT ===

---

## Notes hors prompt (pour Neil)

**Vérifications avant publication** :
- Le **SIRET avec extension 00010** est une supposition standard pour SAS à établissement unique. Si tu connais l'extension exacte du siège (peut être différente, ex : 00012, 00018), corrige dans `mentions-legales.html` avant upload. Tu peux vérifier sur https://annuaire-entreprises.data.gouv.fr/entreprise/882483274
- Si tu adhères à un **médiateur de la consommation** (souvent obligatoire pour les pros B2C, ex: MEDICYS, CM2C, AME), il faudra ajouter son nom + adresse + site web dans l'article 10 des CGV. Sans cette adhésion, la formulation actuelle (lien RLL européen) reste valide mais imparfaite.
- L'extension officielle de désactivation Google Analytics (`https://tools.google.com/dlpage/gaoptout`) sera complétée par le bandeau tarteaucitron en Session 5.

**Prochaine session recommandée après celle-ci** : **Session 5** (bandeau cookies tarteaucitron) — qui s'appuie sur la politique de confidentialité fraîchement créée.
