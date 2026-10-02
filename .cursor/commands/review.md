Review the current git diff (unstaged, staged, and untracked) against this repo's architecture.

If the user named files, a PR, or a commit after `/review`, limit the review to that scope. Otherwise review the working tree.

Check, in this order:

1. **Layer rule** — `presentation -> infrastructure -> application -> domain`. Flag any import that points the wrong way, any `@nestjs/*` import in `domain` or `application`, and any business logic in a controller or React component.
2. **Placement** — business rules in domain/application, persistence in infrastructure, HTTP/DI in presentation, UI in `frontend/src/features/<feature>`.
3. **Tests** — every behavior change has tests in the matching project (`backend/tests/unit`, `backend/tests/integration`, `frontend/tests`). Call out missing coverage for new error paths (400/404/409).
4. **Contract** — if a backend DTO changed, `frontend/src/features/<feature>/types.ts` must match.
5. **Quality** — no `any`, no secrets, no new dependencies without justification.

Format findings as:

- **Blocker** — must fix before merge
- **Should fix** — real defect or convention break
- **Nit** — optional

Cite `file:line`. Do not rewrite the code unless asked.
