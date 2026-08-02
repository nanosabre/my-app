import axios from "axios";

//calls the endpoint to save the character
export const useGetFilteredSpells = async (sources: string[]) => {

    const axios = require('axios');
    let data = JSON.stringify({
        query: `query Query ($sources: [String]){
   getFilteredSpells(sources: $sources) {
    id name spellType source actionCost manaCost range duration description effectAmount effectConditional effectType tags
   }
}`,
        variables: {"sources": sources}
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
