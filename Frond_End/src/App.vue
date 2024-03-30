<script setup>
import HomePageVue from "./pages/home/HomePage.vue";
// import testVue from "./pages/home/container/test.vue";
import { useQueryProvider } from "vue-query";

useQueryProvider();
</script>

<template>
  <!-- <HomePageVue /> -->
  <router-view />
</template>

<style scoped></style>
