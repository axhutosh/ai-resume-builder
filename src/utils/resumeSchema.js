export const DEFAULT_SECTION_ORDER = [
  'personal', 'summary', 'experience', 'education',
  'certifications', 'skills', 'projects'
]

export const DEFAULT_SECTION_TITLES = {
  personal:       'Personal Info',
  summary:        'Professional Summary',
  experience:     'Work Experience',
  education:      'Education',
  skills:         'Skills',
  certifications: 'Certifications',
  projects:       'Projects',
}

export const ACCENT_COLORS = [
  { label: 'Violet', value: '#6d28d9' },
  { label: 'Indigo', value: '#4338ca' },
  { label: 'Blue',   value: '#1d4ed8' },
  { label: 'Teal',   value: '#0f766e' },
  { label: 'Rose',   value: '#be123c' },
  { label: 'Slate',  value: '#334155' },
]

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
  customSections: [],
  meta: {
    template:       'modern',
    accentColor:    '#6d28d9',
    resumeName:     '',
    sectionOrder:   [...DEFAULT_SECTION_ORDER],
    hiddenSections: [],
    sectionTitles:  { ...DEFAULT_SECTION_TITLES },
  },
}