import axios from "axios";

//calls the endpoint to get all of the characters associated with the current user.
export const useCharacterById = async (characterId: String) => {
    let data = JSON.stringify({
        query: `query Query($characterId: String) {
            fullCharacterById(characterId: $characterId) {
                character {name attributeLevel talent1 talent2 ancestryTrait ancestryName baseFitness basePrecision baseFocus baseSense proficiencies}
                inventory { inventory {equipped proficiency quantity} item {name itemType size equippable size weight description1 description2 description3 attack1String attack2String attack3String effectName baseCost rarity}}
                attributes { name talentName flag description }
                talents { name abilities description hpBonus prioritySkills role complexity keystone capstone}
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