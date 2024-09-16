import axios from 'axios';
import store from '@/store';
import router from '@/router';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = store.getters['member/getToken'];

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
            console.log(accessToken);
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
    (response) => response,

    (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // 무한 루프 방지

            try {
                // 재발급된 토큰을 응답 헤더에서 가져오기
                const newToken = error.response.headers['Authorization']?.replace('Bearer ', '');

                if (newToken) {
                    // 새로운 토큰 저장
                    store.commit('member/SET_TOKEN', newToken);

                    // 새로운 토큰을 Authorization 헤더에 추가
                    originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

                    // 기존 요청 재시도
                    return axiosInstance(originalRequest);
                } else {
                    throw new Error('재발급된 토큰이 없습니다.');
                }
            } catch (err) {
                console.log('토큰 재발급 실패:', err);
                store.dispatch('member/logout'); // 로그아웃 처리

                alert('로그아웃 처리되었습니다.');

                if (router.currentRoute.path !== '/') {
                    router.push('/'); // 메인 페이지로 이동
                }
            }
        }

        return Promise.reject(error);
    },
);

export default axiosInstance;
