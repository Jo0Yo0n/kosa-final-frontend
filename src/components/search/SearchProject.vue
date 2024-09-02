<!--
 * fileName       : SearchProject
 * author         : Heeseon
 * date           : 2024-09-02
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-09-02        Heeseon       최초 생성
-->


<script>
export default {
name: "SearchProject"
}
</script>
<template>
  <div class ="pa-8">
<!--프로젝트 검색 타이틀-->
    <v-row>
      <v-col cols="12">
        <h2 class="text-h4 font-weight-bold">프로젝트 검색</h2>
      </v-col>
    </v-row>

    <v-row class="align-center">
<!--      검색창 -->
      <v-text-field
          v-model="searchQuery"
          label="프로젝트명, 기술 스택 검색"
          prepend-icon="mdi-magnify"
          clearable
          outlined
      ></v-text-field>

      <!--    정렬기준 드롭다운 -->
      <v-col class="d-flex justify-end">
        <v-select
            v-model="sortOrder"
            :items="sortOptions"
            label="정렬 기준"
            dense
        ></v-select>
      </v-col>
    </v-row>

    <v-row class="my-4">
      <v-col>
        <v-btn-toggle v-model="filterStatus" multiple>
          <v-btn value="모집중">모집중</v-btn>
          <v-btn value="진행중">진행중</v-btn>
          <v-btn value="완료됨">완료됨</v-btn>
        </v-btn-toggle>
      </v-col>

    </v-row>

    <v-row>
      <v-col
          v-for="(project, index) in paginatedProjects"
          :key="index"
          cols="12"
          sm="6"
          md="3"
      >
        <ProjectCard :project="project" />
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-btn v-if="hasMore" @click="loadMore" color="brown" dark>더보기</v-btn>
    </v-row>
  </div>
</template>




<style scoped>

</style>