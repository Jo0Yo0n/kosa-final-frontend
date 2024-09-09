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
            :src="memberProfile.imgUrl || 'https://via.placeholder.com/150'"
            class="profile-image mx-auto"
            max-width="150"
            rounded
            @click="selectImage"
        />
        <v-file-input v-if="isEditMode" label="프로필 이미지 선택" @change="onImageSelected" accept="image/*" prepend-icon="mdi-camera"></v-file-input>
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
                <template v-if="isEditMode">
                  <v-text-field v-model="editableProfile.nickname"></v-text-field>
                </template>
                <template v-else>
                  <span>{{ memberProfile.nickname }}</span>
                </template>
              </v-col>
            </v-row>

            <!-- 직무 -->
            <v-row align="center" class="mb-2">
              <v-col cols="4" class="text-right">
                <span>직무 :</span>
              </v-col>
              <v-col cols="8" class="text-left">
                <template v-if="isEditMode">
                  <v-select
                      v-model="editableProfile.jobs"
                      :items="jobOptions"
                      multiple
                      label="직무 선택"
                      chips
                      deletable-chips
                  ></v-select>
                </template>
                <template v-else>
                  <span v-for="(job, index) in memberProfile.jobs" :key="job">
                    {{ job }}{{ index < memberProfile.jobs.length - 1 ? ', ' : '' }}
                  </span>
                </template>
              </v-col>
            </v-row>

            <!-- 경력 -->
            <v-row align="center" class="mb-2">
              <v-col cols="4" class="text-right">
                <span>경력 :</span>
              </v-col>
              <v-col cols="8" class="text-left">
                <template v-if="isEditMode">
                  <v-select
                      v-model="editableProfile.career"
                      :items="careerOptions"
                      label="경력 선택"
                  ></v-select>
                  <!-- 경력을 선택할 수 있도록 v-select 추가 -->
                </template>
                <template v-else>
                  <span>{{ memberProfile.career }}</span>
                </template>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>


    <!-- 기술 스택 섹션 -->
    <v-divider class="my-8"></v-divider>
    <h3>기술 스택</h3>

    <!-- 수정 모드일 때 TechStackSelector 컴포넌트 사용 -->
    <template v-if="isEditMode">
      <tech-stack-selector
          v-model="editableProfile.techStacks"
          :custom-stacks="editableProfile.customStacks"
          :known-tech="knownTech"
          :max-tech-stacks="10"
          :min-tech-stacks="1"
          @input="updateTechStacks"
          @customInput="updateCustomStacks"
      />
    </template>

    <!-- 수정 모드가 아닐 때만 카드 사용 -->
    <template v-else>
      <v-card class="techstack-card pa-4 mb-6" outlined style="min-height: 100px;">
        <v-row class="align-center">
          <v-col cols="12">
            <div class="d-flex flex-wrap">
              <template v-for="tech in memberProfile.memberTechStack" >
                <div v-if="tech.imgUrl" :key="tech.name" class="ma-1 tech-item">
                  <v-avatar size="40" class="mb-1">
                    <v-img :src="tech.imgUrl" :alt="tech.name"></v-img>
                  </v-avatar>
                  <div class="caption text-center black--text">#{{ tech.name }}</div>
                </div>
                <v-chip v-else :key="tech.name" class="ma-2" outlined> #{{ tech.name }} </v-chip>
              </template>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </template>




    <!-- 자기소개 섹션 -->
    <v-row class="my-8">
      <v-col>
        <h3>자기소개</h3>
        <v-card class="introduction-card pa-4 mb-6" outlined style="min-height: 200px; max-height: 600px; overflow-y: auto;">
          <template v-if="isEditMode">
            <v-textarea v-model="editableProfile.pr"></v-textarea>
          </template>
          <template v-else>
            <p>{{ memberProfile.pr }}</p>
          </template>
        </v-card>
      </v-col>
    </v-row>

    <!-- 수정, 저장, 취소 버튼 -->
    <v-row justify="end" class="button-container">
      <v-btn v-if="!isEditMode" class="edit-btn" @click="enableEdit">수정</v-btn>
    </v-row>
    <v-row v-if="isEditMode" class="button-container">
      <v-btn class="save-btn" @click="submitChanges">저장</v-btn>
      <v-btn class="cancel-btn" @click="cancelEdit">취소</v-btn>
    </v-row>

  </v-container>
</template>

<script>
import TechStackSelector from '@/components/login/TechStackSelector.vue';
import {mapGetters} from "vuex"; // TechStackSelector 컴포넌트 임포트

export default {
  name: 'MemberProfileCard',
  components: {
    TechStackSelector,
  },
  props: {
    memberProfile: {
      type: Object,
      required: true
    },
    knownTech: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isEditMode: false,
      editableProfile: { ...this.memberProfile },
      jobOptions: ['Developer', 'Designer', 'Manager', 'QA'], // 직무 옵션들
      careerOptions:['신입', '주니어', '시니어'],
      selectedTech: null,
      selectedTechImg: null,
    };
  },
  computed: {
    ...mapGetters(['knownTech']),
  },
  methods: {
    enableEdit() {
      this.isEditMode = true;
    },
    cancelEdit() {
      this.isEditMode = false;
      this.editableProfile = { ...this.memberProfile }; // 취소 시 원래 값으로 복구
    },
    async submitChanges() {
      this.$emit('update-profile', this.editableProfile);
      this.isEditMode = false;
    },
    selectImage() {
      this.$refs.imageInput.click(); // 이미지 선택 창 열기
    },
    onImageSelected(event) {
      const file = event.target.files[0];
      if (file) {
        this.editableProfile.imgUrl = URL.createObjectURL(file); // 이미지 URL 생성
      }
    },
    updateTechStacks(newStacks) {
      this.editableProfile.techStacks = newStacks; // 기술 스택 업데이트
    },
    updateCustomStacks(newCustomStacks) {
      this.editableProfile.customStacks = newCustomStacks; // 사용자 정의 스택 업데이트
    },
    selectTech(tech) {
      this.newTech = tech;
      this.addTechIfValid(tech);
    },
    addTechIfValid(tech) {
      const trimmedTech = tech.trim();
      if (trimmedTech && !this.userTechStack.find((t) => t.name.toLowerCase() === trimmedTech.toLowerCase())) {
        const techItem = this.knownTech.find((item) => item.name.toLowerCase() === trimmedTech.toLowerCase());
        const imgUrl = techItem ? techItem.imgUrl : ''; // 이미지 URL 가져오기
        this.userTechStack.push({ name: trimmedTech, imgUrl });
        this.newTech = '';
      }
      this.showDropdown = false;
    },
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
.button-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.save-btn, .cancel-btn {
  padding: 10px 20px;
  font-size: 16px;
  margin-right: 15px; /* Space between Save and Cancel buttons */
}


</style>
