<template>
  <div class="">
    <button
      @click="handlerCreateSach"
      class="px-3 py-2 border border-violet-500 duration-200 hover:bg-black hover:text-violet-500 bg-violet-500 text-black rounded-lg"
    >
      Thêm Sách
    </button>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useMutation } from "vue-query";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { createSach } from "../../../services/sach";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const { mutate, isLoading } = useMutation(createSach, {
      onSuccess: (data) => {
        router.push(`/admin/sach/edit/${data?.data._id}`);
      },
    });

    const handlerCreateSach = () => {
      mutate({});
      toast.success("Thêm Mô Hình Thành Công Vui Lòng Chỉnh useMutation, Sữa");
    };

    return {
      handlerCreateSach,
    };
  },
});
</script>

<style></style>
import { useRouter } from "vue-router";
