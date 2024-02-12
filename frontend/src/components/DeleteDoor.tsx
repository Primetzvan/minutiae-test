import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import RemoveIcon from '@material-ui/icons/Remove';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getUserDetail, getUsers, User } from '../shared/API';
import { useState } from 'react';
import axios from 'axios';


export default function FormDialog(props: { uuid: string,  refetch: Function}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
      setOpen(false);
  };

 const deleteDoor = async () => {

  const response = await fetch(`${process.env.REACT_APP_API_URL}/doors/${props.uuid}`, {
    method: 'DELETE',
    headers: { 
        'Content-Type': 'application/json',
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": "http://localhost:3000",
         
    },
    credentials: "include",
});

if(response.ok){
    await props.refetch();
}else{
  alert("Löschen fehlgeschlagen");
}


  }

  return (
    <div>
      <Button onClick={handleClickOpen}><RemoveIcon style={{color: 'red'}}/></Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Delete Door</DialogTitle>
        <DialogContent>
          <DeleteForeverIcon style={{float:'left', display:'inline-block', fontSize:'400%'}}/>
          <DialogContentText style={{float:'left', display:'inline-block'}}>
            Do you really want to delete the door?
            {/* {data?.username} */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit" data-cy="deleteUserCancel">
            No
          </Button>
          <Button data-cy="deleteUserbtn" onClick={() => {deleteDoor(); handleClose(); }}>
              <Link to='/doors'>Yes</Link>
        </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}