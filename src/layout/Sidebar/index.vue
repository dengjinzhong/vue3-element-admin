<!--导航组件-->
<script setup lang="ts" name="Sidebar">
import SidebarItem from "./SidebarItem.vue";

const MENU_CONFIG = {
  mode: "vertical",
  collapseTransition: false,
  uniqueOpened: false,
  backgroundColor: "#304156",
  textColor: "#bfcbd9",
  activeTextColor: "#409EFF",
};

const routers = [
  {
    path: "/",
    name: "home",
    meta: { title: "主页" },
  },
  {
    path: "/menu",
    name: "menu",
    meta: { title: "菜单" },
    children: [
      {
        path: "index1",
        name: "index1",
        meta: { title: "菜单1" },
        children: [
          {
            path: "index1-1",
            name: "index1-1",
            meta: { title: "菜单1-1" },
          },
        ],
      },
      {
        path: "index2",
        name: "index2",
        meta: { title: "菜单2" },
      },
    ],
  },
];
</script>

<template>
  <div style="width: 200px">
    <el-menu v-bind="MENU_CONFIG">
      <sidebar-item
        v-for="router in routers"
        :key="router.name"
        v-bind="router"
      />
    </el-menu>
  </div>
</template>

<style scoped lang="scss"></style>
