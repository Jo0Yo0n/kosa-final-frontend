import Vue from 'vue';
import Vuex from 'vuex';
import { projectStore } from './modules/projectStore';
Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        project: projectStore,
    },
});

export default store;
