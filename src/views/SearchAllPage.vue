<!--
 * fileName       : SearchAllPage
 * author         : Heeseon
 * date           : 2024-09-03
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-09-03        Heeseon       최초 생성
-->
<template>
  <div>
    <h1>Search Results for "{{ query }}"</h1>
    <!-- 검색 결과 표시 부분 -->

    <h3 class="mb-4">프로젝트</h3>

    <!-- 프로젝트 리스트 -->
    <h3 class="mb-4">프로젝트</h3>
    <div v-if="projects.length">
      <v-row>
        <v-col
            v-for="project in projects"
            :key="project.projectId"
            cols="12"
            sm="6"
            md="3"
        >
          <ProjectCard :project="project" />
        </v-col>
      </v-row>
    </div>
    <div v-else>
      검색된 프로젝트가 없습니다.
    </div>

    <h3 class="mb-4">라떼버</h3>
    <div v-if="members.length">
      <v-row>
        <v-col
            v-for="member in members"
            :key="member.id"
            cols="12"
            sm="6"
            md="3"
        >
          <MemberCard :member="member" />
        </v-col>
      </v-row>
    </div>
    <div v-else>
      검색된 라떼버가 없습니다.
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import ProjectCard from '@/components/ProjectCard.vue'; // ProjectCard 컴포넌트 경로를 적절히 수정
import MemberCard from '@/components/MemberCard.vue'; // MemberCard 컴포넌트 경로를 적절히 수정

export default {
  name: "SearchAllPage",
  data() {
    return {
      query: this.$route.query.keyword || '',
      projects: [],
      members: [],
    };
  },
  components: {
    ProjectCard,
    MemberCard,
  },
  async created() {
    const query = this.query;
    if(query){
      await this.fetchSearchResults();
    }
  },
  watch: {
    '$route.query.keyword'(newQuery) {
      this.query = newQuery;
      if (this.query) {
        this.fetchSearchResults();
      }
    }
  },
  methods: {
    async fetchSearchResults() {
      try {
        const response = await axios.get('/api/search/all', {
          params: {
            keyword: this.query,
          }
        });
        this.projects = response.data.projects;
        this.members = response.data.members;

      } catch (error) {
        console.error('검색 결과를 가져오는 중 오류 발생:', error);
      }
    }
  }
};
</script>

<style scoped>

</style>