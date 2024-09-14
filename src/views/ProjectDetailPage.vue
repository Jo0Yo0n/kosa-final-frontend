<!--
 * fileName       : ProjectDetailPage
 * author         : JooYoon
 * date           : 2024-08-28
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-08-28        JooYoon       최초 생성
 * 2024-09-07        Yeong-Huns    v-tab-item 에 v-if 추가
 * 2024-09-13        Yeong-Huns    project 지원시, project 지원자 목록 최신화.
 * 2024-09-14        Yeong-Huns    소켓이벤트 구독처리 .
-->
<template>
    <v-container>
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
                <project-info :project="project" @project-applied-to-parent="fetchProjectRecruitment" />
            </v-tab-item>
            <v-tab-item v-if="this.project.status !== 0">
                <project-retrospective :project="project" />
            </v-tab-item>
            <v-tab-item v-if="this.project.status === 0">
                <project-management :project_recruitment="project_recruitment" />
            </v-tab-item>
        </v-tabs-items>
    </v-container>
</template>

<script>
import ProjectInfo from '@/components/project-detail/ProjectInfo.vue';
import ProjectRetrospective from '@/components/project-retrospective/ProjectRetrospective.vue';
import ProjectManagement from '@/components/project-detail/ProjectManagement.vue';
import { eventEmitter } from '@/socket';

export default {
    name: 'ProjectDetailPage',
    components: { ProjectManagement, ProjectInfo, ProjectRetrospective },
    data() {
        return {
            project: {},
            project_recruitment: [],
            activeTab: 0,
            isFetching: false,
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
    beforeCreated() {
        this.isFetching = false; // beforeCreate에서 플래그를 설정하여 초기화를 방지
        console.log('beforeCreated 실행');
    },
    mounted() {
        console.log('Mounted 실행');
        eventEmitter.on('alarm', this.handleAlarm);
        this.fetchProjectData();
    },
    beforeDestroy() {
        eventEmitter.off('alarm', this.handleAlarm);
    },
    methods: {
        handleAlarm(message) {
            switch (message.type) {
                case 'application-message':
                    this.fetchProjectRecruitment();

                    break;
                case 'approval-message':
                    this.fetchProjectRecruitment();
                    this.fetchProjectDetails();
                    break;
                default:
                    console.log('알 수 없는 알람 타입:', message.type);
            }
        },
        async fetchProjectData() {
            if (this.isFetching) {
                console.warn('이미 데이터 가져오는 중입니다. 요청을 건너뜁니다.');
                return; // 이미 요청 중이면 중단
            }
            this.isFetching = true; // 요청 시작
            try {
                console.log('fetchProjectDetails 호출');
                await this.fetchProjectDetails();
                console.log('fetchProjectRecruitment 호출');
                await this.fetchProjectRecruitment();
            } catch (error) {
                console.error('데이터 가져오는 중 오류 발생:', error);
            } finally {
                this.isFetching = true; // 요청 완료
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
            } finally {
                console.log('fetchProjectDetails 실행');
            }
        },
        async fetchProjectRecruitment() {
            try {
                const response = await this.$axios.get(`/api/projects/${this.$route.params.projectId}/applications`);
                console.log(`😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋`);
                console.log(response.data);
                this.project_recruitment = response.data;
            } catch (error) {
                console.error('지원자를 불러오는 과정에서 에러 발생 : ', error);
            } finally {
                console.log('fetchProjectRecruitment 실행');
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
