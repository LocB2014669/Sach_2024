<template>
  <div>
    <HeaderVue />
    <main
      class="mx-auto max-w-7xl px-2 py-3"
    >
      <slot></slot>
    </main>
    <FooterVue />
  </div>
</template>

<script>
import HeaderVue from "./Header.vue";
import FooterVue from "./Footer.vue";

export default {
  name: "MainLayOut",
  components: {
    HeaderVue,
    FooterVue,
  },
};
</script>

<style>
/* CSS cho component */
</style>
