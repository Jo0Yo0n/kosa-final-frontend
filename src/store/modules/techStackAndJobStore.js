import axios from 'axios';

const actions = {
    async fetchTechStacksAndJobs({ commit }) {
        commit('setLoading', true);
        try {
            const [techStacksResponse, jobsResponse] = await Promise.all([axios.get('/api/tech-stacks'), axios.get('/api/jobs')]);
            commit('setTechStacks', techStacksResponse.data);
            commit('setJobs', jobsResponse.data);
        } catch (error) {
            commit('setError', error);
        } finally {
            commit('setLoading', false);
        }
    },
};

const mutations = {
    setTechStacks: (state, techStacks) => {
        state.techStacks = Array.isArray(techStacks) ? techStacks : [];
    },
    setJobs: (state, jobs) => {
        state.jobs = Array.isArray(jobs) ? jobs : [];
    },
    setLoading: (state, loading) => (state.loading = loading),
    setError: (state, error) => (state.error = error),
};

const state = {
    techStacks: [],
    jobs: [],
    loading: false,
    error: null,
};

const getters = {
    allTechStacks: (state) => state.techStacks,
    allJobs: (state) => state.jobs,
    isLoading: (state) => state.loading,
    hasError: (state) => !!state.error,
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
