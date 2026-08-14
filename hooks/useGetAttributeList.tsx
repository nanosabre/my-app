import { Character } from "@/types/characterTypes";
import { InventoryDAO } from "@/types/itemTypes";
import { SpellDAO } from "@/types/spellTypes";
import axios from "axios";

//calls the endpoint to save the character
export const useGetAttributeList = async () => {

    let result = await axios({
        method: 'post',
        url: process.env.NEXT_PUBLIC_BACKEND_URI,
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            query: `query Query{ getAttributeList {
                    id name talentName description1 description2
            }}`,
            variables: {}
        }
    });

    return result
}
