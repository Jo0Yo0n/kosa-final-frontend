<!--
 * fileName       : ProjectManagementCard
 * author         : Yeong-Huns
 * date           : 2024-09-07
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-09-07        Yeong-Huns       최초 생성
-->
<script>
export default {
    name: 'ProjectManagementCard',
    props: {
        member: {
            type: Object,
            required: true,
        },
    },
    computed: {
        memberImg() {
            return this.member.projectMemberImgUrl || '';
        },
        memberNickname() {
            return this.member.projectMemberNickname || 'Unknown';
        },
        memberGithub() {
            return this.member.projectMemberGitHub || '';
        },
        ongoingProjectCount() {
            return this.member.ongoingProjectCount || 0;
        },
        completedProjectCount() {
            return this.member.completedProjectCount || 0;
        },
        techStack() {
            return this.member.techStack || [];
        },
    },
    methods: {
        approveMember() {
            this.$emit('approve-member', this.member);
        },
        rejectMember() {
            this.$emit('reject-member', this.member);
        },
    },
};
</script>

<template>
    <v-card class="ma-2" outlined rounded="lg" elevation="1" style="width: 300px">
        <v-card-text class="pa-3">
            <div class="d-flex mb-3">
                <v-avatar size="100" class="mr-3" tile rounded="xxl">
                    <v-img :src="memberImg" :alt="memberNickname"></v-img>
                </v-avatar>
                <div class="d-flex flex-column justify-center flex-grow-1">
                    <div class="d-flex align-center justify-center mb-1">
                        <span class="text-h5 font-weight-bold black--text">{{ memberNickname }}</span>
                        <v-btn v-if="memberGithub && memberGithub.trim() !== ''" icon :href="memberGithub" target="_blank" color="black" small class="ml-1">
                            <v-icon>mdi-github</v-icon>
                        </v-btn>
                    </div>
                    <div class="d-flex justify-center">
                        <v-btn color="brown" dark small class="font-weight-light" style="width: 40%" @click="approveMember">승인</v-btn>
                        &nbsp;
                        <v-btn color="brown" dark small class="font-weight-light" style="width: 40%" @click="rejectMember">거절</v-btn>
                    </div>
                </div>
            </div>

            <div class="mt-3">
                <div class="caption black--text mb-1">진행 중인 프로젝트: {{ ongoingProjectCount }}개</div>
                <div class="caption black--text mb-2">완료한 프로젝트: {{ completedProjectCount }}개</div>
                <div class="caption font-weight-bold black--text mb-1 text-h6">기술 스택</div>
                <div class="d-flex flex-wrap">
                    <template v-for="tech in techStack">
                        <div v-if="tech.techUrl" :key="tech.techName" class="ma-1 tech-item">
                            <v-avatar size="30" class="mb-1" tile>
                                <v-img :src="tech.techUrl" :alt="tech.techName"></v-img>
                            </v-avatar>
                            <div class="caption text-center black--text">#{{ tech.techName }}</div>
                        </div>
                        <v-chip v-else :key="tech.techName" class="ma-2" outlined> #{{ tech.techName }} </v-chip>
                    </template>
                </div>
            </div>
        </v-card-text>
    </v-card>
</template>

<style scoped>
.tech-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50px;
}
</style>
