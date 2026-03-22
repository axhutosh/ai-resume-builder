import { useState } from 'react'
import SectionAccordion from '../SectionAccordion'
import { S } from '../EditorPanel'
import { useResume } from '../../../context/ResumeContext'

const SectionIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
)

const TrashIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2"/>
  </svg>
)

export default function CustomSection({ section }) {
  const { updateCustomSection, removeCustomSection } = useResume()
  const [focused, setFocused] = useState(false)

  return (
    <SectionAccordion id={section.id} title={section.title} icon={<SectionIcon />}>
      <textarea
        style={{
          ...S.textarea,
          border: focused ? '1px solid #8b5cf6' : '1px solid #e5e7eb',
          background: focused ? '#fff' : '#f9fafb',
          boxShadow: focused ? '0 0 0 3px rgba(139,92,246,0.12)' : 'none',
          minHeight: 100,
        }}
        rows={4}
        placeholder="Add content for this section…"
        value={section.content}
        onChange={e => updateCustomSection(section.id, 'content', e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <button
        onClick={() => removeCustomSection(section.id)}
        style={{
          display: 'flex', alignItems: 'center', gap: 5,
          fontSize: 12, fontWeight: 500, color: '#ef4444',
          border: 'none', background: 'transparent', padding: '2px 4px',
          cursor: 'pointer', fontFamily: "'Figtree', sans-serif",
          alignSelf: 'flex-start',
        }}
      >
        <TrashIcon /> Remove section
      </button>
    </SectionAccordion>
  )
}