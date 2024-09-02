import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import axios from 'axios';
import store from '@/store/index';
import { init } from '@/store/modules/projectStore';

Vue.config.productionTip = false;
Vue.prototype.$axios = axios; // axios를 전역으로 설정

init(store)
    .then(() => {
        new Vue({
            router,
            vuetify,
            store,
            render: (h) => h(App),
        }).$mount('#app');
    })
    .catch((Error) => {
        console.error('스토어 초기화 중 오류 발생 : ', Error);
    });
