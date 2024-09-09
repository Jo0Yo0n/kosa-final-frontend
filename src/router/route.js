import ProjectDetailPage from '@/views/ProjectDetailPage.vue';
import ProjectPost from '@/views/ProjectPost.vue';
import SearchProjectPage from '@/views/SearchProjectPage.vue';
import SearchMemberPage from '@/views/SearchMemberPage.vue';
import SearchAllPage from '@/views/SearchAllPage.vue';
import MainPage from '@/views/MainPage.vue';
import MyPage from '@/views/MyPage.vue';

export default [
    {
        path: '/projects/:projectId',
        name: 'ProjectDetail',
        component: ProjectDetailPage,
    },
    {
        path: '/projects',
        name: 'projectPost',
        component: ProjectPost,
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
    },
    {
        path: '/search/all',
        name: 'SearchAll',
        component: SearchAllPage,
    },
    {
        path: '/',
        name: 'MainPage',
        component: MainPage,
    },
    {
        path: "/me",
        name: "MyPage",
        component: MyPage,
    }
];
