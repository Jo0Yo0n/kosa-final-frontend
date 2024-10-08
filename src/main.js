import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import axios from 'axios';
import axiosInstance from '@/plugins/axios_custom';
import store from '@/store/index';
import { init } from '@/store/modules/projectStore';
import './assets/css/fonts.css';

Vue.config.productionTip = false;
Vue.prototype.$axios = axios; // axios를 전역으로 설정
Vue.prototype.$axiosInstance = axiosInstance;
// Axios 전역 설정
//Vue.prototype.$axios.defaults.withCredentials = true;

// CSRF 토큰을 쿠키에서 가져와 설정
// const csrfToken = document.cookie
//     .split('; ')
//     .find((row) => row.startsWith('XSRF-TOKEN='))
//     ?.split('=')[1];
//
// console.log('csrfToken', csrfToken);
//
// if (csrfToken) {
//     Vue.prototype.$axios.defaults.headers.common['X-XSRF-TOKEN'] = csrfToken;
// }

init(store)
    .then(() => {
        new Vue({
            router,
            vuetify,
            store,
            render: (h) => h(App),
            beforeCreate() {
                const token = localStorage.getItem('jwt');
                if (token) {
                    console.log('로컬 스토리지에 토큰 있음:', token);
                    this.$store.commit('member/SET_TOKEN', token);
                } else {
                    console.log('로컬 스토리지에 토큰 없음');
                }
            },
        }).$mount('#app');
    })
    .catch((Error) => {
        console.error('스토어 초기화 중 오류 발생 : ', Error);
    });
/*

new Vue({
    router,
    vuetify,
    store,
    render: (h) => h(App),
}).$mount('#app');
*/
