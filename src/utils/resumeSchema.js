/**
 * resumeSchema.js
 * Defines the default empty shape of all resume data.
 * Used to initialize ResumeContext state.
 */

export const defaultResumeData = {
  personal: {
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
  },
  summary: '',
  experience: [
    {
      id: crypto.randomUUID(),
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      current: false,
      bullets: [''],
    },
  ],
  education: [
    {
      id: crypto.randomUUID(),
      school: '',
      degree: '',
      field: '',
      year: '',
      gpa: '',
    },
  ],
  skills: [
    {
      id: crypto.randomUUID(),
      category: 'Technical',
      items: '',
    },
  ],
  projects: [
    {
      id: crypto.randomUUID(),
      name: '',
      description: '',
      techStack: '',
      link: '',
    },
  ],
  meta: {
    template: 'modern', // 'modern' | 'classic' | 'creative'
    accentColor: '#6d28d9',
  },
}
