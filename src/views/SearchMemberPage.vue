<!--
 * fileName       : SearchMemberPage
 * author         : Heeseon
 * date           : 2024-09-02
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-09-02        Heeseon       최초 생성
-->


<template>
  <div >
    <!--멤버 검색 타이틀-->
    <v-row>
      <v-col cols="12">
        <h2 class="text-h4 font-weight-bold">라떼버 검색</h2>
      </v-col>
    </v-row>
    <v-row class="align-center" >
      <!-- 검색창 -->
      <v-col cols="12" md="10">
        <v-text-field
            v-model="searchQuery"
            label="닉네임, 기술 스택, 직무 검색"
            append-icon="mdi-magnify"
            @click:append="searchMembers"
            @keyup.enter="searchMembers"
            clearable
            outlined
            dense
        ></v-text-field>
      </v-col>
      <!--검색창, 정렬 기준 드롭다운-->
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

    <!-- 멤버 카드 리스트 -->
    <div v-if="members.length > 0">
      <MemberCardList :members="members" />
    </div>
    <div v-else>
      검색된 멤버가 없습니다.
    </div>
  </div>
</template>


<script>
import MemberCardList from '@/components/MemberCardList.vue';


export default {
  name: "SearchMemberPage",
  components: {
    MemberCardList
  },
  data(){
    return{
      searchQuery: '',
      sortOrder: '',
      sortOptions:[
        {text: '신규순', value: 'latest'},
        {text: '경력 높은순', value: 'career_desc'},
        {text: '경력 낮은순', value: 'career_asc'},

      ],
      members: [],
    }
  },
  mounted() {
    // 페이지에 처음 진입할 때 모든 라떼버를 불러옴
    this.searchMembers();
  },
  methods:{
    async searchMembers(){
      try{
        console.log('Sending request with params:',{
          keyword: this.searchQuery,
          sortby: this.sortOrder,
        });

        const response =await this.$axios.get(`/api/search/members`,{
          params:{
            keyword: this.searchQuery,
            sortby: this.sortOrder,
          }
        });
        console.log('Response received:', response);
        this.members = response.data;
      }catch (error) {
        console.error('검색 결과를 가져오는 중 오류 발생:', error);
      }
    }
  },
  watch: {
    sortOrder() {
      this.searchMembers();
    }
  },
}
</script>


<style scoped>

</style>