import axios from "axios";

//calls the endpoint to save the character
export const useGetEffects = async () => {

    const axios = require('axios');
    let data = JSON.stringify({
        query: `query Query {
    getEffectList {
    name description charProperty effectType conditionalCheck effect
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
