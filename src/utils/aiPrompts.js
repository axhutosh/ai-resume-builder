/**
 * aiPrompts.js
 * Prompt templates for each AI feature.
 * Currently supports: improveSummary
 * More prompts to be added in future phases.
 */

/**
 * Prompt to improve a professional summary.
 * @param {string} currentSummary - the user's existing summary text
 * @returns {string} full prompt string to send to Gemini
 */
export const improveSummaryPrompt = (currentSummary) => `
You are an expert resume writer with 10+ years of experience helping professionals land jobs at top companies.

Your task is to rewrite the following professional summary to make it:
- More impactful and results-oriented
- Concise (2-3 sentences max)
- Free of clichés like "hardworking", "team player", "passionate"
- Starting with a strong action-oriented opener
- ATS-friendly with relevant keywords naturally included

${currentSummary
  ? `Current summary to improve:\n"${currentSummary}"`
  : `The user has not written a summary yet. Write a strong general professional summary placeholder they can customize.`
}

Return ONLY the improved summary text. No explanations, no quotes, no preamble.
`.trim()
