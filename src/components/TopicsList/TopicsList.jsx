import React, { useEffect} from 'react';
import { Typography, CircularProgress, Paper, Grid, Chip, List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { WatchLater, MenuBook } from '@material-ui/icons';
import { useParams, useRouteMatch, useHistory } from 'react-router-dom';
import ListTopicItem from '../ListTopicItem';

const useStyles = makeStyles(theme => ({
    classMeta: {
        textAlign: 'right',
        '& .MuiChip-root:first-child': {
            marginRight: theme.spacing(1)
        }
    },
    classRoot: {
        padding: theme.spacing(4,2)
    },
    classLogo: {
        width: '196px'
    },
    topicsTitle: {
        marginTop: theme.spacing(2)
    },
    bgDark: {            
        color: 'white',
        '& MuiChip-icon': {
            color: 'white',
        }
    }
}));

function TopicsList({requestCourse, course, topics, ...props}) {
    const { courseId } = useParams();
    const match = useRouteMatch();
    const history = useHistory();
    const classes = useStyles();

    const onTopicSelected = topic => {
        props.requestTopic(topic);
        history.push(`${match.url}/topic/${topic.id}`);
    };

    useEffect(() => {
        requestCourse(courseId);
        return () => requestCourse(null);
    }, [requestCourse, courseId]);

    if(!topics)
        return <CircularProgress />;
        
    const featured = (
        <Paper className={classes.classRoot}>
            <Grid container spacing={4}>
                <Grid item>
                    <img src={course.logo} alt="Logo" className={classes.classLogo} />
                </Grid>
                <Grid item sm container direction="column">
                    <Grid item xs>
                        <Typography variant="h2" gutterBottom>{course.name}</Typography>
                        <Typography variant="subtitle1" textAlign="justify">{course.description}</Typography>
                    </Grid>
                    <Grid item className={classes.classMeta}>
                        <Chip variant="outlined" icon={<WatchLater />} label={`${course.duration} Hrs`} />
                        <Chip variant="outlined" icon={<MenuBook />} label={`${topics.length} Tema(s)`} />                        
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
    
    const topicList = topics.length ? (
        <List>
            {topics.map(topic => (
                <ListTopicItem key={topic.id} value={topic} onClick={() => onTopicSelected(topic)} />
            ))}
        </List>
    ) : <Typography variant="h6">No hay temas asociados</Typography>;

    return (
        <Grid container spacing={2}>
            <Grid item sm={9}>
                {featured}
            </Grid>
            <Grid item sm={3}>
            </Grid>
            <Grid item sm={9}>
                <Typography variant="h5" className={classes.topicsTitle}>Temas del curso</Typography>
                {topicList}
            </Grid>
        </Grid>
    );
}

export default TopicsList;