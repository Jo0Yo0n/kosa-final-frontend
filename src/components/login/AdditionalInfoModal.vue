<!--
 * fileName       : AdditionalInfoModal
 * author         : yunbin
 * date           : 2024-08-28
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-08-28        yunbin       최초 생성
 * 2024-08-30        yunbin       axios 요청 추가
-->
<script>
import { mapGetters, mapActions } from 'vuex';
import TextInputField from '@/components/login/TextInputField.vue';
import SelectInputField from '@/components/login/SelectInputField.vue';
import TechStackSelector from '@/components/login/TechStackSelector.vue';
import axios from 'axios';
import JobSelector from '@/components/login/JobSelector.vue';

export default {
    name: 'AdditionalInfoModal',
    components: {
        JobSelector,
        TextInputField,
        SelectInputField,
        TechStackSelector,
    },
    data() {
        return {
            isVisible: true,
            valid: false,
            careerOptions: ['신입', '주니어', '시니어'],
            nicknameStatus: null, // 닉네임 상태 (null: 확인 전, true: 사용 가능, false: 중복됨)
            additionalInfo: {
                nickname: '',
                techStackIds: [], // 선택된 tech stack id
                customStacks: [], // 사용자 입력 stack
                jobIds: [], // 선택된 job id
                career: '',
                github: '',
            },
        };
    },
    computed: {
        ...mapGetters('techStackAndJob', ['allTechStacks']),
        knownTech() {
            // 첫 번째 항목을 제외한 나머지 항목들만 사용
            const stacks = this.allTechStacks.slice(1);

            // reduce를 사용하여 이름을 키로, 해당 객체를 값으로 하는 객체 생성
            return stacks.reduce((acc, tech) => {
                acc[tech.name.toLowerCase()] = tech;
                return acc;
            }, {});
        },
        ...mapGetters('techStackAndJob', ['allJobs']),
        jobOptions() {
            // 첫 번째 요소를 제외한 나머지 요소들을 반환
            return this.allJobs.slice(1).map((job) => ({
                jobId: job.jobId,
                name: job.name,
            }));
        },
        nicknameRules() {
            return [(v) => !!v || '닉네임을 입력해 주세요.', () => this.nicknameStatus !== false || '이미 사용 중인 닉네임입니다.'];
        },
    },
    // watch: {
    //     nicknameStatus() {
    //         this.$nextTick(() => {
    //             this.$forceUpdate();
    //         });
    //     },
    // },
    methods: {
        ...mapActions('techStackAndJob', ['fetchTechStacksAndJobs']),
        async checkNickname() {
            console.log('checkNickname 실행됨');
            const nickname = this.additionalInfo.nickname;
            if (!nickname) {
                this.nicknameStatus = null;
                return;
            }

            try {
                const response = await axios.post('/api/users/check-nickname', { nickname });
                this.nicknameStatus = !response.data;

                console.log(this.nicknameStatus);

                // this.$nextTick(() => {
                //     this.$forceUpdate(); // 업데이트 강제 반영
                // });
                //this.$forceUpdate();
                await this.$nextTick();
                this.$refs.nicknameField.validate();
            } catch (error) {
                console.error('Error checking nickname:', error);
                this.nicknameStatus = false; // 오류 발생 시 중복된 것으로 처리
                // this.$nextTick(() => {
                //     this.$forceUpdate(); // 업데이트 강제 반영
                // });

                //this.$forceUpdate();
                await this.$nextTick();
                this.$refs.nicknameField.validate();
            }
        },
        handleTechSelection(techName) {
            const tech = this.knownTech[techName.toLowerCase()];
            if (tech) {
                this.additionalInfo.techStackIds.push(tech.techStackId);
            } else {
                this.additionalInfo.customStacks.push(techName);
                this.additionalInfo.techStackIds.push(1); // ID 1 for custom stacks
            }
        },
        handleJobSelection(jobName) {
            const job = this.jobOptions.find((job) => job.name === jobName);
            console.log(job);
            if (job) {
                this.additionalInfo.jobIds.push(job.jobId);
            }
        },
        submitAdditionalInfo() {
            if (this.$refs.form.validate()) {
                this.saveUserData();
                this.isVisible = false;
            } else {
                console.error('Form validation failed.');
            }
        },
        async saveUserData() {
            try {
                const response = await axios.post('/api/users/additional-info', this.additionalInfo);
                alert(response.data);
            } catch (error) {
                console.error('Error saving user data:', error);
            }
        },
    },
    mounted() {
        this.fetchTechStacksAndJobs();
    },
};
</script>

<template>
    <v-dialog v-model="isVisible" persistent max-width="400px">
        <!--        {{ additionalInfo }}-->
        <v-card>
            <v-card-title class="text-h5 custom-center-class">
                <span class="headline">추가 정보 입력</span>
            </v-card-title>
            <v-card-text>
                <v-form ref="form" v-model="valid">
                    <TextInputField
                        label="닉네임"
                        ref="nicknameField"
                        :rules="nicknameRules"
                        v-model="additionalInfo.nickname"
                        id="nickname"
                        @blur="checkNickname"
                        :nicknameStatus="nicknameStatus"
                        required
                    />

                    <TechStackSelector
                        :value="additionalInfo.techStackIds"
                        :customStacks="additionalInfo.customStacks"
                        :knownTech="knownTech"
                        @techSelected="handleTechSelection"
                        @input="
                            (newValue) => {
                                additionalInfo.techStackIds = newValue;
                            }
                        "
                        @customInput="
                            (newValue) => {
                                additionalInfo.customStacks = newValue;
                            }
                        "
                    />

                    <JobSelector v-model="additionalInfo.jobIds" :jobOptions="jobOptions" @input="handleJobSelection" />

                    <SelectInputField label="경력" :rules="[(v) => !!v || '경력을 선택해 주세요.']" v-model="additionalInfo.career" :items="careerOptions" id="career" required />

                    <TextInputField label="깃허브 주소" v-model="additionalInfo.github" id="github" />
                </v-form>
            </v-card-text>
            <v-card-actions class="custom-center-class">
                <v-btn color="#6D4C41" @click="submitAdditionalInfo" class="white--text">완료</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style scoped>
.custom-center-class {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}
.headline {
    text-align: center;
    flex-grow: 1;
    font-weight: bold;
}
</style>
