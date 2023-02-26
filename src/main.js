import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vClickOutside from "click-outside-vue3"
// import PrimeVue from 'primevue/config';
// import { ValidationProvider } from 'vee-validate';
'./assets/style.scss'
createApp(App).use(store).use(router).use(vClickOutside).mount('#app')
