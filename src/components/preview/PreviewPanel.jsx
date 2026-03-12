/**
 * PreviewPanel.jsx
 * Right panel — renders the active resume template in real-time.
 * Reads template choice from resumeData.meta.template.
 */

import { useResume } from '../../context/ResumeContext'
import Modern from './templates/Modern'
import Classic from './templates/Classic'
import Creative from './templates/Creative'

const TEMPLATE_MAP = {
  modern: Modern,
  classic: Classic,
  creative: Creative,
}

export default function PreviewPanel() {
  const { resumeData } = useResume()
  const ActiveTemplate = TEMPLATE_MAP[resumeData.meta.template] ?? Modern

  return (
    <div className="preview-panel">
      <div className="preview-label">
        <span className="preview-dot" /> Live Preview
      </div>
      <div className="resume-sheet">
        {/* TODO: Attach resumeRef here for PDF download in Phase 1 */}
        <ActiveTemplate data={resumeData} />
      </div>
    </div>
  )
}
