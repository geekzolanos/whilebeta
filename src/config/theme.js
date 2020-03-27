import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  typography: {
    button: {
      textTransform: 'none'
    },
    h1: {
      fontSize: '3.8em',
      fontWeight: 600
    },
    h2: {
      fontWeight: 600,
      fontSize: '2em'
    },
    shape: {
      borderRadius: 8
    }
  }
});