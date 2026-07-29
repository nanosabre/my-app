import { InventoryDAO } from "./itemTypes"
import { AncestryInner, BackgroundInner, CharacterState, emptyAncestryInner, emptyBackgroundInner, emptyCharacterState } from "./stateTypes"
import { Attribute, emptyTalent, Talent } from "./talentTypes"

//defines the character type for the whole app 
export interface Character {
    [key: string]: string | number | null | undefined | Attribute[] | AncestryInner | BackgroundInner | Talent | CharacterState,
    id: string | null,
    userId: string,
    name: string,
    talent1: Talent,
    talent2: Talent,
    attributeLevel: number,
    attributes1: Attribute[],
    attributes2: Attribute[],
    ancestry: AncestryInner,
    background: BackgroundInner,
    baseFitness: number,
    basePrecision: number,
    baseFocus: number,
    baseSense: number,
    proficiencies: string,
    state: CharacterState
}

export interface CalculatedState {
    [key: string]: string | number | null | undefined,
    characterId: string
    hitPointsMax: number
    hitPoints: number
    armorMax: number
    armorMin: number
    armor: number
    manaMax: number
    manaPoints: number
    spellCapacity: number
    dexterity: number
    celerity: number
    subtlety: number
    awareness: number
    tenacity: number
    evasion: number
    fitness: number
    precision: number
    focus: number
    sense: number
    wounds: number
    woundsMax: number
    movement: number
}

export interface CharacterDAO {
    character: Character,
    inventory: InventoryDAO[]
}

export interface SpellCharacter {
    id: string
    characterId: string
    spellId: string
}

export var emptyCharacter: Character = {
    id: null, 
    userId: "",
    name: "",
    talent1: emptyTalent,
    talent2: emptyTalent,
    attributeLevel: 0,
    attributes1: [],
    attributes2: [],
    ancestry: emptyAncestryInner,
    background: emptyBackgroundInner,
    baseFitness: 0,
    basePrecision: 0,
    baseFocus: 0,
    baseSense: 0,
    size: "Medium",
    proficiencies: "null,null,null",
    state: emptyCharacterState

}

export var emptyCalculatedState = {
    characterId: "",
    tenacity: 10,
    evasion: 10,
    armorMax: 0,
    armorMin: 0,
    armor: 0,
    manaMax: 0,
    manaPoints: 0,
    spellCapacity: 0,
    fitness: 0,
    precision: 0,
    focus: 0,
    sense: 0,
    dexterity: 0,
    celerity: 0,
    subtlety: 0,
    awareness: 0,
    hitPointsMax: 40,
    hitPoints: 40,
    wounds: 0,
    woundsMax: 6,
    movement: 6,
}