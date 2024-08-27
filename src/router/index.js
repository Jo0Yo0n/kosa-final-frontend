import Vue from 'vue';
import VueRouter from 'vue-router';
import route from './route';
import PageNotFound from '@/components/PageNotFound.vue';

Vue.use(VueRouter);

const base_router = [{ path: '/:path(.*)*', component: PageNotFound }];
// 모든 경로 매칭(정규표현식) & params 는 넘겨서 오류 페이지에서 확인할 수 있도록 변경 - kyh
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [...route, ...base_router],
});

export default router;
