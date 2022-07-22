<template>
  <div class="w-full h-screen flex bg-main_page_bg overflow-auto">
    <Sidebar/>
      <router-view></router-view>
  </div>
</template>
<script setup>
import Sidebar from '@/components/layout/Sidebar.vue'
</script>
