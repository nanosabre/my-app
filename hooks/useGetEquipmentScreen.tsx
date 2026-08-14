import axios from "axios";

//calls the endpoint to save the character
export const useGetEquipmentScreen = async (characterId: string) => {

    const axios = require('axios');
    let data = JSON.stringify({
        query: `query Query ($characterId: String){
   getEquipmentScreen (characterId: $characterId) {
    inventory { id characterId itemId equipped quantity}
    items { id name itemType subtype size equippable size weight description properties baseCost rarity
        attack {name action range damage damageType} 
        special {name action description}
    }
    packs { id name background currency rations salves reagents materials innerwear outerwear items}
   }
}`,
        variables: {"characterId": characterId}
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
