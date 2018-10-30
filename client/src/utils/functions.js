function isSafari() {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('safari') !== -1) {
        if (ua.indexOf('chrome') > -1) {
            return true;
        } else {
            return false;
        }
    }
}

export {
    isSafari
}