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

