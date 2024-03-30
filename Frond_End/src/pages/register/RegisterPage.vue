<template>
  <MainLayOut>
    <div class="min-h-screen flex items-center justify-center">
      <div class="max-w-md w-full p-6 bg-white rounded-xl shadow">
        <h2 class="text-xl font-semibold mb-6">Đăng ký</h2>
        <form>
          <div class="mb-4">
            <label for="email" class="block font-medium mb-1">Email:</label>
            <input
              type="email"
              id="email"
              v-model="email"
              @change="validateEmail"
              required
              class="w-full border border-gray-300 rounded py-2 px-3"
            />
            <span v-if="!isValidEmail && email" class="text-red-500"
              >Email không hợp lệ.</span
            >
          </div>

          <div class="mb-4">
            <label for="password" class="block font-medium mb-1"
              >Password:</label
            >
            <input
              type="password"
              id="password"
              v-model="password"
              @change="validatePassword"
              required
              class="w-full border border-gray-300 rounded py-2 px-3"
            />
            <p v-if="password.length < 6 && password" class="text-red-500">
              Mật khẩu phải có ít nhất 6 ký tự.
            </p>
          </div>

          <div class="mb-4">
            <label for="confirmPassword" class="block font-medium mb-1"
              >Xác nhận mật khẩu:</label
            >
            <input
              type="password"
              id="confirmPassword"
              v-model="confirmPassword"
              @change="validateConfirmPassword"
              required
              class="w-full border border-gray-300 rounded py-2 px-3"
              :class="{ 'border-red-500': !isPasswordMatch && confirmPassword }"
            />
            <p v-if="!isPasswordMatch && confirmPassword" class="text-red-500">
              Mật khẩu không khớp.
            </p>
          </div>

          <div class="mb-4">
            <label for="hoLot" class="block font-medium mb-1">Họ lót:</label>
            <input
              type="text"
              id="hoLot"
              v-model="hoLot"
              required
              class="w-full border border-gray-300 rounded py-2 px-3"
            />
            <p v-if="hoLot.length < 3 && hoLot" class="text-red-500">
              Mật khẩu phải có ít nhất 2 ký tự.
            </p>
          </div>

          <div class="mb-4">
            <label for="ten" class="block font-medium mb-1">Tên:</label>
            <input
              type="text"
              id="ten"
              v-model="ten"
              required
              class="w-full border border-gray-300 rounded py-2 px-3"
            />
            <p v-if="ten.length < 3 && ten" class="text-red-500">
              Mật khẩu phải có ít nhất 2 ký tự.
            </p>
            
          </div>

          <button
            type="submit"
            @click="handleSignup"
            class="w-full bg-black hover:bg-white hover:text-black hover:border-2 text-white font-semibold duration-200 rounded-lg px-2 py-3"
          >
            Đăng ký
          </button>
          <p class="text-base font-semibold">
            Bạn đã có tài khoản?<router-link
              class="text-violet-500 font-bold"
              to="/login"
              >Đăng Nhập Ngay</router-link
            >
          </p>
        </form>
      </div>
    </div>
  </MainLayOut>
</template>

<script>
import { ref, computed, watch } from "vue";
import { useMutation } from "vue-query";
import { createDocGia } from "../../services/user";
import MainLayOut from "../../components/MainLayOut.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";


export default {
  components: { MainLayOut },
  methods: {
    validateEmail() {
      const emailRegex =
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      this.isValidEmail = emailRegex.test(this.email);
    },
    validatePassword() {
      if (this.password.length < 6) {
        this.isError = true;
        this.error = "Mật khẩu phải có ít nhất 6 ký tự.";
      } else {
        this.isError = false;
      }
    },
    validateConfirmPassword() {
      this.isPasswordMatch = this.password === this.confirmPassword;
    },
  },
  setup() {
    toast.success("Aloooooo0", {
      autoClose: 1000,
    });
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const hoLot = ref("");
    const ten = ref("");

    const isError = ref(false);
    const error = ref("");

    const { mutate, isLoading } = useMutation(createDocGia, {
      onSuccess: (data) => {
        localStorage.setItem("user", JSON.stringify(data));
        toast.success("Đăng ký thành công");
      },
      onError: (error) => {
        toast.error("Đăng ký thất bại: " + error.message);
      },
    });

    const handleSignup = (e) => {
      e.preventDefault();

      if (
        !email.value ||
        !password.value ||
        !confirmPassword.value ||
        !hoLot.value ||
        !ten.value
      ) {
        isError.value = true;
        error.value = "Vui lòng điền đầy đủ thông tin.";
        return;
      }

      mutate({
        email: email.value,
        password: password.value,
        hoLot: hoLot.value,
        ten: ten.value,
      });
    };

    return {
      email,
      password,
      confirmPassword,
      hoLot,
      ten,
      handleSignup,
      isError,
      error,
      isLoading,
    };
  },
};
</script>

<style scoped>
/* styles here */
</style>
