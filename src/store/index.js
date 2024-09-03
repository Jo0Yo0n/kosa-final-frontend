import Vue from 'vue';
import Vuex from 'vuex';
import { projectStore } from './modules/projectStore';
import memberStore from './modules/memberStore';
import techStackAndJobStore from './modules/techStackAndJobStore';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        project: projectStore,
        member: memberStore,
        techStackAndJob: techStackAndJobStore,
    },
});

export default store;
