# Wireframes — pages cibles

> Structure texte de chaque page après refonte. Niveau de détail : sections, ordre, CTA, contenu clé. Pas de pixel-perfect.
> Conventions : `[H1]` = titre principal, `[H2]` = section, `[CTA]` = bouton d'action, `[BLOC]` = composant réutilisé.

---

## Composants globaux (présents sur toutes les pages)

### `[BLOC] Header / Navbar (sticky)`
- Logo Blue Energie (SVG) → lien accueil
- Menu : Installation · Matériel · Aides 2026 · Réalisations · Zones · Blog · Contact
- Note Google moyenne (alimentée API) : « ⭐ 4,8/5 — 12 avis »
- Bouton CTA orange : « Étude gratuite »

### `[BLOC] Bandeau de confiance`
- Logos RGE QualiPV · Assurance décennale · SIRET 882 483 274 · « SAS au capital 18 000 € »

### `[BLOC] Footer`
- Coordonnées (adresse, tél, email contact@)
- Liens : Mentions légales · CGV · Politique de confidentialité · Plan du site · Contact
- Zones d'intervention (mini-liste villes)
- Réseaux sociaux (à venir)
- © 2026 Blue Energie

### `[BLOC] Bandeau cookies` (tarteaucitron.js)
- Au premier visit : « Nous utilisons des cookies… Accepter / Refuser / Personnaliser »

---

## 1. `index.html` — Accueil

```
[H1] Installation de panneaux photovoltaïques en Haute-Savoie

[Hero plein écran]
  - Visuel : installation Blue Energie (photo réelle, optimisée)
  - Sous-titre : "Étude gratuite, matériel premium, installation clé en main"
  - [CTA] Demander mon étude gratuite (ancrage vers formulaire ou /contact)
  - [CTA secondaire] Voir nos réalisations
  - Trust badges en bas du hero : RGE · Décennale · 50+ chantiers · ⭐ 4,8/5

[BLOC] Bandeau de confiance

[H2] Pourquoi choisir Blue Energie ?
  - 3 colonnes :
    - "Étude technique gratuite" (icône) + 2 lignes
    - "Matériel premium garanti 25 ans" (icône) + 2 lignes
    - "Installation par équipe certifiée RGE" (icône) + 2 lignes

[H2] Notre offre en 7 étapes
  - Timeline visuelle (réutiliser le composant existant, OK)
  - [CTA] Démarrer mon projet

[H2] Ils nous ont fait confiance
  - Carrousel ou grille des 3 derniers avis Google (API dynamique)
  - Note moyenne + nombre d'avis
  - [Lien] Voir tous les avis sur Google

[H2] Une question fréquente : combien ça coûte ?
  - Encart avec exemple chiffré REGHEM :
    - "Installation 10 kWc + batterie 10,24 kWh : 13 367 € TTC"
    - "Production estimée 11 441 kWh/an"
    - "Aides déduites incluses (prime autoconso 1 600 €)"
  - [CTA] Obtenir mon devis personnalisé

[H2] Nos dernières réalisations
  - 3 cartes avec photo + descriptif
  - [Lien] Voir toutes nos réalisations

[H2] On intervient près de chez vous
  - Carte / liste des départements 74 73 01 38
  - Liens vers pages géographiques principales (Annecy, Annemasse, Chambéry, etc.)

[CTA final] Bandeau orange large
  "Prêt à passer au solaire ? Étude gratuite et sans engagement"
  [Bouton] Demander mon étude

[BLOC] Footer
```

---

## 2. `installation-photovoltaique.html` — Notre offre détaillée

```
[H1] Installation photovoltaïque clé en main

[Hero]
  - Photo équipe / chantier
  - Sous-titre : "De l'étude à la mise en service, on s'occupe de tout"

[H2] Notre processus en 7 étapes
  - Timeline détaillée (chaque étape = 1 paragraphe de 3-5 lignes)
  - Durée totale du projet : 4-6 mois en moyenne

[H2] Ce qu'on fait pour vous
  - Étude technique personnalisée (logiciel Solarsurf, exemple visuel REGHEM)
  - Démarches administratives (Enedis, Consuel, urbanisme)
  - Installation par notre équipe (pas de sous-traitance)
  - Mise en service + accompagnement aides
  - Suivi 25 ans (garanties matériel)

[H2] Ce que vous gagnez
  - Calculateur simple (input puissance / sortie estimation production + économies)
  - Exemple concret : "Pour une maison 100 m² avec 4 occupants à Annecy : ~10 kWc, 11 000 kWh/an produits, ~1 800 €/an d'économies"

[H2] FAQ rapide
  - Combien de temps ça prend ?
  - Et si mon toit ne convient pas ?
  - Quelles aides je peux obtenir ?
  - Quelle garantie sur le matériel ?

[CTA final] Étude gratuite

[BLOC] Footer
```

---

## 3. `materiel-panneaux-solaires.html` — Catalogue matériel

```
[H1] Le matériel que nous installons

[Intro]
  - Position : "Nous avons sélectionné les marques qui offrent le meilleur ratio fiabilité/garantie/performance pour le climat alpin"

[H2] Modules photovoltaïques — JA Solar 500 W bifacial type N
  - Photo module
  - Bénéfices clients : gain de production 5-10 % (bifacial), résistance neige/grêle, garantie 25 ans
  - Caractéristiques techniques (puissance, rendement, dimensions)
  - [Lien] Fiche technique PDF (réutiliser fichier dossier REGHEM 3.1)

[H2] Onduleur hybride — Solplanet ASW-H S2
  - Photo onduleur
  - Bénéfices : pilotage batterie intégré, backup secours en cas de coupure, certifié EN 50549-1
  - Caractéristiques (puissance, monophasé/triphasé, app mobile)
  - [Lien] Fiche technique PDF

[H2] Batterie — Solplanet G3 modulaire (5,12 kWh empilables)
  - Photo batterie
  - Bénéfices : modulaire (on commence avec 5 kWh, on agrandit plus tard), garantie 10 ans
  - Caractéristiques (capacité, profondeur de décharge, durée de vie)
  - [Lien] Fiche technique PDF

[H2] Structure de pose — K2 Systems (Allemagne)
  - Photo rails
  - Bénéfices : étude technique projet par projet, assurance décennale incluse, adapté tous types de toits
  - Types : tuile mécanique, ardoise, bac acier, toit plat lesté, toit goudronné

[H2] En option — Optimiseurs Tigo TS4
  - Pour toits avec ombrage partiel ou orientations mixtes
  - Gestion module par module
  - Recommandé seulement si nécessaire (pas systématique)

[H2] Pourquoi ces marques ?
  - Bloc explicatif : "Nous avons testé X marques. Voici pourquoi on a choisi celles-ci pour vous"
  - 3-4 critères : garanties longues, traçabilité, SAV réactif, certifications européennes

[CTA] Demander une étude avec ce matériel

[BLOC] Footer
```

---

## 4. `aides-2026.html` — Aides et financement

```
[H1] Aides et primes pour le photovoltaïque en 2026

[Intro chiffrée]
  - "Jusqu'à 2 500 € d'aides directes + revenus sur 20 ans + économies sur la facture"

[H2] Prime à l'autoconsommation 2026
  - Tableau par puissance (3, 6, 9, 12 kWc) → montant prime
  - Versement sur 5 ans
  - Conditions : RGE QualiPV obligatoire (qu'on a ✅)

[H2] Vente du surplus à EDF
  - Tarif rachat actuel : 7,61 c€/kWh (à mettre à jour selon arrêté en vigueur)
  - Contrat 20 ans
  - Démarches : on s'en occupe pour vous

[H2] TVA réduite 10 %
  - Conditions (logement +2 ans, ≤ 3 kWc puis ≤ 9 kWc selon réforme)
  - Application automatique sur le devis

[H2] MaPrimeRénov' (si éligible)
  - À jour selon décrets
  - Conditions revenus
  - Cumulable avec prime autoconso

[H2] Simulateur rapide
  - Inputs : puissance souhaitée + département + revenus
  - Sortie : estimation aides totales

[H2] FAQ aides
  - Faut-il avancer l'argent ?
  - Quand sont versées les aides ?
  - Que se passe-t-il si je vends la maison ?

[CTA] Calculer mes aides avec une étude gratuite

[BLOC] Footer
```

---

## 5. `realisations.html` — Galerie

```
[H1] Nos installations en Haute-Savoie et Savoie

[Intro] Brève intro : 50+ chantiers réalisés depuis [année création]

[Filtres] Boutons : Tous · Tuiles · Toit plat · Full Black · Avec batterie · Bifacial

[Grille] 12 réalisations minimum
  Pour chaque carte :
    - Photo HD (multiple angles si possible)
    - Lieu (ville + département)
    - Puissance (kWc)
    - Matériel utilisé
    - Date d'installation
    - Témoignage client court si disponible

[H2] Vous voulez voir un chantier près de chez vous ?
  [CTA] Contactez-nous

[BLOC] Footer
```

---

## 6. `zones-intervention.html` — Hub géographique

```
[H1] Blue Energie intervient dans les départements 74, 73, 01 et 38

[Carte interactive]
  - Carte des 4 départements avec villes principales cliquables

[H2] Haute-Savoie (74)
  - Liste des villes avec lien vers page dédiée :
    - Annecy → /zones/annecy.html
    - Annemasse → /zones/annemasse.html
    - Thonon-les-Bains → /zones/thonon-les-bains.html
    - La Roche-sur-Foron → /zones/la-roche-sur-foron.html
    - Cluses → /zones/cluses.html

[H2] Savoie (73)
  - Chambéry, Aix-les-Bains, Albertville

[H2] Ain (01)
  - Bourg-en-Bresse (à valider)

[H2] Isère (38)
  - Grenoble (à valider)

[H2] Vous êtes ailleurs ? Contactez-nous
  - On étudie chaque demande au cas par cas

[CTA] Demander une étude

[BLOC] Footer
```

---

## 7. `zones/[ville].html` — Page géographique type

> Modèle réutilisé pour chaque ville. 10 pages au total à créer.

```
[H1] Installation de panneaux solaires à [Ville] ([dpt])

[Intro 100 mots]
  - Spécificités locales (ensoleillement, climat alpin, types de toits typiques)

[H2] Pourquoi le solaire à [Ville] ?
  - Ensoleillement local en kWh/m²/an
  - Économies moyennes possibles
  - Aides locales si la ville/communauté en propose

[H2] Notre offre pour les habitants de [Ville]
  - Bref rappel de l'offre standard
  - Délais d'intervention typiques

[H2] Une réalisation proche de [Ville]
  - 1 témoignage / chantier de la zone (si disponible)
  - Sinon : "Premiers chantiers en cours dans votre secteur"

[H2] Contactez-nous
  - Formulaire court (nom, tél, email, message)
  - Téléphone direct + email

[BLOC] JSON-LD LocalBusiness avec areaServed = [Ville]

[BLOC] Footer
```

---

## 8. `contact.html` — Page contact + formulaire long

```
[H1] Demandez votre étude gratuite

[Intro courte] "Réponse sous 24-48h ouvrées. Sans engagement, sans démarchage agressif."

[Layout 2 colonnes]

  Colonne gauche : formulaire d'étude (le formulaire long existant, refondu)
    - Section 1 : Votre logement (radios alignés)
    - Section 2 : Vos consommations
    - Section 3 : Vos projets futurs
    - Section 4 : Vos coordonnées
    - Indicateur progression (étape X/4)
    - Bouton "Envoyer ma demande"
    - hCaptcha en bas
    - Honeypot invisible

  Colonne droite : infos contact rapides
    - Adresse, tél (cliquable), email contact@
    - Horaires : Lun-Ven 8h-18h, Sam 9h-12h
    - Carte (OpenStreetMap iframe, pas de clé API requise)
    - Encart confiance : RGE + Décennale + SIRET

[H2] Une question avant ?
  - FAQ courte
  - Lien vers blog si pertinent

[BLOC] Footer
```

---

## 9. `merci.html` — Page de confirmation

```
[Header simplifié] Juste le logo

[H1] Merci pour votre demande !

[Visuel] Icône check verte

[Texte court 3 lignes]
  "Nous avons bien reçu votre demande d'étude.
  Notre équipe vous recontacte sous 24-48h ouvrées au numéro indiqué.
  D'ici là, vous pouvez consulter nos réalisations ou notre blog."

[3 CTAs secondaires]
  - "Voir nos réalisations" → /realisations.html
  - "Lire notre blog" → /blog/
  - "Retour à l'accueil" → /

[BLOC] Footer simplifié

[Tracking] Événement GA4 "conversion_lead" déclenché au chargement
```

---

## 10. `blog/index.html` — Hub blog

```
[H1] Conseils & actualités du photovoltaïque

[Intro] "Tout savoir sur le solaire en Haute-Savoie : aides, technique, retours d'expérience"

[Filtres] Catégories : Aides · Technique · Rentabilité · Témoignages

[Grille articles]
  Pour chaque article :
    - Image vedette
    - Catégorie
    - Titre
    - Extrait 2 lignes
    - Date + temps de lecture

[Pagination] Si plus de 12 articles

[CTA] Étude gratuite

[BLOC] Footer
```

---

## 11. `blog/[article].html` — Article type

```
[Breadcrumb] Accueil > Blog > Catégorie > Titre

[H1] Titre de l'article

[Meta] Auteur · Date · Catégorie · Temps de lecture · Boutons partage

[Image vedette]

[Contenu structuré H2/H3, max 1500 mots]

[Encart auteur] "Écrit par Neil Lothian, fondateur de Blue Energie"

[FAQ Schema] 3-5 questions/réponses (rich snippet Google)

[CTA mid-article] "Vous voulez une étude personnalisée ?"

[Articles liés] 3 articles de la même catégorie

[Commentaires] (optionnel, pas pour démarrer)

[BLOC] JSON-LD Article

[BLOC] Footer
```

---

## 12. Pages légales

### `mentions-legales.html`
- Éditeur du site : SAS Blue Energie, capital 18 000 €, SIRET 882 483 274
- Représentant légal : Neil Lothian, Président
- Adresse : 11 Chemin de Perouza, 74520 Savigny
- Contact : 07 61 50 43 85 / contact@blueenergie.fr
- Hébergeur : [à renseigner — Hostinger / OVH / autre]
- N° TVA intracommunautaire : [à renseigner]
- N° RGE QualiPV : [à renseigner]
- Crédits photos / illustrations

### `cgv.html` (Conditions Générales de Vente)
- Objet
- Acceptation des CGV
- Devis et acceptation
- Prix et conditions de paiement (4 versements selon devis REGHEM)
- Délais d'exécution
- Réception des travaux
- Garanties (décennale, biennale, parfait achèvement)
- Garanties matériel (renvoi aux fabricants)
- Rétractation (loi Hamon — 14 jours)
- Médiateur de la consommation
- Litiges

### `politique-confidentialite.html` (RGPD)
- Données collectées (formulaire de contact + GA4)
- Finalités du traitement
- Base légale (consentement + exécution contrat)
- Destinataires (équipe Blue Energie uniquement)
- Durée de conservation (3 ans après dernier contact)
- Droits utilisateur (accès, rectification, effacement, portabilité, opposition)
- Délégué DPO (s'il y en a un)
- Contact pour exercer les droits
- Cookies (liste + finalités)
- Réclamation CNIL

---

## Notes transversales

- **Cohérence CTA** : un seul bouton orange (« Étude gratuite ») partout, jamais 2 CTAs primaires sur la même page
- **Couleurs** : on garde la palette actuelle (#4fc7ef bleu, #fb9641 orange, #ffffff blanc)
- **Police** : Segoe UI suffit (chargée par défaut), pas de Google Fonts (perf + RGPD)
- **Images** : toutes en WebP, optimisées < 300 KB sauf hero homepage
- **Responsivité** : mobile-first, breakpoint 768px
- **Accessibilité** : alt sur toutes les images, contraste AA minimum, navigation clavier
