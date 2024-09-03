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
    <h1>Search Results for "{{ searchQuery }}"</h1>
    <!-- 검색 결과 표시 부분 -->

    <h3 class="mb-4">프로젝트</h3>
    <ProjectCardList :projects="projects" />

    <h3 class="mb-4">라떼버</h3>
    <MemberCardList :members="members" />

  </div>
</template>
<script>

import axios from 'axios';

export default {
  name: "SearchAllPage",
  data() {
    return {
      query: this.$route.query.q || '',
      projects: [],
      members: [],
    };
  },
  created() {
    const query = this.$route.query.q;
    if(query){
      this.fetchSearchResults(query);
    }
  },
  methods: {
    fetchSearchResults(query) {
      axios.get('/api/search/all', {
        params: { query }
      })
          .then(response => {
            this.projects = response.data.projects;
            this.members = response.data.members;
          })
          .catch(error => {
            console.error('Error fetching search results:', error);
          });
    }
  }
};
</script>

<style scoped>

</style>