<!--
 * fileName       : MemberCard
 * author         : JooYoon
 * date           : 2024-09-01
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-09-01           JooYoon           최초 생성
-->

<template>
    <v-card class="ma-2" outlined rounded="lg" style="width: 300px">
        <v-card-text class="pa-3">
            <div class="d-flex mb-3">
                <v-avatar size="100" class="mr-3" tile rounded="xxl">
                    <v-img :src="member.memberImg" :alt="member.memberNickname"></v-img>
                </v-avatar>
                <div class="d-flex flex-column justify-center flex-grow-1">
                    <div class="d-flex align-center justify-center mb-1">
                        <span class="text-h5 font-weight-bold black--text">{{ member.memberNickname }}</span>
                        <v-btn icon :href="member.memberGithub" target="_blank" color="black" small class="ml-1">
                            <v-icon>mdi-github</v-icon>
                        </v-btn>
                    </div>
                    <div class="d-flex justify-center">
                        <v-btn color="brown" dark small class="font-weight-light" style="width: 60%">1:1 채팅</v-btn>
                    </div>
                </div>
            </div>

            <div class="mt-3">
                <div class="caption black--text mb-1">진행 중인 프로젝트: {{ member.ongoingProjectCount }}개</div>
                <div class="caption black--text mb-2">완료한 프로젝트: {{ member.completedProjectCount }}개</div>
                <div class="caption font-weight-bold black--text mb-1 text-h6">기술 스택</div>
                <div class="d-flex flex-wrap">
                    <template v-for="tech in member.techStack">
                        <div v-if="tech.imgUrl" :key="tech.name" class="ma-1 tech-item">
                            <v-avatar size="30" class="mb-1" tile>
                                <v-img :src="tech.imgUrl" :alt="tech.name"></v-img>
                            </v-avatar>
                            <div class="caption text-center black--text">#{{ tech.name }}</div>
                        </div>
                        <v-chip v-else :key="tech.name" class="ma-1" x-small outlined color="black"> #{{ tech.name }} </v-chip>
                    </template>
                </div>
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: 'MemberCard',
    props: {
        member: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style scoped>
.tech-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50px;
}
</style>
