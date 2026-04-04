import {useState, useEffect} from 'react'
import {getDetailSeason} from '../services/apiServices'


export default function useDetailSeason(){

    const [seasonDetail, setSeasonDetail] = useState({})
    const [selectedSeason, setSeason] = useState(null)
    const [loadingSeason, setLoadingSeason] = useState(false)

    useEffect(() => {

        if(!selectedSeason) return;

        async function fetchSeason(){
            try{

                setLoadingSeason(true)

                const response = await getDetailSeason(selectedSeason["@key"])
                // if(!response) return

                const seasonEpisodes = response

                const seasonEpisodesSorted = seasonEpisodes.sort((a, b) => {return a.episodeNumber - b.episodeNumber})

                const filteredEpisodes = seasonEpisodesSorted.filter(ep => ep.season["@key"] == selectedSeason["@key"])


                setSeasonDetail(({
                    ...selectedSeason,
                    episodes: filteredEpisodes
                }))


            }catch(err)
            {
                console.error("Erro ao buscar os episódios dessa temporada.", err)
            }finally{
                setLoadingSeason(false)
            }
        }


        fetchSeason()

    }, [selectedSeason])


    return{
        seasonDetail,
        setSeason,
        loadingSeason
    }


}