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
                        <v-card outlined class="text-center" rounded>
                            <v-card-text style="color: black">
                                <div class="text-h6 mb-2">{{ recruitment.jobName }}</div>
                                <v-btn color="brown" dark x-small class="font-weight-light">지원하기</v-btn>
                                <div class="text-subtitle-1">{{ recruitment.members.length }} / {{ recruitment.jobCount }}</div>
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
    },
};
</script>

<style scoped></style>
