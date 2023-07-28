import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import WarningIcon from '@material-ui/icons/Warning';
import RemoveIcon from '@material-ui/icons/Remove';
import { Link } from 'react-router-dom';


export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
      <Button onClick={handleClickOpen}><RemoveIcon style={{color: 'red'}}/></Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Delete User</DialogTitle>
        <DialogContent>
          <WarningIcon style={{color:'red',float:'left', display:'inline-block', fontSize:'400%'}}/>
          <DialogContentText style={{float:'left', display:'inline-block'}}>
          You can't delete this user because it's the only admin 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button data-cy="deleteUserbtn" onClick={handleClose}>
              <Link to='/users'>OK</Link>
        </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}