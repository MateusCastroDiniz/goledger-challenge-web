import {Stack, Container, Grid, Box, Typography, Button, textFieldClasses} from '@mui/material'
import {useParams} from 'react-router-dom'
import HeaderApp from '../components/HeaderApp'
import AccordionSeasons from '../components/Seasons/AccordionSeasons'
import ModalUpdateTvShow from '../components/tvShow/ModalUpdateTvShow'
import ModalSeasonOperations from '../components/Seasons/ModalSeasonOperations'

import Fab from '@mui/material/Fab';
import useDetailShow from  '../hooks/tvShow/useDetailShow'
import useDetailSeason from  '../hooks/Seasons/useDetailSeasons'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'
import ModalEpisodeOperations from '../components/Episodes/ModalEpisodeOperations'

export default function TvShowDetail(){

    const {id} = useParams()
    // const navigate = useNavigate()

    // const [refresh, setRefresh] = useState(0)

    const {tvShow, loadingTvShow, setRefresh} = useDetailShow(id)
    const {seasonDetail, setSeason, loadingSeason} = useDetailSeason()
    const [selectedEpisode, setSelectedEpisode] = useState(null);

    // console.log(tvShow)

    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [openModalSeasonOperations, setOpenModalSeasonOperations] = useState(false);
    const [openModalEpisodeOperations, setOpenModalEpisodeOperations] = useState(false);
    const [operation, setOperation] = useState('');
    
    const handleClickOpen = (i, op) => {
        if(i == 1){
            setOpenModalUpdate(true);
        }else if(i == 2){
            setOpenModalSeasonOperations(true)
        }else if(i == 3){
            setOpenModalEpisodeOperations(true)
        }
        setOperation(op)
    };

    const handleClose = (i) => {
        if(i == 1){
            setOpenModalUpdate(false);
        }else if(i == 2){
            setOpenModalSeasonOperations(false)
        }else if(i == 3){
            setOpenModalEpisodeOperations(false)
        }
    };

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
                    <ModalUpdateTvShow handleClose={handleClose} openModal={openModalUpdate} tvShow={tvShow} setRefresh={setRefresh}/>
                    <ModalSeasonOperations handleClose={handleClose} openModal={openModalSeasonOperations} tvShow={tvShow} season={seasonDetail} setRefresh={setRefresh} operation={operation}/>
                    <ModalEpisodeOperations handleClose={handleClose} openModal={openModalEpisodeOperations} season={seasonDetail} episode={selectedEpisode} setRefresh={setRefresh} operation={operation}/>

                    <Grid size={6} justifyContent={"space-between"} sx={{boxSizing: "border-box"}}>
                    <Box sx={{textAlign: "start", marginBottom: "15px"}}>
                        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} sx={{width: "100%"}}>
                            <Typography variant="h4" sx={{color: "#ffffff"}}>{tvShow?.title}</Typography>
                            <Box sx={{display: "flex", gap:"8px"}}>
                                <Fab variant="extended" sx={{mr: 1, gap: "5px"}} onClick={() => handleClickOpen(1, "U")}>
                                    Editar Série
                                    <EditIcon/>
                                </Fab>
                                
                                {/* <Button variant="contained" size={"small"} endIcon={<EditIcon/>} sx={{height:"35px"}} >
                                    Editar
                                </Button> */}
                                
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
                            
                    <AccordionSeasons seasons={tvShow?.seasons} handleClickOpen={handleClickOpen} setSeason={setSeason} setEpisode={setSelectedEpisode} seasonDetail={seasonDetail} loading={loadingSeason}/>
                        

                        <Fab variant="extended" sx={{gap: "5px", backgroundColor: "#f5c518"}} onClick={() => handleClickOpen(2, "C")}>
                            Adicionar temporada
                            <AddIcon/>
                        </Fab>
                    </Box>

                </Grid>
                
                </>
                )}


                
            </Grid>
        </Container>
    )
}