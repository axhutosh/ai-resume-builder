import { useState } from 'react'
import { useResume }   from '../../context/ResumeContext'
import { useTheme }    from '../../context/ThemeContext'
import { useDownload } from '../../hooks/useDownload'
import { ACCENT_COLORS } from '../../utils/resumeSchema'

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
    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
)

const MoonIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
  </svg>
)

export default function Header({ onOpenATS }) {
  const { resumeData, updateMeta } = useResume()
  const { theme, toggleTheme }     = useTheme()
  const { handleDownload }         = useDownload()
  const [colorHover, setColorHover] = useState(null)
  const accentColor = resumeData.meta.accentColor || '#6d28d9'

  return (
    <header className="app-header">

      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        <div className="brand-icon"><LogoIcon /></div>
        <span className="brand-name">Resu<span>mo</span></span>
      </div>

      {/* Centre: templates + color picker */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div className="tpl-tabs">
          {TEMPLATES.map(t => (
            <button key={t.id}
              className={`tpl-tab ${resumeData.meta.template === t.id ? 'active' : ''}`}
              onClick={() => updateMeta('template', t.id)}
            >{t.label}</button>
          ))}
        </div>

        <div style={{ width: 1, height: 22, background: '#e5e7eb', flexShrink: 0 }} />

        {/* Accent colors */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {ACCENT_COLORS.map(c => (
            <button key={c.value} title={c.label}
              onClick={() => updateMeta('accentColor', c.value)}
              onMouseEnter={() => setColorHover(c.value)}
              onMouseLeave={() => setColorHover(null)}
              style={{
                width: accentColor === c.value ? 22 : 16,
                height: accentColor === c.value ? 22 : 16,
                borderRadius: '50%', background: c.value,
                border: accentColor === c.value ? `3px solid ${c.value}` : '2px solid transparent',
                outline: accentColor === c.value ? '2px solid white' : colorHover === c.value ? `2px solid ${c.value}` : 'none',
                outlineOffset: 1, cursor: 'pointer', padding: 0,
                transition: 'all 0.15s ease', flexShrink: 0,
              }}
            />
          ))}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>

        {/* Theme toggle */}
        <button onClick={toggleTheme}
          title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          style={{
            width: 34, height: 34, borderRadius: 8,
            border: '1.5px solid #e5e7eb', background: '#f9fafb',
            color: '#6b7280', display: 'flex', alignItems: 'center',
            justifyContent: 'center', cursor: 'pointer',
          }}
        >
          {theme === 'light' ? <MoonIcon /> : <SunIcon />}
        </button>

        {/* ATS Score */}
        <button onClick={onOpenATS}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '8px 16px', borderRadius: 6,
            border: '1.5px solid #d1fae5', background: '#f0fdf4',
            fontSize: 13, fontWeight: 600, color: '#065f46',
            cursor: 'pointer', fontFamily: "'Figtree', sans-serif",
            whiteSpace: 'nowrap',
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
          </svg>
          ATS Score
        </button>

        <button className="btn-download" onClick={handleDownload}>
          <DownloadIcon /> Download PDF
        </button>
      </div>
    </header>
  )
}