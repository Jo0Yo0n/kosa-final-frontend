<template>
    <v-app-bar app dense color="#6F4A3D" height="55px">
        <v-container class="header-container d-flex align-center" style="max-width: 1200px">
            <router-link to="/">
                <v-img src="@/assets/logo.png" max-height="48"></v-img>
            </router-link>

            <v-spacer></v-spacer>

            <v-btn text class="nav-link font-weight-light" :to="{ name: 'SearchMember' }">라떼버 검색</v-btn>
            <v-btn text class="nav-link font-weight-light" :to="{ name: 'SearchProject' }">프로젝트 검색</v-btn>

            <!-- TODO: 로그인 한 경우에만 프로젝트 생성 버튼 랜더링되도록 변경 -->
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

            <div class="login-button-container" v-if="isStatusChecked">
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
        };
    },
    computed: {
        ...mapGetters('member', ['isLogIn', 'isStatusChecked']),
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
}

.login-button-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 20px;
    margin-top: 20px;
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
    margin-left: 8px;
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
</style>
