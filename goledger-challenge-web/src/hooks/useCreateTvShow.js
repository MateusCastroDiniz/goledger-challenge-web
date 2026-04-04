import {useState, useEffect} from 'react'
import { postCreateAsset } from '../services/apiServices'
import { useNavigate } from 'react-router-dom'

export default function useCreateTvShow(){

    const [loading, setLoading] = useState(false)
    const [request, setRequest] = useState({})

    const navigate = useNavigate()

    useEffect(() => {
        async function createTvShow(){

        try{
            setLoading(true)
            console.log(request)

            if(!request.title) return

            const body = {
                "@assetType": "tvShows",
                "title": request.title,
                "description": request.description,
                "recommendedAge": request.recommendedAge
            }
            postCreateAsset(body)

            
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