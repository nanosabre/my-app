import axios from "axios";

//calls the endpoint to save the character
export const useGetAttributeList = async () => {

    const axios = require('axios');
    let data = JSON.stringify({
        query: `query Query {
               getAttributeList  {
    name talentName description1 description2
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
