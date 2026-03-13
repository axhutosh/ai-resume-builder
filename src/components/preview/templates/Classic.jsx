export default function Classic({ data }) {
  const { personal: p, summary, experience, education, skills, certifications = [], projects } = data
  const contact = [p.email, p.phone, p.location].filter(Boolean).join('  |  ')
  const links   = [p.linkedin, p.website].filter(Boolean).join('  |  ')

  return (
    <div className="tpl-classic">

      <div className="tpl-c-header">
        <h1 className="tpl-c-name">{p.name || 'Your Name'}</h1>
        {p.title && <p className="tpl-c-title">{p.title}</p>}
        <hr className="tpl-c-rule" />
        {contact && <p className="tpl-c-contact">{contact}</p>}
        {links   && <p className="tpl-c-contact" style={{marginTop:3}}>{links}</p>}
        <hr className="tpl-c-rule-thin" />
      </div>

      {summary && (
        <div className="tpl-c-section">
          <div className="tpl-c-heading">Objective</div>
          <p className="tpl-c-body">{summary}</p>
        </div>
      )}

      {experience.some(e => e.company) && (
        <div className="tpl-c-section">
          <div className="tpl-c-heading">Professional Experience</div>
          {experience.map(e => e.company ? (
            <div key={e.id} className="tpl-c-entry">
              <div className="tpl-c-entry-top">
                <span><strong>{e.role}</strong>{e.company && `, ${e.company}`}</span>
                <span className="tpl-c-date">{e.startDate}{e.startDate && '–'}{e.current ? 'Present' : e.endDate}</span>
              </div>
              {e.bullets.filter(Boolean).length > 0 && (
                <ul className="tpl-c-bullets">{e.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>
              )}
            </div>
          ) : null)}
        </div>
      )}

      {education.some(e => e.school) && (
        <div className="tpl-c-section">
          <div className="tpl-c-heading">Education</div>
          {education.map(e => e.school ? (
            <div key={e.id} className="tpl-c-entry">
              <div className="tpl-c-entry-top">
                <span><strong>{[e.degree, e.field].filter(Boolean).join(' in ')}</strong>{e.school && ` — ${e.school}`}</span>
                <span className="tpl-c-date">{e.year}{e.gpa ? ` · ${e.gpa}` : ''}</span>
              </div>
            </div>
          ) : null)}
        </div>
      )}

      {skills.some(s => s.items) && (
        <div className="tpl-c-section">
          <div className="tpl-c-heading">Skills</div>
          {skills.map(s => s.items ? (
            <p key={s.id} className="tpl-c-body" style={{marginBottom:4}}>
              <strong>{s.category}: </strong>{s.items}
            </p>
          ) : null)}
        </div>
      )}

      {certifications.some(c => c.name) && (
        <div className="tpl-c-section">
          <div className="tpl-c-heading">Certifications</div>
          {certifications.map(c => c.name ? (
            <div key={c.id} className="tpl-c-entry">
              <div className="tpl-c-entry-top">
                <strong>{c.name}</strong>
                <span className="tpl-c-date">{[c.issuer, c.year].filter(Boolean).join(' · ')}</span>
              </div>
            </div>
          ) : null)}
        </div>
      )}

      {projects.some(p => p.name) && (
        <div className="tpl-c-section">
          <div className="tpl-c-heading">Projects</div>
          {projects.map(p => p.name ? (
            <div key={p.id} className="tpl-c-entry">
              <div className="tpl-c-entry-top">
                <strong>{p.name}</strong>
                {p.techStack && <span className="tpl-c-date">{p.techStack}</span>}
              </div>
              {p.description && <p className="tpl-c-body">{p.description}</p>}
            </div>
          ) : null)}
        </div>
      )}

    </div>
  )
}