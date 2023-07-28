import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import NewUserProfile from './NewUserProfile';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from 'react-router-dom';


type Inputs = {
    doorName: string,
    IPAddress: string,
  
  };


export default function FormDialog() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = doors => console.log(doors);
   

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
    
      <Button variant="contained" style={{float:'right', marginRight:'10%', marginBottom:'1%'}} color="inherit" onClick={handleClickOpen} data-cy="addNewDoorbtn">
      OK
      </Button>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Download files</DialogTitle>
        <DialogContent>
          <DialogContentText>
                You can find the files here:
          </DialogContentText>
          <Button variant='contained' fullWidth startIcon={<CloudDownloadIcon />}>
              <a href="" style={{color:'black', textDecoration:'none'}}download >Download </a>
              </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit" data-cy="downloadCancel">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      </form>
    </div>
  );
}




