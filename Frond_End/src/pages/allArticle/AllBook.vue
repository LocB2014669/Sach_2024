<template>
  <main-lay-out>
    <div>
      <breadcrumb :dataBreadCrumb="dataBreadCrumb" />
      <div class="flex items-center gap-x-20">
        <!-- <input type="text" v-model="search" placeholder="Tìm kiếm..." /> -->
        <!-- <select  placeholder="Năm xuất bản..."> -->
        <div class="w-80 flex items-center gap-x-3">
          <label
            for="namXuatBan_select"
            class="block text-base font-medium text-gray-900 dark:text-white text-nowrap"
            >Chọn Năm Xuất Bản</label
          >

          <select
            v-model="namXuatBan"
            id="namXuatBan_select"
            class="block py-2.5 px-2 w-full text-lg text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          >
            <option value="">Tất Cả</option>
            <option v-for="year in years" :key="year" :value="year">
              {{ year }}
            </option>
          </select>
        </div>
        <div class="w-80 flex items-center gap-x-3">
          <label
            for="country_select"
            class="block text-base font-medium text-gray-900 dark:text-white text-nowrap"
            >Chọn Năm Quốc Gia</label
          >
          <select
            id="country_select"
            v-model="country"
            class="block py-2.5 px-2 m-5 w-full text-lg text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          >
            <option value="">Quốc gia...</option>
            <option
              v-for="country in countries"
              :key="country"
              :value="country"
            >
              {{ country }}
            </option>
          </select>
        </div>
        <div class="w-80 flex items-center gap-x-3">
          <label
            for="category_select"
            class="block text-base font-medium text-gray-900 dark:text-white text-nowrap"
            >Chọn Thể Loại</label
          >
          <select
            v-model="category"
            id="category_select"
            class="block py-2.5 px-2 w-full text-lg text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          >
            <option value="">Thể loại...</option>
            <option
              v-for="category in categories"
              :key="category"
              :value="category"
            >
              {{ category }}
            </option>
          </select>
        </div>
        <button
          @click="clearFilter"
          class="bg-black px-2 py-3 rounded-xl text-nowrap text-white border-2 border-black duration-200 font-semibold hover:bg-white hover:text-black"
        >
          Bỏ Lọc
        </button>
      </div>

      <div class="flex justify-between items-center mt-5">
        <h1 class="text-lg font-semibold text-black">Lọc Theo</h1>
        <select
          v-model="sort"
          class="bg-gray-50 text-lg border border-gray-300 text-gray-900 rounded-lg focus:black focus:border-black block w-auto p-2.5"
        >
          <option value="">Sắp xếp theo...</option>
          <option value="tenSachAZ">Tên sách (A-Z)</option>
          <option value="tenSachZA">Tên sách (Z-A)</option>
          <option value="viewPlus">Luợt truy cập (Tăng dần)</option>
          <option value="viewDown">Lượt truy cập (Giảm dần)</option>
        </select>
      </div>
      <div v-if="status === 'loading'">Loading...</div>
      <div v-else-if="status === 'error'">Error: {{ error }}</div>
      <div class="flex items-center gap-y-3 gap-x-2 flex-wrap mt-6" v-else>
        <div class="w-[24%]" v-for="item in sachData?.data" :key="item._id">
          <article-card :sachData="item" />
        </div>
      </div>
    </div>
  </main-lay-out>
</template>

<script>
import { ref } from "vue";
import { useQuery } from "vue-query";
import { getAllSach } from "../../services/sach";
import MainLayOut from "../../components/MainLayOut.vue";
import ArticleCard from "../home/container/ArticleCard.vue";
import Breadcrumb from "../../components/Breadcrumb.vue";
import { useRoute } from "vue-router";

export default {
  components: { MainLayOut, ArticleCard, Breadcrumb },
  setup() {
    const dataBreadCrumb = [
      {
        name: "Trang Chủ",
        link: "/",
      },
      {
        name: "Sách",
        link: "/sach",
      },
    ];
    const route = useRoute();
    const search = ref(route.query.search || "");
    const namXuatBan = ref("");
    const country = ref("");
    const category = ref("");
    const sort = ref("");

    const {
      data: sachData,
      status,
      error,
      execute,
    } = useQuery(["AllSach", search, namXuatBan, country, category, sort], () =>
      getAllSach({
        search: search.value,
        namXuatBan: namXuatBan.value,
        country: country.value,
        category: category.value,
        sort: sort.value,
      })
    );

    const clearFilter = () => {
      search.value = "";
      namXuatBan.value = "";
      country.value = "";
      category.value = "";
      sort.value = "";
    };

    const years = ["2022", "2021", "2020", "1989", "1999"];
    const countries = ["Việt Nam", "Mỹ", "Anh", "Pháp", "Nhật Bản"];
    const categories = [
      "Học thuật",
      "Truyện tranh",
      "Kinh tế",
      "Lịch sử",
      "Tâm lý",
    ];

    return {
      search,
      namXuatBan,
      country,
      category,
      sort,
      sachData,
      status,
      error,
      clearFilter,
      years,
      countries,
      categories,
      dataBreadCrumb,
    };
  },
};
</script>

<style>
/* Styles here */
</style>
