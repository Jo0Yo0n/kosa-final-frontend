<!--
 * fileName       : ProjectDescription
 * author         : JooYoon
 * date           : 2024-08-29
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-08-29        JooYoon       최초 생성
-->

<template>
    <div class="mb-4">
        <h2 class="mb-4">프로젝트 소개</h2>
        <div v-html="description"></div>
    </div>
</template>

<script>
export default {
    name: 'ProjectDescription',
    props: {
        description: {
            type: String,
        },
    },
};
</script>

<style scoped></style>
