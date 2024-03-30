<template>
  <main-lay-out>
    <div class="p-4">
      <h2 class="text-xl font-semibold mb-4">Cập Nhật Sách</h2>
      <form @submit.prevent="handlerSubmitSach" class="space-y-4">
        <div>
          <label for="checked" class="block text-sm font-medium"
            >Checked:</label
          >
          <input
            type="checkbox"
            id="checked"
            v-model="checked"
            class="border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md px-4 py-2 mt-4"
        >
          Cập Nhật Sách
        </button>
        <div class="flex justify-between gap-x-2">
          <div class="w-1/2 border-r pr-10">
            <div class="flex items-center justify-between gap-x-8 w-full">
              <label for="tenSach" class="block text-lg font-medium text-nowrap"
                >Tên Sách:</label
              >
              <input
                type="text"
                id="tenSach"
                v-model="tenSach"
                class="border-b border-gray-300 px-3 py-2 mt-1 w-full outline-none"
              />
            </div>
            <div class="flex items-center justify-between gap-x-8 w-full">
              <label for="donGia" class="block text-lg font-medium text-nowrap"
                >Đơn Giá:</label
              >
              <input
                type="number"
                id="donGia"
                v-model="donGia"
                class="border-b border-gray-300 px-3 py-2 mt-1 w-full outline-none"
              />
            </div>
            <div class="flex items-center justify-between gap-x-8 w-full">
              <label for="soQuyen" class="block text-lg font-medium text-nowrap"
                >Số Quyển:</label
              >
              <input
                type="number"
                id="soQuyen"
                v-model="soQuyen"
                class="border-b border-gray-300 px-3 py-2 mt-1 w-full outline-none"
              />
            </div>
            <div class="flex items-center justify-between gap-x-8 w-full">
              <label
                for="namXuatBan"
                class="block text-lg font-medium text-nowrap"
                >Năm Xuất Bản:</label
              >
              <input
                type="number"
                id="namXuatBan"
                v-model="namXuatBan"
                class="border-b border-gray-300 px-3 py-2 mt-1 w-full outline-none"
              />
            </div>

            <div class="my-5">
              <span class="block text-lg font-medium text-nowrap"
                >Chọn ảnh sách:</span
              >
              <label
                for="photo"
                class="bg-white p-3 text-black text-base rounded w-full h-[300px] flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]"
              >
                <div
                  v-if="data?.data.photo != '' || photoURL"
                  class="w-[200px] h-[300px]"
                >
                  <img
                    class="border border-black rounded-lg object-cover"
                    :src="
                      photoURL
                        ? photoURL
                        : stable.UPLOAD_FOLDER_BASE_URL + data?.data.photo
                    "
                    alt=""
                  />
                </div>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-8 mb-2 fill-black"
                  viewBox="0 0 32 32"
                >
                  <path
                    d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                    data-original="#000000"
                  />
                  <path
                    d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                    data-original="#000000"
                  />
                </svg>
                <span v-if="!data?.data.photo && !photoURL">Upload file</span>

                <input
                  type="file"
                  class="hidden"
                  id="photo"
                  @change="handlePhotoChange"
                />
                <p
                  v-if="!data?.data.photo != '' && !photoURL"
                  class="text-xs text-gray-400 mt-2"
                >
                  PNG, JPG , JPEG
                </p>
              </label>
              <!-- <div>
                <label for="photo" class="block text-sm font-medium"
                  >Ảnh:</label
                >
                <input
                  type="file"
                  id="photo"
                  @change="handlePhotoChange"
                  class="mt-1"
                />
              </div> -->

              <button
                v-if="data?.data.photo || photoURL"
                @click="handlerDeletePhoto"
                type="button"
                class="text-white font-bold text-lg mt-2 px-2 py-3 bg-red-600 rounded-lg"
              >
                Xóa ảnh
              </button>
            </div>
          </div>
          <div class="w-1/2">
            <div>
              <label for="caption" class="block text-sm font-medium"
                >Caption:</label
              >
              <textarea
                id="caption"
                v-model="caption"
                rows="12"
                class="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full resize-none"
              ></textarea>
            </div>
            <div>
              <label for="tacGia" class="block text-sm font-medium"
                >Tác Giả:</label
              >
              <input
                type="text"
                id="tacGia"
                v-model="tacGia"
                class="border-b border-gray-300 outline-none px-3 py-2 mt-1 w-full"
              />
            </div>
            <!-- <div>
              <label for="category" class="block text-sm font-medium"
                >Thể Loại:</label
              >
              <input
                type="text"
                id="category"
                v-model="category"
                class="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full"
              />
            </div> -->
            <div>
              <label for="country" class="block text-sm font-medium"
                >Quốc Gia:</label
              >
              <input
                type="text"
                id="country"
                v-model="country"
                class="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full"
              />
            </div>
            <div class="card flex justify-content-center">
              <MultiSelect
                v-model="category"
                :options="cities"
                optionLabel="name"
                placeholder="Select Cities"
                :maxSelectedLabels="3"
                class="w-full md:w-20rem"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  </main-lay-out>
</template>

<script>
import { computed, onMounted, ref, watch, watchEffect } from "vue";
import { useMutation, useQuery } from "vue-query";
import MainLayOut from "../../components/MainLayOut.vue";
import { getDetailSach, updateSach } from "../../services/sach";
import { useRoute } from "vue-router";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { images, stable } from "../../constants";
import { getAllCategory } from "../../services/sachCategory";
import axios from "axios";
import { loginUser } from "../../services/user";

export default {
  components: { MainLayOut },
  data() {
    return {
      stable: stable,
      images: images,
    };
  },
  setup() {
    const route = useRoute();
    const idSach = route.params.id;
    const dataDefault = ref({});
    const photoCurrent = ref(null);

    const { data } = useQuery(["sachEdit", idSach], () =>
      getDetailSach(idSach)
    );
    onMounted(async () => {
      const reponse = await axios.get(`/api/sach/${idSach}`);
      dataDefault.value = reponse.data;
    });
    const tenSach = ref("");
    const donGia = ref("");
    const soQuyen = ref("");
    const namXuatBan = ref("");
    const caption = ref("");
    const tacGia = ref("");
    const category = ref([]);
    const country = ref("");
    const checked = ref(false);
    const photo = ref(null);
    const statusPhoto = ref(null);
    const photoURL = ref(null);
    const cities = ref([]);
    const sachCategoryData = ref([]);
    onMounted(async () => {
      try {
        const reponse = await axios.get("/api/sachCategory/");
        sachCategoryData.value = reponse.data;
      } catch (error) {}
    });
    watch(() => {
      tenSach.value = dataDefault.value.tenSach;
      donGia.value = dataDefault.value.donGia;
      soQuyen.value = dataDefault.value.soQuyen;
      namXuatBan.value = dataDefault.value.namXuatBan;
      country.value = dataDefault.value.country;
      checked.value = dataDefault.value.checked;
      tacGia.value = dataDefault.value.tacGia;
      caption.value = dataDefault.value.caption;
      statusPhoto.value = dataDefault.value.photo;
    });

    watchEffect(() => {
      if (sachCategoryData.value && sachCategoryData.value.length > 0) {
        cities.value = sachCategoryData.value.map((item) => ({
          name: item.title,
          code: item._id,
        }));
      }
    });

    const { mutate, isLoading } = useMutation(updateSach, {
      onSuccess: () => {
        toast.success("Cập Nhật Thành Công");
      },
    });

    const handlerSubmitSach = async () => {
      let formData = new FormData();

      if ((!statusPhoto.value || statusPhoto.value) && photo.value) {
        formData.append("photoSach", photo.value);
        toast.success("dong 1");
      } else if (statusPhoto.value && !photo.value) {
        try {
          const response = await axios.get(
            `${stable.UPLOAD_FOLDER_BASE_URL}${statusPhoto.value}`,
            { responseType: "blob" }
          );
          const blob = response.data;
          const file = new File([blob], statusPhoto.value);

          formData.append("photoSach", file);
          toast.success("Sử dụng ảnh cũ");
        } catch (error) {
          console.error("Lỗi khi lấy ảnh cũ:", error);
          toast.error("Có lỗi xảy ra khi lấy ảnh cũ");
          return;
        }
      }

      try {
        const categoryIds = category.value.map((item) => item.code);
        formData.append(
          "document",
          JSON.stringify({
            tenSach: tenSach.value,
            donGia: donGia.value,
            soQuyen: soQuyen.value,
            namXuatBan: namXuatBan.value,
            caption: caption.value,
            tacGia: tacGia.value,
            category: categoryIds,
            country: country.value,
            checked: checked.value,
          })
        );

        await mutate({ idSach: idSach, formData: formData });
      } catch (error) {
        console.error("Lỗi khi cập nhật sách:", error);
        toast.error("Cập Nhật Thất Bại");
      }
    };

    const handlePhotoChange = (event) => {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        photo.value = selectedFile;
        photoURL.value = URL.createObjectURL(selectedFile);
      } else {
        photo.value = photoCurrent.value;
      }
    };

    const handlerDeletePhoto = () => {
      photo.value = null;
      statusPhoto.value = null;
      photoURL.value = null;
    };

    return {
      photoCurrent,
      data,
      tenSach,
      photo,
      statusPhoto,
      photoURL,
      donGia,
      soQuyen,
      namXuatBan,
      caption,
      tacGia,
      category,
      country,
      checked,
      // selectedCities,
      sachCategoryData,
      cities,
      handlerSubmitSach,
      handlePhotoChange,
      handlerDeletePhoto,
    };
  },
};
</script>
