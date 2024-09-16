<template>
    <v-app>
        <header-layout />
        <v-main style="width: 1200px; margin: 0 auto">
            <content-layout />
        </v-main>
        <div class="chat-button">
            <ChatButton color="#A1887F">mdi-account</ChatButton>
            <!--            <ChatButton color="#8D6E63">mdi-account-multiple</ChatButton>-->
        </div>
        <footer-layout />
    </v-app>
</template>

<script>
import HeaderLayout from './common/HeaderLayout.vue';
import FooterLayout from './common/FooterLayout.vue';
import ContentLayout from './common/ContentLayout.vue';
import ChatButton from '@/components/chat/ChatButton.vue';
import { mapActions } from 'vuex';

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
            this.login(accessToken);
        }
        // else {
        //     const storedToken = localStorage.getItem('jwt');
        //     if (storedToken) {
        //         this.login(storedToken); // localStorage에서 토큰을 가져와 Vuex에 저장
        //     }
        // }
    },
    methods: {
        ...mapActions('member', ['login']),
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
