import request from '@/utils/request'

const PATH_PRE = '/api/shop'

// 获取文章列表
export function getProductsApi() {
  return request({
    url: `${PATH_PRE}/products`,
    method: 'get'
  })
}



// 加入购物车
export function addCartApi(data:any) {
  return request({
    url: `${PATH_PRE}/cart/addCart`,
    method: 'post',
    data
  })
}


// 拉取购物车列表
export function getCartListApi(user_id:String) {
  return request({
    url: `${PATH_PRE}/cart/getCartList/${user_id}`,
    method: 'get',
  })
}

// 删除购物车
export function deleteCartApi(data:any) {
  return request({
    url: `${PATH_PRE}/cart/deleteCart`,
    method: 'post',
    data
  })
}


// 直接购买
export function addOrderApi(data:any) {
  return request({
    url: `${PATH_PRE}/order/addOrder`,
    method: 'post',
    data
  })
}


// 删除订单
export function deleteOrderApi(data:any) {
  return request({
    url: `${PATH_PRE}/order/deleteOrder`,
    method: 'post',
    data
  })
}

// 拉取订单列表
export function getOrderListApi(user_id:string) {
  return request({
    url: `${PATH_PRE}/order/getOrderList/${user_id}`,
    method: 'get',
  })
}


// 删除订单
export function deleteProductInOrderDetailsApi(data:any) {
  return request({
    url: `${PATH_PRE}/order/deleteProductInOrderDetails`,
    method: 'post',
    data
  })
}


// 根据用户id获取订单列表 
export function getOrdersDetailsByIdApi(data:any) {
  return request({
    url: `${PATH_PRE}/order/getOrdersDetailsById`,
    method: 'post',
    data
  })
}
