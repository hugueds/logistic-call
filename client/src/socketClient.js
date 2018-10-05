import openSocket from 'socket.io-client';
import CONFIG from './config';

const socket = openSocket(CONFIG.socketServer);

function subscribe(topic, callback) {
    socket.on(topic, data => callback(null, data));
}

function emit(topic, data) {
    socket.emit(topic, data);
}

export { subscribe, emit }