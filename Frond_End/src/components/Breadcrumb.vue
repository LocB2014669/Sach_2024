<template>
    

  <div
  
    :class="['w-full flex items-center py-4 overflow-x-auto whitespace-nowrap']"
  >
  <pre>
  </pre>
    <div
      v-for="(item, index) in dataBreadCrumb"
      :key="index"
      :class="[classname, 'text-black opacity-50 text-base z-10']"
    >
      <router-link :to="item.link">{{ item.name }}</router-link>
      <span v-if="index !== dataBreadCrumb.length - 1" class="px-3">/</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataBreadCrumb: {
      type: JSON,
      required: true,
    },
    classname: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
/* Add any necessary styling here */
</style>
