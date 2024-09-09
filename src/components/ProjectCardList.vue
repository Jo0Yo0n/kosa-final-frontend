<!--
 * fileName       : ProjectCardList
 * author         : Heeseon
 * date           : 2024-09-05
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-09-05        Heeseon       최초 생성
-->
<template>
  <section class="projects">
    <div v-if="visibleProjects.length > 0" class="project-list">
      <ProjectCard
          v-for="project in visibleProjects"
          :key="project.projectId"
          :project="project"
      />
    </div>
    <div class="more-button-container">
      <button v-if="visibleProjects.length < projects.length" @click="showMoreProjects">더보기</button>
    </div>
  </section>
</template>

<script>
// 사용자가 만든 ProjectCard 컴포넌트 불러오기
import ProjectCard from './ProjectCard.vue';

export default {
  name: "ProjectCardList",
  components: {
    ProjectCard
  },
  props: {
    projects: Array
  },
  data() {
    return {
      visibleCount: 4 // 처음에 표시할 프로젝트 수
    };
  },
  computed: {
    visibleProjects() {
      // 처음에 visibleCount만큼의 프로젝트를 보여줌
      return this.projects.slice(0, this.visibleCount);
    }
  },
  methods: {
    showMoreProjects() {
      // 더보기 버튼 클릭 시 추가로 4개의 프로젝트를 보여줌
      this.visibleCount += 4;
    }
  }
}
</script>
<style scoped>
.project-list {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-right: 0 !important;
}
.more-button-container {
  display: flex;
  justify-content: flex-end; /* Aligns the button to the right */
  width: 100%; /* Ensures the button container spans full width */
  margin-top: 20px;
}
button {
  padding: 10px 20px;
  margin-top: 20px;
  border: none;
  background-color: white;
  color:#6f4a3d;
  cursor: pointer;
  border-radius: 20px;
}

button:hover {
  background-color: rgba(128, 128, 128, 0.5); /* 투명한 회색 (rgba) */
  color: black; /* 선택적으로 텍스트 색상 변경 */
}
</style>