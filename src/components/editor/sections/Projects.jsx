import { useState } from 'react'
import SectionAccordion from '../SectionAccordion'
import { S } from '../EditorPanel'
import { useResume } from '../../../context/ResumeContext'

const SectionIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
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

function FTextarea({ value, onChange, placeholder, rows = 2 }) {
  const [f, setF] = useState(false)
  return (
    <textarea
      style={{ ...S.textarea, border: f ? '1px solid #8b5cf6' : '1px solid #e5e7eb', background: f ? '#fff' : '#f9fafb', boxShadow: f ? '0 0 0 3px rgba(139,92,246,0.12)' : 'none' }}
      rows={rows} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      onFocus={() => setF(true)} onBlur={() => setF(false)}
    />
  )
}

export default function Projects() {
  const { resumeData, updateSection } = useResume()
  const data = resumeData.projects

  const update = (i, f, v) => { const n = [...data]; n[i] = { ...n[i], [f]: v }; updateSection('projects', n) }
  const addEntry = () => updateSection('projects', [...data, { id: crypto.randomUUID(), name: '', description: '', techStack: '', link: '' }])
  const removeEntry = (i) => updateSection('projects', data.filter((_, idx) => idx !== i))

  return (
    <SectionAccordion id="projects" title="Projects" icon={<SectionIcon />} defaultOpen={false}>
      {data.map((proj, i) => (
        <div key={proj.id} style={S.entry}>
          <div style={S.entryHeader}>
            <span style={S.entryNum}>Project #{i + 1}</span>
            {data.length > 1 && <button style={S.btnRemove} onClick={() => removeEntry(i)}><TrashIcon /></button>}
          </div>
          <div style={S.row2}>
            <FInput value={proj.name}      onChange={v => update(i, 'name', v)}      placeholder="Project Name" />
            <FInput value={proj.techStack} onChange={v => update(i, 'techStack', v)} placeholder="Tech Stack" />
          </div>
          <FTextarea value={proj.description} onChange={v => update(i, 'description', v)} placeholder="What you built and its impact…" />
          <FInput value={proj.link} onChange={v => update(i, 'link', v)} placeholder="Live URL or GitHub link" />
        </div>
      ))}
      <button style={S.btnAddEntry} onClick={addEntry}><PlusIcon /> Add Project</button>
    </SectionAccordion>
  )
}