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
import useDeleteEpisode from '../hooks/Episodes/useDeleteEpisode';

export default function ModalDeleteAsset({handleClose, openModal, setRefresh, operation, assetToDelete, assetType}) {

    const valuesUseForm = assetToDelete
    ?{
      assetToDelete,
      assetType: assetType
    }:
    {
        assetType: assetType
    }


    const {register, handleSubmit, reset, control} = useForm({
      values : valuesUseForm
    })
    const {setRequestDeleteEpisode, loadingDeleteEpisode} = useDeleteEpisode()
    // const {setRequestUpdate, loadingUpdate} = useUpdateSeason()


    const onSubmit = (data) => {
    //   console.log(data.assetToDelete)
      
      if(assetType == "episodes")
      {
        setRequestDeleteEpisode(assetToDelete)

      }else if(operation == "U")
      {
        // setRequestUpdate(data)
      }

        handleClose(3);

        reset();
    }

  return (
    <>
      
      <Dialog open={openModal} onClose={() => handleClose()}>
        <DialogTitle>
          
            Atenção!

        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza de que deseja excluir esse episódio?
          </DialogContentText>
          <form id="subscription-form" onSubmit={handleSubmit(onSubmit)}>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(3)}>Cancelar</Button>
          <Button type="submit" form="subscription-form" variant="contained" color={"error"}>
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}