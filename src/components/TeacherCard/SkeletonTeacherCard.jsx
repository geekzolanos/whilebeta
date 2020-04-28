import React from 'react';
import { Card } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { withStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/components/TeacherCard/SkeletonTeacherCard';

export default withStyles(styles)(({classes}) => (
    <Card className={classes.root}>
        <Skeleton variant="circle" width={80} height={80} className={classes.avatar} />
        <Skeleton width={140} height={36} />
        <Skeleton width={120} height={20} className={classes.degree} />
        <Skeleton height={18} />
        <Skeleton height={18} />
    </Card>
));