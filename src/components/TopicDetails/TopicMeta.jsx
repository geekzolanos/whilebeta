import React, { useMemo } from 'react';
import { Typography, CircularProgress, Card, CardContent, CardActions, Button, Table, TableBody, TableCell, TableRow, Link } from '@material-ui/core';
import { Mail } from '@material-ui/icons';

export default ({topic, course}) => {
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
                <Typography gutterBottom
                    color="textSecondary" 
                    style={{fontSize: 14}}>Informacion</Typography>

                <Typography variant="h5" gutterBottom>{topic.name}</Typography>

                <Typography variant="body2" 
                    component="p"
                    align="justify" 
                    style={{marginBottom: 12}}>{topic.description}</Typography>

                <Typography variant="overline" gutterBottom>Detalles</Typography>
                <Table size="small">
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
                <Link underline="none" 
                    href={`mailto:${course.teacher.email}`}
                    style={{margin: 'auto'}}>

                    <Button size="small" startIcon={<Mail />}>Contactar al profesor</Button>
                </Link>
            </CardActions>
        </Card>
    );
}