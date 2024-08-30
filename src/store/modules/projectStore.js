export const projectStore = {
    namespaced: true,
    state: {
        projectName: '',
        projectImage: null,
    },
    mutations: {
        setProjectName(state, name) {
            state.projectName = name;
        },
        setProjectImage(state, image) {
            state.projectImage = image;
        },
    },
    actions: {
        updateProjectName({ commit }, name) {
            commit('setProjectName', name);
        },
        updateProjectImage({ commit }, image) {
            commit('setProjectImage', image);
        },
        cancelAction({ commit }) {
            console.log(`취소버튼 클릭 ${commit}`);
        },
        submitAction({ commit }) {
            console.log(`제출버튼 클릭 ${commit}`);
        },
    },
    getters: {
        projectName: (state) => state.projectName,
        projectImage: (state) => state.projectImage,
    },
};
