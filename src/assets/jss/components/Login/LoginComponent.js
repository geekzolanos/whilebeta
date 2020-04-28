export default theme => ({
    container: {
      backgroundImage: 'url(https://source.unsplash.com/featured/?nature)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },  
    grid: {    
      height: '100vh'
    },
    paper: {
      padding: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '72%',
  
      [theme.breakpoints.up('md')]: {
        'flexGrow': 0,
        'maxWidth': '34%',
        'flexBasis': '34%'
      }
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    mAuto: {
      margin: 'auto'
    }  
});