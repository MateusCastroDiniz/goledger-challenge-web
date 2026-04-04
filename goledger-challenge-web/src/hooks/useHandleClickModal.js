import {useState} from 'react'

export default function useHandleClickModal(){
    const [openModal, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    return{
        openModal,
        handleClickOpen,
        handleClose
    }
}