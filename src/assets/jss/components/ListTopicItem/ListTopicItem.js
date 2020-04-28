export default theme => ({
    chipArray: {
        marginBottom: theme.spacing(2),        
        '& .MuiChip-root': {
            marginRight: theme.spacing(1)
        }
    },
    colorSuccess: {
        backgroundColor: theme.palette.success.dark
    },
    root: {
        padding: theme.spacing(4,2)
    },
    thumb: {
        width: '128px'
    },
    goIcon: {
        height: '100%',
        fontSize: '2.4em'
    }
});