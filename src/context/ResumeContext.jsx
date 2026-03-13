/**
 * ResumeContext.jsx
 * Global state for all resume data + shared download ref.
 * Wrap the app in <ResumeProvider> to give all components access.
 */

import { createContext, useContext, useState, useRef } from 'react'
import { defaultResumeData } from '../utils/resumeSchema'

const ResumeContext = createContext(null)

export function ResumeProvider({ children }) {
  const [resumeData, setResumeData] = useState(defaultResumeData)

  // Shared ref for the resume preview element — used by useDownload
  const resumeRef = useRef(null)

  /**
   * Update a top-level section of resume data.
   * Usage: updateSection('personal', { name: 'Jane' })
   */
  const updateSection = (section, value) => {
    setResumeData(prev => ({ ...prev, [section]: value }))
  }

  /**
   * Update resume meta (template, accentColor etc.)
   */
  const updateMeta = (key, value) => {
    setResumeData(prev => ({
      ...prev,
      meta: { ...prev.meta, [key]: value },
    }))
  }

  /**
   * Reset resume to blank state.
   */
  const resetResume = () => setResumeData(defaultResumeData)

  return (
    <ResumeContext.Provider value={{ resumeData, updateSection, updateMeta, resetResume, resumeRef }}>
      {children}
    </ResumeContext.Provider>
  )
}

/**
 * Hook to consume resume context.
 * Usage: const { resumeData, updateSection } = useResume()
 */
export function useResume() {
  const ctx = useContext(ResumeContext)
  if (!ctx) throw new Error('useResume must be used inside <ResumeProvider>')
  return ctx
}
