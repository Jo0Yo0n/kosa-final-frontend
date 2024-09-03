<!--
 * fileName       : ProjectTest
 * author         : Yeong-Huns
 * date           : 2024-08-29
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-08-29        Yeong-Huns       최초 생성
-->
<script>
import card from '@/components/project/CardCompo.vue';
import editor from '@/components/project/ProjectEditor.vue';
import projectName from '@/components/project/ProjectName.vue';
import projectImage from '@/components/project/ProjectImage.vue';
import projectRecruitment from '@/components/project/ProjectRecruitment.vue';
import projectTechStack from '@/components/project/ProjectTechStack.vue';
import projectDuration from '@/components/project/ProjectDuration.vue';
import projectCycle from '@/components/project/ProjectCycle.vue';
import commonModal from '@/components/commonModal/CommonModal.vue';
import { mapGetters } from 'vuex';
import axios from 'axios';
export default {
    name: 'ProjectTest',
    data() {
        return {
            showSuccessModal: false,
        };
    },
    components: {
        card,
        editor,
        projectName,
        projectImage,
        projectRecruitment,
        projectTechStack,
        projectDuration,
        projectCycle,
        commonModal,
    },
    computed: {
        ...mapGetters('project', ['projectName', 'projectImage', 'recruitmentRoles', 'techStack']),
    },
    methods: {
        cancelAction() {
            this.$router.go(-1);
        },
        submitAction() {
            const editorContent = this.$refs.editor.getEditorContent();
            const allState = {
                projectName: this.projectName,
                projectImage: this.projectImage,
                recruitmentRoles: this.recruitmentRoles,
                content: editorContent,
                techStack: this.techStack,
                duration: this.$refs.projectDuration.selectedDuration, // ProjectDuration 컴포넌트에서 선택된 기간 가져오기
                cycle: this.$refs.projectCycle.selectedCycle,
            };
            console.log('모든 상태:', allState);
            this.saveProject(allState);
        },
        async saveProject(data) {
            try {
                const response = await axios.post('/api/projects', data);
                console.log('프로젝트 저장 성공:', response.data);
                this.showSuccessModal = true;
            } catch (error) {
                console.error('프로젝트 저장 실패:', error);
            }
        },
        closeModal() {
            this.showSuccessModal = false;
        },
    },
};
</script>

<template>
    <div>
        <card></card>
        <projectName></projectName>
        <projectImage></projectImage>
        <projectRecruitment></projectRecruitment>
        <editor ref="editor"></editor>
        <projectTechStack></projectTechStack>
        <projectDuration ref="projectDuration"></projectDuration>
        <projectCycle ref="projectCycle"></projectCycle>
        <v-container>
            <v-row justify="center" class="mt-4">
                <v-btn class="coffee-btn" color="#49454f" @click="cancelAction" outlined> 취소 </v-btn>

                <v-btn color="#49454f" @click="submitAction" outlined> 작성완료 </v-btn>
            </v-row>
        </v-container>
        <commonModal v-model="showSuccessModal" @close="closeModal"></commonModal>
    </div>
</template>

<style scoped>
.v-btn {
    margin: 0 10px;
}
.coffee-btn {
    background-color: #efebe9;
}
</style>
