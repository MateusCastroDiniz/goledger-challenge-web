import { useState, useEffect } from "react";
import { delDeleteAsset } from "../../services/apiServices";
import getde from "../Seasons/useDetailSeasons";
import { getEpisodesSeason } from "../../services/apiServices";
import { useNavigate } from "react-router-dom";


export default function useDeleteTvShow(){

    const [request, setRequestDeleteTvShow] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {

        async function deleteSeason(){


            try{
                if(!request || !request?.assetToDelete) return

                const tvShow = request?.assetToDelete

                if(tvShow.seasons.length > 0){
                    
                for (const s of tvShow.seasons) {
                    console.log(`Buscando episódios da temporada: ${s["@key"]}`);

                    const seasonEpisodes = await getEpisodesSeason(s["@key"])

                    // console.log(seasonEpisodes)
                    if (seasonEpisodes.length > 0){

                        for(const ep of seasonEpisodes){
                            await delDeleteAsset({
                                "@assetType": ep["@assetType"],
                                "@key": ep["@key"]
                            })
                            
                            console.log(ep)
                            
                        }
                    }
                        
                    await delDeleteAsset({
                        "@assetType": s["@assetType"],
                        "@key": s["@key"]
                    })
                    console.log(s["@key"])
                }
                
                }
                
                await delDeleteAsset({
                    "@assetType": "tvShows",
                    "@key": tvShow["@key"],
                })                
                console.log(tvShow["@key"])
                // useNavigate('/home')
                
            }catch(err){
                console.error("Ocorreu um erro ao tentar excluir um episódio.", err)
            }finally{
                setLoading(false)
            }

        }
    
    deleteSeason()

    }, [request])


    return{
        setRequestDeleteTvShow
    }

}