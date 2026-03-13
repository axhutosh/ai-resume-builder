# resume.ai 🚀

An AI-powered resume builder with live preview, multiple templates, and Gemini AI integration.

![resume.ai](https://img.shields.io/badge/version-1.0.0-7c3aed?style=flat-square) ![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react) ![Vite](https://img.shields.io/badge/Vite-5-646cff?style=flat-square&logo=vite) ![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

🔗 **Live Demo:** [ai-resume-builder-axhutosh.vercel.app](https://ai-resume-builder-axhutosh.vercel.app)

---

## ✨ Features

- **Live Preview** — See your resume update in real time as you type
- **3 Templates** — Modern, Classic, and Creative layouts
- **AI-Powered** — Improve your professional summary with Gemini AI
- **All Sections** — Personal Info, Summary, Experience, Education, Skills, Certifications, Projects
- **PDF Export** — Download a print-ready PDF in one click
- **Clean Editor** — Accordion sections, inline validation, smooth UX

---

## 🖥️ Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 18 + Vite |
| Styling | Custom CSS (inline styles) |
| AI | Google Gemini 1.5 Flash |
| PDF | react-to-print |
| State | React Context API |
| Deploy | Vercel |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A [Google Gemini API key](https://aistudio.google.com/app/apikey)

### Installation

```bash
git clone https://github.com/axhutosh/ai-resume-builder.git
cd ai-resume-builder
npm install
```

### Environment Setup

Create a `.env.local` file in the project root:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

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
│   │   ├── Header.jsx          # Template switcher + PDF button
│   │   └── SplitLayout.jsx     # 50/50 split pane
│   ├── editor/
│   │   ├── EditorPanel.jsx     # Shared styles + panel shell
│   │   ├── SectionAccordion.jsx
│   │   └── sections/
│   │       ├── PersonalInfo.jsx
│   │       ├── Summary.jsx     # AI trigger button
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
│   └── ai/
│       └── AIPanel.jsx
├── context/
│   └── ResumeContext.jsx       # Global state + resumeRef
├── hooks/
│   ├── useAI.js                # Gemini API integration
│   └── useDownload.js          # react-to-print
└── utils/
    ├── resumeSchema.js         # Default data shape
    └── aiPrompts.js            # Prompt templates
```

---

## 🌿 Branch Strategy

```
main        ← stable, production-ready
staging     ← pre-release review
dev/name    ← personal feature branches
```

**Daily workflow:**
1. Work on `dev/your-name`
2. Open PR → `staging`
3. Review + merge
4. Merge `staging` → `main` to release

---

## 🤖 AI Setup

The AI feature uses **Google Gemini 1.5 Flash** to improve professional summaries.

1. Get a free API key at [aistudio.google.com](https://aistudio.google.com/app/apikey)
2. Add it to `.env.local` as `VITE_GEMINI_API_KEY`
3. Click **✨ Improve with AI** in the Summary section

> Free tier: 15 requests/min, 1500 requests/day

---

## 📦 Deployment

Deployed on **Vercel**. Every push to `main` triggers an automatic redeploy.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/axhutosh/ai-resume-builder)

---

## 📄 License

MIT © 2025 axhutosh