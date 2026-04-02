import { useEffect, useState } from 'react'
import { getShowsList } from '../services/apiServices'

export default function UseListaShows(){
    const [shows, setShows] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchAll(){
            setLoading(true)

            try{
                const listShows = await getShowsList()
                setShows(listShows.result)

            }catch (err){
                console.error("Erro ao buscar os programas de tv.", err)
            }finally{
                setLoading(false)
            }
            
        }

        fetchAll();
    }, [])


    return{
        shows,
        loading
    }
}