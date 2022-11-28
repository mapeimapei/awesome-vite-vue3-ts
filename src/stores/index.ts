// https://pinia.vuejs.org/
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist'
// 创建
const pinia = createPinia();
pinia.use(piniaPersist)
// 导出
export default pinia
export * from './auth'
export * from './demo'

