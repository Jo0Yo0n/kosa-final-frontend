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
export default {
    name: 'ChatMessage',
};
</script>

<template>
    <div>
        <v-row class="ma-2">
            <v-col cols="1">
                <v-avatar size="36">
                    <img src="https://image.fnnews.com/resource/media/image/2023/08/12/202308121347460461_l.jpg" alt="profile_img" />
                </v-avatar>
            </v-col>
            <v-col cols="10">
                <div class="chat-bubble-container">
                    <div class="chat-bubble">
                        <p>messageeeeeeeeeeeeeeeeeee</p>
                    </div>
                    <div>
                        <p class="send-date">오전 10시 40분</p>
                    </div>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<style scoped>
.chat-bubble-container {
    display: flex;
    align-items: flex-end;
    margin-top: 10px;
}
.chat-bubble {
    max-width: 50%;
    padding: 10px 15px;
    border-radius: 15px;
    margin-bottom: 10px;
    position: relative;
    background-color: #f1f0f0;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.chat-bubble p {
    margin: 0;
    color: #333;
}
.send-date {
    font-size: 0.75rem; /* 작은 크기로 조정 */
    color: #888;
    margin-left: 8px; /* 버블과 약간의 간격 추가 */
    margin-bottom: 2px; /* 살짝 아래로 내리기 */
    align-self: flex-end; /* 수직 위치를 chat-bubble 아래로 조정 */
}
</style>
