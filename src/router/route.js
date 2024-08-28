import TestCompo from '@/components/TestCompo.vue';
import ProjectDetailPage from '@/views/ProjectDetailPage.vue';

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
];
