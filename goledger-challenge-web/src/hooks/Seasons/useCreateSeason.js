import {useState, useEffect} from 'react'
import { postCreateAsset } from '../../services/apiServices'

export default function useCreateSeason(){

    const [loading, setLoading] = useState(false)
    const [request, setRequest] = useState(null)

    useEffect(() => {
        async function createSeason(){

        try{
            setLoading(true)

            if(!request) return

            // console.log(request.tvShow["@key"])

            const body = {
                "@assetType": "seasons",
                "number": parseInt(request?.number),
                "year": request?.year.year(),
                "tvShow": {
                    "@assetType": "tvShows",
                    "@key": request?.tvShow["@key"]
                }
            }

            console.log(body)

            await postCreateAsset(body)

            
        }catch(err){
            console.error("Não foi possível salvar a temporada. Tente novamente ou fale com o administrador do sistema", err)
        }finally{
            setLoading(false)
            setRequest(null)
        }
    }
    
    createSeason()
        
    }, [request])


    return{
        setRequest,
        loading
    }
}