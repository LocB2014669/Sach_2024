<template>
  <main-lay-out>
    <div class="tabs">
      <div
        class="tab flex flex-wrap text-lg font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
      >
        <div
          class="inline-block p-4 rounded-t-lg hover:text-black hover:bg-white hover:border hover:border-black font-bold duration-200"
          v-for="(tab, index) in tabs"
          :key="index"
          @click="activateTab(index)"
          :class="{ 'bg-black text-white ': tab.active }"
        >
          {{ tab.label }}
        </div>
      </div>
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        v-show="tab.active"
        class="tab-content"
      >
        <component :is="tab.content" v-if="typeof tab.content === 'object'" />
        <template v-else>
          {{ tab.content }}
        </template>
      </div>
    </div>
  </main-lay-out>
</template>

<script>
import MainLayOut from "../../../components/MainLayOut.vue";
import ManagerSachVue from "../ManagerSach.vue";
import ManagerCategorySach from "../container/ManagerCategorySach.vue";
import ManagerTheMuonTra from "../container/ManagerTheMuonTra.vue";
import ManagerNhaXuatBanVue from "../container/ManagerNhaXuatBan.vue";
import ManagerUserVue from "../container/ManagerUser.vue";

export default {
  components: { MainLayOut },
  data() {
    return {
      tabs: [
        { label: "Quản Lý Sách", content: ManagerSachVue, active: true },
        {
          label: "Quản Lý Thể Loại",
          content: ManagerCategorySach,
          active: false,
        },
        {
          label: "Quản Lý Thẻ Mượn",
          content: ManagerTheMuonTra,
          active: false,
        },
        {
          label: "Quản Lý Nhà Xuất Bản",
          content: ManagerNhaXuatBanVue,
          active: false,
        },
        { label: "Quản Lý Tài Khoản", content: ManagerUserVue, active: false },
      ],
    };
  },
  methods: {
    activateTab(index) {
      this.tabs.forEach((tab, i) => {
        tab.active = i === index;
      });
    },
  },
};
</script>

<style scoped>
.tab {
  cursor: pointer;
  padding: 10px 20px;
  margin-right: 5px;
}
.tab-content {
  padding: 20px;
}

.tab-content.active {
  display: block;
}
</style>
