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
  <v-card
      class="ma-2 project-card"
      outlined
      @click="goToDetailPage"
  >
    <!-- 프로젝트 이미지 -->
    <v-img :src="project.imgUrl" height="150px" class="project-img"></v-img>

    <!-- 카드 내용 -->
    <v-card-text class="pt-2">
      <div class="project-details">
        <!-- 프로젝트 이름 -->
<!--        <div class="project-name text-h6">{{ project.name }}</div>-->
        <div v-if="isNameTruncated">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <div
                  class="project-name text-h6 text-truncate"
                  v-bind="attrs"
                  v-on="on"
                  ref="projectName"
              >
                {{ project.name }}
              </div>
            </template>
            <span>{{ project.name }}</span>
          </v-tooltip>
        </div>
        <div v-else>
          <div
              class="project-name text-h6 text-truncate"
              ref="projectName"
          >
            {{ project.name }}
          </div>
        </div>

        <!-- 프로젝트 기간 -->
        <div class="project-duration grey--text">
          {{ project.duration }}일
        </div>

        <!-- 기술 스택 -->
        <div class="project-tech-stack mt-2 d-flex flex-wrap">
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
        </div>

        <!-- 좋아요 수 및 팀원 정보 -->
        <div class="project-stats d-flex justify-space-between align-center mt-3">
          <div
              class="like-count"
              :class="{ 'text-primary': project.isLiked, 'grey--text': !project.isLiked }"
          >
            <v-icon
                small
                left
                @click="toggleLike(project)"
                :color="project.isLiked ? 'blue' : 'grey'"
            >
              mdi-heart
            </v-icon>
            {{ project.cntLike }}
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
  data() {
    return {
      isNameTruncated: false, // 프로젝트 이름이 길어서 자를지 여부
    };
  },
  mounted() {
    this.checkNameLength();
    window.addEventListener('resize', this.checkNameLength); // 화면 크기 변경 시 다시 체크
  },
  methods: {
    toggleLike(project) {
      // 좋아요 상태를 토글하고 cntLike 값도 업데이트
      if (project.isLiked) {
        project.cntLike--;
      } else {
        project.cntLike++;
      }
      project.isLiked = !project.isLiked;
    },
    goToDetailPage() {
      this.$router.push({ name: 'ProjectDetail', params: { projectId: this.project.projectId } });
    },
    checkNameLength() {
      const element = this.$refs.projectName;
      if (element) {
        this.isNameTruncated = element.scrollWidth > element.clientWidth;
      }
    }
  }
}
</script>

<style scoped>
.project-card {
  width: 100%;
  max-width: 270px;
  min-width: 200px;
  height: auto;
  aspect-ratio: 4 / 5;
  border: 2px solid #6F4A3D; /* 갈색 아웃라인 */
  border-radius: 10px;
  overflow: hidden;
  transition: height 0.1s ease;
}

.project-img {
  border-bottom: 1px solid #ccc;
}

.project-details {
  padding: 8px;
}

.project-name {
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.project-duration {
  font-size: 12px;
}

.project-tech-stack {
  overflow: hidden;
  max-height: 60px;
  transition: max-height 0.3s ease;
}

.project-stats {
  font-size: 12px;
}
</style>