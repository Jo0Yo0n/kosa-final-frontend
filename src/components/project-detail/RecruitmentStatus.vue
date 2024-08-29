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
    <v-card flat class="mb-4">
        <v-card-title>모집 현황</v-card-title>
        <v-card-text>
            <v-row>
                <v-col v-for="recruitment in recruitments" :key="recruitment.jobId" cols="2">
                    <v-card outlined class="text-center" rounded>
                        <v-card-text style="color: black">
                            <div class="text-h6 mb-2">{{ recruitment.jobName }}</div>
                            <div class="text-subtitle-1">{{ recruitment.members.length }} / {{ recruitment.jobCount }}</div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: 'RecruitmentStatus',
    props: {
        recruitments: {
            type: Array,
        },
    },
};
</script>

<style scoped></style>
