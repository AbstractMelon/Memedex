import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import Profile from "./views/Profile.vue";
import Upload from "./views/Upload.vue";
import Random from "./views/Random.vue";
import MemePage from "./views/MemePage.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/profile", component: Profile, meta: { requiresAuth: true } },
  { path: "/upload", component: Upload, meta: { requiresAuth: true } },
  { path: "/random", component: Random },
  { path: "/meme/:id", component: MemePage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem("token")) {
    next("/");
  } else {
    next();
  }
});

export default router;
