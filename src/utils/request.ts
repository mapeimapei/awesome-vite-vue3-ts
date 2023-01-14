import axios from 'axios'
import errorCode from '@/utils/errorCode'
import { obj2Param } from "@/utils/bomTools.js";
import { ElMessage, ElMessageBox } from 'element-plus';
import Base64 from '@/utils/Base64.js';

import pinia from '@/stores';
import { useAuth} from '@/stores';

const getToken = ()=>{
  const storesAuth = useAuth(pinia);
  let authorization = storesAuth.access_token
  return authorization
}

// 配置新建一个 axios 实例
const service = axios.create({
	baseURL: import.meta.env.VITE_API_URL as any,
	timeout: 600000,
	headers: {
    'XRequested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json;charset=UTF-8',
    'Cache-control': 'no-cache, no-store'
  }
});


// request拦截器
service.interceptors.request.use(config => {
  //console.log(config)
  // 是否需要设置 token
  const isToken = (config.headers || {}).isToken === false
  if (getToken() && !isToken) {
    Object.assign(<any>config.headers, { 'Authorization': getToken() })
    //(<any>config.headers)['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }

  // get请求映射data参数
  if (config.method === 'get' && config.data) {
    let url = config.url + '?' + obj2Param(config.data);
    url = url.slice(0, -1);
    config.data = {};
    config.url = url;
  }
  return config

}, error => {
  console.log(error)
  Promise.reject(error)
})


// 响应拦截器
service.interceptors.response.use(
  res => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 20000;
    // 获取错误信息
    const msg = errorCode[code] || res.data.msg || errorCode['default']
    // 二进制数据则直接返回
    if (res.request?.responseType === 'blob' || res.request?.responseType === 'arraybuffer') {
      return res
    }
    if (code === 401) {
      //Session.clear(); // 清除浏览器全部临时缓存
      ElMessageBox.alert('你已被登出，请重新登录', '提示', {})
      .then(() => {})
      .catch(() => {});
      return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
    } else if (code === 500) {

      ElMessage.error(msg)

      return Promise.reject(new Error(msg))
    } else if (code !== 20000) {
      ElMessage.error(msg)
      return Promise.reject('error')
    } else {
      return res.data
    }
  },

  error => {
    console.log(error)
    if (error && error.response) {
      // 获取错误信息
      const msg = errorCode[error.response.status] || errorCode['default']
      // if (error.response.status === 403 || error.response.status === '403') {
      //   ElMessage.error(msg)
      //   跳登陆
      // }
      switch (error.response.status) {
        case 400:
          error.message = `错误请求 ${error.response.status}`
          break;
        case 401:
          error.message = `未授权，请重新登录 ${error.response.status}`
          break;
        case 403:
          error.message = `拒绝访问 ${error.response.status}`
          break;
        case 404:
          error.message = `请求错误，未找到该资源 ${error.response.status}`
          break;
        case 405:
          error.message = `请求方法未允许 ${error.response.status}`
          break;
        case 408:
          error.message = `请求超时 ${error.response.status}`
          break;
        case 500:
          error.message = `服务器端出错 ${error.response.status}`
          break;
        case 501:
          error.message = `网络未实现 ${error.response.status}`
          break;
        case 502:
          error.message = `网络错误${error.response.status}`
          break;
        case 503:
          error.message = `服务不可用 ${error.response.status}`
          break;
        case 504:
          error.message = `网络超时 ${error.response.status}`
          break;
        case 505:
          error.message = `http 版本不支持请求 ${error.response.status}`
          break;
        default:
          error.message = `连接错误 ${error.response.status}`
      }
    } else {
      error.message = "连接到服务器失败"
    }

    ElMessage.error(error.message)
    return Promise.reject(error)
  }

)

export default service
