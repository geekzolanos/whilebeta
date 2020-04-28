export default theme => ({
    meta: {
        marginTop: theme.spacing(2),
        textAlign: 'right',
        '& .MuiChip-root:first-child': {
            marginRight: theme.spacing(1)
        }
    },
    root: {
        padding: theme.spacing(4, 2)
    },
    logo: {
        width: '148px'
    },
    bgDark: {
        color: 'white',
        '& MuiChip-icon': {
            color: 'white',
        }
    }
});