<template>
  <section class="sticky top-0 left-0 right-0 z-50 bg-white">
    <header
      class="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
    >
      <nav class="container mx-auto flex items-center justify-between">
        <div class="flex">
          <a href="#" class="-m-1.5 p-1.5">
            <router-link to="/">
              <img class="h-8 w-auto" :src="images.Logo" alt="" />
            </router-link>
          </a>
        </div>
        <div class="flex justify-between text-center gap-x-3">
          <router-link to="/" class="mr-4">Home</router-link>
          <router-link to="/sach" class="mr-4">Sach</router-link>
          <div
            class="relative inline-block"
            @mouseover="showDropdown = true"
            @mouseleave="showDropdown = false"
          >
            <router-link to="/theloai" class="mr-4">Thể loại</router-link>
            <div
              v-if="showDropdown"
              class="absolute right-0 mt-0 w-48 bg-white rounded-md shadow-lg"
            >
              <div
                class="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  >Option 1</a
                >
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  >Option 2</a
                >
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  >Option 3</a
                >
              </div>
            </div>
          </div>
          <router-link to="/about">About</router-link>
        </div>
        <!-- search -->
        <InputSearch />
        <!-- endSearch -->

        <div class="">
          <router-link
            v-if="!user || !user.data"
            to="/login"
            class="px-3 py-2 border-2 border-black rounded-full hover:bg-black duration-200 hover:text-white font-medium text-lg"
          >
            Đăng Nhập
          </router-link>

          <div
            v-else
            class="relative inline-block"
            @mouseover="showProfile = true"
            @mouseleave="showProfile = false"
          >
            <router-link
              to="/"
              class="mr-4 text-lg font-medium text-violet-500"
              >{{ user?.data?.userInfo.ten }}</router-link
            >
            <div
              v-if="showProfile"
              class="absolute right-0 mt-0 w-48 bg-white rounded-md shadow-lg"
            >
              <div
                class="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <router-link
                  to="/profile"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Profile
                </router-link>
              </div>
              <div
                class="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <router-link
                  to="/manager"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Quản lý admin
                </router-link>
              </div>
              <div
                class="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <button
                  @click="logout"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Đăng Xuất
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <!-- <pre>{{ user }}</pre> -->
    </header>
  </section>
</template>

<script>
import { images, stable } from "../constants";
import { ref, defineComponent } from "vue";
import { mapMutations } from "vuex";
import InputSearch from "./container/InputSearch.vue";

export default defineComponent({
  components: { InputSearch },
  data() {
    return {
      images: images,
      stable: stable,
      showDropdown: false,
      showProfile: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    ...mapMutations(["logout"]),
  },
});
</script>
