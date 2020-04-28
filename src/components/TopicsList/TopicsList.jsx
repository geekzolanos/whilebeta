import React, { useEffect } from 'react';
import { Typography,  Grid, List, Link, Hidden } from '@material-ui/core';
import { useParams, useRouteMatch, Link as RouterLink } from 'react-router-dom';
import { ListTopicItem, SkeletonTopicItem } from '../ListTopicItem';
import { CourseFeatured, SkeletonCourseFeatured } from '../CourseFeatured';
import { TeacherCard, SkeletonTeacherCard } from '../TeacherCard';
import { withStyles } from '@material-ui/core/styles';

const SkeletonList = (
    <List>
        { Array(2).fill(null).map((_, i) => <SkeletonTopicItem key={i} />) }
    </List>
);

function TopicsList({classes, refresh, course, topics}) {
    const {courseId} = useParams();
    const match = useRouteMatch();

    useEffect(() => { refresh({courseId}) }, [courseId, refresh]);

    const topicList = topics ? 
        topics.length ? (
            <List>
                {topics.map(topic => (
                    <Link key={topic.id} component={RouterLink} color="inherit" underline="none"
                        to={`${match.url}/topic/${topic.id}`}>
                            
                        <ListTopicItem value={topic} />
                    </Link>
                ))}
            </List>) 
            : <Typography variant="h6">No hay temas asociados</Typography>
        : SkeletonList;

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={9}>
                { course ? <CourseFeatured course={course} topics={topics} />
                    : <SkeletonCourseFeatured /> }
            </Grid>
            <Grid item md={3}>
                <Hidden smDown>
                    { course ? <TeacherCard teacher={course.teacher} />
                        : <SkeletonTeacherCard /> }
                </Hidden>
            </Grid>
            <Grid item xs={12} md={9}>
                <Typography variant="h5" className={classes.topicsTitle}>Temas del curso</Typography>
                {topicList}
            </Grid>
        </Grid>
    );
}

export default withStyles(theme => ({
    topicsTitle: {
        marginTop: theme.spacing(2)
    }
}))(TopicsList);