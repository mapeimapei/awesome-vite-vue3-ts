<template>
  <div class="articleBox fx-f1">

    <div class="mb20 clx">
      <el-button type="primary" @click="makeOrderFn" :disabled="!multipleSelection.length">提交订单</el-button>
      <el-button type="primary" @click="deleteFn(productids)" :disabled="!multipleSelection.length">删除选中的商品</el-button>
      <el-button class="right" @click="deleteFn('clear')" :disabled="!cartList.length" type="primary">清空购物车</el-button>
    </div>

    <el-table class="articleList" :data="cartList2" :key="rowKeys" :row-key="getRowKeys"
      @selection-change="handleSelectionChange" border>
      <el-table-column type="selection" :reserve-selection="true" width="55">
      </el-table-column>
      <el-table-column label="图片" width="72">
        <template #default="scope">
          <div class="productIcon"><img :src="srcUrl + scope.row.image" sizes="48" /></div>
        </template>
      </el-table-column>

      <el-table-column prop="cname" label="名称">
      </el-table-column>

      <el-table-column prop="category" label="分类">
      </el-table-column>

      <el-table-column prop="descn" label="描述">
      </el-table-column>

      <el-table-column prop="listprice" label="单价(￥)">
      </el-table-column>

      <el-table-column label="数量">
        <template #default="scope">
          <el-input-number :min="1" v-model="scope.row.quantity" size="small" label="描述文字"></el-input-number>
        </template>
      </el-table-column>

      <el-table-column label="总价(￥)">
        <template #default="scope">
          {{ scope.row.listprice * scope.row.quantity }}
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template #default="scope">
          <el-button link type="primary" @click="deleteFn([scope.row.productid])">删除</el-button>
        </template>
      </el-table-column>

    </el-table>

    <!-- 分页 -->
    <el-pagination 
      @size-change="handleSizeChange" 
      @current-change="handleCurrentChange" 
      v-model:current-page="currentPage" 
      :page-size="pageSize" 
      layout="total, prev, pager, next"
      :total="cartList.length"
    >
    </el-pagination>

  </div>
</template>
<script lang="ts" setup>

import { getCartListApi, deleteCartApi, addOrderApi } from "@/api/shop"
import { uuid } from "@/utils/common.js"

import { getCurrentInstance, ref, reactive, onMounted, nextTick, computed } from 'vue'
import { stores } from '@/stores'
const { proxy } = getCurrentInstance() as any
const storesAuth = stores.useAuth()
const { user } = proxy.storeToRefs(storesAuth)



const cartList = ref([])
const multipleSelection = ref<any[]>([])
const productids = ref([] as any[])
const currentPage = ref(1)
const pageSize = ref(5)
const cartList2 = ref([])
const rowKeys = ref('')


const dev = process.env.NODE_ENV != 'production' ? true : false
const srcUrl = computed(() => {
  return dev ? "/resStatic/static/resources/images/" : "/static/resources/images/"
})



const getRowKeys = (row: any) => {
  return row.productid
}

const sliceFn = () => {
  let start = (currentPage.value - 1) * pageSize.value
  let end = currentPage.value * pageSize.value
  cartList2.value = cartList.value.slice(start, end)
}

//分页
const handleSizeChange = (val: string) => {
  console.log(`每页 ${val} 条`);
  sliceFn()

}
const handleCurrentChange = (val: string) => {
  console.log(`当前页: ${val}`);
  sliceFn()
}

const handleSelectionChange = (val: any) => {
  multipleSelection.value = val
  console.log(val)
  productids.value = []
  multipleSelection.value.forEach((item: any) => {
    productids.value.push(item.productid)
  })
}

const makeOrderFn = () => {
  let obj = {
    "userid": user.value.id,
    "productList": [...multipleSelection.value]
  }

  let apiUrl = "shop/order/addOrder"
  let loadingMask = proxy.$loading({
    lock: true,
    background: 'rgba(0, 0, 0, 0.5)'
  });

  addOrderApi(obj).then((data: any) => {
    if (!!data && data.resultCode === "20000") {
      proxy.$notify({
        message: '订单生成成功。',
        type: 'success'
      })
      proxy.$router.push({ path: 'ordersDetails', query: { orderid: data.result.orderid } })
    } else {
      proxy.$notify({
        message: '订单生成失败。',
        type: 'warning'
      });
    }
  }).catch((err) => {
    proxy.$notify({
      message: '订单生成接口报错。',
      type: 'warning'
    });
  }).finally(() => {
    loadingMask.close();
  });

}




//删除
const deleteFn = (productids: any) => {
  proxy.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    let obj = {
      "productids": [...productids],
      "userid": user.value.id
    }
    //清空
    if (productids === "clear") {
      obj.productids = []
      cartList.value.forEach((item: any) => {
        obj.productids.push(item.productid)
      })
    }

    let loadingMask = proxy.$loading({
      lock: true,
      background: 'rgba(0, 0, 0, 0.5)'
    });
    deleteCartApi(obj).then((data: any) => {

      if (!!data && data.resultCode === "20000") {
        getCartList()
        multipleSelection.value = []
        productids.value = []
        rowKeys.value = uuid()
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

  }).catch(() => {
    proxy.$message({
      type: 'info',
      message: '已取消删除'
    });
  })
}



const getCartList = () => {
  let loadingMask = proxy.$loading({
    lock: true,
    background: 'rgba(0, 0, 0, 0.5)'
  });
  getCartListApi(user.value.id).then((data: any) => {
    if (!!data && data.resultCode === "20000") {
      // data.result.forEach((item,index)=>{
      //   item.image = item.image.replace(/\./, "_")
      // })
      cartList.value = data.result
      if (cartList.value.length < 5) {
        currentPage.value = 1
      }

      nextTick(() => {
        sliceFn()
      })

    } else {
      proxy.$notify({
        message: '获取购物车列表失败。',
        type: 'warning'
      });
    }
  }).catch((err) => {

    proxy.$notify({
      message: '获取购物车列表接口报错。',
      type: 'warning'
    });
  }).finally(() => {
    loadingMask.close();
  });
}

onMounted(() => {
  getCartList()
})



</script>
