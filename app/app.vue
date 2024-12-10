<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts"></script>
<style>
:root {
  --el-color-primary: #141414 !important;
}

/* 强制所有 Element Plus 组件使用暗色样式 */
.el-button,
.el-input,
.el-select,
.el-dialog,
.el-card,
.el-menu,
.el-table {
  --el-bg-color: #141414 !important;
  --el-bg-color-overlay: #1d1e1f !important;
  --el-text-color-primary: #ffffff !important;
  --el-border-color: #434343 !important;
}
</style>
