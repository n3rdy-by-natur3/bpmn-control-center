import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';
import router from './router';
import { plugin, defaultConfig } from '@formkit/vue'
import {de} from "@formkit/i18n";

import './assets/tailwind.css';

const pinia = createPinia();
pinia.use(piniaPluginPersistedState);
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(plugin, defaultConfig({
    // Define additional locales
    locales: { de },
    // Define the active locale
    locale: 'de',
}));

app.mount('#app');
