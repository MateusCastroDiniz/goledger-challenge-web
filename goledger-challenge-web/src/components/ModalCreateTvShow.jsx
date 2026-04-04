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
import {useForm, Controller} from 'react-hook-form'

import {useState} from 'react'

import useCreateTvShow from '../hooks/useCreateTvShow'




export default function ModalCreateTvShow({handleClose, openModal}) {

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const formData = new FormData(event.currentTarget);
//     const formJson = Object.fromEntries(formData.entries());
//     const email = formJson.email;
//     console.log(email);
//     handleClose();
//   };

    const {
        setRequest,
        loading
    } = useCreateTvShow()

    const [selectVal, setSelectVal] = useState(0)

    // const handleChange = (event) => {
    //     setSelectVal(event.target.value)
    // }

    const {register, handleSubmit, reset, control} = useForm()

    const onSubmit = (data) => {
        // console.log(data)
        setRequest(data)
        handleClose();

        reset();
    }

  return (
    <>
      
      <Dialog open={openModal} onClose={handleClose}>
        <DialogTitle>Adicionar uma nova série de Tv</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Para adicionar um novo título à lista de séries, informe um título, crie uma descrição e comunique a idade recomendada para que outros possam assistir. 
          </DialogContentText>
          <form id="subscription-form" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              autoFocus
              required
              margin="regular"
              id="title"
              name="title"
              label="Título da série"
              type="text"
              fullWidth
              rows={1}
              variant="standard"
              {...register("title")}
            />

            <TextField
              autoFocus
              required
              margin="regular"
              id="description"
              name="description"
              label="Descrição da série"
              type="text"
              fullWidth
              rows={3}
              variant="standard"
              {...register("description")}
            />

            <InputLabel id="demo-simple-select-label">Faixa etária</InputLabel>

            <Controller
            control={control}
            defaultValue={0}
            name="recommendedAge"
            render={({field}) => (

                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectVal}
                        label="Faixa etária"
                        {...field}>
                        <MenuItem value={0}>Livre</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={12}>12</MenuItem>
                        <MenuItem value={14}>14</MenuItem>
                        <MenuItem value={16}>16</MenuItem>
                        <MenuItem value={18}>+18</MenuItem>
                    </Select>
                )

            }/>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="subscription-form">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}