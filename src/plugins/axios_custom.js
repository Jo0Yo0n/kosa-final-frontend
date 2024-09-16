import axios from 'axios';
import store from '@/store';

const axiosInstance = axios.create({
    withCredentials: true, // 쿠키설정
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = store.getters['member/getToken'];
        console.log(accessToken);
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
        if (error.config && error.config.context) {
            const instance = error.config.context;
            if (error.response && error.response.status === 401) {
                instance.resultHeader = '저장 실패';
                instance.resultContent = error.response.data.message || '인증 에러가 발생하였습니다.';
                //store.dispatch('member/logout'); // 로그아웃 처리
                console.error('인증 에러:', instance.resultContent);
            } else {
                instance.resultHeader = '저장 실패';
                instance.resultContent = '글 등록에 실패하였습니다.';
                console.error('프로젝트 저장 실패:', error);
            }
            instance.showSuccessModal = true;
        }
        return Promise.reject(error);
    },
);

export default axiosInstance;
