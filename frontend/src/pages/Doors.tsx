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
import { getDoors } from '../shared/API';
import AddNewDoor from '../components/AddNewDoor';
import Loading from '../components/Loading';



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

    
    const Doors: React.FC = () => {
       const { data, isLoading } = useQuery(getDoors.name, getDoors); //isLoading
 

       //return <span>{getDoors.name}</span>
        if(isLoading){
            console.log("is Loading ...");
            <Loading />
        }

        
        const rows = data?.sort((a, b) => a.ip> b.ip ? 1:-1).map((door, index) => (
            
            <tr key={index}>
              <td style={{border: '1px solid black'}}>{door.doorname}</td>
              <td style={{border: '1px solid black'}}>{door.ip}</td>
              
              <td style={{border: '1px solid black'}}><ColorPicker /></td>
              <td>
              
              </td>
            </tr>
        ))

        

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

          const handleDoornameState = () => {
            setEditable(!editable);
        } 

        const saveDoors = () => {
            //post
            alert("saved");
            setEditable(false);
        } 
        
        //debugger;
        const classes = useStyles();


             return (
        
                <div>
                <Link to='/management' style={{color:'black', textDecoration:'none'}}><Button data-cy="backFromDoors" variant='contained' style={{margin:'1%',backgroundColor:'#9bbda3', textAlign:'center'}} startIcon={<ArrowBackIcon />}>back</Button></Link>
                    <h1 style={{textAlign:'center', marginBottom:'5%'}}>Doors</h1>
                    <AddNewDoor />

                <TableContainer style={{display: 'grid', placeItems: 'center'}}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell align="left">Doorname 
                                <Button data-cy="editDoornamebtn" onClick={handleDoornameState}><EditIcon style={{backgroundColor:'#70A07C', color:'white', borderRadius:'10%', marginLeft:'2%', marginTop:'2%'}}/></Button>
                            </StyledTableCell>
                            <StyledTableCell align="center">IP-Address</StyledTableCell>
                            <StyledTableCell align="center">Color</StyledTableCell>

                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {data?.map((row) => (
                            <StyledTableRow key={row.uuid}>
                            <StyledTableCell align="left">{editable ? <TextField value={row.doorname}  />: row.doorname }</StyledTableCell>
                            <StyledTableCell align="center">{row.ip}</StyledTableCell>
                            <StyledTableCell align="center" ><ColorPicker /></StyledTableCell>
                            </StyledTableRow>
                        ))}

                        </TableBody>
                    </Table>

                </TableContainer>
              <Button variant="outlined" disabled={!editable} data-cy="saveDoorbtn" style={{float:'right',marginTop:'1%', marginRight:'20%', marginBottom:'5%'}} onClick={saveDoors}>Save</Button>

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

