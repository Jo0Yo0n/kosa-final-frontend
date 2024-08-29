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
    <v-card flat class="mb-4">
        <v-card-title>리더 정보</v-card-title>
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
                    <v-btn color="brown" dark>1:1 채팅</v-btn>
                </v-col>
            </v-row>
            <v-row class="mt-2" align="center" no-gutters>
                <v-col>
                    <v-chip v-for="tech in leader.techStack" small :key="tech" class="mr-1">
                        {{ tech }}
                    </v-chip>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
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
