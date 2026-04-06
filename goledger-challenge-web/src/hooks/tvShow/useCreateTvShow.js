import {useState, useEffect} from 'react'
import { postCreateAsset } from '../../services/apiServices'

export default function useCreateTvShow(){

    const [loading, setLoading] = useState(false)
    const [request, setRequest] = useState(null)

    useEffect(() => {
        async function createTvShow(){

        try{
            setLoading(true)
            // console.log(`Create tvShow${!request?.title}`)

            if(!request) return

            const body = {
                "@assetType": "tvShows",
                "title": request?.title,
                "description": request?.description,
                "recommendedAge": request?.recommendedAge
            }

            await postCreateAsset(body)
            console.log(body)

            
        }catch(err){
            console.error("Não foi possível salvar essa série. Tente novamente ou fale com o administrador do sistema", err)
        }finally{
            setLoading(false)
            setRequest(null)
        }
    }
    
    createTvShow()
        
    }, [request])


    return{
        setRequest,
        loading
    }
}