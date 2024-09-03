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
        <v-row justify="center" align="center">
            <v-col cols="12" class="text-center">
                <h1 class="ma-2">{{ project.name }}</h1>
                <v-chip :color="getStatusColor(project.status)" text-color="white">
                    {{ getStatusText(project.status) }}
                </v-chip>
            </v-col>
        </v-row>

        <v-row v-if="project.status === 1" justify="center">
            <v-col cols="12" sm="8" md="6" lg="4">
                <div class="position-relative ma-10">
                    <div class="date-labels d-flex justify-space-between mb-1">
                        <span class="caption">{{ formatDate(startDate) }}</span>
                        <span class="caption">{{ formatDate(currentDate) }}</span>
                        <span class="caption">{{ formatDate(endDate) }}</span>
                    </div>
                    <v-progress-linear :value="progressValue" color="brown" height="5"></v-progress-linear>
                </div>
            </v-col>
        </v-row>

        <v-tabs v-model="activeTab" class="mt-10">
            <v-tab>정보</v-tab>
            <v-tab v-if="this.project.status !== 0">회고</v-tab>
            <v-tab v-if="this.project.status === 0">관리</v-tab>
        </v-tabs>

        <v-tabs-items v-model="activeTab">
            <v-tab-item>
                <project-info :project="project" />
            </v-tab-item>
            <v-tab-item>
                <project-retrospective :project="project" />
            </v-tab-item>
            <v-tab-item>
                <project-management />
            </v-tab-item>
        </v-tabs-items>
    </v-container>
</template>

<script>
import ProjectInfo from '@/components/project-detail/ProjectInfo.vue';
import ProjectRetrospective from '@/components/project-retrospective/ProjectRetrospective.vue';
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
    computed: {
        startDate() {
            return new Date(this.project.startedAt);
        },
        endDate() {
            return new Date(this.startDate.getTime() + this.project.duration * 7 * 24 * 60 * 60 * 1000);
        },
        currentDate() {
            return new Date();
        },
        progressValue() {
            if (!this.project.startedAt || !this.project.duration) {
                return 0;
            }

            if (this.currentDate >= this.endDate) {
                return 100;
            }

            const totalDuration = this.endDate - this.startDate;
            const elapsedDuration = this.currentDate - this.startDate;
            return Math.round((elapsedDuration / totalDuration) * 100);
        },
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

        formatDate(date) {
            return date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' });
        },
    },
};
</script>

<style scoped>
.position-relative {
    position: relative;
}

.date-labels {
    position: absolute;
    width: 100%;
    top: -20px;
}
</style>
