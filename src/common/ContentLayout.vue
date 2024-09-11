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
                    <img :src="notification.logoUrl" alt="logo" />
                </v-avatar>
                <v-col>
                    <div class="d-flex align-center">
                        <span :style="{ color: '#333', fontSize: '16px', fontWeight: 'bold', marginRight: '8px' }">
                            {{ notification.title }}
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
        <!--
         승인 알람 창
        <v-snackbar
            v-model="showProjectNotification"
            :timeout="5000"
            top
            color="white"
            :style="{ position: 'fixed', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 'auto', zIndex: 9999, borderRadius: '8px', padding: '12px' }"
        >
            <v-row no-gutters align="center">
                <v-avatar size="40" class="mr-2" color="primary">
                    <v-icon dark>mdi-folder-account</v-icon>
                </v-avatar>
                <v-col>
                    <div class="d-flex align-center">
                        <span :style="{ color: '#333', fontSize: '16px', fontWeight: 'bold' }">
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
        </v-snackbar>-->

        <router-view></router-view>
        <AdditionalInfoModal v-if="isNewUser" @info-submitted="handleInfoSubmitted" />
    </div>
</template>

<script>
import AdditionalInfoModal from '@/components/login/AdditionalInfoModal.vue';
export default {
    components: { AdditionalInfoModal },
    data() {
        return {
            isNewUser: false, // 새 사용자 여부 확인
            showNotification: false, // 푸시 알림 표시 여부
            notification: {
                title: '샴푸의 요정',
                message: '혹시 짜장배달 되나요',
                logoUrl: 'https://lh3.googleusercontent.com/a/ACg8ocKz2zF2C7m_spjw0G7bhNDS9blvM4GvCA0Qh7xdYcnHBYPszg=s96-c',
            },
        };
    },
    created() {
        // 컴포넌트가 생성될 때 쿼리 파라미터를 확인
        const urlParams = new URLSearchParams(window.location.search);
        this.isNewUser = urlParams.get('newUser') === 'true'; // newUser 쿼리 파라미터 체크
    },
    methods: {
        handleInfoSubmitted() {
            // 정보 제출 후 모달을 닫고 다른 작업 수행 (예: 메인 페이지로 리디렉션)
            this.isNewUser = false; // 모달 닫기
            alert('추가 정보가 성공적으로 저장되었습니다!');
        },
        triggerPushNotification(title, message, logoUrl) {
            this.notification = { title, message, logoUrl };
            this.showNotification = true;
        },
    },
};
</script>

<style scoped></style>
