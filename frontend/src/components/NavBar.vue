<template>
  <nav class="navbar">
    <!-- Logo & Text -->
    <router-link to="/" class="logo">
      <img src="../assets/logo.png" alt="MemeDex Logo" class="logo-img" />
      <span class="logo-text">MemeDex</span>
    </router-link>

    <!-- Hamburger Icon (visible on mobile) -->
    <div class="hamburger" @click="toggleMenu">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </div>

    <!-- Navigation links (visible on desktop and when menu is toggled) -->
    <div class="nav-links" :class="{ active: menuOpen }">
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

    <!-- Custom Confirmation Modal -->
    <user-auth v-if="showLogin" @close="showLogin = false" />

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
    const menuOpen = ref(false); // State to track if menu is open or closed

    // Actual logout function
    const logout = () => {
      localStorage.removeItem("token");
      store.user = null;
      showConfirmationModal.value = false;
    };

    // Function to toggle the mobile menu
    const toggleMenu = () => {
      menuOpen.value = !menuOpen.value;
    };

    return {
      store,
      showLogin,
      showConfirmationModal,
      logout,
      toggleMenu,
      menuOpen,
    };
  },
};
</script>

<style scoped>
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

/* Styles for the hamburger menu */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 25px;
  height: 18px;
  cursor: pointer;
}

.bar {
  width: 100%;
  height: 4px;
  background-color: #ffffff;
  border-radius: 2px;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  /* Hide the nav-links on mobile by default */
  .nav-links {
    display: none;
    flex-direction: column;
    width: 80%;
    gap: 1rem;
    background: #252525;
    position: absolute;
    top: 125px;
    padding: 1rem;
    border-radius: 10px;
    margin: 0 -25px;
  }

  /* Show the hamburger menu on mobile */
  .hamburger {
    display: flex;
  }

  /* When the menu is active, show the links */
  .nav-links.active {
    display: flex;
  }
}
</style>
