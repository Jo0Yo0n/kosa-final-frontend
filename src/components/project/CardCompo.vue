<!--
 * fileName       : CardCompo
 * author         : Yeong-Huns
 * date           : 2024-08-29
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-08-29        Yeong-Huns       최초 생성
-->
<script>
export default {
    name: 'CardCompo',
};
</script>

<template>
    <v-card class="my-card rounded-0">
        <v-card-title class="white--text text-title">프로젝트 생성</v-card-title>
        <v-card-text class="white--text">만들고 싶은 프로젝트가 있다면 같이 정리해봐요</v-card-text>
    </v-card>
</template>

<style scoped>
.my-card {
    background-color: #a1887f;
    padding: 16px;
}
.text-title {
    font-size: 32px;
}
</style>
