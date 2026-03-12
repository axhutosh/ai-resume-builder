/**
 * EditorPanel.jsx
 * Left panel — renders all editor sections in order.
 * Props:
 *   onOpenAI — callback to open the AI panel (passed down to Summary)
 */

import PersonalInfo from './sections/PersonalInfo'
import Summary from './sections/Summary'
import Experience from './sections/Experience'
import Education from './sections/Education'
import Skills from './sections/Skills'
import Projects from './sections/Projects'

export default function EditorPanel({ onOpenAI }) {
  return (
    <div className="editor-panel">
      <div className="editor-top">
        <p className="editor-heading">Your Details</p>
      </div>
      <div className="editor-sections">
        <PersonalInfo />
        <Summary onOpenAI={onOpenAI} />
        <Experience />
        <Education />
        <Skills />
        <Projects />
      </div>
    </div>
  )
}
