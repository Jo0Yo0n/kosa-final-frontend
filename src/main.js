import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import store from "@/store/index";

Vue.config.productionTip = false;
Vue.prototype.$axios = axios; // axios를 전역으로 설정

new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App),
}).$mount("#app");
