import {Stack, Container, Grid, Box, Typography, Button} from '@mui/material'
import {useParams} from 'react-router-dom'
import HeaderApp from '../components/HeaderApp'
import AccordionSeasons from '../components/AccordionSeasons'
import ModalUpdateTvShow from '../components/ModalUpdateTvShow'

import useDetailShow from  '../hooks/useDetailShow'
import useDetailSeason from  '../hooks/useDetailSeasons'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import useHandleClickModal from '../hooks/useHandleClickModal'
import { useState } from 'react'

export default function TvShowDetail(){

    const {id} = useParams()
    // const navigate = useNavigate()

    // const [refresh, setRefresh] = useState(0)

    const {tvShow, loadingTvShow, setRefresh} = useDetailShow(id)
    const {seasonDetail, setSeason, loadingSeason} = useDetailSeason()

    console.log(tvShow)

    const {
            openModal,
            handleClickOpen,
            handleClose
        } = useHandleClickModal()

    const colorSchemeRecommendedAge = {
        "18": {
            "bgColor": "#000000",
            "borderColor": "#ffffff"
        },
        "16": {
            "bgColor": "#ff0000",
            "borderColor": "transparent"
        },
        "14": {
            "bgColor": "#ff8c00",
            "borderColor": "transparent"
        },
        "12": {
            "bgColor": "#ffd700",
            "borderColor": "transparent"
        },
        "10": {
            "bgColor": "#00bfff",
            "borderColor": "transparent"
        },
        "0": {
            "bgColor": "#008000",
            "borderColor": "transparent"
        }
    };


    
    return(
        
        <Container sx={{height: "100vh", display: "flex", flexDirection: "column", gap:"50px"}}>
            <HeaderApp/> 


            <Grid container spacing={2}>

                {loadingTvShow ? (
                    <div>carregando</div>
                ) : (
                    
                    <>
                    <ModalUpdateTvShow handleClose={handleClose} openModal={openModal} tvShow={tvShow} setRefresh={setRefresh}/>
                    
                    <Grid size={6} justifyContent={"space-between"} sx={{boxSizing: "border-box"}}>
                    <Box sx={{textAlign: "start", marginBottom: "15px"}}>
                        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} sx={{width: "100%"}}>
                            <Typography variant="h4" sx={{color: "#ffffff"}}>{tvShow?.title}</Typography>
                            <Box sx={{display: "flex", gap:"8px"}}>
                                <Button variant="contained" size={"small"} endIcon={<EditIcon/>} sx={{height:"35px"}} onClick={() => handleClickOpen()}>
                                    Editar
                                </Button>
                                
                            </Box>
                        </Stack>
                        
                        <Stack direction="column" alignItems={"start"} gap={"10px"}>
                            <Typography variant="body2" sx={{color: "#ffffff"}}>{tvShow["@assetType"]} | {tvShow?.seasons?.[0]?.year} - hoje</Typography>
                            
                            <Box sx={{
                                backgroundColor: colorSchemeRecommendedAge[`${tvShow?.recommendedAge}`]?.bgColor,
                                padding: "10px",
                                border: `1px solid ${colorSchemeRecommendedAge[`${tvShow?.recommendedAge}`]?.borderColor}`,
                                width: "10px",
                                height: "10px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "5px"
                                }}>
                                <Typography variant="caption" sx={{color: "#ffffff", fontWeight: "bold"}}>
                                    {tvShow?.recommendedAge}
                                </Typography>
                            </Box>
                        </Stack>
                        
                    </Box>

                    <Box sx={{textAlign: "start", marginBottom: "15px"}}>
                        <Typography variant="body2" sx={{color: "#ffffff"}}>{tvShow?.description}</Typography>
                    </Box>
                </Grid>

                <Grid size={6} sx={{display: "grid"}}>

                    <Box id={"tvShows-list"} 
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: "100%",
                        overflowX: "auto",
                        gap: 2
                    }}>
                            
                    <AccordionSeasons seasons={tvShow?.seasons} setSeason={setSeason} seasonDetail={seasonDetail} loading={loadingSeason}/>
                        <Button variant="contained" size={"small"} endIcon={<AddIcon/>} sx={{height:"35px"}} onClick={() => handleClickOpen()}>
                            Nova temporada
                        </Button>
                    </Box>

                </Grid>
                
                </>
                )}


                
            </Grid>
        </Container>
    )
}