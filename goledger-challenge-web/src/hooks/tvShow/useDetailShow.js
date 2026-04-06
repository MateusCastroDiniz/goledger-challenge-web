import {useState, useEffect} from 'react'
import { getSearchedShow, getSeasonsShow} from '../../services/apiServices'


export default function useDetailShow(id){

    const [tvShow, setTvShow] = useState({})
    const [loadingTvShow, setLoadingTvShow] = useState(false)
    const [refresh, setRefresh] = useState(0)

    useEffect(() => {

        if(!id) return;

        async function fetchShow(){
            try{
                setLoadingTvShow(true)
                const response = await getSearchedShow(id, "")
                // if(!response) return

                // console.log(id)
                
                const show = response[0]

                const tvShowSeasons = await getSeasonsShow(id)

                const seasonsSorted = tvShowSeasons.sort((a, b) => {return a.number - b.number})
                
                await setTvShow(({
                    ...show,
                    seasons: seasonsSorted
                }))
                

            }catch(err)
            {
                console.error("Erro ao buscar o programa de tv.", err)
            }finally{
                setLoadingTvShow(false)

            }
        }


        fetchShow()

    }, [id, refresh])


    return{
        tvShow,
        loadingTvShow,
        setRefresh
    }


}