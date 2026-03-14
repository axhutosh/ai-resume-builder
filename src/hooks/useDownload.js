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
        html, body {
          height: 100%;
          margin: 0 !important;
          padding: 0 !important;
        }
        body * {
          visibility: hidden;
        }
        .resume-sheet, .resume-sheet * {
          visibility: visible;
        }
        .resume-sheet {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          box-shadow: none !important;
          border-radius: 0 !important;
        }
      }
    `,
  })

  return { handleDownload }
}