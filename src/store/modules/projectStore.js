/*
 * fileName       : ProjectStore
 * author         : Yeong-Huns
 * date           : 2024-08-29
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-08-29        Yeong-Huns       최초 생성
 * 2024-08-30        Yeong-Huns       상태 관리
 * 2024-08-31        Yeong-Huns       S3 업로드 성공
 * 2024-09-01        Yeong-Huns       텍스트 에디터 이미지 처리 (진행중)
 */
import axios from 'axios';

export const projectStore = {
    namespaced: true,
    state: {
        projectName: '',
        projectImage: null,
        recruitmentRoles: [
            { jobId: 1, count: 1 }, // 리더
            { jobId: 9, count: 1 }, // 프론트엔드 개발
            { jobId: 2, count: 1 }, // 백엔드 개발
        ],
        roleOptions: null,
        techStack: [],
        knownTech: [],
        hasApplied: false,
    },
    mutations: {
        setProjectName(state, name) {
            state.projectName = name;
        },
        setProjectImage(state, image) {
            state.projectImage = image;
        },
        setRecruitmentRoles(state, roles) {
            state.recruitmentRoles = roles;
        },
        setRoleOptions(state, options) {
            state.roleOptions = options;
        },
        addTech(state, tech) {
            if (!state.techStack.includes(tech)) {
                state.techStack.push(tech);
            }
        },
        removeTech(state, index) {
            state.techStack.splice(index, 1);
        },
        setKnownTech(state, techData) {
            state.knownTech = techData;
        },
        resetState(state) {
            state.projectName = '';
            state.projectImage = null;
            state.recruitmentRoles = [
                { jobId: 1, count: 1 }, // 리더
                { jobId: 9, count: 1 }, // 프론트엔드 개발
                { jobId: 2, count: 1 }, // 백엔드 개발
            ];
            state.roleOptions = null;
            state.techStack = [];
            state.knownTech = [];
        },
        setHasApplied(state, status) {
            state.hasApplied = status;
        },
    },
    actions: {
        async updateProjectImage({ commit }, payload) {
            try {
                const formData = new FormData();
                formData.append('file', payload);

                const response = await axios.post('/api/file/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                const imageUrl = response.data;
                commit('setProjectImage', imageUrl);
            } catch (error) {
                console.error('S3 업로드 오류:', error);
            }
        },
        updateRecruitmentRoles({ commit }, roles) {
            commit('setRecruitmentRoles', roles);
        },
        async fetchRoleOptions({ commit, state }) {
            if (!state.roleOptions) {
                try {
                    const response = await axios.get('/api/jobs');
                    commit('setRoleOptions', response.data);
                } catch (error) {
                    console.error('직업 옵션을 가져오는데 실패했습니다:', error);
                }
            }
        },
        async fetchKnownTech({ commit, state }) {
            if (state.knownTech.length === 0) {
                try {
                    const response = await axios.get('/api/tech-stacks');
                    commit('setKnownTech', response.data);
                    console.log('fetchKnownTech 호출', response.data);
                } catch (error) {
                    console.error('fetchKnownTech 호출 에러 : ', error);
                }
            }
        },
        addTech({ commit }, tech) {
            commit('addTech', tech);
        },
        removeTechAction({ commit }, payload) {
            commit('removeTech', payload);
        },
        cancelAction({ commit }) {
            console.log(`취소버튼 클릭 ${commit}`);
        },
        submitAction({ commit }) {
            console.log(`제출버튼 클릭 ${commit}`);
        },
        async fetchApplicationStatus({ commit }, projectId) {
            try {
                const response = await axios.get(`/api/projects/${projectId}/applications/status`);
                commit('setHasApplied', response.data.hasApplied);
            } catch (error) {
                console.error('Error fetching application status:', error);
                commit('setHasApplied', false);
            }
        },
    },
    getters: {
        projectName: (state) => state.projectName,
        projectImage: (state) => state.projectImage,
        recruitmentRoles: (state) => state.recruitmentRoles,
        totalCount: (state) => state.recruitmentRoles.reduce((total, item) => total + item.count, 0),
        roleOptions: (state) => state.roleOptions,
        techStack: (state) => state.techStack,
        knownTech: (state) => state.knownTech,
        hasApplied: (state) => state.hasApplied,
    },
};

export const init = async (store) => {
    await store.dispatch('project/fetchRoleOptions');
    await store.dispatch('project/fetchKnownTech');
};
