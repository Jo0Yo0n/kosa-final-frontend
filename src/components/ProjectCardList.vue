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
    <div class="project-list">
      <ProjectCard
          v-for="project in visibleProjects"
          :key="project.projectId"
          :project="project"
      />
    </div>
    <button v-if="visibleProjects.length < projects.length" @click="showMoreProjects">더보기</button>
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
  gap: 10px;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  background-color: #8a6d3b;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #714c2f;
}
</style>