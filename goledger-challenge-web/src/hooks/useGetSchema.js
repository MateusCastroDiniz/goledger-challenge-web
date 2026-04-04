import { useState, useEffect} from "react"
import { getSchema } from "../services/apiServices"

export default function useGetSchema(){
    const [assetType, setAssetType] = useState(null)
    const [schema, setSchema] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function getSchemaAssetType(){
            
            try{
                console.log(assetType)

                if(!assetType) return

                setLoading(true)

                const response = await getSchema(assetType)
                setSchema(response)
                // return response

            }catch(err){
                console.error("Não foi possível obter o schema do asset em solicitado.", err)
            }finally{
                setLoading(false)
                setAssetType(null)
            }
        }

        getSchemaAssetType()


    }, [assetType])



    return {
        schema,
        setAssetType
    }
}