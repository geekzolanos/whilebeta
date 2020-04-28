export default theme => ({
    meta: {
        textAlign: 'right',
        marginTop: theme.spacing(2),

        '& .MuiSkeleton-text': {
            display: 'inline-block',

            '&:first-child': {
                marginRight: theme.spacing(1)
            }
        }
    },
    root: {
        padding: theme.spacing(4,2)
    },
    heading: {
        marginTop: theme.spacing(-1.5)
    }
});