/**
 * PreviewPanel.jsx
 * Right panel — renders the active resume template in real-time.
 * Attaches resumeRef from context for PDF printing.
 */

import { useResume } from '../../context/ResumeContext'
import Modern   from './templates/Modern'
import Classic  from './templates/Classic'
import Creative from './templates/Creative'

const TEMPLATE_MAP = { modern: Modern, classic: Classic, creative: Creative }

export default function PreviewPanel() {
  const { resumeData, resumeRef } = useResume()
  const ActiveTemplate = TEMPLATE_MAP[resumeData.meta.template] ?? Modern

  return (
    <div className="preview-panel">
      <div className="preview-topbar">
        <span className="preview-live-dot" />
        <span className="preview-live-label">Live Preview</span>
      </div>

      {/* resumeRef is attached here — react-to-print will print this div */}
      <div className="resume-sheet" ref={resumeRef}>
        <ActiveTemplate data={resumeData} />
      </div>
    </div>
  )
}
