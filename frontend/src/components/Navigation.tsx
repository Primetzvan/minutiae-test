import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getAdminProfile, getUsers } from '../shared/API';
import logo from '../pages/Minutiae2Logo.png';
import { Button } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export default function MenuAppBar() {
  const classes = useStyles();
 // const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { data, isLoading } = useQuery(getAdminProfile.name, getAdminProfile); 

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setAuth(event.target.checked);
  // };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    
  };

  if(data == null){
    //window.location.href='/'
  }

  return (
    <div className={classes.root}>
      {/* <FormGroup>
        <FormControlLabel
          control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup> */}
      <AppBar position="static">
        <Toolbar style={{backgroundColor:'#70A07C'}}>
            <div style={{ borderRadius:'6px', marginRight:'1%'}}>
              <img src={logo} alt="Logo" width="35" style={{backgroundColor:'white',paddingRight:'1%', borderRadius:'3px'}}/>
            </div>
          <Typography variant="h6" className={classes.title}>
            Minutiae
          </Typography>
         {/* {auth &&  */}
     
            <div hidden={data == null}>
              <IconButton data-cy="nav"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle display={data?.uuid}></AccountCircle>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose} data-cy="profile" ><Link to={`/profile/${data?.uuid}`} onClick={()=> window.location.href='/profile'} style={{color:'black', textDecoration:'none'}}>Profile</Link></MenuItem>
                <MenuItem onClick={handleClose} data-cy="logs" ><Link to='/logs' onClick={()=> {window.location.href='/logs'}} style={{color:'black', textDecoration:'none'}}>Logs</Link></MenuItem>
                <MenuItem onClick={handleClose} data-cy="logout" ><Link to='/' onClick={()=> {logout(); window.location.href='/'}} style={{color:'black', textDecoration:'none'}}>Log out</Link></MenuItem>
              </Menu>
            </div>
       
          {/* } */}
        </Toolbar>
      </AppBar>
    </div>
  );
}
