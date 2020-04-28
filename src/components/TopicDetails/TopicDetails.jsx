import React, { useEffect } from 'react';
import { Grid, Button, Link } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import { useParams, Link as RouterLink } from 'react-router-dom';
import TopicPlayer from '../TopicPlayer';
import TopicContent from '../TopicContent';
import TopicMeta from './TopicMeta';

export default ({refresh, topic, course}) => {
    const {courseId, topicId} = useParams();
    
    const data = {course, topic};

    useEffect(() => {
        topicId && refresh({courseId, topicId});
        return () => refresh({topicId: null});
    }, [courseId, topicId, refresh]);

    return (
        <>
            <Link component={RouterLink} underline="none" to={`/courses/${courseId}`}>
                <Button size="small" style={{marginBottom: 12}} startIcon={<ChevronLeft />}>Regresar a listado de temas</Button>
            </Link>
            <Grid container spacing={4}>
                <Grid item md={8}>
                    <TopicPlayer meta={data} />
                    <TopicContent meta={data} />
                </Grid>
                <Grid item md={4}>
                    <TopicMeta course={course} topic={topic} />
                </Grid>
            </Grid>
        </>
    );
}