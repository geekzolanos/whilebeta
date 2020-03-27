import React from 'react';
import { Button, TextField, Box } from '@material-ui/core';
import Copyright from '../Copyright';

export default ({className, onSubmit}) => (    
  <form className={className} onSubmit={onSubmit}>
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
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