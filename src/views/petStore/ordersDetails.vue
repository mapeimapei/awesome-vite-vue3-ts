<template>
  <div class="state-lcol fx-f1">
    <div class="state-txt fx">
      <div class="fx-f1">
        <div class="state-top">订单号：{{ orderid }}</div>
        <h3 class="state-txt ftx-02">{{ statusFliter(status) }}</h3>
      </div>

      <div class="dl fx-f1">
        <div class="dt">
          <h4>收货人信息</h4>
        </div>
        <div class="dd">
          <div class="item">
            <span class="label">收货人：</span>
            <div class="info-rcol">{{ user.name }}</div>
          </div>
          <div class="item">
            <span class="label">地址：</span>
            <div class="info-rcol">{{ user.address }}</div>
          </div>
          <div class="item">
            <span class="label">手机号码：</span>
            <div class="info-rcol">{{ user.tel }}</div>
          </div>
        </div>
      </div>

    </div>




    <div class="orderList">
        <el-table :data="orderList" border style="width: 100%">
          <el-table-column prop="cname" label="商品名称">
          </el-table-column>
          <el-table-column prop="productid" label="商品编号" width="180">
          </el-table-column>

          <el-table-column prop="listprice" label="价格" width="180">
          </el-table-column>
          <el-table-column prop="quantity" label="数量" width="180">
          </el-table-column>
          <el-table-column label="总价(￥)">
            <template #default="scope">
              {{ scope.row.listprice * scope.row.quantity }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button @click="deleteRow(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
    </div>

    <!-- 支付总额 -->
    <div class="goods-total clx">
      <ul>
        <li>
          <span class="label">付款方式：</span>
          <span class="txt">在线支付</span>
        </li>
        <li class="hide">
          <span class="label">付款时间：</span>
          <span class="txt"></span>
        </li>
        <li>
          <span class="label">商品总额：</span>
          <span class="txt">¥{{ amount }}</span>
        </li>
        <li class="ftx-01">
          <span class="label">应付总额：</span>
          <span class="txt count">¥{{ amount }}</span>
        </li>

        <li class="btn">
          <el-row>
            <el-button type="danger">确认支付</el-button>
          </el-row>
        </li>
      </ul>
    </div>
    <!--goods-total end-->
  </div>
</template>
<script lang="ts" setup>

import { deleteProductInOrderDetailsApi, getOrdersDetailsByIdApi } from "@/api/shop"

import { useRoute } from 'vue-router'
import { getCurrentInstance, ref, reactive, onMounted, nextTick, computed } from 'vue'
import { useAuth } from '@/stores/auth'
const { proxy } = getCurrentInstance() as any
const storesAuth = useAuth()
const { user } = proxy.storeToRefs(storesAuth)

// 第一种获取路由传参
//const route = useRoute();
//const orderid = route.query.orderid

// 第二种获取路由传参
const orderid = proxy.$router.currentRoute.value.query.orderid


const orderList= ref([] as any[])
const status = ref(null)
const amount = ref(0)

const statusFliter = (val: any) => {
  if (val == 0) {
    return "未支付"
  } else if (val == 1) {
    return "已完成"
  } else if (val == 2) {
    return "已取消"
  }
}





const deleteRow = (obj: any) => {
  let _obj = {
    "userid": user.value.id,
    "orderid": obj.orderid,
    "productid": obj.productid,
  }


  let loadingMask = proxy.$loading({
    lock: true,
    background: 'rgba(0, 0, 0, 0.5)'
  });

  deleteProductInOrderDetailsApi(_obj).then((data: any) => {
    if (!!data && data.resultCode === "20000") {
      getOrdersDetailsById()
      proxy.$notify({
        message: '删除成功。',
        type: 'success'
      })
    } else {
      proxy.$notify({
        message: '删除失败。',
        type: 'warning'
      });
    }
  }).catch((err) => {
    proxy.$notify({
      message: '删除接口报错。',
      type: 'warning'
    });
  }).finally(() => {
    loadingMask.close();
  });


}

const getOrdersDetailsById = () => {
  let loadingMask = proxy.$loading({
    lock: true,
    background: 'rgba(0, 0, 0, 0.5)'
  });

  let obj = {
    "orderid": orderid,
    "userid": user.value.id
  }

  getOrdersDetailsByIdApi(obj).then((data: any) => {
    loadingMask.close();
    if (!!data && data.resultCode === "20000") {
      orderList.value = data.result.orderlist
      amount.value = data.result.amount
      status.value = orderList.value.length ? orderList.value[0].status : null
    } else {
      proxy.$notify({
        message: '获取订单列表失败。',
        type: 'warning'
      });
    }
  }).catch((err) => {
    proxy.$notify({
      message: '订单列表接口报错。',
      type: 'warning'
    });
  }).finally(() => {
    loadingMask.close();
  });

}

onMounted(() => {

  getOrdersDetailsById()
})




</script>
