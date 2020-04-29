import React from 'react';
import { Typography, ListItem, Grid, Chip } from '@material-ui/core';
import { WatchLater, ChevronRight, NewReleases } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/components/ListTopicItem/ListTopicItem';

const CreatedThreshold = 259200;
const isNew = topic => ((Date.now() - topic.createdAt.toMillis()) <= CreatedThreshold * 1000);

export default withStyles(styles)(({classes, value}) => (
    <ListItem button divider className={classes.root}>
        <Grid container spacing={3}>
            <Grid item>
                <img src={value.thumbUrl} alt="Thumb" className={classes.thumb} />
            </Grid>
            <Grid item sm>
                <Typography variant="h6" gutterBottom>{value.name}</Typography>
                <div className={classes.chipArray}>
                    { !!isNew(value) && <Chip className={classes.colorSuccess} size="small" color="primary" icon={<NewReleases />} label="Nuevo" /> }
                    <Chip variant="outlined" size="small" icon={<WatchLater />} label={`${value.length} Min`} />
                </div>
                <Typography variant="body2" align="justify">{value.description}</Typography>
            </Grid>
            <Grid item>
                <ChevronRight className={classes.goIcon}/>
            </Grid>
        </Grid>
    </ListItem>
));