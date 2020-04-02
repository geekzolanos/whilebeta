import React, { useEffect, useMemo } from 'react';
import { Typography, CircularProgress, Grid, Card, CardContent, CardActions, Button, Table, TableBody, TableCell, TableRow, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Mail, ChevronLeft } from '@material-ui/icons';
import { useParams, Link as RouterLink } from 'react-router-dom';
import TopicPlayer from '../TopicPlayer';
import TopicContent from '../TopicContent';

const useStyles = makeStyles(theme => ({
    mAuto: {
        margin: 'auto'
    },
    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: 12
    }
}));

function TopicDetails({ requestCourse, requestTopic, coursesLoaded, topicsLoaded,
    topic, course}) {

    const classes = useStyles();
    const {courseId, topicId} = useParams();

    useEffect(() => {
        if(coursesLoaded)
            requestCourse(courseId);

        return () => requestCourse(null);
    }, [requestCourse, courseId, coursesLoaded]);

    useEffect(() => {
        if(topicsLoaded)
            requestTopic(topicId);

        return () => requestTopic(null);
    }, [requestTopic, topicId, topicsLoaded]);
    
    const meta = useMemo(() => 
        topic ? [
            {name: 'Duracion', value: `${topic.length} min`},
            {name: 'Curso', value: course.name},
            {name: 'Profesor', value: course.teacher.name}
        ] : [], [course, topic]);

    if(!topic)
        return <CircularProgress />;    
    
    const metaCard = (
        <Card variant="outlined">
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>Informacion</Typography>
                <Typography variant="h5" gutterBottom>{topic.name}</Typography>
                <Typography variant="body2" component="p" align="justify" className={classes.pos}>{topic.description}</Typography>
                <Typography variant="overline" gutterBottom>Detalles</Typography>
                <Table className={classes.table} size="small">
                    <TableBody>
                        {meta.map(item => (
                            <TableRow key={item.name}>
                                <TableCell component="th" scope="row">
                                    {item.name}
                                </TableCell>
                                <TableCell align="right">{item.value}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            
            <CardActions>
                <Link className={classes.mAuto} underline="none" href={`mailto:${course.teacher.email}`}><Button size="small" startIcon={<Mail />}>Contactar al profesor</Button></Link>
            </CardActions>
        </Card>
    );

    return (
        <>
            <Link component={RouterLink} underline="none" to={`/courses/${course.id}`}><Button size="small" className={classes.pos} startIcon={<ChevronLeft />}>Regresar a listado de temas</Button></Link>
            <Grid container spacing={4}>
                <Grid item md={8}>
                    <TopicPlayer courseId={courseId} topicId={topicId} />
                    <TopicContent courseId={courseId} topicId={topicId} />
                </Grid>
                <Grid item md={4}>
                    {metaCard}
                </Grid>
            </Grid>
        </>
    );
}

export default TopicDetails;