import React from 'react';
import { Card } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    avatar: {
        marginBottom: theme.spacing(2)
    },
    root: {
        padding: theme.spacing(2.8),
        
        '& .MuiSkeleton-root': {
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    },
    degree: {
        marginBottom: theme.spacing(1)
    }
});

export default withStyles(styles)(({classes}) => (
    <Card className={classes.root}>
        <Skeleton variant="circle" width={80} height={80} className={classes.avatar} />
        <Skeleton width={140} height={36} />
        <Skeleton width={120} height={20} className={classes.degree} />
        <Skeleton height={18} />
        <Skeleton height={18} />
    </Card>
));