import { useEffect, useState, useMemo } from 'react'
import { getShowsList } from '../services/apiServices'

export default function useShows(){

    const [shows, setShows] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {

        async function fetchAll(){

            setLoading(true)

            try{
                const response = await getShowsList()
                setShows(response || [])
            }
            catch(err){
                console.error("Erro ao buscar os programas de tv.", err)
            }
            finally{
                setLoading(false)
            }
        }

        fetchAll()

        
    }, [])
    

    const filteredShows = useMemo(() => {

        if(!searchTerm){
            return shows
        }

        return shows.filter(show => (show?.title?.trim().toLowerCase().includes(searchTerm.trim().toLowerCase())))


    }, [searchTerm, shows])



    return{
        shows,
        filteredShows,
        loading,
        setSearchTerm,
        searchTerm
    }
}