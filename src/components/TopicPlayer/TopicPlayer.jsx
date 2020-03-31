import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { useStorage } from 'reactfire';
import { ReactComponent as VolumeIcon } from 'assets/img/volume.svg';
import { ReactComponent as FullscreenIcon } from 'assets/img/fullscreen.svg';
import clsx from 'clsx';
import useStyle from './style';
import { VideoPlayer, PlaybackStates } from './videoPlayer';
import { neatTime } from 'config/utils';

function TopicPlayer({courseId}) {
    const storage = useStorage();
    const canvasRef = useRef();
    const playerRef = useRef();
    const playRef = useRef();
    const classes = useStyle();
    const [playback, setPlayback] = useState(PlaybackStates.Waiting);
    const [meta, setMeta] = useState({});

    // Initialize VideoPlayer
    useEffect(() => {
        if(canvasRef.current) {            
            const ref = storage.ref().child(`courses/${courseId}/video.mp4`);
            playRef.current = new VideoPlayer(canvasRef.current, ref, setPlayback, setMeta);
        }
    }, [canvasRef, courseId, storage]);

    // Flush on unmount
    useEffect(() => {
        return () => playRef.current.flush()
    }, []);

    const toggleState = useCallback(() => (playback !== PlaybackStates.Playing ? playRef.current.play() : playRef.current.pause()), [playback, playRef]);
    const requestFullscreen = useCallback(() => (document.fullscreenElement == null ? playerRef.current.requestFullscreen() : document.exitFullscreen()), [playerRef]);

    const progressUpdate = useCallback(e => {
        const newTime = e.nativeEvent.offsetX / e.currentTarget.offsetWidth;
	    playRef.current.setCurrentTime(newTime);
    }, [playRef]);
    
    const volumeUpdate = useCallback(e => {
        let volume = e.nativeEvent.offsetX / e.currentTarget.offsetWidth;
        volume = volume < 0.1 ? 0 : volume;
        playRef.current.setVolume(volume);
    }, [playRef]);

    const volume = useMemo(() => (meta.muted ? 0 : `${meta.volume * 100}%`), [meta.volume, meta.muted]);
    const progress = useMemo(() => (`${meta.currentTime / meta.duration * 100}%`), [meta.currentTime, meta.duration]);
    const currentTime = useMemo(() => neatTime(meta.currentTime), [meta.currentTime]);
    const duration = useMemo(() => neatTime(meta.duration), [meta.duration]);

    return (
        <>
            <div className={classes.playerContainer}>
                <div className={classes.player} ref={playerRef}>
                    <canvas ref={canvasRef} className={classes.canvas}/>

                    {meta.duration &&
                    <div className={classes.controls}>
                        <div className={classes.progress}
                            onClick={progressUpdate}>
                            <div className={classes.progressFilled}
                                style={{width: progress}}></div>
                        </div>
                        <div className={classes.flexCenter}>
                            <div className={clsx(classes.controlsMain, classes.flexCenter)}>
                                <div className={clsx(classes.playBtn, {paused: playback !== PlaybackStates.Playing})} onClick={toggleState}></div>
                                <div className={classes.flexCenter}>
                                    <div className={clsx(classes.volumeBtn, {muted: meta.muted || meta.volume <= 0.1, loud: meta.volume >= 0.7})}
                                        onClick={() => playRef.current.toggleMute()}>
                                        <VolumeIcon />
                                    </div>
                                    <div className={classes.volumeSlider}
                                        onClick={volumeUpdate}>
                                        <div className={classes.volumeFilled}
                                            style={{width: volume}}></div>
                                    </div>
                                </div>
                                <span className={classes.time}>{`${currentTime} / ${duration}`}</span>
                            </div>                            
                        
                            <div className={classes.fullscreen} onClick={requestFullscreen}>
                                <FullscreenIcon />
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
        </>
    );
}

export default TopicPlayer;