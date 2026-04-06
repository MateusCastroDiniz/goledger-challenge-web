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
import useDeleteSeason from '../hooks/Seasons/useDeleteSeason';
import useDeleteTvShow from '../hooks/tvShow/useDeleteTvShow';
import { useNavigate } from 'react-router-dom';

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

    const {setRequestDeleteEpisode} = useDeleteEpisode()
    const {setRequestDeleteSeason} = useDeleteSeason()
    const {setRequestDeleteTvShow} = useDeleteTvShow()
    // const {setRequestUpdate, loadingUpdate} = useUpdateSeason()
    const navigate = useNavigate()

    const onSubmit = (data) => {
    //   console.log(data.assetToDelete)
      
      if(assetType == "episodes")
      {
          setRequestDeleteEpisode(data)
          setRefresh(prev => prev + 1)

      }else if(assetType == "seasons")
      {
          setRequestDeleteSeason(data)
          setRefresh(prev => prev + 1)

        }else if(assetType == "tvShows"){
        console.log(data)
        setRequestDeleteTvShow(data)
        navigate('/home')
        
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
            Tem certeza de que deseja excluir esse {assetType}?
          </DialogContentText>
          <form id="subscription-form" onSubmit={handleSubmit(onSubmit)}>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(3)} sx={{color: "#000000"}}>Cancelar</Button>
          <Button type="submit" form="subscription-form" variant="contained" color={"error"}>
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}