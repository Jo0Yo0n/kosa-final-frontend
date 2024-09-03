<!--
 * fileName       : LoginModal
 * author         : yunbin
 * date           : 2024-08-26
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-08-26        yunbin       최초 생성
-->
<script>
import SocialLoginButton from '@/components/login/SocialLoginButton.vue';
import googleIcon from '@/assets/google-icon.png'; // 이미지 파일을 import
import kakaoIcon from '@/assets/kakao-icon.png'; // 이미지 파일을 import

export default {
    props: {
        value: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isVisible: this.value,
            errorMessage: new URLSearchParams(window.location.search).get('error') || '',
            googleIcon,
            kakaoIcon,
        };
    },
    watch: {
        value(val) {
            this.isVisible = val;
        },
        isVisible(val) {
            this.$emit('input', val);
        },
    },
    methods: {
        closeModal() {
            this.isVisible = false;
            this.errorMessage = '';
        },
        getOauthUrl(platform) {
            const redirectUri = encodeURIComponent(window.location.href);
            return `${process.env.VUE_APP_API_URL}/oauth2/authorize/${platform}?redirect_uri=${redirectUri}`;
        },
    },
    components: { SocialLoginButton },
};
</script>

<template>
    <v-dialog v-model="isVisible" max-width="400px">
        <v-card>
            <v-card-title class="custom-card-title">
                <span class="headline">로그인</span>
                <v-btn class="close-button" icon @click="closeModal">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
                <SocialLoginButton class="social-login" color="white" text="구글 계정으로 로그인" :icon-src="googleIcon" :loginUrl="getOauthUrl('google')" />
                <SocialLoginButton class="social-login" color="#F7E03D" text="카카오 계정으로 로그인" :icon-src="kakaoIcon" :loginUrl="getOauthUrl('kakao')" />
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<style scoped>
.custom-card-title {
    display: flex; /* Flexbox 컨테이너로 설정 */
    align-items: center; /* 수직 중앙 정렬 */
    position: relative;
}

.headline {
    text-align: center;
    flex-grow: 1; /* 헤드라인이 가능한 한 많이 공간을 차지하도록 설정 */
    font-weight: bold;
}

.close-button {
    position: absolute; /* 절대 위치 설정 */
    top: 10px;
    right: 10px; /* 오른쪽 상단에 위치 */
}
.social-login {
    margin-bottom: 10px;
}
</style>
