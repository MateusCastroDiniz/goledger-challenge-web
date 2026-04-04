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

import useCreateSeason from '../hooks/Seasons/useCreateSeason'



export default function ModalCreateSeason({handleClose, openModal, tvShow, setRefresh}) {


    const {register, handleSubmit, reset, control} = useForm({values: {tvShow}})
    const {setRequest, loading} = useCreateSeason()


    const onSubmit = (data) => {
        console.log(data)
        
        setRequest(data)

        handleClose(2);

        reset();

    }

  return (
    <>
      
      <Dialog open={openModal} onClose={() => handleClose(2)}>
        <DialogTitle>Adicione uma nova temporada a {tvShow.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Informe o número da temporada e o ano de publicação.
          </DialogContentText>
          <form id="subscription-form" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              autoFocus
              required
              margin="regular"
              id="number"
              name="number"
              label="Número da temporada"
              type="number"
              fullWidth
              rows={1}
              variant="standard"
              {...register("number")}
            />

            <InputLabel id="demo-simple-select-label">Ano de publicação</InputLabel>
            <Controller
            control={control}
            defaultValue={dayjs("2026")}
            name="year"
            render={({field}) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker {...field} label={"Ano de publicação"} views={['year']} />
                        </DemoContainer>
                    </LocalizationProvider>
                )

            }/>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(2)}>Cancel</Button>
          <Button type="submit" form="subscription-form">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}