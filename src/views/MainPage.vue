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
      >
        <v-carousel-item
            v-for="project in popularProjects"
            :key="project.projectId"
        >
          <v-row class="fill-height ma-0" >
            <v-col cols="6" class="pa-0">
<!--              <v-card flat  max-width="100%">-->
                <v-img
                    :src="project.imgUrl"
                    height="100%"
                    contain
                ></v-img>
            </v-col>
            <v-card flat>
                <v-card-title class="text-h4 font-weight-bold">{{ project.name }}</v-card-title>
                <v-card-subtitle  class="text-subtitle-1">{{ project.description }}</v-card-subtitle>
              <!-- 기술 스택 (이미지로 표시) -->
              <v-card-text>
                <div class="mb-3">
              <span v-for="tech in project.projectTechStack" :key="tech.name" class="mr-2">
                <v-img :src="tech.imgUrl" height="30px"></v-img>
              </span>
                </div>

                <!-- 좋아요, 팀 구성 -->
                <div class="d-flex align-center mb-3">
                  <v-icon class="mr-2" @click="toggleLike(project)">mdi-heart</v-icon>
                  <span class="mr-4">{{ project.cntLike }}</span>
                  <v-icon class="mr-2">mdi-account-group</v-icon>
                  <span>{{ project.currentCnt }}/{{ project.teamCnt }}</span>
                </div>

                <!-- 날짜 및 프로젝트 기간 -->
                <div>날짜: {{ project.date }}</div>
                <div>프로젝트 기간: {{ project.duration }}일</div>
              </v-card-text>
            </v-card>
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

export default {
  name: 'MainPage',
  components: {
    ProjectList,
  },
  data(){
    return{
      // top 10 프로젝트
      popularProjects: [
        { projectId: 1, name: '프로젝트명', description: '설명 텍스트', date: '2024-09-01', image: 'path-to-image1', imgUrl: 'https://image.yes24.com/goods/110126993/XL', projectTechStack: [{name: "Vue.js", imgUrl: "path-to-vue-logo"}], cntLike: 50, currentCnt: 4, teamCnt: 6, duration: 30 },
        { projectId: 2, name: '프로젝트명2', description: '설명 텍스트', date: '2024-09-02', image: 'path-to-image2', imgUrl: 'https://image.yes24.com/goods/110126993/XL', projectTechStack: [{name: "React", imgUrl: "path-to-react-logo"}], cntLike: 20, currentCnt: 3, teamCnt: 5, duration: 40 },
        { projectId: 3, name: '프로젝트명3', description: '설명 텍스트', date: '2024-09-03', image: 'path-to-image3', imgUrl: 'https://image.yes24.com/goods/110126993/XL', projectTechStack: [{name: "Angular", imgUrl: "path-to-angular-logo"}], cntLike: 70, currentCnt: 5, teamCnt: 7, duration: 20 },
        { projectId: 1, name: '프로젝트명', description: '설명 텍스트', date: '2024-09-01', image: 'path-to-image1', imgUrl: 'path-to-image1', projectTechStack: [{name: "Vue.js", imgUrl: "path-to-vue-logo"}], cntLike: 50, currentCnt: 4, teamCnt: 6, duration: 30 },
        { projectId: 2, name: '프로젝트명2', description: '설명 텍스트', date: '2024-09-02', image: 'path-to-image2', imgUrl: 'path-to-image2', projectTechStack: [{name: "React", imgUrl: "path-to-react-logo"}], cntLike: 20, currentCnt: 3, teamCnt: 5, duration: 40 },
        { projectId: 3, name: '프로젝트명3', description: '설명 텍스트', date: '2024-09-03', image: 'path-to-image3', imgUrl: 'path-to-image3', projectTechStack: [{name: "Angular", imgUrl: "path-to-angular-logo"}], cntLike: 70, currentCnt: 5, teamCnt: 7, duration: 20 }
      ],
      newProjects: [
        { projectId: 4, name: 'New Project 1', description: 'Description 1', imgUrl: 'path-to-image4', projectTechStack: [{name: "Vue.js", imgUrl: "path-to-vue-logo"}], cntLike: 10, currentCnt: 2, teamCnt: 5, duration: 15 },
        { projectId: 5, name: 'New Project 2', description: 'Description 2', imgUrl: 'path-to-image5', projectTechStack: [{name: "Node.js", imgUrl: "path-to-node-logo"}], cntLike: 30, currentCnt: 4, teamCnt: 4, duration: 25 },
        { projectId: 1, name: '프로젝트명', description: '설명 텍스트', date: '2024-09-01', image: 'path-to-image1', imgUrl: 'path-to-image1', projectTechStack: [{name: "Vue.js", imgUrl: "path-to-vue-logo"}], cntLike: 50, currentCnt: 4, teamCnt: 6, duration: 30 },
        { projectId: 2, name: '프로젝트명2', description: '설명 텍스트', date: '2024-09-02', image: 'path-to-image2', imgUrl: 'path-to-image2', projectTechStack: [{name: "React", imgUrl: "path-to-react-logo"}], cntLike: 20, currentCnt: 3, teamCnt: 5, duration: 40 },
        { projectId: 3, name: '프로젝트명3', description: '설명 텍스트', date: '2024-09-03', image: 'path-to-image3', imgUrl: 'path-to-image3', projectTechStack: [{name: "Angular", imgUrl: "path-to-angular-logo"}], cntLike: 70, currentCnt: 5, teamCnt: 7, duration: 20 }
      ],
      recentlyCompletedProjects: [
        { projectId: 6, name: 'Done Project 1', description: 'Description 1', imgUrl: 'path-to-image6', projectTechStack: [{name: "Django", imgUrl: "path-to-django-logo"}], cntLike: 40, currentCnt: 6, teamCnt: 6, duration: 30 },
        { projectId: 7, name: 'Done Project 2', description: 'Description 2', imgUrl: 'path-to-image7', projectTechStack: [{name: "Flask", imgUrl: "path-to-flask-logo"}], cntLike: 60, currentCnt: 5, teamCnt: 5, duration: 20 }
      ],

    };
  },
  mounted(){
    this.fetchNewProjects();
    this.fetchRecentlyCompletedProjects();
  },
  methods: {
    fetchNewProjects() {
      // API call to fetch new projects
    },
    fetchRecentlyCompletedProjects() {
      // API call to fetch completed projects
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

.project-carousel {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>

