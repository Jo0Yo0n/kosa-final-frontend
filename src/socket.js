import { io } from 'socket.io-client';
import { EventEmitter } from 'events';

let socket = null;
export const eventEmitter = new EventEmitter();

export function getSocket() {
    if (!socket) {
        const url = process.env.NODE_ENV === 'production' ? 'https://hesil.site/node-api' : 'http://localhost:7070';
        console.log('Connecting to socket at URL:', url);

        socket = io(url, {
            path: '/socket.io',
            transports: ['polling', 'websocket'],
            withCredentials: true,
        });
    }
    return socket;
}

// 로그인 상태가 확인되었을 때 소켓을 연결하는 함수
export function connectSocket() {
    if (!socket) {
        socket = getSocket();
    }

    socket.on('connect', () => {
        console.log('소켓이 연결되었습니다:', socket.id);
        console.log('ip: ', socket.remoteAddress);
    });

    socket.on('disconnect', () => {
        console.log('소켓이 끊어졌습니다.');
    });

    socket.on('alarm', (data) => {
        const message = data.message;
        console.log('알람 수신:', message);

        eventEmitter.emit('alarm', message);
    });

    return socket;
}

// 소켓 연결 해제
export function disconnectSocket() {
    if (socket) {
        socket.disconnect();
        socket = null;
        console.log('소켓 연결이 해제되었습니다.');
    }
}
