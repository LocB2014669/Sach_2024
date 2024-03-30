<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table
      class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
    >
      <caption
        class="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800"
      >
        Danh Sách - Tài Khoản
      </caption>
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3">STT</th>
          <th scope="col" class="px-6 py-3">Email</th>
          <th scope="col" class="px-6 py-3">Ngày Tạo</th>
          <th scope="col" class="px-6 py-3">Loại Tài Khoản</th>
          <th scope="col" class="px-6 py-3">
            <span class="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          :v-if="userData?.data.length > 0"
          v-for="(item, index) in userData?.data"
          :key="item._id"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
          <td class="px-6 py-4">{{ index + 1 }}</td>
          <td class="px-6 py-4">{{ item.email }}</td>
          <td class="px-6 py-4">{{ item.createdAt }}</td>
          <td
            :class="item.docgia ? 'text-blue-500' : 'text-violet-500'"
            class="px-6 py-4 font-bold"
          >
            {{ item.docgia != null ? "Đọc Giả" : "Nhân Viên" }}
          </td>
          <!-- Hiển thị giá sách -->
          <td class="px-6 py-4 text-right">
            <button
              @click="handlerDelete(item._id)"
              class="font-medium text-red-600 dark:text-blue-500 hover:underline"
            >
              Xóa
            </button>
          </td>
        </tr>
        <tr
          v-if="userData?.data.length === 0"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 w-full"
        >
          <td :colspan="6" class="px-auto py-3 text-center text-red-500">
            Chưa Có Tài Khoản Nào
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <pre>{{ userData }}</pre> -->
  </div>
</template>

<script>
import { useMutation, useQuery } from "vue-query";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { ref, watchEffect } from "vue";
import { images, stable } from "../../../constants";
import { deleteUser, getAllUser } from "../../../services/user";

export default {
  data() {
    return {
      images: images,
      stable: stable,
    };
  },

  setup() {
    const { data: userData, refetch } = useQuery("userManager", getAllUser);
    const { mutate, isLoading } = useMutation(deleteUser, {
      onSuccess: (data) => {
        toast.success("Xóa Thành Công");
        refetch.value();
      },
      onError: (error) => {
        toast.error("Xóa thất bại: " + error.message);
      },
    });

    const handlerDelete = (idUser) => {
      mutate({ idUser: idUser });
    };
    watchEffect(() => {
      refetch.value();
    });
    return {
      userData,
      handlerDelete,
      refetch,
    };
  },
};
</script>

<style></style>
