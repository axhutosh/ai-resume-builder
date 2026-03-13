/**
 * useDownload.js
 * Hook to handle PDF download using react-to-print.
 * Reads the shared resumeRef from ResumeContext.
 *
 * Usage:
 *   const { handleDownload } = useDownload()
 *   <button onClick={handleDownload}>Download PDF</button>
 */

import { useReactToPrint } from 'react-to-print'
import { useResume } from '../context/ResumeContext'

export function useDownload() {
  const { resumeData, resumeRef } = useResume()

  const handleDownload = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: resumeData.personal?.name
      ? `${resumeData.personal.name} — Resume`
      : 'Resume',
    pageStyle: `
      @page {
        size: A4;
        margin: 0;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }
    `,
  })

  return { handleDownload }
}
