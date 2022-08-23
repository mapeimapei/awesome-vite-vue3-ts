import request from '@/utils/request'

const PATH_PRE = '/api/cms/post'

export function getPostsApi() {
  return request({
    url: `${PATH_PRE}/getPosts`,
    method: 'get'
  })
}

