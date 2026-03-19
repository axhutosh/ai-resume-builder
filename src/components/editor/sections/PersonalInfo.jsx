import { useState } from 'react'
import SectionAccordion from '../SectionAccordion'
import { S } from '../EditorPanel'
import { useResume } from '../../../context/ResumeContext'

const SectionIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
)

const icons = {
  user: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  mail: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  phone: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.99 1.18 2 2 0 013 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
  pin: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  link: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>,
  brief: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>,
}

function Field({ label, icon, placeholder, value, onChange }) {
  const [focused, setFocused] = useState(false)
  const inputStyle = {
    ...(icon ? S.inputWithIcon : S.input),
    border: focused ? '1px solid #8b5cf6' : '1px solid #e5e7eb',
    background: focused ? '#fff' : '#f9fafb',
    boxShadow: focused ? '0 0 0 3px rgba(139,92,246,0.12)' : 'none',
  }
  return (
    <div style={S.fieldGroup}>
      {label && <label style={S.label}>{label}</label>}
      <div style={S.inputWrap}>
        {icon && <span style={S.inputIcon}>{icon}</span>}
        <input
          style={inputStyle}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </div>
    </div>
  )
}

export default function PersonalInfo() {
  const { resumeData, updateSection } = useResume()
  const d = resumeData.personal
  const up = (f, v) => updateSection('personal', { ...d, [f]: v })

  return (
    <SectionAccordion id="personal" title="Personal Info" icon={<SectionIcon />}>
      <div style={S.row2}>
        <Field label="Full Name"  icon={icons.user}  placeholder="Jane Doe"         value={d.name}     onChange={v => up('name', v)} />
        <Field label="Job Title"  icon={icons.brief} placeholder="Product Designer" value={d.title}    onChange={v => up('title', v)} />
      </div>
      <div style={S.row2}>
        <Field label="Email"    icon={icons.mail}  placeholder="jane@email.com"   value={d.email}    onChange={v => up('email', v)} />
        <Field label="Phone"    icon={icons.phone} placeholder="+1 555 000 0000"  value={d.phone}    onChange={v => up('phone', v)} />
      </div>
      <div style={S.row2}>
        <Field label="Location" icon={icons.pin}  placeholder="New York, NY"      value={d.location} onChange={v => up('location', v)} />
        <Field label="LinkedIn" icon={icons.link} placeholder="linkedin.com/in/…" value={d.linkedin} onChange={v => up('linkedin', v)} />
      </div>
      <Field label="Website / Portfolio" icon={icons.link} placeholder="yoursite.com" value={d.website} onChange={v => up('website', v)} />
    </SectionAccordion>
  )
}