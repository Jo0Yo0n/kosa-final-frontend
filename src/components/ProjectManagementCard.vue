<!--
 * fileName       : ProjectManagementCard
 * author         : Yeong-Huns
 * date           : 2024-09-07
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-09-07        Yeong-Huns       최초 생성
 * 2024-09-09        Yeong-Huns       카드 디자인 변경
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
    data() {
        return {
            isNameTruncated: false,
        };
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
            return [...this.member.techStack].sort((a, b) => {
                const lengthA = a.techUrl ? a.techUrl.length : Infinity;
                const lengthB = b.techUrl ? b.techUrl.length : Infinity;
                return lengthA - lengthB;
            });
        },
    },
    methods: {
        approveMember() {
            this.$emit('approve-member', this.member);
        },
        rejectMember() {
            this.$emit('reject-member', this.member);
        },
        checkNameLength() {
            this.$nextTick(() => {
                const element = this.$refs.memberNickname;
                if (element) {
                    this.isNameTruncated = element.scrollWidth + 10 > element.clientWidth;
                }
            });
        },
    },
    mounted() {
        this.checkNameLength();
        window.addEventListener('resize', this.checkNameLength);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.checkNameLength);
    },
};
</script>

<template>
    <v-card class="ma-2 member-card" outlined>
        <v-card-text class="pa-3">
            <div class="d-flex mb-3">
                <v-avatar size="80" class="mr-3" tile rounded="xxl">
                    <v-img :src="memberImg" :alt="memberNickname"></v-img>
                </v-avatar>
                <div class="d-flex flex-column justify-center">
                    <div class="d-flex align-items-center justify-between">
                        <div class="d-flex member-name-container">
                            <v-tooltip bottom v-if="isNameTruncated">
                                <template v-slot:activator="{ on, attrs }">
                                    <div class="member-name text-h6 flex-grow-1" v-bind="attrs" v-on="on" ref="memberNickname" :title="memberNickname">
                                        {{ memberNickname }}
                                    </div>
                                </template>
                                <span>{{ memberNickname }}</span>
                            </v-tooltip>
                            <div v-else class="flex-grow-1">
                                <div class="member-name text-h6" ref="memberNickname">{{ memberNickname }}</div>
                            </div>
                            <v-btn v-if="memberGithub && memberGithub.trim() !== ''" icon :href="memberGithub" target="_blank" color="black" small class="ml-1">
                                <v-icon>mdi-github</v-icon>
                            </v-btn>
                        </div>
                    </div>
                    <div class="d-flex justify-center mt-2">
                        <v-btn color="brown" dark small class="font-weight-light" style="width: 40%" @click="approveMember"> 승인 </v-btn>
                        &nbsp;
                        <v-btn color="brown" dark small class="font-weight-light" style="width: 40%" @click="rejectMember"> 거절 </v-btn>
                    </div>
                </div>
            </div>

            <div class="mt-3">
                <div class="caption grey--text mb-1">진행 중인 프로젝트: {{ ongoingProjectCount }}개</div>
                <div class="caption grey--text mb-2">완료한 프로젝트: {{ completedProjectCount }}개</div>
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
.member-card {
    width: 100%;
    max-width: 270px;
    min-width: 200px;
    height: auto;
    aspect-ratio: 4 / 5;
    border: 2px solid #6f4a3d; /* 갈색 아웃라인 */
    border-radius: 10px;
    overflow: hidden;
    transition: height 0.1s ease;
}
.tech-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50px;
}
.member-name-container {
    display: flex;
    align-items: center;
    max-width: 150px;
}
.member-name {
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 150px;
}
</style>
