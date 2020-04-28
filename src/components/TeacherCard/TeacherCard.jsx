import React from 'react';
import { Card, CardActions, Typography, Avatar, Button, Link } from '@material-ui/core';
import { Mail, LinkedIn } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/components/TeacherCard/TeacherCard';

const nameSplit = name => name.split(' ').map(e => e[0].toLocaleUpperCase()).join('');

export default withStyles(styles)(({classes, teacher}) => (
    <Card className={classes.root}>
        <Avatar alt={teacher.name} 
            src={teacher.avatarUrl} 
            children={!teacher.avatarUrl && nameSplit(teacher.name)}
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
));