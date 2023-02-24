<!--组件注释-->
<script setup lang="ts" name="Menu">
import { ref } from "vue";
import server from "@/api/index";
const MENU_URL = "system-menu";

enum menuTypeEnum {
  Catalog = "1",
  Menu = "2",
  Button = "3",
}

interface MenuType {
  id: number | "";
  pid: number;
  name: string;
  path: string;
  code: string;
  type: menuTypeEnum;
}

const tableData = ref<MenuType[]>();
const getTableData = () => {
  server.get(MENU_URL).then((res) => {
    tableData.value = res.data;
  });
};

const onOpenRole = () => {};
const onAddClick = (menu: MenuType) => {
  menuForm.value = new Menu({ pid: menu.id as number });
  isOpenMenu.value = true;
};
const onEditClick = (menu: MenuType) => {
  menuForm.value = new Menu(menu);
  isOpenMenu.value = true;
};
const onDeleteClick = (id: string) => {
  server.deletes(MENU_URL, id).then(() => {
    getTableData();
  });
};

class Menu implements MenuType {
  constructor(data: Partial<MenuType> = {}) {
    this.id = data.id ?? "";
    this.code = data.code ?? "";
    this.name = data.name ?? "";
    this.path = data.path ?? "";
    this.pid = data.pid ?? -1;
    this.type = data.type ?? menuTypeEnum.Catalog;
  }

  code: string;
  id: number | "";
  name: string;
  path: string;
  pid: number;
  type: menuTypeEnum;
}
const menuForm = ref<MenuType>(new Menu());
const isOpenMenu = ref(false);
const onOpenMenu = () => {
  menuForm.value = new Menu();
  isOpenMenu.value = true;
};
const onSubmitMenu = () => {
  const axiosFn = menuForm.value.id ? server.put : server.post;
  axiosFn(MENU_URL, menuForm.value).then(() => {
    onCloseMenu();
    getTableData();
  });
};
const onCloseMenu = () => {
  isOpenMenu.value = false;
};
</script>

<template>
  <el-container>
    <el-header height="40">
      <el-button @click="onOpenMenu">新增</el-button>
      <el-button @click="onOpenRole">角色授权</el-button>
    </el-header>
    <el-main>
      <el-table border :data="tableData" row-key="id">
        <el-table-column type="selection" align="center" />
        <el-table-column type="index" label="序号" align="center" width="90" />
        <el-table-column label="菜单名称" prop="name" />
        <el-table-column label="菜单路径" align="center" prop="path" />
        <el-table-column label="组件路径" align="center" prop="code" />
        <el-table-column label="菜单类型" align="center" prop="type">
          <template v-slot="scope">
            <span>{{
              scope.row.type === menuTypeEnum.Catalog
                ? "目录"
                : scope.row.type === menuTypeEnum.Menu
                ? "菜单"
                : "按钮"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button link @click="onAddClick(scope.row)">新增</el-button>
            <el-button link @click="onEditClick(scope.row)">编辑</el-button>
            <el-button link @click="onDeleteClick(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-dialog v-model="isOpenMenu" title="新增/编辑">
      <el-form :model="menuForm" label-width="80px">
        <el-form-item
          :label="
            menuForm.type !== menuTypeEnum.Button ? '菜单名称' : '按钮名称'
          "
        >
          <el-input v-model="menuForm.name" />
        </el-form-item>
        <el-form-item
          v-if="menuForm.type !== menuTypeEnum.Button"
          label="菜单路径"
        >
          <el-input v-model="menuForm.path" />
        </el-form-item>
        <el-form-item
          v-if="menuForm.type !== menuTypeEnum.Button"
          label="组件路径"
        >
          <el-input v-model="menuForm.code" />
        </el-form-item>
        <el-form-item
          v-if="menuForm.type === menuTypeEnum.Button"
          label="按钮编码"
        >
          <el-input v-model="menuForm.code" />
        </el-form-item>
        <el-form-item label="菜单类型">
          <el-select v-model="menuForm.type">
            <el-option label="目录" :value="menuTypeEnum.Catalog" />
            <el-option label="菜单" :value="menuTypeEnum.Menu" />
            <el-option label="按钮" :value="menuTypeEnum.Button" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmitMenu">提交</el-button>
          <el-button @click="onCloseMenu">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-container>
</template>

<style scoped lang="scss"></style>
