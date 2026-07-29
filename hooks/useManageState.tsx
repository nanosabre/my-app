import { Character, CharacterState } from "@/types/characterTypes";

//modifies character state
export const useManageState = (state: CharacterState, character: Character, effectString: String,
    name: string, active: boolean) => {
    //if it needs to be active, and is in the inactive list, switch and activate effects
    if (active && state.inactiveEffects.includes(name)) {
        let modulator = effectString.split(",");
        for(let i=0;i<modulator.length;i=i+3){
            
        }
        state.inactiveEffects = state.inactiveEffects.replace(name, '')
        state.activeEffects += ", " + name;
    //Vice Versa
    } else if (!active && state.activeEffects.includes(name)) {
        state.activeEffects = state.activeEffects.replace(name, '')
        state.inactiveEffects += ", " + name;
    }
}