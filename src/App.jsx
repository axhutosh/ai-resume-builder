import { useState } from 'react'
import { ResumeProvider } from './context/ResumeContext'
import SplitLayout from './components/layout/SplitLayout'
import Header from './components/layout/Header'
import OnboardingModal from './components/onboarding/OnboardingModal'

function App() {
  const [showOnboarding, setShowOnboarding] = useState(
    () => !localStorage.getItem('resume_onboarded')
  )

  const handleClose = () => {
    localStorage.setItem('resume_onboarded', 'true')
    setShowOnboarding(false)
  }

  return (
    <ResumeProvider>
      <div className="app-wrapper">
        <Header />
        <SplitLayout />
        {showOnboarding && (
          <OnboardingModal onClose={handleClose} />
        )}
      </div>
    </ResumeProvider>
  )
}

export default App