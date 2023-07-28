import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button, Card, MenuItem, Table, TableBody, TableCell, TableRow, TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddDoors from "./AddDoors";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import { useMutation, useQuery } from "react-query";
import {  useParams } from "react-router-dom";
import { CreateNewUserFormRouteProps, createUser, getAdminProfile, getNewUserProfile, getUserDetail, User } from "../shared/API";
import { NewUserFormRouteProps } from '../shared/API';
import Loading from "./Loading";
import { Door } from "../shared/API";
import axios from "axios";

type Inputs = {
  username: string,
  firstname: string,
  lastname: string,
  role: string,
  email: string,
  phonenumber: string,
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
      value: 'Admin',
      label: 'Admin',
    },
    {
      value: 'User',
      label: 'User',
    },
  ];


export default function UserDetail() {

  const [currency, setCurrency] = useState('User');
  const classes = useStyles();
  const params = useParams<CreateNewUserFormRouteProps>();

  const handleChangeCurrency = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value);
  };

  const { data, isLoading } = useQuery(getNewUserProfile.name, getNewUserProfile(params.username)); 
  const uuid = data?.uuid;
  console.log(data)
  
  const { register, handleSubmit,control, formState: { errors } } = useForm<Inputs>({
    defaultValues: {
      username: data?.username,
      firstname: data?.firstname,
      lastname: data?.lastname,
      role: data?.role,
      email: data?.email,
      phonenumber: data?.phonenumber,
    }    }
  );

 

  const onSubmit: SubmitHandler<Inputs> = async (userData) => {
      
    

      console.log(userData);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${uuid}`, {
        method: 'PATCH',
        headers: { 
            'Content-Type': 'application/json',
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Origin": "http://localhost:3000",
        
        },
        credentials: "include",
        body: JSON.stringify(userData)
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
    


 

  // const { data, isLoading } = useQuery(getUserDetail.name, getUserDetail(params.username)); 
  // let role = data?.role;

  // if(isLoading){
  //     console.log("is Loading...");
  //     <Loading />
  // }


  return (
    <div>    
        <Link to='/users' style={{color:'black', textDecoration:'none'}}><Button variant='contained' style={{margin:'1%',backgroundColor:'#9bbda3', textAlign:'center'}} startIcon={<ArrowBackIcon />}>back</Button></Link>
    
    <form onSubmit={handleSubmit(onSubmit)}>

    <Table style={{width:'40%', maxWidth:'40%', float:'left'}}>
      <TableBody>
        <TableRow>
          <TableCell>
            Username:
          </TableCell>
          <TableCell>

            <Controller
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
          />
          {errors.username  && <span style={{color:'red'}}>Please enter a unique username </span>}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            Firstname:
          </TableCell>
          <TableCell>
            <Controller
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
            />        
            </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            Lastname:
          </TableCell>
          <TableCell>
            <Controller
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
              />        
              </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            Role:
          </TableCell>
          <TableCell>
            <TextField  {...register("role")} fullWidth style={{fontSize:'1vw'}} id="role" margin="dense" select variant='outlined' label="Role" value={currency} onChange={handleChangeCurrency} >
              {roles.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem> ))
              } </TextField> 
            
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            Email:
          </TableCell>
          <TableCell>
            <Controller
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
              />         
            {errors.email  && <span style={{color:'red'}}>Please enter a valid email </span>}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            Phonenumber:
          </TableCell>
          <TableCell>
            <Controller
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
              />

          </TableCell>
        </TableRow>
        {/* <TableRow>
          <TableCell>
            Password:
          </TableCell>
          <TableCell>
            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField  type="password"
                disabled={data?.role !== 'User'}
                  fullWidth
                  // {...register("password")}
                  label="password"
                  variant='outlined'
                  value={value}
                  onChange={onChange}
                />
            )}
              />

          </TableCell>
        </TableRow> */}
        <TableRow>
          <TableCell>
            Fingerprint:
          </TableCell>
          <TableCell>
          <Link to='/fingerprintscan'>{data?.finger === null ? <Button variant='outlined' fullWidth style={{fontSize:'1vw'}} startIcon={<FingerprintIcon style={{color: 'red'}} />}>add</Button>: <Button  variant='outlined' fullWidth style={{fontSize:'1vw'}} startIcon={<FingerprintIcon style={{color: 'green'}} />}>remove</Button> }</Link>
          </TableCell>
        </TableRow>
      </TableBody>
      
    </Table>
    <Button  type="submit" variant='contained' style={{float:'right', display:'inline-block'}} >Save</Button>

        <div className={classes.root} style={{display: 'inline-block',width:'50%',float:'right', backgroundColor:'#A9C6B0', marginLeft:'3%',position:'relative', padding:'1%'}}>
            Door Access: 
            <Button data-cy="addDoorsbtn"><AddDoors /></Button>
            <br></br>

            {/* <ul>
            {data?.accesses.map((door: Door) =>(
                <li>{door.doorname}</li>
            ))}
            </ul> */}
            

        </div>
    </form>
    </div>
  );
 }
