import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useStorage } from 'reactfire';
import { ReactComponent as VolumeIcon } from 'assets/img/volume.svg';
import { ReactComponent as FullscreenIcon } from 'assets/img/fullscreen.svg';
import clsx from 'clsx';
import { contain } from 'intrinsic-scale';

const PlaybackStates = {Waiting: 0, Paused: 1, Playing: 2, Ended: 3}

function VideoPlayer(canvas, ref, onState, onMeta) {
    const ctx = canvas.getContext('2d');
    const $video = document.createElement('video');

    let _playbackState = PlaybackStates.Waiting;
    let _constraints = null;
    let _meta = {};
    let _intervalId = null;

    const drawCurFrame = () => {
        ctx.drawImage($video, _constraints.x, _constraints.y, _constraints.width, _constraints.height);
    };

    const onVideoLoaded = () => {
        // Resize Listener
        window.addEventListener('resize', refreshViewport);
        refreshViewport();

        // First Frame
        $video.currentTime = 0;
        setTimeout(drawCurFrame, 250);

        // Ready State
        setState(PlaybackStates.Paused);
        fetchMeta();

        // Remove
        $video.removeEventListener('canplay', onVideoLoaded);
    };

    const setState = state => {
        _playbackState = state
        onState(_playbackState);

        if(state === PlaybackStates.Playing) {
            window.requestAnimationFrame(playbackLoop);
            _intervalId = setInterval(updateCurTime, 1000);
        } else {
            clearInterval(_intervalId);
        }
    };

    const updateCurTime = () => {
        _meta = {..._meta, currentTime: $video.currentTime};
        onMeta(_meta);
    }

    const updateVolume = () => {
        _meta = {..._meta, volume: $video.volume, muted: $video.muted};
        onMeta(_meta);
    }

    const fetchMeta = () => {
        _meta = {
            currentTime: $video.currentTime,
            duration: $video.duration,
            volume: $video.volume,
            muted: $video.muted
        };

        onMeta(_meta);
    }

    const playbackLoop = () => {
        if(_playbackState !== PlaybackStates.Playing) return;
        drawCurFrame();
        window.requestAnimationFrame(playbackLoop);
    }

    const refreshViewport = () => {        
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;        
        _constraints = contain(canvas.width, canvas.height, $video.videoWidth, $video.videoHeight);
    }

    const load = async () => {        
        const url = await ref.getDownloadURL();
        
        $video.addEventListener('canplay', onVideoLoaded);
        $video.addEventListener('pause', () => setState(PlaybackStates.Paused));
        $video.addEventListener('playing', () => setState(PlaybackStates.Playing));
        $video.addEventListener('waiting', () => setState(PlaybackStates.Waiting));
        $video.addEventListener('ended', () => setState(PlaybackStates.Ended));
        
        $video.src = url;
        $video.load();
    };

    this.play = () => { $video.play() };
    this.pause = () => { $video.pause(); }
    this.setVolume = val => { 
        $video.volume = val;
        updateVolume();
    }
    this.toggleMute = () => { 
        $video.muted = !$video.muted;
        updateVolume();
    }
    this.setCurrentTime = val => { 
        $video.currentTime = val * $video.duration;
        updateCurTime();
    }
    this.flush = () => {
        $video.pause();
        $video.remove();
    }

    load();
}

const useStyle = makeStyles(theme => ({    
    flexCenter: {
        display: 'flex',
        alignItems: 'center',
    },
    container: {
        padding: theme.spacing(5),
        maxWidth: theme.spacing(87.5),
        margin: 'auto'
    },
    player: {
        width: '100%',
        height: '40vh',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: theme.palette.common.black,
        
        '&:hover $controls': {
            bottom: 0,
            transition: theme.transitions.create('all', { 
                duration: theme.transitions.duration.shorter, 
                easing: theme.transitions.easing.easeOut
            })
        }
    },
    canvas: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)'
    },
    controls: {
        position: 'absolute',
        padding: theme.spacing(1.5, 3),
        bottom: -80,
        width: '100%',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, rgba(37, 37, 37, 0) 10%, rgba(37, 37, 37, 0.6) 80%)',
        transition: theme.transitions.create('all', { 
            duration: theme.transitions.duration.shorter, 
            easing: theme.transitions.easing.easeIn,  
            delay: '3s'
        }),

        '& svg': {            
            verticalAlign: 'middle'
        }
    },
    progress: {
        height: theme.spacing(1),
        width: '100%',
        marginBottom: theme.spacing(1),
        backgroundColor: 'rgba(60, 60, 60, 0.6)',
        borderRadius: 6,
        cursor: 'pointer',
        transition: theme.transitions.create('height', { 
            duration: theme.transitions.duration.shortest,
            easing: theme.transitions.easing.easeInOut
        }),
        '&:hover': {
            height: 10
        }
    },
    progressFilled: {
        backgroundColor: theme.palette.primary.main,
        width: '4%',
        height: '100%',
        borderRadius: theme.shape.borderRadius,
        transition: theme.transitions.create('all', { 
            duration: theme.transitions.duration.shortest
        })
    },
    controlsMain: {
        flex: 1
    },
    volumeBtn: {
        marginRight: 10,
        cursor: 'pointer',
        '& #volume-off, & #volume-high': {
            opacity: 0
        },
        '&.loud #volume-high': {            
            opacity: 1
        },
        '&.muted #volume-off': {            
            opacity: 1
        },
        '&.muted #volume-high, &.muted #volume-low': {
            opacity: 0
        }
    },
    volumeSlider: {
        height: 8,
        width: 80,
        cursor: 'pointer',
        backgroundColor: 'rgba(60, 60, 60, 0.6)',
        borderRadius: 6,
        position: 'relative'
    },
    volumeFilled: {
        backgroundColor: theme.palette.common.white,
        width: '100%',
        height: '100%',
        borderRadius: 6,
        transition: theme.transitions.create('width', { 
            duration: theme.transitions.duration.shorter,
            easing: theme.transitions.easing.easeInOut
        })
    },
    playBtn: {
        width: 24,
        height: 24,
        cursor: 'pointer',
        position: 'relative',
        marginRight: theme.spacing(2.4),
        transform: 'rotate(-90deg) scale(0.8)',
        transition: [
            theme.transitions.create('clip-path', { 
                duration: theme.transitions.duration.standard,
                easing: theme.transitions.easing.easeInOut,
                delay: theme.transitions.duration.shortest
            }),
            theme.transitions.create('transform', { 
                duration: '0.8s',
                easing: 'cubic-bezier(0.85, -0.25, 0.25, 1.425)'
            })
        ],
        '&.paused': {
            transform: 'rotate(0deg)'
        },
        '&:before, &:after': {
            content: '""',
            position: 'absolute',
            backgroundColor: theme.palette.common.white,
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            transition: 'inherit'
        },
        '&:before': {
            clipPath: 'polygon(0 10%, 100% 10%, 100% 40%, 0 40%)'
        },
        '&:after': {
            clipPath: 'polygon(0 60%, 100% 60%, 100% 90%, 0 90%)'
        },
        '&.paused:before': {
            clipPath: 'polygon(10% 0, 90% 51%, 90% 51%, 10% 51%)'
        },
        '&.paused:after': {
            clipPath: 'polygon(10% 49.5%, 80% 49.5%, 90% 49.5%, 10% 100%)'
        }
    },    
    '$volumeFilled:hover, $playBtn:hover::before, $playBtn:hover::after': {
        backgroundColor: theme.palette.primary.main
    },
    fullscreen: {        
        cursor: 'pointer'
    },
    time: {
        color: theme.palette.common.white,
        marginLeft: theme.spacing(2.4),
    }
}));

const neatTime = time => {
    var minutes = Math.floor((time % 3600)/60);
    var seconds = Math.floor(time % 60);
    seconds = seconds > 9 ? seconds : `0${seconds}`;
    return `${minutes}:${seconds}`;
}

function TopicPlayer({courseId}) {
    const storage = useStorage();
    const canvasRef = useRef();
    const playRef = useRef();
    const playerRef = useRef();
    const classes = useStyle();
    const [playback, setPlayback] = useState(PlaybackStates.Waiting);
    const [meta, setMeta] = useState({});

    useEffect(() => {
        if(canvasRef.current) {            
            const ref = storage.ref().child(`courses/${courseId}/video.mp4`);
            playRef.current = new VideoPlayer(canvasRef.current, ref, setPlayback, setMeta);
        }
    }, [canvasRef, courseId, storage]);

    useEffect(() => {
        return () => {
            playRef.current.flush();
        }
    }, []);

    const toggleState = useCallback(() => {
        return (playback !== PlaybackStates.Playing ? playRef.current.play() : playRef.current.pause())
    }, [playback, playRef]);

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