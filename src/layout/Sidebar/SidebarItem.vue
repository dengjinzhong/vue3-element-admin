<!--递归菜单-->
<script setup lang="ts" name="SidebarItem">
import { computed } from "vue";
interface Props {
  path: string;
  name: string;
  meta: { title: string };
  children?: Props[];
}
const props = defineProps<Props>();

const isLeafMenu = computed<boolean>(
  () => !props.children || props.children.length === 0
);
</script>

<template>
  <div>
    <el-menu-item v-if="isLeafMenu" :index="name" :route="{ name }">
      <template #title>{{ meta.title }}</template>
    </el-menu-item>
    <el-sub-menu v-else :index="name">
      <template #title>{{ meta.title }}</template>
      <sidebar-item
        v-for="router in children"
        :key="router.name"
        v-bind="router"
      />
    </el-sub-menu>
  </div>
</template>

<style scoped lang="scss"></style>
