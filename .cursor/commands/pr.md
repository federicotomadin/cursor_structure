Open a pull request for the current branch using `gh`.

1. Inspect `git status`, `git diff`, `git log`, and `git diff <base>...HEAD` in parallel. Base is `main` unless the user named another branch.
2. If the branch has no remote, `git push -u origin HEAD`.
3. Draft a concise title and body from **all** commits on the branch, not only the latest.
4. Create the PR with:

```bash
gh pr create --title "..." --body "$(cat <<'EOF'
## Summary
- ...

## Test plan
- [ ] `npm run typecheck && npm run lint && npm test`
- [ ] (add E2E / browser checks when UI changed)
EOF
)"
```

Do not update git config. Do not force-push to `main`. Return the PR URL when done.
