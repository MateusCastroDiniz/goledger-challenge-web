import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import {Typography, Box} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useState} from 'react'
// import Button from '@mui/material/Button';

export default function AccordionSeasons({seasons, seasonDetail, setSeason, loading}) {

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
        <AccordionDetails sx={{paddingX: "0"}}>
          
          
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

            )
          })}





        </AccordionDetails>
      </Accordion>



        )
        })}


      
      {/* <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span">Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
      
      
      
      
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <Typography component="span">Accordion Actions</Typography>
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
        <AccordionActions>
          <Button>Cancel</Button>
          <Button>Agree</Button>
        </AccordionActions>
      </Accordion> */}
    </Box>
  );
}