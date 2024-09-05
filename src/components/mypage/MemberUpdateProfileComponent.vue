<!--
 * fileName       : MemberProfileComponent
 * author         : Heeseon
 * date           : 2024-09-05
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-09-05        Heeseon       최초 생성
-->
<template>
  <div class="mypage">
    <!-- 프로필 섹션 -->
    <section class="profile-section">
      <h3>프로필</h3>
      <v-text-field
          label="닉네임"
          v-model="profile.nickname"
          :readonly="!isEditMode"
      ></v-text-field>
      <v-text-field
          label="직무"
          v-model="profile.role"
          :readonly="!isEditMode"
      ></v-text-field>
      <v-select
          label="경력"
          :items="['주니어', '미들', '시니어']"
          v-model="profile.experience"
          :disabled="!isEditMode"
      ></v-select>
    </section>

    <!-- 기술 스택 섹션 -->
    <section class="techstack-section">
      <h3>기술 스택</h3>
      <div v-for="(tech, index) in techStack" :key="index" class="tech-item">
        <v-text-field
            label="기술명"
            v-model="tech.name"
            :readonly="!isEditMode"
        ></v-text-field>
        <v-text-field
            label="아이콘 URL"
            v-model="tech.icon"
            :readonly="!isEditMode"
        ></v-text-field>
      </div>
      <v-btn v-if="isEditMode" @click="addTech">기술 추가</v-btn> <!-- 수정 모드일 때만 보임 -->
    </section>

    <!-- 자기소개 섹션 -->
    <section class="introduction-section">
      <h3>자기소개</h3>
      <v-textarea
          label="자기소개"
          v-model="introduction"
          :readonly="!isEditMode"
      ></v-textarea>
    </section>

    <!-- 수정 버튼과 수정 완료 버튼 -->
    <v-btn v-if="!isEditMode" color="primary" @click="enableEdit">수정</v-btn>
    <v-btn v-if="isEditMode" color="success" @click="submitUpdates">수정 완료</v-btn>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MyPage',
  data() {
    return {
      isEditMode: false, // 수정 모드 여부
      profile: {
        nickname: '',
        role: '',
        experience: ''
      },
      techStack: [
        { name: 'Vue.js', icon: '' },
        { name: 'Java', icon: '' }
      ],
      introduction: ''
    };
  },
  methods: {
    // 수정 모드 활성화
    enableEdit() {
      this.isEditMode = true;
    },
    // 기술 스택 추가
    addTech() {
      this.techStack.push({ name: '', icon: '' });
    },
    // 수정 완료 시 서버에 데이터 전송
    async submitUpdates() {
      const payload = {
        profile: this.profile,
        techStack: this.techStack,
        introduction: this.introduction
      };

      try {
        await axios.put('http://localhost:8080/api/updateProfile', payload);
        alert('수정이 완료되었습니다!');
        this.isEditMode = false; // 수정 완료 후 다시 읽기 모드로 전환
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
  }
};
</script>

<style scoped>
.mypage {
  padding: 20px;
}

.profile-section,
.techstack-section,
.introduction-section {
  margin-bottom: 30px;
}

.tech-item {
  display: flex;
  gap: 10px;
}

v-btn {
  margin-top: 20px;
}
</style>
