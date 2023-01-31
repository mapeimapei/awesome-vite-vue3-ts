// https://pinia.vuejs.org/
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist'
// 创建
const pinia = createPinia();
pinia.use(piniaPersist)
// 导出
export default pinia


const utilFuns: any = {};
const modulesFiles = import.meta.glob('./modules/*.ts',{ eager: true });
// Object.keys(modules).forEach((fileName: any) => {
//     const pathname = fileName.split('/').pop().split('.ts')[0];
//     console.log("pathname", pathname)
//     utilFuns["use" + pathname] = modules[fileName]
// })

let modules = {}
for (const [key, value] of Object.entries(modulesFiles)) {
    //名称  因为这里拿到的是  ./modules/app.js ，所以需要两层处理
  var moduleName = key.replace(/^\.\/(.*)\.\w+$/, '$1');
  const name = moduleName.split('/')[1]
  
  //具体的内容，都是每个js中返回值  value.default
  modules[name] = modulesFiles[key].default
}

modules["pinia"] = pinia


console.log("modules", modules)


export const store: any = modules


export * from './auth'
// export * from './demo'
export * from './demo2'



