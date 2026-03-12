import { ResumeProvider } from './context/ResumeContext'
import SplitLayout from './components/layout/SplitLayout'
import Header from './components/layout/Header'

function App() {
  return (
    <ResumeProvider>
      <div className="app-wrapper">
        <Header />
        <SplitLayout />
      </div>
    </ResumeProvider>
  )
}

export default App
