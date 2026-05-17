# Prompt Session MARATHON — PART 2 (sous-sessions 6 à 9)

> À utiliser **uniquement** après que la PART 1 (sous-sessions 1 à 5) a été livrée et validée par Neil.
> Démarrer une **NOUVELLE session Claude Code** (`/clear` ou relance `claude` depuis zéro) — surtout pas continuer dans la session qui a fait la PART 1.

## Mode d'emploi (côté Neil)

1. Ouvre un terminal
2. `cd "/Users/neillothian/Documents/Claude/Projects/blueenergie.fr"`
3. Lance Claude Code dans une **nouvelle session vide** : `claude` (ou `/clear` si une session est déjà ouverte)
4. Copie-colle tout ce qui est entre `=== DÉBUT PROMPT ===` et `=== FIN PROMPT ===`
5. Laisse tourner. Le dev push après chaque sous-session — tu peux uploader sur Hostinger au fil de l'eau.

---

## === DÉBUT PROMPT ===

Tu es développeur web senior **polyvalent** (SEO technique, refactoring, templating, contenu). Tu travailles sur **blueenergie.fr** (installation photovoltaïque résidentielle en Haute-Savoie). Stack : HTML/CSS/JS pur. Hébergement Hostinger.

Tu enchaînes la **deuxième moitié** de la Session MARATHON : sous-sessions 6 à 9 (+ optionnelles 10-11). La première moitié (sous-sessions 1 à 5 : JSON-LD + sitemap, bandeau-confiance FIX, galerie, compression images, extraction CSS/JS) a déjà été livrée et validée par le user. Tous les commits sont sur `main` côté GitHub.

## Référence détaillée

Lis intégralement les sections suivantes de `PROMPT-SESSION-MARATHON.md` à la racine du repo :
- **SOUS-SESSION 6** — Session 11 : système de partials header/footer (~2 h)
- **SOUS-SESSION 7** — Session 12 : 4 pages internes (installation, matériel, réalisations, contact) (~2 h)
- **SOUS-SESSION 8** — Session 13 : page aides 2026 + mini-simulateur JS (~1 h 30)
- **SOUS-SESSION 9** — Session 15 : hub zones d'intervention + page modèle Annecy (~1 h 30)
- **SOUS-SESSIONS OPTIONNELLES 10 et 11** (Session 16 = 9 autres pages géo, Session 22 = 3e article blog)
- **Décisions déjà prises**, **Interdictions strictes**, **En cas de blocage**, **Format du rapport final**

Tu exécutes chaque sous-session **à la lettre**, avec **commit + push après chacune** (un commit = une sous-session = message clair).

## Workflow obligatoire — Étape 0 : Initialisation (5 min)

1. TodoWrite avec **6 tâches** : init, sous-session 11, 12, 13, 15, rapport final (+ optionnelles 16/22 à ajouter si tu te sens d'attaque en fin de marathon)
2. `git pull origin main --rebase` — si échec : diagnostique, ne continue pas
3. `git status` doit retourner « nothing to commit, working tree clean »
4. **Vérification d'état post-PART1** (au cas où) :
   ```bash
   ls public_html/assets/css/main.css public_html/assets/css/bandeau-confiance.css public_html/sitemap.xml public_html/robots.txt 2>&1
   ```
   Tous ces fichiers doivent exister. Si l'un manque, signale-le et arrête-toi (la PART 1 n'est probablement pas complète).
5. Backup global avant la PART 2 :
   ```bash
   tar czf "/tmp/blueenergie-pre-marathon-part2-$(date +%Y%m%d-%H%M).tar.gz" public_html/
   ```

## Règles applicables (identiques à la PART 1)

- **Commit + push après chaque sous-session** — obligatoire.
- **Stratégie fail-soft** : sous-session bloquante > 15 min → marque ⚠️ Partiel dans `SESSIONS-CODE-A-VENIR.md`, commit + push ce qui est fait, skip à la suivante.
- **Stratégie checkpoint** : à partir du checkpoint 7 (après Session 12), évalue ton propre état de contexte. Si la qualité chute, arrête-toi proprement, écris le rapport final avec ce qui reste, et termine. Mieux vaut 2 sous-sessions propres de la PART 2 que 4 bâclées.
- **Aucune question au user** pendant l'exécution.

## Interdictions strictes (rappels)

- ❌ Ne refais PAS les sous-sessions 1 à 5 (déjà livrées).
- ❌ Ne fais PAS Sessions 10 (formulaire reCAPTCHA), 17 (avis Google) — clés API manquantes.
- ❌ N'INVENTE PAS de contenu chiffré (prix, primes, dates) au-delà de ce qui est dans `PROMPT-SESSION-MARATHON.md` ou dans `QUESTIONS-OUVERTES.md`.
- ❌ N'installe AUCUN paquet.
- ❌ Ne pose AUCUNE question au user.

## Format du rapport final

Utilise le **Format du rapport final** défini en bas de `PROMPT-SESSION-MARATHON.md`, en cochant uniquement les sous-sessions de la PART 2 (les 5 premières sont déjà livrées en PART 1 — tu les listes simplement comme « déjà livré en PART 1 »).

## === FIN PROMPT ===
