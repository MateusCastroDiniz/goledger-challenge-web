import { useState, useEffect } from "react"
import { putUpdateAsset } from "../../services/apiServices"


export default function useUpdateSeason(){
    
    const [request, setRequest] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        async function updateSeason(){
            try{
                setLoading(true)

                // console.log(`${!request?.title}`)

                if(!request) return

                const body = {
                    "@assetType": "seasons",
                    "number": parseInt(request?.number),
                    "year": request?.year.year(),
                    "tvShow": {
                        "@assetType": "tvShows",
                        "@key": request?.tvShow["@key"]
                    }
                }

                // console.log(`update tvShow ${body}`)

                await putUpdateAsset(body)


            }catch(err){
                console.error("Não foi possível atualizar os dados da série.", err)
            }finally{
                setLoading(false)
                setRequest(null)

            }
        }

        updateSeason()

    }, [request])



    return{
        setRequest,
        loading
    }
}