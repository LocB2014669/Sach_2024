<template>
  <section>
    <div class="relative flex gap-x-5">
      <FormCreateNXB class="1/3" />
      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-x-auto shadow-md sm:rounded-lg"
      >
        <caption
          class="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800"
        >
          Danh Sách - Nhà Xuất Bản
        </caption>
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">STT</th>
            <th scope="col" class="px-6 py-3">Mã Nhà Xuất Bản</th>
            <th scope="col" class="px-6 py-3">Tên Nhà Xuất Bản</th>
            <th scope="col" class="px-6 py-3">Địa Chỉ</th>
            <th scope="col" class="px-6 py-3">Ngày Tạo</th>
            <th scope="col" class="px-6 py-3">
              <span class="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            :v-if="NXBData?.data.length > 0"
            v-for="(item, index) in NXBData?.data"
            :key="item._id"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <td class="px-6 py-4">
              {{ index + 1 }}
            </td>
            <td class="px-6 py-4">
              {{ item.maNXB }}
            </td>
            <td class="px-6 py-4">
              {{ item.tenNXB }}
            </td>
            <td class="px-6 py-4">
              {{ item.diaChi }}
            </td>
            <td class="px-6 py-4">
              {{
                new Date(item.createdAt).toLocaleDateString("vi-VN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              }}
            </td>

            <td class="px-6 py-4 text-right">
              <button
                @click="handlerCheckEdit(item._id)"
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                @click="handlerDeleteNXB(item._id)"
                class="font-medium text-red-600 dark:text-blue-500 hover:underline"
              >
                Xóa
              </button>
            </td>
          </tr>
          <tr
            v-if="NXBData?.data.length === 0"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 w-full"
          >
            <td :colspan="6" class="px-auto py-3 text-center text-red-500">
              Chưa Có Nhà Xuất Bản Nào
            </td>
          </tr>
        </tbody>
      </table>
      <div
        v-if="showModal"
        class="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-50 flex justify-center items-center"
      >
        <div class="modal-container">
          <div class="modal-content bg-white shadow-md rounded-lg p-6">
            <!-- Modal header -->
            <div
              class="modal-header flex justify-between items-center border-b pb-3"
            >
              <h3 class="text-lg font-semibold">
                Chỉnh Sữa Thông Tin Nhà Sản Xuất Xuất
              </h3>
              <button
                @click="closeModal"
                class="text-gray-400 hover:text-gray-700 focus:outline-none"
              ></button>
            </div>
            <!-- Modal body -->
            <div class="modal-body">
              <!-- Your form for editing publisher details goes here -->
              <form>
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
                  @click.prevent="handlerUpdateNXB"
                  class="px-3 mt-2 py-2 border w-full border-violet-500 duration-200 hover:bg-black hover:text-violet-500 bg-violet-500 text-black rounded-lg"
                >
                  Chỉnh Sữa
                </button>
              </form>
            </div>
            <!-- Modal footer -->
            <div class="modal-footer flex justify-end pt-4 border-t mt-4">
              <button
                @click="showModal = false"
                class="bg-red-500 font-bold px-3 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- <pre>{{ muonSachData }}</pre> -->
    </div>
  </section>
</template>

<script>
import { deleteNXB, getAllNXB, getNXB } from "../../../services/nhaXuatBan";
import { useMutation, useQuery } from "vue-query";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { ref, watchEffect } from "vue";
import { images, stable } from "../../../constants";
import FormCreateNXB from "./FormCreateNXB.vue";
import ModelEditNXB from "./ModelEditNXB.vue";
import { updateNXB } from "../../../services/nhaXuatBan";

export default {
  components: { FormCreateNXB, ModelEditNXB },
  data() {
    return {
      images: images,
      stable: stable,
    };
  },

  setup() {
    const showModal = ref(false);
    const tenNXB = ref("");
    const diaChi = ref("");
    const idEdit = ref(null);
    const { data: NXBData, refetch } = useQuery("NhaXuatBan", getAllNXB);
    const { mutate, isLoading } = useMutation(deleteNXB, {
      onSuccess: (data) => {
        toast.success("Xóa Thành Công");
        refetch.value();
      },
      onError: (error) => {
        toast.error("Xóa thất bại: " + error.message);
      },
    });
    const { mutate: mutateEditNXB, isLoading: isLoadingEditNXB } = useMutation(
      updateNXB,
      {
        onSuccess: (data) => {
          toast.success("Điều Chỉnh Thành Công");
          refetch.value();
        },
        onError: (error) => {
          toast.error("Điều Chỉnh Thất Bại: " + error.message);
        },
      }
    );
    const handlerDeleteNXB = (idNXB) => {
      mutate({ idNXB: idNXB });
    };
    const handlerCheckEdit = async (idNXB) => {
      showModal.value = true;
      const { data } = await getNXB({ idNXB: idNXB });
      tenNXB.value = data.tenNXB;
      diaChi.value = data.diaChi;
      idEdit.value = data._id;
    };
    const handlerUpdateNXB = () => {
      showModal.value = false;
      mutateEditNXB({
        idNXB: idEdit.value,
        tenNXB: tenNXB.value,
        diaChi: diaChi.value,
      });
    };

    watchEffect(() => {
      refetch.value();
    });
    return {
      NXBData,
      handlerDeleteNXB,
      handlerUpdateNXB,
      handlerCheckEdit,
      showModal,
      tenNXB,
      diaChi,
      refetch,
    };
  },
};
</script>

<style></style>
