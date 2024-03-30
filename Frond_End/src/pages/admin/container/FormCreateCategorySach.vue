<template>
  <div class="">
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
      @click="handlerCreateCatgory"
      class="px-3 mt-2 py-2 border w-full border-violet-500 duration-200 hover:bg-black hover:text-violet-500 bg-violet-500 text-black rounded-lg"
    >
      Tạo thể loại
    </button>
  </div>
</template>

<script>
import { defineComponent, ref, watchEffect } from "vue";
import { useMutation, useQuery } from "vue-query";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useRouter } from "vue-router";
import { createCategory, getAllCategory } from "../../../services/sachCategory";

export default defineComponent({
  setup() {
    const titleCategory = ref("");
    const { data: categoryData, refetch } = useQuery(
      "categorySach",
      getAllCategory
    );
    const { mutate, isLoading } = useMutation(createCategory, {
      onSuccess: (data) => {
        refetch.value();
        toast.success("Tạo thành công");
      },
    });

    watchEffect(() => {
      refetch.value();
    });

    const handlerCreateCatgory = () => {
      if (titleCategory.value !== "") {
        mutate({ title: titleCategory.value });
        titleCategory.value = "";
      } else {
        toast.error("Tên thể loại không được để trống");
      }
    };

    return {
      handlerCreateCatgory,
      titleCategory,
      refetch,
    };
  },
});
</script>

<style></style>
