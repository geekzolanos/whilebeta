export default theme => ({
    root: {
        backgroundColor: props => props.value.background,
        height: '100%'
    },
    button: {
        padding: theme.spacing(3),
        textAlign: 'initial',
        width: '100%',
        height: '100%'
    },
    content: {
        position: 'relative',
        width: '100%',
        minHeight: '100%'
    },
    logo: {
        width: "64px",
        height: "64px",
        marginBottom: theme.spacing(1)
    },
    duration:{
        position: 'absolute',
        top: 0,
        right: 0
    },
    bgDark: {            
        color: 'white',
        '& MuiChip-icon': {
            color: 'white',
        }
    }
});