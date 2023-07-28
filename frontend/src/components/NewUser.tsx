import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link } from 'react-router-dom';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  username: string,
};
export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  //let username ;
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    
   // debugger;
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
      method: 'POST',
      headers: { 
          'Content-Type': 'application/json',
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Origin": "http://localhost:3000",
      
      },
      credentials: "include",
      body: JSON.stringify(data)
    });
    const jsonData = await response.json();

    if(response.ok){
     // alert("ok");
      //window.location.href=`/new-user/${data.username}`;
    } else {
     // alert("nicht ok");
    }

  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
      <Button variant="contained" color="inherit" onClick={handleClickOpen} data-cy="addNewUserbtn">
        +
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle id="form-dialog-title">Create new User</DialogTitle>
            <DialogContent>
              <DialogContentText>
                 Enter a unique username please:
             </DialogContentText>
              <TextField 
                autoFocus
                margin="dense"
                id="username"
                label="Username"
                type="username"
                variant="filled"
                fullWidth
                required={true}
                data-cy="username"
                {...register("username")}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="inherit" data-cy="addNewUserCancel">
                Cancel
              </Button>
                 
              <Button data-cy="addNewUserBtn" type="submit"><ArrowForwardIosIcon /></Button>
            </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
