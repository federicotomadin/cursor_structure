Create a git commit for the current changes, following `.cursor/skills/conventional-commit/SKILL.md`.

Rules:

- Never update git config, never `--no-verify`, never force-push, never amend unless the user explicitly asked.
- If nothing is staged, inspect `git status` and `git diff`, then stage only the files that belong in this commit. Split unrelated changes instead of mixing them.
- Stop if the diff contains secrets (`.env`, tokens, keys, credentials).
- Show the proposed message, then commit.

Message format:

```
<type>(<scope>): <imperative summary, lowercase, no period, <= 72 chars>
```

Scopes: `frontend`, `domain`, `application`, `infrastructure`, `presentation`, `tests`, `cursor`, or the feature name when the change spans layers (`users`).
