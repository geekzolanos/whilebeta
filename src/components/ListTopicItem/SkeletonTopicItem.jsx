import React from 'react';
import { ListItem, Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { ChevronRight } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    duration: {
        marginBottom: theme.spacing(2)
    },
    root: {
        padding: theme.spacing(4,2),
        opacity: 1
    },
    heading: {
        marginTop: theme.spacing(-1)
    },
    goIcon: {
        height: '100%',
        fontSize: '2.4em'
    }
});

export default withStyles(styles)(({classes}) => (
    <ListItem divider className={classes.root}>
        <Grid container spacing={3}>
            <Grid item>
                <Skeleton width={128} height={72} variant="rect" />
            </Grid>
            <Grid item sm>
                <Skeleton width={250} height={32} className={classes.heading} />
                <Skeleton width={64} height={22} className={classes.duration} />
                <Skeleton height={18} />
                <Skeleton height={18} />
                <Skeleton height={18} />
            </Grid>
            <Grid item>
                <ChevronRight className={classes.goIcon} />
            </Grid>
        </Grid>
    </ListItem>
));