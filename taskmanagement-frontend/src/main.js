import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/js/all.min.js";

import "bootstrap-vue/dist/bootstrap-vue.css";

import "./assets/main.css";

import router from "./router";

createApp(App).use(router).mount("#app");
