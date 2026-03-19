import { useState, useRef } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { S } from './EditorPanel'
import { useResume } from '../../context/ResumeContext'

const ChevronIcon = ({ open }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
    style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.18s ease', flexShrink: 0 }}>
    <path d="M6 9l6 6 6-6"/>
  </svg>
)

const DragHandle = ({ listeners, attributes }) => (
  <span
    {...listeners} {...attributes}
    title="Drag to reorder"
    style={{
      cursor: 'grab', color: '#d1d5db', padding: '0 4px',
      display: 'flex', alignItems: 'center', flexShrink: 0,
      touchAction: 'none',
    }}
  >
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="9" cy="5" r="1.5"/><circle cx="15" cy="5" r="1.5"/>
      <circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/>
      <circle cx="9" cy="19" r="1.5"/><circle cx="15" cy="19" r="1.5"/>
    </svg>
  </span>
)

const EyeIcon = ({ visible }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {visible
      ? <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
      : <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
    }
  </svg>
)

const PencilIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
)

export default function SectionAccordion({ id, title, icon, children, defaultOpen = true }) {
  const { resumeData, toggleSection, renameSection } = useResume()
  const [open, setOpen]         = useState(defaultOpen)
  const [hover, setHover]       = useState(false)
  const [editing, setEditing]   = useState(false)
  const [titleVal, setTitleVal] = useState(title)
  const inputRef                = useRef(null)

  const hidden  = resumeData.meta.hiddenSections?.includes(id)

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex:  isDragging ? 999 : 'auto',
  }

  const handleRenameSubmit = () => {
    const val = titleVal.trim()
    if (val) renameSection(id, val)
    else setTitleVal(title)
    setEditing(false)
  }

  const startEditing = (e) => {
    e.stopPropagation()
    setEditing(true)
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  return (
    <div ref={setNodeRef} style={{
      ...style,
      border: hidden ? '1px dashed #e5e7eb' : '1px solid #e5e7eb',
      borderRadius: 10, background: hidden ? '#fafafa' : '#fff',
      width: '100%', overflow: 'visible',
    }}>
      {/* Header */}
      <div
        style={{
          display: 'flex', alignItems: 'center',
          background: hover && !hidden ? '#f5f3ff' : hidden ? '#fafafa' : '#f9fafb',
          borderRadius: open && !hidden ? '10px 10px 0 0' : 10,
          overflow: 'hidden', gap: 4,
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {/* Drag handle */}
        <DragHandle listeners={listeners} attributes={attributes} />

        {/* Main clickable area */}
        <button
          style={{
            ...S.sectionBtn, flex: 1, background: 'transparent',
            opacity: hidden ? 0.45 : 1, padding: '11px 8px 11px 4px',
          }}
          onClick={() => !hidden && setOpen(o => !o)}
        >
          <span style={S.sectionTitleWrap}>
            <span style={S.sectionIcon}>{icon}</span>

            {/* Editable title */}
            {editing ? (
              <input
                ref={inputRef}
                value={titleVal}
                onChange={e => setTitleVal(e.target.value)}
                onBlur={handleRenameSubmit}
                onKeyDown={e => { if (e.key === 'Enter') handleRenameSubmit(); if (e.key === 'Escape') { setTitleVal(title); setEditing(false) } }}
                onClick={e => e.stopPropagation()}
                style={{
                  fontSize: 13.5, fontWeight: 600, color: '#374151',
                  border: 'none', borderBottom: '2px solid #7c3aed',
                  background: 'transparent', outline: 'none',
                  fontFamily: "'Figtree', sans-serif", width: 160,
                }}
              />
            ) : (
              <span style={{ ...S.sectionTitle, opacity: hidden ? 0.5 : 1 }}>
                {resumeData.meta.sectionTitles?.[id] || title}
              </span>
            )}
          </span>
          {!hidden && <ChevronIcon open={open} />}
        </button>

        {/* Controls: rename + toggle */}
        <span style={{ display: 'flex', alignItems: 'center', gap: 2, paddingRight: 10, flexShrink: 0 }}>
          {!hidden && (
            <button
              onClick={startEditing}
              title="Rename section"
              style={{
                width: 26, height: 26, borderRadius: 5, border: 'none',
                background: 'transparent', color: '#9ca3af', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <PencilIcon />
            </button>
          )}
          <button
            onClick={e => { e.stopPropagation(); toggleSection(id) }}
            title={hidden ? 'Show section' : 'Hide section'}
            style={{
              width: 26, height: 26, borderRadius: 5, border: 'none',
              background: 'transparent',
              color: hidden ? '#9ca3af' : '#7c3aed',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <EyeIcon visible={!hidden} />
          </button>
        </span>
      </div>

      {/* Body */}
      {open && !hidden && (
        <div style={{ ...S.sectionBody, borderRadius: '0 0 10px 10px' }}>
          {children}
        </div>
      )}
    </div>
  )
}