<template>
  <MainLayOut>
    <template v-slot:default>
      <h1 class="text-xl font-bold">Sách Mới Cập Nhật</h1>
      <ButtonCreateSachVue />
      <div v-if="sachData">
        <Carousel :breakpoints="breakpoints" :wrap-around="true">
          <template #addons>
            <Navigation class="text-2xl" />
          </template>

          <Slide v-for="item in sachData?.data" :key="item.id">
            <ArticleCard class="carousel__item m-1" :sachData="item" />
          </Slide>
        </Carousel>
        <div class="flex items-center justify-center my-5">
          <router-link
            to="/sach"
            class="flex items-center gap-x-3 text-black border border-black hover:bg-black hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-300 text-base rounded-lg duration-300 px-2 py-3"
          >
            Nhiều Hơn <Icon icon="lucide:arrow-right" class="text-xl" />
          </router-link>
        </div>
      </div>
      <div v-else class="flex flex-row items-center justify-center">
        <p class="text-red-500 text-lg">Hiện tại không thể lấy được dữ liệu</p>
      </div>
    </template>
  </MainLayOut>
</template>

<script>
import { defineComponent } from "vue";
import MainLayOut from "../../components/MainLayOut.vue";
import { getAllSach } from "../../services/sach";
import ArticleCard from "./container/ArticleCard.vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { Icon } from "@iconify/vue";
import { useQuery } from "vue-query";
import ButtonCreateSachVue from "../admin/container/ButtonCreateSach.vue";

export default defineComponent({
  name: "HomePage",
  components: {
    MainLayOut,
    ArticleCard,
    Slide,
    Navigation,
    Carousel,
    Icon,
    ButtonCreateSachVue,
  },

  data: () => ({
    breakpoints: {
      // 700px and up
      700: {
        itemsToShow: 3,
        snapAlign: "center",
      },
      // 1024 and up
      1024: {
        itemsToShow: 5,
        snapAlign: "start",
      },
    },
  }),
  setup() {
    const { data: sachData } = useQuery("sachHome", getAllSach);

    return {
      sachData,
    };
  },
});
</script>

<style></style>
