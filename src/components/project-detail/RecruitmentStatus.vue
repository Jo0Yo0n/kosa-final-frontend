<!--
 * fileName       : RecruitmentStatus
 * author         : JooYoon
 * date           : 2024-08-29
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-08-29        JooYoon       최초 생성
 * 2024-09-13        Yeong-Huns    project 지원시, project 지원자 목록 최신화.
-->

<template>
    <div>
        <h2>모집 현황</h2>
        <v-card flat>
            <v-card-text>
                <v-row>
                    <v-col v-for="recruitment in recruitments" :key="recruitment.jobId" cols="2">
                        <v-card outlined class="text-center" rounded elevation="1">
                            <v-card-text style="color: black">
                                <div class="mb-1" style="font-size: 18px">{{ recruitment.jobName }}</div>
                                <div class="mb-1" style="font-size: 13px">{{ recruitment.members.length }} / {{ recruitment.jobCount }}</div>

                                <!-- 지원하기 버튼 랜더링 조건 -->
                                <!-- 1. 사용자가 로그인한 상태여야 함 -->
                                <!-- 2. 프로젝트가 모집 중 상태여야 함 -->
                                <!-- 3. 모집 인원보다 참여 인원이 적어야 함 -->
                                <!-- TODO: 4. 로그인한 사용자가 해당 project_member 테이블에 없어야 함 -->
                                <v-btn
                                    v-if="isLogIn && !hasApplied && status === 0 && recruitment.members.length < recruitment.jobCount"
                                    color="brown"
                                    dark
                                    small
                                    class="font-weight-light"
                                    rounded
                                    @click="applyForProject(recruitment.jobId)"
                                    >지원하기
                                </v-btn>
                                <v-btn v-else color="brown" disabled small class="font-weight-light" rounded>지원하기</v-btn>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
        <common-modal v-model="showSuccessModal" @close="closeModal">
            <template v-slot:title>{{ resultHeader }}</template>
            <template v-slot:content>{{ resultContent }}</template>
            <template v-slot:firstButton>
                <v-btn color="blue darken-1" text @click="closeModal">확인</v-btn>
            </template>
        </common-modal>
    </div>
</template>

<script>
import commonModal from '@/components/common/Modal/CommonModal.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'RecruitmentStatus',
    components: { commonModal },
    props: {
        recruitments: {
            type: Array,
        },
        projectId: {
            type: Number,
        },
        status: {
            type: Number,
        },
    },
    data() {
        return {
            showSuccessModal: false,
            resultHeader: '',
            resultContent: '',
        };
    },
    computed: {
        ...mapGetters('member', ['isLogIn']),
        ...mapGetters('project', ['hasApplied']),
    },
    methods: {
        ...mapActions('project', ['fetchApplicationStatus']),

        async applyForProject(jobId) {
            try {
                await this.$axiosInstance.post(
                    `/api/projects/${this.projectId}/applications`,
                    {
                        jobId: jobId,
                    },
                    { context: this },
                );

                await this.fetchApplicationStatus(this.projectId);
                console.log('지원 후 hasApplied: ', this.hasApplied);

                this.resultHeader = '지원 완료';
                this.resultContent = '프로젝트 지원완료';
                this.showSuccessModal = true;
                this.$emit('project-applied');
            } catch (error) {
                // 인터셉터가 처리해서 필요없음
            }
        },

        async closeModal() {
            this.showSuccessModal = false;
        },
    },
};
</script>

<style scoped></style>
