/**
 * Modern.jsx
 * Clean, minimal resume template with violet accent line.
 * Props: data — full resumeData object from context
 */

export default function Modern({ data }) {
  const { personal, summary, experience, education, skills, projects } = data

  return (
    <div className="tpl-modern">
      {/* Header */}
      <div className="tpl-m-header">
        <div>
          <h1 className="tpl-m-name">{personal.name || 'Your Name'}</h1>
          <p className="tpl-m-title">{personal.title || 'Professional Title'}</p>
        </div>
        <div className="tpl-m-contact">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="tpl-section">
          <div className="tpl-section-title">Summary</div>
          <p className="tpl-body-text">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.some(e => e.company || e.role) && (
        <div className="tpl-section">
          <div className="tpl-section-title">Experience</div>
          {experience.map(exp => (exp.company || exp.role) ? (
            <div key={exp.id} className="tpl-entry">
              <div className="tpl-entry-header">
                <div>
                  <span className="tpl-entry-main">{exp.role}</span>
                  {exp.company && <span className="tpl-entry-sub"> · {exp.company}</span>}
                </div>
                <span className="tpl-entry-date">
                  {exp.startDate}{exp.startDate && ' – '}{exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <ul className="tpl-bullets">
                {exp.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          ) : null)}
        </div>
      )}

      {/* Education */}
      {education.some(e => e.school) && (
        <div className="tpl-section">
          <div className="tpl-section-title">Education</div>
          {education.map(edu => edu.school ? (
            <div key={edu.id} className="tpl-entry">
              <div className="tpl-entry-header">
                <div>
                  <span className="tpl-entry-main">{edu.degree} {edu.field}</span>
                  <span className="tpl-entry-sub"> · {edu.school}</span>
                </div>
                <span className="tpl-entry-date">{edu.year}</span>
              </div>
            </div>
          ) : null)}
        </div>
      )}

      {/* Skills */}
      {skills.some(s => s.items) && (
        <div className="tpl-section">
          <div className="tpl-section-title">Skills</div>
          {skills.map(s => s.items ? (
            <div key={s.id} className="tpl-skills-row">
              {s.category && <span className="tpl-skill-cat">{s.category}:</span>}
              <span className="tpl-skill-items">{s.items}</span>
            </div>
          ) : null)}
        </div>
      )}

      {/* Projects */}
      {projects.some(p => p.name) && (
        <div className="tpl-section">
          <div className="tpl-section-title">Projects</div>
          {projects.map(p => p.name ? (
            <div key={p.id} className="tpl-entry">
              <div className="tpl-entry-header">
                <span className="tpl-entry-main">{p.name}</span>
                {p.techStack && <span className="tpl-tech-tag">{p.techStack}</span>}
              </div>
              {p.description && <p className="tpl-body-text">{p.description}</p>}
            </div>
          ) : null)}
        </div>
      )}
    </div>
  )
}
