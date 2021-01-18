import { RouteRecordRaw } from "vue-router";
import pageHome from "@/pages/page-home/index.vue";
import pageLayout from "@/pages/page-layout/index.vue";
import pageLogin from "@/pages/page-login/index.vue";
import pageError from "@/pages/page-error/404.vue";

export const indexPage = {
  path: "/index",
  name: "index",
  meta: {
    title: "首页",
    cache: true
  },
  component: pageHome
};

export const frameIn: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/index",
    component: pageLayout,
    children: [indexPage]
  }
];

export const frameOut: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "login",
    meta: {
      title: "登录"
    },
    component: pageLogin
  },
  {
    path: "/404",
    name: "404",
    meta: {
      title: "找不到页面"
    },
    component: pageError
  }
];

export const errorRoutes: RouteRecordRaw[] = [
  {
    path: "/:catchAll(.*)",
    redirect: "/404"
  }
];

export default [...frameIn, ...frameOut];
