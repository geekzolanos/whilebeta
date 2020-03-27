import React from 'react';
import { Box, Container, Typography, Button, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { PlayArrow } from '@material-ui/icons';
import { ReactComponent as Logo } from '../assets/img/team.svg';

const useStyles = makeStyles(theme => ({
    title: {
        marginBottom: theme.spacing(3)
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
        marginTop: theme.spacing(-24),
        padding: theme.spacing(4,8),
        borderRadius: '10px',
        height: '320px'
    },
    featuresGrid: {
        height: '100%'
    }
}));

function Home() {
    const classes = useStyles();

    const featured = (
        <Box className={classes.featured}>
            <Container className={classes.featuredContainer} maxWidth="md">
                <Grid container alignItems="center">
                    <Grid item xs={8}>
                        <Typography variant="h1" className={classes.title}>Titulo 1</Typography>
                        <Button className={classes.btnLogin} variant="contained">Ingresar</Button>
                        <Button className={classes.btnVideo} startIcon={<PlayArrow />}>Ver Video</Button>
                    </Grid>
                    <Grid item xs={4} className={classes.featuredImg}>
                        <Logo />
                    </Grid>
                </Grid>
            </Container>

            <svg className={classes.lineBorder} viewBox="0 0 1440 320"><path d="M0,235L1440,288L1440,320L0,320Z"></path></svg>
        </Box>
    );

    const features = (
        <Container maxWidth="md" className={classes.features}>
            <Paper className={classes.featuresPaper} elevation={2}>
                <Grid container justify="center" alignItems="center" spacing={4} className={classes.featuresGrid}>
                    <Grid item xs>
                        <Typography variant="h5">Titulo 1</Typography>
                        <Typography variant="caption">Descripcion</Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h5">Titulo 1</Typography>
                        <Typography variant="caption">Descripcion</Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h5">Titulo 1</Typography>
                        <Typography variant="caption">Descripcion</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );

    return [featured, features];
}

export default Home;