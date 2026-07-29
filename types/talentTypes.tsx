export interface Attribute {
    [key: string]: string | number | null | undefined,
    id: string
    name: string
    talentName: string
    description1: string
    description2: string
}

export interface Talent { 
    id: string
    name: string
    ability1: string
    ability2: string
    description: string
    hpBonus: number
    prioritySkills: string
    role: string
    complexity: number
    keystone: string
    capstone: string
    caster: boolean
}

export interface TalentDAO {
    talent: Talent
    attributes: Attribute[]
}

export var emptyTalent : Talent = {
    id: "",
    name: "",
    ability1: "",
    ability2: "",
    description: "",
    hpBonus: 0,
    prioritySkills: "",
    role: "",
    complexity: 0,
    keystone: "",
    capstone: "",
    caster: false
}