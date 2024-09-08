<!--
 * fileName       : ProjectTest
 * author         : Yeong-Huns
 * date           : 2024-08-29
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-08-29        Yeong-Huns       최초 생성
 * 2024-08-29        Yeong-Huns       프로젝트 진행 기간 & 회고 주기 vuex 로 관리하기 (진행중 -> 연기)
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
import commonModal from '@/components/common/Modal/CommonModal.vue';
import { mapGetters } from 'vuex';

export default {
    name: 'ProjectTest',
    data() {
        return {
            showSuccessModal: false,
            resultHeader: '',
            resultContent: '',
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
                const response = await this.$axiosInstance.post('/api/projects', data, { context: this });
                console.log('프로젝트 저장 성공:', response.data);
                const projectId = response.data;

                this.resultHeader = '저장 성공';
                this.resultContent = '글 작성에 성공하였습니다.';
                this.showSuccessModal = true;

                await this.$router.push({ name: 'ProjectDetail', params: { projectId } });
            } catch (error) {
                // 인터셉터가 처리해서 필요없음
            }
        },
        async closeModal() {
            /*try {
                const response = await this.$axios.get('/node-api/get-member-id');
                console.log(response.data);
            } catch (err) {
                console.error(err);
            }*/
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
        <commonModal v-model="showSuccessModal" @close="closeModal">
            <template v-slot:title>{{ resultHeader }}</template>
            <template v-slot:content>{{ resultContent }}</template>
            <template v-slot:firstButton>
                <v-btn color="blue darken-1" text @click="closeModal">확인</v-btn>
            </template>
        </commonModal>
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
