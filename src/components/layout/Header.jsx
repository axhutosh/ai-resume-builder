/**
 * Header.jsx
 * Top navigation — brand, template switcher, theme toggle, download button.
 */

import { useResume } from '../../context/ResumeContext'
import { useTheme }  from '../../context/ThemeContext'
import { useDownload } from '../../hooks/useDownload'

const TEMPLATES = [
  { id: 'modern',   label: 'Modern'   },
  { id: 'classic',  label: 'Classic'  },
  { id: 'creative', label: 'Creative' },
]

const LogoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
)

const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
)

const SunIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
)

const MoonIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
  </svg>
)

export default function Header() {
  const { resumeData, updateMeta } = useResume()
  const { theme, toggleTheme }     = useTheme()
  const { handleDownload }         = useDownload()

  return (
    <header className="app-header">

      {/* Brand */}
      <div className="header-brand">
        <div className="brand-icon"><LogoIcon /></div>
        <span className="brand-name">Resu<span>mo</span></span>
      </div>

      {/* Template switcher */}
      <div className="tpl-tabs">
        {TEMPLATES.map(t => (
          <button
            key={t.id}
            className={`tpl-tab ${resumeData.meta.template === t.id ? 'active' : ''}`}
            onClick={() => updateMeta('template', t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Actions */}
      <div className="header-actions">
        <button
          className="btn-theme-toggle"
          onClick={toggleTheme}
          title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <MoonIcon /> : <SunIcon />}
        </button>

        <button className="btn-download" onClick={handleDownload}>
          <DownloadIcon /> Download PDF
        </button>
      </div>

    </header>
  )
}