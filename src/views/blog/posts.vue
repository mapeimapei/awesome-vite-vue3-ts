<template>
  <div class="articleBox fx-f1">
    <el-table class="articleList" :data="articleList2" border>
      <el-table-column prop="name" label="标题">
      </el-table-column>

      <el-table-column prop="user_name" label="作者" width="180">
      </el-table-column>

      <el-table-column prop="created_at" label="创建时间" width="200">
        <template #default="scope">
          <span class="elli">{{ scope.row.created_at  }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button type="text" @click="deleFn(scope.row.id)">删除</el-button>
          <el-button type="text" @click="editFn(scope.row.id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="right"
      v-model:currentPage="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="articleList.length"
    />

  </div>
</template>
<script lang="ts" setup>
import { getPostsApi, deleteSingle } from "@/api/cms"

import { getCurrentInstance, ref, onMounted, computed } from 'vue'
import { storeToRefs } from "pinia";
import { useAuth} from '@/stores';

const storesAuth = useAuth()
const { user } = storeToRefs(storesAuth)

const { proxy } = getCurrentInstance() as any;


const articleList = ref([] as any)
const currentPage = ref(1)
const pageSize = ref(5)


// 计算属性
const articleList2 = computed(() => {
  let start = (currentPage.value - 1) * pageSize.value
  let end = currentPage.value * pageSize.value
  return articleList.value.slice(start, end)
});

const deleFn = (id: string) => {
  proxy.$confirm('确定是否删除?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {

    deletData(id)
  }).catch(() => {
    proxy.$message({
      type: 'info',
      message: '已取消删除'
    });
  });
}

const deletData = (id: string) => {
  let loadingMask = proxy.$loading({
    lock: true,
    background: 'rgba(0, 0, 0, 0.5)'
  });

  let obj = {
    "id": id,
    "user_id": user.value.id
  }
  deleteSingle(obj).then((data: any) => {
    if (!!data && data.resultCode === "20000") {
      getPosts()
    } else {
      proxy.$notify({
        message: '删除失败',
        type: 'warning'
      });
    }
  }).catch((err) => {
    loadingMask.close();
    proxy.$notify({
      message: '删除接口报错',
      type: 'warning'
    });
  }).finally(() => {
    loadingMask.close();
  });
}

const editFn = (id: string) => {
  proxy.$router.push({path: 'addSingle', query:{id: id}})
}

//初始化
const getPosts = () => {
  let loadingMask = proxy.$loading({
    lock: true,
    background: 'rgba(0, 0, 0, 0.5)'
  });
  getPostsApi().then((data: any) => {
    if (!!data && data.resultCode === "20000") {
      articleList.value = data.result
    } else {
      proxy.$notify({
        message: '获取文章列表失败。',
        type: 'warning'
      });
    }
  }).catch((err) => {
    proxy.$notify({
      message: '获取文章列表接口报错。',
      type: 'warning'
    });
  }).finally(() => {
    loadingMask.close();
  });
}

onMounted(() => {
  getPosts()
})
</script>

<style scoped lang="scss">
</style>
