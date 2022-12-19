import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from "axios";

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;

createApp(App).use(router).use(store).mount('#app')
