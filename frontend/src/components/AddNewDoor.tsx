import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import { useForm, SubmitHandler } from "react-hook-form";


type Inputs = {
    doorname: string,
    ip: string,  
  };


export default function FormDialog() {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
    
      console.log(data);
      // debugger;
       const response = await fetch(`${process.env.REACT_APP_API_URL}/doors`, {
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
       //  alert("ok");
         handleClose();
       } else {
       //  alert("nicht ok");
       }
   
     }
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
    
      <Button variant="contained" style={{float:'right', marginRight:'20%', marginBottom:'1%'}} color="inherit" onClick={handleClickOpen} data-cy="addNewDoorbtn">
      <AddIcon />
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle id="form-dialog-title">Add new Door</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter a unique doorname please:
          <TextField 
          {...register("doorname", { required: true })}
           margin="dense"
           label="Doorname"
           variant="filled"
           fullWidth
            data-cy="doornameInput"
          />
        {errors.doorname  && <span style={{color:'red'}}>Please enter a unique doorname! <br></br></span>}
        </DialogContentText>

        <DialogContentText>
            Enter a valid IP-address please:
          </DialogContentText>
          <TextField {...register("ip", { required: true })}
            margin="dense"
            label="IP-Address"
            variant="filled"
            fullWidth
            data-cy="ipInput"
          />
          <br></br>{errors.ip  && <span style={{color:'red'}}>Please enter a valid IP-Address! <br></br></span>}

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit" data-cy="addNewDoorCancel">
            Cancel
          </Button>
                 
          <Button data-cy="download" type="submit" variant='contained' onClick={handleClose}>Download</Button>
       {/* <a href="" download>Download</a> */}
        </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
