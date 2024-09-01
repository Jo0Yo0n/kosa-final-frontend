<!--
 * fileName       : LeaderInfo
 * author         : JooYoon
 * date           : 2024-08-29
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-08-29        JooYoon       최초 생성
-->

<template>
    <div>
        <h2>리더 정보</h2>
        <v-card flat>
            <v-card-text>
                <v-row align="center" no-gutters>
                    <v-col cols="auto" class="mr-4">
                        <v-avatar size="48" tile>
                            <v-img :src="leader.memberImg"></v-img>
                        </v-avatar>
                    </v-col>
                    <v-col>
                        <span class="subtitle-1 font-weight-bold" style="color: black">{{ leader.memberNickname }}</span>
                        <v-btn icon :href="leader.memberGithub" target="_blank" color="black" class="ml-2">
                            <v-icon>mdi-github</v-icon>
                        </v-btn>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn color="brown" dark class="font-weight-light">1:1 채팅</v-btn>
                    </v-col>
                </v-row>
                <v-row class="mt-2" align="center" no-gutters>
                    <v-col>
                        <div class="d-flex flex-wrap align-center">
                            <template v-for="tech in leader.techStack">
                                <div v-if="tech.imgUrl" :key="tech.name" class="ma-2">
                                    <v-avatar size="48" class="mb-1" tile>
                                        <v-img :src="tech.imgUrl" :alt="tech.name"></v-img>
                                    </v-avatar>
                                    <div class="text-center">#{{ tech.name }}</div>
                                </div>
                                <v-chip v-else :key="tech.name" class="ma-2" outlined> #{{ tech.name }} </v-chip>
                            </template>
                        </div>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'LeaderInfo',
    props: {
        leader: {
            type: Object,
        },
    },
};
</script>

<style scoped></style>
