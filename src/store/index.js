import Vue from 'vue';
import Vuex from 'vuex';
import { projectStore } from './modules/projectStore';
import memberStore from './modules/memberStore';
import chatStore from './modules/chatStore';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        project: projectStore,
        member: memberStore,
        chat: chatStore,
    },
});

export default store;
