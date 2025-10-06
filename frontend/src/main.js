import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

// Crear app
const app = createApp(App);

// Configurar Axios
axios.defaults.baseURL = "http://localhost:3000"; // backend
app.config.globalProperties.$axios = axios;

// Usar router
app.use(router);

// Montar la app
app.mount("#app");
