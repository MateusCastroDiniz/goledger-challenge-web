import { useState, useEffect } from "react";
import { delDeleteAsset } from "../../services/apiServices";

export default function useDeleteSeason(){

    const [request, setRequestDeleteSeason] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        async function deleteSeason(){


            try{
                setLoading(true)

                if(!request || !request?.assetToDelete) return


                const deletePromises = request?.assetToDelete?.episodes?.map(e => {
                    
                    const body = {
                        "@assetType": "episodes",
                        "@key": e?.["@key"]
                    }

                    return delDeleteAsset(body)                    
                })

                await Promise.all(deletePromises)


                const bodySeason = {
                    "@assetType": "seasons",
                    "@key": request?.assetToDelete?.["@key"]
                }

                console.log(bodySeason)
                await delDeleteAsset(bodySeason)

            }catch(err){
                console.error("Ocorreu um erro ao tentar excluir um episódio.", err)
            }finally{
                setLoading(false)
            }

        }
    
    deleteSeason()

    }, [request])


    return{
        setRequestDeleteSeason
    }

}