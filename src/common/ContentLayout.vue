<template>
    <div>
        <!-- 푸시 알림 (첫 번째) -->
        <v-snackbar v-model="showNotification" :timeout="5000" top color="white" class="snackbar-custom" :style="firstSnackbarStyle" @click.native="closeNotification('first')">
            <v-row no-gutters align="center">
                <v-avatar size="40" class="mr-2">
                    <img :src="notification.imgUrl" alt="logo" />
                </v-avatar>
                <v-col>
                    <div class="d-flex align-center">
                        <span class="snackbar-title">{{ notification.nickname }}</span>
                        <span class="snackbar-time">{{ notification.time }}</span>
                    </div>
                    <div class="snackbar-message">{{ notification.message }}</div>
                </v-col>
            </v-row>
        </v-snackbar>

        <!-- 승인 알람 창 (두 번째) -->
        <v-snackbar
            v-model="showProjectNotification"
            :timeout="5000"
            top
            color="white"
            class="snackbar-custom"
            :style="secondSnackbarStyle"
            @click.native="closeNotification('second')"
        >
            <v-row no-gutters align="center">
                <v-avatar size="40" class="mr-2">
                    <img v-if="projectNotification.imgUrl && projectNotification.imgUrl !== ''" :src="projectNotification.imgUrl" alt="User Avatar" />
                    <v-icon v-else-if="projectNotification.status === '승인'" dark color="primary">mdi-checkbox-blank-circle-outline</v-icon>
                    <v-icon v-else dark color="error">mdi-close-circle</v-icon>
                </v-avatar>
                <v-col>
                    <div class="d-flex align-center">
                        <span class="snackbar-title">{{ projectNotification.title }}</span>
                    </div>
                    <div class="snackbar-message">{{ projectNotification.message }}</div>
                </v-col>
            </v-row>
        </v-snackbar>

        <!-- projectId가 변경될 때마다 컴포넌트 다시 마운트-->
        <router-view :key="$route.params.projectId"></router-view>
        <AdditionalInfoModal v-if="isNewUser" @info-submitted="handleInfoSubmitted" />
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
            isNewUser: false,
            showNotification: false,
            showProjectNotification: false,
            notification: {
                nickname: '',
                message: '',
                imgUrl: '',
                time: '방금 전',
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
        const urlParams = new URLSearchParams(window.location.search);
        this.isNewUser = urlParams.get('newUser') === 'true'; // newUser 쿼리 파라미터 체크
    },
    mounted() {
        this.connectSocket();
        eventEmitter.on('alarm', this.handleAlarmModal);
    },
    beforeDestroy() {
        eventEmitter.off('alarm', this.handleAlarmModal);
    },
    methods: {
        handleAlarmModal(message) {
            console.log('Received message:', message);
            switch (message.type) {
                case 'application-message':
                    this.projectNotification = {
                        title: message.projectName,
                        message: `${message.nickName}님이 ${message.jobName} 직무로 지원하셨습니다.`,
                        imgUrl: message.imgUrl,
                        status: '',
                    };
                    this.showProjectNotification = true;
                    this.$nextTick(() => {
                        this.showProjectNotification = true; // 렌더링 강제 업데이트
                    });
                    console.log('Project notification shown:', this.showProjectNotification);
                    break;
                case 'approval-message':
                    // eslint-disable-next-line no-case-declarations
                    const resultMessage = message.acceptStatus == 1 ? '승인' : '거절';
                    this.projectNotification = {
                        title: message.projectName,
                        message: `회원님의 참여 신청이 ${resultMessage} 되었습니다.`,
                        imgUrl: '',
                        status: resultMessage,
                    };
                    this.showProjectNotification = true;
                    this.$nextTick(() => {
                        this.showProjectNotification = true; // 렌더링 강제 업데이트
                    });
                    console.log('Approval notification shown:', this.showProjectNotification);
                    break;
                default:
                    console.log('알 수 없는 알람 타입:', message);
            }
        },
        handleInfoSubmitted() {
            this.isNewUser = false;
            alert('추가 정보가 성공적으로 저장되었습니다!');
        },
        closeNotification(type) {
            if (type === 'first') {
                this.showNotification = false;
            } else if (type === 'second') {
                this.showProjectNotification = false;
            }
            console.log(`Notification ${type} closed.`);
        },
        connectSocket() {
            this.socket = getSocket();
            this.socket.on('private message', (msgObj) => {
                console.log('Received private message:', msgObj);
                if (!this.selectedChatRoom || (this.selectedChatRoom.room_id !== msgObj.roomId && msgObj.from !== this.selectedChatRoom.participants[0]._id)) {
                    this.showNotification = true;
                    this.notification.nickname = msgObj.fromNickname;
                    this.notification.message = msgObj.message;
                    this.notification.imgUrl = msgObj.fromImgUrl;
                    this.$nextTick(() => {
                        this.showNotification = true; // 렌더링 강제 업데이트
                    });
                    console.log('First notification shown:', this.showNotification);
                }
            });
        },
    },
    computed: {
        ...mapGetters('chat', ['selectedChatRoom']),
        firstSnackbarStyle() {
            return {
                position: 'fixed',
                top: this.showProjectNotification ? '155px' : '70px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 'auto',
                zIndex: 9998,
                borderRadius: '8px',
                padding: '12px',
                minWidth: '458px', // 통일된 너비
                maxWidth: '458px',
                height: '68px',
            };
        },
        secondSnackbarStyle() {
            return {
                position: 'fixed',
                top: '70px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 'auto',
                zIndex: 9999,
                borderRadius: '8px',
                padding: '12px',
                minWidth: '458px', // 통일된 너비
                maxWidth: '458px',
                height: '68px',
            };
        },
    },
};
</script>

<style scoped>
.snackbar-custom {
    width: 458px !important; /* 강제로 너비를 동일하게 설정 */
    min-height: 68px !important; /* 높이도 동일하게 설정 */
    max-height: 68px !important;
    display: flex;
    align-items: center;
}

.snackbar-title {
    color: #333;
    font-size: 16px;
    font-weight: bold;
    margin-right: 8px;
}

.snackbar-time {
    color: #888;
    font-size: 12px;
}

.snackbar-message {
    color: #555;
    font-size: 14px;
}

.bubble-enter-active,
.bubble-leave-active {
    transition: transform 0.3s ease-out, opacity 0.3s ease-out;
}

.bubble-enter,
.bubble-leave-to {
    transform: scale(0.95);
    opacity: 0;
}
</style>
