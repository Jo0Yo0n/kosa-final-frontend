<!--
 * fileName       : ChatModal
 * author         : yunbin
 * date           : 2024-09-03
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-09-03        yunbin       최초 생성
-->
<script>
import ChatCompo from '@/components/chat/ChatCompo.vue';
import ChatMessage from '@/components/chat/ChatMessage.vue';

export default {
    name: 'ChatModal',
    components: { ChatMessage, ChatCompo },
    props: {
        value: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isVisible: this.value,
            message: '', // 입력된 메시지
            nickname: '성찬',
        };
    },
    methods: {
        sendMessage() {
            if (this.message.trim() !== '') {
                console.log('Message sent:', this.message);
                this.message = ''; // 메시지 전송 후 입력 필드 초기화
            }
        },
        closeModal() {
            this.isVisible = false;
        },
    },
    watch: {
        value(val) {
            this.isVisible = val;
        },
        isVisible(val) {
            this.$emit('input', val);
        },
    },
};
</script>

<template>
    <div v-if="isVisible" class="chat-modal-wrap">
        <v-card class="chat-modal mb-0">
            <v-row no-gutters>
                <v-col cols="4">
                    <v-card-title class="headline">
                        <v-btn icon @click="closeModal">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                        대화 목록
                    </v-card-title>
                    <v-divider></v-divider>
                    <div>
                        <ChatCompo></ChatCompo>
                        <ChatCompo></ChatCompo>
                    </div>
                </v-col>
                <v-divider vertical></v-divider>
                <v-col cols="8">
                    <v-card-title class="headline">
                        <v-avatar size="36">
                            <img src="https://image.fnnews.com/resource/media/image/2023/08/12/202308121347460461_l.jpg" alt="profile_img" />
                        </v-avatar>
                        <div class="chat-title">{{ nickname }}님과의 대화</div>
                        <v-spacer></v-spacer>
                        <v-btn icon color="#6D4C41">
                            <v-icon x-large>mdi-logout</v-icon>
                        </v-btn>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text class="pa-0">
                        <!-- 채팅 내용 -->
                        <div :style="{ height: '450px', overflowY: 'auto' }"><ChatMessage></ChatMessage></div>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-textarea auto-grow v-model="message" placeholder="메시지를 입력하세요" @keyup.enter="sendMessage" clearable hide-details></v-textarea>
                        <v-btn icon @click="sendMessage" color="#8D6E63">
                            <v-icon x-large>mdi-send-circle</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>

<style scoped>
.chat-modal-wrap {
    position: fixed;
    width: 900px;
    height: 670px;
    bottom: 0;
    right: 1px;
    padding: 0;
    margin: 0;
    z-index: 1;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2); /* 모달에 그림자 추가 */
}
.chat-title {
    margin-left: 10px;
}
</style>
