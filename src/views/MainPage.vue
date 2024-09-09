<!--
 * fileName       : SignupModal
 * author         : yunbin
 * date           : 2024-08-28
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-08-28        yunbin       최초 생성
 * 2024-09-06        Heeseon      top 10 프로젝트 조회
-->
<template>
    <v-container>
        <div class="top-project">
            <v-carousel
                cycle
                interval="10000"
                v-if="popularProjects && popularProjects.length"
                height="300px"
                active-class="custom-active-dot"
                class="custom-carousel"
                hide-delimiters="false"
            >
                <v-carousel-item v-for="project in popularProjects" :key="project.projectId" @click="goToDetailPage(project.projectId)">
                    <v-row class="fill-height ma-0">
                        <v-col cols="6" class="pa-0 d-flex align-center justify-center">
                            <v-img :src="project.imgUrl" width="100%" class="carousel-image" contain cover style="object-fit: cover; object-position: center"></v-img>
                        </v-col>
                        <v-col class="pa-7 d-flex flex-column justify-space-between">
                            <div class="project-info d-flex flex-column justify-space-between h-100">
                                <!-- Project Name with Extra Margin -->
                                <div class="project-title text-h4 font-weight-bold" style="margin-bottom: 20px">
                                    {{ project.name }}
                                </div>

                                <!-- 기술 스택 이미지 나열 -->
                                <div class="project-tech-stack ma-2 d-flex flex-wrap align-center" style="margin-bottom: 20px">
                                    <template v-for="tech in project.projectTechStack">
                                        <div v-if="tech.imgUrl" :key="tech.name" class="ma-1 tech-item">
                                            <v-avatar size="30" class="mb-1" tile>
                                                <v-img :src="tech.imgUrl" :alt="tech.name"></v-img>
                                            </v-avatar>
                                            <div class="caption text-center black--text">#{{ tech.name }}</div>
                                        </div>
                                        <v-chip v-else :key="tech.name" class="ma-2" outlined> #{{ tech.name }} </v-chip>
                                    </template>
                                </div>

                                <!-- 모집 포지션 나열 -->
                                <div class="recruitment-section d-flex flex-wrap" style="margin-bottom: 20px">
                                    <template v-for="recruitment in project.recruitmentName">
                                        <v-chip :key="recruitment" class="ma-1" color="brown" text-color="white" small pill>
                                            {{ recruitment }}
                                        </v-chip>
                                    </template>
                                </div>

                                <!-- 프로젝트 기간, 좋아요 및 팀 정보 아이콘 -->
                                <div class="d-flex align-center justify-space-between" style="margin-bottom: 20px">
                                    <span class="project-duration d-flex align-center">프로젝트 기간: {{ project.duration }}주</span>
                                    <div class="project-like d-flex align-center">
                                        <v-icon class="mr-2" color="red">mdi-heart</v-icon>
                                        <span class="mr-4">{{ project.cntLike }}</span>
                                        <v-icon class="mr-2" color="blue">mdi-account-group</v-icon>
                                        <span>{{ project.currentCnt }}/{{ project.teamCnt }}</span>
                                    </div>
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                </v-carousel-item>
            </v-carousel>
        </div>

        <div class="project-section">
            <h2 class="section-title">New! 최근에 올라온 프로젝트</h2>
            <ProjectList :projects="newProjects" />
        </div>

        <div class="project-section">
            <h2 class="section-title">Done! 최근에 완성된 프로젝트</h2>
            <ProjectList :projects="recentlyCompletedProjects" />
        </div>
    </v-container>
</template>
<script>
import ProjectList from '@/components/ProjectCardList.vue';
import axios from 'axios';

export default {
    name: 'MainPage',
    components: {
        ProjectList,
    },
    data() {
        return {
            // top 10 프로젝트
            popularProjects: [],
            newProjects: [],
            recentlyCompletedProjects: [],
        };
    },
    mounted() {
        this.fetchPopularProjects();
        this.fetchNewProjects();
        this.fetchRecentlyCompletedProjects();
    },
    methods: {
        goToDetailPage(projectId) {
            if (projectId) {
                this.$router.push({ name: 'ProjectDetail', params: { projectId: projectId } });
            } else {
                console.error('Invalid project ID');
            }
        },
        // fetchPopularProjects() {
        //   // Simulated API call - replace with real API call if necessary
        //   this.popularProjects = [
        //     {
        //       projectId: 1,
        //       name: 'Project Alpha',
        //       imgUrl: 'https://via.placeholder.com/150',
        //       projectTechStack: [
        //         { name: 'Vue.js', imgUrl: 'https://via.placeholder.com/30' },
        //         { name: 'Spring Boot', imgUrl: null },
        //       ],
        //       recruitmentName: ['Frontend', 'Backend'],
        //       duration: 12,
        //       cntLike: 25,
        //       currentCnt: 3,
        //       teamCnt: 5,
        //     },
        //     {
        //       projectId: 2,
        //       name: 'Project Beta',
        //       imgUrl: 'https://via.placeholder.com/150',
        //       projectTechStack: [
        //         { name: 'React', imgUrl: 'https://via.placeholder.com/30' },
        //         { name: 'Node.js', imgUrl: 'https://via.placeholder.com/30' },
        //       ],
        //       recruitmentName: ['Fullstack'],
        //       duration: 8,
        //       cntLike: 40,
        //       currentCnt: 5,
        //       teamCnt: 6,
        //     },
        //     {
        //       projectId: 3,
        //       name: 'Project Gamma',
        //       imgUrl: 'https://via.placeholder.com/150',
        //       projectTechStack: [
        //         { name: 'Angular', imgUrl: null },
        //         { name: 'Django', imgUrl: 'https://via.placeholder.com/30' },
        //       ],
        //       recruitmentName: ['UI/UX Designer'],
        //       duration: 10,
        //       cntLike: 18,
        //       currentCnt: 2,
        //       teamCnt: 4,
        //     },
        //   ];
        // },
        fetchPopularProjects() {
            axios
                .get('/api/projects/popular') // Adjust the URL according to your backend API
                .then((response) => {
                    this.popularProjects = response.data;
                })
                .catch((error) => {
                    console.error('Error fetching popular projects:', error);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        fetchNewProjects() {
            axios
                .get('/api/projects/new', {
                    params: {
                        page: 0, // 페이지 번호 (기본값으로 첫 번째 페이지)
                        size: 4, // 한 번에 가져올 프로젝트 수
                    },
                })
                .then((response) => {
                    this.newProjects = response.data.content; // 신규 프로젝트
                })
                .catch((error) => {
                    console.error('프로젝트를 가져오는 중 오류 발생: ', error);
                });
        },
        fetchRecentlyCompletedProjects() {
            axios
                .get('/api/projects/done', {
                    params: {
                        page: 0, // 페이지 번호 (기본값으로 첫 번째 페이지)
                        size: 4, // 한 번에 가져올 프로젝트 수
                    },
                })
                .then((response) => {
                    this.recentlyCompletedProjects = response.data.content; // 최근 종료한 프로젝트
                })
                .catch((error) => {
                    console.error('프로젝트를 가져오는 중 오류 발생: ', error);
                });
        },
    },
};
</script>

<style scoped>
.top-project {
    margin-bottom: 120px;
}

.project-title {
    margin-bottom: 20px; /* Adjust this value to control spacing */
}

.project-tech-stack {
    margin-bottom: 20px; /* Adjust this value for spacing */
    display: flex;
    flex-wrap: wrap;
}

.recruitment-section {
    margin-bottom: 16px; /* Evenly spaced with other sections */
}

.tech-item {
    margin: 5px; /* Spacing between tech stack icons */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.section-title {
    margin-bottom: 40px; /* 제목 아래쪽에 40px의 간격 추가 */
}
.project-section {
    margin-bottom: 50px;
}

.project-duration {
    margin-right: 10px;
}

.project-like span {
    margin-right: 10px;
}

.position-absolute {
    position: absolute;
}

.custom-carousel {
    background-color: white !important;
    width: 1200px !important;
    height: 300px !important;
    border-radius: 25px !important;
    border: 2px solid #d7ccc8;
}

.carousel-image {
    border: none;
    box-shadow: none;
}
</style>
