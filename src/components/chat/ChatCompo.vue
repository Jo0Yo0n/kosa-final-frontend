<!--
 * fileName       : ChatCompo
 * author         : yunbin
 * date           : 2024-09-04
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-09-04        yunbin       최초 생성
 * 2024-09-08        yunbin       첫 채팅일 때 처리
-->
<script>
import moment from 'moment/moment';
import 'moment/locale/ko';

export default {
    name: 'ChatCompo',
    props: {
        backColor: {
            type: String,
            default: '#8d6e63',
        },
        textColor: {
            type: String,
            default: '#d7ccc8',
        },
        chat: Object,
    },
    computed: {
        formattedTime() {
            // 메시지가 없거나 created_at이 없으면 빈 문자열 반환
            if (!this.chat.messages || this.chat.messages.length === 0 || !this.chat.messages[0].created_at) {
                return '';
            }
            // 마지막 메시지의 created_at을 현재 시간과 비교하여 상대적인 시간 표시
            const lastMessageTime = moment(this.chat.messages[this.chat.messages.length - 1].created_at);
            return lastMessageTime.fromNow(); // "몇 분 전", "몇 시간 전" 등으로 반환
        },
        lastMessageContent() {
            // 메시지가 없으면 빈 문자열 반환
            return this.chat.messages && this.chat.messages.length > 0 ? this.chat.messages[this.chat.messages.length - 1].content : '';
        },
    },
};
</script>

<template>
    <div class="chat-compo-wrap">
        <v-row>
            <v-col class="pb-0">
                <div class="chat-compo pa-4" :style="{ backgroundColor: backColor }">
                    <v-row class="align-center">
                        <v-col cols="2">
                            <v-avatar size="48">
                                <img :src="chat.participants[0].img_url" alt="profile_img" />
                            </v-avatar>
                        </v-col>
                        <v-col cols="1">
                            <v-spacer></v-spacer>
                        </v-col>
                        <v-col cols="9">
                            <v-row no-gutters>
                                <div class="text-h6 m-0">{{ chat.participants[0].nickname }}</div>
                                <v-spacer></v-spacer>
                                <div class="text-caption" :style="{ color: textColor }">{{ formattedTime }}</div>
                            </v-row>
                            <v-row no-gutters>
                                <div class="text-subtitle-2 m-0 last-message">{{ lastMessageContent }}</div>
                            </v-row>
                        </v-col>
                    </v-row>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<style scoped>
.last-message {
    white-space: nowrap; /* 한 줄로 표시 */
    overflow: hidden; /* 넘치는 부분을 숨김 */
    text-overflow: ellipsis; /* 넘치는 부분을 '...'으로 표시 */
}
</style>
