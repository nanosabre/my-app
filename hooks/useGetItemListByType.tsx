import axios from "axios";

//calls the endpoint to save the character
export const useGetItemListByType = async (type : string) => {

    const axios = require('axios');
    let data = JSON.stringify({
        query: `query Query ($type: String) {
        getItemListByType(itemType: $type) { id name itemType subtype size equippable size weight description properties baseCost rarity
        attack {name action range damage damageType} 
        special {name action description}
    }
}`,
        variables: {"type": type}
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