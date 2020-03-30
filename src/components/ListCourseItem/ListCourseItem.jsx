import React from 'react';
import { Typography, Paper, Chip, ButtonBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { WatchLater } from '@material-ui/icons';

function ListCourseItem(props) {
    const course = props.value;

    const useStyles = makeStyles(theme => ({
        root: {
            display: 'block',
            width: '100%',
            textAlign: 'initial'
        },
        container: {            
            padding: theme.spacing(3),
            backgroundColor: course.background
        },
        content: {
            position: 'relative'
        },
        logo: {
            width: "64px",
            height: "64px",
            marginBottom: theme.spacing(1)
        },
        duration:{
            position: 'absolute',
            top: 0,
            right: 0
        },
        bgDark: {            
            color: 'white',
            '& MuiChip-icon': {
                color: 'white',
            }
        }
    }));

    const classes = useStyles();

    return (
        <ButtonBase className={classes.root}>
        <Paper onClick={props.onClick} className={classes.container} elevation={2}>
            <div className={classes.content}>
                <img src={course.logo} className={classes.logo} alt="Logo" />
                <Typography variant="h6">{course.name}</Typography>
                <Typography variant="subtitle1"><b>Profesor:</b> {course.teacher.name}</Typography>
                <Chip className={classes.duration} 
                    variant="outlined" 
                    icon={<WatchLater />}
                    label={`${course.duration} Hrs`} />
            </div>
        </Paper>        
        </ButtonBase>
    );
}

export default ListCourseItem;