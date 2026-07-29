import { Character, CharacterState } from "@/types/characterTypes";
import { InventoryDAO } from "@/types/itemTypes";
import axios from "axios";

//calls the endpoint to save the character
export const useCharacterSave = async (character: Character, inventoryData: InventoryDAO[], characterState: CharacterState) => {

    const characterDAO = {
        character: character,
        inventory: inventoryData,
        characterState: characterState
    }

    let result = await axios({
        method: 'post',
        url: process.env.NEXT_PUBLIC_BACKEND_URI,
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            query: `query Query($characterDAO: inputCharacterDAO) {saveCharacter(characterDAO: $characterDAO) {character {id userId name attributeLevel size attribute1 attribute1 talent1 talent2 ancestryTrait ancestryName baseFitness basePrecision baseFocus baseSense proficiencies}
    inventory { inventory {id characterId itemId equipped quantity} item {id name itemType size equippable size weight description properties attack1String attack2String effectName baseCost rarity}}}}`,
            variables: {characterDAO}
        }
    });

    return result
}
