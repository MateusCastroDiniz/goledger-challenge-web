import AddIcon from '@mui/icons-material/Add';
import {Button, Container, Box, Typography, Skeleton, Pagination, Stack} from '@mui/material';

import  useShows  from '../hooks/tvShow/UseShows.js'
import useHandleClickModal from '../hooks/useHandleClickModal.js'
import CardTvShow from '../components/tvShow/CardTvShow'
import HeaderApp from '../components/HeaderApp'
import ModalCreateTvShow from '../components/tvShow/ModalCreateTvShow'

import '../styles/App.css'

export default function Home(){
    const {
        shows,
        loading,
        setSearchTerm,
        setRefresh,
        currentPage,
        handlePageChange,
        hasMore
    } = useShows()

    const {
        openModal,
        handleClickOpen,
        handleClose
    } = useHandleClickModal()

    // console.log(shows)

    return(
        <Container sx={{height: "100vh", display: "flex", flexDirection: "column"}}>
            <HeaderApp setSearchTerm={setSearchTerm}/> 

            <ModalCreateTvShow handleClose={handleClose} openModal={openModal} setRefresh={setRefresh}/>


            <Box sx={{display:"flex", flexGrow: 1, flexDirection: "column", justifyContent: "center"}}>
                <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between", width:"100%", textAlign: "start", marginBottom: "15px"}}>
                    <Typography variant="h5" sx={{color: "#ffffff"}}>Principais títulos</Typography>
                    <Button variant={"contained"} endIcon={<AddIcon/>} onClick={() => handleClickOpen()}>
                        Adicionar título
                    </Button>
                </Box>

                <Box id={"tvShows-list"} 
                sx={{
                    paddingY: 2,
                    display: 'flex',
                    flexDirection: 'row',
                    width: "100%",
                    overflowX: "auto",
                    gap: 2
                }}>

                    {(loading ? Array.from(new Array(7)) : (Array.isArray(shows) ? shows : [])).map(show => {

                       return show ? (
                            <CardTvShow key={show?.["@key"]} tvShow={show}/>
                            
                        ):(
                            
                            <Box sx={{  width: "210px", 
                                    height: "260px", 
                                    flexShrink: 0,
                                    backgroundColor: "#464646ff", 
                                    borderRadius: "10px", 
                                    display: "flex", 
                                    flexDirection: "column", 
                                    gap: "15px", 
                                    padding:"20px", 
                                    justifyContent: "space-between",
                                    boxSizing: "border-box" 
                                    }}>
                                <Skeleton variant="rounded" sx={{flexGrow: 1, borderRadius:"20px"}}/>
                                <Skeleton variant="rounded" height="40px" sx={{borderRadius:"20px"}}/>
                                <Skeleton variant="rounded" height="40px" sx={{borderRadius:"20px"}}/>

                            </Box>

                            
                        )


                    })}
                        
                </Box>
                    <Stack alignItems="center" sx={{ mt: 'auto', pb: 5 }}>
                    <Pagination 
                        count={hasMore ? currentPage + 1 : currentPage} 
                        page={currentPage} 
                        onChange={handlePageChange}
                        color="primary"
                        sx={{ 
                            '& .MuiPaginationItem-root': { color: '#fff' },
                            '& .Mui-selected': { backgroundColor: 'rgba(255, 255, 255, 0.2) !important' }
                        }}
                    />
                </Stack>





            </Box>
        </Container>
    )
}