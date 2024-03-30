<template>
  <section>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <caption
          class="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800"
        >
          Danh Sách - Thẻ Mượn
        </caption>
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">STT</th>
            <th scope="col" class="px-6 py-3">Email Mượn</th>
            <th scope="col" class="px-6 py-3">Tên Sách</th>
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
            v-for="(item, index) in muonSachData?.data"
            :key="item._id"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center gap-x-2"
            >
              {{ index + 1 }}
            </th>
            <td class="px-6 py-4">
              {{ item.user?.email ? item.user?.email : "" }}
            </td>
            <td class="px-6 py-4">
              {{ item.sach?.tenSach ? item.sach?.tenSach : "" }}
            </td>
            <td class="px-6 py-4">
              {{ item.soLuongMuon }}
            </td>
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
              :class="item.check ? 'text-green-500' : 'text-red-500'"
              class="px-6 py-4 font-bold"
            >
              {{ item.check ? "Đã Duyệt" : "Chưa Duyệt" }}
            </td>

            <td class="px-6 py-4 text-right">
              <button
                @click="handlerCheckMuonSach(item._id)"
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Duyệt
              </button>
              <button
                @click="handlerDelete(item._id)"
                class="font-medium text-red-600 dark:text-blue-500 hover:underline"
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
              Chưa Có Quyển Sách Nào
            </td>
          </tr>
        </tbody>
      </table>
      <!-- <pre>{{ muonSachData }}</pre> -->
    </div>
  </section>
</template>

<script>
import { useMutation, useQuery } from "vue-query";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { ref, watchEffect } from "vue";
import {
  checkMuonSach,
  deleteMuonSach,
  getAllMuonSach,
} from "../../../services/theoDoiMuonSach";
import { useStore } from "vuex";
import { images, stable } from "../../../constants";

export default {
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
      "theMuonSach",
      getAllMuonSach
    );

    const { mutate, isLoading } = useMutation(deleteMuonSach, {
      onSuccess: (data) => {
        toast.success("Xóa Thành Công");
        refetch.value();
      },
      onError: (error) => {
        toast.error("Xóa thất bại: " + error.message);
      },
    });
    const { mutate: mutateCheckMuonSach, isLoading: isLoadingCheckMuonSach } =
      useMutation(checkMuonSach, {
        onSuccess: (data) => {
          toast.success("Duyệt Thành Công");
          refetch.value();
        },
        onError: (error) => {
          toast.error("Duyệt thất bại: " + error.message);
        },
      });

    const handlerDelete = (idMuonSach) => {
      mutate({ token: token, idMuonSach: idMuonSach });
    };
    const handlerCheckMuonSach = (idMuonSach) => {
      mutateCheckMuonSach({ idMuonSach: idMuonSach });
    };
    watchEffect(() => {
      refetch.value();
    });
    return {
      muonSachData,
      handlerDelete,
      handlerCheckMuonSach,
      refetch,
    };
  },
};
</script>

<style></style>
