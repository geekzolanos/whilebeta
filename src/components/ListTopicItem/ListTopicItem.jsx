import React from 'react';
import { Typography, ListItem, Grid, Chip } from '@material-ui/core';
import { WatchLater, ChevronRight } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    duration: {
        marginBottom: theme.spacing(2)
    },
    root: {
        padding: theme.spacing(4,2)
    },
    thumb: {
        width: '128px'
    },
    goIcon: {
        height: '100%',
        fontSize: '2.4em'
    }
}));

function ListTopicItem(props) {
    const topic = props.value;
    const classes = useStyles();    

    return (
        <ListItem button divider onClick={props.onClick} className={classes.root}>
            <Grid container spacing={3}>
                <Grid item>
                    <img src={topic.thumbUrl} alt="Thumb" className={classes.thumb} />
                </Grid>
                <Grid item sm>
                    <Typography variant="h6" gutterBottom>{topic.name}</Typography>
                    <Chip variant="outlined" size="small" icon={<WatchLater />} label={`${topic.length} Min`} className={classes.duration}/>
                    <Typography variant="body2" align="justify">{topic.description}</Typography>
                </Grid>
                <Grid item>
                    <ChevronRight className={classes.goIcon}/>
                </Grid>
            </Grid>
        </ListItem>
    );
}

export default ListTopicItem;