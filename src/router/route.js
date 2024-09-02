import TestCompo from '@/components/TestCompo.vue';
import ProjectDetailPage from '@/views/ProjectDetailPage.vue';
import ProjectTest from '@/components/project/ProjectTest.vue';
import SearchProjectPage from '@/views/SearchProjectPage.vue'
import SearchMemberPage from '@/views/SearchMemberPage.vue';

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
        path: '/search/projects',
        name: 'SearchProject',
        component: SearchProjectPage,
    },
    {
        path: '/search/members',
        name: 'SearchMember',
        component: SearchMemberPage
    }
];
