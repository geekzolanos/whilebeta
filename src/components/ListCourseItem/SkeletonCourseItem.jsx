import React from 'react';
import { Box, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import styles from 'assets/jss/components/ListCourseItem/SkeletonCourseItem';

export default withStyles(styles)(({classes}) => (
    <Paper className={classes.paper} elevation={2}>
        <Box className={classes.box}>
            <Skeleton className={classes.logo} variant="rect" animation="wave" width={64} height={64} />
            <Skeleton className={classes.duration} animation="wave" width={84} height={32}/>
            <Skeleton animation="wave" height={40}/>
            <Skeleton animation="wave" width={160} height={34}/>
        </Box>
    </Paper>
));