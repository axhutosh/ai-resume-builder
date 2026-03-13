/**
 * AIPanel.jsx
 * Floating side panel for AI-powered summary improvement.
 * Uses Gemini 2.0 Flash via useAI hook.
 *
 * Props:
 *   open    — boolean, controls panel visibility
 *   onClose — callback to close the panel
 */

import { useState } from 'react'
import { useResume } from '../../context/ResumeContext'
import { useAI } from '../../hooks/useAI'
import { improveSummaryPrompt } from '../../utils/aiPrompts'

/* ── Icons ── */
const SparkleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
  </svg>
)
const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <path d="M18 6L6 18M6 6l12 12"/>
  </svg>
)
const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5"/>
  </svg>
)
const RetryIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/>
  </svg>
)
const GeminiIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
  </svg>
)

export default function AIPanel({ open, onClose }) {
  const { resumeData, updateSection } = useResume()
  const { generate, loading, error }  = useAI()

  const [suggestion, setSuggestion] = useState('')
  const [done, setDone]             = useState(false)

  const handleGenerate = async () => {
    setDone(false)
    setSuggestion('')
    const prompt = improveSummaryPrompt(resumeData.summary)
    const result = await generate(prompt)
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

  const handleClose = () => {
    setSuggestion('')
    setDone(false)
    onClose()
  }

  return (
    <div className={`ai-panel${open ? ' open' : ''}`}>
      <div className="ai-panel-inner">

        {/* Header */}
        <div className="ai-panel-header">
          <div className="ai-panel-title">
            <div className="ai-title-icon"><SparkleIcon /></div>
            AI Assistant
          </div>
          <button className="ai-panel-close" onClick={handleClose}>
            <XIcon />
          </button>
        </div>

        {/* Body */}
        <div className="ai-panel-body">
          <div className="ai-section-label">Improve Summary</div>

          {/* Current summary */}
          <div className="ai-box current">
            <div className="ai-box-label">Current</div>
            <p className="ai-box-text">
              {resumeData.summary
                ? resumeData.summary
                : <em style={{ color: 'var(--gray-400)' }}>Nothing written yet…</em>
              }
            </p>
          </div>

          {/* Error state */}
          {error && (
            <div className="ai-error-box">
              <span className="ai-error-icon">⚠</span>
              <p className="ai-error-text">{error}</p>
            </div>
          )}

          {/* Generate button */}
          {!done && (
            <button
              className="btn-ai-generate"
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading
                ? <><span className="ai-spinner" /> Generating…</>
                : <><SparkleIcon /> Generate Suggestion</>
              }
            </button>
          )}

          {/* Suggestion + actions */}
          {done && suggestion && (
            <>
              <div className="ai-box suggested">
                <div className="ai-box-label">✨ Suggested</div>
                <p className="ai-box-text">{suggestion}</p>
              </div>
              <div className="ai-actions">
                <button className="btn-ai-accept"  onClick={handleAccept}>
                  <CheckIcon /> Accept
                </button>
                <button className="btn-ai-retry"   onClick={handleGenerate}>
                  <RetryIcon /> Retry
                </button>
                <button className="btn-ai-discard" onClick={handleDiscard}>
                  Discard
                </button>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="ai-panel-footer">
          <span className="ai-footer-badge">
            <GeminiIcon /> Powered by Gemini 2.0 Flash
          </span>
        </div>

      </div>
    </div>
  )
}
