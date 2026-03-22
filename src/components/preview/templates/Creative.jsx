import { DEFAULT_SECTION_ORDER } from '../../../utils/resumeSchema'

export default function Creative({ data }) {
  const { personal: p, summary, experience, education, skills, certifications = [], projects, meta } = data
  const hidden = meta.hiddenSections || []
  const titles = meta.sectionTitles  || {}
  const order  = meta.sectionOrder   || DEFAULT_SECTION_ORDER
  const show   = (id) => !hidden.includes(id)
  const title  = (id, fallback) => titles[id] || fallback

  const mainSections = {
    summary: show('summary') && summary && (
      <div key="summary" className="tpl-cr-section">
        <div className="tpl-cr-section-title">{title('summary', 'About Me')}</div>
        <p className="tpl-cr-body">{summary}</p>
      </div>
    ),
    experience: show('experience') && experience.some(e => e.company) && (
      <div key="experience" className="tpl-cr-section">
        <div className="tpl-cr-section-title">{title('experience', 'Experience')}</div>
        {experience.map(e => e.company ? (
          <div key={e.id} className="tpl-cr-entry">
            <div className="tpl-cr-role">{e.role}</div>
            <div className="tpl-cr-company">{e.company}{e.startDate && ` · ${e.startDate}–${e.current ? 'Present' : e.endDate}`}</div>
            {e.bullets.filter(Boolean).length > 0 && (
              <ul className="tpl-cr-bullets">{e.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>
            )}
          </div>
        ) : null)}
      </div>
    ),
    education: show('education') && education.some(e => e.school) && (
      <div key="education" className="tpl-cr-section">
        <div className="tpl-cr-section-title">{title('education', 'Education')}</div>
        {education.map(e => e.school ? (
          <div key={e.id} className="tpl-cr-entry">
            <div className="tpl-cr-role">{[e.degree, e.field].filter(Boolean).join(' in ')}</div>
            <div className="tpl-cr-company">{e.school}{e.year && ` · ${e.year}`}{e.gpa && ` · GPA ${e.gpa}`}</div>
          </div>
        ) : null)}
      </div>
    ),
    projects: show('projects') && projects.some(p => p.name) && (
      <div key="projects" className="tpl-cr-section">
        <div className="tpl-cr-section-title">{title('projects', 'Projects')}</div>
        {projects.map(p => p.name ? (
          <div key={p.id} className="tpl-cr-entry">
            <div className="tpl-cr-role">{p.name}{p.techStack && <span className="tpl-cr-tech"> · {p.techStack}</span>}</div>
            {p.description && <div className="tpl-cr-body">{p.description}</div>}
            {p.link && <div style={{fontSize:11, color:'#6366f1', marginTop:2}}>{p.link}</div>}
          </div>
        ) : null)}
      </div>
    ),
  }

  return (
    <div className="tpl-creative">
      {/* Sidebar */}
      <div className="tpl-cr-sidebar">
        {show('personal') && (
          <>
            <div className="tpl-cr-monogram">{(p.name || '?')[0].toUpperCase()}</div>
            <h2 className="tpl-cr-name">{p.name || 'Your Name'}</h2>
            {p.title && <p className="tpl-cr-title">{p.title}</p>}
            <div className="tpl-cr-divider" />
            <div className="tpl-cr-contact">
              {p.email    && <div className="tpl-cr-contact-item">✉ {p.email}</div>}
              {p.phone    && <div className="tpl-cr-contact-item">☎ {p.phone}</div>}
              {p.location && <div className="tpl-cr-contact-item">⊙ {p.location}</div>}
              {p.linkedin && <div className="tpl-cr-contact-item">in {p.linkedin}</div>}
              {p.website  && <div className="tpl-cr-contact-item">⌖ {p.website}</div>}
            </div>
          </>
        )}
        {show('skills') && skills.some(s => s.items) && (
          <>
            <div className="tpl-cr-divider" />
            <div className="tpl-cr-sidebar-section">
              <div className="tpl-cr-sidebar-heading">{title('skills', 'Skills')}</div>
              {skills.map(s => s.items ? (
                <div key={s.id} className="tpl-cr-skill-group">
                  {s.category && <div className="tpl-cr-skill-cat">{s.category}</div>}
                  <div className="tpl-cr-skill-items">{s.items}</div>
                </div>
              ) : null)}
            </div>
          </>
        )}
        {show('certifications') && certifications.some(c => c.name) && (
          <>
            <div className="tpl-cr-divider" />
            <div className="tpl-cr-sidebar-section">
              <div className="tpl-cr-sidebar-heading">{title('certifications', 'Certifications')}</div>
              {certifications.map(c => c.name ? (
                <div key={c.id} className="tpl-cr-skill-group">
                  <div className="tpl-cr-skill-items">{c.name}</div>
                  {(c.issuer || c.year) && <div className="tpl-cr-skill-cat">{[c.issuer, c.year].filter(Boolean).join(' · ')}</div>}
                </div>
              ) : null)}
            </div>
          </>
        )}
      </div>

      {/* Main — rendered in order, skip sidebar sections */}
      <div className="tpl-cr-main">
        {order
          .filter(id => !['personal', 'skills', 'certifications'].includes(id))
          .map(id => mainSections[id] || null)
        }
      </div>
    </div>
  )
}