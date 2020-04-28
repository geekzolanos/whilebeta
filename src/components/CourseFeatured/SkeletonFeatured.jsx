import React from 'react';
import { Paper, Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { withStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/components/CourseFeatured/SkeletonFeatured';

export default withStyles(styles)(({classes}) => (
    <Paper className={classes.root}>
        <Grid container spacing={4}>
            <Grid item>
                <Skeleton width={148} height={120} variant="rect" />
            </Grid>
            <Grid item sm container direction="column">
                <Grid item xs>                        
                    <Skeleton width={300} height={50} className={classes.heading}/>                        
                    <Skeleton height={20} />
                    <Skeleton height={20} />
                    <Skeleton width={120} height={20} />
                </Grid>
                <Grid item className={classes.meta}>
                    <Skeleton width={100} height={40} />
                    <Skeleton width={100} height={40} />
                </Grid>
            </Grid>
        </Grid>
    </Paper>
));