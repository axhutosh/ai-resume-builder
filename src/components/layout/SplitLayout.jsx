/**
 * SplitLayout.jsx
 * Main 3-column layout: Editor | Preview | AI Panel
 */

import { useState } from 'react'
import EditorPanel from '../editor/EditorPanel'
import PreviewPanel from '../preview/PreviewPanel'
import AIPanel from '../ai/AIPanel'

export default function SplitLayout() {
  const [aiOpen, setAiOpen] = useState(false)

  return (
    <div className="app-body">
      <EditorPanel onOpenAI={() => setAiOpen(true)} />
      <PreviewPanel />
      <AIPanel open={aiOpen} onClose={() => setAiOpen(false)} />
    </div>
  )
}
