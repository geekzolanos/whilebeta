import React, { useState, useMemo } from 'react';
import { IconButton, Menu, MenuItem, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core';
import { AccountCircle, AccountBox } from '@material-ui/icons';
import { useUser } from 'reactfire';

export default ({onLogout}) => {
  const user = useUser();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = e => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const lastSign = useMemo(() => user && new Date(user.metadata.lastSignInTime).toLocaleDateString(), [user]);
  
  const handleLogout = async () => {
    await onLogout();
    handleClose();
  }

  return (
    <>
      <IconButton color="inherit"
        onClick={handleClick}
        style={{marginLeft: 16}}>

        <AccountCircle></AccountCircle>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}>

        <MenuItem disabled={true} style={{opacity: 1}}>
          <ListItemAvatar>
            <Avatar>
              <AccountBox />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Bienvenido(a)" secondary={`Ultimo ingreso: ${lastSign}`} />
        </MenuItem>

        <MenuItem onClick={handleLogout}>Cerrar Sesion</MenuItem>
      </Menu>
    </>
  )
}