// import { useSchemas } from "../../hooks/useSchemas";
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CardFilme  from '../../components/CardFilme.jsx'
import '../../styles/App.css'
import  UseListaShows  from '../../hooks/UseListaShows.js'

function Home(){
    const {shows, loadings} = UseListaShows()

    console.log(shows)

    return(
        <Container sx={{height: "100vh", display: "flex", flexDirection: "column"}}>
            <Box sx={{background: "#bebebeff", padding: ".2rem"}}>    
                <Typography variant="h4">Cabeçalho</Typography>
            </Box>
            <Box sx={{display:"flex", flexGrow: 1, flexDirection: "column", justifyContent: "center"}}>
                <Box sx={{textAlign: "start", marginBottom: "15px"}}>
                    <Typography variant="h5" sx={{color: "#ffffff"}}>Principais títulos</Typography>
                </Box>
                
                {shows.length > 0 ? (


                    <Box id={"tvShows-list"} 
                    sx={{
                        paddingY: 2,
                        display: 'flex',
                        flexDirection: 'row',
                        width: "100%",
                        overflowX: "auto",
                        gap: 2
                    }}>

                    {shows.map(tvShow => {
                        return(
                            <CardFilme tvShow={tvShow}/>
                        )})
                    }
                    </Box>
                )
                
                 : (
                    <Typography>Carregando</Typography>
                )}


            </Box>
        </Container>
    )
}

export default Home;