<template>
  <div>
    <MainLayOut>
      <!-- {{ dataBreadCrumb }} -->
      <Breadcrumb :dataBreadCrumb="dataBreadCrumb" />
      <div class="lg:flex md:block gap-x-5">
        <img
          class="rounded-xl object-cover object-center lg:w-[400px] lg:h-[550px] w-full h-full z-10"
          :src="
            sachDetailData.photo
              ? stable.UPLOAD_FOLDER_BASE_URL + sachDetailData.photo
              : images.phoToOrigin
          "
          :alt="sachDetailData.tenSach"
        />
        <div
          class="flex flex-col justify-start gap-y-3 flex-grow lg:w-2/4 z-10"
        >
          <h1 class="text-3xl font-montserrat font-semibold mt-2 lg:mt-0">
            {{ sachDetailData.tenSach }}
          </h1>
          <div>
            <p class="text-gray-900 text-nowrap font-bold text-sm w-full">
              Đơn Giá:
              <span class="font-semibold text-2xl text-red-500">
                {{ formatCurrency(sachDetailData.donGia) }}
              </span>
            </p>
          </div>
          <p class="font-bold text-sm w-full">
            Tác Giả:
            <span class="font-normal text-lg text-nowrap">{{
              sachDetailData.tacGia
            }}</span>
          </p>
          <div class="z-10">
            <!-- <RatingForm
              :postId="data?._id"
              :averageRating="data?.averageRating"
              ref="ref"
            ></RatingForm> -->
          </div>
          <div class="flex gap-y-2 gap-x-2 flex-wrap">
            <div
              class="flex flex-col border-r lg:pr-5 px-5 py-3 gap-y-2 w-[48%] lg:w-auto"
            >
              <p>Quốc Gia</p>
              <div class="flex gap-x-2 items-center">
                <Icon icon="tabler:map-heart" />
                <span>{{ sachDetailData.country }}</span>
              </div>
            </div>
            <div
              class="flex flex-col border-r px-5 py-3 gap-y-2 w-[48%] lg:w-auto"
            >
              <p>Lượt truy cập</p>
              <div class="flex gap-x-2 items-center">
                <Icon icon="bi:book" />
                <span>{{ sachDetailData.view }}</span>
              </div>
            </div>
            <div
              class="flex flex-col border-r px-5 py-3 gap-y-2 w-[48%] lg:w-auto"
            >
              <p>Năm Xuất Bản</p>
              <div class="flex gap-x-2 items-center text-sm">
                <span>{{ sachDetailData.namXuatBan }}</span>
              </div>
            </div>
          </div>
          <div
            class="flex gap-x-2 gap-y-3 flex-wrap justify-start lg:justify-normal mt-3"
          >
            <div
              v-for="category in sachDetailData?.category"
              :key="category._id"
              class="border-violet bg-opacity-20 text-violet bg-violet px-3.5 py-2 rounded-xl"
            >
              <div class="px-2 py-3 bg-violet-500 rounded-lg">
                <span class="text-sm font-montserrat font-semibold">{{
                  category.title
                }}</span>
              </div>
            </div>
          </div>
          <p class="text-gray-900 text-nowrap font-bold text-sm w-full">
            Thời Điểm:
            <span class="text-nowrap font-normal ml-2">
              {{
                new Date(sachDetailData.createdAt).toLocaleDateString("vi-VN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              }}
            </span>
          </p>
          <div>
            <p class="text-gray-900 text-nowrap font-bold text-sm w-full">
              Năm Xuất Bản:{{ sachDetailData?.namXuatBan }}
            </p>
            <p class="font-normal text-sm w-full text-wrap line-clamp-3">
              {{ sachDetailData.caption }}
            </p>
          </div>

          <div class="">
            <label
              for="quantity-input"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Chọn Số Lượng:</label
            >
            <div class="relative flex items-center max-w-[8rem]">
              <button
                type="button"
                @click="downQuantity"
                class="bg-gray-100 flex flex-col justify-center hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
              >
                <span class="w-3 text-2xl text-gray-900 dark:text-white block"
                  >-</span
                >
              </button>
              <input
                type="text"
                v-model.number="quantity"
                class="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm block w-full py-2.5"
                placeholder="1"
                required
              />
              <button
                type="button"
                @click="plusQuantity"
                class="bg-gray-100 flex flex-col justify-center hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
              >
                <span class="w-3 text-2xl text-gray-900 dark:text-white block"
                  >+</span
                >
              </button>
            </div>
            <p
              id="helper-text-explanation"
              class="mt-2 text-sm text-gray-500 dark:text-gray-400"
            >
              Please select a 5 digit number from 0 to 9.
            </p>
          </div>
          <div>
            <button
              @click="handlerMuonSach"
              class="py-2 px-3 border-2 border-black text-lg font-semibold rounded-xl w-1/2 hover:bg-black duration-200 hover:text-white"
            >
              Mượn Sách
            </button>
          </div>
        </div>
      </div>
    </MainLayOut>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import MainLayOut from "../../components/MainLayOut.vue";
import { getDetailSach } from "../../services/sach";
import { images, stable } from "../../constants";
import { Icon } from "@iconify/vue";
import Breadcrumb from "../../components/Breadcrumb.vue";
import axios from "axios";
import { useStore } from "vuex";
import { useMutation } from "vue-query";
import { createMuonSach } from "../../services/theoDoiMuonSach";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default defineComponent({
  components: { MainLayOut, Icon, Breadcrumb },

  setup() {
    const quantity = ref(1);
    const plusQuantity = () => {
      quantity.value++;
    };
    const downQuantity = () => {
      if (quantity.value > 1) {
        quantity.value--;
      }
    };
    const route = useRoute();
    const id = route.params.id;
    const sachDetailData = ref({});
    const dataBreadCrumb = ref(null);
    const store = useStore();
    const { mutate, isLoading } = useMutation(createMuonSach, {
      onSuccess: (data) => {
        toast.success("Mượn Thành Công");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
    const token = store.state.user?.data?.token;
    const handlerMuonSach = () => {
      mutate({ idSach: id, soLuongMuon: quantity.value, token });
    };
    onMounted(async () => {
      const { data } = await axios.get(`/api/sach/${id}`);
      sachDetailData.value = data;

      dataBreadCrumb.value = [
        {
          name: "Trang Chủ",
          link: "/",
        },
        {
          name: "Sách",
          link: "/sach",
        },
        {
          name: data.tenSach,
          link: `/Sach/${id}`,
        },
      ];
    });

    return {
      plusQuantity,
      downQuantity,
      quantity,
      sachDetailData,
      dataBreadCrumb,
      handlerMuonSach,
    };
  },
  methods: {
    formatCurrency(value) {
      const formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      });
      return formatter.format(value);
    },
  },
  data() {
    return {
      images: images,
      stable: stable,
      // quantity: 1,
    };
  },
});
</script>

<style lang="scss" scoped></style>
