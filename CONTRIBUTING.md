# Contributing Guide

## Branch Naming
```
feature/editor-personal-info
feature/template-modern
fix/preview-not-updating
chore/eslint-setup
```

## Commit Messages
Follow this format:
```
feat: add experience section
fix: summary not syncing to preview
style: update editor spacing
refactor: extract SectionAccordion component
chore: update dependencies
```

## Pull Request Rules
1. Branch off `staging`, not `main`
2. Keep PRs focused — one feature per PR
3. Add a short description of what changed and why
4. The other person must review and approve before merging
5. Delete your branch after merging

## Code Style
- Use named exports for all components
- Add a JSDoc comment block at the top of every file
- Use `useResume()` hook to access context, never import context directly
- Prefix placeholder/TODO comments with `// TODO:`
