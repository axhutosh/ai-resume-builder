# Resumo 🚀

An AI-powered resume builder with live preview, multiple templates, and Gemini AI integration.

![version](https://img.shields.io/badge/version-1.0.0-7c3aed?style=flat-square) ![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react) ![Vite](https://img.shields.io/badge/Vite-5-646cff?style=flat-square&logo=vite) ![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

🔗 **Live Demo:** [ai-resume-builder-axhutosh.vercel.app](https://ai-resume-builder-axhutosh.vercel.app)

---

## ✨ Features

- **AI Onboarding** — Answer 4 questions, AI pre-fills your entire resume
- **Live Preview** — See your resume update in real time as you type
- **3 Templates** — Modern, Classic, and Creative layouts
- **AI Summary** — Improve your professional summary with one click
- **All Sections** — Personal Info, Summary, Experience, Education, Skills, Certifications, Projects
- **PDF Export** — Download a print-ready PDF in one click

---

## 🖥️ Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 18 + Vite |
| Styling | Custom CSS (inline styles) |
| AI | Google Gemini 1.5 Flash |
| PDF | react-to-print v3 |
| State | React Context API |
| Deploy | Vercel |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A [Google Gemini API key](https://aistudio.google.com/app/apikey) — free tier available

### Installation

```bash
git clone https://github.com/axhutosh/resumo.git
cd resumo
npm install
```

### Environment Setup

Create a `.env.local` file in the project root:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

> Get a free key at [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
> Free tier: 15 requests/min, 1500 requests/day

### Run Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.jsx              # Template switcher + PDF button
│   │   └── SplitLayout.jsx         # 50/50 split pane + AI panel
│   ├── editor/
│   │   ├── EditorPanel.jsx         # Shared styles + panel shell
│   │   ├── SectionAccordion.jsx    # Collapsible section wrapper
│   │   └── sections/
│   │       ├── PersonalInfo.jsx
│   │       ├── Summary.jsx         # AI improve button
│   │       ├── Experience.jsx
│   │       ├── Education.jsx
│   │       ├── Skills.jsx
│   │       ├── Certifications.jsx
│   │       └── Projects.jsx
│   ├── preview/
│   │   ├── PreviewPanel.jsx
│   │   └── templates/
│   │       ├── Modern.jsx
│   │       ├── Classic.jsx
│   │       └── Creative.jsx
│   ├── ai/
│   │   └── AIPanel.jsx             # Sliding AI suggestions panel
│   └── onboarding/
│       └── OnboardingModal.jsx     # AI-powered wizard on first load
├── context/
│   └── ResumeContext.jsx           # Global state + resumeRef
├── hooks/
│   ├── useAI.js                    # Gemini API calls
│   ├── useOnboarding.js            # AI resume pre-fill logic
│   └── useDownload.js              # react-to-print PDF export
└── utils/
    ├── resumeSchema.js             # Default data shape
    └── aiPrompts.js                # All Gemini prompt templates
```

---

## 🌿 Branch Strategy

```
main        ← stable, production (auto-deploys to Vercel)
staging     ← pre-release testing
dev/name    ← personal feature branches
```

**Daily workflow:**
```
dev/name → PR → staging → PR → main → Vercel 🚀
```

Never push directly to `main` or `staging`. Always work on your `dev/name` branch and open a PR.

---

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for full guidelines.

---

## 🗺️ Roadmap

- [x] v1.0 — Resume builder, 3 templates, PDF export
- [x] v1.1 — AI onboarding wizard, AI summary improvement
- [ ] v1.2 — Auth + saved resumes (multiple resumes per user)
- [ ] v1.3 — More templates, custom accent colors
- [ ] v1.4 — Job description matcher (tailor resume to a JD)