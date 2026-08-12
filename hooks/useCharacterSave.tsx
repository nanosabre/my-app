import { Character } from "@/types/characterTypes";
import { InventoryDAO } from "@/types/itemTypes";
import { SpellDAO } from "@/types/spellTypes";
import axios from "axios";

//calls the endpoint to save the character
export const useCharacterSave = async (character: Character, inventoryData: InventoryDAO[], spells: SpellDAO[]) => {

    const characterDAO = {
        character: character,
        inventory: inventoryData,
        spells: spells
    }

    let result = await axios({
        method: 'post',
        url: process.env.NEXT_PUBLIC_BACKEND_URI,
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            query: `query Query($characterDAO: inputCharacterDAO) {saveCharacter(characterDAO: $characterDAO) {
                character { id name }
                inventory { 
                    inventory {id characterId itemId equipped quantity} 
                    item { id name itemType subtype size equippable size weight description attack {name action range damage damageType} special {name action description} properties baseCost rarity}}
                spells { 
                    spellCharacter {id characterId spellId} 
                    spell { id name spellType source actionCost manaCost range duration description effectAmount effectConditional effectType tags}}
                }}`,
            variables: {characterDAO}
        }
    });

    return result
}
