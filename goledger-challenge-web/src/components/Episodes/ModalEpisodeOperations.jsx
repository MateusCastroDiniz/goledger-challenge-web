import{
Button,
TextField,
Dialog,
DialogActions,
DialogContent,
DialogContentText,
DialogTitle,
Select,
InputLabel,
MenuItem,
Stack,
Rating}
from '@mui/material';

import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import dayjs from 'dayjs';

import {useForm, Controller} from 'react-hook-form'

import useUpdateEpisode from '../../hooks/Episodes/useUpdateEpisode'
import useCreateEpisode from '../../hooks/Episodes/useCreateEpisode';

export default function ModalEpisodeOperations({handleClose, openModal, episode, setRefresh, season, operation}) {

    const valuesUseForm = operation === "U" && episode
    ?{
      episodeNumber: episode.episodeNumber,
      title: episode.title,
      description: episode.description,
      releaseDate: dayjs(`${episode.releaseDate}`),
      rating: episode.rating,
      season
    }:
    {
      year: dayjs("2026"),
      season
    }

    const {register, handleSubmit, reset, control} = useForm({
      values : valuesUseForm
    })
    const {setRequestCreate, loadingCreate} = useCreateEpisode()
    const {setRequestUpdate, loadingUpdate} = useUpdateEpisode()


    const onSubmit = (data) => {
      // console.log(data)
      
      if(operation == "C")
      {
        setRequestCreate(data)

      }else if(operation == "U")
      {
        setRequestUpdate(data)
      }
        setRefresh(prev => prev + 1)
        handleClose(3);

        reset();
    }

  return (
    <>
      
      <Dialog open={openModal} onClose={() => handleClose(3)}>
        <DialogTitle>
          {operation == "C" ? (
            <>
              Adicione um novo episódio a temporada {season?.number}
            </>
            
          ) : (
            <>
              Editar episódio {episode?.episodeNumber} da temporada {season?.number}
            </>
          )}


        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Preencha os campos abaixo.
          </DialogContentText>
          <form id="subscription-form" onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="column" gap={"20px"}>

            <TextField
              autoFocus
              required
              margin="regular"
              id="title"
              name="title"
              label="Titúlo do episódio"
              type="text"
              fullWidth
              rows={1}
              {...register("title")}
            />
            <TextField
              required
              margin="regular"
              id="description"
              name="description"
              label="Descrição do episódio"
              type="text"
              fullWidth
              rows={10}
              multiline
              {...register("description")}
            />
            <TextField
              autoFocus
              required
              margin="regular"
              id="episodeNumber"
              name="episodeNumber"
              label="Número do episódio"
              type="number"
              fullWidth
              rows={1}
              variant="standard"
              {...register("episodeNumber")}
            />
            <Controller
            control={control}
            defaultValue={2.5}
            name="rating"
            render={({field}) => (
              <Rating name="half-rating" {...field} defaultValue={2.5} precision={0.5} sx={{fontSize: "27px", marginTop: "0"}}/>
            )}/>
     

            <Controller
            control={control}
            defaultValue={dayjs("2026-01-01")}
            name="releaseDate"
            render={({field}) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker {...field} label={"Data de lançamento"} views={['year','month', 'day']} />
                        </DemoContainer>
                    </LocalizationProvider>
                )

            }/>          

            </Stack>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(3)}>Cancelar</Button>
          <Button type="submit" form="subscription-form" variant="contained">
            {operation === "C" ? "Salvar novo episódio" : "Salvar Alterações"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}