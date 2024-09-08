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
<script>

export default {
    name: 'MainPage',
};
</script>

<template>
  <v-container>
    <div class="top-project">
      <v-carousel
          cycle
          interval="5000"
      >
        <v-carousel-item
            v-for="project in popularProjects"
            :key="project.projectId"
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

                <!-- 설명 박스 -->
                <v-card-text class="description-box">
                  {{ project.description }}
                </v-card-text>

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
                <v-card-text>
                  프로젝트 기간: {{ project.duration }}일
                </v-card-text>

                <!-- 좋아요 및 팀 정보 아이콘 오른쪽 하단 배치 -->
                <v-card-text class="d-flex align-center justify-end position-absolute" style="bottom: 16px; right: 16px;">
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
      popularProjects: [
        {
          projectId: 1,
          name: '프로젝트명',
          description: '설명 텍스트',
          date: '2024-09-01',
          image: 'path-to-image1',
          imgUrl: 'https://image.yes24.com/goods/110126993/XL',
          projectTechStack: [{ name: "Vue.js", imgUrl: "path-to-vue-logo" }],
          cntLike: 50,
          currentCnt: 4,
          teamCnt: 6,
          duration: 30,
          recruitmentName: ["Front-end Developer", "Designer"]
        },
        {
          projectId: 2,
          name: '프로젝트명2',
          description: '설명 텍스트',
          date: '2024-09-02',
          image: 'path-to-image2',
          imgUrl: 'https://pbs.twimg.com/profile_images/1785867863191932928/EpOqfO6d_400x400.png',
          projectTechStack: [{ name: "React", imgUrl: "https://pbs.twimg.com/profile_images/1785867863191932928/EpOqfO6d_400x400.png" }],
          cntLike: 20,
          currentCnt: 3,
          teamCnt: 5,
          duration: 40,
          recruitment: [
            { position: "Back-end Developer", available: 1 },
            { position: "UI/UX Designer", available: 1 }
          ]
        },
        {
          projectId: 3,
          name: '프로젝트명3',
          description: '설명 텍스트',
          date: '2024-09-03',
          image: 'path-to-image3',
          imgUrl: 'https://image.yes24.com/goods/110126993/XL',
          projectTechStack: [{ name: "Angular", imgUrl: "path-to-angular-logo" }],
          cntLike: 70,
          currentCnt: 5,
          teamCnt: 7,
          duration: 20,
          recruitmentName: [
            { position: "Full-stack Developer", available: 1 },
            { position: "QA Tester", available: 2 }
          ]
        }
      ],
      newProjects: [],
      recentlyCompletedProjects: []


    };
  },
  mounted(){
    this.fetchNewProjects();
    this.fetchRecentlyCompletedProjects();
  },
  methods: {
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

.description-box {
  height: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.recruitment-section {
  margin-bottom: 16px;
}
.position-absolute {
  position: absolute;
}

</style>

