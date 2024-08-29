export const projectStore = {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
        cancelAction({ commit }) {
            console.log(`취소버튼 클릭 ${commit}`);
        },
        submitAction({ commit }) {
            console.log(`제출버튼 클릭 ${commit}`);
        },
        tempAction({ commit }) {
            console.log(`임시저장 클릭 ${commit}`);
        },
    },
    getters: {},
};
