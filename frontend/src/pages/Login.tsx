import { Button, Card, CardContent, CardHeader, TextField} from '@material-ui/core';
import React from 'react';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from "react-hook-form";
import { loginUser, loginUsers } from '../shared/API';
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import Loading from '../components/Loading';
import logo from './Minutiae2.png';

type Inputs = {
    usernameoremail: string,
    password: string,
  
  };



export default function Login(){
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async (userData: loginUsers)  => {

    const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: 'POST',
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
    
        <Loading />
        window.location.href='/management';
    }else{
        {errors.password  && <span style={{color:'red'}}>Please enter a password <br></br></span>}
    }

   console.log(jsonData);

   //loggedInUserId = jsonData;


    // alert(JSON.stringify(userData))

    }
    // const { data, isLoading, refetch} = useQuery(loginUser.name, loginUser(),  {
    //     refetchOnWindowFocus: false,
    //     enabled: false 
    //   }); 




    return(

            <div style={{width:'100%', display: 'grid', placeItems: 'center'}}>
                <h1 style={{textAlign:'center', marginBottom:'10%'}}></h1>
                    <Card style={{border:'2px solid #70a07c',width:'35%',marginLeft:'3%',float:'left', textAlign:'center', padding:'3%'}}>
                        <img src={logo} alt="Logo" width="300" style={{maxWidth:'100%'}}/>
                        <CardContent style={{marginTop:'4%'}}>
                            <form onSubmit={handleSubmit(onSubmit)}>

                                {/* pattern: /^\S+@\S+$/i */}
                                <TextField   {...register("usernameoremail", { required: true})} margin="dense" id="username" data-cy="username" label='username' variant='filled'/><br></br>
                                {errors.usernameoremail  && <span style={{color:'red'}}>Please enter a unique username <br></br></span>}

                                <TextField   {...register("password", { required: true })} type='password' margin="dense" id="password" data-cy="password" label='password' variant='filled'/> <br></br>
                                {errors.password  && <span style={{color:'red'}}>Please enter a password <br></br></span>}

                                <br></br>
                                <Button data-cy="login" type="submit" variant='contained' style={{marginTop:'2%'}}>Login</Button>

                            </form>
                        </CardContent>
                    </Card>

            </div>
    )
}
