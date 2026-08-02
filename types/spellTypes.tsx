export interface Spell {
    id: string
    name: string
    spellType: string
    source: string
    actionCost: string
    manaCost: number
    range: string
    duration: string
    description: string
    effectAmount: string
    effectConditional: string
    effectType: string
    tags: string
}

export interface SpellCharacter {
    id: string
    characterId: string
    spellId: string
}

export interface SpellDAO { 
    characterSpell: SpellCharacter
    spell: Spell
}

export var emptySpell = {
    id: "",
    name: "",
    spellType: "",
    source: "",
    actionCost: "",
    manaCost: 0,
    range: "",
    duration: "",
    description: "",
    effectAmount: "",
    effectConditional: "",
    effectType: "",
    tags: ""
}