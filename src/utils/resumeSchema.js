export const defaultResumeData = {
  personal: {
    name: '', title: '', email: '', phone: '',
    location: '', linkedin: '', website: '',
  },
  summary: '',
  experience: [
    { id: crypto.randomUUID(), company: '', role: '', startDate: '', endDate: '', current: false, bullets: [''] },
  ],
  education: [
    { id: crypto.randomUUID(), school: '', degree: '', field: '', year: '', gpa: '' },
  ],
  skills: [
    { id: crypto.randomUUID(), category: 'Technical', items: '' },
  ],
  certifications: [
    { id: crypto.randomUUID(), name: '', issuer: '', year: '' },
  ],
  projects: [
    { id: crypto.randomUUID(), name: '', description: '', techStack: '', link: '' },
  ],
  meta: {
    template: 'modern',
    accentColor: '#6d28d9',
  },
}