import { createApp } from 'vue';
import router from '@/router';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createPinia } from 'pinia';
import App from './App.vue';
import '@/assets/styles/main.scss';


createApp(App).use(createPinia()).use(router).mount('#app');
