import axios from 'axios';

export const useGetAncestryList = async ()=>{
let data = JSON.stringify({
  query: `query Query ($source: String){
   getAncestryList (source: $source) {
    id name description parent source trait1 trait2 size
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
  data : data
};

return await axios.request(config)
}