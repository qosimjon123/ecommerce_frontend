// src/main.ts
import { computed, createApp, watch } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { AnonymousStore } from './stores/anonymouse'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import './assets/scss/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toast, {
  transition: 'Vue-Toastification__bounce',
  maxToasts: 3,
  newestOnTop: true,
})

const anonymousStore = AnonymousStore()

anonymousStore.generateAnonymousId()

app.mount('#app')
