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
          interval="5000"
          v-if="popularProjects && popularProjects.length"
          height="400px"
      >
        <v-carousel-item
            v-for="project in popularProjects"
            :key="project.projectId"
            @click="goToDetailPage(project.projectId)"
        >
          <v-row class="fill-height ma-0">
            <v-col cols="6" class="pa-0">
              <v-img
                  :src="project.imgUrl"
                  height="100%"
                  contain
              ></v-img>
            </v-col>
            <v-col cols="6" class="pa-0 d-flex flex-column justify-space-between">
              <v-card flat class="d-flex flex-column justify-space-between h-100">
                <v-card-title class="text-h4 font-weight-bold">{{ project.name }}</v-card-title>

                <!-- 기술 스택 이미지 나열 -->
                <v-card-subtitle class="project-tech-stack mt-2 d-flex flex-wrap">
                  <template v-for="tech in project.projectTechStack">
                    <div v-if="tech.imgUrl" :key="tech.name" class="ma-1 tech-item">
                      <v-avatar size="30" class="mb-1">
                        <v-img :src="tech.imgUrl" :alt="tech.name"></v-img>
                      </v-avatar>
                      <div class="caption text-center black--text">#{{ tech.name }}</div>
                    </div>
                    <div v-else :key="tech.name" class="ma-1 tech-item">
                      <v-avatar
                          class="mb-1"
                          size="30"
                          style="width: 60px; height: 30px; background-color: #e0e0e0; color: #000; text-align: center; line-height: 30px; border-radius: 15px; display: flex; align-items: center; justify-content: center;"
                      >
                        #{{ tech.name }}
                      </v-avatar>
                    </div>
                  </template>
                </v-card-subtitle>

                <!-- 모집 포지션 나열 -->
                <v-card-subtitle class="recruitment-section mt-2 d-flex flex-wrap">
                  <template v-for="recruitment in project.recruitmentName" >
                    <v-chip
                        :key="recruitment"
                        class="ma-1"
                        color="blue-grey lighten-4"
                        text-color="blue-grey darken-2"
                        style="border-radius: 20px; height: 30px; min-width: 100px; text-align: center;"
                    >
                      {{ recruitment }}
                    </v-chip>
                  </template>
                </v-card-subtitle>


                <!-- 프로젝트 기간 -->
                <v-card-text class="project-duration">
                  프로젝트 기간: {{ project.duration }}주
                </v-card-text>

                <!-- 좋아요 및 팀 정보 아이콘 오른쪽 하단 배치 -->
                <v-card-text class="project-like d-flex align-center justify-end position-absolute" style="bottom: 16px; right: 16px;">
                  <v-icon class="mr-2">mdi-heart</v-icon>
                  <span class="mr-4">{{ project.cntLike }}</span>
                  <v-icon class="mr-2">mdi-account-group</v-icon>
                  <span>{{ project.currentCnt }}/{{ project.teamCnt }}</span>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-carousel-item>
      </v-carousel>
    </div>

    <div class="project-section">
      <h2>New! 최근에 올라온 프로젝트</h2>
      <ProjectList :projects="newProjects" />
    </div>

    <div class="project-section">
      <h2>Done! 최근에 완성된 프로젝트</h2>
      <ProjectList :projects="recentlyCompletedProjects" />
    </div>

  </v-container>
</template>
<script>
import ProjectList from "@/components/ProjectCardList.vue";
import axios from "axios";


export default {
  name: 'MainPage',
  components: {
    ProjectList,
  },
  data(){
    return{
      // top 10 프로젝트
      popularProjects: [],
      newProjects: [],
      recentlyCompletedProjects: []


    };
  },
  mounted(){
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
    async fetchPopularProjects() {
      axios.get('/api/projects/popular') // Adjust the URL according to your backend API
          .then(response => {
            this.popularProjects = response.data;
          })
          .catch(error => {
            console.error('Error fetching popular projects:', error);
          })
          .finally(() => {
            this.loading = false;
          });

    },
    fetchNewProjects() {
      axios.get('/api/projects/new', {
        params: {
          page: 0,  // 페이지 번호 (기본값으로 첫 번째 페이지)
          size: 4   // 한 번에 가져올 프로젝트 수
        }
      })
          .then((response) => {
            this.newProjects = response.data.content; // 신규 프로젝트
          })
          .catch((error) => {
            console.error("프로젝트를 가져오는 중 오류 발생: ", error);
          });

    },
    fetchRecentlyCompletedProjects() {
      axios.get('/api/projects/done', {
        params: {
          page: 0,  // 페이지 번호 (기본값으로 첫 번째 페이지)
          size: 4   // 한 번에 가져올 프로젝트 수
        }
      })
          .then((response) => {
            this.recentlyCompletedProjects = response.data.content; // 최근 종료한 프로젝트
          })
          .catch((error) => {
            console.error("프로젝트를 가져오는 중 오류 발생: ", error);
          });
    }
  },

};
</script>

<style scoped>

.top-project {
  margin-bottom: 40px;
}
.project-section {
  margin-bottom: 40px;
}

.project-section h2 {
  margin-bottom: 20px;
}

.project-tech-stack{
  height: 85px;
}
.tech-item {
  width: 60px;
  height: 60px;
}

.project-duration{
  height:70px;
}
.recruitment-section {
  margin-bottom: 10px;
}
.position-absolute {
  position: absolute;
}

</style>

