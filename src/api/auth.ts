import request from '@/utils/request'

const PATH_PRE = '/api/user'

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


export function refreshTokenApi(data: any, headers: any) {
  return request({
    url: `${PATH_PRE}/refresh_token`,
    method: 'post',
    data,
    headers,
  })
}




export function getVerifyCodeApi() {
  return request({
    url: `${PATH_PRE}/get_verify_code`,
    method: 'get',
  })
}

export function verifyCodeApi(data: any) {
  return request({
    url: `${PATH_PRE}/verifyCode`,
    method: 'post',
    data
  })
}


