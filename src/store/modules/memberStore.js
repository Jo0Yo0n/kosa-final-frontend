import axiosInstance from '@/axiosInstance';
import { disconnectSocket } from '@/socket.js';

const state = {
    //isLogIn: !!localStorage.getItem('jwt'),
    //isStatusChecked: false, // 인증 상태가 확인되었는지 여부
    token: localStorage.getItem('jwt') || null,
};

const getters = {
    //isLogIn: (state) => state.isLogIn,
    isLogIn: (state) => !!state.token,
    //isStatusChecked: (state) => state.isStatusChecked,
    getToken: (state) => state.token,
};

const mutations = {
    // SET_LOGIN_STATUS(state, status) {
    //     state.isLogIn = status;
    //     state.isStatusChecked = true; // 상태 확인 완료
    // },
    SET_TOKEN(state, token) {
        state.token = token; // 토큰을 상태에 저장
        //state.isLogIn = true;
        localStorage.setItem('jwt', token); // 로컬 스토리지에 저장
    },
    LOGOUT(state) {
        //state.isLogIn = false;
        state.token = null;
        localStorage.removeItem('jwt'); // 로그아웃 시 로컬 스토리지에서도 제거
    },
};

const actions = {
    async login({ commit, dispatch }, token) {
        commit('SET_TOKEN', token); // 로그인 시 토큰 저장 및 상태 변경
        //connectSocket();

        // 로그인 시 알림 가져오기
        await dispatch('notificationStore/fetchNotifications', null, { root: true });
    },
    // async checkLoginStatus({ commit }) {
    //     try {
    //         const response = await axios.get('/api/users/check-auth');
    //         const isAuthenticated = response.data.isAuthenticated;
    //         commit('SET_LOGIN_STATUS', isAuthenticated);
    //
    //         if (isAuthenticated) {
    //             // 로그인 상태가 확인되면 소켓 연결
    //             connectSocket();
    //         } else {
    //             // 로그인 상태가 아니면 소켓 연결 해제
    //             disconnectSocket();
    //         }
    //     } catch (error) {
    //         console.error('로그인 상태 확인 중 오류 발생:', error);
    //         commit('SET_LOGIN_STATUS', false);
    //         disconnectSocket(); // 에러 발생 시에도 소켓 연결 해제
    //     }
    // },
    async logout({ commit, dispatch }) {
        try {
            await axiosInstance.delete('/api/users/logout');
            commit('LOGOUT');
            disconnectSocket(); // 로그아웃 시 소켓 연결 해제

            // 로그아웃 시 알림 초기화
            dispatch('notificationStore/resetNotifications', null, { root: true });
            console.log('알림 초기화');
        } catch (error) {
            console.error('로그아웃 중 오류 발생:', error);
        }
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
