import React from 'react';
import { Button, TextField, Box, CircularProgress } from '@material-ui/core';
import Copyright from '../Copyright';

export default ({className, busy, onSubmit}) => (    
  <form className={className} onSubmit={onSubmit}>
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id="cedula"
      label="Cedula"
      name="cedula"
      type="number"
      autoComplete="username"
      autoFocus
    />
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      name="password"
      label="Contraseña"
      type="password"
      autoComplete="current-password"
    />

    { busy && <CircularProgress /> }
    
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary">
      Entrar
    </Button>
    <Box mt={5}>
      <Copyright />
    </Box>
  </form>
);