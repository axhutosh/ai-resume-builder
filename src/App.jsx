import { ResumeProvider } from './context/ResumeContext'
import { ThemeProvider } from './context/ThemeContext'
import SplitLayout from './components/layout/SplitLayout'
import Header from './components/layout/Header'

function App() {
  return (
    <ThemeProvider>
      <ResumeProvider>
        <div className="app-wrapper">
          <Header />
          <SplitLayout />
        </div>
      </ResumeProvider>
    </ThemeProvider>
  )
}

export default App