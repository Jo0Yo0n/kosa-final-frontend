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
    <div v-if="projects.length">
      <h3>프로젝트</h3>
      <!-- 프로젝트 카드 리스트 -->
      <div class="project-list">
        <v-card v-for="project in projects" :key="project.id" class="project-card">
          <v-img :src="project.imgUrl"></v-img>
          <v-card-title>{{ project.name }}</v-card-title>
          <v-card-subtitle>{{ project.deadline }}</v-card-subtitle>
          <v-card-actions>
            <v-chip>{{ project.techStack }}</v-chip>
            <v-chip>{{ project.members }}</v-chip>
          </v-card-actions>
        </v-card>
      </div>
    </div>

    <div v-if="members.length">
      <h3>라떼버</h3>
      <!-- 멤버 카드 리스트 -->
      <div class="member-list">
        <v-card v-for="member in members" :key="member.id" class="member-card">
          <v-img :src="member.profileImageUrl"></v-img>
          <v-card-title>{{ member.name }}</v-card-title>
          <v-card-subtitle>{{ member.skills }}</v-card-subtitle>
        </v-card>
      </div>
    </div>
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

  // watch: {
  //   '$route.query.q': {
  //     immediate: true,
  //     handler(newQuery) {
  //       this.searchQuery = newQuery;
  //       this.fetchSearchResults();
  //     }
  //   }
  // },
  methods: {
    fetchSearchResults() {
      if (this.searchQuery.trim()) {
        // API 호출을 통해 검색 결과 가져오기
        axios.get('/api/search', {
          params: {
            query: this.searchQuery
          }
        })
            .then(response => {
              this.searchResults = response.data.results;
            })
            .catch(error => {
              console.error('Error fetching search results:', error);
            });
      }
    }
  }

}
</script>

<style scoped>

</style>