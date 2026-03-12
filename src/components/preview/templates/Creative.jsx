/**
 * Creative.jsx
 * Two-column resume template with indigo sidebar.
 * Props: data — full resumeData object from context
 */

export default function Creative({ data }) {
  const { personal, summary, experience, education, skills, projects } = data

  return (
    <div className="tpl-creative">
      {/* Sidebar */}
      <div className="tpl-cr-sidebar">
        <div className="tpl-cr-avatar">{(personal.name || '?')[0]}</div>
        <h2 className="tpl-cr-name">{personal.name || 'Your Name'}</h2>
        <p className="tpl-cr-title">{personal.title || 'Your Title'}</p>
        <div className="tpl-cr-divider" />
        <div className="tpl-cr-contact">
          {personal.email && <div className="tpl-cr-contact-item">✉ {personal.email}</div>}
          {personal.phone && <div className="tpl-cr-contact-item">☎ {personal.phone}</div>}
          {personal.location && <div className="tpl-cr-contact-item">⊙ {personal.location}</div>}
        </div>
        {skills.some(s => s.items) && (
          <div className="tpl-cr-skills">
            <div className="tpl-cr-sec-title">SKILLS</div>
            {skills.map(s => s.items ? (
              <div key={s.id}>
                {s.category && <div className="tpl-cr-skill-cat">{s.category}</div>}
                <div className="tpl-cr-skill-items">{s.items}</div>
              </div>
            ) : null)}
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="tpl-cr-main">
        {summary && (
          <div className="tpl-cr-section">
            <div className="tpl-cr-sec-title">ABOUT ME</div>
            <p className="tpl-cr-body">{summary}</p>
          </div>
        )}
        {experience.some(e => e.company) && (
          <div className="tpl-cr-section">
            <div className="tpl-cr-sec-title">EXPERIENCE</div>
            {experience.map(exp => exp.company ? (
              <div key={exp.id} className="tpl-cr-entry">
                <div className="tpl-cr-role">{exp.role}</div>
                <div className="tpl-cr-company">{exp.company} · {exp.startDate}{exp.startDate && '–'}{exp.current ? 'Present' : exp.endDate}</div>
                <ul className="tpl-cr-bullets">
                  {exp.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            ) : null)}
          </div>
        )}
        {education.some(e => e.school) && (
          <div className="tpl-cr-section">
            <div className="tpl-cr-sec-title">EDUCATION</div>
            {education.map(edu => edu.school ? (
              <div key={edu.id} className="tpl-cr-entry">
                <div className="tpl-cr-role">{edu.degree} in {edu.field}</div>
                <div className="tpl-cr-company">{edu.school} · {edu.year}</div>
              </div>
            ) : null)}
          </div>
        )}
        {projects.some(p => p.name) && (
          <div className="tpl-cr-section">
            <div className="tpl-cr-sec-title">PROJECTS</div>
            {projects.map(p => p.name ? (
              <div key={p.id} className="tpl-cr-entry">
                <div className="tpl-cr-role">{p.name} {p.techStack && <span className="tpl-cr-tech">· {p.techStack}</span>}</div>
                {p.description && <div className="tpl-cr-body">{p.description}</div>}
              </div>
            ) : null)}
          </div>
        )}
      </div>
    </div>
  )
}
