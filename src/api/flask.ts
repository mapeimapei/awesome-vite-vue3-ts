import request from '@/utils/request'

const PATH_PRE = '/api/test'

// 获取文章列表
export function blobDownloadApi(data:any) {
  return request({
    url: `${PATH_PRE}/download2`,
    method: 'POST',
    responseType: 'blob',
    data:data
  })
}

