/**
 * aiPrompts.js
 * Prompt templates for each AI feature.
 * TODO: Wire these up to the Claude API in Phase 2.
 */

export const PROMPTS = {
  /**
   * Improve the user's professional summary.
   * @param {string} currentSummary
   * @returns {string} prompt
   */
  improveSummary: (currentSummary) => `
You are an expert resume writer. Improve the following professional summary to make it more
impactful, concise, and results-oriented. Use strong action words and avoid generic phrases.
Keep it to 2-3 sentences. Return ONLY the improved text, nothing else.

Current summary:
"${currentSummary}"
  `.trim(),
}
