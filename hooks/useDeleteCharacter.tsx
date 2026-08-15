import axios from "axios";

//calls the endpoint to save the character
export const useDeleteCharacter = async (characterId: string) => {

    const axios = require('axios');
    let data = JSON.stringify({
        query: `mutation Mutation($characterId: String) {
            deleteCharacter (characterId: $characterId)
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
