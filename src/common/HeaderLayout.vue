<template>
  <v-app-bar app dense color="#6F4A3D">
    <v-toolbar-title class="logo" color="#D0D0D0">
      로고
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn text class="nav-link" :to="{ name: 'SearchMember' }">라떼버</v-btn>
    <v-btn text class="nav-link" :to="{ name: 'SearchProject' }">프로젝트</v-btn>

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
        color="#ECE8ED"
        @keyup.enter="getSearchResults"
    ></v-text-field>

    <div class="login-button-container">
      <template v-if="isLogIn">
        <router-link to="/me">
          <v-icon class="user-icon">mdi-account</v-icon>
        </router-link>
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
    getSearchResults() {
      if (this.search.trim()) {
        // 검색어를 쿼리 파라미터로 라우터에 전달하여 searchAllPage로 이동
        this.$router.push({
          name: 'SearchAll',
          query: { keyword: this.search }
        });

        // 검색이 완료된 후 검색어 초기화
        this.search = '';
      }
    }
  },
  mounted() {
    this.checkLoginStatus(); // 컴포넌트 마운트 시 로그인 상태 확인
  },
};
</script>

<style scoped>

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

.login-button-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 20px;
}

.login-button {
  cursor: pointer;
  color: white;
}
.nav-link, .login-button {
  color: #ECE8ED !important;
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
  color: #FFD700 !important; /* Choose your desired active color */
}

</style>
