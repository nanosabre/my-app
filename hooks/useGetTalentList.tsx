import axios from "axios";

//calls the endpoint to save the character
export const useGetTalentList = async () => {

    const axios = require('axios');
    let data = JSON.stringify({
        query: `query Query {
               getTalentList  {
    name ability1 ability2 description hpBonus prioritySkills role complexity caster keystone capstone
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
