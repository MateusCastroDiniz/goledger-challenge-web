import {useState, useEffect} from 'react'
import { postCreateAsset } from '../../services/apiServices'

export default function useCreateSeason(){

    const [loadingCreate, setLoadingCreate] = useState(false)
    const [request, setRequestCreate] = useState(null)

    useEffect(() => {
        async function createSeason(){

        try{
            setLoadingCreate(true)

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
            setLoadingCreate(false)
            setRequestCreate(null)
        }
    }
    
    createSeason()
        
    }, [request])


    return{
        setRequestCreate,
        loadingCreate
    }
}