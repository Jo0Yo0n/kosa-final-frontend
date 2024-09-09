<!--
 * fileName       : ChatMessage
 * author         : yunbin
 * date           : 2024-09-04
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-09-04        yunbin       최초 생성
-->
<script>
import moment from 'moment';

export default {
    name: 'ChatMessage',
    props: {
        message: Object,
        currentUser: Number,
        senderImage: String,
    },
    computed: {
        formattedTime() {
            const time = moment(this.message.created_at);

            const hour = time.hours();
            const period = hour < 12 ? '오전' : '오후';
            const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
            const minute = time.minutes();

            return `${period} ${formattedHour}시 ${minute < 10 ? '0' + minute : minute}분`;
        },
        isCurrentUser() {
            return this.message.sender_id === this.currentUser;
        },
    },
};
</script>

<template>
    <div>
        <v-row class="ma-2" :class="{ 'justify-end': isCurrentUser }">
            <div class="chat-bubble-container" :class="{ 'current-user': isCurrentUser }">
                <v-avatar size="36" class="profile-img">
                    <img :src="senderImage" alt="profile_img" crossOrigin="anonymous" />
                </v-avatar>
                <div class="chat-bubble" :style="{ backgroundColor: isCurrentUser ? '#D7CCC8' : '#8D6E63' }">
                    <p>{{ message.content }}</p>
                </div>
                <p class="send-date">{{ formattedTime }}</p>
            </div>
        </v-row>
    </div>
</template>

<style scoped>
.chat-bubble-container {
    display: flex;
    align-items: flex-end;
    margin-top: 10px;
}

.profile-img {
    margin: 0 8px 30px;
}
.chat-bubble {
    max-width: 50%;
    padding: 10px 15px;
    border-radius: 15px;
    margin-bottom: 10px;
    position: relative;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.chat-bubble-container.current-user {
    flex-direction: row-reverse;
}

.chat-bubble p {
    margin: 0;
    color: #333;
}
.send-date {
    font-size: 0.75rem;
    color: #888;
    margin: 0 8px 2px 8px;
    align-self: flex-end;
}
</style>
