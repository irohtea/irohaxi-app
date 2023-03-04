import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import Dialog from 'primevue/dialog';
// import { ValidationProvider } from 'vee-validate';

import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'


'./assets/style.scss'
createApp(App).use(store).use(router).mount('#app')
