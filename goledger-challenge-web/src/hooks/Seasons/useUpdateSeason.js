import { useState, useEffect } from "react"
import { putUpdateAsset } from "../../services/apiServices"


export default function useUpdateSeason(){
    
    const [request, setRequestUpdate] = useState(null)
    const [loadingUpdate, setLoadingUpdate] = useState(false)

    useEffect(() => {

        async function updateSeason(){
            try{
                setLoadingUpdate(true)

                // console.log(`${!request?.title}`)

                if(!request) return

                const body = {
                    "@assetType": "seasons",
                    "@key": request?.season?.["@key"],
                    "number": parseInt(request?.number),
                    "year": request?.year ? request?.year.year() : null,
                    "tvShow": {
                        "@assetType": "tvShows",
                        "@key": request?.tvShow?.["@key"]
                    }
                }

                console.log(body)

                await putUpdateAsset(body)


            }catch(err){
                console.error("Não foi possível atualizar os dados da série.", err)
            }finally{
                setLoadingUpdate(false)
                setRequestUpdate(null)

            }
        }

        updateSeason()

    }, [request])



    return{
        setRequestUpdate,
        loadingUpdate
    }
}