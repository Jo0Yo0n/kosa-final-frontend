import axios from 'axios';
import { connectSocket, disconnectSocket } from '@/socket.js';

const state = {
    isLogIn: false,
    isStatusChecked: false, // 인증 상태가 확인되었는지 여부
};

const getters = {
    isLogIn: (state) => state.isLogIn,
    isStatusChecked: (state) => state.isStatusChecked,
};

const mutations = {
    SET_LOGIN_STATUS(state, status) {
        state.isLogIn = status;
        state.isStatusChecked = true; // 상태 확인 완료
    },
};

const actions = {
    async checkLoginStatus({ commit }) {
        try {
            const response = await axios.get('/api/users/check-auth');
            const isAuthenticated = response.data.isAuthenticated;
            commit('SET_LOGIN_STATUS', isAuthenticated);

            if (isAuthenticated) {
                // 로그인 상태가 확인되면 소켓 연결
                connectSocket();
            } else {
                // 로그인 상태가 아니면 소켓 연결 해제
                disconnectSocket();
            }
        } catch (error) {
            console.error('로그인 상태 확인 중 오류 발생:', error);
            commit('SET_LOGIN_STATUS', false);
            disconnectSocket(); // 에러 발생 시에도 소켓 연결 해제
        }
    },
    async logout({ commit }) {
        try {
            await axios.delete('/api/users/logout');
            commit('SET_LOGIN_STATUS', false);
            disconnectSocket(); // 로그아웃 시 소켓 연결 해제
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
