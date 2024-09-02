<!--
 * fileName       : ProjectCard
 * author         : Heeseon
 * date           : 2024-09-02
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-09-02        Heeseon       최초 생성
-->
<template>
  <v-card class="ma-4 project-card" outlined>
    <!-- 프로젝트 이미지 -->
    <v-img :src="project.imgUrl" height="140px" class="project-img"></v-img>

    <!-- 카드 내용 -->
    <v-card-text class="pt-2">
      <div class="project-details">
        <!-- 프로젝트 이름 -->
        <div class="project-name text-h6">{{ project.name }}</div>

        <!-- 프로젝트 기간 -->
        <div class="project-duration grey--text">
          {{ project.duration }}일
        </div>

        <!-- 기술 스택 -->
        <div class="project-tech-stack mt-2">
          <v-avatar
              v-for="tech in project.projectTechStack"
              :key="tech.name"
              size="24"
              class="mr-1"
          >
            <v-img :src="tech.imgUrl"></v-img>
          </v-avatar>
        </div>

        <!-- 좋아요 수 및 팀원 정보 -->
        <div class="project-stats d-flex justify-space-between align-center mt-3">
          <div class="like-count grey--text">
            <v-icon small left>mdi-thumb-up</v-icon>{{ project.cntLike }}
          </div>
          <div class="team-info grey--text">
            <v-icon small left>mdi-account-multiple</v-icon>{{ project.currentCnt }}/{{ project.teamCnt }}
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ProjectCard',
  props: {
    project: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.project-card {
  width: 200px;
  border-radius: 10px;
  overflow: hidden;
}

.project-img {
  border-bottom: 1px solid #ccc;
}

.project-details {
  padding: 8px;
}

.project-name {
  font-weight: bold;
}

.project-duration {
  font-size: 12px;
}

.project-tech-stack v-avatar {
  display: inline-block;
}

.project-stats {
  font-size: 12px;
}
</style>
