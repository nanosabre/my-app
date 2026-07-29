import axios from "axios";

//calls the endpoint to get all of the characters associated with the current user.
export const useFullCharacterById = async (characterId: String) => {
    let data = JSON.stringify({
        query: `query Query($characterId: String) {
    fullCharacterById(characterId: $characterId) {
        character {id userId name attributeLevel talent1 talent2 attribute1 attribute2 ancestryTrait ancestryName baseFitness basePrecision baseFocus baseSense proficiencies size}
        inventory { inventory {itemId equipped quantity} item {id name itemType size equippable size weight description properties attack1String attack2String effectName baseCost rarity}}
        attributes { id name talentName flag description }
        talents { id name ability1 ability2 description hpBonus prioritySkills role complexity keystone capstone}
        proficiencies { item {name} mastery}
        characterState { id characterId hitPoints armor manaPoints activeEffects inactiveEffects }
        calculatedState { hitPointsMax hitPoints armorMax armorMin armor manaMax manaPoints spellCapacity dexterity celerity subtlety awareness evasion tenacity movement encumbrance fitness precision focus sense wounds woundsMax}
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

    return await axios.request(config);
}