import axios from "axios";

//calls the endpoint to get all of the characters associated with the current user.
export const useGetCharacterStateById = async (characterId: String) => {
    let data = JSON.stringify({
        query: `query Query($id: String){
    getCharacterStateById(id: $id){
        id characterId hitPointsMax hitPoints armorMax armorMin armor manaMax manaPoints spellCapacity dexterity celerity subtlety awareness evasion tenacity movementBonus encumbrance fitnessBonus precisionBonus focusBonus senseBonus inactiveEffects activeEffects
    }
}`,
        variables: { "characterId": characterId }
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
