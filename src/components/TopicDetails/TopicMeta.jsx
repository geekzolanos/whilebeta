import React, { useMemo } from 'react';
import { Typography, CircularProgress, Card, CardContent, CardActions, Button, Table, TableBody, TableCell, TableRow, Link } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Mail } from '@material-ui/icons';

const styles = {
    mAuto: {
        margin: 'auto'
    },
    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: 12
    }
};

function TopicMeta({classes, topic, course}) {
    const meta = useMemo(() => 
        topic ? [
            {name: 'Duracion', value: `${topic.length} min`},
            {name: 'Curso', value: course.name},
            {name: 'Profesor', value: course.teacher.name}
        ] : [], [course, topic]);

    if(!topic)
        return <CircularProgress />;    
    
    return (
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
}

export default withStyles(styles)(TopicMeta);