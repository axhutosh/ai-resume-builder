/**
 * PersonalInfo.jsx
 * Editor section for name, title, email, phone, location, linkedin, website.
 */

import SectionAccordion from '../SectionAccordion'
import { useResume } from '../../../context/ResumeContext'

export default function PersonalInfo() {
  const { resumeData, updateSection } = useResume()
  const data = resumeData.personal
  const update = (field, value) => updateSection('personal', { ...data, [field]: value })

  return (
    <SectionAccordion title="Personal Info" icon="👤">
      <div className="grid-2">
        <input className="field-input" placeholder="Full Name" value={data.name} onChange={e => update('name', e.target.value)} />
        <input className="field-input" placeholder="Job Title" value={data.title} onChange={e => update('title', e.target.value)} />
      </div>
      <div className="grid-2">
        <input className="field-input" placeholder="Email" value={data.email} onChange={e => update('email', e.target.value)} />
        <input className="field-input" placeholder="Phone" value={data.phone} onChange={e => update('phone', e.target.value)} />
      </div>
      <div className="grid-2">
        <input className="field-input" placeholder="Location" value={data.location} onChange={e => update('location', e.target.value)} />
        <input className="field-input" placeholder="LinkedIn URL" value={data.linkedin} onChange={e => update('linkedin', e.target.value)} />
      </div>
      <input className="field-input" placeholder="Portfolio / Website" value={data.website} onChange={e => update('website', e.target.value)} />
    </SectionAccordion>
  )
}
