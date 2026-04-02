import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Rating from "@mui/material/Rating"
import StarIcon from '@mui/icons-material/Star'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import '../styles/style.css'

export default function CardFilme({tvShow}){
    return(
        <Box sx={{
            width: "210px", 
            height: "260px", 
            flexShrink: 0,
            backgroundColor: "#464646ff", 
            borderRadius: "10px", 
            display: "flex", 
            flexDirection: "column", 
            gap: "15px", 
            padding:"20px", 
            justifyContent: "space-between",
            boxSizing: "border-box", 
        }}>
            <Stack direction="column" justifyContent="space-between" flexGrow="1">
                <Stack id="div-title" direction="column" spacing={2} justifyContent="space-between" textAlign="start">
                    <Typography variant="body2" color="#ffffff">
                        {tvShow.title}
                    </Typography>
                    
                    <Stack direction="row" spacing={1} sx={{alignItems: "center"}}>
                        <StarIcon sx={{fontSize: "20px", color:"#ffffff"}}/>
                        <Typography variant="subtitle2" sx={{margin: "0", color: "#ffffff"}}>7.2</Typography>
                    </Stack>
                </Stack>

                <Box id="div-rawting">
                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" sx={{width: "100%"}}>
                        <Rating name="half-rating" defaultValue={2.5} precision={0.5} sx={{fontSize: "20px", marginTop: "0"}}/>
                    </Stack>    
                </Box>
            </Stack>
            <Stack id="div-actions" direction="column" gap={"20px"}>
                <Button variant="outlined" sx={{width: "100%", borderRadius: "20px", gap:"10px", color: "#ffffff", border: "1px solid #ffffff", padding: "5px"}} size="small">
                    Ver temporadas
                    <SubscriptionsIcon sx={{color: "#ffffff", fontSize:"20px"}} size="small"/>
                </Button>
                <Button variant="outlined" sx={{width: "100%", borderRadius: "20px", gap:"10px", color: "#ffffff", border: "1px solid #ffffff", padding: "5px"}} size="small">
                    Saiba mais
                    <InfoOutlineIcon sx={{color: "#ffffff", fontSize:"20px"}}/>
                </Button>
            </Stack>
        </Box>
    )
}