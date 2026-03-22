import { useState } from 'react'
import SectionAccordion from '../SectionAccordion'
import { S } from '../EditorPanel'
import { useResume } from '../../../context/ResumeContext'

const SectionIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
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

export default function Education() {
  const { resumeData, updateSection } = useResume()
  const data = resumeData.education

  const update = (i, f, v) => { const n = [...data]; n[i] = { ...n[i], [f]: v }; updateSection('education', n) }
  const addEntry = () => updateSection('education', [...data, { id: crypto.randomUUID(), school: '', degree: '', field: '', year: '', gpa: '' }])
  const removeEntry = (i) => updateSection('education', data.filter((_, idx) => idx !== i))

  return (
    <SectionAccordion id="education" title="Education" icon={<SectionIcon />} defaultOpen={false}>
      {data.map((edu, i) => (
        <div key={edu.id} style={S.entry}>
          <div style={S.entryHeader}>
            <span style={S.entryNum}>Education #{i + 1}</span>
            {data.length > 1 && <button style={S.btnRemove} onClick={() => removeEntry(i)}><TrashIcon /></button>}
          </div>
          <div style={S.row2}>
            <FInput value={edu.school} onChange={v => update(i, 'school', v)} placeholder="University / School" />
            <FInput value={edu.degree} onChange={v => update(i, 'degree', v)} placeholder="Degree (e.g. B.Sc)" />
          </div>
          <div style={S.row3}>
            <FInput value={edu.field} onChange={v => update(i, 'field', v)} placeholder="Field of Study" />
            <FInput value={edu.year}  onChange={v => update(i, 'year', v)}  placeholder="Year" />
            <FInput value={edu.gpa}   onChange={v => update(i, 'gpa', v)}   placeholder="GPA" />
          </div>
        </div>
      ))}
      <button style={S.btnAddEntry} onClick={addEntry}><PlusIcon /> Add Education</button>
    </SectionAccordion>
  )
}