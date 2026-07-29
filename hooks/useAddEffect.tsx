import { CharacterState } from '@/types/characterTypes';
import axios from 'axios';

export const useAddEffect = async (effectName: string, state: CharacterState) => {
let data = JSON.stringify({
  query: `query Query($CharacterState: inputCharacterState, $effectName: String){
    addEffect(effectName: $effectName, state: $CharacterState){
        characterState { id characterId hitPoints armor manaPoints inactiveEffects activeEffects}
        calculatedState {characterId hitPointsMax hitPoints armorMax armorMin armor manaMax manaPoints spellCapacity dexterity celerity subtlety awareness evasion tenacity movement encumbrance fitness precision focus sense wounds woundsMax }
    }
}`,
  variables: {"CharacterState": state, "effectName":effectName}
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: process.env.NEXT_PUBLIC_BACKEND_URI,
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

    return await axios.request(config);
}
