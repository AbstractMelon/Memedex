<template>
  <div class="auth-modal">
    <div class="modal-content">
      <h2>{{ isLogin ? "Login" : "Register" }}</h2>
      <form @submit.prevent="handleSubmit">
        <input v-model="username" type="text" placeholder="username" required />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          required
        />
        <button type="submit">{{ isLogin ? "Login" : "Register" }}</button>
      </form>
      <p>
        {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
        <button @click="isLogin = !isLogin" class="toggle-btn">
          {{ isLogin ? "Register" : "Login" }}
        </button>
      </p>
      <button @click="$emit('close')" class="close-btn">×</button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "../store";

export default {
  name: "UserAuth",
  emits: ["close"],
  setup(props, { emit }) {
    const store = useStore();
    const isLogin = ref(true);
    const username = ref("");
    const password = ref("");

    const handleSubmit = async () => {
      let success;

      if (isLogin.value) {
        success = await store.login({
          username: username.value,
          password: password.value,
        });
      } else {
        success = await store.register({
          username: username.value,
          password: password.value,
        });
      }

      if (success) {
        emit("close");
      }
    };

    return {
      isLogin,
      username,
      password,
      handleSubmit,
    };
  },
};
</script>

<style>
.auth-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #252525;
  padding: 2rem;
  border-radius: 8px;
  position: relative;
  width: 100%;
  max-width: 400px;
}

.modal-content input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.toggle-btn {
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  padding: 0;
}
</style>
