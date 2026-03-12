/**
 * SectionAccordion.jsx
 * Reusable collapsible wrapper for each editor section.
 * Props:
 *   title      — section heading text
 *   icon       — emoji or icon element
 *   children   — section form content
 *   defaultOpen — boolean, defaults to true
 */

import { useState } from 'react'

export default function SectionAccordion({ title, icon, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="section-card">
      <button className="section-header" onClick={() => setOpen(!open)}>
        <span className="section-title-wrap">
          <span className="section-icon">{icon}</span>
          <span className="section-title">{title}</span>
        </span>
        <span>{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="section-body">
          {children}
        </div>
      )}
    </div>
  )
}
