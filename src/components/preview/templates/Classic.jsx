/**
 * Classic.jsx
 * Traditional serif resume template, centered header.
 * Props: data — full resumeData object from context
 */

export default function Classic({ data }) {
  const { personal, summary, experience, education, skills } = data

  return (
    <div className="tpl-classic">
      <div className="tpl-c-header">
        <h1 className="tpl-c-name">{personal.name || 'Your Name'}</h1>
        <div className="tpl-c-divider" />
        <div className="tpl-c-contact">
          {[personal.email, personal.phone, personal.location].filter(Boolean).join('  |  ')}
        </div>
      </div>

      {summary && (
        <div className="tpl-c-section">
          <div className="tpl-c-title">OBJECTIVE</div>
          <p className="tpl-c-body">{summary}</p>
        </div>
      )}

      {experience.some(e => e.company) && (
        <div className="tpl-c-section">
          <div className="tpl-c-title">PROFESSIONAL EXPERIENCE</div>
          {experience.map(exp => exp.company ? (
            <div key={exp.id} className="tpl-c-entry">
              <div className="tpl-c-entry-top">
                <strong>{exp.role}</strong>{exp.company && `, ${exp.company}`}
                <span className="tpl-c-date">{exp.startDate}{exp.startDate && '–'}{exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <ul className="tpl-c-bullets">
                {exp.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          ) : null)}
        </div>
      )}

      {education.some(e => e.school) && (
        <div className="tpl-c-section">
          <div className="tpl-c-title">EDUCATION</div>
          {education.map(edu => edu.school ? (
            <div key={edu.id} className="tpl-c-entry">
              <div className="tpl-c-entry-top">
                <strong>{edu.degree} in {edu.field}</strong> — {edu.school}
                <span className="tpl-c-date">{edu.year}</span>
              </div>
            </div>
          ) : null)}
        </div>
      )}

      {skills.some(s => s.items) && (
        <div className="tpl-c-section">
          <div className="tpl-c-title">SKILLS</div>
          {skills.map(s => s.items ? (
            <p key={s.id} className="tpl-c-body"><strong>{s.category}:</strong> {s.items}</p>
          ) : null)}
        </div>
      )}
    </div>
  )
}
