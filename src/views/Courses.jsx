import React, { Component, useCallback, createElement } from 'react';
import { useFirestore, useUser } from 'reactfire';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { Container, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { getCoursesByUser, getTopicsByCourse } from '../api';
import CourseList from '../components/CourseList';
import TopicsList from '../components/TopicsList';
import TopicDetails from '../components/TopicDetails';

const ErrStates = { CourseNull: 1, TopicNull: 2 }

const ErrMessages = {
    [ErrStates.CourseNull]: 'No se ha encontrado el curso solicitado.',
    [ErrStates.TopicNull]: 'No se ha encontrado el tema solicitado.',
};

const getReqById = (stack, id) => stack.find(el => el.id === id);
const requiresUpdate = (it, id) => (id && !(it && it.id === id));

function Courses() {
    const match = useRouteMatch();
    const history = useHistory();

    const handleError = useCallback(() => {
        history.replace(match.path);
    }, [history, match]);

    const props = {
        firestore: useFirestore(),
        user: useUser()
    }

    return (
        <CoursesProvider {...props} onError={handleError}>
            {({course, courses, topic, topics, refresh, err, errDismiss}) => (
            <Container maxWidth="md" style={{marginTop: '32px'}}>
                <Switch>
                    <Route path={`${match.path}/:courseId/topic/:topicId`}>
                        <TopicDetails course={course} topic={topic} refresh={refresh} />
                    </Route>

                    <Route path={`${match.path}/:courseId`}>
                        <TopicsList course={course} topics={topics} refresh={refresh} />
                    </Route>
                            
                    <Route path={match.path}>
                        <CourseList courses={courses} refresh={refresh} />
                    </Route>
                </Switch>
                
                <Snackbar open={err} autoHideDuration={5000} onClose={errDismiss}>
                    <MuiAlert severity="error" elevation={6} variant="filled" onClose={errDismiss}>{err && ErrMessages[err]}</MuiAlert>
                </Snackbar>
            </Container>
            )}
        </CoursesProvider>
    );
}

class CoursesProvider extends Component {
    constructor(props) {
        super(props);

        this.state = { courses: null, course: null, topics: null, 
            topic: null, lastReq: [], err: null }

        this.throwError = this.throwError.bind(this);
        this.refreshCourses = this.refreshCourses.bind(this);
        this.refreshTopics = this.refreshTopics.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    throwError(code) {
        if(code !== ErrStates.Offline)
            this.setState({err: code});

        this.props.onError && this.props.onError();
    }

    async refreshCourses() {
        const {firestore, user} = this.props;
        const courses = await getCoursesByUser(firestore, user);
        this.setState({courses}, this._refresh);
    }

    async refreshTopics() {
        const firestore = this.props.firestore;
        const topics = await getTopicsByCourse(firestore, this.state.course);
        this.setState({topics}, this._refresh);
    }

    refresh({courseId, topicId}) {        
        let payload = {lastReq: {courseId, topicId}}

        if(courseId === null)
            payload.course = payload.topics = null;
        
        if(topicId === null)
            payload.topic = null;

        this.setState(payload, this._refresh);
    }

    _refresh() {
        let differTopic = false;
        const {course, courses, topic, topics, lastReq} = this.state;

        // Request Differed by courses load
        if(!courses) return;

        if(requiresUpdate(course, lastReq.courseId)) {
            const _course = getReqById(courses, lastReq.courseId);

            if(!_course)
                return this.throwError(ErrStates.CourseNull);
            
            differTopic = true;
            this.setState({course: _course, topics: null}, this.refreshTopics);
        }

        if(!differTopic && requiresUpdate(topic, lastReq.topicId)) {
            const _topic = getReqById(topics, lastReq.topicId);

            if(!_topic)
                return this.throwError(ErrStates.TopicNull);
            
            this.setState({topic: _topic});
        }
    }

    componentDidMount() {
        this.refreshCourses();
    }

    componentWillUnmount() {
        this.setState({courses: null});
    }      

    render() {
        return createElement(this.props.children, {
            errDismiss: () => this.setState({err: null}),
            refresh: this.refresh, 
            ...this.state
        });
    }
}

export default Courses;