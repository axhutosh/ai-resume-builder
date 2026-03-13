import { useState } from 'react'
import SectionAccordion from '../SectionAccordion'
import { S } from '../EditorPanel'
import { useResume } from '../../../context/ResumeContext'

const SectionIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
  </svg>
)

const SparkleIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
  </svg>
)

export default function Summary({ onOpenAI }) {
  const { resumeData, updateSection } = useResume()
  const [focused, setFocused] = useState(false)

  return (
    <SectionAccordion title="Professional Summary" icon={<SectionIcon />}>
      <textarea
        style={{
          ...S.textarea,
          border: focused ? '1px solid #8b5cf6' : '1px solid #e5e7eb',
          background: focused ? '#fff' : '#f9fafb',
          boxShadow: focused ? '0 0 0 3px rgba(139,92,246,0.12)' : 'none',
          minHeight: 90,
        }}
        rows={4}
        placeholder="A results-driven professional with 5+ years of experience in…"
        value={resumeData.summary}
        onChange={e => updateSection('summary', e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <button style={S.btnAiTrigger} onClick={onOpenAI}>
        <SparkleIcon /> Improve with AI
      </button>
    </SectionAccordion>
  )
}
