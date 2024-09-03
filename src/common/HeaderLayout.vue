<template>
    <div class="login-button-container">
        <template v-if="isLogIn">
            <v-icon class="user-icon">mdi-account</v-icon>
            <span @click="logout" class="login-button">로그아웃</span>
        </template>
        <template v-else>
            <span @click="showModal = true" class="login-button">회원가입/로그인</span>
        </template>

        <LoginModal v-model="showModal" />
    </div>
</template>

<script>
import LoginModal from '@/components/login/LoginModal.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
    components: {
        LoginModal,
    },
    data() {
        return {
            showModal: false,
        };
    },
    computed: {
        ...mapGetters('member', ['isLogIn']),
    },
    methods: {
        ...mapActions('member', ['checkLoginStatus', 'logout']),
    },
    mounted() {
        this.checkLoginStatus(); // 컴포넌트 마운트 시 로그인 상태 확인
    },
};
</script>

<style scoped>
.login-button-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 20px;
    margin-top: 20px;
}

.login-button {
    cursor: pointer;
    color: #007bff;
    font-size: 16px;
    text-decoration: none;
    margin-left: 8px;
}

.login-button:hover {
    text-decoration: underline;
}

.user-icon {
    font-size: 24px;
    color: #007bff;
}
</style>
