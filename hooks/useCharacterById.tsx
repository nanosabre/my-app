import axios from "axios";

//calls the endpoint to get all of the characters associated with the current user.
export const useCharacterById = async (characterId: String) => {
    let data = JSON.stringify({
        query: `query Query($characterId: String) {
            fullCharacterById(characterId: $characterId) {
                character { id name attributeLevel baseFitness basePrecision baseFocus baseSense proficiencies size
                    attributes1 { id name talentName description1 description2} 
                    attributes2 { id name talentName description1 description2}
                    talent1 { id name ability1 ability2 description hpBonus prioritySkills role complexity keystone capstone caster } 
                    talent2 { id name ability1 ability2 description hpBonus prioritySkills role complexity keystone capstone caster }
                    ancestry { id name parent source size description
                        trait1 {id name traitType description tags} 
                        trait2 {id name traitType description tags}} 
                    background { id name source deity description tags
                        parentTrait {id name traitType description tags} 
                        childTrait {id name traitType description tags}}
                    state { hitPoints armor wounds manaPoints 
                        activeEffects { id name description charProperty effectType conditionalCheck effect }
                        inactiveEffects { id name description charProperty effectType conditionalCheck effect }}
                }
                inventory { 
                    inventory { id characterId itemId equipped proficiency quantity} 
                    item { id name itemType subtype size equippable size weight description properties baseCost rarity
                        attack {name action range damage damageType} 
                        special {name action description}
                    }
                }
                spells { 
                    spellCharacter {id characterId spellId} 
                    spell { id name spellType source actionCost manaCost range duration description effectAmount effectConditional effectType tags}
                }
        }}`,
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