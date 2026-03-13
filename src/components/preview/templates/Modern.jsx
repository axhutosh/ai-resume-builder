export default function Modern({ data }) {
  const { personal: p, summary, experience, education, skills, certifications = [], projects } = data

  return (
    <div className="tpl-modern">

      {/* Header */}
      <div className="tpl-m-header">
        <div>
          <h1 className="tpl-m-name">{p.name || 'Your Name'}</h1>
          <p className="tpl-m-title">{p.title || 'Professional Title'}</p>
        </div>
        <div className="tpl-m-contact">
          {p.email    && <span>{p.email}</span>}
          {p.phone    && <span>{p.phone}</span>}
          {p.location && <span>{p.location}</span>}
          {p.linkedin && <span>{p.linkedin}</span>}
          {p.website  && <span>{p.website}</span>}
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
          {experience.map(e => (e.company || e.role) ? (
            <div key={e.id} className="tpl-entry">
              <div className="tpl-entry-top">
                <div>
                  <span className="tpl-entry-role">{e.role}</span>
                  {e.company && <span className="tpl-entry-company"> · {e.company}</span>}
                </div>
                <span className="tpl-entry-date">
                  {e.startDate}{e.startDate && ' – '}{e.current ? 'Present' : e.endDate}
                </span>
              </div>
              {e.bullets.filter(Boolean).length > 0 && (
                <ul className="tpl-bullets">{e.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>
              )}
            </div>
          ) : null)}
        </div>
      )}

      {/* Education */}
      {education.some(e => e.school) && (
        <div className="tpl-section">
          <div className="tpl-section-title">Education</div>
          {education.map(e => e.school ? (
            <div key={e.id} className="tpl-entry">
              <div className="tpl-entry-top">
                <div>
                  <span className="tpl-entry-role">{[e.degree, e.field].filter(Boolean).join(' in ')}</span>
                  <span className="tpl-entry-company"> · {e.school}</span>
                </div>
                <span className="tpl-entry-date">{e.year}{e.gpa ? ` · GPA ${e.gpa}` : ''}</span>
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

      {/* Certifications */}
      {certifications.some(c => c.name) && (
        <div className="tpl-section">
          <div className="tpl-section-title">Certifications</div>
          {certifications.map(c => c.name ? (
            <div key={c.id} className="tpl-entry">
              <div className="tpl-entry-top">
                <span className="tpl-entry-role">{c.name}</span>
                <span className="tpl-entry-date">{[c.issuer, c.year].filter(Boolean).join(' · ')}</span>
              </div>
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
              <div className="tpl-entry-top">
                <span className="tpl-entry-role">{p.name}</span>
                {p.techStack && <span className="tpl-tech-tag">{p.techStack}</span>}
              </div>
              {p.description && <p className="tpl-body-text">{p.description}</p>}
              {p.link && <span style={{fontSize:11.5, color:'#6366f1'}}>{p.link}</span>}
            </div>
          ) : null)}
        </div>
      )}

    </div>
  )
}