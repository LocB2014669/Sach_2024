<template>
  <section>
    <div class="relative">
      <div class="flex justify-between items-center w-full">
        <caption
          class="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800"
        >
          Danh Sách - Sách
        </caption>
        <button-create-sach />
      </div>

      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-x-auto shadow-md sm:rounded-lg"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Sách</th>
            <th scope="col" class="px-6 py-3">Số Quyển</th>
            <th scope="col" class="px-6 py-3">namXuatBan</th>
            <th scope="col" class="px-6 py-3">Quốc Gia</th>
            <th scope="col" class="px-6 py-3">Trạng Thái</th>
            <th scope="col" class="px-6 py-3">
              <span class="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            :v-if="sachData?.data.length > 0"
            v-for="item in sachData?.data"
            :key="item._id"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center gap-x-2"
            >
              <img
                class="rounded-full w-12 h-12"
                :src="
                  item?.photo
                    ? stable.UPLOAD_FOLDER_BASE_URL + item?.photo
                    : images.phoToOrigin
                "
                alt=""
              />
              <p>{{ item?.tenSach }}</p>
            </th>
            <td class="px-6 py-4">{{ item.soQuyen }}</td>
            <td class="px-6 py-4">
              {{ item.namXuatBan }}
            </td>
            <td class="px-6 py-4">
              {{ item.country }}
            </td>
            <td
              :class="{
                'text-green-500': item.checked,
                'text-blue-500': !item.checked,
              }"
              class="px-6 py-4"
            >
              {{ item.checked ? "Đã Duyệt" : "Chờ Duyệt" }}
            </td>
            <!-- Hiển thị giá sách -->
            <td class="px-6 py-4 text-right">
              <router-link
                :to="`/admin/sach/edit/${item._id}`"
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </router-link>
              <button
                @click="handlerDelete(item._id)"
                class="font-medium text-red-600 dark:text-blue-500 hover:underline"
              >
                Xóa
              </button>
            </td>
          </tr>
          <tr
            v-if="sachData?.data.length === 0"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 w-full"
          >
            <td :colspan="6" class="px-auto py-3 text-center text-red-500">
              Chưa Có Quyển Sách Nào
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import { useMutation, useQuery } from "vue-query";
import { deleteSach, getAllSach } from "../../services/sach";
import { images, stable } from "../../constants";
import MainLayOut from "../../components/MainLayOut.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { ref, watchEffect } from "vue";
import ButtonCreateSach from "./container/ButtonCreateSach.vue";

export default {
  components: { MainLayOut, ButtonCreateSach },
  data() {
    return {
      images: images,
      stable: stable,
    };
  },

  setup() {
    const { data: sachData, refetch } = useQuery("sachManager", getAllSach);
    const { mutate, isLoading } = useMutation(deleteSach, {
      onSuccess: (data) => {
        toast.success("Xóa Thành Công");
        refetch.value();
      },
      onError: (error) => {
        toast.error("Xóa thất bại: " + error.message);
      },
    });

    const handlerDelete = (idSach) => {
      mutate({ idSach: idSach });
    };
    watchEffect(() => {
      refetch.value();
    });
    return {
      sachData,
      handlerDelete,
      refetch,
    };
  },
};
</script>

<style></style>
