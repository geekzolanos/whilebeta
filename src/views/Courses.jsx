import React, { useState, useEffect, useCallback } from 'react';
import { useFirestore, useUser } from 'reactfire';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { CircularProgress, Container } from '@material-ui/core';
import { getCoursesByUser, getTopicsByCourse } from '../api';
import CourseList from '../components/CourseList';
import TopicsList from '../components/TopicsList';
import TopicDetails from '../components/TopicDetails';

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
    const firestore = useFirestore();
    const user = useUser();
    const match = useRouteMatch();
    const history = useHistory();

    useEffect(() => { 
        getCoursesByUser(firestore, user).then(_courses => {
            setCourses(_courses);
        });

        return () => setCourses(null);
    }, [firestore, user]);
   

    const onCourseRequest = useCallback(val => {
        const cbSet =  (cur, req) => {
            if((cur && req) && (cur.id === req.id))
                return cur;
            
            // Set topic if a new course is selected
            if(req)
                getTopicsByCourse(firestore, req).then(setTopics);
    
            return req;
        };

        onRequestCallback(val, courses, setCurCourse, cbSet);
    }, [firestore, courses]);

    const onTopicRequest = useCallback(val => 
        onRequestCallback(val, topics, setCurTopic, (_r, cur) => cur), [topics]);

    if(!courses)
        return <CircularProgress />;

    return (
        <Container maxWidth="md" style={{marginTop: '32px'}}>
            <Switch>
                <Route path={`${match.path}/:courseId/topic/:topicId`}>
                    <TopicDetails course={curCourse} 
                        topic={curTopic} 
                        topicsLoaded={topics != null}
                        requestCourse={onCourseRequest}
                        requestTopic={onTopicRequest} />
                </Route>

                <Route path={`${match.path}/:courseId`}>
                    <TopicsList course={curCourse} 
                            topics={topics}
                            requestCourse={onCourseRequest}
                            requestTopic={onTopicRequest} />
                </Route>
                        
                <Route path={match.path}
                        children={<CourseList courses={courses} requestCourse={onCourseRequest} />} />
            </Switch>
        </Container>
    );
}

export default Courses;