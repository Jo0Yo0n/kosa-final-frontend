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
    <h1> "{{ query }}" 에 대한 검색결과 </h1>
    <!-- 검색 결과 표시 부분 -->

    <!-- 프로젝트 리스트 -->
    <h3 class="mb-4"> 프로젝트 </h3>
    <div v-if="projects.length">
      <ProjectCardList :projects="projects" />
    </div>
    <div v-else>
      검색된 프로젝트가 없습니다.
    </div>

    <h3 class="mb-4">라떼버</h3>
    <div v-if="members.length">
      <MemberCardList :members="members" />
    </div>
    <div v-else>
      검색된 라떼버가 없습니다.
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import ProjectCardList from '@/components/ProjectCardList.vue';
import MemberCardList from '@/components/MemberCardList.vue'; // MemberCard 컴포넌트 경로를 적절히 수정

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
    ProjectCardList,
    MemberCardList,
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
h1, h3, div {
  margin-bottom: 40px;
}


.mb-4 {
  margin-bottom: 32px;
}
</style>