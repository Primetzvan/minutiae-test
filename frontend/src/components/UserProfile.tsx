import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Card, MenuItem, TextField } from '@material-ui/core';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import AddDoors from './AddDoors';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
      fontSize: 14,

    },
    root: {
      flexGrow: 3,
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    paper: {
      padding: theme.spacing(3),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    pos: {
      marginBottom: 12,
    },
  }),
);

const roles = [
  {
    value: 'ADMIN',
    label: 'ADMIN',
  },
  {
    value: 'USER',
    label: 'USER',
  },
];


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(){
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [currency, setCurrency] = useState('USER');
  const [editable, setEditable] = useState(false);


  const handleChangeCurrency = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value);
    setEditable(!editable);
  };
  return (
    <div>
      <Button onClick={handleClickOpen}>
      <ArrowForwardIosIcon />
      </Button>
      <Dialog fullScreen disableScrollLock open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar} style={{backgroundColor: "#70a07c"}}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              User Profile
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <h1 style={{textAlign:'center'}}>User Settings</h1>
        
        <Card style={{width:'100%'}}>
        <Card className={classes.paper} style={{ backgroundColor:'#A9C6B0', textAlign:'center',zIndex:1}}>
           <div style={{display: 'inline-block',float:'left', textAlign:'left', color:'black'}}>
                <h3 style={{paddingBottom:'20%', paddingTop:'5%'}}>Username:</h3>
                <h3 style={{paddingBottom:'20%'}}>Firstname:</h3>
                <h3 style={{paddingBottom:'20%'}}>Lastname:</h3>
                <h3 style={{paddingBottom:'20%'}}>Role:</h3>
                <h3 style={{paddingBottom:'20%'}}>Email:</h3>
                <h3 style={{paddingBottom:'20%'}}>Phone number:</h3>
                <h3 style={{paddingBottom:'20%'}}>Address:</h3>
                <h3 style={{paddingBottom:'20%'}}>Fingerprint:</h3>
            </div>
            <div className={classes.root} style={{display: 'inline-block', float:'left', marginLeft: '10%', backgroundColor:'white', padding:'2%'}}>
            <TextField margin="dense" id="username" label="Username" name="username"type="username" variant="filled" required/><br></br>
            <TextField margin="dense" id="firstname" label="Firstname" name="username"type="firstname" variant="filled" /><br></br>
            <TextField margin="dense" id="lastname" label="Lastname" name="username"type="username" variant="filled" /><br></br>
            <TextField id="role" margin="dense" select variant='filled' label="Role" value={currency} onChange={handleChangeCurrency}>
            {roles.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem> ))} 
            </TextField>  <br></br> 
            <TextField margin="dense" id="email" label="Email" name="username" type="email" variant="filled" required={editable}/><br></br>
            <TextField margin="dense" id="phonenumber" label="Phonenumber" name="username"type="phonenumber" variant="filled" /><br></br>
            <TextField margin="dense" id="address" label="Address" name="username"type="address" variant="filled" ></TextField><br></br>
            {/* {row.finger ? <FingerprintIcon style={{color: 'green'}}/> : <FingerprintIcon style={{color: 'red'}} */}
            <Button style={{marginTop:'10%' }}><FingerprintIcon style={{color: 'red'}}/></Button>
            
            
            </div>
            
            <Card className={classes.root} style={{display: 'inline-block',width:'50%',float:'left', backgroundColor:'white',marginLeft:'3%',position:'relative'}}>
                Door Access: 
                <Button><AddDoors /></Button>
                <br></br>
                List of Doors
            </Card>

            <div className={classes.root} style={{display: 'inline-block',width:'50%',float:'left', backgroundColor:'white', marginLeft:'3%', marginTop:'20%'}}>
                <div style={{backgroundColor:'white',width: '30%', marginLeft:'30%',textAlign:'center'}}>
                Assign password:
                <TextField placeholder="password" variant="filled" type="password" />
                <br></br>
                Repeat password:
                <TextField placeholder="password" variant="filled" type="password" />

                <br></br>
                <Button>save</Button>
                <br></br>
                </div>
            </div>
        </Card>
        
        </Card>
      </Dialog>
    </div>
  );
}