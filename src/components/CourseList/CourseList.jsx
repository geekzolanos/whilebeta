import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import { ListCourseItem, SkeletonCourseItem } from '../ListCourseItem';
import { useHistory, useRouteMatch } from 'react-router-dom';

function CourseList(props) {
    const courses = props.courses;
    const history = useHistory();
    const match = useRouteMatch();

    const onCourseSelected = course => {
        props.requestCourse(course);
        history.push(`${match.url}/${course.id}`);
    };

    const $courses = courses ?
        (courses.length > 0 ?
            courses.map(course => 
                <Grid item xs={12} md={4} key={course.id}>
                    <ListCourseItem value={course} 
                        onClick={() => onCourseSelected(course)} />
                </Grid>
            )
        : (<Typography variant="h6">No hay cursos disponibles para este usuario</Typography>))
    : Array(3).fill(
        <Grid item xs={12} md={4}>
            <SkeletonCourseItem />
        </Grid>
    );
        
    return (
        <>
            <Typography variant="h2" style={{marginBottom: '24px'}}>Mis Cursos ({courses ? courses.length : '-'})</Typography>
            <Grid container spacing={2}>
                {$courses}
            </Grid>
        </>
    );
}

export default CourseList;