function neatTime(time) {
    var minutes = Math.floor((time % 3600)/60);
    var seconds = Math.floor(time % 60);
    seconds = seconds > 9 ? seconds : `0${seconds}`;
    return `${minutes}:${seconds}`;
}

export { neatTime }