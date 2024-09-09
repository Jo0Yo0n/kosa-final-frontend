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
};
</script>
<style scoped>
.chat-button {
    position: fixed;
    bottom: 130px;
    right: 50px;
    z-index: 1;
}
</style>
