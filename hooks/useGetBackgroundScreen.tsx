import axios from "axios";

//calls the endpoint to save the character
export const useGetBackgroundScreen = async (source: string) => {

    const axios = require('axios');
    let data = JSON.stringify({
        query: `query Query ($source: String){
   getBackgroundScreen (source: $source) {
    ancestries { name description parent source trait1 trait2 size }
    backgrounds { name description source parentTrait childTrait deity }
    traits { name traitType description tags}
   }
}`,
        variables: {"source": source}
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
