import { useState } from 'react'
import { useOnboarding } from '../../hooks/useOnboarding'

const STEPS = [
  {
    id: 'basics',
    title: "Let's start with the basics",
    subtitle: 'This takes about 60 seconds',
    fields: [
      { key: 'name',     label: 'Full Name',    placeholder: 'Jane Doe',           required: true  },
      { key: 'title',    label: 'Job Title',    placeholder: 'Senior Product Manager', required: true  },
      { key: 'email',    label: 'Email',        placeholder: 'jane@email.com',     required: true  },
      { key: 'phone',    label: 'Phone',        placeholder: '+1 555 000 0000',    required: false },
      { key: 'location', label: 'Location',     placeholder: 'New York, NY',       required: false },
    ],
  },
  {
    id: 'experience',
    title: 'Your work experience',
    subtitle: "Tell us about your current or most recent role",
    fields: [
      { key: 'company',    label: 'Company Name',       placeholder: 'Google',           required: false },
      { key: 'experience', label: 'Years of Experience', placeholder: '5',               required: true  },
      { key: 'startDate',  label: 'Start Date',          placeholder: 'Jan 2020',        required: false },
      { key: 'currentJob', label: 'I currently work here', type: 'checkbox',             required: false },
    ],
  },
  {
    id: 'education',
    title: 'Your education',
    subtitle: 'Add your highest qualification',
    fields: [
      { key: 'educationSchool', label: 'University / School', placeholder: 'MIT',               required: false },
      { key: 'educationDegree', label: 'Degree',              placeholder: 'B.Sc',              required: false },
      { key: 'educationField',  label: 'Field of Study',      placeholder: 'Computer Science',  required: false },
      { key: 'educationYear',   label: 'Graduation Year',     placeholder: '2019',              required: false },
    ],
  },
  {
    id: 'goal',
    title: 'Final touches',
    subtitle: 'Help AI write the best resume for you',
    fields: [
      { key: 'skills', label: 'Your Key Skills',    placeholder: 'React, Node.js, Product Strategy, Data Analysis…', required: true, large: true },
      { key: 'goal',   label: 'Career Goal',        placeholder: 'Looking for a Senior PM role at a growth-stage startup…', required: true, large: true },
    ],
  },
]

const s = {
  overlay: {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 9999, padding: 20, backdropFilter: 'blur(4px)',
  },
  modal: {
    background: '#fff', borderRadius: 16, width: '100%', maxWidth: 520,
    boxShadow: '0 24px 60px rgba(0,0,0,0.2)', overflow: 'hidden',
    fontFamily: "'Figtree', sans-serif",
  },
  topBar: {
    background: 'linear-gradient(135deg, #5b21b6, #6366f1)',
    padding: '28px 32px 24px',
  },
  stepPills: {
    display: 'flex', gap: 6, marginBottom: 20,
  },
  pill: (active, done) => ({
    height: 4, borderRadius: 99, flex: 1,
    background: done ? '#fff' : active ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.25)',
    transition: 'all 0.3s ease',
  }),
  stepLabel: {
    fontSize: 11, fontWeight: 600, letterSpacing: '0.08em',
    textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginBottom: 6,
  },
  stepTitle: {
    fontSize: 22, fontWeight: 700, color: '#fff',
    margin: '0 0 4px', lineHeight: 1.2,
  },
  stepSubtitle: {
    fontSize: 13.5, color: 'rgba(255,255,255,0.75)', margin: 0,
  },
  body: {
    padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 14,
  },
  fieldGroup: {
    display: 'flex', flexDirection: 'column', gap: 5,
  },
  label: {
    fontSize: 12, fontWeight: 600, color: '#6b7280',
    letterSpacing: '0.01em',
  },
  required: {
    color: '#7c3aed', marginLeft: 2,
  },
  input: (focused) => ({
    width: '100%', padding: '9px 12px', fontSize: 13.5,
    fontFamily: "'Figtree', sans-serif", color: '#1f2937',
    background: focused ? '#fff' : '#f9fafb',
    border: focused ? '1.5px solid #7c3aed' : '1.5px solid #e5e7eb',
    borderRadius: 8, outline: 'none', boxSizing: 'border-box',
    boxShadow: focused ? '0 0 0 3px rgba(124,58,237,0.12)' : 'none',
    transition: 'all 0.15s ease',
  }),
  textarea: (focused) => ({
    width: '100%', padding: '9px 12px', fontSize: 13.5,
    fontFamily: "'Figtree', sans-serif", color: '#1f2937',
    background: focused ? '#fff' : '#f9fafb',
    border: focused ? '1.5px solid #7c3aed' : '1.5px solid #e5e7eb',
    borderRadius: 8, outline: 'none', boxSizing: 'border-box', resize: 'vertical',
    boxShadow: focused ? '0 0 0 3px rgba(124,58,237,0.12)' : 'none',
    transition: 'all 0.15s ease', lineHeight: 1.55, minHeight: 72,
  }),
  checkbox: {
    display: 'flex', alignItems: 'center', gap: 8,
    fontSize: 13.5, color: '#374151', cursor: 'pointer', padding: '4px 0',
  },
  footer: {
    padding: '16px 32px 24px', display: 'flex',
    alignItems: 'center', justifyContent: 'space-between',
    borderTop: '1px solid #f3f4f6',
  },
  btnBack: {
    padding: '9px 20px', borderRadius: 8, border: '1.5px solid #e5e7eb',
    background: '#fff', fontSize: 13.5, fontWeight: 600, color: '#6b7280',
    cursor: 'pointer', fontFamily: "'Figtree', sans-serif",
  },
  btnNext: (disabled) => ({
    padding: '9px 28px', borderRadius: 8, border: 'none',
    background: disabled ? '#c4b5fd' : 'linear-gradient(135deg, #5b21b6, #6366f1)',
    fontSize: 13.5, fontWeight: 700, color: '#fff',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontFamily: "'Figtree', sans-serif",
    boxShadow: disabled ? 'none' : '0 4px 14px rgba(91,33,182,0.35)',
    transition: 'all 0.15s ease', display: 'flex', alignItems: 'center', gap: 8,
  }),
  spinner: {
    width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)',
    borderTopColor: '#fff', borderRadius: '50%',
    animation: 'spin 0.65s linear infinite',
  },
  scratchBtn: {
    background: 'none', border: 'none', fontSize: 13,
    color: '#9ca3af', cursor: 'pointer', textDecoration: 'underline',
    fontFamily: "'Figtree', sans-serif", padding: 0,
  },
  landingWrap: {
    padding: '48px 32px', display: 'flex', flexDirection: 'column',
    alignItems: 'center', gap: 32, textAlign: 'center',
  },
  logoWrap: {
    width: 64, height: 64, borderRadius: 16,
    background: 'linear-gradient(135deg, #5b21b6, #6366f1)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 8px 24px rgba(91,33,182,0.35)',
  },
  landingTitle: {
    fontSize: 26, fontWeight: 800, color: '#111827',
    margin: '0 0 8px', fontFamily: "'Figtree', sans-serif",
  },
  landingSubtitle: {
    fontSize: 15, color: '#6b7280', margin: 0, lineHeight: 1.6,
  },
  optionsWrap: {
    display: 'flex', flexDirection: 'column', gap: 12, width: '100%',
  },
  optionCard: (primary) => ({
    padding: '18px 20px', borderRadius: 12, cursor: 'pointer', textAlign: 'left',
    border: primary ? '2px solid #7c3aed' : '2px solid #e5e7eb',
    background: primary ? '#f5f3ff' : '#fff',
    transition: 'all 0.15s ease', fontFamily: "'Figtree', sans-serif",
  }),
  optionTitle: (primary) => ({
    fontSize: 15, fontWeight: 700,
    color: primary ? '#5b21b6' : '#374151', marginBottom: 4,
  }),
  optionDesc: {
    fontSize: 13, color: '#9ca3af', margin: 0,
  },
}

function Field({ field, value, onChange }) {
  const [focused, setFocused] = useState(false)

  if (field.type === 'checkbox') {
    return (
      <label style={s.checkbox}>
        <input
          type="checkbox" checked={!!value}
          onChange={e => onChange(e.target.checked)}
          style={{ width: 16, height: 16, accentColor: '#7c3aed', cursor: 'pointer' }}
        />
        {field.label}
      </label>
    )
  }

  return (
    <div style={s.fieldGroup}>
      <label style={s.label}>
        {field.label}
        {field.required && <span style={s.required}>*</span>}
      </label>
      {field.large ? (
        <textarea
          style={s.textarea(focused)} rows={3}
          placeholder={field.placeholder} value={value || ''}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        />
      ) : (
        <input
          style={s.input(focused)}
          placeholder={field.placeholder} value={value || ''}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        />
      )}
    </div>
  )
}

export default function OnboardingModal({ onClose }) {
  const [screen, setScreen]     = useState('landing')
  const [selected, setSelected] = useState(null) // 'ai' | 'manual'
  const [step, setStep]         = useState(0)
  const [answers, setAnswers]   = useState({})
  const [aiError, setAiError]   = useState(null)
  const { buildResume, loading } = useOnboarding()

  const currentStep = STEPS[step]

  const set = (key, val) => setAnswers(p => ({ ...p, [key]: val }))

  const isStepValid = () => {
    return currentStep.fields
      .filter(f => f.required)
      .every(f => answers[f.key]?.toString().trim())
  }

  const handleNext = async () => {
    if (step < STEPS.length - 1) {
      setStep(s => s + 1)
    } else {
      // Last step — call AI
      setScreen('generating')
      setAiError(null)
      const ok = await buildResume(answers)
      if (ok) {
        onClose()
      } else {
        setAiError('AI generation failed. Your basic info has been filled in — you can complete the rest manually.')
        onClose()
      }
    }
  }

  // ── Landing screen ──────────────────────────────────────────
  if (screen === 'landing') {
    return (
      <div style={s.overlay}>
        <div style={s.modal}>
          <div style={s.landingWrap}>
            <div style={s.logoWrap}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
            </div>
            <div>
              <h1 style={s.landingTitle}>Welcome to resume<span style={{color:'#7c3aed'}}>.ai</span></h1>
              <p style={s.landingSubtitle}>Build a professional resume in minutes.<br/>How would you like to start?</p>
            </div>
            <div style={s.optionsWrap}>
              <div
                onClick={() => setSelected('ai')}
                style={{
                  ...s.optionCard(selected === 'ai'),
                  border: selected === 'ai' ? '2px solid #7c3aed' : '2px solid #e5e7eb',
                }}
              >
                <div style={s.optionTitle(selected === 'ai')}>✨ Create with AI</div>
                <p style={s.optionDesc}>Answer 4 quick questions — AI writes your resume for you</p>
              </div>
              <div
                onClick={() => setSelected('manual')}
                style={{
                  ...s.optionCard(selected === 'manual'),
                  border: selected === 'manual' ? '2px solid #7c3aed' : '2px solid #e5e7eb',
                }}
              >
                <div style={s.optionTitle(selected === 'manual')}>✏️ Start from scratch</div>
                <p style={s.optionDesc}>Fill in your details manually at your own pace</p>
              </div>
            </div>
            <button
              disabled={!selected}
              onClick={() => selected === 'ai' ? setScreen('wizard') : onClose()}
              style={{
                width: '100%', padding: '12px', borderRadius: 10, border: 'none',
                background: selected ? 'linear-gradient(135deg, #5b21b6, #6366f1)' : '#e5e7eb',
                color: selected ? '#fff' : '#9ca3af',
                fontSize: 15, fontWeight: 700,
                cursor: selected ? 'pointer' : 'not-allowed',
                fontFamily: "'Figtree', sans-serif",
                boxShadow: selected ? '0 4px 14px rgba(91,33,182,0.35)' : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              {selected === 'ai' ? '✨ Continue with AI →' : selected === 'manual' ? 'Start building →' : 'Select an option to continue'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Generating screen ────────────────────────────────────────
  if (screen === 'generating') {
    return (
      <div style={s.overlay}>
        <div style={{ ...s.modal, padding: '56px 32px', textAlign: 'center' }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%',
              border: '4px solid #ede9fe', borderTopColor: '#7c3aed',
              animation: 'spin 0.8s linear infinite', margin: '0 auto 20px',
            }} />
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#111827', margin: '0 0 8px', fontFamily: "'Figtree', sans-serif" }}>
              Building your resume…
            </h2>
            <p style={{ fontSize: 14, color: '#9ca3af', margin: 0, fontFamily: "'Figtree', sans-serif" }}>
              AI is crafting your summary, experience bullets and skills
            </p>
          </div>
        </div>
      </div>
    )
  }

  // ── Wizard steps ─────────────────────────────────────────────
  return (
    <div style={s.overlay}>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      <div style={s.modal}>

        {/* Gradient top bar */}
        <div style={s.topBar}>
          <div style={s.stepPills}>
            {STEPS.map((_, i) => (
              <div key={i} style={s.pill(i === step, i < step)} />
            ))}
          </div>
          <p style={s.stepLabel}>Step {step + 1} of {STEPS.length}</p>
          <h2 style={s.stepTitle}>{currentStep.title}</h2>
          <p style={s.stepSubtitle}>{currentStep.subtitle}</p>
        </div>

        {/* Fields */}
        <div style={s.body}>
          {currentStep.fields.map(field => (
            <Field
              key={field.key} field={field}
              value={answers[field.key]}
              onChange={val => set(field.key, val)}
            />
          ))}
        </div>

        {/* Footer */}
        <div style={s.footer}>
          {step > 0
            ? <button style={s.btnBack} onClick={() => setStep(s => s - 1)}>← Back</button>
            : <button style={s.scratchBtn} onClick={onClose}>Skip, fill manually</button>
          }
          <button
            style={s.btnNext(!isStepValid() || loading)}
            onClick={handleNext}
            disabled={!isStepValid() || loading}
          >
            {loading ? (
              <><div style={s.spinner} /> Generating…</>
            ) : step === STEPS.length - 1 ? (
              '✨ Build my resume'
            ) : (
              'Next →'
            )}
          </button>
        </div>

      </div>
    </div>
  )
}