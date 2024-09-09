<!--
 * fileName       : MemberCard
 * author         : JooYoon
 * date           : 2024-09-01
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-09-01           JooYoon           최초 생성
 * 2024-09-08           yunbin            채팅 요청 추가
-->

<template>
    <div>
        <v-card class="ma-2 member-card" outlined>
            <v-card-text class="pa-3">
                <div class="d-flex mb-3">
                    <v-avatar size="100" class="mr-3" tile rounded="xxl">
                        <v-img :src="member.memberImg"></v-img>
                    </v-avatar>
                    <div class="d-flex flex-column justify-center flex-grow-1">
                        <div class="d-flex align-center justify-center mb-1">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <span
                                        class="font-weight-medium black--text text-truncate"
                                        v-bind="attrs"
                                        v-on="on"
                                        style="max-width: 100px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 20px"
                                    >
                                        {{ member.memberNickname }}
                                    </span>
                                </template>
                                <span>{{ member.memberNickname }}</span>
                            </v-tooltip>

                            <v-btn icon :href="member.memberGithub" target="_blank" color="black" small class="ml-1">
                                <v-icon>mdi-github</v-icon>
                            </v-btn>
                        </div>
                        <div class="d-flex justify-center">
                            <v-btn color="brown" dark small class="font-weight-light" style="width: 60%" @click="showModal = true">커피 챗</v-btn>
                        </div>
                    </div>
                </div>

                <div class="mt-3">
                    <div class="black--text mb-1 grey--text" style="font-size: 12px">진행 중인 프로젝트: {{ member.ongoingProjectCount }}개</div>
                    <div class="black--text mb-2 grey--text" style="font-size: 12px">완료한 프로젝트: {{ member.completedProjectCount }}개</div>
                    <div class="on font-weight-medium black--text mb-1" style="font-size: 18px">기술 스택</div>
                    <div class="d-flex flex-wrap">
                        <template v-for="tech in member.techStack">
                            <div v-if="tech.imgUrl" :key="tech.name" class="ma-1 tech-item">
                                <v-avatar size="30" class="mb-1" tile>
                                    <v-img :src="tech.imgUrl" :alt="tech.name"></v-img>
                                </v-avatar>
                                <div class="caption text-center black--text">#{{ tech.name }}</div>
                            </div>
                            <v-chip v-else :key="tech.name" class="caption ma-2" outlined> #{{ tech.name }} </v-chip>
                        </template>
                    </div>
                </div>
            </v-card-text>
        </v-card>
        <ChatModal v-model="showModal" :member="member"></ChatModal>
    </div>
</template>

<script>
import ChatModal from '@/components/chat/ChatModal.vue';

export default {
    name: 'MemberCard',
    components: { ChatModal },
    props: {
        member: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            showModal: false,
        };
    },
};
</script>

<style scoped>
.member-card {
    width: 260px;
    height: auto;
    aspect-ratio: 4 / 5;
    border: 2px solid #6f4a3d; /* 갈색 아웃라인 */
    border-radius: 10px;
    overflow: hidden;
}

.tech-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50px;
}
</style>
