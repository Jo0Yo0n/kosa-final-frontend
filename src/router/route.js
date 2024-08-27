import TestCompo from '@/components/TestCompo.vue';
import TipTap from '@/components/editor/TipTap.vue';

export default [
    {
        path: '/',
        name: 'TestCompo',
        component: TestCompo,
    },
    {
        path: '/editor-test',
        name: 'EditorTest',
        component: TipTap,
    },
];
