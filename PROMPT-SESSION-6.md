# Prompt Session 6 — pour Claude Code

> **Mise à jour du catalogue matériel : JA Solar / Solplanet / K2 / Tigo.**
> Le dev doit travailler ~1,5 h sans poser de questions.
> Toutes les décisions sont prises ci-dessous.

---

## Mode d'emploi (côté Neil)

1. Ouvre un terminal
2. `cd "/Users/neillothian/Documents/Claude/Projects/blueenergie.fr"`
3. Lance Claude Code : `claude`
4. Copie-colle tout ce qui est entre `=== DÉBUT PROMPT ===` et `=== FIN PROMPT ===`
5. Laisse tourner. Tu reçois le rapport à la fin.

---

## === DÉBUT PROMPT ===

Tu es développeur web senior. Tu travailles sur le site **blueenergie.fr** (installation de panneaux photovoltaïques en Haute-Savoie). Stack : HTML/CSS/JS pur. Hébergement Hostinger.

Les **Sessions 1+2+3 sont DÉJÀ déployées** : DOCTYPE/lang corrigés, page /merci.html créée, carte OpenStreetMap intégrée. Tu travailles maintenant sur la **Session 6 : mise à jour du catalogue matériel**.

## Ta mission

Aligner le site avec le matériel **réellement** proposé en 2026 (catalogue commercial actuel). Le site mentionne aujourd'hui SolarEdge / Mylight / Esdec, qui sont **obsolètes**. Tous les devis 2025/2026 utilisent maintenant : **JA Solar / Solplanet / K2 / Tigo**.

Ajouter un **argument commercial fort** : batterie Solplanet à **moins de 300 €/kWh** (alors que le marché résidentiel est à 500-800 €/kWh). C'est un différenciateur prix majeur à valoriser visuellement.

Durée estimée : 1,5 heure. Autonomie totale. Aucune question au user.

## Workflow obligatoire

### Étape 0 — Initialisation (5 min)

1. Crée une todo list interne avec TodoWrite (6 tâches : réécriture section matériel, retrait iframes YouTube, encart batterie < 300 €/kWh, mise à jour cartes réalisations, suppression mentions obsolètes, validation finale)
2. Sauvegarde : `cp public_html/index.html public_html/index.html.backup-pre-session6`
3. Si git init, snapshot : `git add -A && git commit -m "snapshot avant session 6" || true`

### Étape 1 — Lecture contexte (10 min)

Lis dans cet ordre :
1. `public_html/index.html` (section `#materiel` lignes ~775-813 et section `#realisations` lignes ~815-874)
2. `WIREFRAMES-PAGES.md` — uniquement section « 3. materiel-panneaux-solaires.html » pour comprendre l'angle voulu
3. (Optionnel) `~/Documents/Claude/Projects/1 Clients /reghem 74/fiche-client.md` si tu as accès au dossier client — sinon, toutes les références matériel exactes sont déjà fournies dans ce prompt

Ne lis pas les autres .md.

### Étape 2 — Réécriture section `#materiel` (40 min)

Dans `public_html/index.html`, localise la section `<section class="section" id="materiel">` et **remplace TOUT son contenu** par 4 cartes principales + 1 carte option, dans cette structure :

```
<section class="section" id="materiel">
    <h2 class="section-title">Le matériel que nous installons</h2>

    <div class="study-intro" style="margin-bottom: 3rem;">
        <p>Nous avons sélectionné les marques qui offrent le meilleur ratio fiabilité / garantie / performance pour le climat alpin. Tout notre matériel est garanti et installé par notre équipe certifiée.</p>
    </div>

    <div class="services-grid">

        <!-- CARTE 1 : Modules JA Solar -->
        <div class="service-card">
            <h3>Modules photovoltaïques — JA Solar 500 W bifacial</h3>
            <p><strong>Technologie bifaciale type N</strong> : capte la lumière des deux faces, gain de production de 5 à 10 % par rapport aux panneaux classiques.</p>
            <ul style="text-align: left; margin: 1rem 0; padding-left: 1.5rem; color: #555;">
                <li>Puissance unitaire : 500 Wc</li>
                <li>Rendement élevé, performances optimales par faible luminosité</li>
                <li>Résistance neige et grêle adaptée au climat alpin</li>
                <li>Garantie produit 12 ans, garantie performance 25 ans</li>
                <li>Certification PPE2 (éligible aux aides françaises)</li>
            </ul>
        </div>

        <!-- CARTE 2 : Onduleur Solplanet -->
        <div class="service-card">
            <h3>Onduleur hybride — Solplanet ASW-H S2</h3>
            <p><strong>Onduleur hybride intelligent</strong> avec gestion intégrée de la batterie et fonction backup en cas de coupure réseau.</p>
            <ul style="text-align: left; margin: 1rem 0; padding-left: 1.5rem; color: #555;">
                <li>Gamme : 5, 6, 8, 10 kVA — monophasé ou triphasé</li>
                <li>Application mobile pour suivre votre production en temps réel</li>
                <li>Certification EN 50549-1 (norme européenne raccordement réseau)</li>
                <li>Isolation galvanique pour une sécurité maximale</li>
                <li>Garantie constructeur étendue jusqu'à 10 ans</li>
            </ul>
        </div>

        <!-- CARTE 3 : Batterie Solplanet — AVEC ARGUMENT PRIX -->
        <div class="service-card" style="border: 3px solid var(--primary-orange); position: relative;">
            <div style="position: absolute; top: -18px; right: 15px; background: var(--primary-orange); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-weight: bold; font-size: 0.85rem; line-height: 1.2; text-align: center;">
                MOINS DE 300 €/kWh<br><span style="font-weight: normal; font-size: 0.75rem;">à partir de 10 kWh installés</span>
            </div>
            <h3>Batterie modulaire — Solplanet G3</h3>
            <p><strong>Stockez votre production solaire pour la consommer le soir.</strong> Système modulaire : vous commencez avec la capacité dont vous avez besoin et vous pouvez l'augmenter plus tard.</p>
            <div style="background: #fff8f0; border-left: 3px solid var(--primary-orange); padding: 0.8rem 1rem; margin: 1rem 0; text-align: left;">
                <p style="margin: 0; font-size: 0.95rem; color: #333; line-height: 1.5;"><strong>Prix dégressif selon la capacité :</strong><br>
                342 €/kWh pour 5 kWh — <strong>300 €/kWh dès 10 kWh</strong> — encore moins au-delà.<br>
                Soit <strong>2× moins cher que la moyenne du marché</strong> (500-800 €/kWh).</p>
            </div>
            <ul style="text-align: left; margin: 1rem 0; padding-left: 1.5rem; color: #555;">
                <li>Modules de 5,12 kWh empilables (jusqu'à plusieurs modules)</li>
                <li>Garantie constructeur 10 ans</li>
                <li>Pilotage natif par l'onduleur Solplanet</li>
                <li>Sectionneur de sécurité et BMS intégrés</li>
            </ul>
        </div>

        <!-- CARTE 4 : Structure K2 -->
        <div class="service-card">
            <h3>Structure de pose — K2 Systems (Allemagne)</h3>
            <p><strong>Matériel allemand haut de gamme</strong> adapté à tous types de toitures : tuile mécanique, ardoise, bac acier, toit plat lesté, toit goudronné.</p>
            <ul style="text-align: left; margin: 1rem 0; padding-left: 1.5rem; color: #555;">
                <li>Étude technique de résistance spécifique à chaque projet</li>
                <li>Assurance décennale K2 incluse en plus de la nôtre</li>
                <li>Aluminium recyclable, durabilité prouvée 25 ans+</li>
                <li>Fixations adaptées à la neige et au vent alpins</li>
            </ul>
            <p style="margin-top: 1rem;"><a href="https://k2-systems.com/fr/solutions-produits/" target="_blank" rel="noopener noreferrer" style="color: var(--primary-blue); font-weight: 500;">En savoir plus sur K2 Systems →</a></p>
        </div>

    </div>

    <!-- BLOC OPTION : optimiseurs Tigo -->
    <div style="max-width: 800px; margin: 3rem auto 0; padding: 1.5rem; background: #f9f9f9; border-radius: 10px; border-left: 4px solid var(--primary-blue);">
        <h4 style="color: var(--primary-blue); margin-bottom: 0.5rem;">En option : optimiseurs Tigo TS4</h4>
        <p style="color: #555; line-height: 1.6;">Si votre toiture présente des zones d'ombrage partiel ou plusieurs orientations, nous proposons en option les optimiseurs <strong>Tigo TS4 universels</strong> qui pilotent chaque panneau individuellement et maximisent la production de chaque module. Cette option n'est recommandée qu'en cas de réelle nécessité technique — nous vous conseillons en fonction de votre projet.</p>
    </div>

    <!-- BLOC POURQUOI CES MARQUES -->
    <div style="max-width: 900px; margin: 3rem auto 0; padding: 2rem; background: white; border-radius: 10px; box-shadow: 0 4px 6px rgba(79,199,239,0.2);">
        <h3 style="color: var(--primary-blue); margin-bottom: 1rem;">Pourquoi avoir choisi ces marques ?</h3>
        <p style="text-align: left; line-height: 1.7; color: #444;">Nous avons comparé des dizaines de fabricants avant de retenir cette sélection. Trois critères ont guidé notre choix : la <strong>fiabilité éprouvée sur plusieurs années</strong>, des <strong>garanties longues et clairement opposables au fabricant</strong>, et un <strong>positionnement prix juste</strong> qui ne sacrifie pas la qualité. Tous nos partenaires sont reconnus sur le marché européen et bénéficient d'un service après-vente réactif. Vous achetez du matériel certifié, traçable, et conçu pour durer 25 ans et plus.</p>
    </div>
</section>
```

**Important** :
- Ne **modifie pas** la balise `<section>` ouvrante ni sa fermeture `</section>` (juste le contenu intérieur)
- Ne supprime pas l'ID `id="materiel"` (les ancres de menu en dépendent)
- Garde la cohérence avec les autres `.service-card` existantes du site (style identique)

### Étape 3 — Retrait des iframes YouTube obsolètes (5 min)

Les 4 iframes YouTube actuelles pointent vers SolarEdge et K2 — elles deviennent caduques avec le nouveau contenu. Les **supprimer toutes** dans la section `#materiel` (elles sont déjà gérées par le remplacement complet du contenu ci-dessus, donc cette étape est juste une vérification).

Laisser un commentaire HTML là où on pourrait réintégrer des vidéos plus tard :
```html
<!-- TODO Session future : ajouter vidéos JA Solar et Solplanet quand disponibles -->
```

### Étape 4 — Mise à jour des cartes Réalisations (20 min)

Dans la section `<section class="section" id="realisations">` (lignes ~815-874), modifie **uniquement** ces deux cartes qui mentionnent « Mylight » :

**Carte 5 (Mylight Crystal 400Wc)** → remplacer par :
```html
<div class="realisation-card">
    <img src="images/Mylight-crystal-400wc-sur-toiture-asymetrique.webp"
         alt="Installation panneaux haute performance sur toiture asymétrique"
         width="300" height="250" loading="lazy">
    <h3>Toiture asymétrique optimisée</h3>
    <p>Installation de panneaux haute performance sur toiture asymétrique, maximisant la surface disponible et la production solaire annuelle.</p>
</div>
```

**Carte 7 (Panneaux Bifaciaux sur Toit Provençal)** → remplacer par :
```html
<div class="realisation-card">
    <img src="images/mylight-bifaciaux-425Wc-sur-toit-provencal.webp"
         alt="Panneaux bifaciaux sur toiture provençale"
         width="300" height="250" loading="lazy">
    <h3>Panneaux bifaciaux haute performance</h3>
    <p>Installation de panneaux bifaciaux nouvelle génération parfaitement intégrés sur une toiture traditionnelle provençale, avec gain de production grâce à la captation arrière.</p>
</div>
```

**Important** : on ne renomme PAS les fichiers images (trop de risques de casser autre chose) — on change juste le texte des cartes. Les noms de fichiers WebP restent identiques.

Pour les **5 autres cartes** de réalisations, ajoute simplement l'attribut `loading="lazy"` sur leur `<img>` (gain de perf, pas de risque).

### Étape 5 — Validation finale (10 min)

1. **Vérifier qu'aucune mention obsolète ne subsiste** :
   ```bash
   grep -ni "solaredge" public_html/index.html
   grep -ni "esdec" public_html/index.html
   grep -ni "mylight" public_html/index.html
   ```
   Les 3 commandes doivent retourner **0 résultat** (sauf les noms de fichiers WebP que tu ne touches pas — vérifie que les seuls résultats `mylight` sont dans des `src="images/..."`).

2. **Vérifier la cohérence balises** :
   ```bash
   grep -c "<div" public_html/index.html
   grep -c "</div>" public_html/index.html
   ```
   Les deux nombres doivent être égaux.

3. **Vérifier que les sections critiques sont intactes** :
   ```bash
   grep -n 'id="materiel"' public_html/index.html
   grep -n 'id="realisations"' public_html/index.html
   grep -n 'id="contact"' public_html/index.html
   grep -n 'id="study-request"' public_html/index.html
   ```
   Chaque commande doit retourner **1 résultat** (les IDs existent toujours).

4. **Validation HTML W3C** :
   ```bash
   curl -s -H "Content-Type: text/html; charset=utf-8" --data-binary @public_html/index.html "https://validator.w3.org/nu/?out=json" | head -100
   ```
   Logger le nombre d'erreurs / warnings.

5. **Si git init**, commit :
   ```bash
   git add -A && git commit -m "Session 6: catalogue matériel JA Solar / Solplanet / K2 / Tigo + argument batterie < 300€/kWh"
   ```

## Décisions déjà prises (ne demande RIEN)

| Sujet | Décision |
|---|---|
| Marques à intégrer | JA Solar (modules) + Solplanet (onduleur + batterie) + K2 (structure) + Tigo (option) |
| Argument batterie | « Moins de 300 €/kWh à partir de 10 kWh installés » — badge orange + encart prix dégressif (342 € / 300 € / moins) |
| Comparaison marché | « 2× moins cher que la moyenne du marché (500-800 €/kWh) » — chiffres validés par le client Neil le 17/05/2026 |
| Vidéos YouTube SolarEdge | Supprimées sans remplacement (commentaire TODO laissé) |
| Photos réalisations Mylight | Conservées, mais texte des cartes neutralisé (plus de mention Mylight) |
| Renommage fichiers images | NON, on ne touche pas aux noms de fichiers WebP (risque de casser le site) |
| Liens externes nouveaux | Seul K2 conserve son lien (jasolar.com, solplanet.net, tigoenergy.com pas ajoutés pour ne pas alourdir) |
| Garanties annoncées | JA Solar 25 ans perf / Solplanet onduleur 10 ans / Solplanet batterie 10 ans / K2 25 ans+ |
| Encart "Pourquoi ces marques" | Ajouté en fin de section, ton commercial mais sobre |
| Lazy-loading images | Ajouté sur cartes réalisations seulement (gain perf, pas de risque) |

## Interdictions strictes

- ❌ Ne touche PAS au reste du site (header, présentation, processus, étude, formulaire, contact, footer)
- ❌ Ne crée AUCUNE nouvelle page
- ❌ Ne renomme PAS les fichiers images (juste leur attribut alt si nécessaire)
- ❌ Ne touche PAS aux fichiers `css/style.css` ni `js/script.js` orphelins
- ❌ N'ajoute PAS de JSON-LD ou Schema.org (Session 14)
- ❌ N'ajoute PAS de tracking GA4 supplémentaire
- ❌ Ne refactore PAS le CSS existant (Session 7-8)
- ❌ Ne pose AUCUNE question au user

## En cas de blocage

Si une erreur survient :
1. Diagnostique
2. Tente 2 solutions
3. Si toujours bloqué sur UNE tâche, passe à la suivante et liste le blocage dans le rapport
4. NE STOPPE PAS pour poser une question intermédiaire

## Format du rapport final

```markdown
# Session 6 — Terminé

## Modifications appliquées

### Section #materiel (réécriture complète)
- [x] Carte 1 : Modules JA Solar 500 W bifacial
- [x] Carte 2 : Onduleur Solplanet ASW-H S2
- [x] Carte 3 : Batterie Solplanet G3 + badge "< 300 €/kWh à partir de 10 kWh" + encart prix dégressif (342/300/moins)
- [x] Carte 4 : Structure K2 Systems
- [x] Bloc option : Optimiseurs Tigo TS4
- [x] Bloc "Pourquoi ces marques"
- [x] Vidéos YouTube SolarEdge supprimées

### Section #realisations
- [x] Carte "Mylight Crystal 400Wc" → "Toiture asymétrique optimisée"
- [x] Carte "Panneaux Bifaciaux Mylight" → "Panneaux bifaciaux haute performance"
- [x] loading="lazy" ajouté sur les N images de la grille

## Vérifications
- grep "solaredge" : 0 résultat
- grep "esdec" : 0 résultat
- grep "mylight" : X résultats (uniquement dans src="images/...", attendu)
- Balises <div> vs </div> : OK
- IDs critiques préservés : materiel, realisations, contact, study-request — tous présents
- Validation W3C : X erreurs / X warnings

## Fichiers modifiés
- public_html/index.html (sections #materiel et #realisations)
- public_html/index.html.backup-pre-session6 (sauvegarde)
- Git commit : oui/non

## À faire côté toi (Neil)
1. Téléverser sur Hostinger : public_html/index.html
2. Vider le cache Hostinger (hPanel → Tableau de bord → Vider le cache)
3. Ouvrir https://blueenergie.fr/#materiel et vérifier visuellement :
   - Les 4 cartes JA Solar / Solplanet / Batterie / K2 s'affichent
   - Le badge orange "MOINS DE 300 €/kWh — à partir de 10 kWh installés" est bien visible sur la batterie
   - L'encart prix dégressif (342 €/kWh à 5 kWh, 300 €/kWh à 10 kWh) s'affiche en fond orange clair
   - La carte option Tigo apparaît en dessous
   - Plus aucune mention SolarEdge / Mylight / Esdec
4. Vérifier les cartes réalisations : ne mentionnent plus "Mylight"

## Prochaines sessions disponibles
- Session 4 : mentions légales (besoin RGE confirmé)
- Session 5 : bandeau cookies tarteaucitron (autonome)
- Session 7 : refactor technique (CSS/JS externes, perf, favicon)
- Session 17 : intégration avis Google (besoin Place ID + clé API)

## Blocages éventuels
(vide si tout OK, sinon détailler ici)
```

## === FIN PROMPT ===

---

## Notes hors prompt (pour Neil)

**Aperçu du résultat attendu** sur la section matériel :
- 4 cartes alignées dans une grille
- La carte batterie a **un cadre orange + un badge "MOINS DE 300 €/kWh"** qui se voit immédiatement
- Tous les textes sont commerciaux mais sobres, pas survendus
- L'option Tigo apparaît en dessous dans un encart plus discret
- Un bloc "Pourquoi ces marques" clôt la section (rassurance)

**Si l'argument prix batterie est faux** : préviens-moi immédiatement après le déploiement. La mention « moins de 300 €/kWh » a un poids commercial fort et engage ta crédibilité — il faut que ce soit défendable face à un client.

**Pour la Session suivante** : je recommande **Session 18 (bandeau de confiance RGE + décennale)** pour finaliser la crédibilité, ou **Session 17 (avis Google)** si tu as déjà ta fiche Google Business + clé API. Reviens avec le rapport et on enchaîne.
