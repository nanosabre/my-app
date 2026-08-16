import { Effect, CharacterState } from "../../types/stateTypes";

//add, activate, and/or deactivate.  to remove an effect completely, see RemoveEffect
export function useModifyEffect(state: CharacterState, active: boolean, ...effects: Effect[]) {
    var result = {...state};
    for (const effect of effects) {
        let condition = effect.conditionalCheck
        //if intending to activate the effect, then check the condition
        if (active) {
            if (condition!=undefined && condition != null && condition != "") {
                //if the condition is normal, then check for any that meet the condition
                let isMet = !condition.includes("!") ? result.activeEffects.find(ae => ae.charProperty === condition) != undefined
                    : result.activeEffects.find(ae => ae.charProperty === condition.replace("!", "")) == undefined; //if the condition is inverted check that none meet
                    //if the condition is met, then add to active list, else add to inactive list
                result = isMet ? useActivateEffect(result, effect) : useDeactivateEffect(result, effect);
            } else {
                //if no condition required, just activate the effect.
                result = useActivateEffect(result, effect);
            }
        } else {
            //no checks needed to deactivate
            result = useDeactivateEffect(result, effect);
        }
    }
    return result;
}


function useActivateEffect(state: CharacterState, effect: Effect) {
    let result = {...state};
    //filter out the current list to prevent duplicates, then add
    result.activeEffects = result.activeEffects.filter(ae => ae.name != effect.name);
    result.activeEffects.push(effect);
    result.inactiveEffects = result.inactiveEffects.filter(ie => ie.name != effect.name);

    return result
}

function useDeactivateEffect(state: CharacterState, effect: Effect) {
    let result = {...state};
    //filter out the current list to prevent duplicates, then add
    result.inactiveEffects = result.inactiveEffects.filter(ie => ie.name != effect.name).concat(effect)
    result.inactiveEffects.push(effect);
    result.activeEffects = result.activeEffects.filter(ae => ae.name != effect.name);
    return result
}

function removeEffect(state: CharacterState, name:string){
    return {
        ...state,
        activeEffects: state.activeEffects.filter(ae=>ae.name!=name),
        inactiveEffects: state.inactiveEffects.filter(ie=>ie.name!=name),
    }; 
}
