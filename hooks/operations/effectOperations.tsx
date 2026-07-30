import { Effect, CharacterState } from "../../types/stateTypes";

export function useModifyEffect(state: CharacterState, active: boolean, ...effects: Effect[]) {
    var result = {...state};
    for (const effect of effects) {
        let condition = effect.conditionalCheck
        //if intending to activate the effect check the condition
        if (active) {
            if (condition!=undefined && condition != null && condition != "") {
                //if the condition is normal, check for any that meet the condition
                let isMet = !condition.includes("!") ? result.activeEffects.find(ae => ae.charProperty === condition) != undefined
                    : result.activeEffects.find(ae => ae.charProperty === condition.replace("!", "")) == undefined; //if the condition is inverted check that none meet
                    //if the condition is met, add to active list, else add to inactive list
                result = isMet ? useActivateEffect(result, effect) : useDeactivateEffect(result, effect);
            } else {
                result = useActivateEffect(result, effect);
            }
        } else {
            result = useDeactivateEffect(result, effect);
        }
    }
    return result;
}


function useActivateEffect(state: CharacterState, effect: Effect) {
    let result = {...state};
    result.activeEffects = result.activeEffects.filter(ae => ae.name != effect.name);
    result.activeEffects.push(effect);
    result.inactiveEffects = result.inactiveEffects.filter(ie => ie.name != effect.name);

    return result
}

function useDeactivateEffect(state: CharacterState, effect: Effect) {
    let result = {...state};
    result.inactiveEffects = result.inactiveEffects.filter(ie => ie.name != effect.name).concat(effect)
    result.inactiveEffects.push(effect);
    result.activeEffects = result.activeEffects.filter(ae => ae.name != effect.name);
    return result
}
