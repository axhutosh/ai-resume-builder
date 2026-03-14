# Contributing to Resumo

Welcome! This guide covers everything you need to start contributing.

---

## 🏁 First Time Setup

```bash
# 1. Clone the repo
git clone https://github.com/axhutosh/resumo.git
cd resumo

# 2. Install dependencies
npm install

# 3. Create your environment file
# Create a .env.local file in the root with:
VITE_GEMINI_API_KEY=your_key_here
# Get a free key at: https://aistudio.google.com/app/apikey

# 4. Create your personal branch
git checkout -b dev/yourname

# 5. Start the dev server
npm run dev
```

---

## 🌿 Branch Rules

| Branch | Purpose | Can push directly? |
|---|---|---|
| `main` | Production — live on Vercel | ❌ PR only |
| `staging` | Pre-release testing | ❌ PR only |
| `dev/yourname` | Your personal work branch | ✅ Yes |

**Always branch off `main`:**
```bash
git checkout main
git pull origin main
git checkout -b dev/yourname
```

---

## 💾 Daily Workflow

```bash
# 1. Make your changes on dev/yourname
git add .
git commit -m "feat: what you built"
git push origin dev/yourname

# 2. Open a PR on GitHub: dev/yourname → staging
# 3. Other person reviews, tests on the Vercel preview URL, approves
# 4. Merge to staging
# 5. Open another PR: staging → main
# 6. Merge → Vercel auto-deploys to production 🚀
```

---

## ✍️ Commit Message Format

Follow this pattern — it keeps the git history clean and readable:

```
feat: add certifications section to editor
fix: PDF download not working on Firefox
style: improve editor panel spacing
refactor: extract Field component from PersonalInfo
chore: upgrade react-to-print to v3
docs: update README with live link
```

| Prefix | When to use |
|---|---|
| `feat` | New feature or section |
| `fix` | Bug fix |
| `style` | UI/CSS changes only, no logic |
| `refactor` | Code restructure, no behavior change |
| `chore` | Dependencies, config, tooling |
| `docs` | README, comments, documentation |

---

## 🔍 PR Guidelines

1. **One feature per PR** — keep it focused and easy to review
2. **Write a clear title** — same format as commit messages
3. **Describe what changed** — add a short description in the PR body
4. **Test before requesting review** — check the Vercel preview URL
5. **Reviewer tests on preview URL** — no need to clone locally
6. **Delete your branch after merging** — keeps the repo clean

---

## 🏗️ Code Guidelines

- Use **named exports** for all components — `export default function MyComponent()`
- Use **`useResume()`** hook to access context — never import `ResumeContext` directly
- All editor sections use **inline styles** from the shared `S` object in `EditorPanel.jsx`
- Add a comment at the top of new files explaining what they do
- Prefix unfinished work with `// TODO:`
- New AI prompts go in `src/utils/aiPrompts.js` — keep them clean and documented

---

## 🗂️ Where Things Live

| What | Where |
|---|---|
| Editor sections | `src/components/editor/sections/` |
| Resume templates | `src/components/preview/templates/` |
| AI logic | `src/hooks/useAI.js` + `src/utils/aiPrompts.js` |
| Global state | `src/context/ResumeContext.jsx` |
| Onboarding wizard | `src/components/onboarding/OnboardingModal.jsx` |
| Shared editor styles | `S` object in `src/components/editor/EditorPanel.jsx` |

---

## ❓ Questions

Open an issue on GitHub or ping in the group chat. Happy building! 🚀