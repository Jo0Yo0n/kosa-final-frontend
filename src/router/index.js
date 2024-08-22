import Vue from "vue";
import VueRouter from "vue-router";
import route from "./route";
import PageNotFound from "@/components/PageNotFound.vue";

Vue.use(VueRouter);

const base_router = [{ path: "*", component: PageNotFound }];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [...route, ...base_router],
});

export default router;
