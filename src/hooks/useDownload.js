/**
 * useDownload.js
 * Hook to handle PDF download of the resume preview.
 * TODO: Wire up react-to-print in Phase 1.
 */

import { useRef } from 'react'

export function useDownload() {
  const resumeRef = useRef(null)

  const handleDownload = () => {
    // TODO: Implement with react-to-print
    console.log('Download triggered — implement with react-to-print')
  }

  return { resumeRef, handleDownload }
}
