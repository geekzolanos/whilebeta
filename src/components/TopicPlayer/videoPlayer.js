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

export { VideoPlayer, PlaybackStates }