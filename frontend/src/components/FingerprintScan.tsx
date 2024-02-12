import TouchAppIcon from '@material-ui/icons/TouchApp';
import Loading from "./FingerLoading";
import {addFinger, getCreateFingerStatus, getUserDetail, NewUserFormRouteProps, overrideAccesses} from "../shared/API";
import {useHistory, useParams} from "react-router-dom";
import {useQuery} from "react-query";
import { Button } from '@material-ui/core';

function FingerPrintScan(){

    const params = useParams<NewUserFormRouteProps>();
    const { data: sessionId, isLoading } = useQuery("addFinger.name", addFinger(params.uuid));
    const history = useHistory();

    let interval = setInterval(async () => {
        let status = await getCreateFingerStatus(sessionId!)().then(value => {
            console.log("sessionId " + sessionId + " status: " + value.status)

            if(value.status==="expired" || value.status==="ok"){
                clearInterval(interval);
                window.location.href=`/userdetail/${params.uuid}`;
            }
        });
        console.log(status)
    }, 10000);  //TODO: value zu konstante machen bzw env variable aber eher konstanze


    function cancelScan(){
        const response = fetch(`${process.env.REACT_APP_API_URL}/fingers/stop/${sessionId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Origin": "http://localhost:3000",

            },
            credentials: "include",
          });

          history.goBack();

    }

    return(

        <div style={{textAlign:'center', marginTop: '5%'}}>
            <h1>Please put your finger on the scanner</h1>
            <TouchAppIcon style={{fontSize:'2000%'}}/>
            <Loading />

            <Button onClick={cancelScan}>Cancel</Button>
        </div>
    )

}


export default FingerPrintScan;
