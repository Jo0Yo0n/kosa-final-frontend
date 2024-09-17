// store/modules/notification.js
import axiosInstance from '@/axiosInstance';
// import axios from 'axios';

const state = {
    requestAlarms: [],
    applicationResultAlarms: [],
    isShaking: false,
};

const mutations = {
    SET_REQUEST_ALARMS(state, alarms) {
        state.requestAlarms = alarms;
    },
    SET_APPLICATION_RESULT_ALARMS(state, alarms) {
        state.applicationResultAlarms = alarms;
    },
    SET_IS_SHAKING(state, isShaking) {
        state.isShaking = isShaking;
    },
    RESET_NOTIFICATIONS(state) {
        state.requestAlarms = [];
        state.applicationResultAlarms = [];
        state.isShaking = false;
    },
};

const actions = {
    async fetchNotifications({ commit, rootGetters }) {
        // memberStore.js의 isLogIn을 사용하여 로그인 상태인지 확인
        if (!rootGetters['member/isLogIn']) {
            console.log('로그인 상태가 아닙니다. 알림을 가져오지 않습니다.');
            return;
        }

        try {
            const response = await axiosInstance.get('/api/projects/notifications');
            commit('SET_REQUEST_ALARMS', response.data.requestAlarms);
            commit('SET_APPLICATION_RESULT_ALARMS', response.data.applicationResultAlarms);
            commit('SET_IS_SHAKING', false);
        } catch (error) {
            console.error('알림을 가져오는 중 오류 발생:', error);
        }
    },
    triggerAlarm({ commit, dispatch }) {
        commit('SET_IS_SHAKING', true);
        setTimeout(() => {
            commit('SET_IS_SHAKING', false);
        }, 800);
        dispatch('fetchNotifications');
    },
    startPolling({ dispatch }) {
        setInterval(() => {
            dispatch('fetchNotifications');
        }, 30000); // 30초마다 폴링
    },
    resetNotifications({ commit }) {
        commit('RESET_NOTIFICATIONS');
    },
};

const getters = {
    allNotifications: (state) => [...state.requestAlarms, ...state.applicationResultAlarms],
    totalNotifications: (state, getters) => getters.allNotifications.length,
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
