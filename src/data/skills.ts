// Skill data configuration file
// Used to manage data for the skill display page

export interface Skill {
    id: string
    name: string
    description: string
    icon: string // Iconify icon name
    category: 'frontend' | 'backend' | 'database' | 'tools' | 'other'
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
    experience: {
        years: number
        months: number
    }
    projects?: string[] // Related project IDs
    certifications?: string[]
    color?: string // Skill card theme color
}

export const skillsData: Skill[] = []
