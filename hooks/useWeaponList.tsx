import axios from "axios";

//calls the endpoint to save the character
export const useWeaponList = async () => {

    const axios = require('axios');
    let data = JSON.stringify({
        query: `query Query {
   getWeaponList {
    id name itemType size equippable size weight description properties attack1String attack2String effectName baseCost rarity
  }
}`,
        variables: {}
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
