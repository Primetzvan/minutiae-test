import React from 'react'
import { useQuery} from 'react-query';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import NewUser from "../components/NewUser"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DeleteUser from '../components/DeleteUser';
import { Link } from 'react-router-dom';
import SearchBar from 'material-ui-search-bar';
import { getUsers, User, Door } from '../shared/API';
import Loading from '../components/Loading';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useState } from 'react';


function filterUsersByUsername(users: User[] | undefined, usernameSearchQuery: string){

    if(!users){
        return [];
    }

    const filteredUsers = users.filter(user => user.username.match(usernameSearchQuery.trim()));
    return filteredUsers;
}

    //const [doors, setDoors] = useState<Door[]>([]);
const StyledTableCell = withStyles((theme: Theme) =>
        createStyles({
            head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
            },
            body: {
            fontSize: 14,
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
              width: '80%',
             
            
            },
            searchBar: {
                width: '80%',
                marginBottom: '1%',

            }
          });

    
    
    export const Users: React.FC = () => {
        const { data, isLoading } = useQuery(getUsers.name, getUsers); 
        const [usernameSearchQuery, setUsernameSeachQuery] = useState("");
        const classes = useStyles();
        
 
        if(isLoading){
            console.log("is Loading ...");
            <Loading />
        }

        const onSearchbarChange = (query: string) => {
            setUsernameSeachQuery(query);
        }

         const filteredUsersByUsername = filterUsersByUsername(data, usernameSearchQuery)

        //debugger;
        
             return (

                <div>
                <Link to='/management' style={{color:'black', textDecoration:'none'}}><Button data-cy="backFromUsers" variant='contained' style={{margin:'1%',backgroundColor:'#9bbda3', textAlign:'center'}} startIcon={<ArrowBackIcon />}>back</Button></Link>
                <h1 style={{textAlign:'center'}}>Users</h1>
                <TableContainer style={{display: 'grid', placeItems: 'center'}}>
                <SearchBar className={classes.searchBar} onChange={onSearchbarChange} />
               {/* <TextField label="Search" variant="filled" className={classes.searchBar}></TextField> */}

                    <Table className={classes.table} stickyHeader aria-label="sticky table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell align="center" >Username</StyledTableCell>
                            <StyledTableCell align="center" >Role</StyledTableCell>
                            <StyledTableCell align="center">Fingerprint</StyledTableCell>
                            <StyledTableCell align="left" >Access</StyledTableCell>
                            <StyledTableCell align="right" ><NewUser /></StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {filteredUsersByUsername.sort((a, b) => a.username> b.username ? 1:-1).map((row) => (
                            <StyledTableRow key={row.uuid}>
                                {/*hidden={row.uuid == }*/}
                                <StyledTableCell><Button data-cy="deleteUser" ><DeleteUser uuid={row.uuid}/></Button></StyledTableCell>
                                <StyledTableCell align="center">{row.username}</StyledTableCell>
                                <StyledTableCell align="center">{row.role}</StyledTableCell>
                                <StyledTableCell align="center">{row.finger === null ? <FingerprintIcon style={{color: 'red'}}/> : <FingerprintIcon style={{color: 'green'}}/>}</StyledTableCell>
                                <StyledTableCell align="left" style={{marginLeft: '20%'}}>
                                    {row.accesses?.map((door: Door) =>(
                                        <Chip label={door.doorname} style={{margin:'0.5%', backgroundColor: door.color}}/>
                                    ))}
                                </StyledTableCell> 
                                <StyledTableCell align="right"><Link to={`/userdetail/${row.uuid}`} ><Button data-cy="userDetail"><ArrowForwardIosIcon /></Button></Link> </StyledTableCell>
                            </StyledTableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                </div>
            )
    }



