import { useState, useEffect } from "react"
import { putUpdateAsset } from "../../services/apiServices"


export default function useUpdateEpisode(){
    
    const [request, setRequestUpdate] = useState(null)
    const [loadingUpdate, setLoadingUpdate] = useState(false)

    useEffect(() => {

        async function updateEpisode(){
            try{
                setLoadingUpdate(true)

                // console.log(`${!request?.title}`)

                if(!request) return

                const body = {                    
                    "@assetType": "episodes",
                    "@key": request?.["@key"],
                    "episodeNumber": request?.episodeNumber,
                    "releaseDate": request?.releaseDate["$d"],
                    "title": request?.title,
                    "description": request?.description,
                    "rating": request?.rating,
                    "season": {
                        "@assetType": "seasons",
                        "@key": request?.season?.["@key"]
                    }

                }

                console.log(body)

                await putUpdateAsset(body)


            }catch(err){
                console.error("Não foi possível atualizar os dados do episódio.", err)
            }finally{
                setLoadingUpdate(false)
                setRequestUpdate(null)

            }
        }

        updateEpisode()

    }, [request])



    return{
        setRequestUpdate,
        loadingUpdate
    }
}