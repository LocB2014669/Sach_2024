<template>
  <div class="w-full">
    <div>
      <label
        for="category"
        class="block text-sm font-medium text-gray-900 dark:text-white mb-2"
        >Tên Thể Loại</label
      >
      <input
        type="text"
        v-model="titleCategory"
        id="category"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Nhập tên thể loại..."
        required
      />
    </div>
    <button
      @click="handlerEdit"
      class="px-3 mt-2 py-2 border w-full border-violet-500 duration-200 hover:bg-black hover:text-violet-500 bg-violet-500 text-black rounded-lg"
    >
      chỉnh Sữa
    </button>
    <button
      @click="goBack"
      class="px-3 mt-2 py-2 border w-full border-gray-300 duration-200 hover:bg-gray-50 hover:text-gray-900 text-gray-900 rounded-lg"
    >
      Quay Lại
    </button>
  </div>
</template>

<script>
import { defineComponent, ref, watchEffect } from "vue";
import { useMutation, useQuery } from "vue-query";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import {
  getAllCategory,
  getCategory,
  updateCategory,
} from "../../../services/sachCategory";

export default defineComponent({
  props: {
    categoryId: String,
  },
  setup(props) {
    const router = useRouter();
    const titleCategory = ref("");
    const { data, refetch } = useQuery("categorySach", getAllCategory);
    const categoryId = ref(props.categoryId);
    console.log(categoryId.value, "categoryId");

    const { data: categoryData } = useQuery("categoryEdit", () =>
      getCategory({ categoryId: categoryId.value })
    );
    watchEffect(() => {
      titleCategory.value = categoryData?.value?.data?.title;
    });

    const { mutate, isLoading } = useMutation(updateCategory, {
      onSuccess: (data) => {
        refetch.value();
        toast.success("Chỉnh sửa thành công");
      },
    });

    const handlerEdit = () => {
      mutate({ categoryId: categoryId.value, title: titleCategory.value });
    };
    const goBack = () => {
      router.go(-1);
    };
    return {
      handlerEdit,
      titleCategory,
      refetch,
      goBack,
    };
  },
});
</script>

<style></style>
