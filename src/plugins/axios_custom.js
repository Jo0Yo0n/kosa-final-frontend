import axios from 'axios';

const axiosInstance = axios.create({
    withCredentials: true, // 쿠키설정
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.config && error.config.context) {
            const instance = error.config.context;
            if (error.response && error.response.status === 401) {
                instance.resultHeader = '저장 실패';
                instance.resultContent = error.response.data.message || '인증 에러가 발생하였습니다.';
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
