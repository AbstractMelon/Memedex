import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { useStore } from "./store";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

const store = useStore();
store.initializeUser();

app.mount("#app");
