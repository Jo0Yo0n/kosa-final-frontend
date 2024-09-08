<template>
    <v-app-bar app dense color="#6F4A3D" height="55px">
        <v-container class="header-container d-flex align-center" style="max-width: 1200px">
            <router-link to="/">
                <v-img src="@/assets/logo.png" max-height="48"></v-img>
            </router-link>

            <v-spacer></v-spacer>

            <v-btn text class="nav-link font-weight-light" :to="{ name: 'SearchMember' }">라떼버 검색</v-btn>
            <v-btn text class="nav-link font-weight-light" :to="{ name: 'SearchProject' }">프로젝트 검색</v-btn>

            <v-btn v-if="isLogIn" text class="nav-link font-weight-light" :to="{ name: 'projectPost' }">프로젝트 생성</v-btn>

            <v-spacer></v-spacer>

            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="search"
                solo-inverted
                flat
                hide-details
                dense
                class="search-bar"
                color="#D2B48C"
                background-color="#ECE8ED"
                @keyup.enter="getSearchResults"
            ></v-text-field>

            <!-- 알람 버튼 -->
            <v-menu offset-y class="notification-menu" max-width="550" :style="{ maxHeight: '200px' }">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon ref="alarmButton" v-bind="attrs" v-on="on" class="alarm-button" @click="fetchNotifications">
                        <v-icon :class="{ 'shake-icon': isShaking }">mdi-bell</v-icon>
                        <!-- 흔들리는 애니메이션 적용 -->
                        <span v-if="hasNewNotifications" class="badge"></span>
                    </v-btn>
                </template>
                <v-list class="notification-list">
                    <v-list-item
                        v-for="(notification, index) in notifications"
                        :key="index"
                        class="notification-item"
                        :class="{ 'no-border': index === notifications.length - 1 }"
                        @click="navigateToProject(notification.projectId)"
                    >
                        <v-list-item-content>
                            <v-tooltip v-if="isTruncated(notification.message)" bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <div class="notification-message" v-bind="attrs" v-on="on">
                                        <span :class="{ 'unread-marker': !notification.isRead, 'read-marker': notification.isRead }"></span>
                                        <span class="message-text">{{ truncatedMessage(notification.message) }}</span>
                                    </div>
                                </template>
                                <span>{{ notification.message }}</span>
                            </v-tooltip>
                            <div v-else class="notification-message">
                                <span :class="{ 'unread-marker': !notification.isRead, 'read-marker': notification.isRead }"></span>
                                <span class="message-text">{{ notification.message }}</span>
                            </div>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-menu>

            <!--             테스트용
            <v-btn @click="triggerAlarm" class="ml-4">테스트 알람</v-btn>-->

            <div class="login-button-container">
                <template v-if="isLogIn">
                    <router-link to="/me">
                        <v-icon class="user-icon">mdi-account</v-icon>
                    </router-link>
                    <v-btn text @click="logout" class="login-button font-weight-light">로그아웃</v-btn>
                </template>
                <template v-else>
                    <v-btn text @click="showModal = true" class="login-button font-weight-light">회원가입/로그인</v-btn>
                </template>
                <LoginModal v-model="showModal" />
            </div>
        </v-container>
    </v-app-bar>
</template>

<script>
import LoginModal from '@/components/login/LoginModal.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
    components: { LoginModal },
    data() {
        return {
            search: '',
            showModal: false,
            hasNewNotifications: false, // 새 알림 여부
            notifications: [],
            isShaking: false, // 흔들림 여부
        };
    },
    computed: {
        ...mapGetters('member', ['isLogIn']),
    },
    methods: {
        ...mapActions('member', ['checkLoginStatus', 'logout']),
        getSearchResults() {
            if (this.search.trim()) {
                // 검색어를 쿼리 파라미터로 라우터에 전달하여 searchAllPage로 이동
                this.$router.push({
                    name: 'SearchAll',
                    query: { keyword: this.search },
                });

                // 검색이 완료된 후 검색어 초기화
                this.search = '';
            }
        },
        fetchNotifications() {
            this.$axios
                .get('/api/projects/notifications') // 알림 읽음 처리
                .then((response) => {
                    this.notifications = response.data;
                    this.hasNewNotifications = false;
                })
                .catch((error) => {
                    console.error('알림을 가져오는 중 오류 발생:', error);
                });
        },
        triggerAlarm() {
            this.hasNewNotifications = true;
            this.isShaking = true; // 아이콘 흔들림 시작
            setTimeout(() => {
                this.isShaking = false; // 흔들림 멈춤
            }, 1000); // 1초 후에 흔들림 멈춤
        },
        isTruncated(message) {
            return message.length > 20; // 길이 기준으로 툴팁이 필요한지 확인
        },
        truncatedMessage(message) {
            return message.length > 20 ? message.slice(0, 20) + '...' : message;
        },
        navigateToProject(projectId) {
            this.$router.push({ path: `/projects/${projectId}` });
        },
    },
    mounted() {
        this.checkLoginStatus(); // 컴포넌트 마운트 시 로그인 상태 확인
    },
};
</script>

<style scoped>
.header-container {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 16px;
}

.nav-link {
    color: #ece8ed !important;
}

.search-bar {
    background-color: #ece8ed;
    border-radius: 25px;
    max-width: 400px;
    margin: 0 20px;
}

.search-bar input {
    color: #6f4a3d;
}

.search-bar .v-label {
    color: #6f4a3d !important;
}

.search-bar >>> input {
    caret-color: black !important;
    color: black !important;
}

.search-bar >>> .v-label {
    color: rgba(0, 0, 0, 0.6) !important;
}

.search-bar >>> .v-input__slot {
    background: #ece8ed !important;
}

.login-button-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.login-button {
    cursor: pointer;
    color: white;
}

.nav-link,
.login-button {
    color: #ece8ed !important;
    font-size: 16px;
    text-decoration: none;
    display: flex;
    align-items: center;
    margin-left: 2px;
}

.login-button:hover {
    text-decoration: underline;
}

.user-icon {
    font-size: 24px;
    color: white;
}

.nav-link.router-link-exact-active {
    color: #ffd700 !important;
}
.alarm-button {
    position: relative;
    color: #ece8ed !important;
    margin-right: 12px;
}

.alarm-button .badge {
    position: absolute;
    top: 0;
    right: 0;
    background: red;
    border-radius: 50%;
    width: 10px;
    height: 10px;
}

.shake-icon {
    animation: bell-shake 1s ease infinite;
    transform-origin: top center; /* 종의 위쪽을 고정하여 회전 */
}

@keyframes bell-shake {
    0%,
    100% {
        transform: rotate(0deg);
    }
    25% {
        transform: rotate(15deg);
    }
    75% {
        transform: rotate(-15deg);
    }
}

.notification-menu {
    width: 550px !important;
}

.notification-list {
    max-height: 400px;
    overflow-y: auto;
}

.notification-item {
    border-bottom: 1px solid lightgray;
    padding: 8px 12px;
}

.notification-item.no-border {
    border-bottom: none;
}

.notification-message {
    display: flex;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.unread-marker::before {
    content: '•';
    color: red;
    font-size: 18px;
    margin-right: 8px;
}

.read-marker::before {
    content: '•';
    color: grey;
    font-size: 18px;
    margin-right: 8px;
}

.message-text {
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.notification-list::-webkit-scrollbar {
    width: 8px;
}

.notification-list::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
}

.notification-list::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
}

.notification-list::-webkit-scrollbar-thumb:hover {
    background: #555;
}
.shake-icon {
    animation: bell-shake 0.25s cubic-bezier(0.25, 1, 0.5, 1) infinite; /* 애니메이션 설정 */
    transform-origin: 20% 0%;
}

@keyframes bell-shake {
    0%,
    100% {
        transform: rotate(0deg);
    }
    25% {
        transform: rotate(15deg);
    }
    50% {
        transform: rotate(0deg);
    }
    75% {
        transform: rotate(-15deg);
    }
}
</style>
