<!--
 * fileName       : ProjectMembers
 * author         : JooYoon
 * date           : 2024-09-01
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-09-01           JooYoon           최초 생성
-->

<template>
    <v-row>
        <v-col cols="12">
            <h2 class="mb-4">참여 중인 멤버</h2>
            <div v-for="recruitment in recruitments" :key="recruitment.jobId" class="mb-4">
                <h3 class="subtitle-1 font-weight-bold mb-2 text-h6">{{ recruitment.jobName }}</h3>
                <div class="d-flex flex-wrap">
                    <member-card v-for="member in recruitment.members" :key="member.memberId" :member="member" />
                </div>
            </div>
        </v-col>
    </v-row>
</template>

<script>
import MemberCard from '@/components/MemberCard.vue';

export default {
    name: 'ProjectMembers',
    components: { MemberCard },
    props: {
        recruitments: {
            type: Array,
        },
    },
};
</script>

<style scoped></style>
