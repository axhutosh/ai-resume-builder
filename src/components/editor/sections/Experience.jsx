import { useState } from 'react'
import SectionAccordion from '../SectionAccordion'
import { S } from '../EditorPanel'
import { useResume } from '../../../context/ResumeContext'

const SectionIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
  </svg>
)
const PlusIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
const TrashIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2"/></svg>
const XIcon = () => <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>

function FInput({ value, onChange, placeholder, disabled }) {
  const [f, setF] = useState(false)
  return (
    <input
      style={{ ...S.input, border: f ? '1px solid #8b5cf6' : '1px solid #e5e7eb', background: f ? '#fff' : '#f9fafb', boxShadow: f ? '0 0 0 3px rgba(139,92,246,0.12)' : 'none', opacity: disabled ? 0.5 : 1 }}
      value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      disabled={disabled} onFocus={() => setF(true)} onBlur={() => setF(false)}
    />
  )
}

export default function Experience() {
  const { resumeData, updateSection } = useResume()
  const data = resumeData.experience

  const update = (i, f, v) => { const n = [...data]; n[i] = { ...n[i], [f]: v }; updateSection('experience', n) }
  const updateBullet = (i, bi, v) => { const n = [...data]; n[i].bullets[bi] = v; updateSection('experience', n) }
  const addBullet = (i) => { const n = [...data]; n[i].bullets.push(''); updateSection('experience', n) }
  const removeBullet = (i, bi) => { const n = [...data]; n[i].bullets.splice(bi, 1); updateSection('experience', n) }
  const addEntry = () => updateSection('experience', [...data, { id: crypto.randomUUID(), company: '', role: '', startDate: '', endDate: '', current: false, bullets: [''] }])
  const removeEntry = (i) => updateSection('experience', data.filter((_, idx) => idx !== i))

  return (
    <SectionAccordion title="Work Experience" icon={<SectionIcon />}>
      {data.map((exp, i) => (
        <div key={exp.id} style={S.entry}>
          <div style={S.entryHeader}>
            <span style={S.entryNum}>Experience #{i + 1}</span>
            {data.length > 1 && <button style={S.btnRemove} onClick={() => removeEntry(i)}><TrashIcon /></button>}
          </div>
          <div style={S.row2}>
            <FInput value={exp.company} onChange={v => update(i, 'company', v)} placeholder="Company Name" />
            <FInput value={exp.role} onChange={v => update(i, 'role', v)} placeholder="Job Title / Role" />
          </div>
          <div style={S.row3}>
            <FInput value={exp.startDate} onChange={v => update(i, 'startDate', v)} placeholder="Start (e.g. Jan 2022)" />
            <FInput value={exp.endDate} onChange={v => update(i, 'endDate', v)} placeholder="End date" disabled={exp.current} />
            <label style={S.checkbox}>
              <input type="checkbox" checked={exp.current} onChange={e => update(i, 'current', e.target.checked)} style={{ width: 15, height: 15, accentColor: '#7c3aed', cursor: 'pointer', margin: 0 }} />
              Current
            </label>
          </div>
          <div style={S.bulletsArea}>
            <label style={S.label}>Key Achievements</label>
            {exp.bullets.map((b, bi) => (
              <div key={bi} style={S.bulletRow}>
                <span style={S.bulletDot}>•</span>
                <input
                  style={S.bulletInput}
                  value={b} onChange={e => updateBullet(i, bi, e.target.value)}
                  placeholder="Increased revenue by 30% through…"
                />
                {exp.bullets.length > 1 && <button style={S.btnRemove} onClick={() => removeBullet(i, bi)}><XIcon /></button>}
              </div>
            ))}
            <button style={S.btnAddBullet} onClick={() => addBullet(i)}><PlusIcon /> Add bullet</button>
          </div>
        </div>
      ))}
      <button style={S.btnAddEntry} onClick={addEntry}><PlusIcon /> Add Experience</button>
    </SectionAccordion>
  )
}
