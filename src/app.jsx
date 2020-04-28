import React, {Suspense} from 'react';
import { AppRouter } from './components/Routers';
import firebaseConfig from './config/firebaseConfig';
import { Container, CircularProgress, CssBaseline } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { FirebaseAppProvider } from 'reactfire';

const ContainerLoader = withStyles({
  root: {
    display: 'flex',
    width: '100%',
    height: '95vh',
    alignItems: 'center',
    justifyContent: 'center',
  }
})(Container);

const fallback = (
  <ContainerLoader>
    <CircularProgress />
  </ContainerLoader>
);

export default () => (
  <>
    <CssBaseline />
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Suspense fallback={fallback}>
        <AppRouter /> 
      </Suspense>
    </FirebaseAppProvider>
  </>
);