<template>
    <v-app>
        <header-layout />
        <v-main style="width: 1200px; margin: 0 auto">
            <content-layout />
        </v-main>
        <div class="chat-button">
            <ChatButton color="#A1887F">mdi-account</ChatButton>
            <ChatButton color="#8D6E63">mdi-account-multiple</ChatButton>
        </div>
        <footer-layout />
    </v-app>
</template>

<script>
import HeaderLayout from './common/HeaderLayout.vue';
import FooterLayout from './common/FooterLayout.vue';
import ContentLayout from './common/ContentLayout.vue';
import ChatButton from '@/components/chat/ChatButton.vue';

export default {
    name: 'App',
    components: {
        ChatButton,
        HeaderLayout,
        ContentLayout,
        FooterLayout,
    },
    data: () => ({
        //
    }),
    created() {
        // 컴포넌트가 생성될 때 쿼리 파라미터를 확인
        const urlParams = new URLSearchParams(window.location.search);

        // 쿼리 파라미터에서 accessToken을 가져옴
        const accessToken = urlParams.get('accessToken');

        if (accessToken) {
            // accessToken을 localStorage에 저장
            localStorage.setItem('jwt', accessToken);
            console.log('AccessToken이 localStorage에 저장되었습니다.');
        }
    },
};
</script>
<style>
v-app {
    font-family: 'BMDOHYEON', sans-serif;
}
.chat-button {
    position: fixed;
    bottom: 130px;
    right: 50px;
    z-index: 1;
}
</style>
