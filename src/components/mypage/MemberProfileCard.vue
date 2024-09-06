<!--
 * fileName       : MemberProfileComponent
 * author         : Heeseon
 * date           : 2024-09-05
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-09-05        Heeseon       최초 생성
-->
<!-- MemberProfileCard.vue -->
<template>
  <v-container>
    <!-- 이미지 섹션 -->
    <v-row justify="center">
      <v-col cols="12" sm="6" md="4" class="text-center">
        <v-img
            :src="memberProfile.memberImg || 'https://via.placeholder.com/150'"
            class="profile-image mx-auto"
            max-width="150"
            rounded
        />
      </v-col>
    </v-row>

    <!-- 사용자 정보 섹션 -->
    <v-row justify="center" class="mt-4">
      <v-col cols="12" sm="6" md="6">
        <v-row justify="center">
          <v-col cols="12" sm="8" md="6">
            <!-- 닉네임 -->
            <v-row align="center" class="mb-2">
              <v-col cols="4" class="text-right">
                <span>닉네임 :</span>
              </v-col>
              <v-col cols="8" class="text-left">
                <span>{{ memberProfile.nickname }}</span>
                <v-btn icon :href="memberProfile.github" target="_blank" color="black" small class="ml-2">
                  <v-icon>mdi-github</v-icon>
                </v-btn>
              </v-col>
            </v-row>

            <!-- 직무 -->
            <v-row align="center" class="mb-2">
              <v-col cols="4" class="text-right">
                <span>직무 :</span>
              </v-col>
              <v-col cols="8" class="text-left">
                <span v-for="(job, index) in memberProfile.jobs" :key="job">
                  {{ job }}{{ index < memberProfile.jobs.length - 1 ? ', ' : '' }}
                </span>
              </v-col>
            </v-row>

            <!-- 경력 -->
            <v-row align="center">
              <v-col cols="4" class="text-right">
                <span>경력 :</span>
              </v-col>
              <v-col cols="8" class="text-left">
                <span>{{ memberProfile.career }}</span>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>


    <!-- 기술 스택 섹션 -->
    <v-divider class="my-8" ></v-divider>
    <h3>기술 스택</h3>
    <v-card class="techstack-card pa-4 mb-6" outlined style="min-height: 100px;">
      <v-row class="align-center">
        <v-col v-for="tech in memberProfile.memberTechStack" :key="tech.name" cols="auto" class="d-flex align-center">
          <template v-if="tech.imgUrl">
            <div class="d-flex flex-column align-center">
              <v-avatar size="40" class="mb-2">
                <v-img :src="tech.imgUrl" :alt="tech.name"></v-img>
              </v-avatar>
              <span class="caption text-center black--text">#{{ tech.name }}</span>
            </div>
          </template>
          <template v-else>
            <v-chip outlined class="ma-2" style="height: 40px; display: flex; align-items: center;">#{{ tech.name }}</v-chip>
          </template>
        </v-col>
      </v-row>
    </v-card>



    <!-- 자기소개 섹션 -->
    <v-row class="my-8">
      <v-col>
        <h3>자기소개</h3>
        <v-card class="introduction-card pa-4 mb-6" outlined style="min-height: 200px; max-height: 600px; overflow-y: auto;"> <!-- 최소, 최대 높이 설정 -->
          <p>{{ memberProfile.pr }}</p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'MemberProfileCard',
  props: {
    memberProfile: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isEditMode: false
    };
  },
  methods: {
    enableEdit() {
      this.isEditMode = true;
    }
  }
};
</script>

<style scoped>
.profile-image {
  border-radius: 0;
  max-width: 200px;
  height: auto;
}

.github-icon {
  margin-left: 10px;
}

.align-center {
  display: flex;
  align-items: center;
}

.introduction-card, .techstack-card {
  border: 2px solid #6F4A3D; /* 갈색 아웃라인 */
  border-radius: 15px; /* 둥글게 */
  padding: 20px; /* 내부 여백 */
  font-size: 16px; /* 글자 크기 */
  margin: 10px auto; /* 중앙 정렬 */
  background-color: #fdfdfd; /* 배경색 (예: 흰색) */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 가벼운 그림자 */
  color: #333; /* 텍스트 색상 */
  font-family: Arial, sans-serif; /* 폰트 설정 */
}


</style>
