import { useState, useRef } from 'react'
import { useAI } from '../../hooks/useAI'
import { atsScorePrompt } from '../../utils/aiPrompts'
import { useResume } from '../../context/ResumeContext'
import * as pdfjsLib from 'pdfjs-dist'
import PdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

pdfjsLib.GlobalWorkerOptions.workerSrc = PdfWorker

const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <path d="M18 6L6 18M6 6l12 12"/>
  </svg>
)

const ScoreRing = ({ score }) => {
  const color = score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444'
  const r = 36, c = 2 * Math.PI * r, fill = (score / 100) * c
  return (
    <div style={{ position: 'relative', width: 96, height: 96, flexShrink: 0 }}>
      <svg width="96" height="96" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="48" cy="48" r={r} fill="none" stroke="#f3f4f6" strokeWidth="8"/>
        <circle cx="48" cy="48" r={r} fill="none" stroke={color} strokeWidth="8"
          strokeDasharray={`${fill} ${c}`} strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 1s ease' }}
        />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: 22, fontWeight: 800, color, fontFamily: "'Figtree', sans-serif", lineHeight: 1 }}>{score}</span>
        <span style={{ fontSize: 10, fontWeight: 600, color: '#9ca3af', fontFamily: "'Figtree', sans-serif" }}>/ 100</span>
      </div>
    </div>
  )
}

const StatusDot = ({ status }) => {
  const colors = { pass: '#10b981', warn: '#f59e0b', fail: '#ef4444' }
  return <div style={{ width: 8, height: 8, borderRadius: '50%', background: colors[status] || '#9ca3af', flexShrink: 0 }} />
}

const CategoryBar = ({ cat }) => {
  const colors = { pass: '#10b981', warn: '#f59e0b', fail: '#ef4444' }
  const bgMap  = { pass: '#f0fdf4', warn: '#fffbeb', fail: '#fef2f2' }
  const color  = colors[cat.status] || '#9ca3af'
  return (
    <div style={{ background: bgMap[cat.status]||'#f9fafb', border: `1px solid ${color}30`, borderRadius: 8, padding: '10px 12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <StatusDot status={cat.status} />
          <span style={{ fontSize: 12.5, fontWeight: 700, color: '#374151', fontFamily: "'Figtree', sans-serif" }}>{cat.name}</span>
        </div>
        <span style={{ fontSize: 12, fontWeight: 700, color, fontFamily: "'Figtree', sans-serif" }}>{cat.score}%</span>
      </div>
      <div style={{ height: 4, borderRadius: 99, background: '#e5e7eb', overflow: 'hidden', marginBottom: 6 }}>
        <div style={{ height: '100%', borderRadius: 99, background: color, width: `${cat.score}%`, transition: 'width 0.8s ease' }} />
      </div>
      <p style={{ fontSize: 11.5, color: '#6b7280', margin: 0, lineHeight: 1.5, fontFamily: "'Figtree', sans-serif" }}>{cat.feedback}</p>
    </div>
  )
}

function resumeDataToText(resumeData) {
  const { personal: p, summary, experience, education, skills, certifications, projects } = resumeData
  return `
Name: ${p.name} | Title: ${p.title}
Contact: ${[p.email, p.phone, p.location, p.linkedin, p.website].filter(Boolean).join(', ')}
SUMMARY: ${summary || 'Not provided'}
EXPERIENCE: ${experience.map(e => `${e.role} at ${e.company} (${e.startDate}-${e.current?'Present':e.endDate}) ${e.bullets.filter(Boolean).join(' ')}`).join(' | ')}
EDUCATION: ${education.map(e => `${e.degree} in ${e.field} - ${e.school} (${e.year})`).join(' | ')}
SKILLS: ${skills.map(s => `${s.category}: ${s.items}`).join(' | ')}
CERTIFICATIONS: ${certifications?.map(c => `${c.name} - ${c.issuer}`).join(' | ') || 'None'}
PROJECTS: ${projects.map(p => `${p.name}: ${p.description}`).join(' | ')}
`.trim()
}

async function extractPdfText(file) {
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
  let text = ''
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const content = await page.getTextContent()
    text += content.items.map(item => item.str).join(' ') + '\n'
  }
  return text.trim()
}

export default function ATSPanel({ open, onClose }) {
  const { resumeData } = useResume()
  const { generate, loading, error } = useAI()
  const [result,       setResult]       = useState(null)
  const [analysed,     setAnalysed]     = useState(false)
  const [mode,         setMode]         = useState('current')
  const [importedText, setImportedText] = useState('')
  const [fileName,     setFileName]     = useState('')
  const [extracting,   setExtracting]   = useState(false)
  const [extractError, setExtractError] = useState('')
  const [parseError,   setParseError]   = useState('')
  const fileRef = useRef(null)

  const gradeColor = (g) => ({ A:'#10b981', B:'#6366f1', C:'#f59e0b', D:'#f97316', F:'#ef4444' }[g] || '#9ca3af')

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setFileName(file.name)
    setImportedText('')
    setExtractError('')
    setParseError('')
    setResult(null)

    if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
      setExtracting(true)
      try {
        const text = await extractPdfText(file)
        if (!text) throw new Error('No text found — the PDF may be image-based.')
        setImportedText(text)
      } catch (err) {
        setExtractError(err.message || 'Failed to extract PDF text.')
        setFileName('')
      } finally {
        setExtracting(false)
      }
    } else {
      // Plain text / markdown
      const reader = new FileReader()
      reader.onload = (ev) => setImportedText(ev.target.result)
      reader.readAsText(file)
    }
  }

  const handleAnalyze = async () => {
    setResult(null)
    setAnalysed(false)
    setParseError('')

    const resumeText = mode === 'import' && importedText
      ? importedText
      : resumeDataToText(resumeData)

    const prompt = `You are an ATS resume analyst. Analyze the resume below and respond with ONLY a raw JSON object — no markdown, no backticks, no explanation, nothing before or after the JSON.

JSON structure:
{"score":75,"grade":"B","summary":"Two sentence verdict here.","categories":[{"name":"Contact Information","score":90,"status":"pass","feedback":"Feedback here."},{"name":"Professional Summary","score":70,"status":"warn","feedback":"Feedback here."},{"name":"Work Experience","score":80,"status":"pass","feedback":"Feedback here."},{"name":"Skills Section","score":60,"status":"warn","feedback":"Feedback here."},{"name":"Keywords & Action Verbs","score":65,"status":"warn","feedback":"Feedback here."},{"name":"Measurable Achievements","score":50,"status":"fail","feedback":"Feedback here."}],"quickFixes":["Fix 1","Fix 2","Fix 3"]}

Status rules: pass=score>=75, warn=score 50-74, fail=score<50
Be strict and realistic. Most resumes score 50-75.

RESUME TO ANALYZE:
${resumeText.slice(0, 3000)}`

    const raw = await generate(prompt)
    if (!raw) return

    try {
      // Extract JSON block
      const match = raw.match(/\{[\s\S]*\}/)
      if (!match) throw new Error('No JSON found in response')

      // Clean common AI JSON mistakes
      const cleaned = match[0]
        .replace(/,\s*([}\]])/g, '$1')        // trailing commas
        .replace(/([{,]\s*)(\w+):/g, '$1"$2":') // unquoted keys
        .replace(/:\s*'([^']*)'/g, ': "$1"')   // single quoted values
        .replace(/[\u0000-\u001F]/g, ' ')       // control characters

      const parsed = JSON.parse(cleaned)
      setResult(parsed)
      setAnalysed(true)
    } catch (err) {
      setParseError(`Could not parse AI response. Please try again. (${err.message})`)
    }
  }

  const canAnalyze = mode === 'current' || (mode === 'import' && importedText)

  return (
    <div style={{
      width: open ? 320 : 0, minWidth: 0, overflow: 'hidden',
      background: '#fff', borderLeft: '1px solid #e5e7eb',
      transition: 'width 0.3s cubic-bezier(.4,0,.2,1)',
      flexShrink: 0, display: 'flex',
    }}>
      <div style={{ width: 320, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Header */}
        <div style={{
          padding: '14px 16px', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', borderBottom: '1px solid #f3f4f6',
          background: 'linear-gradient(135deg, #f0fdf4, #f0f9ff)', flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 30, height: 30, borderRadius: 8, flexShrink: 0,
              background: 'linear-gradient(135deg, #10b981, #6366f1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(16,185,129,0.3)',
            }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: '#111827', fontFamily: "'Figtree', sans-serif" }}>ATS Score</div>
              <div style={{ fontSize: 11, color: '#9ca3af', fontFamily: "'Figtree', sans-serif" }}>AI-powered analysis</div>
            </div>
          </div>
          <button onClick={onClose} style={{
            width: 28, height: 28, borderRadius: 6, border: '1px solid #e5e7eb',
            background: '#fff', color: '#6b7280', display: 'flex',
            alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}><XIcon /></button>
        </div>

        {/* Mode toggle */}
        <div style={{ padding: '10px 16px', borderBottom: '1px solid #f3f4f6', flexShrink: 0 }}>
          <div style={{ display: 'flex', background: '#f3f4f6', borderRadius: 8, padding: 3, gap: 2 }}>
            {[
              { id: 'current', label: '📝 Current Resume' },
              { id: 'import',  label: '📄 Import & Test'  },
            ].map(m => (
              <button key={m.id} onClick={() => { setMode(m.id); setResult(null); setAnalysed(false); setParseError('') }}
                style={{
                  flex: 1, padding: '6px 8px', borderRadius: 6, border: 'none',
                  background: mode === m.id ? '#fff' : 'transparent',
                  boxShadow: mode === m.id ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                  fontSize: 11.5, fontWeight: mode === m.id ? 700 : 500,
                  color: mode === m.id ? '#374151' : '#9ca3af',
                  cursor: 'pointer', fontFamily: "'Figtree', sans-serif",
                  transition: 'all 0.15s ease',
                }}
              >{m.label}</button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>

          {/* Import mode */}
          {mode === 'import' && (
            <div>
              <input
                ref={fileRef} type="file" accept=".txt,.md,.pdf"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
              <div
                onClick={() => !extracting && fileRef.current.click()}
                style={{
                  border: importedText ? '1.5px solid #10b981' : extractError ? '1.5px solid #ef4444' : '1.5px dashed #d1d5db',
                  borderRadius: 10, padding: '16px 12px', textAlign: 'center',
                  cursor: extracting ? 'wait' : 'pointer',
                  background: importedText ? '#f0fdf4' : extractError ? '#fef2f2' : '#f9fafb',
                  transition: 'all 0.15s ease',
                }}
              >
                {extracting ? (
                  <>
                    <div style={{ fontSize: 20, marginBottom: 6 }}>⏳</div>
                    <p style={{ fontSize: 12.5, fontWeight: 600, color: '#374151', margin: 0, fontFamily: "'Figtree', sans-serif" }}>Extracting PDF text…</p>
                  </>
                ) : importedText ? (
                  <>
                    <div style={{ fontSize: 20, marginBottom: 4 }}>✅</div>
                    <p style={{ fontSize: 12.5, fontWeight: 600, color: '#065f46', margin: '0 0 2px', fontFamily: "'Figtree', sans-serif" }}>{fileName}</p>
                    <p style={{ fontSize: 11, color: '#6b7280', margin: 0, fontFamily: "'Figtree', sans-serif" }}>Click to replace</p>
                  </>
                ) : extractError ? (
                  <>
                    <div style={{ fontSize: 20, marginBottom: 4 }}>❌</div>
                    <p style={{ fontSize: 12.5, fontWeight: 600, color: '#b91c1c', margin: '0 0 2px', fontFamily: "'Figtree', sans-serif" }}>{extractError}</p>
                    <p style={{ fontSize: 11, color: '#9ca3af', margin: 0, fontFamily: "'Figtree', sans-serif" }}>Click to try another file</p>
                  </>
                ) : (
                  <>
                    <div style={{ fontSize: 24, marginBottom: 6 }}>📄</div>
                    <p style={{ fontSize: 12.5, fontWeight: 600, color: '#374151', margin: '0 0 4px', fontFamily: "'Figtree', sans-serif" }}>Upload your resume</p>
                    <p style={{ fontSize: 11, color: '#9ca3af', margin: 0, fontFamily: "'Figtree', sans-serif" }}>.pdf, .txt or .md</p>
                  </>
                )}
              </div>

              {/* Text preview */}
              {importedText && (
                <div style={{
                  marginTop: 8, background: '#f9fafb', border: '1px solid #e5e7eb',
                  borderRadius: 8, padding: '8px 10px', maxHeight: 72,
                  overflow: 'hidden', position: 'relative',
                }}>
                  <p style={{ fontSize: 10.5, color: '#9ca3af', margin: 0, lineHeight: 1.5, fontFamily: "'Figtree', sans-serif", whiteSpace: 'pre-wrap' }}>
                    {importedText.slice(0, 200)}…
                  </p>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 20, background: 'linear-gradient(transparent, #f9fafb)' }} />
                </div>
              )}
            </div>
          )}

          {/* Analyze button */}
          <button
            onClick={handleAnalyze}
            disabled={loading || extracting || !canAnalyze}
            style={{
              width: '100%', padding: '10px', borderRadius: 8, border: 'none',
              background: (!canAnalyze || loading || extracting) ? '#e5e7eb' : 'linear-gradient(135deg, #10b981, #6366f1)',
              color: (!canAnalyze || loading || extracting) ? '#9ca3af' : '#fff',
              fontSize: 13.5, fontWeight: 700,
              cursor: (!canAnalyze || loading || extracting) ? 'not-allowed' : 'pointer',
              fontFamily: "'Figtree', sans-serif",
              boxShadow: (!canAnalyze || loading || extracting) ? 'none' : '0 4px 14px rgba(16,185,129,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              transition: 'all 0.15s ease',
            }}
          >
            {loading ? (
              <>
                <div style={{ width: 14, height: 14, border: '2px solid rgba(0,0,0,0.1)', borderTopColor: '#9ca3af', borderRadius: '50%', animation: 'spin 0.65s linear infinite' }} />
                Analyzing…
              </>
            ) : analysed ? '↺ Re-analyze' : '✦ Analyze ATS Score'}
          </button>

          {/* API Error */}
          {error && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '10px 12px' }}>
              <p style={{ fontSize: 12, color: '#b91c1c', margin: 0, fontFamily: "'Figtree', sans-serif" }}>{error}</p>
            </div>
          )}

          {/* Parse Error */}
          {parseError && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '10px 12px' }}>
              <p style={{ fontSize: 12, color: '#b91c1c', margin: 0, fontFamily: "'Figtree', sans-serif" }}>{parseError}</p>
            </div>
          )}

          {/* Results */}
          {result && (
            <>
              <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 10, padding: 16, display: 'flex', alignItems: 'center', gap: 16 }}>
                <ScoreRing score={result.score} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 22, fontWeight: 800, fontFamily: "'Figtree', sans-serif", color: gradeColor(result.grade) }}>{result.grade}</span>
                    <span style={{ fontSize: 11.5, fontWeight: 600, color: '#6b7280', fontFamily: "'Figtree', sans-serif" }}>
                      {result.score >= 80 ? 'ATS Ready' : result.score >= 60 ? 'Needs Work' : 'Needs Major Work'}
                    </span>
                  </div>
                  <p style={{ fontSize: 11.5, color: '#6b7280', margin: 0, lineHeight: 1.55, fontFamily: "'Figtree', sans-serif" }}>{result.summary}</p>
                </div>
              </div>

              <div>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6366f1', margin: '0 0 8px', fontFamily: "'Figtree', sans-serif" }}>Breakdown</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {result.categories?.map((cat, i) => <CategoryBar key={i} cat={cat} />)}
                </div>
              </div>

              {result.quickFixes?.length > 0 && (
                <div>
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#f59e0b', margin: '0 0 8px', fontFamily: "'Figtree', sans-serif" }}>Quick Fixes</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {result.quickFixes.map((fix, i) => (
                      <div key={i} style={{ display: 'flex', gap: 8, padding: '9px 11px', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 8, alignItems: 'flex-start' }}>
                        <span style={{ color: '#f59e0b', fontSize: 14, flexShrink: 0, marginTop: 1 }}>→</span>
                        <p style={{ fontSize: 12, color: '#92400e', margin: 0, lineHeight: 1.5, fontFamily: "'Figtree', sans-serif" }}>{fix}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Empty state */}
          {!result && !loading && (
            <div style={{ textAlign: 'center', padding: '20px 16px' }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>📊</div>
              <p style={{ fontSize: 12.5, fontFamily: "'Figtree', sans-serif", margin: 0, lineHeight: 1.6, color: '#6b7280' }}>
                {mode === 'import' && !importedText
                  ? 'Upload a PDF, .txt or .md resume above, then click Analyze.'
                  : 'Click Analyze to get an AI-powered ATS breakdown of your resume.'
                }
              </p>
            </div>
          )}
        </div>

        <div style={{ padding: '10px 16px', borderTop: '1px solid #f3f4f6', display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ fontSize: 10.5, color: '#9ca3af', fontFamily: "'Figtree', sans-serif" }}>✦ Powered by Gemini AI</span>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}