import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import {Typography, Box, Button, Fab, Rating} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import {useState} from 'react'
import AddIcon from '@mui/icons-material/Add'

export default function AccordionSeasons({seasons, seasonDetail, setSeason, setEpisode, loading, handleClickOpen}) {

  const [expanded, setExpanded] = useState(false);
  const [expandedEpisode, setExpandedEpisode] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleChangeEpisode = (panel) => (event, isExpanded) => {
    setExpandedEpisode(isExpanded ? panel : false);
  };


  console.log(seasonDetail)


  return (
    <Box sx={{width: "100%", position: "relative"}}>



      {seasons?.map(season => {
        return(


        <Accordion expanded={expanded === season["@key"]} onChange={handleChange(season["@key"])}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          onClick={() => {
            setSeason(season)
          }}
          sx={{display: "flex", width: "100%", gap: "20px"}}
        >
          <Typography component="span" sx={{ display:"flex", flexGrow: 1, alignItems: "center"}}>
            Temporada {season.number}
          </Typography>

        </AccordionSummary>
        <AccordionDetails sx={{ display: "flex", flexDirection: "column", alignItems: "center", paddingY: "10px", gap: "50px"}}>
          

          <Box sx={{width: "100%", display: "flex", flexDirection: "column", alignItems:"start", gap: "20px"}}>
          {!loading && seasonDetail?.episodes?.map(ep => {
            return(
                <Accordion expanded={expandedEpisode === ep["@key"]} onChange={handleChangeEpisode(ep["@key"])} sx={{width:"100%"}}>
                  <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  sx={{display: "flex", justifyContent: "space-between"}}
                  >
                  <Typography component="span" sx={{ flexGrow: 1}}>
                  <b>Episódio {ep.episodeNumber}:</b> {ep.title}
                  </Typography>

                  <Rating name="half-rating" readOnly defaultValue={ep.rating} precision={0.5} size={"small"} sx={{fontSize: "27px", marginTop: "0"}}/>
                       
                  

                  </AccordionSummary>
                  <AccordionDetails sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <Typography textAlign={"start"} flexGrow={1}>
                      {ep.description} 
                    </Typography>

                    <Box sx={{width: "fit-content"}}>
                      <Fab size={"small"} 
                          sx={{ backgroundColor: "#f5c518"}} 
                          onClick={(event) => {
                            event.stopPropagation(); 
                            setEpisode(ep)
                            handleClickOpen(3, "U");
                          }}>
                        <EditIcon/>
                      </Fab>
                    </Box>

                  </AccordionDetails>
                </Accordion>

)
          })}
            <Box sx={{width:"100%", display: "flex", justifyContent: "center", paddingX: "10px", gap: "10px", boxSizing: "border-box"}}>
              <Fab variant="extended" 
              sx={{ gap: "5px", backgroundColor: "#f5c518", width: "fit-content" }} 
              onClick={(event) => {
                    event.stopPropagation(); 
                    setSeason(season)
                    handleClickOpen(2, "U");
                  }}>
                Editar temporada
              </Fab>

              <Fab 
                variant='extended' 
                sx={{ gap: "5px", backgroundColor: "#f5c518", width: "fit-content" }} 
                onClick={(event) => {
                  event.stopPropagation(); 
                  handleClickOpen(3, "C");
                }}>   
                Adicionar episódio
                <AddIcon/>
              </Fab>
            </Box>
            


        </Box>

        </AccordionDetails>


      </Accordion>
        )
        })}
    </Box>
  );
}