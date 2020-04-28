export default theme => ({
    avatar: {
        marginBottom: theme.spacing(2)
    },
    root: {
        padding: theme.spacing(2.8),
        
        '& .MuiSkeleton-root': {
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    },
    degree: {
        marginBottom: theme.spacing(1)
    }
});