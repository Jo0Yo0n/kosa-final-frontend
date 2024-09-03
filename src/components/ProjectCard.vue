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
  <v-card class="ma-4 project-card" outlined  @click="goToDetailPage">
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
        <div class="project-tech-stack mt-2 d-flex flex-wrap">
          <template v-for="tech in project.projectTechStack" >
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
                  style="width: 60px; height: 30px; background-color: #e0e0e0; color: #000; text-align: center; line-height: 30px; border-radius: 15px; display: flex; align-items: center; justify-content: center;">
                {{ tech.name }}
              </v-avatar>
              <div class="caption text-center black--text">#{{ tech.name }}</div>
            </div>
          </template>
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
  },
  methods: {
    goToDetailPage() {
      this.$router.push({ name: 'ProjectDetail', params: { projectId: this.project.projectId } });
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
