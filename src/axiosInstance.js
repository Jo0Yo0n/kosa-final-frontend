import axios from 'axios';
import store from '@/store';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = store.getters['member/getToken'];

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
            //console.log(accessToken);
        }
        console.log(config);
        return config;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    (response) => {
        const newToken = response.headers['authorization']?.replace('Bearer ', '');
        if (newToken) {
            store.commit('member/SET_TOKEN', newToken);
        }
        return response;
    },

    (error) => {
        if (error.response && error.response.status === 401) {
            // store.dispatch('member/logout'); // 로그아웃 처리
            console.error('인증 에러:', error);
        }
        return Promise.reject(error);
    },
);

export default axiosInstance;
