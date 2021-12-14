import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "table",
    component: () => import("@/example/table"),
  },
  {
    path: "/checkbox",
    name: "checkbox",
    component: () => import("@/example/checkbox"),
  },
  {
    path: "/button",
    name: "button",
    component: () => import("@/example/button"),
  },
];

const router = createRouter({
  history: createWebHashHistory(), //路由模式的配置采用API调用的方式 不再是之前的字符串 此处采用的hash路由
  routes,
});

export default router;
