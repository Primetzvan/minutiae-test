import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import { useForm, SubmitHandler } from "react-hook-form";
import {addDoor, overrideAccesses} from "../shared/API";
import doors from "../pages/Doors";
import {QueryFunction} from "react-query";


type Inputs = {
    doorname: string,
    ip: string,
};


export default function FormDialog(props: {refetch: Function}) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        addDoor(data.doorname, data.ip).then((val) => {
            if (val===false){
                alert("sollte unique sein")
            }else {
                handleClose()
            }
        });
    }
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = async () => {
        setOpen(false);
        reset();
        await props.refetch();
    };


    return (
        <div>

            <Button variant="contained" style={{float:'right', marginRight:'20%', marginBottom:'1%'}} color="inherit" onClick={handleClickOpen} data-cy="addNewDoorbtn">
                <AddIcon />
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle id="form-dialog-title">Add new Door</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter a unique doorname please:
                            <TextField
                                {...register("doorname", { required: true })}
                                margin="dense"
                                label="Doorname"
                                variant="filled"
                                fullWidth

                            />
                            {errors.doorname  && <span style={{color:'red'}}>Please enter a unique doorname! <br></br></span>}
                        </DialogContentText>

                        <DialogContentText>
                            Enter a valid IP-address please:
                        </DialogContentText>
                        <TextField {...register("ip", { required: true })}
                                   margin="dense"
                                   label="IP-Address"
                                   variant="filled"
                                   fullWidth

                        />
                        <br></br>{errors.ip  && <span style={{color:'red'}}>Please enter a valid IP-Address! <br></br></span>}

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="inherit" data-cy="addNewDoorCancel">
                            Cancel
                        </Button>

                        <Button type="submit" variant='contained'>Download</Button>
                        {/* <a href="" download>Download</a> */}
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}
