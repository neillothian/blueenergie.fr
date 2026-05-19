# 🎓 Fiche de révision — Session 6-BIS (mise à jour catalogue matériel + offre back-up)

> À lire AVANT de lancer le prompt dans Claude Code. La session est courte (~1h) mais touche un livrable commercial sensible (mention de marques, prix engageant). Comprendre les enjeux évite de dégrader la cohérence du catalogue actuel.

## Concepts non triviaux

- **Onduleur de chaîne (string inverter)** : un seul boîtier centralisé qui agrège la production de tous les panneaux d'une « chaîne » (string) montés en série. C'est ce que fait **Solplanet** : simple, fiable, coût optimisé. Inconvénient théorique : si un panneau est ombré, la chaîne entière baisse — d'où les optimiseurs Tigo en option.
- **MLPE (Module-Level Power Electronics)** : électronique placée derrière chaque panneau. **SolarEdge** = optimiseurs DC sur chaque module + onduleur central. **Enphase** = micro-onduleur qui convertit DC→AC directement derrière chaque panneau. Avantage : production maximisée panneau par panneau, monitoring fin, sécurité (pas de courant DC haute tension qui circule sur le toit). Inconvénient : surcoût matériel + plus de pièces électroniques exposées aux conditions extérieures.
- **Back-up partiel vs back-up total** : un onduleur hybride avec « back-up partiel » alimente uniquement quelques prises ou un circuit secouru en cas de coupure réseau (typiquement frigo + box internet + quelques éclairages). Le **back-up total** alimente l'intégralité du tableau électrique de la maison comme un groupe électrogène — nécessite un commutateur automatique (ATS) et un dimensionnement batterie/onduleur cohérent avec la pointe de consommation. C'est ce que Blue Energie propose désormais **à partir de 600 € HT** (option d'installation/câblage du dispositif, en sus du matériel batterie/onduleur).
- **Garantie 25 ans avec extension Solplanet** : Solplanet propose une garantie standard de 10 ans sur ses onduleurs hybrides, **extensible jusqu'à 25 ans** via un programme d'extension constructeur. C'est rarissime sur le marché des onduleurs de chaîne (la plupart : 5-10 ans) et c'est l'argument-clé qui justifie de garder Solplanet en **standard**.
- **Variables CSS** : `var(--primary-blue)` et `var(--primary-orange)` sont définies une seule fois en haut du `<style>` d'`index.html`. La page `materiel-panneaux-solaires.html` utilise les **valeurs hexa en dur** (`#f7941d`, `#4fc7ef`, `#2a4a5a`) parce qu'elle référence `/assets/css/main.css` mais que ces variables n'y sont pas forcément exposées. Vérifier avant d'utiliser `var(...)` sur cette page — sinon garder les hexa.

## Étapes clés vue d'avion

1. Backup + git pull
2. **Section #materiel — index.html** : enrichir la carte onduleur Solplanet (mention garantie 25 ans avec extension) + ajouter une **5e carte « Alternatives haut de gamme »** présentant SolarEdge et Enphase comme options proposées sur demande.
3. **Bloc back-up total** : nouveau bloc encadré bleu (à côté ou juste sous le bloc « Tigo en option ») mettant en avant l'offre « Back-up total — alimentation de secours de la maison à partir de 600 € HT ».
4. **Page materiel-panneaux-solaires.html** : appliquer les **mêmes modifications** (carte alternatives haut de gamme + bloc back-up) pour rester cohérent.
5. Vérifications grep (Solplanet reste cité en standard, JA Solar inchangé, badge batterie < 300 €/kWh intact).
6. Commit + push.
7. Mise à jour `SESSIONS-CODE-A-VENIR.md` (nouvelle ligne Session 6-BIS — ✅ DÉPLOYÉ).

## Pièges à anticiper

- ❌ **Ne PAS reléguer Solplanet** : Solplanet doit rester le **standard** (premier cité, carte normale). SolarEdge et Enphase arrivent en **carte « alternative haut de gamme »** présentée comme option supérieure, pas comme défaut.
- ❌ **Ne PAS toucher au badge batterie « MOINS DE 300 €/kWh »** ni à l'encart prix dégressif (342 / 300 / moins). Cet argument est figé (Q QUESTIONS-OUVERTES) et validé par Neil le 17/05/2026.
- ❌ **Ne PAS inventer de prix back-up différent de 600 € HT** ni de capacité minimale précise (l'offre est annoncée « à partir de 600 € HT », point).
- ❌ **Ne PAS modifier les autres sections** : header, présentation, processus, étude, réalisations, formulaire, contact, footer — hors scope.
- ❌ **Ne PAS renommer les fichiers ni ajouter de nouvelles images** : on travaille uniquement sur du HTML/style inline.
- ⚠️ **Cohérence visuelle** : la nouvelle carte « Alternatives haut de gamme » doit visuellement ressembler aux 4 cartes existantes (même classe `.service-card`, mêmes proportions). Pas de border colorée tape-à-l'œil (réservée à la carte batterie).
- ⚠️ **Variables CSS vs hexa en dur** : sur `index.html` utiliser `var(--primary-blue)` / `var(--primary-orange)`. Sur `materiel-panneaux-solaires.html` utiliser les hexa `#4fc7ef` / `#f7941d` / `#2a4a5a` (cohérent avec l'existant de cette page).
- ⚠️ **Garantie 25 ans Solplanet** : formuler avec précaution — c'est « garantie constructeur 10 ans, **extensible jusqu'à 25 ans** via le programme d'extension Solplanet » (et non « garantie 25 ans » sec, qui serait commercialement abusif).

## Mini-quiz d'auto-vérification

1. Pourquoi Solplanet doit rester le **standard** présenté en premier, malgré l'ajout de SolarEdge et Enphase ?
2. Quelle est la différence entre un onduleur de chaîne (Solplanet) et un micro-onduleur (Enphase) ? En quoi cela justifie un surcoût ?
3. Pourquoi est-ce risqué d'annoncer « garantie 25 ans » tout court pour Solplanet sans préciser « avec extension constructeur » ?
4. Le badge « MOINS DE 300 €/kWh » : pourquoi est-il intouchable dans cette session ?
5. Le prix « à partir de 600 € HT » du back-up total désigne quoi exactement : le matériel, l'installation, ou le tout en option ?

## Pour aller plus loin (optionnel)

- Solplanet — programme d'extension de garantie : https://www.solplanet.net (chercher « warranty extension »)
- SolarEdge — datasheets résidentielles : https://www.solaredge.com/fr
- Enphase — micro-onduleurs IQ8 : https://enphase.com/fr-fr/installateurs/microonduleurs
- Différence string vs MLPE (article FR) : https://www.photovoltaique.info/

---



# Prompt Session 6-BIS — Mise à jour catalogue matériel + offre back-up

> **Enrichissement du catalogue matériel : Solplanet reste standard, ajout SolarEdge + Enphase comme alternatives haut de gamme. Nouvelle offre back-up total à partir de 600 € HT.**
> Périmètre : `public_html/index.html` (section #materiel) + `public_html/materiel-panneaux-solaires.html` + `SESSIONS-CODE-A-VENIR.md`.
> Durée estimée : ~1 h. Aucune question au user pendant l'exécution.

---

## Mode d'emploi (côté Neil)

1. Ouvre un terminal
2. `cd "/Users/neillothian/Documents/Claude/Projects/blueenergie.fr"`
3. Lance Claude Code : `claude`
4. Copie-colle tout ce qui est entre `=== DÉBUT PROMPT ===` et `=== FIN PROMPT ===`
5. Laisse tourner ~1 h. Push direct sur `main` (livrable additif, pas de risque juridique nouveau).

---

## === DÉBUT PROMPT ===

Tu es développeur web senior. Tu travailles sur **blueenergie.fr** (installation de panneaux photovoltaïques en Haute-Savoie). Stack : HTML/CSS/JS pur. Hébergement Hostinger.

La Session 6 a déjà figé le catalogue **JA Solar / Solplanet / K2 / Tigo** avec l'argument fort « batterie < 300 €/kWh dès 10 kWh ». La Session 12 a créé la page interne `materiel-panneaux-solaires.html` reprenant ce même catalogue. Tu travailles maintenant sur la **Session 6-BIS : enrichissement du catalogue (alternatives haut de gamme) + intégration d'une nouvelle offre commerciale back-up total**.

## Contexte projet

Blue Energie (SAS — SIRET 882 483 274) installe des systèmes photovoltaïques résidentiels en Haute-Savoie, Savoie, Ain et Isère. Représentant : Neil Lothian. Certification RGE QualiPV active. Le site est en HTML/CSS/JS pur, déployé sur Hostinger via FTP. La page d'accueil (`public_html/index.html`) et la page catalogue dédiée (`public_html/materiel-panneaux-solaires.html`) affichent aujourd'hui 4 cartes principales (JA Solar / Solplanet onduleur / Solplanet batterie / K2) + 1 carte option Tigo + 1 bloc « Pourquoi ces marques ». La carte batterie porte un badge orange « MOINS DE 300 €/kWh à partir de 10 kWh » + encart prix dégressif (342 / 300 / moins) **à ne pas toucher**.

## Objectif de la session

Positionner Solplanet comme **marque incontournable** (qualité/prix imbattable, onduleurs de chaîne avec garantie 10 ans extensible jusqu'à 25 ans) tout en **ajoutant SolarEdge et Enphase comme alternatives haut de gamme** également proposées sur demande. Intégrer une **nouvelle offre commerciale** : « Back-up total — alimentation de secours de la maison à partir de 600 € HT », visible comme bloc dédié dans la section matériel.

## Périmètre exact

1. **Modif 1 — `public_html/index.html` section `#materiel`** :
   a. Enrichir la carte 2 (Onduleur Solplanet) pour expliciter « garantie 10 ans extensible jusqu'à 25 ans (programme constructeur) ».
   b. Ajouter une **5e carte** intitulée « Alternatives haut de gamme — SolarEdge & Enphase » dans la `.services-grid`, juste après la carte K2.
   c. Ajouter un **bloc back-up total** (bleu, style similaire au bloc Tigo) sous le bloc Tigo, mettant en avant l'offre « Back-up total — à partir de 600 € HT ».
2. **Modif 2 — `public_html/materiel-panneaux-solaires.html`** : appliquer les **mêmes** modifications (carte alternatives + bloc back-up) pour rester cohérent. Utiliser les valeurs hexa (`#4fc7ef`, `#f7941d`, `#2a4a5a`) au lieu des variables CSS qui ne sont pas exposées sur cette page.
3. **Modif 3 — `SESSIONS-CODE-A-VENIR.md`** : ajouter une ligne « Session 6-BIS — Catalogue haut de gamme + offre back-up | ✅ **DÉPLOYÉ** | `PROMPT-SESSION-6-BIS.md` » dans le tableau d'état d'avancement, juste sous la ligne Session 6. Mettre à jour la date d'en-tête `## État d'avancement (mise à jour 2026-05-19)`.

## Décisions figées (à respecter, ne pas reposer)

| Sujet | Décision |
|---|---|
| Marques standard | JA Solar (modules) + Solplanet (onduleur + batterie) + K2 (structure) + Tigo (option). **Inchangé.** |
| Solplanet positionnement | Reste **le standard**, première carte onduleur, jamais déclassé. |
| SolarEdge + Enphase | Ajoutés comme **alternatives haut de gamme proposées sur demande**, dans une **seule carte mutualisée** (pas deux cartes séparées, pour ne pas alourdir la grille). |
| Garantie onduleur Solplanet | « 10 ans, **extensible jusqu'à 25 ans** via le programme d'extension constructeur ». Ne JAMAIS écrire « garantie 25 ans » sec. |
| Badge batterie < 300 €/kWh | **Intouchable.** 342 € à 5 kWh, 300 € dès 10 kWh, moins au-delà. Validé Neil le 17/05/2026. |
| Offre back-up total | **« À partir de 600 € HT »** — chiffre Neil, ne pas inventer d'autre valeur, ne pas préciser ce que ça couvre exactement matériellement (juste « alimentation de secours de la maison »). |
| Emplacement bloc back-up | Sous le bloc Tigo, avant le bloc « Pourquoi ces marques ». Style encadré bleu (cohérent avec Tigo). |
| Variables CSS index.html | Utiliser `var(--primary-blue)` et `var(--primary-orange)`. |
| Hexa materiel-panneaux-solaires.html | Utiliser `#4fc7ef`, `#f7941d`, `#2a4a5a` (cohérent avec l'existant de la page). |
| Lazy-loading / refactor CSS | Hors scope. |
| Page créée / supprimée | Aucune. On travaille sur 2 pages HTML existantes + 1 fichier de suivi. |

## Étapes (workflow technique)

### Étape 0 — Initialisation (3 min)

1. `TodoWrite` avec 6 tâches : backup, lecture contexte, modif index.html (carte onduleur + carte alternatives + bloc back-up), modif materiel-panneaux-solaires.html, mise à jour SESSIONS-CODE-A-VENIR.md, vérifications + commit.
2. `git pull origin main --rebase` — si échec, diagnostique et stop.
3. Vérifier `git status` → propre.
4. Backups :
   ```bash
   cp public_html/index.html public_html/index.html.backup-pre-session6bis
   cp public_html/materiel-panneaux-solaires.html public_html/materiel-panneaux-solaires.html.backup-pre-session6bis
   ```

### Étape 1 — Lecture contexte (5 min)

Lis dans cet ordre, et RIEN d'autre :
1. `public_html/index.html` — section `#materiel` (lignes ~255-332)
2. `public_html/materiel-panneaux-solaires.html` — section `#materiel` (lignes ~88-165)
3. `SESSIONS-CODE-A-VENIR.md` — tableau d'état (lignes 1-40)

### Étape 2 — Modif `public_html/index.html` (20 min)

**2.a — Enrichir la carte Onduleur Solplanet (ligne ~284)** :
Remplacer la ligne :
```html
                    <li>Garantie constructeur étendue jusqu'à 10 ans</li>
```
par :
```html
                    <li><strong>Garantie 10 ans, extensible jusqu'à 25 ans</strong> via le programme d'extension Solplanet</li>
```

**2.b — Ajouter une 5e carte « Alternatives haut de gamme »** juste avant la fermeture de la `.services-grid` (juste avant `</div>` qui ferme la grid, à la ligne ~319). Coller exactement :

```html
            <!-- CARTE 5 : Alternatives haut de gamme SolarEdge / Enphase -->
            <div class="service-card">
                <h3>Alternatives haut de gamme — SolarEdge &amp; Enphase</h3>
                <p><strong>Sur demande, nous proposons également deux références haut de gamme</strong> reconnues pour leur électronique au niveau de chaque panneau (MLPE) et leur monitoring fin.</p>
                <ul style="text-align: left; margin: 1rem 0; padding-left: 1.5rem; color: #555;">
                    <li><strong>SolarEdge</strong> — onduleur central + optimiseurs DC sur chaque panneau, monitoring panneau par panneau, garantie onduleur 12 ans extensible</li>
                    <li><strong>Enphase</strong> — micro-onduleurs IQ8 directement derrière chaque module, pas de courant DC haute tension sur le toit (sécurité), garantie 25 ans sur les micro-onduleurs</li>
                    <li>Pertinent en cas d'ombrages complexes, orientations multiples ou exigence de monitoring détaillé</li>
                    <li>Surcoût matériel par rapport à Solplanet — chiffré dans votre devis personnalisé</li>
                </ul>
                <p style="margin-top: 1rem; color: #777; font-size: 0.9rem; font-style: italic;">Solplanet reste notre standard pour son ratio qualité/prix et sa garantie extensible jusqu'à 25 ans. SolarEdge et Enphase sont proposés sur demande explicite.</p>
            </div>
```

**2.c — Ajouter le bloc back-up total** juste après le bloc Tigo (qui se ferme à la ligne ~324) et **avant** le bloc « Pourquoi ces marques » (qui commence vers la ligne ~326). Coller exactement :

```html
        <!-- BLOC OFFRE BACK-UP TOTAL -->
        <div style="max-width: 800px; margin: 2rem auto 0; padding: 1.5rem; background: #eaf7fd; border-radius: 10px; border-left: 4px solid var(--primary-blue); position: relative;">
            <div style="position: absolute; top: -14px; left: 20px; background: var(--primary-blue); color: white; padding: 0.35rem 0.9rem; border-radius: 20px; font-weight: bold; font-size: 0.8rem;">
                NOUVEAU
            </div>
            <h4 style="color: var(--primary-blue); margin-bottom: 0.5rem; margin-top: 0.3rem;">Back-up total — alimentation de secours de la maison</h4>
            <p style="color: #444; line-height: 1.6; margin-bottom: 0.5rem;">En cas de coupure réseau, votre installation peut <strong>alimenter automatiquement l'ensemble de votre tableau électrique</strong> à partir de la batterie — comme un groupe électrogène silencieux et sans entretien. Étude de dimensionnement et câblage spécifique inclus.</p>
            <p style="margin: 0; font-size: 1.05rem; color: var(--primary-blue); font-weight: bold;">À partir de 600 € HT</p>
            <p style="margin: 0.4rem 0 0; font-size: 0.85rem; color: #666; font-style: italic;">Option compatible avec l'onduleur hybride Solplanet et la batterie modulaire G3. Tarif valable sur installation neuve, détails dans le devis.</p>
        </div>
```

### Étape 3 — Modif `public_html/materiel-panneaux-solaires.html` (15 min)

Mêmes contenus que ci-dessus, **mais en remplaçant systématiquement** :
- `var(--primary-blue)` → `#4fc7ef`
- `var(--primary-orange)` → `#f7941d`
- Pour les titres `h3` / `h4` qui utilisent `var(--primary-blue)` sur index, utiliser `#2a4a5a` (cohérent avec le reste de cette page).

**3.a** — Enrichir la carte Onduleur Solplanet (ligne ~115) : même remplacement que 2.a.

**3.b** — Ajouter la 5e carte « Alternatives haut de gamme » juste avant la fermeture de `.services-grid` (vers ligne ~150). Coller exactement :

```html
            <!-- CARTE 5 : Alternatives haut de gamme SolarEdge / Enphase -->
            <div class="service-card">
                <h3>Alternatives haut de gamme — SolarEdge &amp; Enphase</h3>
                <p><strong>Sur demande, nous proposons également deux références haut de gamme</strong> reconnues pour leur électronique au niveau de chaque panneau (MLPE) et leur monitoring fin.</p>
                <ul style="text-align: left; margin: 1rem 0; padding-left: 1.5rem; color: #555;">
                    <li><strong>SolarEdge</strong> — onduleur central + optimiseurs DC sur chaque panneau, monitoring panneau par panneau, garantie onduleur 12 ans extensible</li>
                    <li><strong>Enphase</strong> — micro-onduleurs IQ8 directement derrière chaque module, pas de courant DC haute tension sur le toit (sécurité), garantie 25 ans sur les micro-onduleurs</li>
                    <li>Pertinent en cas d'ombrages complexes, orientations multiples ou exigence de monitoring détaillé</li>
                    <li>Surcoût matériel par rapport à Solplanet — chiffré dans votre devis personnalisé</li>
                </ul>
                <p style="margin-top: 1rem; color: #777; font-size: 0.9rem; font-style: italic;">Solplanet reste notre standard pour son ratio qualité/prix et sa garantie extensible jusqu'à 25 ans. SolarEdge et Enphase sont proposés sur demande explicite.</p>
            </div>
```

**3.c** — Ajouter le bloc back-up total juste après le bloc Tigo (ligne ~155) et **avant** le bloc « Pourquoi ces marques ». Coller exactement :

```html
        <!-- BLOC OFFRE BACK-UP TOTAL -->
        <div style="max-width: 800px; margin: 2rem auto 0; padding: 1.5rem; background: #eaf7fd; border-radius: 10px; border-left: 4px solid #4fc7ef; position: relative;">
            <div style="position: absolute; top: -14px; left: 20px; background: #4fc7ef; color: white; padding: 0.35rem 0.9rem; border-radius: 20px; font-weight: bold; font-size: 0.8rem;">
                NOUVEAU
            </div>
            <h4 style="color: #2a4a5a; margin-bottom: 0.5rem; margin-top: 0.3rem;">Back-up total — alimentation de secours de la maison</h4>
            <p style="color: #444; line-height: 1.6; margin-bottom: 0.5rem;">En cas de coupure réseau, votre installation peut <strong>alimenter automatiquement l'ensemble de votre tableau électrique</strong> à partir de la batterie — comme un groupe électrogène silencieux et sans entretien. Étude de dimensionnement et câblage spécifique inclus.</p>
            <p style="margin: 0; font-size: 1.05rem; color: #4fc7ef; font-weight: bold;">À partir de 600 € HT</p>
            <p style="margin: 0.4rem 0 0; font-size: 0.85rem; color: #666; font-style: italic;">Option compatible avec l'onduleur hybride Solplanet et la batterie modulaire G3. Tarif valable sur installation neuve, détails dans le devis.</p>
        </div>
```

### Étape 4 — Vérifications (5 min)

```bash
# Solplanet doit rester majoritaire (au moins 6 occurrences entre les 2 pages)
grep -c "Solplanet" public_html/index.html
grep -c "Solplanet" public_html/materiel-panneaux-solaires.html

# SolarEdge et Enphase doivent apparaître chacun 1 fois par page (dans la carte alternative)
grep -c "SolarEdge" public_html/index.html
grep -c "Enphase" public_html/index.html
grep -c "SolarEdge" public_html/materiel-panneaux-solaires.html
grep -c "Enphase" public_html/materiel-panneaux-solaires.html

# Offre back-up : exactement 1 occurrence "600 € HT" par page
grep -c "600 € HT" public_html/index.html
grep -c "600 € HT" public_html/materiel-panneaux-solaires.html

# Badge batterie intact
grep -c "MOINS DE 300 €/kWh" public_html/index.html
grep -c "MOINS DE 300 €/kWh" public_html/materiel-panneaux-solaires.html

# Cohérence balises (div ouvrants = div fermants)
grep -c "<div" public_html/index.html
grep -c "</div>" public_html/index.html
grep -c "<div" public_html/materiel-panneaux-solaires.html
grep -c "</div>" public_html/materiel-panneaux-solaires.html

# IDs critiques préservés
grep -n 'id="materiel"' public_html/index.html
grep -n 'id="materiel"' public_html/materiel-panneaux-solaires.html
grep -n 'id="realisations"' public_html/index.html
grep -n 'id="contact"' public_html/index.html
```

### Étape 5 — Mise à jour table d'avancement (3 min)

1. Lire `SESSIONS-CODE-A-VENIR.md`, localiser la ligne `| Session 6 — Mise à jour catalogue matériel | ✅ **DÉPLOYÉ** | \`PROMPT-SESSION-6.md\` |`.
2. Insérer **juste en dessous** :
   ```
   | Session 6-BIS — Catalogue haut de gamme + offre back-up | ✅ **DÉPLOYÉ** | `PROMPT-SESSION-6-BIS.md` |
   ```
3. Mettre à jour la date d'en-tête : `## État d'avancement (mise à jour 2026-05-19)`
4. Vérifier : `grep -c "Session 6-BIS.*DÉPLOYÉ" SESSIONS-CODE-A-VENIR.md` doit retourner `1`.

### Étape 6 — Commit + push (3 min)

```bash
git add public_html/index.html public_html/materiel-panneaux-solaires.html SESSIONS-CODE-A-VENIR.md
git commit -m "Session 6-BIS : ajout SolarEdge/Enphase (alternatives haut de gamme) + offre back-up 600€ HT"
git push origin main
```

## Livrables attendus

- [ ] `public_html/index.html` : carte onduleur Solplanet enrichie (garantie 10/25 ans) + nouvelle 5e carte « Alternatives haut de gamme SolarEdge & Enphase » + bloc « Back-up total à partir de 600 € HT »
- [ ] `public_html/materiel-panneaux-solaires.html` : mêmes modifications (en hexa)
- [ ] `SESSIONS-CODE-A-VENIR.md` : ligne Session 6-BIS ajoutée, date d'en-tête mise à jour
- [ ] Backups `*.backup-pre-session6bis` créés
- [ ] Commit pushé sur `main`

## Test / vérification

- Solplanet reste cité **avant** SolarEdge/Enphase dans les deux pages (vérifier l'ordre visuel).
- Badge orange « MOINS DE 300 €/kWh » et encart prix dégressif **inchangés** sur la carte batterie.
- La carte « Alternatives haut de gamme » utilise la classe `.service-card` standard (pas de border colorée, pas de badge).
- Le bloc back-up est encadré en bleu clair (`#eaf7fd` fond, `#4fc7ef` bordure gauche) avec badge « NOUVEAU » bleu.
- Le prix « À partir de 600 € HT » apparaît une seule fois par page.
- IDs `id="materiel"`, `id="realisations"`, `id="contact"` toujours présents dans index.html.
- Aucune modification hors section `#materiel`.
- Compteurs `<div>` = `</div>` sur chaque page.

## Interdictions strictes

- ❌ Ne pose AUCUNE question au user.
- ❌ Ne modifie PAS le badge batterie ni l'encart prix dégressif.
- ❌ N'écris JAMAIS « garantie 25 ans » sec pour Solplanet — toujours « 10 ans extensible jusqu'à 25 ans ».
- ❌ N'invente PAS un prix back-up différent de 600 € HT, ni une capacité minimale précise.
- ❌ Ne sépare PAS SolarEdge et Enphase en deux cartes — une seule carte mutualisée « Alternatives haut de gamme ».
- ❌ Ne touche PAS aux autres sections (header, présentation, processus, étude, réalisations, formulaire, contact, footer).
- ❌ Ne crée AUCUNE nouvelle page, ne renomme AUCUN fichier image.
- ❌ Ne refactore PAS le CSS (Sessions 7-8 ont déjà traité ce sujet).
- ❌ N'ajoute PAS de logo / image SolarEdge / Enphase (les logos partenaires sont une action externe Neil pas encore livrée — cf. ACTIONS-NEIL.md case #1).

## En cas de blocage

1. Diagnostique
2. Tente 2 solutions
3. Si bloqué sur UNE tâche, passe à la suivante et liste dans le rapport
4. NE STOPPE PAS pour poser une question

## Format du rapport final (markdown plain)

```markdown
## Rapport Session 6-BIS

### Résumé
[2-3 lignes : ce qui a été ajouté + impact commercial attendu]

### Fichiers modifiés (chemins absolus)
- /Users/.../public_html/index.html — carte onduleur enrichie + carte 5 alternatives + bloc back-up
- /Users/.../public_html/materiel-panneaux-solaires.html — idem (en hexa)
- /Users/.../SESSIONS-CODE-A-VENIR.md — ligne Session 6-BIS ajoutée

### Décisions prises pendant le code
[ex : emplacement exact du bloc back-up, formulation finale de la mention garantie, etc.]

### Vérifications passées
- grep Solplanet (index / page matériel) : X / Y occurrences
- grep SolarEdge : 1 / 1
- grep Enphase : 1 / 1
- grep "600 € HT" : 1 / 1
- grep "MOINS DE 300 €/kWh" : 1 / 1 (inchangé)
- <div> vs </div> index.html : X = X ✅
- <div> vs </div> materiel-panneaux-solaires.html : X = X ✅
- IDs critiques préservés : OK

### Points en suspens
[ex : si Neil veut ajouter logos SolarEdge/Enphase plus tard, à faire en Session ultérieure]

### Git
- Branche : main
- Commit : [hash + message]
- Pushé : oui

### À faire côté Neil
1. Téléverser sur Hostinger : public_html/index.html et public_html/materiel-panneaux-solaires.html
2. Vider le cache Hostinger (hPanel → Vider le cache)
3. Vérifier sur https://blueenergie.fr/#materiel :
   - La 5e carte « Alternatives haut de gamme » apparaît bien après la carte K2
   - Solplanet est toujours présenté avant SolarEdge/Enphase
   - Le bloc « Back-up total — à partir de 600 € HT » s'affiche bien en bleu avec badge « NOUVEAU »
   - Le badge « MOINS DE 300 €/kWh » et l'encart prix dégressif sont intacts
4. Idem sur https://blueenergie.fr/materiel-panneaux-solaires.html

### Prochaine étape suggérée
[ex : Session 17 (avis Google) si Place ID + clé API prêts, sinon Session 22 (3e article blog)]
```

## === FIN PROMPT ===

---

## Notes hors prompt (pour Neil / superviseur)

- **Tarification back-up 600 € HT à valider** : Neil a annoncé ce prix mais on n'a pas figé ce qu'il couvre exactement (matériel ATS ? câblage ? étude ? le tout ?). Le prompt formule prudemment « étude de dimensionnement et câblage spécifique inclus » sans détailler le matériel — à revoir si la définition précise change.
- **Garantie 25 ans Solplanet** : confirmer l'existence du programme d'extension Solplanet (a priori OUI, format payant ou inclus selon distributeur). Si Neil découvre que la garantie 25 ans n'est pas tenable, retirer la mention en Session ultérieure (modif d'une seule ligne).
- **Logos SolarEdge / Enphase** : pas intégrés dans cette session (pas d'image fournie). À ajouter quand Neil dépose les logos officiels dans `_dropzone/` — Session future dédiée « logos partenaires » (cf. ACTIONS-NEIL.md case #1).
- **Risque d'inflation du discours commercial** : on ajoute « alternatives haut de gamme » + « back-up total » + « NOUVEAU ». Si la section commence à ressembler à une brochure de supermarché, prévoir une mini-session de rééquilibrage typographique en J+15.
- **Page mentions légales / CGV** : pas impactée. Le back-up est une option commerciale, pas une garantie légale nouvelle, donc pas de mise à jour CGV nécessaire à ce stade.
- **Cohérence sitemap.xml** : aucune nouvelle URL → pas de mise à jour sitemap nécessaire.
