<template>
  <v-app-bar app dense color="#6F4A3D">
    <v-toolbar-title class="logo" color="#D0D0D0">
      로고
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn text class="nav-link">라떼바</v-btn>
    <v-btn text class="nav-link">프로젝트</v-btn>

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

    <v-btn text class="nav-link">회원가입 / 로그인</v-btn>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      search: "",
    };
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

</style>
