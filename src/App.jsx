import { ResumeProvider } from './context/ResumeContext'
import { ThemeProvider } from './context/ThemeContext'
import SplitLayout from './components/layout/SplitLayout'
import Header from './components/layout/Header'
import { useEffect, useState } from 'react'

function DesktopOnly({ children }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (isMobile) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 28px',
        background: '#ffffff',
        textAlign: 'center',
        fontFamily: "'Figtree', sans-serif",
      }}>

        {/* Top accent line */}
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          height: 4,
          background: 'linear-gradient(90deg, #5b21b6, #6366f1)',
        }} />

        {/* Logo */}
        <div style={{
          width: 60, height: 60, borderRadius: 14,
          background: 'linear-gradient(135deg, #5b21b6, #6366f1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 20,
          boxShadow: '0 4px 20px rgba(91,33,182,0.25)',
        }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
        </div>

        {/* Brand name */}
        <p style={{
          fontSize: 13, fontWeight: 700, letterSpacing: 1,
          textTransform: 'uppercase', color: '#9ca3af',
          margin: '0 0 24px',
        }}>
          resu<span style={{ color: '#7c3aed' }}>mo</span>.ai
        </p>

        {/* Heading */}
        <h1 style={{
          fontSize: 24, fontWeight: 700, color: '#111827',
          margin: '0 0 14px', lineHeight: 1.3,
        }}>
          Best Experienced<br />on Desktop
        </h1>

        {/* Subtext */}
        <p style={{
          fontSize: 14, color: '#6b7280',
          lineHeight: 1.75, margin: '0 0 36px',
          maxWidth: 300,
        }}>
          Resumo is a professional resume builder optimised for laptop and desktop screens. Please visit us on a larger device to create your resume.
        </p>

        {/* Steps */}
        {[
          { num: '1', text: 'Open your laptop or desktop' },
          { num: '2', text: 'Visit the same URL in your browser' },
          { num: '3', text: 'Start building your resume' },
        ].map(step => (
          <div key={step.num} style={{
            display: 'flex', alignItems: 'center', gap: 14,
            width: '100%', maxWidth: 300,
            marginBottom: 12, textAlign: 'left',
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
              background: '#f5f3ff', color: '#7c3aed',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 700,
              border: '1px solid #ede9fe',
            }}>
              {step.num}
            </div>
            <p style={{ fontSize: 13.5, color: '#374151', margin: 0, fontWeight: 500 }}>
              {step.text}
            </p>
          </div>
        ))}

        {/* Divider */}
        <div style={{
          width: '100%', maxWidth: 300,
          height: 1, background: '#f3f4f6',
          margin: '28px 0',
        }} />

        {/* Footer note */}
        <p style={{
          fontSize: 12, color: '#9ca3af',
          margin: 0, lineHeight: 1.6, maxWidth: 280,
        }}>
          For a quick preview, you can enable{' '}
          <strong style={{ color: '#6b7280' }}>Desktop Site</strong>{' '}
          in your mobile browser settings.
        </p>

      </div>
    )
  }

  return children
}

function App() {
  return (
    <ThemeProvider>
      <ResumeProvider>
        <DesktopOnly>
          <div className="app-wrapper">
            <Header />
            <SplitLayout />
          </div>
        </DesktopOnly>
      </ResumeProvider>
    </ThemeProvider>
  )
}

export default App