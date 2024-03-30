<template>
  <div
    class="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-50 flex justify-center items-center"
  >
    <div class="modal-container">
      <div class="modal-content bg-white shadow-md rounded-lg p-6">
        <!-- Modal header -->
        <div
          class="modal-header flex justify-between items-center border-b pb-3"
        >
          <h3 class="text-lg font-semibold">Edit Publisher</h3>
          <button
            @click="closeModal"
            class="text-gray-400 hover:text-gray-700 focus:outline-none"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <!-- Modal body -->
        <div class="modal-body">
          <!-- Your form for editing publisher details goes here -->
          <form>
            <!-- Form fields -->
          </form>
        </div>
        <!-- Modal footer -->
        <div class="modal-footer flex justify-end pt-4 border-t mt-4">
          <button @click="closeModal" class="btn-cancel">Cancel</button>
          <button @click="saveChanges" class="btn-save">Save Changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closeModal() {
      this.showModal = false;
    },
    saveChanges() {
      // Logic to save changes
      this.showModal = false;
    },
  },
};
</script>

<style></style>
