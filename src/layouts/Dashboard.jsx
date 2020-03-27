import React, { useState } from 'react';
import { Toolbar, AppBar, Typography, Button } from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { DashboardRouter } from '../components/Routers';
import UserMenu from '../components/UserMenu';
import Copyright from '../components/Copyright';
import theme from '../config/theme.js';
import { useAuth, AuthCheck } from 'reactfire';
import { Link } from 'react-router-dom';

const useStyle = makeStyles(theme => ({
  topbar: {
    backgroundColor: 'white',
    color: '#333'
  },
  title: {
    flexGrow: 1
  },  
  link: {
    color: 'inherit',
    textDecoration: 'none'
  },  
  copyright: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(2)
  }
}));

function Dashboard() {
  const classes = useStyle();
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
        <Typography variant="h6" className={classes.title}>IncesInfo</Typography>
        
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
}

export default Dashboard;