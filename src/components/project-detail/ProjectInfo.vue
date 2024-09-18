<!--
 * fileName       : ProjectInfo
 * author         : JooYoon
 * date           : 2024-08-28
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-08-28        JooYoon       최초 생성
 * 2024-09-13        Yeong-Huns    project 지원시, project 지원자 목록 최신화.
-->
<template>
    <div class="pa-4">
        <leader-info :leader="project.leader" />

        <v-divider class="my-6" />

        <recruitment-status v-if="project.status === 0" :recruitments="project.recruitments" :projectId="project.projectId" @project-applied="handleProjectApplied" />

        <v-divider v-if="project.status === 0" class="my-6" />

        <project-description :description="project.description" />

        <v-divider class="my-6" />

        <tech-stack :projectTechStack="project.projectTechStack" />

        <v-divider class="my-6" />

        <project-members :recruitments="project.recruitments" />
    </div>
</template>

<script>
import LeaderInfo from '@/components/project-detail/LeaderInfo.vue';
import RecruitmentStatus from '@/components/project-detail/RecruitmentStatus.vue';
import ProjectDescription from '@/components/project-detail/ProjectDescription.vue';
import TechStack from '@/components/project-detail/TechStack.vue';
import ProjectMembers from '@/components/project-detail/ProjectMembers.vue';

export default {
    name: 'ProjectInfo',
    components: { ProjectMembers, TechStack, ProjectDescription, RecruitmentStatus, LeaderInfo },
    props: {
        project: {
            type: Object,
        },
    },
    methods: {
        handleProjectApplied() {
            // 부모의 부모 컴포넌트로 이벤트 전달
            this.$emit('project-applied-to-parent');
        },
    },
};
</script>

<style scoped></style>
