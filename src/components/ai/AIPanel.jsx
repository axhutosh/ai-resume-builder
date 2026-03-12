/**
 * AIPanel.jsx
 * Floating side panel for AI suggestions.
 * Currently shows UI shell only — Claude API wired in Phase 2.
 *
 * Props:
 *   open    — boolean, controls visibility
 *   onClose — callback to close the panel
 */

import { useState } from 'react'
import { useResume } from '../../context/ResumeContext'
import { useAI } from '../../hooks/useAI'

export default function AIPanel({ open, onClose }) {
  const { resumeData, updateSection } = useResume()
  const { generate, loading } = useAI()
  const [suggestion, setSuggestion] = useState('')
  const [done, setDone] = useState(false)

  const handleGenerate = async () => {
    setDone(false)
    // TODO: Pass real prompt from aiPrompts.js in Phase 2
    const result = await generate(resumeData.summary)
    if (result) {
      setSuggestion(result)
      setDone(true)
    }
  }

  const handleAccept = () => {
    updateSection('summary', suggestion)
    setSuggestion('')
    setDone(false)
    onClose()
  }

  const handleDiscard = () => {
    setSuggestion('')
    setDone(false)
  }

  return (
    <div className={`ai-panel ${open ? 'open' : ''}`}>
      <div className="ai-panel-inner">
        {/* Header */}
        <div className="ai-panel-header">
          <div className="ai-panel-title">✨ AI Assistant</div>
          <button className="ai-panel-close" onClick={onClose}>✕</button>
        </div>

        {/* Body */}
        <div className="ai-panel-body">
          <div className="ai-section-label">Improve Summary</div>

          {/* Current */}
          <div className="ai-current-box">
            <div className="ai-box-label">Current</div>
            <p className="ai-box-text">
              {resumeData.summary || <em>No summary written yet.</em>}
            </p>
          </div>

          {!done ? (
            <button className="ai-generate-btn" onClick={handleGenerate} disabled={loading}>
              {loading ? '⏳ Generating...' : '✨ Generate Suggestion'}
            </button>
          ) : (
            <>
              <div className="ai-suggestion-box">
                <div className="ai-box-label">✨ Suggested</div>
                <p className="ai-box-text">{suggestion}</p>
              </div>
              <div className="ai-actions">
                <button className="ai-accept-btn" onClick={handleAccept}>✓ Accept</button>
                <button className="ai-retry-btn" onClick={handleGenerate}>↻ Retry</button>
                <button className="ai-discard-btn" onClick={handleDiscard}>Discard</button>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="ai-panel-footer">
          <span className="ai-badge">Powered by Claude · Phase 2</span>
        </div>
      </div>
    </div>
  )
}
