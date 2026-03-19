import { createContext, useContext, useState, useRef } from 'react'
import { defaultResumeData } from '../utils/resumeSchema'

const ResumeContext = createContext(null)

export function ResumeProvider({ children }) {
  const [resumeData, setResumeData] = useState(defaultResumeData)
  const resumeRef = useRef(null)

  const updateSection = (section, value) =>
    setResumeData(prev => ({ ...prev, [section]: value }))

  const updateMeta = (key, value) =>
    setResumeData(prev => ({ ...prev, meta: { ...prev.meta, [key]: value } }))

  // Toggle a section hidden/visible
  const toggleSection = (sectionId) => {
    setResumeData(prev => {
      const hidden = prev.meta.hiddenSections || []
      const next = hidden.includes(sectionId)
        ? hidden.filter(s => s !== sectionId)
        : [...hidden, sectionId]
      return { ...prev, meta: { ...prev.meta, hiddenSections: next } }
    })
  }

  // Reorder sections
  const reorderSections = (newOrder) =>
    updateMeta('sectionOrder', newOrder)

  // Rename a section title
  const renameSection = (sectionId, newTitle) => {
    setResumeData(prev => ({
      ...prev,
      meta: {
        ...prev.meta,
        sectionTitles: { ...prev.meta.sectionTitles, [sectionId]: newTitle },
      },
    }))
  }

  const resetResume = () => setResumeData(defaultResumeData)

  return (
    <ResumeContext.Provider value={{
      resumeData, updateSection, updateMeta,
      toggleSection, reorderSections, renameSection,
      resetResume, resumeRef,
    }}>
      {children}
    </ResumeContext.Provider>
  )
}

export function useResume() {
  const ctx = useContext(ResumeContext)
  if (!ctx) throw new Error('useResume must be used inside <ResumeProvider>')
  return ctx
}