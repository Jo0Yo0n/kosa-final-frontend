import TestCompo from '@/components/TestCompo.vue';
import ProjectDetailPage from '@/views/ProjectDetailPage.vue';
import ProjectTest from '@/components/project/ProjectTest.vue';

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
];
