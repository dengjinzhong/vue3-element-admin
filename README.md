# vue3-element-admin
## 快速上手
```shell
npm init vue@latest
```
输入项目名后依次选择：TS + JSX + Router + Pinia + Unit testing + ESLint + Prettier
#### 安装初始插件
element-plus 和 样式初始话
```
npm i element-plus normalize.css -S
```
增加插件配置，运行 name 可以写在 script 标签上
```
npm i vite-plugin-vue-setup-extend sass -D
```
#### 配置 webstrom
Editor -> File and Code Templates
```vue
<!--组件注释-->
<script setup lang="ts" name="index">

</script>

<template>
</template>

<style scoped lang="scss">
</style>
```


## 菜单导航

#### 基础数据
菜单导航我们选用 `el-menu` 组件来进行渲染。首先我们准备一个简单的路由数据如下：
```
const routers = [
  {
    path: '/',
    name: 'home',
    meta: { title: '主页' }
  },
  {
    path: '/menu',
    name: 'menu',
    meta: { title: '菜单' },
    children: [
      {
        path: 'index1',
        name: 'index1',
        meta: { title: '菜单1' }
      },
      {
        path: 'index2',
        name: 'index2',
        meta: { title: '菜单2' }
      }
    ]
  }
]
```
对应 `template` 内容应该为
```
<template>
  <el-menu>
    <el-menu-item index="home" :router="{ name: 'home' }">
      <template #title>主页</template>
    </el-menu-item>
    <el-sub-menu index="menu">
      <template #title>菜单</template>
      <el-menu-item index="index1" :router="{ name: 'index1' }">
        <template #title>菜单1</template>
      </el-menu-item>
      <el-menu-item index="index2" :router="{ name: 'index2' }">
        <template #title>菜单2</template>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>
```

渲染效果如下：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/69dde8ae62144d1c80321b5689cde71a~tplv-k3u1fbpfcp-watermark.image?)

#### 响应数据
这样实现是没有问题， 但是我们往往需要的是根据路由的数据渲染出菜单导航，因此需要进行改造一下。
分析 `menu` 组件下可能存在两种结构：
1. `el-sub-menu`:  子节点菜单
2. `el-menu-item`:  叶子节点菜单

判断是子节点菜单还是叶子节点的依据是该菜单下是否含有子元素，那么可以依照判断进行设计如下：
```
<template>
  <el-menu v-bind="MENU_CONFIG">
    <template v-for="router in routers" :key="router.name">
      <template v-if="router.children && router.children.length > 0">
        <el-sub-menu :index="router.name">
          <template #title>{{ router.meta.title }}</template>
          <el-menu-item
            v-for="item in router.children"
            :key="item.name"
            :index="item.name"
            :route="{ name: item.name }"
          >
            <template #title>{{ item.meta.title }}</template>
          </el-menu-item>
        </el-sub-menu>
      </template>
      <template v-else>
        <el-menu-item :index="router.name" :route="{ name: router.name }">
          <template #title>{{ router.meta.title }}</template>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>
```

此时渲染效果与基础数据一致，我们试着来添加一些菜单：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c2e3ac73e9ec4fb8aa7a95acf2c846bf~tplv-k3u1fbpfcp-watermark.image?)

当路由菜单添加后页面显示也动态添加了

#### 递归组件
此时我们可以将路由信息动态的渲染到导航菜单了， 但是还存在一个问题，就是目前只能实现到二级菜单，当路由结构存在三级及以上的时候就无能为力了。例如：
```
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
```
菜单1-1 将无法渲染，因为路由嵌套的级别层数我们无法得知， 因此我们需要进行递归改造。

父组件 `Sidebar`:
```
<el-menu v-bind="MENU_CONFIG">
  <sidebar-item v-for="router in routers" :key="router.name" v-bind="router" />
</el-menu>
```
子组件 `SidebarItem`:
1. 确认 `props` 类型并接收父组件参数
```TS
interface Props {
  path: string;
  name: string;
  meta: { title: string };
  children?: Props[];
}
const props = defineProps<Props>();
```
2. 确认是否为叶子菜单

```TS
import { computed } from "vue";
const isLeafMenu = computed<boolean>(
  () => !props.children || props.children.length === 0
);
```
3. 递归使用组件
```
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
```
渲染结果为：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a4086bbf931e42f39683c0ed51278064~tplv-k3u1fbpfcp-watermark.image?)

至此递归菜单组件就已经封装好了。

# 未完待续...


