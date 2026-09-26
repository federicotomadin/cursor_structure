---
name: conventional-commit
description: Writes Conventional Commits messages from the staged diff, using the affected app or layer as the scope. Use when asked to commit or to write a commit message.
disable-model-invocation: true
---

# Conventional commit

1. Run `git diff --staged --stat` and `git diff --staged`. If nothing is staged, ask what to include.
2. If the diff mixes unrelated changes, propose splitting it into several commits.
3. Check the diff for secrets (`.env`, tokens, keys). If any, stop and warn.
4. Write the message:

```
<type>(<scope>): <imperative summary, lowercase, no period, <= 72 chars>

<optional body: why the change was made, not what>
```

- `type`: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `build`, `ci`, `perf`.
- `scope`: `frontend`, `domain`, `application`, `infrastructure`, `presentation`, `tests`, `cursor` (for `.cursor/` and `AGENTS.md`), or the feature name when it spans layers (`users`).

## Examples

```
feat(users): add get user by id endpoint
```

```
fix(presentation): map ConflictError to 409 instead of 500

The global filter fell through to the default branch for application
errors, so duplicated emails surfaced as internal server errors.
```

5. Show the message and commit only after the user confirms.
