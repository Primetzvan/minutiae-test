import { Card } from '@material-ui/core';
import React from 'react';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import { Link } from 'react-router-dom';



export default function Management(){
    

    return(

            <div style={{width:'100%', alignContent:'center'}}>
                <h1 style={{textAlign:'center', marginBottom:'10%'}}>Management</h1>
                <Link to='/doors'>
                    <Card data-cy="linkToDoors" style={{width:'35%',marginLeft:'3%',float:'left', display:'inline-block', textAlign:'center', padding:'5%'}}>
                        <MeetingRoomIcon style={{color:'black',fontSize:'100'}}/>
                    </Card>
                </Link>

                <Link to='/users'>
                    <Card data-cy="linkToUsers" style={{width:'35%',marginLeft:'3%',float:'left', display:'inline-block', textAlign:'center', padding:'5%'}}>
                        <PeopleAltIcon style={{color:'black', fontSize:'100'}}/>
                    </Card>
                </Link>

            </div>
    )
}
