/**
 * useAI.js
 * Hook for calling the Claude API.
 * TODO: Implement in Phase 2 (AI integration).
 */

import { useState } from 'react'

export function useAI() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  /**
   * Call Claude API with a given prompt.
   * @param {string} prompt
   * @returns {Promise<string>} AI response text
   */
  const generate = async (prompt) => {
    setLoading(true)
    setError(null)
    try {
      // TODO: Replace with real API call in Phase 2
      // const response = await fetch('https://api.anthropic.com/v1/messages', { ... })
      await new Promise(r => setTimeout(r, 1500)) // simulate delay
      return 'AI response placeholder — wire up Claude API in Phase 2.'
    } catch (err) {
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }

  return { generate, loading, error }
}
