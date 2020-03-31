import React from 'react';
import { Box, Container, Typography, Button, Grid, Paper, Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { PlayArrow, Accessibility, TrackChanges, LinkedIn } from '@material-ui/icons';
import { ReactComponent as Logo } from '../assets/img/team.svg';

const useStyles = makeStyles(theme => ({
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
        height: '320px'
    }
}));

function Home() {
    const classes = useStyles();

    const featured = (
        <Box className={classes.featured}>
            <Container className={classes.featuredContainer} maxWidth="md">
                <Grid container alignItems="center">
                    <Grid item xs={8}>
                        <Typography variant="h1" className={classes.title}>Conecte con sus profesores en Linea</Typography>
                        <Button className={classes.btnLogin} variant="contained">Ingrese Ahora</Button>
                        <Button className={classes.btnVideo} startIcon={<PlayArrow />}>Ver Video</Button>
                    </Grid>
                    <Grid item xs={4} className={classes.featuredImg}>
                        <Logo />
                    </Grid>
                </Grid>
            </Container>
            
            <Fade timeout={800}>
                <svg className={classes.lineBorder} viewBox="0 0 1440 320"><path d="M0,235L1440,288L1440,320L0,320Z"></path></svg>
            </Fade>
        </Box>
    );

    const features = (
        <Container maxWidth="md" className={classes.features}>
            <Paper className={classes.featuresPaper} elevation={2}>
                <Grid container justify="center" spacing={4}>
                    <Grid item xs>
                        <Accessibility style={{fontSize: '3em'}}/>
                        <Typography variant="h5" className={classes.featuresTitle}>Sencillo</Typography>
                        <Typography variant="caption" align="justify">Una plataforma diseñada para su facil compresión, de respuesta rapida y de crecimiento progresivo.</Typography>
                    </Grid>
                    <Grid item xs>
                        <TrackChanges style={{fontSize: '3em'}}/>
                        <Typography variant="h5" className={classes.featuresTitle}>Dinamico</Typography>
                        <Typography variant="caption" align="justify">Adaptable a diferentes formatos de pantalla, tolerante a fallos y de soporte activo.</Typography>
                    </Grid>
                    <Grid item xs>
                        <LinkedIn style={{fontSize: '3em'}}/>
                        <Typography variant="h5" className={classes.featuresTitle}>Conecte</Typography>
                        <Typography variant="caption" align="justify">Tenga acceso a un canal de comunicacion de alta disponibilidad con sus profesores, y conecte con ellos a traves de la red profesional LinkedIn.</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );

    return [featured, features];
}

export default Home;