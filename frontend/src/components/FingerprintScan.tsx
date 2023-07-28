import TouchAppIcon from '@material-ui/icons/TouchApp';
import Loading from "./FingerLoading";

function FingerPrintScan(){


    return(

        <div style={{textAlign:'center', marginTop: '5%'}}>
            <h1>Please put your finger on the scanner</h1>
            <TouchAppIcon style={{fontSize:'2000%'}}/>
            <Loading />
        </div>
    )

}


export default FingerPrintScan;