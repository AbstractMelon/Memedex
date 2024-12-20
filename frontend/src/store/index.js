import { defineStore } from "pinia";
import axios from "axios";

export const useStore = defineStore("main", {
  state: () => ({
    user: null,
    memes: [],
    isLoading: false,
  }),

  actions: {
    // Initialize user from localStorage if available
    initializeUser() {
      const token = localStorage.getItem("token");
      if (token) {
        axios
          .get("/api/users/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            this.user = response.data;
          })
          .catch((error) => {
            console.error("Failed to fetch user:", error);
            this.logout();
          });
      }
    },

    async login(credentials) {
      try {
        const response = await axios.post("/api/users/login", credentials);
        localStorage.setItem("token", response.data.token);
        this.user = response.data.user;
        return true;
      } catch (error) {
        console.error("Login failed:", error);
        return false;
      }
    },

    async register(user) {
      try {
        const response = await axios.post("/api/users/register", user);
        localStorage.setItem("token", response.data.token);
        this.user = response.data.user;
        return true;
      } catch (error) {
        console.error("Registration failed:", error);
        return false;
      }
    },

    async logout() {
      localStorage.removeItem("token");
      this.user = null;
    },

    async fetchMemes() {
      try {
        this.isLoading = true;
        const response = await axios.get("/api/memes");
        this.memes = response.data;
      } catch (error) {
        console.error("Failed to fetch memes:", error);
      } finally {
        this.isLoading = false;
      }
    },

    async uploadMeme(formData) {
      try {
        const response = await axios.post("/api/memes", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        this.memes.unshift(response.data);
        return { success: true, error: null };
      } catch (error) {
        console.error("Upload failed:", error);
        return { success: false, error: error.message };
      }
    },
  },

  // Automatically initialize user when store is created
  persist: true,
});
