import React, { useState } from 'react'
// import { useState, useEffect } from 'react'
import { useQuery} from 'react-query';
import ColorPicker from '../components/ColorPicker';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import { Button, TextField } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import {getDoors, updateDoor} from '../shared/API';
import AddNewDoor from '../components/AddNewDoor';
import Loading from '../components/Loading';
import {Controller, useForm} from "react-hook-form";
import DeleteDoor from '../components/DeleteDoor';



    //#region

    //const [doors, setDoors] = useState<Door[]>([]);
    // useEffect(()=>{
    //     axios.get('./doors.json')
    //     .then(response => {
    //         console.log(response)
    //         setDoors(response.data.data)
    //     }).catch((err)=>{
    //         console.log(err);
    //       })
    // }, [])

//#endregion


type Inputs = {
    doorname: string
}

const Doors: React.FC = () => {
       const { data, refetch } = useQuery("Doors6", getDoors); //isLoading

        let inputChanged = false;


       //return <span>{getDoors.name}</span>
       /* if(isLoading){
            console.log("is Loading ...");
            <Loading />
        }*/


//         const rows = data?.sort((a, b) => a.ip> b.ip ? 1:-1).map((door, index) => (
//
//             <tr key={index}>
//               <td style={{border: '1px solid black'}}>{door.doorname}</td>
//               <td style={{border: '1px solid black'}}>{door.ip}</td>
//
//               <td style={{border: '1px solid black'}}><ColorPicker /></td>
//               <td>
//
//               </td>
//             </tr>
//         ))

        const { register,control, handleSubmit, formState: { errors } } = useForm<Inputs>({
            //key: string,
            //doors: {name: string, color: ColorPicker}
        });


        const StyledTableCell = withStyles((theme: Theme) =>
        createStyles({
            head: {
            backgroundColor: '#2e2e2e',
            //theme.palette.common.black,
            color: theme.palette.common.white,
            },
            body: {
            fontSize: 16,
            },
        }),
        )(TableCell);

        const StyledTableRow = withStyles((theme: Theme) =>
        createStyles({
            root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
            },
        }),
        )(TableRow);

        const useStyles = makeStyles({
            table: {
              width: '60%',

            },
        });
        const [editable, setEditable] = useState(false);

        const handleDoornameState = async () => {

            if (editable) {
                await setEditable(!editable);
                await refetch();
                console.log("refetch 2")
            }else{
                setEditable(!editable);
            }
        }


        function handleDoornameChange(uuid: string, doorname: string) {

            if (inputChanged){
                inputChanged = false;
                updateDoor(uuid, {doorname: doorname})().then(async () => {
                    if (!editable) {
                        console.log("refetch1")
                        await refetch();
                    }
                });
            }

        }


        //debugger;
        const classes = useStyles();


        let uuid;
        return (

            <div>
                <Link to='/management' style={{color: 'black', textDecoration: 'none'}}>
                    <Button variant='contained'
                     style={{ margin: '1%', backgroundColor: '#9bbda3',textAlign: 'center' }}
                      startIcon={
                         <ArrowBackIcon/>
                         }>
                    back
                    </Button>
                 </Link>
                <h1 style={{textAlign: 'center', marginBottom: '5%'}}>Doors</h1>
                <AddNewDoor refetch={refetch}/>

                <TableContainer style={{display: 'grid', placeItems: 'center'}}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                            <StyledTableCell></StyledTableCell>
                                <StyledTableCell align="left">Doorname
                                    <Button data-cy="editDoornamebtn" onClick={handleDoornameState}><EditIcon style={{
                                        backgroundColor: '#70A07C',
                                        color: 'white',
                                        borderRadius: '10%',
                                        marginLeft: '2%',
                                        marginTop: '2%'
                                    }}/></Button>
                                </StyledTableCell>
                                <StyledTableCell align="center">IP-Address</StyledTableCell>
                                <StyledTableCell align="center">Color</StyledTableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.map((row) => (

                                <StyledTableRow key={row.uuid}>
                                <StyledTableCell><DeleteDoor uuid={row.uuid} refetch={refetch}/></StyledTableCell>

                                    <StyledTableCell align="left">{editable ?<Controller
                                            name="doorname"
                                            control={control}
                                            render={() => (
                                                <TextField
                                                    defaultValue={row.doorname}
                                                    fullWidth
                                                    label="doorname"
                                                    variant='outlined'
                                                    onChange={ e => {inputChanged = true} }
                                                    onBlur={ e => handleDoornameChange(row.uuid, e.target.value) }
                                                />
                                            )}
                                            />: <p>{row.doorname}</p>}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{row.ip}</StyledTableCell>
                                    <StyledTableCell align="center">{editable ?<Controller
                                        name="doorname"
                                        control={control}
                                        render={() => (
                                            <ColorPicker uuid={row.uuid} color={row.color} refetch={refetch}/>
                                        )}
                                    />: <div id="colorDiv" style={{width: '41px', height: '19px', margin: '0 auto', borderRadius: '2px', backgroundColor: row.color}}/>}</StyledTableCell>
                                </StyledTableRow>
                            ))}

                        </TableBody>
                    </Table>

                </TableContainer>


            </div>
            //#region
            // <table>
            //     <thead>
            //         <tr>
            //             <th style={{border: '1px solid black'}}>Id</th>
            //             <th style={{border: '1px solid black'}}>Doorname</th>
            //             <th style={{border: '1px solid black'}}>IP-Address</th>
            //             <th style={{border: '1px solid black'}}>Color</th>
            //         </tr>
            //     </thead>
            //     <tbody>
            //         {rows}
            //     </tbody>
            // </table>


            /* {doors.map(door => (

                 <table style={{float:'left'}}>
                     <th>IP-Address</th>
                      <td>{door.IPAdress}</td>
                     <th>Doorname</th>
                     <td>{door.doorName}</td>
                      <tr></tr>
                 </table>
             )
           )
         } */
            //#endregion
        )
    }


export default Doors;

