import React, {Suspense} from 'react';
import { AppRouter } from './components/Routers';
import firebaseConfig from './config/firebaseConfig';
import { Container, CircularProgress, CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FirebaseAppProvider } from 'reactfire';

const useStyles = makeStyles(theme => ({
  loader: {
    display: 'flex',
    width: '100%',
    height: '95vh',
    alignItems: 'center',
    justifyContent: 'center',
  }
}));

function App() {
  const classes = useStyles();

  const loader = (
    <Container className={classes.loader}>
      <CircularProgress />
    </Container>
  );

  return (
    <>
      <CssBaseline />
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <Suspense fallback={loader}>
          <AppRouter /> 
        </Suspense>
      </FirebaseAppProvider>
    </>
  )  
}

export default App;