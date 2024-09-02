<!--
 * fileName       : TechStack
 * author         : JooYoon
 * date           : 2024-08-30
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-08-30        JooYoon       최초 생성
-->

<template>
    <v-row>
        <v-col cols="12">
            <h2>기술 스택</h2>
            <div class="d-flex flex-wrap align-center">
                <template v-for="tech in projectTechStack">
                    <div v-if="tech.imgUrl" :key="tech.name" class="ma-2 d-flex flex-column align-center">
                        <v-avatar size="40" class="mb-1" tile>
                            <v-img :src="tech.imgUrl" :alt="tech.name"></v-img>
                        </v-avatar>
                        <div class="caption text-center black--text">#{{ tech.name }}</div>
                    </div>
                    <v-chip v-else :key="tech.name" class="ma-2" outlined> #{{ tech.name }} </v-chip>
                </template>
            </div>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: 'TechStack',
    props: {
        projectTechStack: {
            type: Array,
        },
    },
};
</script>

<style scoped></style>
