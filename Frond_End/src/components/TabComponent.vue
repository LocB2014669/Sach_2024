<template>
  <div class="tabs">
    <div
      v-for="(tab, index) in tabs"
      :key="index"
      @click="activeTab = tab"
      :class="{ active: activeTab === tab }"
      class="tab"
    >
      {{ tab }}
    </div>
    <div class="tab-content">
      <slot :name="activeTab"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: [],
      activeTab: null,
    };
  },
  mounted() {
    this.tabs = this.$slots.default.map(
      (slot) => slot.componentOptions.propsData.label
    );
    this.activeTab = this.tabs[0];
  },
};
</script>

<style>
.tabs {
  display: flex;
  flex-wrap: wrap;
}

.tab {
  cursor: pointer;
  padding: 10px 20px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-bottom: none;
}

.tab.active {
  background-color: #f0f0f0;
}

.tab-content {
  border: 1px solid #ccc;
  padding: 20px;
  margin-top: -1px;
}
</style>
