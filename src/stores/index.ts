// https://pinia.vuejs.org/
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist'
// 创建
const pinia = createPinia();
pinia.use(piniaPersist)

const modules = {}
const modulesFiles: any = import.meta.glob('./*/*.ts', { eager: true });

for (const [key, value] of Object.entries(modulesFiles)) {
    var moduleName = key.replace(/^\.\/(.*)\.\w+$/, '$1');
    let name = moduleName.split('/')[1]
    let _key = "use" + name.replace(name[0], name[0].toUpperCase())
    //具体的内容，都是每个js中返回值  value.default
    modules[_key] = modulesFiles[key][_key]
}
modules["pinia"] = pinia
// 导出
export const stores: any = modules
export default pinia




