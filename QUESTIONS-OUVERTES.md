# Questions ouvertes — refonte blueenergie.fr

> Tout ce dont j'ai besoin de toi pour pouvoir produire les sessions de code sans bloquer. Classé par criticité et par session concernée. Tu peux répondre au fil de l'eau, je rangerai les réponses ici.

---

## 🔴 BLOQUANT pour démarrer

### Q1. Hébergement du site
**Pourquoi** : obligatoire pour les mentions légales (LCEN art. 6) + utile pour configurer redirections, sous-domaines, accès FTP.
**À me dire** :
- Nom de l'hébergeur (Hostinger, OVH, o2switch, Infomaniak…)
- Hébergement mutualisé ou VPS ?
- Tu as un accès FTP/SFTP ou un panel d'admin uniquement ?
- Le site est-il en HTTPS sous certificat Let's Encrypt ou autre ?
- Version PHP supportée (pour le fichier `redirect/index.php`)
**Concerne** : Session 4 (mentions légales), Session 17 (endpoint PHP avis Google)

---

### Q2. Numéro RGE QualiPV exact
**Pourquoi** : obligation d'affichage pour bénéficier des aides aux clients + argument de confiance majeur.
**À me dire** : le numéro RGE exact (format type `QPV/XXXXX`), date de validité, organisme certificateur (QualitEnR ?).
**Concerne** : Session 4, Session 18

---

### Q3. N° TVA intracommunautaire
**Pourquoi** : obligatoire en mentions légales pour une SAS.
**À me dire** : `FR + 11 chiffres`
**Concerne** : Session 4

---

### Q4. Confirmation Place ID Google Business Profile
**Pourquoi** : sans Place ID, l'API Google Places ne sait pas quels avis remonter.
**À me dire** :
- La fiche Google Business Blue Energie existe ?
- Si oui : son Place ID (le récupérer via https://developers.google.com/maps/documentation/places/web-service/place-id)
- Si non : il faut la créer avant la Session 17
**Concerne** : Session 17

---

## 🟠 IMPORTANT — à confirmer avant les sessions concernées

### Q5. Les réalisations « Mylight » doivent-elles rester ?
**Contexte** : le site actuel cite « Mylight Crystal 400Wc » et « Mylight bifaciaux 425Wc » dans 2 cartes de réalisations. Tu ne travailles plus avec Mylight (catalogue actuel = JA Solar + Solplanet).
**Option A** : garder ces réalisations comme historique (cohérent si ces chantiers existent vraiment)
**Option B** : les retirer ou les renommer (plus cohérent avec l'offre actuelle)
**Concerne** : Session 7

---

### Q6. Aurais-tu des photos « avant/après » de chantiers réels ?
**Contexte** : la galerie actuelle utilise probablement des photos de stock ou IA. Pour la crédibilité, des photos réelles de tes installations sont 10× plus puissantes.
**À me fournir** : 5-10 photos HD de chantiers réels (extérieur toiture + intérieur coffret/onduleur), avec accord client si visage/adresse identifiable.
**Concerne** : Session 7, Session 12 (page réalisations)

---

### Q7. Témoignage REGHEM utilisable ?
**Contexte** : un témoignage client réel avec prénom, ville et photo (ou logo maison) serait un atout énorme. REGHEM (Archamps 74) est un cas exemplaire.
**À demander à Thibault REGHEM** :
- Autorisation de citer son installation (puissance, lieu approximatif)
- Une phrase courte de retour d'expérience
- Idéalement : photo du chantier
**Concerne** : Session 18 (preuve sociale), Session 20 (article blog)

---

### Q8. Logos partenaires
**À me fournir** :
- Logo JA Solar (SVG ou PNG haute déf)
- Logo Solplanet
- Logo K2 Systems
- Logo Tigo
- Logo RGE QualiPV
- Logo QualitEnR
**Source** : sites officiels des marques (presskit), ou tes contacts commerciaux
**Concerne** : Session 6, Session 18

---

### Q9. Compte hCaptcha
**Action côté toi** : créer un compte gratuit sur https://www.hcaptcha.com/ → créer un site → récupérer la **sitekey** et la **secret key**.
**Concerne** : Session 10

---

### Q10. Clé Google Places API
**Action côté toi** :
1. Aller sur https://console.cloud.google.com/
2. Créer un projet « Blue Energie Site »
3. Activer l'API « Places API » (et « Geocoding API » au cas où)
4. Créer une clé API
5. La **restreindre par référent HTTP** : `https://blueenergie.fr/*` (sécurité)
6. Vérifier la facturation (gratuit jusqu'à 1000 appels/mois pour Places)
**À me fournir** : la clé API + le Place ID Blue Energie (cf. Q4)
**Concerne** : Session 17

---

### Q11. Email contact dédié
**Constat** : l'email exposé aujourd'hui est `neil.lothian@blueenergie.fr` (personnel). À remplacer par un alias générique pour préserver ton inbox perso.
**Action côté toi** : créer chez ton hébergeur l'alias `contact@blueenergie.fr` (redirige vers ta vraie boîte ou est lu directement).
**Concerne** : Session 10 (refonte formulaire), Session 4 (mentions légales)

---

### Q12. Validation des 10 villes pour pages géo
**Liste proposée** : Annecy, Annemasse, Thonon-les-Bains, La Roche-sur-Foron, Cluses (74) + Chambéry, Aix-les-Bains, Albertville (73) + Bourg-en-Bresse (01) + Grenoble (38).
**À me dire** :
- Tu interviens vraiment dans toutes ces villes ?
- Faut-il en ajouter (Évian, Bonneville, Sallanches, etc.) ou en retirer ?
- Tu acceptes des chantiers à Grenoble (2h de route depuis Savigny) ?
**Concerne** : Session 16

---

## 🟡 À CONFIRMER quand on y arrivera

### Q13. Stockage des cas clients dans le repo
**Question** : faut-il préciser dans le repo public (`public_html/`) si on y stocke des PDF de témoignages ? Ou ces docs restent dans le dossier interne BET ?
**Concerne** : Session 12, Session 20

---

### Q14. Page « À propos » / « Notre équipe »
**Pas dans le plan actuel** : on n'a pas prévu de page équipe. Tu veux qu'on en ajoute une (présentation Neil + photo + parcours) ? Bon pour la confiance.
**Concerne** : éventuellement à ajouter en P2

---

### Q15. Multi-langue ?
**Contexte** : zone frontalière Suisse (Genevois). Des Suisses francophones peuvent regarder, OK le français suffit. Mais Anglais (résidents internationaux) ?
**Réponse par défaut** : on reste en français seul.

---

### Q16. Avis négatifs Google
**Question** : si la fiche GBP existe et qu'il y a des avis négatifs, on les affiche aussi ? Ou on filtre côté serveur pour ne garder que les ≥ 4 étoiles ?
**Recommandation pro** : afficher TOUT (la transparence rassure, le filtrage se voit). Mais à confirmer avec toi.
**Concerne** : Session 17

---

### Q17. Auteur des articles blog
**Question** : Neil signe en propre, ou « équipe Blue Energie » ? Avoir un auteur identifié humanise et améliore EEAT (Google).
**Concerne** : Sessions 20-22

---

### Q18. Calculateur d'aides dynamique
**Wireframe page aides** : on prévoit un simulateur simple. Tu veux quel niveau de précision ?
- Niveau 1 : juste les fourchettes par puissance
- Niveau 2 : intégrer revenus pour MaPrimeRénov' (plus complexe)
- Niveau 3 : un vrai pré-devis (puissance + prix + aides + ROI)
**Concerne** : Session 13

---

### Q19. Réseaux sociaux
**Question** : Blue Energie a-t-elle des comptes (Facebook, Instagram, LinkedIn) à lier dans le footer ?
**Concerne** : tous

---

### Q20. Suivi analytics avancé
**Question** : tu veux qu'on aille plus loin que GA4 (Microsoft Clarity pour heatmaps gratuits, par exemple) ?
**Recommandation** : Clarity gratuit + RGPD-compatible, très utile pour comprendre où les visiteurs cliquent / s'arrêtent.
**Concerne** : à ajouter en Session 5 si OK

---

## ✅ Résolu (gardé en historique)

| # | Sujet | Réponse |
|---|---|---|
| - | Stack technique | HTML/CSS/JS pur, fichiers séparés (validé 17/05) |
| - | Zone d'intervention SEO | 74+73+01+38 (validé 17/05) |
| - | Matériel standard | JA Solar + Solplanet + K2 + Tigo (option) — validé 17/05 |
| - | Avis Google | Intégration dynamique (validé 17/05) |
| - | Devis REGHEM | Lu et analysé (17/05) |
| - | SIRET / forme juridique | SAS 882 483 274, capital 18 000 € (extrait fiche-client REGHEM) |
| - | Adresse siège | 11 Chemin de Perouza, 74520 Savigny (idem) |
| - | Représentant légal | Neil Lothian, Président (idem) |
| - | Tél | 07 61 50 43 85 (idem) |
| Q1 | Hébergeur | **Hostinger** (validé 17/05) — accès FTP/SFTP à confirmer si besoin Session 17 |
| Q2 | RGE | ✅ **OUI, RGE QualiPV actif** (validé 17/05). Numéro **non divulgué publiquement** (préférence client). On affiche le **logo QualiPV** uniquement : `public_html/images/logo-qualipv.png` (fourni par Neil via `_dropzone`). Les mentions d'aides (MaPrimeRénov', CEE…) restent donc valides sur le site. Le numéro RGE pourra être communiqué à la demande (par email) si un prospect en a besoin pour son dossier d'aide. |
| Q3 | TVA intra | ✅ **`FR25882483274`** (validé 17/05). Format conforme : FR + clé 25 + SIREN 882483274. À afficher tel quel dans la page mentions légales (Session 4). À vérifier une dernière fois sur VIES avant publication : https://ec.europa.eu/taxation_customs/vies/ |
| Q4 | Place ID Google Business | ✅ **`ChIJHUKhFuCfDykRkkLTeN-wm3c`** (validé 17/05). Fiche : Blue Energie, 11 Chem. de Perouza, 74520 Savigny, France. À utiliser dans l'appel à l'API Google Places lors de la Session 17 (`places/ChIJHUKhFuCfDykRkkLTeN-wm3c`). |
| Q5 | Réalisations Mylight | ✅ **Renommer en gardant les photos** (validé 17/05). On garde les 2 visuels (chantiers réels) mais on retire toute mention de marque « Mylight ». À renommer en termes génériques : « Panneaux full-black 400 Wc sur toiture asymétrique » et « Panneaux bifaciaux 425 Wc sur toit provençal ». À appliquer en Session 7 (refonte réalisations) + renommage des fichiers `images/Mylight-*.webp` → `images/realisation-fullblack-400wc.webp` et `images/mylight-bifaciaux-425Wc-*.webp` → `images/realisation-bifaciaux-425wc.webp` (avec mise à jour des références HTML/CSS). |
| Q6 | Photos chantiers réels | ⏳ **À déposer dans `_dropzone/`** (validé 17/05). Neil va y mettre 5-10 photos HD. Format attendu : toiture extérieur + coffret/onduleur intérieur. Métadonnées attendues côté Neil (ville approx, année, matériel posé) à transmettre en chat au moment du dépôt. À intégrer dans la galerie Session 7 et la page réalisations Session 12. Si rien déposé d'ici Session 7 → on code avec placeholders, remplacement plus tard. |
| Q7 | Témoignage REGHEM | ✅ **Non utilisé** (validé 17/05). Pas de témoignage nominal sur le site. La preuve sociale viendra **exclusivement des avis Google** intégrés via l'API Places en Session 17 (Place ID `ChIJHUKhFuCfDykRkkLTeN-wm3c`). Avantage : 100% authentique, 0% friction client, mise à jour automatique. |
| Q12 | Villes SEO (Session 16) | ✅ **15 pages géolocalisées** (validé 17/05). Structure en 3 tiers : **(A) 5 villes hub** (contenu riche 600-800 mots, photos, témoignage local, étude de cas) : Annecy, Annemasse, Saint-Julien-en-Genevois, Chambéry, La Roche-sur-Foron. **(B) 6 villages hyperlocaux Genevois** (contenu court 300-400 mots, mention spécificités locales : architecture, exposition, urbanisme) : Vers, Vulbens, Valleiry, Archamps, Feigères, Crusseilles. **(C) 4 villes secondaires** (contenu moyen 400-500 mots) : Thonon-les-Bains, Aix-les-Bains, Cluses, Bonneville. Grenoble et Albertville **retirés** (trop loin / concurrence trop forte). URL pattern proposé : `/installateur-panneau-solaire-{ville-slug}.html`. |
| Q11 | Email contact | Reste `neil.lothian@blueenergie.fr` (validé 17/05) — risque spam noté, mais c'est le choix du client |

---

## Prochaine action attendue de toi (état 2026-05-17)

✅ Sessions 1, 2, 3, 6 et Blog déployées.

**Pour débloquer Session 4 (mentions légales)** :
- ✅ RGE : confirmé (logo QualiPV intégré, numéro privé sur demande)
- ⏳ TVA intra : autoriser la nouvelle session à la récupérer via VIES (SIREN 882483274)

**Pour débloquer Session 18 (bandeau confiance)** :
- ✅ Logo QualiPV : déjà dans `public_html/images/logo-qualipv.png`
- Reste à fournir (via `_dropzone/`) : logos JA Solar, Solplanet, K2, Tigo, QualitEnR si possible

**Pour débloquer Session 17 (avis Google)** :
- Q4 + Q10 : créer GBP si pas fait + clé Google Places API + Place ID

**Pour débloquer Session 10 (formulaire + captcha)** :
- Q9 : créer un compte hCaptcha et fournir la sitekey
