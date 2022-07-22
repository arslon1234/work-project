<template>
  <div class="bg-[#ceecf1] rounded-[10px] min-w-[250px] h-full">
    <div class="flex justify-items-center">
        <img class="w-40 h-45 flex-auto" :src="uic" alt="" />
    </div>
    <div class="flex flex-col mt-4 ml-4">
      <router-link to="/dashboard" active-class="active" class="text-sidebar_text mt-4" >
        <i class="fa-solid fa-gauge"></i>
        <span class="ml-2">Dashboard</span>
      </router-link>
      <router-link to="/list_of_employees" active-class="active" class="text-sidebar_text mt-4" >
        <i class="fa-solid fa-list"></i>
        <span class="ml-2">List of employee</span>
      </router-link>
    </div>
  </div>
</template>
<script setup>
import axios from "axios";
import uic from "@/assets/images/UIC.png";
</script>

<style scoped>
.active{
    color: #53B9EA;
}
</style>

