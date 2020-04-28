export default theme => ({
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    cedula: {
      '& input': {
        '-moz-appearance': 'textfield',
        'appearance': 'none', 
        margin: 0,
        
        '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': { 
          '-webkit-appearance': 'none',
          margin: 0
        }
      }
    }
});