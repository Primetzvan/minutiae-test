import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Avatar, Button, Card, MenuItem, Table, TableBody, TableCell, TableRow, TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddDoors from "./AddDoors";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import {
    Access,
    deleteFinger,
    getAdminProfile,
    getUserDetail,
    removeAccess,
    updateAccess,
    updateUser
} from "../shared/API";
import { NewUserFormRouteProps } from '../shared/API';
import keyimg from '../pages/blackkey.png';
import DeleteFinger from "./DeleteFinger";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";


type Inputs = {
    username: string,
    firstname: string,
    lastname: string,
    role: string,
    password: string | undefined,
    email: string,
    phonenumber: string,
};



interface ChangedFields {
    username: string | null,
    firstname: string | null,
    lastname: string | null,
    password: string | null | undefined,
    email: string | null,
    phonenumber: string| null,
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
      '& .MuiTextField-root': {
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
      label: 'Admin (everything)',
    },
    {
        value: 'Leader',
        label: 'Leader (Open doors for 24 hours)',
    },
    {
      value: 'User',
      label: 'User (Open doors)',
    },
  ];


export default function UserDetail() {

  const params = useParams<NewUserFormRouteProps>();

  const { data, refetch } = useQuery("getUserDetailname9", getUserDetail(params.uuid));
  const uuid = data?.uuid;

  const [editable, setEditable] = useState(false);

  const defaultValues = {
      username: data?.username,
      firstname: data?.firstname,
      lastname: data?.lastname,
      role: data?.role,
      email: data?.email,
      phonenumber: data?.phonenumber,
  };


    const { register, control, handleSubmit,reset, formState: { errors }} = useForm<Inputs>({
    defaultValues:  defaultValues
  });

    const [role, setRole] = useState("");


    const onSubmit: SubmitHandler<Inputs> = async () => {

        // TODO : should also work after reload

        console.log("jojo")

        let newData = {
          username: changedFields.username === null ? defaultValues?.username : changedFields.username,
          firstname: changedFields.firstname === null ? defaultValues?.firstname : changedFields.firstname,
          lastname: changedFields.lastname === null ? defaultValues?.lastname : changedFields.lastname,
          email: changedFields.email === null ? defaultValues?.email : changedFields.email,
          phonenumber: changedFields.phonenumber === null ? defaultValues?.phonenumber : changedFields.phonenumber
      }

      if(defaultValues?.role !== role || changedFields.password != null){
          if(role=='Admin'){
              if(changedFields.password!==null){
                  newData = { ...newData, ...{role: 'Admin', password: changedFields.password}}
              }
          }else if(role=='Leader'){
              newData = { ...newData, ...{role: 'Leader'}}
          }else if(role=='User'){
              newData = { ...newData, ...{role: 'User'}}
          }
      }

      let resp = await updateUser(params.uuid, JSON.stringify(newData, function (key, val) {
          return (val === "") ? null : val;
      }))();

      // TODO: password validation

      if (resp !== undefined) {
          setEditable(false);
          await refetch();
      }
  }

    let changedFields: ChangedFields;
    changedFields = {
        email: null,
        firstname: null,
        lastname: null,
        password: null,
        phonenumber: null,
        username: null
    };


  const classes = useStyles();

//   const handleChangeCurrency = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setCurrency(event.target.value);
//   };
//
//
//   let name1: string = data?.username ?? "default name";
//   let roleUsr: string = "";
//
//   if(isLoading){
//       console.log("is Loading...");
//       window.location.reload();
//       <Loading />
//   }
//

function changeEditableState(){
    setEditable(!editable);
}

function changeThings() {
    changeEditableState();
    reset();
}

async function removeFinger() {
    await deleteFinger(params.uuid)();
}

async function setStartDate(date: Date | null, access: Access) {
    if(date){
        let resp = await updateAccess(access.uuid, date)();
        await refetch();
    }
}

async function handleRemoveAccess(access: Access) {
    await removeAccess(access.uuid)();
    await refetch();
}

    return (


    <div style={{ padding:'0.5%', margin:'0.5%'}}>
        <Link to='/users' style={{color:'black', textDecoration:'none'}}>
            <Button variant='contained' style={{margin:'1%',backgroundColor:'#9bbda3', textAlign:'center'}} startIcon={<ArrowBackIcon />}>back</Button>
        </Link>

        <Button onClick={()=>{
            changeThings();
            setRole(data!.role)
        }}>edit</Button>
        <form onSubmit={handleSubmit(onSubmit)}>

        <Table style={{width:'40%', maxWidth:'40%', float:'left'}}>
          <TableBody>
            <TableRow>
              <TableCell>
                Username:
              </TableCell>
              <TableCell>

              {editable ? <Controller
                name="username"
                control={control}
                render={( {field: { onChange }} ) => (
                  <TextField
                      defaultValue={data?.username}
                      fullWidth
                      label="username"
                      variant='outlined'
                      onChange={(value) => {changedFields.username = value.target.value;onChange()}}
                      required={true}
                  />

                )}
              />: <h3>{data?.username}</h3> }
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
                    render={({ field: { onChange, value } }) => (
                    <TextField
                        fullWidth
                        defaultValue={data?.firstname}
                        label="firstname"
                        variant='outlined'
                        onChange={(value) => {changedFields.firstname = value.target.value; onChange()}}
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
                    render={({ field: { onChange, value } }) => (
                      <TextField
                          defaultValue={data?.lastname}
                          fullWidth
                          label="lastname"
                          variant='outlined'
                          onChange={(value) => {changedFields.lastname = value.target.value; onChange()}} //defaultValues.lastname = value.target.value;c
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
                      {editable ? <TextField fullWidth style={{fontSize:'1vw'}} id="role" margin="dense" select variant='outlined' label="Role" defaultValue={data?.role} onChange={(value) => {setRole(value.target.value)}}>
                          {roles.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                              </MenuItem> ))
                          } </TextField>: <h3>{data?.role}</h3>
                      }
                  </TableCell>
              </TableRow>
            <TableRow>
              <TableCell>
                Password:
              </TableCell>
              <TableCell>
                {editable && role=="Admin" ?<Controller
                  name="password"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                        fullWidth
                        label="password"
                        variant='outlined'
                        onChange={(value) => {changedFields.password = value.target.value.toString(); onChange()}}
                    />
                    )}
                  />: <h3>{(((defaultValues.role=="Admin") && (role=="")) || role=="Admin") ? "*********" : ""}</h3> }
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
                  render={({ field: { onChange, value } }) => (
                    <TextField
                        fullWidth
                        defaultValue={data?.email}
                        label="email"
                        variant='outlined'
                        onChange={(value) => {changedFields.email = value.target.value; onChange()}}
                    />
                    )}
                  />: <h3>{data?.email}</h3> }
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
                  render={({ field: { onChange, value} }) => (
                    <TextField
                        fullWidth
                        defaultValue={data?.phonenumber}
                        label="phonenr"
                        variant='outlined'
                        onChange={(value) => {changedFields.phonenumber = value.target.value; onChange()}}
                    />
                )}
                  />: <h3>{data?.phonenumber}</h3> }

              </TableCell>
            </TableRow>
          </TableBody>

        </Table>
        <div hidden={!editable}>
            <Button type="submit" variant='contained' style={{float:'right', display:'inline-block'}}>Save</Button>
        </div>
        <div style={{float:'left', width:'40%', marginLeft:'10%'}}>
          {data?.finger === null ? <Link to={`/fingerprintscan/${params.uuid}`} ><Button variant='outlined' fullWidth style={{fontSize:'1.5vw',textDecoration:'none'}} startIcon={<FingerprintIcon style={{color: 'red',fontSize:'2vw', padding:'2%'}} />}>add</Button></Link>: <DeleteFinger uuid={data?.uuid} refetch={refetch}/> }
          <br></br>
          <div className={classes.root} style={{width:'95%', display: 'inline-block',backgroundColor:'#A9C6B0', position:'relative', padding:'3%', marginTop:'10%'}}>
            <AddDoors />
            Door Access:
            <br></br>
            <ul>
              {data?.accesses.map((access: Access) =>(
                <>
                 <li style={{listStyle: 'none' }}>
                     <div style={{display: "flex"}}>
                         <div><img src={keyimg} alt='key' width={'20px'}/></div>
                         <div style={{display: "flex", flexDirection: "column", marginLeft: "10px"}}>
                             <p style={{margin: 0}}>{access.door.doorname}</p>
                             <div style={{display: "flex",  fontSize: "55%", alignItems: "center"}}>
                                 <p style={{margin: 0}}>Expire date:</p>
                                 <DatePicker selected={new Date(access.expireDate)} onChange={(date) => setStartDate(date, access)} />
                                 <div style={{padding: '5px', cursor: 'pointer'}} onClick={()=>{
                                     handleRemoveAccess(access);
                                 }}><CloseIcon /></div>
                             </div>
                         </div>
                     </div>
                 </li>
                 <br></br></>
               ))}
            </ul>
            </div>
          </div>
        </form>
    </div>
  );
}
