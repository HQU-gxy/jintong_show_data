import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhLocale from 'element-plus/es/locale/lang/zh-cn'

import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'

const pinia = createPinia()

createApp(App).use(pinia).use(ElementPlus, { locale: zhLocale }).mount('#app')
