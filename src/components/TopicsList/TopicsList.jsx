import React, { useEffect } from 'react';
import { Typography, CircularProgress, Grid, List, Hidden, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useParams, useRouteMatch, Link as RouterLink } from 'react-router-dom';
import ListTopicItem from '../ListTopicItem';
import CourseFeatured from '../CourseFeatured';
import TeacherCard from '../TeacherCard';

const useStyles = makeStyles(theme => ({
    topicsTitle: {
        marginTop: theme.spacing(2)
    }
}));

function TopicsList({refresh, course, topics}) {
    const {courseId} = useParams();
    const match = useRouteMatch();
    const classes = useStyles();

    useEffect(() => { refresh({courseId}) }, [courseId, refresh]);

    if(!topics)
        return <CircularProgress />;
    
    const topicList = topics.length ? (
        <List>
            {topics.map(topic => (
                <Link key={topic.id} component={RouterLink} color="inherit" underline="none"
                    to={`${match.url}/topic/${topic.id}`}>
                        
                    <ListTopicItem value={topic} />
                </Link>
            ))}
        </List>
    ) : <Typography variant="h6">No hay temas asociados</Typography>;

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={9}>
                <CourseFeatured course={course} topics={topics} />
            </Grid>
            <Grid item md={3}>
                <Hidden smDown>
                    <TeacherCard teacher={course.teacher} />
                </Hidden>
            </Grid>
            <Grid item xs={12} md={9}>
                <Typography variant="h5" className={classes.topicsTitle}>Temas del curso</Typography>
                {topicList}
            </Grid>
        </Grid>
    );
}

export default TopicsList;