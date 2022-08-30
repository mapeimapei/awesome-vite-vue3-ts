import request from '@/utils/request'

const PATH_PRE = '/api/cms/post'

// 获取文章列表
export function getPostsApi() {
  return request({
    url: `${PATH_PRE}/getPosts`,
    method: 'get'
  })
}


// 删除文章
export function deleteSingle(data:any) {
  return request({
    url: `${PATH_PRE}/deleteSingle`,
    method: 'post',
    data:data
  })
}


// 获取文章列表
export function getSingleById(postId:any) {
  return request({
    url: `${PATH_PRE}/getSingleById/${postId}`,
    method: 'get'
  })
}

// 添加文章
export function addSingle(data:any) {
  return request({
    url: `${PATH_PRE}/addSingle`,
    method: 'post',
    data:data
  })
}




