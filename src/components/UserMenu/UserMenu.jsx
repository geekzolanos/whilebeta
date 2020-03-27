import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AccountCircle } from '@material-ui/icons';
import { useUser } from 'reactfire';

const useStyles = makeStyles(theme => ({
    userButton: {
        marginLeft: theme.spacing(2) + 'px'
    }
}));

function UserMenu(props) {
  const classes = useStyles();
  const user = useUser();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = e => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  
  const handleLogout = async () => {
    await props.onLogout();
    handleClose();
  }

  return (
    <>
      <IconButton className={classes.userButton} color="inherit" onClick={handleClick}>
        <AccountCircle></AccountCircle>        
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}>
        <MenuItem onClick={handleLogout}>Cerrar Sesion</MenuItem>
      </Menu>
    </>
  )
}

export default UserMenu;