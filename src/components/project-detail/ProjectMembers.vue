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
            <template v-if="hasAnyMembers">
                <div v-for="recruitment in recruitments" :key="recruitment.jobId" class="mb-4">
                    <template v-if="recruitment.members.length > 0">
                        <h3 class="subtitle-1 font-weight-bold mb-2 text-h6">{{ recruitment.jobName }}</h3>
                        <div class="d-flex flex-wrap">
                            <member-card v-for="member in recruitment.members" :key="member.memberId" :member="member" />
                        </div>
                    </template>
                </div>
            </template>
            <v-alert v-else type="info" color="green" text>아직 참여 중인 멤버가 없어요.</v-alert>
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
            default: () => [],
        },
    },
    computed: {
        hasAnyMembers() {
            return this.recruitments.some((recruitment) => recruitment.members.length > 0);
        },
    },
};
</script>

<style scoped></style>
