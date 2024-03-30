<template>
  <section>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <caption
          class="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800"
        >
          Danh Sách Mượn Sách
        </caption>
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Sách</th>
            <th scope="col" class="px-6 py-3">Số Lượng</th>
            <th scope="col" class="px-6 py-3">Ngày Mượn</th>
            <th scope="col" class="px-6 py-3">Ngày Trả</th>
            <th scope="col" class="px-6 py-3">Trạng Thái</th>
            <th scope="col" class="px-6 py-3">
              <span class="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            :v-if="muonSachData?.data.length > 0"
            v-for="item in muonSachData?.data"
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
                  item.sach?.photo
                    ? stable.UPLOAD_FOLDER_BASE_URL + item.sach?.photo
                    : images.phoToOrigin
                "
                alt=""
              />
              <p>{{ item.sach?.tenSach }}</p>
            </th>
            <td class="px-6 py-4">{{ item.soLuongMuon }}</td>
            <td class="px-6 py-4">
              {{
                new Date(item.ngayMuon).toLocaleDateString("vi-VN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              }}
            </td>
            <td class="px-6 py-4">
              {{
                new Date(item.ngayTra).toLocaleDateString("vi-VN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              }}
            </td>
            <td
              :class="{
                'text-green-500': item.check,
                'text-blue-500': !item.check,
              }"
              class="px-6 py-4"
            >
              {{ item.check ? "Đã Duyệt" : "Chờ Duyệt" }}
            </td>
            <!-- Hiển thị giá sách -->
            <td class="px-6 py-4 text-right">
              <button
                @click="handlerDelete(item._id)"
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Xóa
              </button>
            </td>
          </tr>
          <tr
            v-if="muonSachData?.data.length === 0"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 w-full"
          >
            <td :colspan="6" class="px-auto py-3 text-center text-red-500">
              Bạn Chưa Mượn Quyển Sách Nào
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import { defineComponent, onMounted, watchEffect } from "vue";
import { useMutation, useQuery } from "vue-query";
import { useStore } from "vuex";



import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { deleteMuonSach, getMuonSachByUser } from "../../../services/theoDoiMuonSach";
import { images, stable } from "../../../constants";
export default defineComponent({
  data() {
    return {
      images: images,
      stable: stable,
    };
  },

  setup() {
    const store = useStore();
    const token = store.state.user?.data?.token;

    const { data: muonSachData, refetch } = useQuery(
      ["muonSachByUser", token],
      () => getMuonSachByUser({ token: token })
    );

    const { mutate, isLoading } = useMutation(deleteMuonSach, {
      onSuccess: (data) => {
        toast.success("Xóa Thành Công");
        refetch.value();
      },
      onError: (error) => {
        toast.error(error.messenger);
      },
    });

    const handlerDelete = (idMuonSach) => {
      mutate({ token: token, idMuonSach: idMuonSach });
    };
    watchEffect(() => {
      refetch.value();
    });

    return {
      handlerDelete,
      muonSachData,
    };
  },
});
</script>

<style></style>
