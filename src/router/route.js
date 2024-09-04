import TestCompo from '@/components/TestCompo.vue';
import ProjectDetailPage from '@/views/ProjectDetailPage.vue';
import ProjectTest from '@/components/project/ProjectTest.vue';
import MainPage from '@/views/MainPage.vue';

export default [
    {
        path: '/',
        name: 'TestCompo',
        component: TestCompo,
    },

    {
        path: '/projects/:projectId',
        name: 'ProjectDetail',
        component: ProjectDetailPage,
    },

    {
        path: '/projectTest',
        name: 'projectTest',
        component: ProjectTest,
    },
    {
        path: '/main-page',
        name: 'MainPage',
        component: MainPage,
    },
];
