# blueenergie.fr

Site vitrine de **Blue Energie** — installateur de solutions photovoltaïques résidentielles en Haute-Savoie (74).

## Stack

- HTML / CSS / JS pur, pas de framework
- Hébergement Hostinger
- Formulaires : Web3Forms
- Analytics : Google Analytics 4 (`G-JEG722VJTV`)
- Cartographie : OpenStreetMap (iframe)

## Arborescence

```
blueenergie.fr/
├── public_html/              ← racine déployée sur Hostinger
│   ├── index.html            ← page d'accueil (mono-page)
│   ├── merci.html            ← page de remerciement post-formulaire
│   ├── blog/                 ← hub + 2 articles SEO (aides 2026, batterie virtuelle JPME)
│   ├── images/               ← visuels site (.webp, logo, logo QualiPV, photos)
│   ├── css/                  ← (réservé refactor Session 8)
│   ├── js/                   ← (réservé refactor Session 8)
│   └── redirect/             ← redirections PHP
├── _dropzone/                ← boîte de dépôt entrante de Neil (lire `_dropzone/README.md`)
└── *.md                      ← documents de planification (audit, plan, sessions, prompts, questions, état projet)
```

## Workflow déploiement

1. Modifier `public_html/index.html` (ou autre fichier du site)
2. Téléverser sur Hostinger via hPanel → File Manager
3. Vider le cache Hostinger (hPanel → Tableau de bord → Vider le cache)
4. Vérifier sur https://blueenergie.fr

## Sessions de refonte

Le travail de refonte est découpé en sessions chiffrées (cf. `SESSIONS-CODE-A-VENIR.md`).
État au 2026-05-17 : **Sessions 1, 2, 3, 6 et Blog (hub + 2 articles) déployées**.

Pour relancer le pilotage senior dans une nouvelle session Cowork, voir `PROMPT-PASSATION.md` et `ETAT-PROJET.md`.

## Contact

- Site : https://blueenergie.fr
- Email : neil.lothian@blueenergie.fr
- Tél : 07 61 50 43 85
- Adresse : 11 Chemin de Perouza, 74520 Savigny
