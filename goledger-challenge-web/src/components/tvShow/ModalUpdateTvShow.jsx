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
import {useNavigate} from 'react-router-dom'

import useUpdateTvShow from '../../hooks/tvShow/useUpdateTvShow'

export default function ModalUpdateTvShow({handleClose, openModal, tvShow, setRefresh}) {

    const navigate = useNavigate()

    const {
        setRequest,
        loading
    } = useUpdateTvShow()

    const {register, handleSubmit, reset, control} = useForm({values: tvShow})

    const onSubmit = (data) => {
        // console.log(data)
        handleClose(1);
        setRequest(data)
        reset();
        setRefresh(prev => prev + 1)
        navigate(0)
    }

  return (
    <>
      
      <Dialog open={openModal} onClose={() => handleClose(1)}>
        <DialogTitle>Edite o título ou a faixa etária de {tvShow.title}</DialogTitle>
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
          <Button onClick={ () => handleClose(1)} sx={{color: "#000000"}}>Cancel</Button>
          <Button type="submit" form="subscription-form" variant="contained" sx={{backgroundColor:"#f5c518", color: "#000000"}}>
            Editar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}