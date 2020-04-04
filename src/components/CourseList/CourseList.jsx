import React from 'react';
import { Typography, Grid, Link } from '@material-ui/core';
import { ListCourseItem, SkeletonCourseItem } from '../ListCourseItem';
import { useRouteMatch, Link as RouterLink } from 'react-router-dom';

const SkeletonGrid = Array(3).fill(null).map((_, i) =>
    <Grid item key={i} xs={12} md={4}>
        <SkeletonCourseItem />
    </Grid>
);

function CourseList(props) {
    const courses = props.courses;
    const match = useRouteMatch();

    const $courses = courses ?
        (courses.length > 0 ?
            courses.map(course => 
                <Grid item xs={12} md={4} key={course.id}>
                    <Link component={RouterLink} color="inherit" underline="none"
                        to={`${match.url}/${course.id}`}>
                        <ListCourseItem value={course}/>
                    </Link>
                </Grid>
            )
        : (<Typography variant="h6">No hay cursos disponibles para este usuario</Typography>))
    : SkeletonGrid;
        
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