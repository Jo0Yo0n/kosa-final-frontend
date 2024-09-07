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
  <div >
    <!--프로젝트 검색 타이틀-->
    <v-row>
      <v-col cols="4">
        <h2 class="text-h4 font-weight-bold">프로젝트 검색</h2>
      </v-col>
    </v-row>
    <v-row class="align-center" >
      <!-- 검색창 -->
      <v-col>
        <v-text-field
            v-model="searchQuery"
            label="프로젝트명, 기술 스택 검색"
            clearable
            outlined
            dense
            append-outer-icon="mdi-magnify"
            @click:append-outer="searchProjects"
            @keyup.enter="searchProjects"
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
    <v-row style="margin-top: 0px; margin-left: 20px;">
      <v-col cols="12" md="6">
        <v-radio-group v-model="filterStatus" row class="custom-radio-group">
          <v-radio label="전체" value="전체"></v-radio>
          <v-radio label="모집중" value="모집중"></v-radio>
          <v-radio label="진행중" value="진행중"></v-radio>
          <v-radio label="완료됨" value="종료"></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>

<!--  필터링된 프로젝트 -->
    <v-row style="margin-top: 20px">
      <v-col cols="12">
        <h3> 프로젝트 {{filterStatus}}  </h3>
      </v-col>
    </v-row>


  <!-- 프로젝트 카드 리스트 -->
    <ProjectCardList :projects="filteredProjects" />
  </div>
</template>

<script>
import ProjectCardList from '@/components/ProjectCardList.vue';

export default {
  name: "SearchProjectPage",
  components: {
    ProjectCardList
  },
  data() {
    return {
      searchQuery: '',
      sortOrder: '',
      filterStatus: '전체', // 기본적으로 선택된 상태
      sortOptions: [
        { text: '날짜순', value: 'createdAt' } ,
        { text: '추천순', value: 'cntLike'}
      ],
      projects: [],
    };
  },
  methods: {
    async searchProjects(){
      try {
        console.log('Sending request with params:', {
          keyword: this.searchQuery,
          sortby: this.sortOrder,
          status: this.filterStatus,
        });

        const response = await this.$axios.get(`/api/search/projects` , {
          params:{
            keyword: this.searchQuery,
            sortby: this.sortOrder,
            status: this.filterStatus,
          }

        });

        console.log('Response received:', response);

        this.projects = response.data;
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    },
    setFilterStatus(status) {
      this.filterStatus = status;
    },
  },
  watch: {
    sortOrder() {
      this.searchProjects();
    }
  },
  computed: {
    filteredProjects() {
      if (this.filterStatus === '전체') {
        return this.projects;
      }
      return this.projects.filter(project => project.status === this.filterStatus);
    },
  },
}
</script>

<style scoped>
.align-center {
  align-items: center;
}

.status-btn-group {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.oval-btn {
  border-radius: 50px;
  background-color: white;
  color: #8D6E63;
  border: 1px solid #b5651d;
  font-weight: bold;
  padding: 5px 20px;
  transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
  min-width: 10px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;

}
/* 마우스를 올렸을 때 배경색 변경 */
.oval-btn:hover {
  background-color: #f5f5f5;
}
/* 선택되었을 때 배경색 변경 */
.oval-btn.active {
  background-color: #8D6E63;
  color: white;
  border-color: #8D6E63;
}



.custom-radio-group {
  display: flex;
  gap: 10px; /* 버튼 사이의 간격 */
}

.custom-radio .v-input--radio .v-selection-control__ripple {
  display: none; /* 기본 라디오 버튼의 동그라미 효과 숨기기 */
}

.custom-radio .v-input--radio .v-selection-control__input {
  visibility: hidden; /* 기본 라디오 버튼 숨기기 */
}



.custom-radio .v-label {
  display: inline-block;
  padding: 10px 20px;
  border-radius: 50px;
  background-color: white;
  color: brown;
  border: 1px solid #b5651d;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.custom-radio .v-input--radio .v-input--selection-controls__input:checked + .v-selection-control__ripple + .v-label {
  background-color: brown;
  color: white;
  border-color: brown;
}
</style>