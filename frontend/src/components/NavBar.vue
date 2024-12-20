<template>
  <nav class="navbar">
    <!-- Logo with text -->
    <router-link to="/" class="logo">
      <img src="../assets/logo.png" alt="MemeDex Logo" class="logo-img" />
      <span class="logo-text">MemeDex</span>
    </router-link>
    <div class="nav-links">
      <router-link to="/random">Random</router-link>
      <template v-if="store.user">
        <router-link to="/upload">Upload</router-link>
        <router-link to="/profile">Profile</router-link>
        <button @click="showConfirmationModal = true" class="logout">
          Logout
        </button>
      </template>
      <template v-else>
        <button @click="showLogin = true">Login</button>
      </template>
    </div>
    <user-auth v-if="showLogin" @close="showLogin = false" />

    <!-- Custom Confirmation Modal -->
    <ConfirmationModal
      :isVisible="showConfirmationModal"
      @confirm="logout"
      @cancel="showConfirmationModal = false"
    />
  </nav>
</template>

<script>
import { ref } from "vue";
import { useStore } from "../store";
import UserAuth from "./UserAuth.vue";
import ConfirmationModal from "./Popups/ConfirmationModal.vue";

export default {
  name: "NavBar",
  components: { UserAuth, ConfirmationModal },
  setup() {
    const store = useStore();
    const showLogin = ref(false);
    const showConfirmationModal = ref(false);

    // Actual logout function
    const logout = () => {
      localStorage.removeItem("token");
      store.user = null;
      showConfirmationModal.value = false;
    };

    return {
      store,
      showLogin,
      showConfirmationModal,
      logout,
    };
  },
};
</script>

<style>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #252525;
  border-radius: 10px;
  border: 2px solid #007bff;
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.logo-img {
  width: 30px;
  height: auto;
  margin-right: 10px;
  transition: transform 0.3s ease;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffffff;
  transition: transform 0.3s ease;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.logout {
  background-color: #ff0000;
}

.logout:hover {
  background-color: #ff2929;
}

.logout:active {
  background-color: #ae0000;
}
</style>
