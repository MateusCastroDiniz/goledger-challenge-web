import { useState, useEffect } from "react"
import { putUpdateAsset } from "../../services/apiServices"


export default function useUpdateTvShow(){
    
    const [request, setRequest] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        async function updateTvShow(){
            try{
                setLoading(true)

                // console.log(`${!request?.title}`)

                if(!request) return

                const body = {
                "@assetType": "tvShows",
                "title": request?.title,
                "description": request?.description,
                "recommendedAge": request?.recommendedAge
                }

                console.log(`update tvShow ${body}`)

                await putUpdateAsset(body)


            }catch(err){
                console.error("Não foi possível atualizar os dados da série.", err)
            }finally{
                setLoading(false)
                setRequest(null)

            }
        }

        updateTvShow()

    }, [request])



    return{
        setRequest,
        loading
    }
}