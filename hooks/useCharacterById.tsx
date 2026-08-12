import axios from "axios";

//calls the endpoint to get all of the characters associated with the current user.
export const useCharacterById = async (characterId: String) => {
    let data = JSON.stringify({
        query: `query Query($characterId: String) {
            fullCharacterById(characterId: $characterId) {
                character { id name baseFitness basePrecision baseFocus baseSense proficiencies size
                    attributes1 { id name talentName description1 description2} 
                    attributes2 { id name talentName description1 description2}
                    talent1 { id name ability1 ability2 description hpBonus prioritySkills role complexity keystone capstone caster } 
                    talent2 { id name ability1 ability2 description hpBonus prioritySkills role complexity keystone capstone caster }
                    ancestry { id name parent source trait1 trait2 size description} 
                    background { id name source parentTrait childTrait deity description tags}}
                inventory { 
                    inventory { id equipped proficiency quantity} 
                    items { id name itemType subtype size equippable size weight description attack {name action range damage damageType} special {name action description} properties baseCost rarity}}
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