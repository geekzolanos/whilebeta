import React, { useEffect, useState } from 'react';
import { useStorage } from 'reactfire';
import ReactMarkdown from 'react-markdown'

function TopicContent({courseId, topicId}) {
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
        <ReactMarkdown source={content} />
    );
}

export default TopicContent;