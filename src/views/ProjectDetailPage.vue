<!--
 * fileName       : ProjectDetailPage
 * author         : JooYoon
 * date           : 2024-08-28
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-08-28        JooYoon       최초 생성
-->
<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1>{{ project.name }}</h1>
                <v-chip :color="getStatusColor(project.status)" text-color="white">
                    {{ getStatusText(project.status) }}
                </v-chip>
            </v-col>
        </v-row>

        <v-row v-if="project.status === 1">
            <v-col cols="12">
                <v-progress-linear :value="getProgressValue()" height="25" striped></v-progress-linear>
            </v-col>
        </v-row>

        <v-tabs v-model="activeTab">
            <v-tab>정보</v-tab>
            <v-tab>회고</v-tab>
            <v-tab>관리</v-tab>
        </v-tabs>

        <v-tabs-items v-model="activeTab">
            <v-tab-item>
                <project-info :project="project"></project-info>
            </v-tab-item>
            <v-tab-item>
                <project-retrospective></project-retrospective>
            </v-tab-item>
            <v-tab-item>
                <project-management></project-management>
            </v-tab-item>
        </v-tabs-items>
    </v-container>
</template>

<script>
import ProjectInfo from '@/components/ProjectInfo.vue';
import ProjectRetrospective from '@/components/ProjectRetrospective.vue';
import ProjectManagement from '@/components/ProjectManagement.vue';

export default {
    name: 'ProjectDetailPage',
    components: { ProjectManagement, ProjectInfo, ProjectRetrospective },
    data() {
        return {
            project: {},
            activeTab: 0,
        };
    },
    created() {
        this.fetchProjectDetails();
    },
    methods: {
        async fetchProjectDetails() {
            try {
                const response = await this.$axios.get(`/api/projects/${this.$route.params.projectId}`);
                this.project = response.data;
            } catch (error) {
                console.error('Error fetching project details:', error);
            }
        },
        getStatusColor(status) {
            switch (status) {
                case 0:
                    return 'green';
                case 1:
                    return 'blue';
                case 2:
                    return 'grey';
            }
        },
        getStatusText(status) {
            switch (status) {
                case 0:
                    return '모집 중';
                case 1:
                    return '진행 중';
                case 2:
                    return '종료';
            }
        },
        getProgressValue() {
            if (!this.project.startedAt || !this.project.duration) {
                return 0;
            }

            const startDate = new Date(this.project.startedAt);
            const endDate = new Date(startDate.getTime() + this.project.duration * 24 * 60 * 60 * 1000);
            const currentDate = new Date();

            if (currentDate >= endDate) {
                return 100;
            }

            const totalDuration = endDate - startDate;
            const elapsedDuration = currentDate - startDate;
            return Math.round((elapsedDuration / totalDuration) * 100);
        },
    },
};
</script>

<style scoped></style>
