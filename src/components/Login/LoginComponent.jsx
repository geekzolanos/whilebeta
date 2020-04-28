import React, { useState, useEffect } from 'react';
import { Container, Avatar, Paper, Grid, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { LockOutlined } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import LoginForm from './LoginForm';
import styles from 'assets/jss/components/Login/LoginComponent';
import formStyle from 'assets/jss/components/Login/LoginForm';

const LoginFormStyled = withStyles(formStyle)(LoginForm);

export default withStyles(styles)(({classes, handleSubmit, err, busy}) => {
  const [errOpen, setErrOpen] = useState(false);

  // Error Handling
  useEffect(() => {err && setErrOpen(true)}, [err]);
  const handleErrClose = () => setErrOpen(false);

  return (
    <Container className={classes.container}>
      <Grid container className={classes.grid} alignItems="center" justify="flex-end">
        <Grid item xs={12} component={Paper} className={classes.paper} elevation={6}>
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Ingreso al sistema
          </Typography>
          <LoginFormStyled onSubmit={handleSubmit} busy={busy} />
        </Grid>
      </Grid>
      <Snackbar open={errOpen} autoHideDuration={5000} onClose={handleErrClose}>
          <MuiAlert severity="error" elevation={6} variant="filled" onClose={handleErrClose}>
            Usuario o Contraseña incorrectos. Por favor, intente nuevamente.
          </MuiAlert>
      </Snackbar>
    </Container>
  );
});