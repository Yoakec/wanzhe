// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './rounter'
import http from './http'

const app = createApp(App)

app.config.globalProperties.$http = http
app.use(router)
app.use(ElementPlus)

app.mount('#app')