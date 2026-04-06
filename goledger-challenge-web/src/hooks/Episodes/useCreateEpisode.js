import {useState, useEffect} from 'react'
import { postCreateAsset } from '../../services/apiServices'

export default function useCreateEpisode(){

    const [loadingCreate, setLoadingCreate] = useState(false)
    const [request, setRequestCreate] = useState(null)

    useEffect(() => {
        async function createEpisode(){

        try{
            setLoadingCreate(true)
            
            // console.log(request)

            if(!request) return
            

            const body = {
                "@assetType": "episodes",
                "episodeNumber": request?.episodeNumber,
                "releaseDate": request?.releaseDate,
                "title": request?.title,
                "description": request?.description,
                "rating": request?.rating,
                "season": {
                    "@assetType": "seasons",
                    "@key": request?.season?.["@key"]
                }
            }

            console.log(body)
            await postCreateAsset(body)

        }catch(err){
            console.error("Erro detalhado: ", err.message, err.stack)
        }finally{
            setLoadingCreate(false)
            setRequestCreate(null)
        }
    }
    
    createEpisode()
        
    }, [request])




    return{
        setRequestCreate,
        loadingCreate
    }
}