import { useState } from 'react'
import SectionAccordion from '../SectionAccordion'
import { S } from '../EditorPanel'
import { useResume } from '../../../context/ResumeContext'

const SectionIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
  </svg>
)
const PlusIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
const TrashIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2"/></svg>

function FInput({ value, onChange, placeholder }) {
  const [f, setF] = useState(false)
  return (
    <input
      style={{ ...S.input, border: f ? '1px solid #8b5cf6' : '1px solid #e5e7eb', background: f ? '#fff' : '#f9fafb', boxShadow: f ? '0 0 0 3px rgba(139,92,246,0.12)' : 'none' }}
      value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      onFocus={() => setF(true)} onBlur={() => setF(false)}
    />
  )
}

export default function Certifications() {
  const { resumeData, updateSection } = useResume()
  const data = resumeData.certifications || []

  const update = (i, f, v) => { const n = [...data]; n[i] = { ...n[i], [f]: v }; updateSection('certifications', n) }
  const addEntry = () => updateSection('certifications', [...data, { id: crypto.randomUUID(), name: '', issuer: '', year: '' }])
  const removeEntry = (i) => updateSection('certifications', data.filter((_, idx) => idx !== i))

  return (
    <SectionAccordion id="certifications" title="Certifications" icon={<SectionIcon />} defaultOpen={false}>
      {data.map((cert, i) => (
        <div key={cert.id} style={S.entry}>
          <div style={S.entryHeader}>
            <span style={S.entryNum}>Cert #{i + 1}</span>
            {data.length > 1 && <button style={S.btnRemove} onClick={() => removeEntry(i)}><TrashIcon /></button>}
          </div>
          <FInput value={cert.name}   onChange={v => update(i, 'name', v)}   placeholder="Certificate Name (e.g. AWS Solutions Architect)" />
          <div style={S.row2}>
            <FInput value={cert.issuer} onChange={v => update(i, 'issuer', v)} placeholder="Issuing Body (e.g. Amazon)" />
            <FInput value={cert.year}   onChange={v => update(i, 'year', v)}   placeholder="Year" />
          </div>
        </div>
      ))}
      <button style={S.btnAddEntry} onClick={addEntry}><PlusIcon /> Add Certification</button>
    </SectionAccordion>
  )
}