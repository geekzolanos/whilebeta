import React, { useEffect } from 'react';
import { Typography, CircularProgress} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import TopicPlayer from '../TopicPlayer';
import TopicContent from '../TopicContent';

function TopicDetails({requestCourse, requestTopic, topicsLoaded, ...props}) {
    const {courseId, topicId} = useParams();

    useEffect(() => {
        requestCourse(courseId);
        return () => requestCourse(null);
    }, [requestCourse, courseId]);

    useEffect(() => {
        if(topicsLoaded)
            requestTopic(topicId);

        return () => requestTopic(null);
    }, [requestTopic, topicId, topicsLoaded]);
    
    if(!props.topic)
        return <CircularProgress />;

    return (
        <>
            <Typography variant="h2">Curso Seleccionado</Typography>
            <p>Nombre: {props.course.name}</p>
            <p>Profesor: {props.course.teacher.name}</p>
            
            <Typography variant="h2">Tema Seleccionado</Typography>
            <p>Nombre: {props.topic.name}</p>
            <p>Descripcion: {props.topic.description}</p>

            <TopicPlayer courseId={courseId} />
            <TopicContent courseId={courseId} />
        </>
    );
}

export default TopicDetails;