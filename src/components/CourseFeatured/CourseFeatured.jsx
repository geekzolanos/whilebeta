import React from 'react';
import { Typography, Paper, Grid, Chip } from '@material-ui/core';
import { WatchLater, MenuBook } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/components/CourseFeatured/CourseFeatured';

export default withStyles(styles)(({ classes, course, topics }) => (
    <Paper className={classes.root}>
        <Grid container spacing={4}>
            <Grid item>
                <img src={course.logo} alt="Logo" className={classes.logo} />
            </Grid>
            <Grid item sm container direction="column">
                <Grid item xs>
                    <Typography variant="h2" gutterBottom>{course.name}</Typography>
                    <Typography variant="body2" align="justify">{course.description}</Typography>
                </Grid>
                <Grid item className={classes.meta}>
                    <Chip variant="outlined" icon={<WatchLater />} label={`${course.duration} Hrs`} />
                    <Chip variant="outlined" icon={<MenuBook />} label={`${topics ? topics.length : '-'} Tema(s)`} />
                </Grid>
            </Grid>
        </Grid>
    </Paper>
));