import {useState, useEffect} from 'react'
import { postCreateAsset } from '../services/apiServices'
import useGetSchema from './useGetSchema'

export default function useCreateAsset(type){

    const [loading, setLoading] = useState(false)
    const [request, setRequest] = useState(null)
    const {schema, setAssetType} = useGetSchema()

    useEffect(() => {
        if(type) return setAssetType(type)
    }, [type, setAssetType])


    useEffect(() => {
        async function createAsset(){
        
        try{
            setLoading(true)
            // console.log(`Create tvShow${!request?.title}`)

            if(!request || !schema) return

            console.log(schema)


            const body = {
                "@assetType": "tvShows",
                "title": request?.title,
                "description": request?.description,
                "recommendedAge": request?.recommendedAge
            }

            // await postCreateAsset(body)

            
        }catch(err){
            console.error("Não foi possível concluir a operação. Tente novamente ou fale com o administrador do sistema", err)
        }finally{
            setLoading(false)
            setRequest(null)
            setAssetType(null)
        }
    }
    
    createAsset()
        
    }, [request])


    return{
        setRequest,
        setAssetType,
        loading
    }
}