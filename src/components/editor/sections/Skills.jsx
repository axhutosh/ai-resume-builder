import { useState } from 'react'
import SectionAccordion from '../SectionAccordion'
import { S } from '../EditorPanel'
import { useResume } from '../../../context/ResumeContext'

const SectionIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M5.34 5.34L3.93 6.75M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M18.07 18.07l-1.41-1.41"/>
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

export default function Skills() {
  const { resumeData, updateSection } = useResume()
  const data = resumeData.skills

  const update = (i, f, v) => { const n = [...data]; n[i] = { ...n[i], [f]: v }; updateSection('skills', n) }
  const addEntry = () => updateSection('skills', [...data, { id: crypto.randomUUID(), category: '', items: '' }])
  const removeEntry = (i) => updateSection('skills', data.filter((_, idx) => idx !== i))

  return (
    <SectionAccordion id="skills" title="Skills" icon={<SectionIcon />} defaultOpen={false}>
      {data.map((skill, i) => (
        <div key={skill.id} style={S.entry}>
          <div style={S.entryHeader}>
            <span style={S.entryNum}>Group #{i + 1}</span>
            {data.length > 1 && <button style={S.btnRemove} onClick={() => removeEntry(i)}><TrashIcon /></button>}
          </div>
          <div style={S.row2}>
            <FInput value={skill.category} onChange={v => update(i, 'category', v)} placeholder="Category (e.g. Languages)" />
            <FInput value={skill.items}    onChange={v => update(i, 'items', v)}    placeholder="React, Node.js, Python…" />
          </div>
        </div>
      ))}
      <button style={S.btnAddEntry} onClick={addEntry}><PlusIcon /> Add Skill Group</button>
    </SectionAccordion>
  )
}