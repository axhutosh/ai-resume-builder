/**
 * useAI.js
 * Hook for calling the Gemini 2.0 Flash API.
 * Uses VITE_GEMINI_API_KEY from .env.local
 *
 * Usage:
 *   const { generate, loading, error } = useAI()
 *   const result = await generate(prompt)
 */

import { useState } from 'react'

const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent'

export function useAI() {
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  /**
   * Send a prompt to Gemini 2.0 Flash and return the text response.
   * @param {string} prompt - the full prompt string
   * @returns {Promise<string|null>} response text or null on error
   */
  const generate = async (prompt) => {
    setLoading(true)
    setError(null)

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY

    if (!apiKey) {
      setError('Gemini API key not found. Add VITE_GEMINI_API_KEY to your .env.local file.')
      setLoading(false)
      return null
    }

    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 300,
          },
        }),
      })

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}))
        throw new Error(errData?.error?.message || `API error: ${response.status}`)
      }

      const data = await response.json()
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text

      if (!text) throw new Error('No response text received from Gemini.')

      return text.trim()
    } catch (err) {
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }

  return { generate, loading, error }
}