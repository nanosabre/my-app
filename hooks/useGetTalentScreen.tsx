import axios from "axios";

//calls the endpoint to save the character
export const useGetTalentScreen = async () => {

    const axios = require('axios');
    let data = JSON.stringify({
        query: `query Query {
               getTalentScreen  {
    talents {name ability1 ability2 description hpBonus prioritySkills role complexity caster keystone capstone}
    effects { name description charProperty effectType conditionalCheck effect}

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
