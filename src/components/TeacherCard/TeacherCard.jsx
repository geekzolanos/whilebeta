import React from 'react';
import { Card, CardActions, Typography, Avatar, Button, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Mail, LinkedIn } from '@material-ui/icons';

const useStyle = makeStyles(theme => ({
    avatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),        
        margin: `${theme.spacing(2)}px auto`
    },
    mAuto: {
        margin: 'auto'
    },
    root: {
        textAlign: 'center'
    },
    description: {
        padding: theme.spacing(1.5)
    }
}));

function TeacherCard({teacher}) {
    const classes = useStyle();
    const avatarAlt = teacher.name.split(' ').map(e => e[0].toLocaleUpperCase()).join('');

    return (
        <Card className={classes.root}>
            <Avatar alt={teacher.name} 
                src={teacher.avatarUrl} 
                children={!teacher.avatarUrl && avatarAlt}
                className={classes.avatar} />
            <Typography variant="h5" align="center">{teacher.name}</Typography>
            <Typography variant="overline" color="textSecondary" align="center">{teacher.degree}</Typography>
            <Typography variant="body2" align="center" className={classes.description}>{teacher.description}</Typography>
            <CardActions>
                <Link className={classes.mAuto} underline="none" href={`mailto:${teacher.email}`}><Button size="small" startIcon={<Mail />}>Contactar</Button></Link>

                {teacher.profileUrl && 
                    <Link className={classes.mAuto} underline="none" href={teacher.profileUrl} target="blank"><Button size="small" startIcon={<LinkedIn />}>Ver Perfil</Button></Link>}
            </CardActions>
        </Card>
    );
}

export default TeacherCard;