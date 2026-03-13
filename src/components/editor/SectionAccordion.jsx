import { useState } from 'react'
import { S } from './EditorPanel'

const ChevronIcon = ({ open }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
    style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.18s ease', flexShrink: 0 }}>
    <path d="M6 9l6 6 6-6"/>
  </svg>
)

export default function SectionAccordion({ title, icon, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  const [hover, setHover] = useState(false)

  return (
    <div style={{
      border: '1px solid #e5e7eb',
      borderRadius: 10,
      background: '#fff',
      width: '100%',
      overflow: 'visible',
    }}>
      {/* Header button — clipped to border radius */}
      <button
        style={{
          ...S.sectionBtn,
          background: hover ? '#f5f3ff' : '#f9fafb',
          borderRadius: open ? '10px 10px 0 0' : 10,
          overflow: 'hidden',
        }}
        onClick={() => setOpen(o => !o)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <span style={S.sectionTitleWrap}>
          <span style={S.sectionIcon}>{icon}</span>
          <span style={S.sectionTitle}>{title}</span>
        </span>
        <ChevronIcon open={open} />
      </button>

      {/* Body — not clipped */}
      {open && (
        <div style={{
          ...S.sectionBody,
          borderRadius: '0 0 10px 10px',
        }}>
          {children}
        </div>
      )}
    </div>
  )
}