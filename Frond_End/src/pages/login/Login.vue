<template>
  <MainLayOut>
    <div class="min-h-screen flex items-center justify-center">
      <div class="max-w-md w-full p-6 bg-white rounded-xl shadow">
        <h2 class="text-xl font-semibold mb-6">Đăng Nhập</h2>
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
          <button
            type="submit"
            @click="handleLogin"
            class="w-full bg-black hover:bg-white hover:text-black hover:border-2 text-white font-semibold duration-200 rounded-lg px-2 py-3"
          >
            Đăng Nhập
          </button>
          <p class="text-base font-semibold">
            Bạn chưa có tài khoản?<router-link
              class="text-violet-500 font-bold"
              to="/register"
              >Đăng Ký Ngay</router-link
            >
          </p>
        </form>
      </div>
    </div>
  </MainLayOut>
</template>

<script>
import { ref, computed, watch } from "vue";
import { useQuery, useMutation } from "vue-query";
import { loginUser } from "../../services/user";
import MainLayOut from "../../components/MainLayOut.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useRouter } from "vue-router";
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
  },
  setup() {
    toast.success("Aloooooo0", {
      autoClose: 1000,
    });
    const email = ref("");
    const password = ref("");
    const isError = ref(false);
    const error = ref("");
    const router = useRouter();

    const { mutate, isLoading } = useMutation(loginUser, {
      onSuccess: (data) => {
        localStorage.setItem("user", JSON.stringify(data));
        toast.success("Đăng Nhập thành công", { autoClose: 1000 });
        router.push("/");
      },
      onError: (error) => {
        toast.error("Đăng Nhập thất bại: " + error.message);
      },
    });

    const handleLogin = (e) => {
      e.preventDefault();

      if (!email.value || !password.value) {
        isError.value = true;
        error.value = "Vui lòng điền đầy đủ thông tin.";
        return;
      }

      mutate({
        email: email.value,
        password: password.value,
      });
    };

    return {
      email,
      password,
      handleLogin,
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
