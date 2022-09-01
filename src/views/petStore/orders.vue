<template>
  <div class="articleBox fx-f1">

    <el-table class="articleList" :data="orderList2" border>
      <el-table-column prop="orderid" width="360" label="订单ID">
      </el-table-column>

      <el-table-column prop="amount" label="总价(￥)">
      </el-table-column>

      <el-table-column prop="orderdate" label="订单日期">
      </el-table-column>

      <el-table-column prop="status" label="状态">
        <template #default="scope">
          {{ statusFliter(scope.row.status) }}
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="text" @click="goOrdersDetails(scope.row.orderid)">查看</el-button>
          <el-button type="text" @click="deleteOrder(scope.row.orderid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination v-model:current-page="currentPage" :page-size="pageSize" layout="total, prev, pager, next"
      :total="orderList.length">
    </el-pagination>
  </div>
</template>
<script lang="ts" setup>

import { deleteOrderApi, getOrderListApi } from "@/api/shop"

import { getCurrentInstance, ref, reactive, onMounted, computed, nextTick } from 'vue'
import { useAuth } from "@/stores/auth"

const { proxy } = getCurrentInstance() as any

const storesAuth = useAuth()
const { user } = proxy.storeToRefs(storesAuth)

const orderList = ref([])
const currentPage = ref(1)
const pageSize = ref(5)

const orderList2 = computed(() => {
  let start = (currentPage.value - 1) * pageSize.value
  let end = currentPage.value * pageSize.value
  return orderList.value.slice(start, end)
})

const statusFliter = (val: number) => {
  if (val == 0) {
    return "未支付"
  } else if (val == 1) {
    return "已完成"
  } else if (val == 2) {
    return "已取消"
  }
}




const deleteOrder = (id: string) => {

  proxy.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {

    let obj = {
      "userid": user.value.id,
      "orderid": id
    }
    let loadingMask = proxy.$loading({
      lock: true,
      background: 'rgba(0, 0, 0, 0.5)'
    });
    deleteOrderApi(obj).then((data: any) => {
      if (!!data && data.resultCode === "20000") {
        getOrderList()
        proxy.$notify({
          message: '订单删除成功。',
          type: 'success'
        })
      } else {
        proxy.$notify({
          message: '订单删除失败。',
          type: 'warning'
        });
      }
    }).catch((err) => {
      proxy.$notify({
        message: '订单删除接口报错。',
        type: 'warning'
      });
    }).finally(() => {
      loadingMask.close()
    });

  }).catch(() => {
    proxy.$message({
      type: 'info',
      message: '已取消删除'
    });
  });
}


const goOrdersDetails = (id: string) => {
  proxy.$router.push({ path: 'ordersDetails', query: { orderid: id } })
}

const getOrderList = () => {
  let loadingMask = proxy.$loading({
    lock: true,
    background: 'rgba(0, 0, 0, 0.5)'
  });
  getOrderListApi(user.value.id).then((data: any) => {
    if (!!data && data.resultCode === "20000") {
      orderList.value = data.result
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
    loadingMask.close()
  });
}


onMounted(() => {
  getOrderList()
})



</script>
