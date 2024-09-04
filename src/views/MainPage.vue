<!--
 * fileName       : SignupModal
 * author         : yunbin
 * date           : 2024-08-28
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-08-28        yunbin       최초 생성
-->
<script>
import ChatButton from '@/components/chat/ChatButton.vue';

export default {
    name: 'MainPage',
    components: { ChatButton },
};
</script>

<template>
    <v-container>
        <!-- 메인 페이지 콘텐츠 -->
        <h1>메인 페이지</h1>
        <ChatButton color="#A1887F">mdi-account</ChatButton>
        <ChatButton color="#8D6E63">mdi-account-multiple</ChatButton>
    </v-container>
</template>

<style scoped></style>
