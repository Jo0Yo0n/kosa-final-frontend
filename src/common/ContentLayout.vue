<template>
    <div>
        <!-- 푸시 알림 -->
        <v-snackbar
            v-model="showNotification"
            :timeout="5000"
            top
            color="white"
            class="rounded-xl"
            :style="{ position: 'fixed', top: '10%', left: '50%', transform: 'translateX(-50%)', width: 'auto', zIndex: 9999, borderRadius: '8px', padding: '12px' }"
        >
            <v-row no-gutters align="center">
                <v-avatar size="40" class="mr-2">
                    <img :src="notification.imgUrl" alt="logo" />
                </v-avatar>
                <v-col>
                    <div class="d-flex align-center">
                        <span :style="{ color: '#333', fontSize: '16px', fontWeight: 'bold', marginRight: '8px' }">
                            {{ notification.nickname }}
                        </span>
                        <span :style="{ color: '#888', fontSize: '12px' }">{{ notification.time }}</span>
                    </div>
                    <div :style="{ color: '#555', fontSize: '14px' }">
                        {{ notification.message }}
                    </div>
                </v-col>
            </v-row>
            <template v-slot:action="{ attrs }">
                <v-btn icon v-bind="attrs" @click="showNotification = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </v-snackbar>

        <!-- 승인 알람 창 -->
        <v-snackbar
            v-model="showProjectNotification"
            :timeout="5000"
            top
            color="white"
            :style="{ position: 'fixed', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 'auto', zIndex: 9999, borderRadius: '8px', padding: '12px' }"
        >
            <v-row no-gutters align="center">
                <v-avatar size="40" class="mr-2">
                    <img v-if="projectNotification.imgUrl && projectNotification.imgUrl !== ''" :src="projectNotification.imgUrl" alt="User Avatar" />
                    <v-icon v-else-if="projectNotification.status === '승인'" dark color="primary"> mdi-checkbox-blank-circle-outline </v-icon>
                    <v-icon v-else dark color="error"> mdi-close-circle </v-icon>
                </v-avatar>
                <v-col>
                    <div class="d-flex align-center">
                        <!-- Title 표시 -->
                        <span :style="{ color: '#333', fontSize: '18px', fontWeight: 'bold', marginBottom: '4px' }">
                            {{ projectNotification.title }}
                        </span>
                    </div>
                    <div class="d-flex align-center">
                        <!-- Message 표시 -->
                        <span :style="{ color: '#333', fontSize: '16px' }">
                            {{ projectNotification.message }}
                        </span>
                    </div>
                </v-col>
            </v-row>
            <template v-slot:action="{ attrs }">
                <v-btn icon v-bind="attrs" @click="showProjectNotification = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </v-snackbar>
        <router-view></router-view>
        <AdditionalInfoModal v-if="isNewUser" @info-submitted="handleInfoSubmitted" />
        <!--        <ChatAlarmPopup v-if="showAlarm" :nickname="alarmNickname" :messageContent="alarmMessage" />-->
    </div>
</template>

<script>
import AdditionalInfoModal from '@/components/login/AdditionalInfoModal.vue';
import { getSocket } from '../../src/socket.js';
import { mapGetters } from 'vuex';
import { eventEmitter } from '@/socket';

export default {
    components: { AdditionalInfoModal },

    data() {
        return {
            isNewUser: false, // 새 사용자 여부 확인
            showNotification: false,
            showProjectNotification: false,
            notification: {
                nickname: '',
                message: '',
                imgUrl: '',
            },
            projectNotification: {
                title: '',
                message: '',
                imgUrl: '',
                status: '',
            },
        };
    },
    created() {
        // 컴포넌트가 생성될 때 쿼리 파라미터를 확인
        const urlParams = new URLSearchParams(window.location.search);

        this.isNewUser = urlParams.get('newUser') === 'true'; // newUser 쿼리 파라미터 체크
    },
    mounted() {
        this.connectSocket(); // 윤빈님꺼
        eventEmitter.on('alarm', this.handleAlarmModal);
    },
    beforeDestroy() {
        eventEmitter.off('alarm', this.handleAlarmModal);
    },
    methods: {
        handleAlarmModal(message) {
            switch (message.type) {
                case 'application-message':
                    console.log('Application 메시지:', message);
                    this.projectNotification = {
                        title: message.projectName,
                        message: `${message.nickName}님이 ${message.jobName} 직무로 지원하셨습니다.`,
                        imgUrl: message.imgUrl,
                        status: '',
                    };
                    this.showProjectNotification = true;
                    break;
                case 'approval-message':
                    console.log('Approval 메시지:', message);
                    // eslint-disable-next-line no-case-declarations
                    const resultMessage = message.acceptStatus == 1 ? '승인' : '거절';
                    this.projectNotification = {
                        title: message.projectName,
                        message: `회원님의 참여 신청이 ${resultMessage} 되었습니다.`,
                        imgUrl: '',
                        status: resultMessage,
                    };
                    this.showProjectNotification = true;
                    break;

                default:
                    console.log('알 수 없는 알람 타입:', message);
            }
        },
        handleInfoSubmitted() {
            // 정보 제출 후 모달을 닫고 다른 작업 수행 (예: 메인 페이지로 리디렉션)
            this.isNewUser = false; // 모달 닫기
            alert('추가 정보가 성공적으로 저장되었습니다!');
        },
        triggerPushNotification(title, message, logoUrl) {
            this.notification = { title, message, logoUrl };
            this.showNotification = true;
        },
        triggerProjectApplicationNotification(message) {
            this.projectNotification.message = `회원님의 ${message.projectName} 프로젝트의 ${message.jobName}에 `;
        },
        triggerProjectApprovalNotification(projectName, status) {
            this.projectNotification.message = `${projectName} 참여 요청이 ${status} 되었습니다.`;
            this.showProjectNotification = true;
        },
        connectSocket() {
            this.socket = getSocket();
            this.socket.on('private message', (msgObj) => {
                console.log('메시지 수신:', msgObj);
                console.log('alarm', this.selectedChatRoom);
                if (!this.selectedChatRoom || (this.selectedChatRoom.room_id !== msgObj.roomId && msgObj.from !== this.selectedChatRoom.participants[0]._id)) {
                    this.showNotification = true;
                    this.notification.nickname = msgObj.fromNickname;
                    this.notification.message = msgObj.message;
                    this.notification.imgUrl = msgObj.fromImgUrl;
                }
            });
        },
    },
    computed: {
        ...mapGetters('chat', ['selectedChatRoom']),
    },
};
</script>

<style scoped></style>
