/**
 * Experience.jsx
 * Repeatable work experience entries with bullet points.
 */

import SectionAccordion from '../SectionAccordion'
import { useResume } from '../../../context/ResumeContext'

export default function Experience() {
  const { resumeData, updateSection } = useResume()
  const data = resumeData.experience

  const update = (index, field, value) => {
    const next = [...data]
    next[index] = { ...next[index], [field]: value }
    updateSection('experience', next)
  }

  const updateBullet = (expIndex, bulletIndex, value) => {
    const next = [...data]
    next[expIndex].bullets[bulletIndex] = value
    updateSection('experience', next)
  }

  const addBullet = (expIndex) => {
    const next = [...data]
    next[expIndex].bullets.push('')
    updateSection('experience', next)
  }

  const removeBullet = (expIndex, bulletIndex) => {
    const next = [...data]
    next[expIndex].bullets.splice(bulletIndex, 1)
    updateSection('experience', next)
  }

  const addEntry = () => {
    updateSection('experience', [
      ...data,
      { id: crypto.randomUUID(), company: '', role: '', startDate: '', endDate: '', current: false, bullets: [''] },
    ])
  }

  const removeEntry = (index) => {
    updateSection('experience', data.filter((_, i) => i !== index))
  }

  return (
    <SectionAccordion title="Work Experience" icon="💼">
      {data.map((exp, i) => (
        <div key={exp.id} className="repeatable-entry">
          <div className="entry-header">
            <span className="entry-num">Experience #{i + 1}</span>
            {data.length > 1 && (
              <button className="remove-btn" onClick={() => removeEntry(i)}>🗑</button>
            )}
          </div>
          <div className="grid-2">
            <input className="field-input" placeholder="Company" value={exp.company} onChange={e => update(i, 'company', e.target.value)} />
            <input className="field-input" placeholder="Job Title" value={exp.role} onChange={e => update(i, 'role', e.target.value)} />
          </div>
          <div className="grid-3">
            <input className="field-input" placeholder="Start Date" value={exp.startDate} onChange={e => update(i, 'startDate', e.target.value)} />
            <input className="field-input" placeholder="End Date" value={exp.endDate} onChange={e => update(i, 'endDate', e.target.value)} />
            <label className="checkbox-wrap">
              <input type="checkbox" checked={exp.current} onChange={e => update(i, 'current', e.target.checked)} />
              Current
            </label>
          </div>

          {/* Bullets */}
          <div className="bullets-area">
            <p className="field-label">Key Achievements</p>
            {exp.bullets.map((b, bi) => (
              <div key={bi} className="bullet-row">
                <span className="bullet-dot">•</span>
                <input
                  className="bullet-input"
                  placeholder="Increased revenue by 30%..."
                  value={b}
                  onChange={e => updateBullet(i, bi, e.target.value)}
                />
                {exp.bullets.length > 1 && (
                  <button className="bullet-remove" onClick={() => removeBullet(i, bi)}>✕</button>
                )}
              </div>
            ))}
            <button className="add-bullet-btn" onClick={() => addBullet(i)}>+ Add bullet</button>
          </div>
        </div>
      ))}
      <button className="add-btn" onClick={addEntry}>+ Add Experience</button>
    </SectionAccordion>
  )
}
