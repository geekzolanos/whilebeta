import React from 'react';
import { Box, Container, Typography, Button, Grid, Paper, Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { PlayArrow, Accessibility, TrackChanges, LinkedIn } from '@material-ui/icons';
import { ReactComponent as Logo } from '../assets/img/team.svg';
import { withStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/views/Home';

export default withStyles(styles)(({classes}) => (
    <>
        {/* Featured */}
        <Box className={classes.featured}>
            <Container className={classes.featuredContainer} maxWidth="md">
                <Grid container alignItems="center">
                    <Grid item xs={12} md={8}>
                        <Typography variant="h1" className={classes.title}>Conecte con sus profesores en linea</Typography>
                        <Link component={RouterLink} to='/login' underline="none"><Button className={classes.btnLogin} variant="contained">Ingrese Ahora</Button></Link>
                        <Button className={classes.btnVideo} startIcon={<PlayArrow />}>Ver Video</Button>
                    </Grid>
                    <Grid item xs={12} md={4} className={classes.featuredImg}>
                        <Logo />
                    </Grid>
                </Grid>
            </Container>
            
            <svg className={classes.lineBorder} viewBox="0 0 1440 320"><path d="M0,235L1440,288L1440,320L0,320Z"></path></svg>
        </Box>

        
        {/* features */}
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
    </>
));