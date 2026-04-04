import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import {Typography, Box} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useState} from 'react'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add'

export default function AccordionSeasons({seasons, seasonDetail, setSeason, loading, handleClickOpen}) {

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
        >
          <Typography component="span" sx={{ width: '33%', flexShrink: 0 }}>
            Temporada {season.number}
          </Typography>

        </AccordionSummary>
        <AccordionDetails sx={{ display: "flex", flexDirection: "column", alignItems: "center", paddingX: "10px", paddingY: "10px", gap: "10px"}}>
          
          {!loading && seasonDetail?.episodes?.map(ep => {
            return(
              <Box>
                <Accordion expanded={expandedEpisode === ep["@key"]} onChange={handleChangeEpisode(ep["@key"])} sx={{width:"100%"}}>
                  <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  sx={{display: "flex", justifyContent: "space-between"}}
                  >
                  <Typography component="span" sx={{ flexGrow: 1}}>
                  Episódio {ep.episodeNumber}
                  </Typography>

                  <Typography component="span" sx={{ width: '33%', flexShrink: 0 }}>
                  {ep.title}
                  </Typography>

                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography textAlign={"start"}>
                      {ep.description}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Box>

            )
          })}

            <Fab 
              variant='extended' 
              sx={{ gap: "5px", backgroundColor: "#f5c518", width: "fit-content" }} 
              onClick={(event) => {
                event.stopPropagation(); 
                handleClickOpen(3);
              }}
            >   
            Novo episódio
            <AddIcon/>
        </Fab>

        </AccordionDetails>


      </Accordion>
        )
        })}
    </Box>
  );
}