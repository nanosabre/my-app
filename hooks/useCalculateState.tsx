import { Character, CharacterState } from '@/types/characterTypes';
import axios from 'axios';

export const useCalculateState = async (state: CharacterState, character: Character) => {
    let data = JSON.stringify({
        query: `query Query($state: inputCharacterState, $character: inputCharacterObject){
    calculateState(state: $state, character: $character){
        characterId hitPointsMax hitPoints armorMax armorMin armor manaMax manaPoints spellCapacity dexterity celerity subtlety awareness evasion tenacity movement encumbrance fitness precision focus sense wounds woundsMax 
    }
}`,
        variables: {"state": state, "character": character}
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: process.env.NEXT_PUBLIC_BACKEND_URI,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    return await axios.request(config)
}
