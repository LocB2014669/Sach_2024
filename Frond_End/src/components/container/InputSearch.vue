<template>
  <form class="w-[350px]" @submit.prevent="searchBooks">
    <label
      for="default-search"
      class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >Search</label
    >
    <div class="relative">
      <div
        class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
      >
        <svg
          class="w-4 h-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      <input
        type="search"
        id="default-search"
        v-model="searchKeyWord"
        class="block w-full py-2 ps-10 text-sm text-gray-900 border rounded-xl border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Nhập tên sách"
        required
      />
      <button
        type="submit"
        class="text-white absolute end-2 bottom-1 bg-black hover:bg-violet-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1"
      >
        Search
      </button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      searchKeyWord: "",
    };
  },
  methods: {
    searchBooks() {
      if (this.searchKeyWord.trim() !== "") {
        this.$router.push({
          path: "/sach",
          query: { search: this.searchKeyWord },
        });
      }
    },
  },
};
</script>

<style></style>
