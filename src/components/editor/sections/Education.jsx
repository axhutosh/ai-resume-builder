/**
 * Education.jsx
 * Repeatable education entries.
 */

import SectionAccordion from '../SectionAccordion'
import { useResume } from '../../../context/ResumeContext'

export default function Education() {
  const { resumeData, updateSection } = useResume()
  const data = resumeData.education

  const update = (index, field, value) => {
    const next = [...data]
    next[index] = { ...next[index], [field]: value }
    updateSection('education', next)
  }

  const addEntry = () => {
    updateSection('education', [
      ...data,
      { id: crypto.randomUUID(), school: '', degree: '', field: '', year: '', gpa: '' },
    ])
  }

  const removeEntry = (index) => {
    updateSection('education', data.filter((_, i) => i !== index))
  }

  return (
    <SectionAccordion title="Education" icon="📚" defaultOpen={false}>
      {data.map((edu, i) => (
        <div key={edu.id} className="repeatable-entry">
          <div className="entry-header">
            <span className="entry-num">Education #{i + 1}</span>
            {data.length > 1 && (
              <button className="remove-btn" onClick={() => removeEntry(i)}>🗑</button>
            )}
          </div>
          <div className="grid-2">
            <input className="field-input" placeholder="School / University" value={edu.school} onChange={e => update(i, 'school', e.target.value)} />
            <input className="field-input" placeholder="Degree (e.g. B.Sc)" value={edu.degree} onChange={e => update(i, 'degree', e.target.value)} />
          </div>
          <div className="grid-3">
            <input className="field-input" placeholder="Field of Study" value={edu.field} onChange={e => update(i, 'field', e.target.value)} />
            <input className="field-input" placeholder="Graduation Year" value={edu.year} onChange={e => update(i, 'year', e.target.value)} />
            <input className="field-input" placeholder="GPA (optional)" value={edu.gpa} onChange={e => update(i, 'gpa', e.target.value)} />
          </div>
        </div>
      ))}
      <button className="add-btn" onClick={addEntry}>+ Add Education</button>
    </SectionAccordion>
  )
}
