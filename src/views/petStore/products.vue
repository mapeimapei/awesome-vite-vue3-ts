<template>
	<div class="articleBox fx-f1">
		<el-table
      class="articleList"
      :data="productList2"
      border>
		<el-table-column
      label="图片"
      width="72">
      <template #default="scope">
        <div class="productIcon"><img :src="srcUrl + scope.row.image" sizes="48" /></div>
      </template>
    </el-table-column>

    <el-table-column
      prop="cname"
      label="名称">
    </el-table-column>

    <el-table-column
      prop="category"
      label="分类">
    </el-table-column>

    <el-table-column
      prop="listprice"
      label="单价(￥)">
    </el-table-column>

    <el-table-column
      prop="descn"
      label="描述">
    </el-table-column>

    <el-table-column
      label="数量">
      <template #default="scope">
        <el-input-number :min="1" v-model="scope.row.quantity"  size="small" label="描述文字"></el-input-number>
      </template>
    </el-table-column>
		<el-table-column
      label="操作">
      <template #default="scope">
        <el-button type="text" @click="makeOrderFn(scope.row)">直接购买</el-button>
        <el-button type="text" @click="addShoppingCart(scope.row)">加入购物车</el-button>
      </template>
    </el-table-column>


  </el-table>


  <el-pagination
    class="right"
  	v-model:current-page="currentPage"
  	:page-size="pageSize"
  	layout="total, prev, pager, next"
  	:total="productList.length">
  </el-pagination>

	</div>
</template>
<script lang="ts" setup>
import { getProductsApi,addOrderApi,addCartApi } from "@/api/shop"
import { getCurrentInstance, ref, onMounted, computed } from 'vue'
import { useAuth } from "@/stores/auth"

const { proxy } = getCurrentInstance() as any;
const storesAuth = useAuth()
const { user } = proxy.storeToRefs(storesAuth)


const productList = ref([] as any)
const currentPage = ref(1)
const pageSize = ref(5)



const dev = process.env.NODE_ENV != 'production' ? true : false
const srcUrl = computed(()=>{
  //return "http://localhost:9000/static/resources/images/"
  return dev ? "http://localhost:9000/static/resources/images/" : "/static/resources/images/"
})


// 计算属性
const productList2 = computed(() => {
  let start = (currentPage.value - 1) * pageSize.value
  let end = currentPage.value * pageSize.value
  return productList.value.slice(start, end)
});


// 直接购买
const makeOrderFn = (row:any) => {
    let obj = {
        "userid":user.value.id,
        "productList":[row]
      }
      let loadingMask = proxy.$loading({
        lock: true,
        background: 'rgba(0, 0, 0, 0.5)'
      });
      addOrderApi(obj).then((data:any) => {
        if(!!data && data.resultCode ==="20000"){
          proxy.$notify({
            message: '订单生成成功。',
            type: 'success'
          })
          proxy.$router.push({path: 'ordersDetails', query:{orderid: data.result.orderid}})
        }else{
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
      }).finally(()=>{
        loadingMask.close();
      });

}
// 加入购物车
const addShoppingCart = (row:any) => {
  let obj = {
        "productid":row.productid,
        "quantity":row.quantity,
        "userid":user.value.id
      }
      console.log(obj)
      let loadingMask = proxy.$loading({
        lock: true,
        background: 'rgba(0, 0, 0, 0.5)'
      });
      addCartApi(obj).then((data:any) => {
        if(!!data && data.resultCode ==="20000"){
          proxy.$notify({
            message: '添加成功。',
            type: 'success'
          })
        }else{
          proxy.$notify({
            message: '添加失败。',
            type: 'warning'
          });
        }
      }).catch((err) => {
        proxy.$notify({
          message: '添加接口报错。',
          type: 'warning'
        });
      }).finally(()=>{
        loadingMask.close();
      });
}

//初始化
const getProducts = () => {
  let loadingMask = proxy.$loading({
    lock: true,
    background: 'rgba(0, 0, 0, 0.5)'
  });
  getProductsApi().then((data: any) => {
    if (!!data && data.resultCode === "20000") {
      data.result.forEach((item:any,index:number)=>{
        //item.image = item.image.replace(/\./, "_")
        item.quantity = 1
      })
      productList.value = data.result
    } else {
      proxy.$notify({
        message: '获取商品列表失败',
        type: 'warning'
      });
    }
  }).catch((err) => {
    proxy.$notify({
      message: '获取商品表接口报错',
      type: 'warning'
    });
  }).finally(() => {
    loadingMask.close();
  });
}

onMounted(() => {
  getProducts()
})


</script>

<style scoped>

</style>
