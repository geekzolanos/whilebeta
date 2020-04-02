import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
    flexCenter: {
        display: 'flex',
        alignItems: 'center',
    },
    container: {
        padding: theme.spacing(5),
        maxWidth: theme.spacing(87.5),
        margin: 'auto'
    },
    player: {
        width: '100%',
        height: '45vh',
        position: 'relative',
        overflow: 'hidden',
        color: theme.palette.common.white,
        backgroundColor: theme.palette.common.black,
        
        '&:hover $controls': {
            bottom: 0,
            transition: theme.transitions.create('all', { 
                duration: theme.transitions.duration.shorter, 
                easing: theme.transitions.easing.easeOut
            })
        }
    },
    canvas: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)'
    },
    controls: {
        position: 'absolute',
        padding: theme.spacing(1.5, 3),
        bottom: -80,
        width: '100%',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, rgba(37, 37, 37, 0) 10%, rgba(37, 37, 37, 0.6) 80%)',
        transition: theme.transitions.create('all', { 
            duration: theme.transitions.duration.shorter, 
            easing: theme.transitions.easing.easeIn,  
            delay: '3s'
        }),

        '& svg': {            
            verticalAlign: 'middle'
        }
    },
    progress: {
        height: theme.spacing(1),
        width: '100%',
        marginBottom: theme.spacing(1),
        backgroundColor: 'rgba(60, 60, 60, 0.6)',
        borderRadius: 6,
        cursor: 'pointer',
        transition: theme.transitions.create('height', { 
            duration: theme.transitions.duration.shortest,
            easing: theme.transitions.easing.easeInOut
        }),
        '&:hover': {
            height: 10
        }
    },
    progressFilled: {
        backgroundColor: theme.palette.primary.main,
        width: '4%',
        height: '100%',
        borderRadius: theme.shape.borderRadius,
        transition: theme.transitions.create('all', { 
            duration: theme.transitions.duration.shortest
        })
    },
    controlsMain: {
        flex: 1
    },
    volumeBtn: {
        marginRight: 10,
        cursor: 'pointer',
        '& #volume-off, & #volume-high': {
            opacity: 0
        },
        '&.loud #volume-high': {            
            opacity: 1
        },
        '&.muted #volume-off': {            
            opacity: 1
        },
        '&.muted #volume-high, &.muted #volume-low': {
            opacity: 0
        }
    },
    volumeSlider: {
        height: 8,
        width: 80,
        cursor: 'pointer',
        backgroundColor: 'rgba(60, 60, 60, 0.6)',
        borderRadius: 6,
        position: 'relative'
    },
    volumeFilled: {
        backgroundColor: theme.palette.common.white,
        width: '100%',
        height: '100%',
        borderRadius: 6,
        transition: theme.transitions.create('width', { 
            duration: theme.transitions.duration.shorter,
            easing: theme.transitions.easing.easeInOut
        })
    },
    playBtn: {
        width: 24,
        height: 24,
        cursor: 'pointer',
        position: 'relative',
        marginRight: theme.spacing(2.4),
        transform: 'rotate(-90deg) scale(0.8)',
        transition: [
            theme.transitions.create('clip-path', { 
                duration: theme.transitions.duration.standard,
                easing: theme.transitions.easing.easeInOut,
                delay: theme.transitions.duration.shortest
            }),
            theme.transitions.create('transform', { 
                duration: '0.8s',
                easing: 'cubic-bezier(0.85, -0.25, 0.25, 1.425)'
            })
        ],
        '&.paused': {
            transform: 'rotate(0deg)'
        },
        '&:before, &:after': {
            content: '""',
            position: 'absolute',
            backgroundColor: theme.palette.common.white,
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            transition: 'inherit'
        },
        '&:before': {
            clipPath: 'polygon(0 10%, 100% 10%, 100% 40%, 0 40%)'
        },
        '&:after': {
            clipPath: 'polygon(0 60%, 100% 60%, 100% 90%, 0 90%)'
        },
        '&.paused:before': {
            clipPath: 'polygon(10% 0, 90% 51%, 90% 51%, 10% 51%)'
        },
        '&.paused:after': {
            clipPath: 'polygon(10% 49.5%, 80% 49.5%, 90% 49.5%, 10% 100%)'
        }
    },    
    '$volumeFilled:hover, $playBtn:hover::before, $playBtn:hover::after': {
        backgroundColor: theme.palette.primary.main
    },
    fullscreen: {        
        cursor: 'pointer'
    },
    time: {
        marginLeft: theme.spacing(2.4),
    }
}));