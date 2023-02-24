<!--布局-->
<script setup lang="ts" name="Layout">
import { RouterView } from "vue-router";
import Sidebar from "./Sidebar/index.vue";
</script>

<template>
  <el-container>
    <el-aside width="200px">
      <sidebar />
    </el-aside>
    <el-main>
      <RouterView />
    </el-main>
  </el-container>
</template>

<style scoped lang="scss"></style>
