import React, { useEffect, useState } from 'react';
import { useStorage } from 'reactfire';
import ReactMarkdown from 'react-markdown';
import { Paper, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    content: {    
        padding: theme.spacing(4, 3),
        marginTop: theme.spacing(4)
    }
});

function TopicContent({classes, courseId, topicId}) {
    const storage = useStorage();
    const [content, setContent] = useState(null);

    useEffect(() => {
        if(courseId && topicId) {
            storage.ref()
                .child(`courses/${courseId}/${topicId}/content.md`)
                .getDownloadURL()
                .then(window.fetch)
                .then(res => res.text())
                .then(setContent);
        }
    }, [courseId, topicId, storage]);
    

    return (        
        <Paper className={classes.content}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>Contenido</Typography>
            
            { content ? 
                <ReactMarkdown source={content} /> : 
                <>
                    <Skeleton animation="wave" width={200} height={64} />
                    <Skeleton animation="wave" />
                    <Skeleton animation="wave" />
                    <Skeleton animation="wave" width={400} />
                </>
            }
        </Paper>
    );
}

export default withStyles(styles)(TopicContent);