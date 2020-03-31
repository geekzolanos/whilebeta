import React, { useState, useEffect } from 'react';
import { Avatar, Paper, Grid, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { LockOutlined } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import LoginForm from './LoginForm';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  mAuto: {
    margin: 'auto'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    
    '& button': {
        margin: theme.spacing(3, 0, 2),
    },

    '& #cedula': {
      '-moz-appearance': 'textfield',
      'appearance': 'none', 
      margin: 0,
      
      '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': { 
        '-webkit-appearance': 'none',
        margin: 0
      }
    }
  }
}));

function LoginComponent({err, ...props}) {
  const classes = useStyles();  
  const [errOpen, setErrOpen] = useState(false);

  // Error Handling
  useEffect(() => {err && setErrOpen(true)}, [err]);
  const handleErrClose = () => setErrOpen(false);

  return (
    <>
      <Grid container component="main" className={classes.root}>
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
              Ingreso al sistema
            </Typography>
            <LoginForm className={classes.form} onSubmit={props.handleSubmit} busy={props.busy} />
          </div>
        </Grid>
      </Grid>
      <Snackbar open={errOpen} autoHideDuration={5000} onClose={handleErrClose}>
          <MuiAlert severity="error" elevation={6} variant="filled" onClose={handleErrClose}>
            Usuario o Contraseña incorrectos. Por favor, intente nuevamente.
          </MuiAlert>
      </Snackbar>
    </>
  );
}

export default LoginComponent;