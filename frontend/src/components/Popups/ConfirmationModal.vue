<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal">
      <h3>Are you sure you want to log out?</h3>
      <div class="modal-actions">
        <button @click="confirmLogout" class="confirm-btn">Yes</button>
        <button @click="cancelLogout" class="cancel-btn">No</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmationModal",
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["confirm", "cancel"],
  methods: {
    confirmLogout() {
      this.$emit("confirm"); // Emit the 'confirm' event to the parent
    },
    cancelLogout() {
      this.$emit("cancel"); // Emit the 'cancel' event to the parent
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal {
  background: #252525;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  width: fit-content;
  height: fit-content;
}

.modal-actions {
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
  height: 50px;
}

.confirm-btn {
  background-color: #ff0000;
  width: 100px;
}

.confirm-btn:hover {
  background-color: #ff2929;
}

.cancel-btn {
  background-color: #007bff;
  width: 100px;
}

.cancel-btn:hover {
  background-color: #0069d9;
}
</style>
