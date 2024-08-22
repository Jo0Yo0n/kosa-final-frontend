<template>
  <v-footer
    dark
    padless
    color="6D4C41"
    style="flex-shrink: 0"
    class="styled-footer mt-12"
  >
    <v-container class="py-4">
      <v-row dense justify="center" align="center">
        <v-col cols="12" sm="6" md="3" class="text-center">
          <v-icon small class="mr-2">mdi-account</v-icon>
          <span class="caption">이주윤(c)</span>
          <v-icon small class="mx-2">mdi-email</v-icon>
          <a href="mailto:dlwndbs10@gmail.com" class="caption"
            >dlwndbs10@gmail.com</a
          >
        </v-col>
        <v-col cols="12" sm="6" md="3" class="text-center">
          <v-icon small class="mr-2">mdi-account</v-icon>
          <span class="caption">김영훈</span>
          <v-icon small class="mx-2">mdi-email</v-icon>
          <a href="mailto:vosxja1@gmail.com" class="caption"
            >vosxja1@gmail.com</a
          >
        </v-col>
        <v-col cols="12" sm="6" md="3" class="text-center">
          <v-icon small class="mr-2">mdi-account</v-icon>
          <span class="caption">이윤빈</span>
          <v-icon small class="mx-2">mdi-email</v-icon>
          <a href="mailto:kig0632@naver.com" class="caption"
            >kig0632@naver.com</a
          >
        </v-col>
        <v-col cols="12" sm="6" md="3" class="text-center">
          <v-icon small class="mr-2">mdi-account</v-icon>
          <span class="caption">장희선</span>
          <v-icon small class="mx-2">mdi-email</v-icon>
          <a href="mailto:adastra1123@kakao.com" class="caption"
            >adastra1123@kakao.com</a
          >
        </v-col>
      </v-row>
      <v-divider class="my-4" />
      <v-row justify="center">
        <v-col cols="12" class="text-center white--text">
          <v-icon small class="mr-2">mdi-copyright</v-icon>
          {{ new Date().getFullYear() }} — <strong>Latteve</strong>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: "TheFooter",
};
</script>

<style scoped>
.styled-footer a {
  color: #ffffff;
  text-decoration: none;
}
.styled-footer a:hover {
  text-decoration: underline;
}
</style>
