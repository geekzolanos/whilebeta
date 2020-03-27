import React, { useEffect, useRef } from 'react';
import { useStorage, useStorageDownloadURL } from 'reactfire';

const setPlayback = function(ref, url) {
    const video = document.createElement('video');
    const audio = document.createElement('audio');
    const ctx = ref.current.getContext('2d');
    video.src = url;
    audio.src = url;

    video.addEventListener('canplay', () => {
        ctx.drawImage(video, 0, 0);
    });
    
    video.load();
    audio.load();
}

function TopicPlayer({courseId}) {
    const storage = useStorage();
    const ref = storage.ref().child(`courses/${courseId}/video.mp4`);
    const url = useStorageDownloadURL(ref);
    const canvasRef = useRef();

    useEffect(() => {
        if(url && canvasRef.current) {
            setPlayback(canvasRef, url);
        }
    }, [url, canvasRef]);

    return (
        <canvas ref={canvasRef} />
    );
}

export default TopicPlayer;