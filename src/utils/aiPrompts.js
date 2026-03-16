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


/**
 * Prompt to generate a full pre-filled resume from onboarding answers.
 */
export const generateResumePrompt = ({ name, title, company, experience, education, skills, goal }) => `
You are an expert resume writer. Based on the details below, generate professional resume content.

Person details:
- Name: ${name}
- Current/Target Job Title: ${title}
- Current/Last Company: ${company || 'Not provided'}
- Years of Experience: ${experience}
- Education: ${education}
- Key Skills: ${skills}
- Career Goal: ${goal}

Generate a JSON object with exactly this structure:
{
  "summary": "A 2-3 sentence professional summary, results-oriented, no clichés",
  "experienceBullets": [
    "Strong achievement bullet point 1",
    "Strong achievement bullet point 2",
    "Strong achievement bullet point 3"
  ],
  "suggestedSkills": "comma separated list of 8-10 relevant technical and soft skills"
}

Rules:
- summary must be 2-3 sentences, punchy and ATS-friendly
- experienceBullets must start with strong action verbs, include metrics where possible
- suggestedSkills should match the job title and skills provided
- Return ONLY valid JSON, no markdown, no explanation, no code blocks
`.trim()