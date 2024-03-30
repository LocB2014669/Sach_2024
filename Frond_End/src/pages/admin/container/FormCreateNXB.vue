<template>
  <div class="">
    <div>
      <label
        for="category"
        class="block text-sm font-medium text-gray-900 dark:text-white mb-2"
        >Tên Nhà Xuất Bản</label
      >
      <input
        type="text"
        v-model="tenNXB"
        id="category"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Nhập tên nhà xuất bản..."
        required
      />
    </div>
    <div>
      <label
        for="diaChi"
        class="block text-sm font-medium text-gray-900 dark:text-white mb-2"
        >Địa Chỉ</label
      >
      <input
        type="text"
        v-model="diaChi"
        id="diaChi"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Nhập địa chỉ..."
        required
      />
    </div>
    <button
      @click="handlerCreateNXB"
      class="px-3 mt-2 py-2 border w-full border-violet-500 duration-200 hover:bg-black hover:text-violet-500 bg-violet-500 text-black rounded-lg"
    >
      Tạo nhà xuất bản
    </button>
  </div>
</template>

<script>
import { defineComponent, ref, watchEffect } from "vue";
import { useMutation, useQuery } from "vue-query";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { createNXB } from "../../../services/nhaXuatBan";
import { getAllNXB } from "../../../services/nhaXuatBan";

export default defineComponent({
  setup() {
    const tenNXB = ref("");
    const diaChi = ref("");
    const { data: NXBData, refetch } = useQuery("NhaXuatBan", getAllNXB);
    const { mutate, isLoading } = useMutation(createNXB, {
      onSuccess: (data) => {
        refetch.value();
        toast.success("Tạo thành công");
      },
    });

    watchEffect(() => {
      refetch.value();
    });

    const handlerCreateNXB = () => {
      if (tenNXB.value !== "" && diaChi.value !== "") {
        mutate({ tenNXB: tenNXB.value, diaChi: diaChi.value });
        tenNXB.value = "";
        diaChi.value = "";
      } else {
        toast.error("Không được để trống");
      }
    };

    return {
      handlerCreateNXB,
      tenNXB,
      diaChi,
      refetch,
    };
  },
});
</script>

<style></style>
