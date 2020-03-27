import React, { useEffect, useState } from 'react';
import { useStorage } from 'reactfire';
import ReactMarkdown from 'react-markdown'

function TopicContent({courseId}) {
    const storage = useStorage();
    const [content, setContent] = useState(null);

    useEffect(() => {
        storage.ref()
            .child(`courses/${courseId}/content.md`)
            .getDownloadURL()
            .then(window.fetch)
            .then(res => res.text())
            .then(setContent);
    }, [courseId, storage]);
    

    return (
        <ReactMarkdown source={content} />
    );
}

export default TopicContent;