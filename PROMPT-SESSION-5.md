# Prompt Session 5 — pour Claude Code

> **Bandeau cookies tarteaucitron + GA4 conditionné au consentement.**
> Périmètre strict : intégration tarteaucitron.js + retrait du tag GA4 inline + remplacement par chargement conditionnel + lien « Gérer mes cookies » dans le footer.
> Durée estimée : 1 h 30. Le dev travaille seul, sans poser de questions.

---

## Mode d'emploi (côté Neil)

1. Ouvre un terminal
2. `cd "/Users/neillothian/Documents/Claude/Projects/blueenergie.fr"`
3. Lance Claude Code : `claude`
4. Copie-colle tout ce qui est entre `=== DÉBUT PROMPT ===` et `=== FIN PROMPT ===`
5. Laisse tourner ~1 h 30. Rapport final à la fin.

---

## === DÉBUT PROMPT ===

Tu es développeur web senior + expert RGPD côté cookies / tracking. Tu travailles sur **blueenergie.fr** (installation photovoltaïque résidentielle en Haute-Savoie). Stack : HTML/CSS/JS pur. Hébergement Hostinger.

Les **Sessions 1+2+3+4+6+Blog sont déjà déployées** : bugs corrigés, page /merci.html, carte OSM, catalogue matériel JA Solar/Solplanet/K2, blog (hub + 2 articles), 3 pages légales avec footer enrichi.

Aujourd'hui : Google Analytics 4 (`G-JEG722VJTV`) est chargé **inconditionnellement** dans le `<head>` des 8 pages. Ce n'est PAS conforme RGPD/ePrivacy : le tracking doit être conditionné au consentement explicite de l'utilisateur.

## Ta mission

1. Intégrer la bibliothèque open source **tarteaucitron.js v1.x** localement (pas de CDN tiers) pour gérer le consentement
2. **Retirer** le tag GA4 inline de toutes les pages
3. **Re-déclarer** GA4 via tarteaucitron (chargement conditionné au consentement)
4. Ajouter un lien « Gérer mes cookies » dans le footer (à côté des 3 liens légaux existants)
5. Mettre à jour la section « Cookies » de `politique-confidentialite.html` (retirer la mention « à venir »)

Durée : 1 h 30. Aucune question au user. Toutes les données factuelles sont dans ce prompt.

## Workflow obligatoire

### Étape 0 — Initialisation (5 min)

1. TodoWrite avec 7 tâches : git pull, télécharger tarteaucitron, créer init script, modifier les 8 pages, footer link, maj politique conf, validation + git push
2. **Synchroniser avec le remote GitHub** :
   ```bash
   git pull origin main --rebase
   ```
   Si le pull échoue (conflit, auth), diagnostique et résous. Ne continue PAS tant que le working tree n'est pas à jour.
3. Backup local de sécurité : `cp public_html/index.html public_html/index.html.backup-pre-session5`
4. Vérifier que git est propre avant de commencer : `git status` doit retourner « nothing to commit, working tree clean ».

### Étape 1 — Lecture contexte (5 min)

Lis dans cet ordre :
1. `public_html/index.html` — repérer la position **exacte** du bloc GA4 inline actuel (`gtag.js` + `gtag('config', 'G-JEG722VJTV')`)
2. `public_html/politique-confidentialite.html` — repérer la section « 9. Cookies »

Ne lis rien d'autre.

### Étape 2 — Téléchargement de tarteaucitron.js (10 min)

Télécharger la dernière release stable v1.x.x depuis le repo officiel `AmauriC/tarteaucitron.js` et installer en local :

```bash
cd public_html
mkdir -p assets/tarteaucitron
cd assets/tarteaucitron
# Récupérer la dernière release stable (1.18.x au moment de la rédaction)
curl -L -o tarteaucitron.zip https://github.com/AmauriC/tarteaucitron.js/archive/refs/tags/v1.18.2.zip
unzip -q tarteaucitron.zip
# Garder uniquement les fichiers utiles (tarteaucitron.js, tarteaucitron.services.js, css/, lang/)
cp -r tarteaucitron.js-1.18.2/tarteaucitron.js .
cp -r tarteaucitron.js-1.18.2/tarteaucitron.services.js .
cp -r tarteaucitron.js-1.18.2/css .
cp -r tarteaucitron.js-1.18.2/lang .
# Nettoyage
rm -rf tarteaucitron.js-1.18.2 tarteaucitron.zip
cd ../..
```

Si la version 1.18.2 n'est pas trouvable, prends la dernière 1.x.x disponible (vérifier sur https://github.com/AmauriC/tarteaucitron.js/releases).

Vérifier la structure obtenue :
```bash
ls -la public_html/assets/tarteaucitron/
```
Doit contenir : `tarteaucitron.js`, `tarteaucitron.services.js`, `css/`, `lang/`.

### Étape 3 — Script d'init tarteaucitron (15 min)

Créer `public_html/assets/tarteaucitron/init.js` avec ce contenu **exact** :

```javascript
/* Init tarteaucitron pour blueenergie.fr — voir politique-confidentialite.html */
(function () {
  tarteaucitron.init({
    "privacyUrl": "/politique-confidentialite.html",
    "bodyPosition": "bottom",
    "hashtag": "#tarteaucitron",
    "cookieName": "tarteaucitron",
    "orientation": "bottom",
    "groupServices": false,
    "showDetailsOnClick": true,
    "serviceDefaultState": "wait",
    "showAlertSmall": false,
    "cookieslist": true,
    "closePopup": false,
    "showIcon": true,
    "iconPosition": "BottomRight",
    "adblocker": false,
    "DenyAllCta": true,
    "AcceptAllCta": true,
    "highPrivacy": true,
    "handleBrowserDNTRequest": false,
    "removeCredit": false,
    "moreInfoLink": true,
    "useExternalCss": false,
    "useExternalJs": false,
    "readmoreLink": "/politique-confidentialite.html",
    "mandatory": true,
    "mandatoryCta": true
  });

  /* Google Analytics 4 */
  tarteaucitron.user.gtagUa = 'G-JEG722VJTV';
  tarteaucitron.user.gtagMore = function () {
    /* Évènement conversion sur /merci.html — repris du tag inline retiré */
    if (window.location.pathname === '/merci.html') {
      gtag('event', 'generate_lead', { 'source': 'formulaire_contact' });
    }
  };
  (tarteaucitron.job = tarteaucitron.job || []).push('gtag');
})();
```

**Important sur `tarteaucitron.user.gtagMore`** : le tag GA4 inline actuel sur `/merci.html` envoie probablement un évènement `generate_lead` au chargement. Vérifie dans `public_html/merci.html` AVANT modification quel est le code exact de l'évènement → adapte la fonction `gtagMore` ci-dessus en conséquence. Si l'évènement actuel diffère (nom, paramètres), reprends-le tel quel.

### Étape 4 — Modification des 8 pages (40 min)

Pour **chacune** des 8 pages suivantes :

1. `public_html/index.html`
2. `public_html/merci.html`
3. `public_html/blog/index.html`
4. `public_html/blog/2026-05-aides-solaires-avant-1er-juillet.html`
5. `public_html/blog/2026-05-batterie-virtuelle-attention-jpme.html`
6. `public_html/mentions-legales.html`
7. `public_html/cgv.html`
8. `public_html/politique-confidentialite.html`

#### 4.a — Retirer le tag GA4 inline

Repérer dans le `<head>` le bloc actuel du type :
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-JEG722VJTV"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-JEG722VJTV');
</script>
```

**Supprimer entièrement** ce bloc (et tout évènement `gtag('event', ...)` inline associé — l'évènement `merci.html` est géré dans `init.js`).

#### 4.b — Ajouter tarteaucitron dans le `<head>`

À la place du tag GA4 retiré, insérer :
```html
<!-- Bandeau consentement cookies (tarteaucitron) -->
<script src="/assets/tarteaucitron/tarteaucitron.js"></script>
<script src="/assets/tarteaucitron/init.js" defer></script>
```

Les chemins en racine `/assets/...` fonctionnent depuis la home ET depuis `/blog/`.

#### 4.c — Ajouter le lien « Gérer mes cookies » dans le footer

Dans chaque page, repérer le bloc footer ajouté lors de la Session 4 (les 3 liens Mentions / CGV / Politique). Ajouter un 4e lien à droite :

```html
&nbsp;·&nbsp;
<a href="#tarteaucitron" onclick="tarteaucitron.userInterface.openPanel(); return false;">Gérer mes cookies</a>
```

À insérer **après** le lien « Politique de confidentialité », même style/couleur que les 3 autres liens.

### Étape 5 — Mise à jour de `politique-confidentialite.html` section 9 Cookies (10 min)

Dans `public_html/politique-confidentialite.html`, repérer la section « 9. Cookies » et :

1. **Supprimer** la mention `« (à venir) »` dans la phrase « Vous pouvez à tout moment modifier vos préférences de cookies en cliquant sur le lien « Gérer mes cookies » présent en pied de page (à venir). »
2. **Mettre à jour** le tableau des cookies pour qu'il reflète exactement les cookies déposés. Le tableau actuel doit ressembler à :

| Cookie | Émetteur | Finalité | Durée |
|---|---|---|---|
| _ga, _ga_* | Google Analytics 4 | Mesure d'audience | 13 mois |
| Cookie de consentement | Blue Energie | Mémoriser vos choix | 6 mois |

Remplacer par :

| Cookie | Émetteur | Finalité | Durée |
|---|---|---|---|
| _ga, _ga_JEG722VJTV | Google Analytics 4 | Mesure d'audience (chargé uniquement si vous acceptez) | 13 mois |
| tarteaucitron | Blue Energie | Mémoriser vos choix de consentement aux cookies | 1 an |

3. **Ajouter** juste avant le tableau cette précision :
```
Aucun cookie de mesure d'audience n'est déposé tant que vous n'avez pas exprimé votre consentement via le bandeau de cookies affiché lors de votre première visite. Vous pouvez modifier vos préférences à tout moment en cliquant sur le lien « Gérer mes cookies » en pied de page.
```

### Étape 6 — Validation finale (15 min)

1. **Vérifier la structure tarteaucitron** :
   ```bash
   ls -la public_html/assets/tarteaucitron/
   ls public_html/assets/tarteaucitron/css/ | head -5
   ls public_html/assets/tarteaucitron/lang/ | head -5
   ```

2. **Vérifier qu'aucun tag GA4 inline ne subsiste** :
   ```bash
   grep -rn "googletagmanager.com/gtag" public_html/ --include="*.html"
   ```
   Doit retourner **0 résultat** (ou uniquement des commentaires).

   ```bash
   grep -rn "G-JEG722VJTV" public_html/ --include="*.html"
   ```
   Doit retourner **0 résultat** (l'ID est maintenant uniquement dans `init.js`).

3. **Vérifier l'intégration tarteaucitron sur les 8 pages** :
   ```bash
   grep -c "tarteaucitron.js" public_html/index.html public_html/merci.html public_html/blog/*.html public_html/mentions-legales.html public_html/cgv.html public_html/politique-confidentialite.html
   ```
   Chaque page doit retourner au minimum 2 (script tarteaucitron + script init).

4. **Vérifier le lien « Gérer mes cookies »** :
   ```bash
   grep -c "Gérer mes cookies" public_html/index.html public_html/merci.html public_html/blog/*.html public_html/mentions-legales.html public_html/cgv.html public_html/politique-confidentialite.html
   ```
   Chaque page doit retourner au minimum 1.

5. **Vérifier la maj politique conf** :
   ```bash
   grep -c "(à venir)" public_html/politique-confidentialite.html
   ```
   Doit retourner **0**.

6. **Validation HTML W3C** des 8 pages modifiées :
   ```bash
   for f in public_html/index.html public_html/merci.html public_html/blog/index.html public_html/blog/2026-05-aides-solaires-avant-1er-juillet.html public_html/blog/2026-05-batterie-virtuelle-attention-jpme.html public_html/mentions-legales.html public_html/cgv.html public_html/politique-confidentialite.html; do
     echo "=== $f ==="
     curl -s -H "Content-Type: text/html; charset=utf-8" --data-binary @"$f" "https://validator.w3.org/nu/?out=json" | head -30
   done
   ```

7. **Commit + push GitHub** :
   ```bash
   git add -A
   git commit -m "Session 5: bandeau cookies tarteaucitron + GA4 conditionnel au consentement"
   git push origin main
   ```
   Si auth interactive requise, commit local valide + signaler dans rapport.

## Décisions déjà prises (ne demande RIEN)

| Sujet | Décision |
|---|---|
| Bibliothèque | tarteaucitron.js (open source, fr-FR, RGPD-compliant, no-CDN tiers) |
| Version cible | dernière 1.18.x stable (1.18.2 ou supérieure si dispo) |
| Hébergement de la lib | **Local** (`public_html/assets/tarteaucitron/`), pas de CDN tiers |
| Services à déclarer | **GA4 uniquement** (pas YouTube — pas d'iframe YT en prod ; pas OSM — pas de cookie tiers tracking) |
| Mode privacy | `highPrivacy: true` (consentement explicite obligatoire avant tout dépôt de cookie) |
| Bouton « Tout refuser » | **Affiché** (`DenyAllCta: true`) — obligation CNIL 2020 |
| Bouton « Tout accepter » | Affiché (`AcceptAllCta: true`) |
| Icône « cookie » flottante | Activée en bas à droite (`showIcon: true`, `iconPosition: BottomRight`) |
| Position du bandeau initial | Bas de page (`orientation: bottom`) |
| Lien politique conf | `/politique-confidentialite.html` |
| Évènement GA4 sur /merci.html | À reprendre tel quel depuis le tag inline actuel (vérifier en lisant merci.html) |
| Lien « Gérer mes cookies » | Ajouté dans le footer après les 3 liens légaux, ouvre le panel via JS |
| Durée cookie tarteaucitron | 1 an (paramètre par défaut de la lib) |
| Git workflow | Pull au début, commit + push à la fin sur origin/main |

## Interdictions strictes

- ❌ Ne mets PAS tarteaucitron via un CDN tiers (Cloudflare, jsdelivr, etc.) — hébergement **local obligatoire** pour conformité (pas de transfert d'IP hors UE au chargement)
- ❌ N'ajoute PAS d'autres services tarteaucitron que GA4 (pas de YouTube, pas de Facebook Pixel, pas de Google Maps, pas de Hotjar, etc.) — uniquement ce qui est réellement utilisé
- ❌ Ne laisse AUCUN tag GA4 inline résiduel dans les pages
- ❌ Ne touche PAS au contenu rédactionnel des pages (sections matériel, articles blog, CGV, etc.) — uniquement `<head>` + footer + section cookies de la politique
- ❌ Ne refactore PAS le CSS existant (Session 8)
- ❌ N'ajoute PAS de JSON-LD Organization / sitemap / robots (Session 14)
- ❌ N'ajoute PAS d'autres outils analytics (Microsoft Clarity, etc.) — restera à confirmer plus tard
- ❌ Ne pose AUCUNE question au user

## En cas de blocage

1. Diagnostique
2. Tente 2 solutions
3. Si la version 1.18.2 spécifique n'est pas trouvable, essaie 1.18.1, puis la dernière 1.18.x dispo via `curl -L https://api.github.com/repos/AmauriC/tarteaucitron.js/releases/latest | grep tag_name`
4. Si toujours bloqué sur UNE tâche, passe à la suivante et liste dans le rapport
5. NE STOPPE PAS pour poser une question

## Tone et style code

- Pas de blabla, pas de « bien sûr »
- Pas d'emoji dans le code (uniquement dans le rapport final si utile)
- Travail silencieux, rapport à la fin

## Format du rapport final

```markdown
# Session 5 — Terminé

## Fichiers créés
- public_html/assets/tarteaucitron/tarteaucitron.js
- public_html/assets/tarteaucitron/tarteaucitron.services.js
- public_html/assets/tarteaucitron/init.js
- public_html/assets/tarteaucitron/css/ (X fichiers)
- public_html/assets/tarteaucitron/lang/ (X fichiers, dont fr.js)
- public_html/index.html.backup-pre-session5 (sauvegarde)

## Version tarteaucitron installée
v1.18.X

## Fichiers modifiés (8 pages)
- public_html/index.html (retrait GA4 inline + ajout tarteaucitron + footer "Gérer mes cookies")
- public_html/merci.html (idem — évènement generate_lead repris dans init.js)
- public_html/blog/index.html (idem)
- public_html/blog/2026-05-aides-solaires-avant-1er-juillet.html (idem)
- public_html/blog/2026-05-batterie-virtuelle-attention-jpme.html (idem)
- public_html/mentions-legales.html (idem)
- public_html/cgv.html (idem)
- public_html/politique-confidentialite.html (idem + section 9 Cookies mise à jour)

## Évènement GA4 /merci.html
Code d'origine repéré : [recopier le code exact trouvé dans merci.html avant modification]
Code adapté dans init.js : [code final mis dans tarteaucitron.user.gtagMore]

## Vérifications
- grep "googletagmanager.com/gtag" : 0 occurrence (✅ tag inline retiré)
- grep "G-JEG722VJTV" dans *.html : 0 occurrence (ID uniquement dans init.js)
- grep "tarteaucitron.js" : 2+ par page (✅ intégration faite)
- grep "Gérer mes cookies" : 1+ par page (✅ lien footer présent)
- grep "(à venir)" dans politique-confidentialite : 0 (✅ mention retirée)
- Validation W3C : X erreurs / X warnings par page (détail par page)
- Git pull initial : OK / KO
- Git commit local : OK
- Git push vers GitHub origin/main : OK / manuel requis

## À faire côté toi (Neil)
1. Téléverser sur Hostinger via hPanel :
   - public_html/assets/tarteaucitron/ (dossier complet)
   - Les 8 pages HTML modifiées
2. Vider le cache Hostinger
3. Tester en navigation privée :
   - Ouvrir https://blueenergie.fr/ → bandeau cookies doit apparaître en bas
   - Cliquer « Tout refuser » → vérifier dans DevTools > Application > Cookies qu'AUCUN cookie _ga* n'est déposé
   - Recharger en navigation privée → cliquer « Tout accepter » → vérifier que _ga et _ga_JEG722VJTV apparaissent
   - Aller dans GA4 Realtime → vérifier qu'une session est trackée APRÈS acceptation
   - Cliquer le lien « Gérer mes cookies » en pied de page → panel doit s'ouvrir
   - Tester sur /blog/ et un article : le bandeau ne doit PAS réapparaître si déjà répondu (cookie tarteaucitron persistant)
4. Vérifier la conformité GA4 + tarteaucitron sur l'extension navigateur « Cookie-Editor » ou DevTools

## Prochaines sessions disponibles
- Session 18 : bandeau confiance RGE + décennale (logo QualiPV déjà dans images/)
- Session 14 : JSON-LD Organization + sitemap.xml + robots.txt
- Session 7 : finition galerie réalisations (`loading="lazy"`, retrait définitif Mylight)

## Blocages éventuels
(vide si tout OK, sinon détailler)
```

## === FIN PROMPT ===

---

## Notes hors prompt (pour Neil)

**Test critique post-déploiement** :
1. Ouvre https://blueenergie.fr/ en **navigation privée**
2. DevTools (F12) → onglet Application → Cookies → blueenergie.fr → tu dois voir UN seul cookie (`tarteaucitron`) avant tout clic
3. Clique « Tout refuser » → recharge → aucun cookie `_ga*` ne doit apparaître
4. Si tu cliques « Tout accepter », alors `_ga` et `_ga_JEG722VJTV` doivent apparaître ET GA4 Realtime doit recevoir une session

**Si tu vois le moindre cookie GA4 AVANT clic sur Accepter**, c'est un bug grave de configuration → me dire et on corrige.

**Évolution future** : si tu ajoutes plus tard YouTube (vidéos témoignages), Calendly (prise de RDV), Hotjar, etc., chaque service doit être déclaré dans `init.js` via `tarteaucitron.job.push('<service>')`. Liste complète : https://opt-out.ferank.eu/fr/install/

**Prochaine session recommandée** : **Session 18** (bandeau confiance RGE) — gros impact visuel + crédibilité, prérequis déjà présents (logo QualiPV).
