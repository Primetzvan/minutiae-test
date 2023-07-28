import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Avatar, Button, Card, MenuItem, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddDoors from "./AddDoors";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import { useQuery } from "react-query";
import {  useParams } from "react-router-dom";
import { getAdminProfile, getUserDetail } from "../shared/API";
import { NewUserFormRouteProps } from '../shared/API';
import Loading from "./Loading";
import { Door } from "../shared/API";

type Inputs = {
  username: string,
  firstname: string,
  lastname: string,
  role: string,
  email: string,
  phonenumber: string,
};

type Finger = {
  id: string
}

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
      value: 'Admin',
      label: 'Admin',
    },
    {
      value: 'User',
      label: 'User',
    },
  ];


export default function NewUserForm() {
  const { data, isLoading } = useQuery(getAdminProfile.name, getAdminProfile); 

  const uuid = data?.uuid;
  const { register, handleSubmit, control, formState: { errors } } = useForm<Inputs>(
    {
      defaultValues: {
        username: data?.username,
        firstname: data?.firstname,
        lastname: data?.lastname,
        role: data?.role,
        email: data?.email,
        phonenumber: data?.phonenumber,
      }
    }
  );

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    
    console.log(uuid);
    console.log(data);
    // debugger;
     const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${uuid}`, {
       method: 'PATCH',
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
       alert("updated");
      // window.location.href=`/new-user/${data.username}`;
     } else {
       alert("nicht ok");
        alert(response.statusText);
     }
    }

    // const addFinger: SubmitHandler<Finger> = async (data) => {
    //   console.log(data);
    // // debugger;
    //  const response = await fetch(`${process.env.REACT_APP_API_URL}/fingers/`, {
    //    method: 'POST',
    //    headers: { 
    //        'Content-Type': 'application/json',
    //        "Access-Control-Allow-Credentials": "true",
    //        "Access-Control-Allow-Origin": "http://localhost:3000",
       
    //    },
    //    credentials: "include",
    //    body: JSON.stringify(data)
    //  });
    //  const jsonData = await response.json();
 
    
    // }


  const [currency, setCurrency] = useState('Admin');
  const [editable, setEditable] = useState(false);
  const [passwordChange, setPasswordChange] = useState(false);

  const classes = useStyles();
  const params = useParams<NewUserFormRouteProps>();

  console.log(params);

  const handleChangeCurrency = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value);
  };



  let name1: string = data?.username ?? "default name";

  if(isLoading){
      console.log("is Loading...");
      <Loading />
  }
  


function changeEditableState(){
  setEditable(!editable);
  console.log(editable);
}

function handlePasswordChange(){
  setPasswordChange(!passwordChange);
}


function stringAvatar(name: string) {
  name = name.toUpperCase();
  return {
    children: `${name[0][0]}`,
  };
}





  return (
    <div style={{ padding:'0.5%', margin:'0.5%'}}>    
        <Link to='/management' style={{color:'black', textDecoration:'none'}}><Button variant='contained' style={{margin:'1%',backgroundColor:'#9bbda3', textAlign:'center'}} startIcon={<ArrowBackIcon />}>back</Button></Link>

    <Button onClick={changeEditableState}>edit</Button>
    <form onSubmit={handleSubmit(onSubmit)}>

    <Table style={{width:'40%', maxWidth:'40%', float:'left'}}>
      <TableBody>
        <TableRow>
          <TableCell>
            Username:
          </TableCell>
          <TableCell>

          {editable ?<Controller
            name="username"
            control={control}
            defaultValue={data?.username}
            rules={{ required: 'Username required' }}
            render={({ field: { onChange, value } }) => (
              <TextField
              fullWidth
              defaultValue={data?.username}
              {...register("username")}
              label="username"
              variant='outlined'
              value={value}
              onChange={onChange}
              />

            )}
          />: <h3>{data?.username}</h3> }
          {errors.username  && <span style={{color:'red'}}>Please enter a unique username </span>}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            Firstname:
          </TableCell>
          <TableCell>
            {editable ?<Controller
              name="firstname"
              control={control}
              defaultValue={data?.firstname}
              render={({ field: { onChange, value } }) => (
                <TextField
                fullWidth
                defaultValue={data?.firstname}
                {...register("firstname")}
                label="firstname"
                variant='outlined'
                value={value}
                onChange={onChange}
                />

              )}
            />: <h3>{data?.firstname}</h3> }          
            </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            Lastname:
          </TableCell>
          <TableCell>
            {editable ?<Controller
                name="lastname"
                control={control}
                defaultValue={data?.lastname}
                render={({ field: { onChange, value } }) => (
                  <TextField
                  fullWidth
                  defaultValue={data?.lastname}
                  {...register("lastname")}
                  label="lastname"
                  variant='outlined'
                  value={value}
                  onChange={onChange}
                  />
                )}
              />: <h3>{data?.lastname}</h3> }          
              </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            Role:
          </TableCell>
          <TableCell>
            {editable ? <TextField  {...register("role")} fullWidth style={{fontSize:'1vw'}} id="role" margin="dense" select variant='outlined' label="Role" value={currency} onChange={handleChangeCurrency} >
              {roles.map((option) => (
                <MenuItem key={option.value} value={option.value}  >
                    {option.label}
                </MenuItem> ))
              } </TextField> : <h3>{data?.role}</h3>
            }
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            Email:
          </TableCell>
          <TableCell>
            {editable ?<Controller
              name="email"
              control={control}
              defaultValue={data?.email}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  defaultValue={data?.email}
                  {...register("email")}
                  label="email"
                  variant='outlined'
                  value={value}
                  onChange={onChange}
                />
                )}
              />: <h3>{data?.email}</h3> }             
            {errors.email  && <span style={{color:'red'}}>Please enter a valid email </span>}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            Phonenumber:
          </TableCell>
          <TableCell>
            {editable ?<Controller
              name="phonenumber"
              control={control}
              defaultValue={data?.phonenumber}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  defaultValue={data?.phonenumber}
                  {...register("phonenumber")}
                  label="phonenr"
                  variant='outlined'
                  value={value}
                  onChange={onChange}
                />
            )}
              />: <h3>{data?.phonenumber}</h3> } 

          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            Fingerprint:
          </TableCell>
          <TableCell>
          {/* <Link to='/fingerprintscan'> */}
            {data?.finger === null ? <Button variant='outlined' fullWidth style={{fontSize:'1vw'}} startIcon={<FingerprintIcon style={{color: 'red'}} />}>add</Button>: <Button  variant='outlined' fullWidth style={{fontSize:'1vw'}} startIcon={<FingerprintIcon style={{color: 'green'}} />}>remove</Button> }
            {/* </Link> */}
          </TableCell>
        </TableRow>
      </TableBody>
      
    </Table>
    <div hidden={!editable}>
        <Button  type="submit" variant='contained' style={{float:'right', display:'inline-block'}} >Save</Button>
        </div>
    <div style={{float:'left',width:'40%',maxWidth:'40%',marginTop:'3%',marginBottom:'3%'}}>
        <Avatar {...stringAvatar(name1)} style={{padding:'2%'}} />
      </div>
   
    {/* <div style={{width:'100%', maxWidth:'100%'}}>
      
        <div style={{display: 'inline-block',float:'left', textAlign:'left', color:'black', width:'15%', maxWidth:'15%', fontSize:'1vw'}}>
             <h3 style={{padding:'4%'}}>Username:</h3>
             <h3 style={{padding:'4%'}}>Firstname:</h3>
             <h3 style={{padding:'4%'}}>Lastname:</h3>
             <h3 style={{padding:'4%'}}>Role:</h3>
             <h3 style={{padding:'4%'}}>Email:</h3>
             <h3 style={{padding:'4%'}}>Phone number:</h3>
             <h3 style={{padding:'4%'}}>Fingerprint:</h3>
        </div>
        <div className={classes.root} style={{width:'30%', maxWidth:'30%', display: 'inline-block', float:'left', backgroundColor:'white', fontSize:'1vw', textAlign:'left'}}>
            {editable ? <TextField fullWidth style={{fontSize:'1vw'}} required {...register("userName", { required: true })} value={data?.username} margin="dense" id="username" label='username' variant='outlined'/> :<h3>{data?.username}</h3>}
            {errors.userName  && <span style={{color:'red'}}>Please enter a unique username <br></br></span>}
          <br></br>
            {editable ? <TextField fullWidth style={{fontSize:'1vw'}} {...register("firstName")} value={data?.firstname} margin="dense" id="firstname" label='firstname' variant='outlined' />: <h3>{data?.firstname}</h3> }
          <br></br>
            {editable ?<TextField fullWidth style={{fontSize:'1vw'}} {...register("lastName")} value={data?.lastname} margin="dense" id="lastname" label='lastname' variant='outlined' />: <h3 >{data?.lastname}</h3> }
         <br></br>
            {editable ? <TextField fullWidth style={{fontSize:'1vw'}} id="role" margin="dense" select variant='outlined' label="Role" value={currency} onChange={handleChangeCurrency}>
            {roles.map((option) => (
            <MenuItem key={option.value} value={option.value}>
                {option.label}
            </MenuItem> ))} </TextField> : <h3>{data?.role}</h3>}
            <br></br>
            {editable ?<TextField fullWidth style={{fontSize:'1vw'}} {...register("email", {required: true, pattern: /^\S+@\S+$/i})} value={data?.email} margin="dense" id="email" label='email' variant='outlined' />: <h3>{data?.email}</h3>}
            {errors.email  && <span style={{color:'red'}}>Please enter a valid email </span>}
            <br></br>
            {editable ?<TextField  fullWidth style={{fontSize:'1vw'}}{...register("phonenr")} value={data?.phonenumber} margin="dense" id="phonenr" label='phonenr' variant='outlined'/>: <h3>{data?.phonenumber} </h3> }
            <br></br>
            <Link to='/fingerprintscan'><Button variant='outlined' fullWidth style={{fontSize:'1vw'}}><FingerprintIcon style={{color:'red', marginRight:'1%',fontSize:'1.5vw'}} /> hinzufügen</Button></Link>
        </div>
        </div> */}

       

        <div className={classes.root} style={{display: 'inline-block',width:'50%',float:'right', backgroundColor:'#A9C6B0', marginLeft:'3%',position:'relative', padding:'1%'}}>
            Door Access: 
            <Button data-cy="addDoorsbtn"><AddDoors /></Button>
            <br></br>

            <ul>
            {data?.accesses.map((door: Door) =>(
                <li>{door.doorname}</li>
            ))}
            </ul>
            

        </div>
        {/* <div hidden={!passwordChange}>
        <Card className={classes.root} style={{display: 'inline-block',width:'50%',float:'right',backgroundColor:'white',textAlign:'center', padding:'1%'}}>
            <p>Enter your current password: </p>
            <TextField {...register("password")}placeholder="password" variant="filled" type="password" />
            <br></br>
            <p>Enter a new password: </p>
            <TextField {...register("password")}placeholder="password" variant="filled" type="password" />
            <br></br>
            <p>Repeat the new password:</p>
            <TextField {...register("passwordRepeat")} placeholder="password" variant="filled" type="password" />

            <br></br>
            <Button variant='contained' style={{float:'right', margin:'2%'}}>save</Button>
            <br></br>
        </Card>
        </div> */}
        <div hidden={passwordChange }>
        <Button onClick={handlePasswordChange} variant='contained' style={{marginTop:'20%', marginLeft:'25%', width:'15%',backgroundColor:'white',textAlign:'center', padding:'1%', placeItems:'center'}}>
          Change password
        </Button>
        </div>

    </form>
    </div>
  );
}