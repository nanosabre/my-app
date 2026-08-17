import { CalculatedState, Character, emptyCalculatedState, emptyLimitedState, limitedState } from '@/types/characterTypes';
import { Effect } from '@/types/stateTypes';

const MANAFOCUSMULT = 2;
const TALENTMANA = 3;
const ABILITYMULT = 0.5;
const ENCUMBFITMULT = 10;

export default function useCalculateState( character: Character) {
    let result = processCharacter(character);
    let activeEffects = character.state.activeEffects;
    let stagedEffects = activeEffects.filter(ae=>ae.effectType == -1)

    applyEffects(result, stagedEffects);

    result.dexterity = Math.round(ABILITYMULT * (result.precision + result.fitness));
    result.celerity = Math.round(ABILITYMULT * (result.precision + result.focus));
    result.subtlety = Math.round(ABILITYMULT * (result.precision + result.sense));
    result.awareness = Math.round(ABILITYMULT * (result.sense + result.focus));
    result.evasion = Math.round(ABILITYMULT * (result.sense + result.fitness));
    result.tenacity = Math.round(ABILITYMULT * (result.focus + result.fitness));
    result.encumbrance += ENCUMBFITMULT * result.fitness;
    result.manaMax += (MANAFOCUSMULT * result.focus);

    let casterNum = character.talent1.caster ? 1 : 0
    casterNum += character.talent2.caster ? 1 : 0
    result.spellCapacity += casterNum + character.attributeLevel + result.focus;

    stagedEffects = activeEffects.filter(ae=>ae.effectType == 0)
    applyEffects(result, stagedEffects);


    stagedEffects = activeEffects.filter(ae=>ae.effectType == 1 || ae.effectType == 2)
    applyEffects(result, stagedEffects.sort((a,b)=>a.effectType-b.effectType));
    
    result.woundsMax += result.tenacity;

    return result;
}

function applyEffects(result: CalculatedState, effects:Effect[]){
    let parsed = parseEffects(effects);
    for(let i: number = 0; i<parsed.length-1;i+=3){
        let source = parsed[i+1]==="1" ? 1 : Number(result[parsed[i+1]]);
        let previous = Number(result[parsed[i]]);
        let value = previous + (source * Number(parsed[i+2]));
        result[parsed[i]] = value// > 0 ? value : 0 This prevents values from becoming negative
    }
}

function parseEffects(effects:Effect[]){
    let parsed:string[] = []
    effects?.forEach(e=>parsed.push(...e.effect.split(",")))
    return parsed;
}

export function applyLimitedEffects(effects: Effect[]){
    let parsed = parseEffects(effects);
    let result = {...emptyLimitedState};
    for(let i: number = 0; i<parsed.length-1;i+=3){
        let source = parsed[i+1]==="1" ? 1 : Number(result[parsed[i+1]]);
        let previous = Number(result[parsed[i]]);
        let value = previous + (source * Number(parsed[i+2]));
        result[parsed[i]] = value// > 0 ? value : 0 This prevents values from becoming negative
    }
    return result;
}

function processCharacter(character: Character) {
    let result = {...emptyCalculatedState};
    result.armor = character.state.armor;
    result.manaPoints = character.state.manaPoints;
    result.hitPoints = character.state.hitPoints;
    result.wounds = character.state.wounds;
    result.fitness = character.baseFitness;
    result.precision = character.basePrecision;
    result.focus = character.baseFocus;
    result.sense = character.baseSense;
    
    result.hitPointsMax += character.talent1.hpBonus + character.talent2.hpBonus;
    let talentMP = character.talent1.caster ? TALENTMANA : 0
    talentMP += character.talent2.caster ? TALENTMANA : 0
    result.manaMax += talentMP + character.attributeLevel

    return result;
}
