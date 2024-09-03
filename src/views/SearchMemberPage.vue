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
  <div class = "pa-8">
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
            @click:append-outer="searchMembers"
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
    <v-row>
      <v-col
          v-for="member in members"
          :key="member.memberId"
          cols="12"
          sm="6"
          md="3"
      >
        <MemberCard :member="member" />
      </v-col>
    </v-row>
  </div>
</template>


<script>
import MemberCard from "@/components/MemberCard.vue";

export default {
  name: "SearchMemberPage",
  components: {
    MemberCard
  },
  data(){
    return{
      searchQuery: '',
      sortOrder: '',
      sortOptions:[
        {text: '신규순', value: 'latest'},
        {text: '경력 내림차순', value: 'career_desc'},
        {text: '경력 오름차순', value: 'career_asc'},

      ],
      members: [],
    }
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
        console.error('Error fetching project details:', error);
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