<template>
  <el-container class="layout-container-demo" style="height: 100vh; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-scrollbar>
        <el-menu router :default-openeds="['1']" :default-active="route.path">
          <el-sub-menu index="1">
            <template #title>
              <el-icon>
                <message />
              </el-icon>内容管理
            </template>
            <el-menu-item-group>
              <template #title>分类</template>
              <el-menu-item index="/categories/create">新建分类</el-menu-item>
              <el-menu-item index="/categories/list">内容列表</el-menu-item>
            </el-menu-item-group>
             <el-menu-item-group>
              <template #title>广告</template>
              <el-menu-item index="/ads/create">新建广告</el-menu-item>
              <el-menu-item index="/ads/list">广告列表</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon>
                <message />
              </el-icon>运营管理
            </template>
            <el-menu-item-group>
              <template #title>物品</template>
              <el-menu-item index="/items/create">新建物品</el-menu-item>
              <el-menu-item index="/items/list">物品列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template #title>英雄</template>
              <el-menu-item index="/heros/create">新建英雄</el-menu-item>
              <el-menu-item index="/heros/list">英雄列表</el-menu-item>
            </el-menu-item-group>
             <el-menu-item-group>
              <template #title>文章</template>
              <el-menu-item index="/articles/create">新建文章</el-menu-item>
              <el-menu-item index="/articles/list">文章列表</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon>
                <message />
              </el-icon>系统管理
            </template>
            <el-menu-item-group>
              <template #title>管理员</template>
              <el-menu-item index="/admin_user/create">新建管理员</el-menu-item>
              <el-menu-item index="/admin_user/list">管理员列表</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <div class="toolbar">
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px">
              <setting />
            </el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>View</el-dropdown-item>
                <el-dropdown-item>Add</el-dropdown-item>
                <el-dropdown-item>Delete</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>Tom</span>
        </div>
      </el-header>

      <el-main>
        <router-view :key="route.path"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
import {useRoute} from 'vue-router';
const route = useRoute();

const item = {
  date: '2016-05-02',
  name: 'Tom',
  address: 'No. 189, Grove St, Los Angeles',
}
const tableData = ref(Array.from({ length: 20 }).fill(item))
</script>

<style scoped>
.layout-container-demo .el-header {
  position: relative;
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  width: 240px;
  color: var(--el-text-color-primary);
  background: #fff !important;
  border-right: solid 1px #e6e6e6;
  box-sizing: border-box;
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  position: absolute;
  display: inline-flex;
  align-items: center;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}
</style>