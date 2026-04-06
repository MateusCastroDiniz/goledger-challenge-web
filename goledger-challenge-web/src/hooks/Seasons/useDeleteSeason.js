import { useState, useEffect } from "react";
import { delDeleteAsset } from "../../services/apiServices";
import { useNavigate } from "react-router-dom";

export default function useDeleteSeason(){

    const [request, setRequestDeleteSeason] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {

        async function deleteSeason(){


            try{
                setLoading(true)

                if(!request || !request?.assetToDelete) return

                if(request?.assetToDelete?.episodes?.length > 0){

                    const deletePromises = request?.assetToDelete?.episodes?.map(e => {
                        
                        const body = {
                            "@assetType": "episodes",
                        "@key": e?.["@key"]
                    }
                    
                    console.log(body)
                    return delDeleteAsset(body)                    
                    })

                    await Promise.all(deletePromises)
                }
                

                const bodySeason = {
                    "@assetType": "seasons",
                    "@key": request?.assetToDelete?.["@key"]
                }

                // console.log(bodySeason)
                await delDeleteAsset(bodySeason)
                navigate(0)

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