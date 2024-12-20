<template>
  <div class="page">
    <div class="app">
      <nav-bar />
      <main>
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
  name: "App",
  components: {
    NavBar,
  },
};
</script>

<style>
body {
  background-color: rgb(41, 41, 41);
  color: white;
}

.app {
  max-width: 90vw;
  margin: 0 auto;
  padding: 20px;
}

main {
  margin-top: 20px;
}

/* Buttons */

a {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: #007bff;
  color: white;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.3s ease, transform 0.3s ease;
}

a:hover {
  background: #0056b3;
  transform: scale(1.05);
}

a:active {
  background: #003c80;
  transform: scale(0.95);
}

button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: #007bff;
  color: white;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;
}

button:hover {
  background: #0056b3;
  transform: scale(1.05);
}

button:active {
  background: #003c80;
  transform: scale(0.95);
}
</style>
