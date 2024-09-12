import { io } from 'socket.io-client';

let socket = null;

export function getSocket() {
    if (!socket) {
        socket = io('http://localhost:7070', {
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
        console.log('알람 수신:', data);

        // 알람 타입에 따른 처리
        switch (data.type) {
            case 'application-message':
                console.log('Application 메시지:', data.message);
                break;
            case 'approval-message':
                console.log('Approval 메시지:', data.message);
                break;
            default:
                console.log('알 수 없는 알람 타입:', data.type);
        }
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
