/**
 * Header.jsx
 * Top navigation bar.
 * Contains: brand logo, template switcher tabs, download button.
 */

import { useResume } from '../../context/ResumeContext'
import { useDownload } from '../../hooks/useDownload'

const TEMPLATES = [
  { id: 'modern', label: 'Modern' },
  { id: 'classic', label: 'Classic' },
  { id: 'creative', label: 'Creative' },
]

export default function Header() {
  const { resumeData, updateMeta } = useResume()
  const { handleDownload } = useDownload()
  const activeTemplate = resumeData.meta.template

  return (
    <header className="header">
      {/* Brand */}
      <div className="header-brand">
        <span className="brand-name">resume<span>.ai</span></span>
      </div>

      {/* Template Switcher */}
      <div className="tpl-tabs">
        {TEMPLATES.map(t => (
          <button
            key={t.id}
            className={`tpl-tab ${activeTemplate === t.id ? 'active' : ''}`}
            onClick={() => updateMeta('template', t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Actions */}
      <div className="header-actions">
        <button className="download-btn" onClick={handleDownload}>
          ↓ Download PDF
        </button>
      </div>
    </header>
  )
}
