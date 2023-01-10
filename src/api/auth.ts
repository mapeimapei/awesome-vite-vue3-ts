import request from '@/utils/request'

const PATH_PRE = '/api'

export function loginApi(data:any) {
  return request({
    url: `${PATH_PRE}/user/login`,
    method: 'post',
    headers: {
      isToken: false
    },
    data,
  })
}


export function getVerifyCodeApi() {
  return request({
    url: `${PATH_PRE}/test/get_verify_code`,
    method: 'get',
    // responseType: 'arraybuffer',

  })
}

export function verifyCodeApi(data:any) {
  return request({
    url: `${PATH_PRE}/test/verifyCode`,
    method: 'post',
    data
  })
}


