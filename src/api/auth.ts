import request from '@/utils/request'

const PATH_PRE = '/api/user'

// 登录
export function loginApi(data: any) {
  return request({
    url: `${PATH_PRE}/login`,
    method: 'post',
    headers: {
      isToken: false
    },
    data,
  })
}

// 刷新token
export function refreshTokenApi(data: any, headers: any) {
  return request({
    url: `${PATH_PRE}/refresh_token`,
    method: 'post',
    data,
    headers,
  })
}

// 获取验证码
export function getVerifyCodeApi() {
  return request({
    url: `${PATH_PRE}/get_verify_code`,
    method: 'get',
  })
}

// 验证验证码 （调试使用）
export function verifyCodeApi(data: any) {
  return request({
    url: `${PATH_PRE}/verifyCode`,
    method: 'post',
    data
  })
}

// 登录
export function logoutApi(data: any) {
  return request({
    url: `${PATH_PRE}/logout`,
    method: 'post',
    data,
  })
}

