<!--导航组件-->
<script setup lang="ts" name="Sidebar">
import { computed } from "vue";
import SidebarItem from "./SidebarItem.vue";

const MENU_CONFIG = {
  mode: "vertical",
  router: true,
  collapseTransition: false,
  uniqueOpened: false,
  backgroundColor: "#304156",
  textColor: "#bfcbd9",
  activeTextColor: "#409EFF",
};
import { useRouter } from "vue-router";
const router = useRouter();
const routers = computed(() => router.options.routes);
</script>

<template>
  <div>
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
