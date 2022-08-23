import { createApp } from 'vue'
import './style.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import pinia from './stores/index'
import mitt from 'mitt'

import App from './App.vue'
import router from './router'


import {uuid} from './utils/common.js'


const app = createApp(App)

app.use(ElementPlus).use(router).use(pinia)
app.mount('#app')

app.config.globalProperties.mittBus = mitt()

app.config.globalProperties.$uuid = uuid