import React from 'react';
import { Typography, Paper, Grid, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { WatchLater, MenuBook } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    meta: {
        textAlign: 'right',
        '& .MuiChip-root:first-child': {
            marginRight: theme.spacing(1)
        }
    },
    root: {
        padding: theme.spacing(4,2)
    },
    logo: {
        width: '196px'
    },
    bgDark: {            
        color: 'white',
        '& MuiChip-icon': {
            color: 'white',
        }
    }
}));

function CourseFeatured({course, topics}) {
    const classes = useStyles();
    const topicsLength = topics.length;

    return (
        <Paper className={classes.root}>
            <Grid container spacing={4}>
                <Grid item>
                    <img src={course.logo} alt="Logo" className={classes.logo} />
                </Grid>
                <Grid item sm container direction="column">
                    <Grid item xs>
                        <Typography variant="h2" gutterBottom>{course.name}</Typography>
                        <Typography variant="subtitle1" align="justify">{course.description}</Typography>
                    </Grid>
                    <Grid item className={classes.meta}>
                        <Chip variant="outlined" icon={<WatchLater />} label={`${course.duration} Hrs`} />
                        <Chip variant="outlined" icon={<MenuBook />} label={`${topicsLength} Tema(s)`} />                        
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default CourseFeatured;