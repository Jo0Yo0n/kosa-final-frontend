<!--
 * fileName       : CommonButton
 * author         : Yeong-Huns
 * date           : 2024-09-06
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-09-06        Yeong-Huns       최초 생성
-->
<script>
export default {
    name: 'CommonButton',
};
</script>

<template>
    <v-btn color="brown" dark class="font-weight-light" @click="$emit('click')">
        <slot>기본 값</slot>
    </v-btn>
</template>

<style scoped></style>
