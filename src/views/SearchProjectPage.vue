<!--
 * fileName       : SearchProjectPage
 * author         : Heeseon
 * date           : 2024-09-02
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-09-02        Heeseon       최초 생성
-->

<template>
  <div class = "pa-8">
    <!--프로젝트 검색 타이틀-->
    <v-row>
      <v-col cols="12">
        <h2 class="text-h4 font-weight-bold">프로젝트 검색</h2>
      </v-col>
    </v-row>
    <v-row class="align-center">
      <!-- 검색창 -->
      <v-col cols="12" md="8">
        <v-text-field
            v-model="searchQuery"
            label="프로젝트명, 기술 스택 검색"
            prepend-icon="mdi-magnify"
            clearable
            outlined
            dense
        ></v-text-field>
      </v-col>
<!--검색창, 정렬 기중 드롭다운-->
      <v-col cols="6" md="2">
        <v-select
            v-model="sortOrder"
            :items="sortOptions"
            label="정렬 기준"
            dense
            outlined
        ></v-select>
      </v-col>


    </v-row>
<!--필터링 버튼-->
    <v-row class="mt-4">
      <v-col cols="12">
        <v-btn-group row  class="status-btn-group">
          <v-btn value="전체" label="전체"    class="oval-btn"> 전체 </v-btn>
          <v-btn value="모집중" label="모집중" class="oval-btn"> 모집중 </v-btn>
          <v-btn value="진행중" label="진행중" class="oval-btn"> 진행중 </v-btn>
          <v-btn value="완료됨" label="완료됨" class="oval-btn"> 완료됨 </v-btn>
          </v-btn-group>
      </v-col>
    </v-row>

<!--    필터링된 프로젝트 리스트 -->
    <v-row>
      <v-col cols="12">
        <h3> 프로젝트 {{filterStatus}}  </h3>
      </v-col>
    </v-row>

<!--    <v-row>-->
<!--      <v-col-->
<!--        v-for="(project) in filteredProject"-->
<!--        :key="project.id"-->
<!--        cols="12"-->
<!--        sm="6"-->
<!--        md="3"-->
<!--      >-->
<!--        <v-card>-->
<!--          <v-img :src="project.image" height="200px"></v-img>-->
<!--          <v-card-title>{{ project.title }}</v-card-title>-->
<!--          <v-card-subtitle>{{ project.subtitle }}</v-card-subtitle>-->
<!--          <v-card-text>-->
<!--            <div>기술 스택: {{ project.techStack }}</div>-->
<!--            <div>모집인원: {{ project.members }} / {{ project.maxMembers }}</div>-->
<!--            <div>좋아요: {{ project.likes }}</div>-->
<!--          </v-card-text>-->
<!--        </v-card>-->
<!--      </v-col>-->
<!--    </v-row>-->
<!--    &lt;!&ndash; 더보기 버튼 &ndash;&gt;-->
<!--    <v-row>-->
<!--      <v-col cols="12" class="text-center">-->
<!--        <v-btn @click="loadMore" v-if="displayedCount < filteredProjects.length">더보기</v-btn>-->
<!--      </v-col>-->
<!--    </v-row>-->
  </div>
</template>

<script>
export default {
  name: "SearchProjectPage",
  data() {
    return {
      filterStatus: '전체', // 기본적으로 선택된 상태
    };
  },
}
</script>

<style scoped>
.align-center{
  align-items: center
}

.custom-toggle {
  display: flex;
  justify-content: left;
  max-width: 50px;
  margin: 0 auto;
}
.oval-btn .v-input--selection-controls__input {
  height: 20px; /* 버튼 높이 조정 */
  width: 20px;  /* 버튼 너비 조정 */
}
.status-btn-group {
  display: flex;
  justify-content: space-between;
}


.oval-btn{
  border-radius: 50px ; /* 버튼을 타원형으로 만들기 위한 둥근 모서리 */
  background-color: white;
  color: brown;
  border: 1px solid #b5651d;
  font-weight: bold;
  padding: 10px 20px; /* 버튼 크기 조절 */
  transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
  min-width: 100px; /* 최소 너비를 설정하여 일정한 크기를 유지 */
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1); /* 약간의 그림자 추가 */
}
/* 마우스를 올렸을 때의 배경색 */
.oval-btn:hover {
  background-color: #f5f5f5;
}

/* 선택된 상태 */
.v-btn--is-active .oval-btn {
  background-color: brown; /* 선택된 상태의 배경색 */
  color: white; /* 선택된 상태의 텍스트 색상 */
  border-color: brown; /* 선택된 상태의 테두리 색상 */
}
</style>