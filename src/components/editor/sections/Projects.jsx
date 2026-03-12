/**
 * Projects.jsx
 * Repeatable project entries.
 */

import SectionAccordion from '../SectionAccordion'
import { useResume } from '../../../context/ResumeContext'

export default function Projects() {
  const { resumeData, updateSection } = useResume()
  const data = resumeData.projects

  const update = (index, field, value) => {
    const next = [...data]
    next[index] = { ...next[index], [field]: value }
    updateSection('projects', next)
  }

  const addEntry = () => {
    updateSection('projects', [
      ...data,
      { id: crypto.randomUUID(), name: '', description: '', techStack: '', link: '' },
    ])
  }

  const removeEntry = (index) => {
    updateSection('projects', data.filter((_, i) => i !== index))
  }

  return (
    <SectionAccordion title="Projects" icon="🛠️" defaultOpen={false}>
      {data.map((proj, i) => (
        <div key={proj.id} className="repeatable-entry">
          <div className="entry-header">
            <span className="entry-num">Project #{i + 1}</span>
            {data.length > 1 && (
              <button className="remove-btn" onClick={() => removeEntry(i)}>🗑</button>
            )}
          </div>
          <div className="grid-2">
            <input className="field-input" placeholder="Project Name" value={proj.name} onChange={e => update(i, 'name', e.target.value)} />
            <input className="field-input" placeholder="Tech Stack" value={proj.techStack} onChange={e => update(i, 'techStack', e.target.value)} />
          </div>
          <textarea
            className="field-textarea"
            rows={2}
            placeholder="What you built and its impact..."
            value={proj.description}
            onChange={e => update(i, 'description', e.target.value)}
          />
          <input className="field-input" placeholder="Live URL or GitHub link" value={proj.link} onChange={e => update(i, 'link', e.target.value)} />
        </div>
      ))}
      <button className="add-btn" onClick={addEntry}>+ Add Project</button>
    </SectionAccordion>
  )
}
