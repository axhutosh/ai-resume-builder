# 🧠 AI Resume Builder

A real-time resume builder with AI-powered suggestions, built with React + Vite + Tailwind CSS.

---

## ✨ Features
- Live split-pane editor and preview
- 3 resume templates: Modern, Classic, Creative
- AI summary improvement (powered by Claude)
- PDF download
- Fully responsive

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm v9+

### Setup
```bash
git clone https://github.com/YOUR_ORG/ai-resume-builder.git
cd ai-resume-builder
npm install
cp .env.example .env.local
# Add your API key to .env.local
npm run dev
```

---

## 🌿 Branch Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Production-ready, protected |
| `staging` | Integration branch — all PRs merge here |
| `feature/xyz` | Individual feature work |

**Never push directly to `main` or `staging`.** Always open a PR.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/        # Header, SplitLayout
│   ├── editor/        # EditorPanel + 6 sections
│   ├── preview/       # PreviewPanel + 3 templates
│   └── ai/            # AIPanel (Phase 2)
├── context/           # ResumeContext (global state)
├── hooks/             # useAI, useDownload, useResumeData
└── utils/             # resumeSchema, aiPrompts, pdfExport
```

---

## 🤝 Contribution Guidelines

See [CONTRIBUTING.md](./CONTRIBUTING.md).

---

## 🔑 Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_ANTHROPIC_API_KEY` | Your Claude API key (Phase 2) |

---

## 🗺️ Roadmap

- [x] Phase 1 — Resume Builder UI + 3 Templates + PDF Export
- [ ] Phase 2 — AI Integration (Claude API)
- [ ] Phase 3 — Auth + saved resumes
