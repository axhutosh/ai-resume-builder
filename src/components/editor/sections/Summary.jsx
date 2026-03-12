/**
 * Summary.jsx
 * Professional summary textarea + "Improve with AI" trigger button.
 * Props:
 *   onOpenAI — opens the floating AI panel
 */

import SectionAccordion from '../SectionAccordion'
import { useResume } from '../../../context/ResumeContext'

export default function Summary({ onOpenAI }) {
  const { resumeData, updateSection } = useResume()

  return (
    <SectionAccordion title="Professional Summary" icon="⚡">
      <textarea
        className="field-textarea"
        rows={4}
        placeholder="A results-driven professional with 5+ years of experience in..."
        value={resumeData.summary}
        onChange={e => updateSection('summary', e.target.value)}
      />
      {/* AI trigger — wired to open AIPanel */}
      <button className="ai-trigger-btn" onClick={onOpenAI}>
        ✨ Improve with AI
      </button>
    </SectionAccordion>
  )
}
