import{
Button,
TextField,
Dialog,
DialogActions,
DialogContent,
DialogContentText,
DialogTitle,
Select,
Stack,
InputLabel,
MenuItem
}
from '@mui/material';

import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import dayjs from 'dayjs';

import {useForm, Controller} from 'react-hook-form'

import {useState} from 'react'

import useCreateEpisode from '../../hooks/Episodes/useCreateEpisode'
// import useCreateSeason from '../hooks/useCreateAsset';



export default function ModalCreateEpisode({handleClose, openModal, tvShow, season, setRefresh}) {


    const {register, handleSubmit, reset, control} = useForm({values: {season}})
    const {setRequest, loading} = useCreateEpisode()


    const onSubmit = (data) => {
        console.log(data)
        
        setRequest(data)

        // handleClose(3);

        // reset();

    }

  return (
    <>
      
      <Dialog open={openModal} onClose={() => handleClose(3)}>
        <DialogTitle>Adicionar um novo apisódio à temporada {season?.number} de {tvShow?.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Preencha os campos abaixo para salvar o episódio.
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
            defaultValue={dayjs("2026-01-01")}
            name="releaseDate"
            render={({field}) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker {...field} label={"Data de lançamento"} views={['day','month','year']} />
                        </DemoContainer>
                    </LocalizationProvider>
                )

            }/>
            </Stack>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(3)}>Cancel</Button>
          <Button type="submit" form="subscription-form">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}