import PersonalInfo     from './sections/PersonalInfo'
import Summary          from './sections/Summary'
import Experience       from './sections/Experience'
import Education        from './sections/Education'
import Skills           from './sections/Skills'
import Certifications   from './sections/Certifications'
import Projects         from './sections/Projects'

export const S = {
  panel: {
    width: '50%', height: '100%', display: 'flex', flexDirection: 'column',
    background: '#fff', borderRight: '1px solid #e5e7eb', overflow: 'hidden', flexShrink: 0,
  },
  topbar: { padding: '12px 18px', borderBottom: '1px solid #f3f4f6', flexShrink: 0 },
  heading: {
    fontSize: 11, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase',
    color: '#9ca3af', margin: 0, fontFamily: "'Figtree', sans-serif",
  },
  sections: {
    flex: 1, overflowY: 'auto', overflowX: 'hidden',
    padding: '12px 16px 40px', display: 'flex', flexDirection: 'column', gap: 8,
  },
  card: {
    border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'visible',
    background: '#fff', width: '100%',
  },
  sectionBtn: {
    width: '100%', padding: '11px 14px', display: 'flex', alignItems: 'center',
    justifyContent: 'space-between', background: '#f9fafb', border: 'none',
    cursor: 'pointer', fontFamily: "'Figtree', sans-serif",
  },
  sectionTitleWrap: { display: 'flex', alignItems: 'center', gap: 10 },
  sectionIcon: {
    width: 28, height: 28, borderRadius: 7, background: '#ede9fe', color: '#7c3aed',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  sectionTitle: {
    fontSize: 13.5, fontWeight: 600, color: '#374151', margin: 0,
    fontFamily: "'Figtree', sans-serif",
  },
  sectionBody: {
    padding: '14px 16px 16px', display: 'flex', flexDirection: 'column', gap: 10,
    borderTop: '1px solid #f3f4f6', overflow: 'visible',
  },
  row2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 },
  row3: { display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 12, alignItems: 'end' },
  fieldGroup: { display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 },
  label: {
    fontSize: 11.5, fontWeight: 600, color: '#6b7280', marginBottom: 0,
    fontFamily: "'Figtree', sans-serif", display: 'block',
  },
  inputWrap: { position: 'relative', width: '100%' },
  inputIcon: {
    position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)',
    color: '#9ca3af', pointerEvents: 'none', display: 'flex', alignItems: 'center',
  },
  input: {
    display: 'block', width: '100%', minWidth: 0,
    padding: '8px 11px', fontSize: 13, fontFamily: "'Figtree', sans-serif",
    color: '#1f2937', background: '#f9fafb', border: '1px solid #e5e7eb',
    borderRadius: 6, outline: 'none', boxSizing: 'border-box', lineHeight: 1.4,
  },
  inputWithIcon: {
    display: 'block', width: '100%', minWidth: 0,
    padding: '8px 11px 8px 30px', fontSize: 13, fontFamily: "'Figtree', sans-serif",
    color: '#1f2937', background: '#f9fafb', border: '1px solid #e5e7eb',
    borderRadius: 6, outline: 'none', boxSizing: 'border-box', lineHeight: 1.4,
  },
  textarea: {
    display: 'block', width: '100%', minWidth: 0,
    padding: '9px 11px', fontSize: 13, fontFamily: "'Figtree', sans-serif",
    color: '#1f2937', background: '#f9fafb', border: '1px solid #e5e7eb',
    borderRadius: 6, outline: 'none', resize: 'vertical', lineHeight: 1.55,
    boxSizing: 'border-box',
  },
  entry: {
    background: '#f9fafb', border: '1px solid #eceef1', borderRadius: 6,
    padding: 13, display: 'flex', flexDirection: 'column', gap: 10,
  },
  entryHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  entryNum: {
    fontSize: 10.5, fontWeight: 700, letterSpacing: '0.07em',
    textTransform: 'uppercase', color: '#9ca3af', fontFamily: "'Figtree', sans-serif",
  },
  bulletsArea: { display: 'flex', flexDirection: 'column', gap: 6 },
  bulletRow: { display: 'flex', alignItems: 'center', gap: 7 },
  bulletDot: { color: '#7c3aed', fontSize: 18, lineHeight: 1, flexShrink: 0 },
  bulletInput: {
    flex: 1, minWidth: 0, padding: '6px 9px', borderRadius: 4,
    border: '1px solid #e5e7eb', fontSize: 12.5, fontFamily: "'Figtree', sans-serif",
    color: '#374151', background: '#fff', outline: 'none', boxSizing: 'border-box',
  },
  btnAddBullet: {
    display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 500,
    color: '#6366f1', border: 'none', background: 'transparent', padding: '2px 4px',
    cursor: 'pointer', fontFamily: "'Figtree', sans-serif",
  },
  btnRemove: {
    width: 28, height: 28, borderRadius: 4, border: '1px solid transparent',
    background: 'transparent', color: '#9ca3af', display: 'flex',
    alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'pointer', padding: 0,
  },
  btnAddEntry: {
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
    width: '100%', padding: '9px 14px', borderRadius: 6,
    border: '1.5px dashed #d1d5db', background: 'transparent',
    fontSize: 13, fontWeight: 600, color: '#6b7280', cursor: 'pointer',
    fontFamily: "'Figtree', sans-serif", boxSizing: 'border-box',
  },
  btnAiTrigger: {
    display: 'inline-flex', alignItems: 'center', gap: 7,
    padding: '8px 16px', borderRadius: 6,
    border: '1.5px solid #ede9fe', background: '#f5f3ff',
    fontSize: 13, fontWeight: 600, color: '#5b21b6', cursor: 'pointer',
    fontFamily: "'Figtree', sans-serif",
  },
  checkbox: {
    display: 'flex', alignItems: 'center', gap: 7, fontSize: 13,
    fontWeight: 500, color: '#4b5563', cursor: 'pointer',
    paddingBottom: 8, fontFamily: "'Figtree', sans-serif", whiteSpace: 'nowrap',
  },
}

export default function EditorPanel({ onOpenAI }) {
  return (
    <div style={S.panel}>
      <div style={S.topbar}>
        <p style={S.heading}>Your Details</p>
      </div>
      <div style={S.sections}>
        <PersonalInfo />
        <Summary onOpenAI={onOpenAI} />
        <Experience />
        <Education />
        <Certifications />
        <Skills />
        <Projects />
      </div>
    </div>
  )
}