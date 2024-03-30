<template>
  <div class="max-w-sm rounded overflow-hidden shadow-lg">
    <router-link :to="`/sach/${sachData?._id}`" class="link w-full h-full">
      <img
        class="object-cover object-center border-b-violet-200 border-b-2 w-full h-[300px]"
        :src="
          sachData?.photo
            ? `${stable.UPLOAD_FOLDER_BASE_URL}${sachData?.photo}`
            : images.phoToOrigin
        "
        :alt="sachData?.tenSach"
      />
    </router-link>

    <div class="px-2 h-24">
      <div class="font-bold text-xl mb-2 truncate">{{ sachData?.tenSach }}</div>
      <p class="text-gray-700 text-base line-clamp-3">
        {{ sachData?.caption }}
      </p>
    </div>
    <div class="px-2 pt-3 pb-2 w-full">
      <span
        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
        >Số Lượng: {{ sachData?.soQuyen }}</span
      >
      <span
        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
        >Năm Sản Xuất {{ sachData?.namXuatBan }}</span
      >
      <div class="w-full">
        <button
          @click="handlerMuonSach(sachData?._id)"
          :disabled="isLoading"
          type="button"
          class="text-white w-full font-semibold bg-gray-800 hover:bg-white hover:border-2 hover:text-black hover:border-white focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-lg text-base px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          {{ isLoading ? "Đang Mượn..." : "Mượn Sách" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useMutation } from "vue-query";
import { images, stable } from "../../../constants";
import { createMuonSach } from "../../../services/theoDoiMuonSach";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useStore } from "vuex";

export default {
  props: {
    sachData: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    // Use props parameter to access props
    const store = useStore();
    const { mutate, isLoading } = useMutation(createMuonSach, {
      onSuccess: (data) => {
        toast.success("Mượn Thành Công");
      },
      onError: (error) => {
        toast.error("Mượn Thất Bại " + error.message);
      },
    });
    const token = store.state.user?.data?.token;
    const handlerMuonSach = (idSach) => {
      mutate({ idSach: idSach, soLuongMuon: 1, token });
    };

    return {
      handlerMuonSach,
      isLoading,
    };
  },
  data() {
    return {
      images: images,
      stable: stable,
    };
  },
};
</script>
