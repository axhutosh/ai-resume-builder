import { useAI } from './useAI'
import { useResume } from '../context/ResumeContext'
import { generateResumePrompt } from '../utils/aiPrompts'

export function useOnboarding() {
  const { generate, loading, error } = useAI()
  const { resumeData, updateSection } = useResume()

  const buildResume = async (answers) => {
    // 1. Immediately fill in personal info from answers
    updateSection('personal', {
      ...resumeData.personal,
      name:     answers.name,
      title:    answers.title,
      email:    answers.email,
      phone:    answers.phone,
      location: answers.location,
    })

    // 2. Fill education
    if (answers.education) {
      updateSection('education', [{
        id: crypto.randomUUID(),
        school: answers.educationSchool || '',
        degree: answers.educationDegree || '',
        field:  answers.educationField  || '',
        year:   answers.educationYear   || '',
        gpa:    '',
      }])
    }

    // 3. Fill experience shell
    updateSection('experience', [{
      id:        crypto.randomUUID(),
      company:   answers.company   || '',
      role:      answers.title     || '',
      startDate: answers.startDate || '',
      endDate:   '',
      current:   answers.currentJob || false,
      bullets:   [''],
    }])

    // 4. Call AI to generate summary, bullets, skills
    const prompt = generateResumePrompt(answers)
    const result = await generate(prompt)
    if (!result) return false

    try {
      // Strip any accidental markdown fences
      const clean = result.replace(/```json|```/g, '').trim()
      const parsed = JSON.parse(clean)

      // Fill summary
      if (parsed.summary) updateSection('summary', parsed.summary)

      // Fill experience bullets
      if (parsed.experienceBullets?.length) {
        updateSection('experience', [{
          id:        crypto.randomUUID(),
          company:   answers.company   || '',
          role:      answers.title     || '',
          startDate: answers.startDate || '',
          endDate:   '',
          current:   answers.currentJob || false,
          bullets:   parsed.experienceBullets,
        }])
      }

      // Fill skills
      if (parsed.suggestedSkills) {
        updateSection('skills', [{
          id:       crypto.randomUUID(),
          category: 'Skills',
          items:    parsed.suggestedSkills,
        }])
      }

      return true
    } catch {
      return false
    }
  }

  return { buildResume, loading, error }
}