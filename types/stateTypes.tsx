export interface CharacterState {
    id: string
    characterId: string
    hitPoints: number
    armor: number
    manaPoints: number
    activeEffects: string
}

export interface Ancestry {
    id: string
    name: string
    parent: string
    source: string
    trait1: string
    trait2: string
    size: string
    description: string
}

export interface Trait {
    id: string
    name: string
    traitType: string
    description: string
    tags: string
}

export interface Background {
    id: string
    name: string
    source: string
    parentTrait: string
    childTrait: string
    deity: string
    description: string
    tags: string
}

export interface BackgroundInner {
    id: string
    name: string
    source: string
    parentTrait: Trait
    childTrait: Trait
    deity: string
    description: string
    tags: string
}

export interface AncestryInner {
    id: string
    name: string
    parent: string
    source: string
    trait1: Trait
    trait2: Trait
    size: string
    description: string
}

export var emptyTrait: Trait= {
    id: "",
    name: "",
    traitType: "",
    description: "",
    tags: "",
}

export var emptyAncestryInner: AncestryInner ={
    id: "",
    name: "",
    parent: "",
    source: "",
    trait1: emptyTrait,
    trait2: emptyTrait,
    size: "",
    description: "",
}

export var emptyBackgroundInner: BackgroundInner = {
    id: "",
    name: "",
    source: "",
    parentTrait: emptyTrait,
    childTrait: emptyTrait,
    deity: "",
    description: "",
    tags: "",
}

export var emptyCharacterState: CharacterState = {
    id: "",
    characterId:"",
    hitPoints: 40,
    armor: 0,
    manaPoints: 0,
    activeEffects: ""
  }