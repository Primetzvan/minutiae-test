import React from 'react';
import Button from '@material-ui/core/Button';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Checkbox } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import {
  getDoors,
  getUserDetail,
  NewUserFormRouteProps,
  overrideAccesses,
} from '../shared/API';
import { useQuery } from 'react-query';
import AddIcon from '@material-ui/icons/Add';
import Loading from './Loading';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const { data } = useQuery("Doors", getDoors); //isLoading
  const params = useParams<NewUserFormRouteProps>();
  const { data: userData, refetch } = useQuery("UserDetail5", getUserDetail(params.uuid)); //isLoading

 /* if(isLoading){
    console.log("is Loading ...");
    <Loading />
  }*/


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    setOpen(false);
    await refetch()
  };

  let array = data;
  let checkedArray = [];



  if (array === undefined) {
    array = [];
  }


  return (
    <div>
      <Button variant="contained" color="inherit" onClick={handleClickOpen} data-cy="addDoorbtn" style={{float:'right'}}>
        <AddIcon />
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Door access</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select the doors please:
          </DialogContentText>
          <Autocomplete
            multiple
            options = {array}
            defaultValue={array.filter(door => {
              if (userData !== undefined){
                return userData!.accesses.find(d => d.door.uuid === door.uuid);
              }
              return [];
            }) }
            disableCloseOnSelect
            getOptionLabel={(option) => option.doorname}
            renderOption={(option, { selected }) => (
              <React.Fragment>
              <Checkbox
               icon={icon}
               checkedIcon={checkedIcon}
               style={{ marginRight: 8 }}
               //defaultChecked={(userData!.accesses.find(a => a.door.uuid === option.uuid))!==undefined}
               checked={selected}
              />
            {option.doorname}
            </React.Fragment>
            )}
            style={{ width: 500 }}
            onChange={async (event, value) => {
              checkedArray = value
              console.log(checkedArray)

              let data = await overrideAccesses(params.uuid, checkedArray.map(door => door.uuid))();
            }}
            renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
            <TextField {...params} variant="outlined" label="Doors" fullWidth />
        )}
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit" data-cy="addDoorCancel">
            Finish
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

};
