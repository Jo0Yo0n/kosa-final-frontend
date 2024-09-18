<template>
    <v-container v-if="!isFetching">
        <!-- 로딩이 완료된 후에만 전체 UI 렌더링 -->
        <v-row align="center" justify="center">
            <v-col class="text-center" cols="12">
                <h1 class="ma-2">{{ project.name }}</h1>
                <v-chip :color="getStatusColor(project.status)" text-color="white">
                    {{ getStatusText(project.status) }}
                </v-chip>
            </v-col>
        </v-row>

        <v-row v-if="project.status === 1" justify="center">
            <v-col cols="12" lg="4" md="6" sm="8">
                <div class="position-relative ma-10">
                    <div class="date-labels d-flex justify-space-between mb-1">
                        <span class="caption">{{ formatDate(startDate) }}</span>
                        <span class="caption">{{ formatDate(endDate) }}</span>
                    </div>
                    <v-progress-linear :value="progressValue" color="brown" height="5"></v-progress-linear>
                </div>
            </v-col>
        </v-row>

        <v-tabs v-model="activeTab" class="mt-10">
            <v-tab>정보</v-tab>
            <v-tab v-if="this.project.status !== 0 && !showManagementTab">회고</v-tab>
            <v-tab v-if="showManagementTab">관리</v-tab>
        </v-tabs>

        <v-tabs-items v-model="activeTab">
            <v-tab-item>
                <project-info :project="project" @project-applied-to-parent="fetchProjectRecruitment" />
            </v-tab-item>
            <v-tab-item v-if="this.project.status !== 0 && !showManagementTab">
                <project-retrospective :project="project" />
            </v-tab-item>
            <v-tab-item v-if="showManagementTab">
                <project-management :project_recruitment="project_recruitment" @approval-success="fetchProjectDetails" />
            </v-tab-item>
        </v-tabs-items>
    </v-container>

    <!-- 로딩 스피너 -->
    <v-container v-else>
        <v-row align="center" justify="center">
            <v-col class="text-center" cols="12">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import ProjectInfo from '@/components/project-detail/ProjectInfo.vue';
import ProjectRetrospective from '@/components/project-retrospective/ProjectRetrospective.vue';
import ProjectManagement from '@/components/project-detail/ProjectManagement.vue';
import { eventEmitter } from '@/socket';
import { mapState, mapActions } from 'vuex';
import axiosInstance from '@/axiosInstance';

export default {
    name: 'ProjectDetailPage',
    components: { ProjectManagement, ProjectInfo, ProjectRetrospective },
    data() {
        return {
            project: {},
            project_recruitment: [],
            activeTab: 0,
            isFetching: true, // 로딩 상태로 초기 설정
            showManagementTab: false,
        };
    },
    computed: {
        ...mapState('project', ['hasApplied']),
        startDate() {
            return new Date(this.project.updatedAt);
        },
        endDate() {
            return new Date(this.startDate.getTime() + this.project.duration * 7 * 24 * 60 * 60 * 1000);
        },
        currentDate() {
            return new Date();
        },
        progressValue() {
            if (!this.project.updatedAt || !this.project.duration) {
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
    async mounted() {
        console.log('Mounted 실행');
        eventEmitter.on('alarm', this.handleAlarm);
        try {
            await this.fetchProjectData();
            await this.fetchApplicationStatus(this.$route.params.projectId);
        } catch (error) {
            console.error('Error fetching project data:', error);
        }
    },
    beforeDestroy() {
        eventEmitter.off('alarm', this.handleAlarm);
    },
    methods: {
        ...mapActions('project', ['fetchApplicationStatus', 'fetchApplicationStatus']),

        handleAlarm(message) {
            switch (message.type) {
                case 'application-message':
                    this.fetchProjectRecruitment();
                    break;
                case 'approval-message':
                    this.fetchProjectRecruitment();
                    this.fetchProjectDetails();
                    this.fetchApplicationStatus(this.$route.params.projectId);
                    break;
                default:
                    console.log('알 수 없는 알람 타입:', message.type);
            }
        },

        async fetchProjectData() {
            try {
                console.log('fetchProjectDetails 호출');
                await this.fetchProjectDetails();
                await this.fetchProjectRecruitment();

                // project.leader.memberId를 백엔드로 전송하여 확인
                const response = await axiosInstance.post('/api/projects/isLeader', {
                    memberId: this.project.leader.memberId,
                });
                if (response.data === true && this.project.status === 0) {
                    this.showManagementTab = true;
                }
            } catch (error) {
                console.error('데이터 가져오는 중 오류 발생:', error);
            } finally {
                this.isFetching = false; // 모든 데이터 로드 후 로딩 상태 해제
            }
        },
        async fetchProjectDetails() {
            try {
                const response = await this.$axios.get(`/api/projects/${this.$route.params.projectId}`);
                this.project = response.data;
            } catch (error) {
                console.error('Error fetching project details:', error);
                alert('프로젝트 정보를 불러오는 중 에러가 발생했습니다.');
                await this.$router.push('/');
            }
        },
        async fetchProjectRecruitment() {
            try {
                const response = await this.$axios.get(`/api/projects/${this.$route.params.projectId}/applications`);
                this.project_recruitment = response.data;
            } catch (error) {
                console.error('지원자를 불러오는 과정에서 에러 발생 : ', error);
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
            return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'short', day: 'numeric' });
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
