import { createRouter, createWebHistory } from "vue-router";

import Layout from "@/layout/index.vue";

const routes = [
  {
    path: "/",
    name: "layout",
    component: Layout,
    meta: { title: "主页" },
  },
  {
    path: "/system",
    name: "system",
    component: Layout,
    meta: { title: "系统管理" },
    children: [
      {
        path: "/menu",
        name: "menu",
        component: () => import("@/views/system/menu/index.vue"),
        meta: { title: "菜单管理" },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

export default router;
