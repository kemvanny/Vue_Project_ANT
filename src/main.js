import "./assets/main.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import * as lucide from "lucide-vue-next";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

Object.entries(lucide).forEach(([name, component]) => {
  app.component(name, component);
});

app.use(createPinia());
app.use(router);

app.mount("#app");
