const state = {
    selectedChatRoom: null, // initially no room selected
};

const mutations = {
    setSelectedChatRoom(state, chatRoom) {
        state.selectedChatRoom = chatRoom;
    },
};
const actions = {
    selectChatRoom({ commit }, chatRoom) {
        commit('setSelectedChatRoom', chatRoom);
    },
};

const getters = {
    selectedChatRoom: (state) => state.selectedChatRoom,
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
