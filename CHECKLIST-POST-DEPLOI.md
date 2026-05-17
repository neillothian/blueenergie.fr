# Checklist post-déploiement Hostinger

> À exécuter par le superviseur (Cowork) via Chrome MCP après chaque upload manuel des fichiers sur Hostinger.
> Déclencheur côté Neil : « check session X déployée » ou « check [URL] ».

---

## Préalable côté superviseur

1. Charger les tools Chrome MCP via ToolSearch (`mcp__Claude_in_Chrome__*`).
2. Confirmer auprès de Neil que l'upload Hostinger est terminé ET que le cache CDN/navigateur a été vidé (Hostinger : « Clear cache » dans hPanel).
3. Lire l'entrée correspondante dans `SESSIONS-CODE-A-VENIR.md` pour identifier le périmètre exact.

---

## Procédure générique (toute session)

À exécuter sur CHAQUE URL ciblée par la session :

1. **Navigation** : ouvrir `https://blueenergie.fr/[URL]` via Chrome MCP.
2. **Code HTTP** : vérifier 200 (pas 301, pas 404, pas 500).
3. **Inspection DOM** via `javascript_tool`, exécuter :
   ```javascript
   ({
     lang: document.documentElement.lang,
     title: document.title,
     description: document.querySelector('meta[name="description"]')?.content,
     canonical: document.querySelector('link[rel="canonical"]')?.href,
     robots: document.querySelector('meta[name="robots"]')?.content,
     h1: document.querySelector('h1')?.innerText,
     ga4_loaded: typeof window.gtag === 'function'
   })
   ```
   Attendu : `lang === "fr"`, `title` non vide, `description` non vide, `canonical` cohérent avec l'URL courante, `h1` non vide.
4. **Liens internes** : exécuter dans `javascript_tool` :
   ```javascript
   Array.from(document.querySelectorAll('a[href]'))
     .map(a => a.href)
     .filter(h => h.startsWith('https://blueenergie.fr') || h.startsWith('/'))
   ```
   Reporter la liste. Si une URL paraît cassée, la tester manuellement.
5. **Console JS** : vérifier 0 erreur bloquante (avertissements OK).
6. **Screenshot** : capturer la page entière pour archive (à coller dans le rapport).

---

## Checks supplémentaires selon le TYPE de session

### Type A — Page nouvelle (ex : Session 4 légal, Session 2 merci, Session 13 aides)
- Présence dans le sitemap (si Session 14 déployée) : ouvrir `https://blueenergie.fr/sitemap.xml`, chercher l'URL.
- Tag GA4 chargé : `window.dataLayer` non vide, `gtag` est une fonction.
- Lien retour vers `/` (logo ou nav) fonctionnel.
- Footer présent avec les liens légaux (si Session 4 déployée).

### Type B — Modif page existante (ex : Session 6 catalogue, Session 1 correctifs)
- Aucune balise cassée : exécuter
  ```javascript
  document.body.innerHTML.match(/<\/?(script|style|div|a|footer)/gi)?.length
  ```
  comparer à la version précédente si dispo.
- Recherche de mentions obsolètes : `document.body.innerText.includes('[mention obsolète]')` doit retourner `false`.
- Comparaison visuelle avec le screenshot de la session précédente : noter les différences attendues vs inattendues.

### Type C — Asset (logo, image, icône)
- Asset chargé sans 404 : inspecter le Network panel via Chrome DevTools / `javascript_tool` :
  ```javascript
  performance.getEntriesByType('resource')
    .filter(r => r.name.includes('[nom-asset]'))
    .map(r => ({ url: r.name, status: r.responseStatus, size: r.transferSize }))
  ```
- Dimensions et poids cohérents (logo < 100 Ko, photos < 300 Ko après compression).
- `<img>` qui le référence porte un `alt` non vide.

### Type D — Tracking / config (ex : Session 5 cookies tarteaucitron)
- Bandeau s'affiche au 1er chargement (ouvrir en navigation privée pour reset).
- Avant consentement : `window.dataLayer` ne doit PAS contenir d'event GA4.
- Après acceptation : `localStorage` ou `cookie` posé (vérifier nom exact selon implémentation).
- Après refus : GA4 ne charge PAS.

### Type E — SEO technique (ex : Session 14 JSON-LD + sitemap + robots)
- `https://blueenergie.fr/sitemap.xml` accessible, XML valide.
- `https://blueenergie.fr/robots.txt` accessible, contient `Sitemap:` pointant vers le sitemap.
- JSON-LD présent dans `index.html` :
  ```javascript
  Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
    .map(s => JSON.parse(s.innerText))
  ```
  Vérifier `@type: "Organization"`, `@type: "LocalBusiness"`, etc.

---

## Format du rapport de check (à coller dans la conversation pilote)

```
## Check post-déploi — Session [X]

URLs vérifiées :
- https://blueenergie.fr/[url1]
- https://blueenergie.fr/[url2]

### Vérifications génériques
- ✅ / ❌ Code 200 sur toutes les URLs
- ✅ / ❌ lang=fr partout
- ✅ / ❌ meta description présente
- ✅ / ❌ canonical cohérent
- ✅ / ❌ h1 présent
- ✅ / ❌ [N] liens internes, tous valides
- ✅ / ❌ 0 erreur JS bloquante

### Vérifications spécifiques (type [A/B/C/D/E])
- ✅ / ❌ [check spécifique 1]
- ✅ / ❌ [check spécifique 2]

### Screenshots
- [URL1] : [capture jointe]
- [URL2] : [capture jointe]

### Verdict
[✅ OK à valider — mettre `SESSIONS-CODE-A-VENIR.md` à ✅ DÉPLOYÉ et `ETAT-PROJET.md` à jour]
[⚠️ Retouche mineure — détailler]
[❌ Bloquant — détailler + recommander rollback ou patch immédiat]
```

---

## Décision après check

- **Si verdict ✅** : le superviseur met à jour `SESSIONS-CODE-A-VENIR.md` (passage à `✅ DÉPLOYÉ`) et `ETAT-PROJET.md` (ajout dans la liste des sessions déployées + date). Commit + push.
- **Si verdict ⚠️ ou ❌** : ne PAS marquer DÉPLOYÉ. Documenter le problème dans `QUESTIONS-OUVERTES.md` ou créer un mini-prompt de correction.
