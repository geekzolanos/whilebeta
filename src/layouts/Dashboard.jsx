import React, { useState } from 'react';
import { Toolbar, AppBar, Typography, Button } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { DashboardRouter } from '../components/Routers';
import UserMenu from '../components/UserMenu';
import Copyright from '../components/Copyright';
import theme from '../config/theme.js';
import { useAuth, AuthCheck } from 'reactfire';
import { Link } from 'react-router-dom';
import styles from 'assets/jss/layouts/Dashboard';
import { withStyles } from '@material-ui/core/styles';

export default withStyles(styles)(({classes}) => {
  const auth = useAuth();
  
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);
  
  const handleLogout = async() => {
    setBusy(true);
    auth.signOut()
      .catch(setErr)
      .finally(() => setBusy(false));
  }

  const btnLogin = (
    <Button color="inherit">
      <Link to="/login" className={classes.link}>Iniciar Sesion</Link>
    </Button>
  );

  const topbar = (
    <AppBar className={classes.topbar} elevation={1} position="static">
      <Toolbar variant="dense">
        <Typography variant="h6" className={classes.title}>
          <Link to="/" className={classes.link}>Formacite</Link>
        </Typography>
        
        
        <AuthCheck fallback={btnLogin}>          
          <Button color="inherit">
            <Link to="/courses" className={classes.link}>Mis Cursos</Link>
          </Button>
          <UserMenu onLogout={handleLogout} />
        </AuthCheck>
        
      </Toolbar>
    </AppBar>
  );

  return (
    <ThemeProvider theme={theme}>
      <>
        {topbar}
        <DashboardRouter />
        <Copyright className={classes.copyright}/>
      </>
    </ThemeProvider>
  );
});