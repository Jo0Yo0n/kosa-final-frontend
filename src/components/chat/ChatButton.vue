<!--
 * fileName       : ChatButton
 * author         : yunbin
 * date           : 2024-09-03
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-09-03        yunbin       최초 생성
-->
<script>
import ChatModal from '@/components/chat/ChatModal.vue';

export default {
    name: 'ChatButton',
    components: { ChatModal },
    props: {
        color: {
            type: String,
        },
    },
    data() {
        return {
            showModal: false,
        };
    },
    methods: {},
};
</script>

<template>
    <div>
        <v-btn icon :color="color" @click="showModal = true" class="icon-button">
            <v-icon x-large>mdi-message</v-icon>
            <v-icon class="person-icon"><slot></slot></v-icon>
        </v-btn>
        <ChatModal v-model="showModal"></ChatModal>
    </div>
</template>

<style scoped>
.icon-button {
    position: relative;
}

.person-icon {
    position: absolute;
    top: -2px;
    right: 5px;
    color: black !important;
}
</style>
