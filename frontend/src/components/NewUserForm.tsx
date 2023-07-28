import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Card, MenuItem, TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddDoors from "./AddDoors";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import { useQuery } from "react-query";
import {  useParams } from "react-router-dom";
import { getUserDetail } from "../shared/API";
import { NewUserFormRouteProps } from '../shared/API';
import Loading from "./Loading";
import { Door } from "../shared/API";

type Inputs = {
  userName: string,
  firstName: string,
  lastName: string,
  role: string,
  email: string,
  phonenr: string,
  address: string,
  password: string,
  passwordRepeat: string,

};

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


export default function NewUserForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);
 
  const [currency, setCurrency] = useState('ADMIN');
  const classes = useStyles();
  const params = useParams<NewUserFormRouteProps>();


  const handleChangeCurrency = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value);
  };


  const { data, isLoading } = useQuery(getUserDetail.name, getUserDetail(params.uuid)); 
//   let { data, isLoading } = useQuery(getUsers.name, getUsers); 

//   const currentUser = data?.users.filter(user => {
//       user.uuid === params.uuid}
//       )

//       console.log(currentUser);
    
//        // @ts-ignore: Object is possibly 'undefined'.
//       const cuurent = currentUser[0] ?? null;

  if(isLoading){
      console.log("is Loading...");
      <Loading />
  }
  

  return (
    <Card style={{backgroundColor:'#c6d9cb', padding:'0.5%', margin:'0.5%'}}>    
        <Link to='/users' style={{color:'black', textDecoration:'none'}}><Button variant='contained' style={{margin:'1%',backgroundColor:'#9bbda3', textAlign:'center'}} startIcon={<ArrowBackIcon />}>back</Button></Link>
    
    <form onSubmit={handleSubmit(onSubmit)}>

        <div style={{display: 'inline-block',float:'left', textAlign:'left', color:'black'}}>
             <h3 style={{paddingBottom:'20%', paddingTop:'15%'}}>Username:</h3>
             <h3 style={{paddingBottom:'20%'}}>Firstname:</h3>
             <h3 style={{paddingBottom:'20%'}}>Lastname:</h3>
             <h3 style={{paddingBottom:'20%'}}>Role:</h3>
             <h3 style={{paddingBottom:'20%'}}>Email:</h3>
             <h3 style={{paddingBottom:'20%'}}>Phone number:</h3>
             <h3 style={{paddingBottom:'20%'}}>Address:</h3>
             <h3 style={{paddingBottom:'20%'}}>Fingerprint:</h3>
        </div>
        <div className={classes.root} style={{display: 'inline-block', float:'left', marginLeft: '10%', backgroundColor:'white', padding:'2%'}}>
            <TextField  required {...register("userName", { required: true })} value={data?.username} margin="dense" id="username" label='username' variant='filled'/>
            <br></br>{errors.userName  && <span style={{color:'red'}}>Please enter a unique username <br></br></span>}
            <TextField {...register("firstName")} value={data?.firstname} margin="dense" id="firstname" label='firstname' variant='filled' /><br></br>
            <TextField {...register("lastName")} value={data?.lastname} margin="dense" id="lastname" label='lastname' variant='filled' /><br></br>
            <TextField id="role" margin="dense" select variant='filled' label="Role" value={currency} onChange={handleChangeCurrency}>
            {roles.map((option) => (
            <MenuItem key={option.value} value={option.value}>
                {option.label}
            </MenuItem> ))} </TextField>  <br></br> 
            <TextField {...register("email", {required: true, pattern: /^\S+@\S+$/i})} value={data?.email} margin="dense" id="email" label='email' variant='filled' />
            <br></br>{errors.email  && <span style={{color:'red'}}>Please enter a valid email </span>}<br></br>
            <TextField {...register("phonenr")} value={data?.phonenumber} margin="dense" id="phonenr" label='phonenr' variant='filled'/><br></br>
            <TextField {...register("address")} value={data?.address} margin="dense" id="address" label='address' variant='filled'/><br></br>
            <Link to='/fingerprintscan'><Button variant='outlined' style={{marginTop:'10%'}} fullWidth><FingerprintIcon style={{color:'red', marginRight:'1%'}} /> hinzufügen</Button></Link>
        </div>
        <div className={classes.root} style={{display: 'inline-block',width:'40%',float:'left', backgroundColor:'#A9C6B0', marginLeft:'3%',position:'relative', padding:'1%'}}>
            Door Access: 
            <Button data-cy="addDoorsbtn"><AddDoors /></Button>
            <br></br>

            <ul>
            {data?.accesses.map((door: Door) =>(
                <li>{door.doorname}</li>
            ))}
            </ul>
            

        </div>
        <Button type="submit" variant='contained' style={{float: 'right', display:'inline-block', marginRight:'1%'}} >Save</Button>
        <Card className={classes.root} style={{display: 'inline-block',width:'50%',float:'left',backgroundColor:'white', marginLeft:'47%',textAlign:'center', marginTop:'-17%'}}>
            <p>Enter password: </p>
            <TextField {...register("password")}placeholder="password" variant="filled" type="password" />
            <br></br>
            <p>Repeat password:</p>
            <TextField {...register("passwordRepeat")} placeholder="password" variant="filled" type="password" />

            <br></br>
            <Button variant='contained' style={{float:'right', margin:'2%'}}>save</Button>
            <br></br>
        </Card>
    </form>
    </Card>
  );
}