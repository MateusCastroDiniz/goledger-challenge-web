import {useState, useEffect} from 'react'
import { postCreateAsset } from '../../services/apiServices'

export default function useCreateEpisode(){

    const [loading, setLoading] = useState(false)
    const [request, setRequest] = useState(null)

    useEffect(() => {
        async function createEpisode(){

        try{
            setLoading(true)
            
            console.log(request)

            if(!request) return
            

            const body = {
                "@assetType": "episodes",
                "episodeNumber": request?.episodeNumber,
                "releaseDate": request?.releaseDate["$d"],
                "title": request?.title,
                "description": request?.description,
                "season": {
                    "@assetType": "seasons",
                    "@key": request?.season?.["@key"]
                }
            }

            await postCreateAsset(body)

            
        }catch(err){
            console.error("Erro detalhado: ", err.message, err.stack)
        }finally{
            setLoading(false)
            setRequest(null)
        }
    }
    
    createEpisode()
        
    }, [request])


    return{
        setRequest,
        loading
    }
}