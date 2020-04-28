export default theme => ({
    title: {
        marginBottom: theme.spacing(3)
    },
    featuresTitle: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1)
    },
    featured: {
        position: 'relative',
        backgroundImage: 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
        color: 'white'
    },
    featuredContainer: {
        position: 'relative',
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(32),
        zIndex: 10
    },
    btnLogin: {
        backgroundColor: 'white',
        color: 'black',
        fontSize: '1.2em',
        letterSpacing: '1px',
        padding: theme.spacing(1, 6),
        marginRight: theme.spacing(3),
    },
    btnVideo: {
        color: 'inherit'
    },
    lineBorder: {
        position: 'absolute',
        bottom: 0,
        fill: '#fafafa'
    },
    featuredImg: {
        textAlign: 'right',

        '& svg': {
            fill: 'white',
            height: '256px'
        }
    },
    features: {
        position: 'relative',
        zIndex: 10
    },
    featuresPaper: {
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.spacing(-24),
        padding: theme.spacing(4,8),
        borderRadius: '10px',

        [theme.breakpoints.up('md')]: {
            height: '320px'
        }
    }
});