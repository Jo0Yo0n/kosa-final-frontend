<template>
  <v-app-bar app dense color="#6F4A3D">
    <v-toolbar-title class="logo" color="#D0D0D0">
      로고
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn text class="nav-link">라떼버</v-btn>
    <v-btn text class="/search/projects">프로젝트</v-btn>

    <v-spacer></v-spacer>

    <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="figma"
        solo-inverted
        flat
        hide-details
        class="search-bar"
        color="#ECE8ED"
    ></v-text-field>

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


  </v-app-bar>
</template>

<script>
import LoginModal from '@/components/login/LoginModal.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {LoginModal},
  data() {
    return {
      search: "",
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
.v-app-bar {
  background-color: #6F4A3D !important;
}

.logo {
  background-color: #D0D0D0;
  padding: 0 15px;
  font-weight: bold;
}

.nav-link {
  color: #ECE8ED !important;
}

.search-bar {
  background-color: #ECE8ED;
  border-radius: 25px;
  max-width: 400px;
  margin: 0 20px;
}

.search-bar input {
  color: #6F4A3D;
}

.search-bar .v-label {
  color: #6F4A3D !important;
}

.v-input--selection-controls__input {
  color: #6F4A3D !important;
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
