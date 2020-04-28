import React from 'react';
import { Typography, Paper, Chip, ButtonBase } from '@material-ui/core';
import { WatchLater } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/components/ListCourseItem/ListCourseItem';

const useStyles = makeStyles(styles);

export default ({value}) => {
    const classes = useStyles({value});

    return (
        <Paper className={classes.root} elevation={2}>
            <ButtonBase className={classes.button}>
                <div className={classes.content}>
                    <img src={value.logo} className={classes.logo} alt="Logo" />
                    <Typography variant="h6">{value.name}</Typography>
                    <Typography variant="subtitle1"><b>Profesor:</b> {value.teacher.name}</Typography>
                    <Chip className={classes.duration} 
                        variant="outlined" 
                        icon={<WatchLater />}
                        label={`${value.duration} Hrs`} />
                </div>
            </ButtonBase>
        </Paper>
    );
};