import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { useStorage } from 'reactfire';
import { ReactComponent as VolumeIcon } from 'assets/img/volume.svg';
import { ReactComponent as FullscreenIcon } from 'assets/img/fullscreen.svg';
import { ReactComponent as PlayIcon } from 'assets/img/play.svg';
import clsx from 'clsx';
import styles from './style';
import { CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { VideoPlayer, PlaybackStates } from './videoPlayer';
import { neatTime } from 'config/utils';

function TopicPlayer({classes, courseId, topicId}) {
    const storage = useStorage();
    const canvasRef = useRef();
    const playerRef = useRef();
    const playRef = useRef();
    const [playback, setPlayback] = useState(PlaybackStates.Waiting);
    const [meta, setMeta] = useState({});

    // Initialize VideoPlayer
    useEffect(() => {
        if(canvasRef.current) {            
            const ref = storage.ref().child(`courses/${courseId}/${topicId}/video.mp4`);
            playRef.current = new VideoPlayer(canvasRef.current, ref, setPlayback, setMeta);
        }
    }, [canvasRef, courseId, topicId, storage]);

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

    const $progress = (
        <div className={classes.progress} onClick={progressUpdate}>
            <div className={classes.progressFilled} style={{width: progress}} />
        </div>
    );

    const $btnPlay = (
        <div className={clsx(classes.playBtn, {paused: playback !== PlaybackStates.Playing})} 
            onClick={toggleState} />
    );

    const $btnVolume = (
        <div className={clsx(classes.volumeBtn, {muted: meta.muted || meta.volume <= 0.1, loud: meta.volume >= 0.7})}
            onClick={() => playRef.current.toggleMute()} 
            children={<VolumeIcon />} />
    )

    const $volumeSlider = (
        <div className={classes.volumeSlider} onClick={volumeUpdate}>
            <div className={classes.volumeFilled}
                style={{width: volume}}></div>
        </div>
    );

    const $btnFullscreen = (
        <div className={classes.fullscreen} 
            onClick={requestFullscreen}
            children={<FullscreenIcon />} />
    );

    const $duration = currentTime && <span className={classes.time}>{`${currentTime} / ${duration}`}</span>;
    
    const $spinner = playback === PlaybackStates.Waiting && 
        <div className='absolute-center' children={<CircularProgress width={72} height={72} color="inherit"/>} />;
    
    const $btnBigPlay = playback === PlaybackStates.Paused && 
        <PlayIcon className={clsx(classes.bigPlayBtn, 'absolute-center')} onClick={toggleState}/>;

    return (
        <>
            <div className={classes.playerContainer}>
                <div className={classes.player} ref={playerRef}>
                    <canvas ref={canvasRef} className={classes.canvas} onContextMenu={e => e.preventDefault()} />
                    {$spinner}
                    {$btnBigPlay}
                    <div className={classes.controls}>
                        {$progress}
                        <div className={classes.flexCenter}>
                            <div className={clsx(classes.controlsMain, classes.flexCenter)}>
                                {$btnPlay}
                                <div className={classes.flexCenter}>
                                    {$btnVolume}
                                    {$volumeSlider}
                                </div>
                                {$duration}
                            </div>                        
                            {$btnFullscreen}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default withStyles(styles)(TopicPlayer);