import axios from "axios";

//calls the endpoint to get all of the characters associated with the current user.
export const useCharacterByAccId = async (userId: String) => {
    const data = await axios({
        method: 'post',
        url: process.env.NEXT_PUBLIC_BACKEND_URI,
        data: {
            query: `query Query($userId: String) { charactersByUserId(userId: $userId) 
                { id name baseFitness basePrecision baseFocus baseSense size
                    attributes1 { name talentName } 
                    attributes2 { name talentName }
                    talent1 { name caster } 
                    talent2 { name caster }
                    ancestry { name source }
                    background { name source deity }
                }

                }}`,
            variables: {
                userId
            }
        }
    });

    return data.data
}