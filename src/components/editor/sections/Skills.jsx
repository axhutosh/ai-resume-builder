/**
 * Skills.jsx
 * Skill groups with category + comma-separated items.
 */

import SectionAccordion from '../SectionAccordion'
import { useResume } from '../../../context/ResumeContext'

export default function Skills() {
  const { resumeData, updateSection } = useResume()
  const data = resumeData.skills

  const update = (index, field, value) => {
    const next = [...data]
    next[index] = { ...next[index], [field]: value }
    updateSection('skills', next)
  }

  const addEntry = () => {
    updateSection('skills', [
      ...data,
      { id: crypto.randomUUID(), category: '', items: '' },
    ])
  }

  const removeEntry = (index) => {
    updateSection('skills', data.filter((_, i) => i !== index))
  }

  return (
    <SectionAccordion title="Skills" icon="⚙️" defaultOpen={false}>
      {data.map((skill, i) => (
        <div key={skill.id} className="repeatable-entry">
          <div className="entry-header">
            <span className="entry-num">Group #{i + 1}</span>
            {data.length > 1 && (
              <button className="remove-btn" onClick={() => removeEntry(i)}>🗑</button>
            )}
          </div>
          <div className="grid-2">
            <input className="field-input" placeholder="Category (e.g. Languages)" value={skill.category} onChange={e => update(i, 'category', e.target.value)} />
            <input className="field-input" placeholder="Skills, comma separated" value={skill.items} onChange={e => update(i, 'items', e.target.value)} />
          </div>
        </div>
      ))}
      <button className="add-btn" onClick={addEntry}>+ Add Skill Group</button>
    </SectionAccordion>
  )
}
