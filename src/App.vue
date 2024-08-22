<template>
  <v-app>
    <header-layout />
    <v-main style="width: 1200px; margin: 0 auto">
      <content-layout />
    </v-main>
    <footer-layout />
  </v-app>
</template>

<script>
import HeaderLayout from "./common/HeaderLayout.vue";
import FooterLayout from "./common/FooterLayout.vue";
import ContentLayout from "./common/ContentLayout.vue";

export default {
  name: "App",
  components: {
    HeaderLayout,
    ContentLayout,
    FooterLayout,
  },
  data: () => ({
    //
  }),
};
</script>
<style scoped></style>
