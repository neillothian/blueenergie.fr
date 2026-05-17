# Prompt Session [NUMÉRO] — [TITRE COURT]

> **[Mission en une phrase].**
> Périmètre : [liste fichiers concernés].
> Durée estimée : [Xh]. Aucune question au user pendant l'exécution.

---

## Mode d'emploi (côté Neil)

1. Ouvre un terminal
2. `cd "/Users/neillothian/Documents/Claude/Projects/blueenergie.fr"`
3. Lance Claude Code : `claude`
4. Copie-colle tout ce qui est entre `=== DÉBUT PROMPT ===` et `=== FIN PROMPT ===`
5. Laisse tourner ~[X h]. [Préciser : push direct main / branche dédiée à merger].

---

## === DÉBUT PROMPT ===

Tu es [RÔLE] spécialisé en [DOMAINE]. Tu travailles sur **blueenergie.fr** (installation photovoltaïque résidentielle en Haute-Savoie). Stack : HTML/CSS/JS pur. Hébergement Hostinger.

[ÉTAT DU SITE — quelles sessions sont déjà déployées, références utiles.]

## Ta mission

[Description de la mission en 3-6 lignes. Préciser pourquoi cette session existe.]

[CONTRAINTE CRITIQUE — engageant juridiquement / contenu commercial / RGPD / etc. — préciser ici si besoin de garde-fou de relecture humaine avant push.]

Durée : [X]. Aucune question au user.

## Workflow obligatoire

### Étape 0 — Initialisation (5 min)

1. TodoWrite avec les [N] tâches de cette session
2. `git pull origin main --rebase` — si échec : diagnostique, ne continue pas
3. `git status` doit retourner « nothing to commit, working tree clean »
4. **Si livrable engageant** (légal / commercial / public) : `git checkout -b [nom-branche-explicite]`
5. Backup si modif de fichier existant : `cp [fichier] [fichier].backup-pre-session[X]`

### Étape 1 — Lecture contexte (5-10 min)

Lis dans cet ordre, et RIEN d'autre :
1. [fichier de référence 1]
2. [fichier de référence 2]

### Étape 2..N — [Tâches métier]

[Détail des étapes. Pour chacune : objectif, fichier cible, action concrète, vérification.]

### Étape N+1 — Mise à jour table d'avancement (3 min)

1. Lire `SESSIONS-CODE-A-VENIR.md` et localiser la ligne `| Session [X] — ...`
2. Remplacer la ligne via Edit avec ce format exact :
   ```
   | Session [X] — [titre inchangé] | ✅ **DÉPLOYÉ** | `[ce fichier prompt]` |
   ```
3. Mettre à jour la date d'en-tête : `## État d'avancement (mise à jour AAAA-MM-JJ)`
4. Vérification : `grep -c "Session [X].*DÉPLOYÉ" SESSIONS-CODE-A-VENIR.md` doit retourner 1.
5. Inclure `SESSIONS-CODE-A-VENIR.md` dans le commit final.

### Étape N+2 — Validation finale

1. Vérifications spécifiques à la session : `grep`, `ls`, structure des fichiers attendus.
2. [Si applicable] Validation HTML locale : `npx html-validate [fichiers]`. Si non installé, signaler dans le rapport sans installer.
3. **PAUSE OBLIGATOIRE si livrable engageant** :
   - Ne pas push sur `main`
   - Terminer le rapport par : « Branche `[nom]` prête à relire. Réponds GO pour merge + push origin main. »
4. **Sinon (livrable technique, doc interne, asset)** : commit + push direct :
   ```bash
   git add [fichiers ciblés explicitement]
   git commit -m "Session [X] : [résumé court]"
   git push origin main
   ```

## Décisions déjà prises (ne demande RIEN)

| Sujet | Décision |
|---|---|
| [Décision 1] | [Valeur] |
| [Décision 2] | [Valeur] |

## Interdictions strictes

- ❌ N'invente AUCUNE donnée non listée (numéros, prix, noms, URLs)
- ❌ Ne pose AUCUNE question au user
- ❌ Ne touche PAS aux fichiers hors périmètre
- ❌ Ne refactore PAS le CSS existant
- ❌ N'ajoute PAS de dépendance sans la lister dans ce prompt
- ❌ [Interdictions spécifiques à la session]

## En cas de blocage

1. Diagnostique
2. Tente 2 solutions
3. Si toujours bloqué sur UNE tâche, passe à la suivante et liste dans le rapport
4. NE STOPPE PAS pour poser une question

## Format du rapport final

```
## Rapport Session [X]

### Fichiers créés / modifiés
- [chemin] — [résumé]

### Vérifications passées
- [check 1] : OK / KO
- [check 2] : OK / KO

### Table d'avancement
- `SESSIONS-CODE-A-VENIR.md` ligne Session [X] passée à `✅ DÉPLOYÉ`

### Git
- Branche : [main / nom-branche]
- Commit : [hash + message]
- Pushé : [oui / non — raison si non]

### À faire côté Neil
1. [Upload Hostinger / vider cache / test manuel / merge branche / etc.]

### Prochaine session recommandée
[Session Y — pourquoi]

### Blocages éventuels
[ou : aucun]
```

## === FIN PROMPT ===

---

## Notes hors prompt (pour Neil)

- [Vérifications externes à faire avant de lancer : annuaire-entreprises, validation d'un numéro, etc.]
- [Points d'attention pendant la session]
- [Ressources utiles, sans inventer d'URL]

---

## Mode d'emploi du template (méta)

**À chaque nouvelle session** :
1. Duplique ce fichier : `cp TEMPLATE-PROMPT-SESSION.md PROMPT-SESSION-[X].md`
2. Remplace tous les `[CROCHETS]` par les valeurs réelles.
3. Supprime les sections qui ne s'appliquent pas à cette session précise.
4. **Ne modifie jamais directement ce template** sauf pour le faire évoluer en tant que template (auquel cas : commit dédié `chore: évolution template prompt`).
