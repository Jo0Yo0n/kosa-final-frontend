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
    <!-- 이미지와 사용자 정보 섹션 -->
    <v-row>
      <!-- 이미지 섹션 -->
      <v-col cols="12" md="4">
        <v-img
            :src="memberProfile.profileImage || 'https://via.placeholder.com/150'"
            class="profile-image"
            max-width="200"
        />
      </v-col>

      <!-- 사용자 정보 섹션 -->
      <v-col cols="12" md="8">
        <div class="profile-details">
          <!-- 닉네임, 깃허브 아이콘, 수정 버튼 -->
          <v-row class="align-center">
            <v-col cols="auto">
              <span>{{ memberProfile.nickname }}</span>
            </v-col>
            <v-col cols="auto">
              <v-icon class="github-icon" color="black" small>mdi-github</v-icon>
            </v-col>
            <v-col cols="auto">
              <v-btn
                  class="edit-button"
                  small
                  @click="enableEdit"
                  v-if="!isEditMode"
              >수정</v-btn>
            </v-col>
          </v-row>

          <!-- 직무 및 경력 -->
          <v-row class="align-center">
            <v-col cols="auto">
              <span>직무 :</span>
            </v-col>
            <v-col cols="auto">
              <span>{{ memberProfile.job }}</span>
            </v-col>
          </v-row>
          <v-row class="align-center">
            <v-col cols="auto">
              <span>경력 :</span>
            </v-col>
            <v-col cols="auto">
              <span>{{ memberProfile.experience }}</span>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>

    <!-- 기술 스택 섹션 -->
    <v-divider class="my-8" ></v-divider>
    <h3>기술 스택</h3>
    <v-card class="techstack-card pa-4 mb-6"  outlined style="min-height: 100px;">
      <v-row>
        <v-col v-for="tech in memberProfile.techStack" :key="tech.name" cols="auto">
          <v-avatar size="60">
            <v-img :src="tech.imgUrl" :alt="tech.name"></v-img>
          </v-avatar>
        </v-col>
      </v-row>
    </v-card>

    <!-- 자기소개 섹션 -->
    <v-row class="my-8">
      <v-col>
        <h3>자기소개</h3>
        <v-card class="introduction-card pa-4 mb-6" outlined style="min-height: 200px; max-height: 600px; overflow-y: auto;"> <!-- 최소, 최대 높이 설정 -->
          <p>{{ memberProfile.introduction }}</p>
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
