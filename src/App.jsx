import { useState } from 'react'
import { ResumeProvider } from './context/ResumeContext'
import { ThemeProvider }  from './context/ThemeContext'
import Header             from './components/layout/Header'
import EditorPanel        from './components/editor/EditorPanel'
import PreviewPanel       from './components/preview/PreviewPanel'
import AIPanel            from './components/ai/AIPanel'
import ATSPanel           from './components/ats/ATSPanel'
import OnboardingModal    from './components/onboarding/OnboardingModal'

function App() {
  const [aiOpen,  setAiOpen]  = useState(false)
  const [atsOpen, setAtsOpen] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(
    () => !localStorage.getItem('resume_onboarded')
  )

  const openAI  = () => { setAtsOpen(false); setAiOpen(true)  }
  const openATS = () => { setAiOpen(false);  setAtsOpen(true) }

  const handleClose = () => {
    localStorage.setItem('resume_onboarded', 'true')
    setShowOnboarding(false)
  }

  return (
    <ThemeProvider>
      <ResumeProvider>
        <div className="app-wrapper">
          <Header onOpenATS={openATS} />
          <div className="app-body">
            <EditorPanel onOpenAI={openAI} />
            <PreviewPanel />
            <AIPanel  open={aiOpen}  onClose={() => setAiOpen(false)}  />
            <ATSPanel open={atsOpen} onClose={() => setAtsOpen(false)} />
          </div>
          {showOnboarding && <OnboardingModal onClose={handleClose} />}
        </div>
      </ResumeProvider>
    </ThemeProvider>
  )
}

export default App