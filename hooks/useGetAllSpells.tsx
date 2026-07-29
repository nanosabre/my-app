import axios from "axios";

//calls the endpoint to save the character
export const getAllSpells = async () => {

    const axios = require('axios');
    let data = JSON.stringify({
        query: `query Query {
               getAllSpells  
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
