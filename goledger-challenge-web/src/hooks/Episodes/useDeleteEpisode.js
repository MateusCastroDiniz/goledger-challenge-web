import { useState, useEffect } from "react";
import { delDeleteAsset } from "../../services/apiServices";

export default function useDeleteEpisode(){

    const [request, setRequestDeleteEpisode] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        async function deleteEpisode(){


            try{
                setLoading(true)

                if(!request) return

                const body = {
                    "@assetType": "episodes",
                    "@key": request?.["@key"]
                }

                // console.log(body)

                await delDeleteAsset(body)

            }catch(err){
                console.error("Ocorreu um erro ao tentar excluir um episódio.", err)
            }finally{
                setLoading(false)
            }

        }
    
    deleteEpisode()

    }, [request])


    return{
        setRequestDeleteEpisode
    }

}