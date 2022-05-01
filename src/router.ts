import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const routes = [
  {
    path: "/",
    name: "default",
    redirect: "/index",
  },
  {
    path: "/index",
    name: "index",
    meta: { title: "VCANVAS", id: 0 },
    component: () => import("@/components/Index.vue"),
  },
  {
    path: "/notice",
    name: "notice",
    meta: { title: "VCANVAS-公告", id: 1 },
    component: () => import("@/components/notice.vue"),
  },
  {
    path: "/wh",
    name: "notiwhce",
    meta: { title: "VCANVAS-个人仓库", id: 2 },
    component: () => import("@/components/wh.vue"),
  },
  {
    path: "/login",
    component: () => import("@/components/login-Interface.vue"),
    children: [
      {
        path: "",
        name: "login",
        meta: { title: "VCANVAS-登录", id: 3 },
        component: () =>
          import("@/components/login-subcomponents/login-main-login.vue"),
      },
      {
        path: "register",
        name: "register",
        meta: { title: "VCANVAS-注册", id: 4 },
        component: () =>
          import("@/components/login-subcomponents/login-main-register.vue"),
      },
      {
        path: "forget",
        name: "forget",
        meta: { title: "VCANVAS-找回密码", id: 5 },
        component: () =>
          import("@/components/login-subcomponents/login-main-forgetpwd.vue"),
      },
    ],
  },
  {
    path: "/404",
    meta: { title: "404NOTFOUND", id: 6 },
    component: () => import("@/components/_404.vue"),
  },
  {
    path: "*",
    redirect: "/404",
  },
];
const originalPush: Function = Router.prototype.push;
Router.prototype.push = function push(location: any): any {
  return originalPush.call(this, location).catch((err: Error): Error => err);
};
const router = new Router({
  mode: "hash",
  routes,
});

router.beforeEach((to: any, from: any, next: Function) => {
  window.document.title = to.meta.title;
  next();
});
export default router;
