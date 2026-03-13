/**
 * Header.jsx
 * Top navigation — brand, template switcher, download button.
 */

import { useResume } from '../../context/ResumeContext'
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

export default function Header() {
  const { resumeData, updateMeta } = useResume()
  const { handleDownload } = useDownload()

  return (
    <header className="app-header">
      {/* Brand */}
      <div className="header-brand">
        <div className="brand-icon"><LogoIcon /></div>
        <span className="brand-name">resume<span>.ai</span></span>
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
        <button className="btn-download" onClick={handleDownload}>
          <DownloadIcon /> Download PDF
        </button>
      </div>
    </header>
  )
}