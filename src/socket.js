import { io } from 'socket.io-client';
import { EventEmitter } from 'events';
import store from '@/store';

let socket = null;
export const eventEmitter = new EventEmitter();

// 소켓 객체를 생성 및 반환하는 함수
export function getSocket() {
    if (!socket) {
        const url = process.env.NODE_ENV === 'production' ? 'https://hesil.site/node-api' : 'http://localhost:7070';
        console.log('소켓연결성공 연결된 URL :', url);

        // 스토어에서 액세스 토큰을 가져옴
        const accessToken = store.getters['member/getToken'];
        console.log(`이것은 노드에 전해줄 엑세스 토큰이여 ${accessToken}`);

        // 소켓 객체 생성
        socket = io(url, {
            path: '/socket.io',
            transports: ['polling', 'websocket'],
            withCredentials: true,
            auth: {
                token: accessToken,
            },
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 2000,
        });

        // 이벤트 핸들러 설정
        registerSocketEvents();
    }
    return socket;
}

// 소켓 이벤트 핸들러 등록
function registerSocketEvents() {
    socket.on('connect', () => {
        console.log('소켓이 연결되었습니다:', socket.id);
        console.log('ip: ', socket.io.opts.hostname); // 접속한 호스트의 IP
    });

    socket.on('disconnect', (reason) => {
        console.log('소켓이 끊어졌습니다. 이유:', reason);
        // 필요에 따라 자동 재연결 로직을 추가할 수 있음
    });

    // 알람 이벤트 핸들러 등록
    socket.on('alarm', handleAlarm);

    // 소켓 연결 에러 발생 시 처리
    socket.on('connect_error', (error) => {
        console.error('소켓 연결 오류:', error);
    });

    // 소켓 재연결 시도 중 로그
    socket.on('reconnect_attempt', (attempt) => {
        console.log(`소켓 재연결 시도 중... (시도 횟수: ${attempt})`);
    });
}

// 알람 이벤트 핸들러
function handleAlarm(data) {
    const message = data.message;
    console.log('알람 수신:', message);

    // 이벤트 버스를 통해 알람 이벤트를 전달
    eventEmitter.emit('alarm', message);
}

// 로그인 상태가 확인되었을 때 소켓을 연결하는 함수
export function connectSocket() {
    if (!socket) {
        socket = getSocket();
    } else {
        // 이미 소켓이 존재하면, 재등록 없이 바로 사용
        console.log('이미 연결된 소켓을 사용합니다:', socket.id);
    }

    return socket;
}

export function disconnectSocket() {
    if (socket) {
        socket.off('alarm', handleAlarm);
        socket.disconnect();
        socket = null;
        console.log('소켓 연결이 해제되었습니다.');
    }
}
