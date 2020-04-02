import React, { useState, useEffect, useCallback } from 'react';
import { useFirestore, useUser } from 'reactfire';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { Container, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { getCoursesByUser, getTopicsByCourse } from '../api';
import CourseList from '../components/CourseList';
import TopicsList from '../components/TopicsList';
import TopicDetails from '../components/TopicDetails';

const ErrStates = { CourseNull: 0, TopicNull: 1 }

const ErrMessages = {
    [ErrStates.CourseNull]: 'No se ha encontrado el curso solicitado.',
    [ErrStates.TopicNull]: 'No se ha encontrado el tema solicitado.',
};

const onRequestCallback = (req, stack, set, cbSet) => {
    if(req === undefined) return;

    if(typeof req == "string") {
        const _req = stack.find(el => el.id === req);
        if(!_req) {
            throw new Error("RequestNotFound");
        }
        
        return set(cur => cbSet(cur, _req));
    }

    return set(cur => cbSet(cur, req));
}

function Courses() {
    const [courses, setCourses] = useState(null);
    const [curCourse, setCurCourse] = useState(null);
    const [topics, setTopics] = useState(null);
    const [curTopic, setCurTopic] = useState(null);
    const [err, setErr] = useState(null);
    const [errOpen, setErrOpen] = useState(false);
    const firestore = useFirestore();
    const user = useUser();
    const match = useRouteMatch();
    const history = useHistory();

    // Get courses associated with this user
    useEffect(() => { 
        getCoursesByUser(firestore, user)
            .then(_courses => setCourses(_courses));

        return () => setCourses(null);
    }, [firestore, user]);
    
    // Error Handling
    useEffect(() => {
        if(err === null) return;
        
        if(err !== ErrStates.Offline)
            setErrOpen(true);

        history.replace(match.path);
    }, [err, history, match.path]);

    const handleErrClose = () => setErrOpen(false);

    // Course callback
    // TODO: Replace with Redux backend
    const onCourseRequest = useCallback(val => {
        const cbSet =  (cur, req) => {
            if((cur && req) && (cur.id === req.id))
                return cur;
            
            // Set topic if a new course is selected
            if(req)
                getTopicsByCourse(firestore, req)
                    .then(setTopics)
                    .catch(() => setErr(ErrStates.Offline));
    
            return req;
        };

        try {
            onRequestCallback(val, courses, setCurCourse, cbSet);
        } catch(e) {
            setErr(ErrStates.CourseNull);
        }
    }, [firestore, courses]);

    // Topic callback
    // TODO: Replace with Redux backend
    const onTopicRequest = useCallback(val => {
        try {
            onRequestCallback(val, topics, setCurTopic, (_r, cur) => cur);
        } catch(e) {
            setErr(ErrStates.TopicNull);
        }
    }, [topics]);
    
    return (
        <Container maxWidth="md" style={{marginTop: '32px'}}>
            <Switch>
                <Route path={`${match.path}/:courseId/topic/:topicId`}>
                    <TopicDetails course={curCourse} 
                        topic={curTopic} 
                        coursesLoaded={!!courses}
                        topicsLoaded={!!topics}
                        requestCourse={onCourseRequest}
                        requestTopic={onTopicRequest} />
                </Route>

                <Route path={`${match.path}/:courseId`}>
                    <TopicsList 
                            coursesLoaded={!!courses}
                            course={curCourse} 
                            topics={topics}
                            requestCourse={onCourseRequest}
                            requestTopic={onTopicRequest} />
                </Route>
                        
                <Route path={match.path}>
                    <CourseList courses={courses} 
                        requestCourse={onCourseRequest} />
                </Route>
            </Switch>
            
            <Snackbar open={errOpen} autoHideDuration={5000} onClose={handleErrClose}>
                <MuiAlert severity="error" elevation={6} variant="filled" onClose={handleErrClose}>{err !== null && ErrMessages[err]}</MuiAlert>
            </Snackbar>
        </Container>
    );
}

export default Courses;