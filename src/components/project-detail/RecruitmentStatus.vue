<!--
 * fileName       : RecruitmentStatus
 * author         : JooYoon
 * date           : 2024-08-29
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-08-29        JooYoon       최초 생성
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
                                <div class="text-h6 mb-1 font-weight-bold">{{ recruitment.jobName }}</div>
                                <div class="text-subtitle-1 mb-1">{{ recruitment.members.length }} / {{ recruitment.jobCount }}</div>

                                <!-- 지원하기 버튼 랜더링 조건 -->
                                <!-- TODO: 1. 사용자가 로그인한 상태여야 함 -->
                                <!-- 2. 프로젝트가 모집 중 상태여야 함 -->
                                <!-- 3. 모집 인원보다 참여 인원이 적어야 함 -->
                                <!-- TODO: 4. 로그인한 사용자가 해당 project_member 테이블에 없어야 함 -->
                                <v-btn
                                    v-if="status === 0 && recruitment.members.length < recruitment.jobCount"
                                    color="brown"
                                    dark
                                    small
                                    class="font-weight-light"
                                    rounded
                                    @click="applyForProject(recruitment.jobId)"
                                    >지원하기
                                </v-btn>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'RecruitmentStatus',
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
    methods: {
        async applyForProject(jobId) {
            try {
                await this.$axios.post(`/api/projects/${this.projectId}/applications`, {
                    jobId: jobId,
                });

                alert('지원이 완료되었습니다.');
            } catch (error) {
                console.error('지원 중 오류가 발생했습니다.: ', error);
                alert('지원 중 오류가 발생했습니다. 다시 시도해주세요.');
            }
        },
    },
};
</script>

<style scoped></style>
