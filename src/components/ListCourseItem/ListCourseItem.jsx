import React from 'react';
import { Typography, Paper, Chip, ButtonBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { WatchLater } from '@material-ui/icons';

function ListCourseItem(props) {
    const course = props.value;

    const useStyles = makeStyles(theme => ({
        root: {
            backgroundColor: course.background,
            height: '100%'
        },
        button: {
            padding: theme.spacing(3),
            textAlign: 'initial',
            width: '100%',
            height: '100%'
        },
        content: {
            position: 'relative',
            width: '100%',
            minHeight: '100%'
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
        <Paper className={classes.root} elevation={2}>
            <ButtonBase className={classes.button}>
                <div className={classes.content}>
                    <img src={course.logo} className={classes.logo} alt="Logo" />
                    <Typography variant="h6">{course.name}</Typography>
                    <Typography variant="subtitle1"><b>Profesor:</b> {course.teacher.name}</Typography>
                    <Chip className={classes.duration} 
                        variant="outlined" 
                        icon={<WatchLater />}
                        label={`${course.duration} Hrs`} />
                </div>
            </ButtonBase>
        </Paper>
    );
}

export default ListCourseItem;