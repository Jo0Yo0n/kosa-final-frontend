import axios from 'axios';

const state = {
    isLogIn: false,
};

const getters = {
    isLogIn: (state) => state.isLogIn,
};

const mutations = {
    SET_LOGIN_STATUS(state, status) {
        state.isLogIn = status;
    },
};

const actions = {
    async checkLoginStatus({ commit }) {
        try {
            const response = await axios.get('/api/users/check-auth');
            commit('SET_LOGIN_STATUS', response.data.isAuthenticated);
        } catch (error) {
            console.error('로그인 상태 확인 중 오류 발생:', error);
            commit('SET_LOGIN_STATUS', false);
        }
    },
    async logout({ commit }) {
        try {
            await axios.delete('/api/users/logout');
            commit('SET_LOGIN_STATUS', false);
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
