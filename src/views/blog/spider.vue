<template>
  <div class="articleBox fx-f1">
    <el-button type="primary" @click="startSpider">启动网络爬虫</el-button>
    <p class="t18 mt20">{{ done }}</p>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import axios from 'axios'
import { ElLoading } from 'element-plus'
const done = ref('')
const startSpider = () => {
  let apiUrl = "api/spider/startSpider"
  let loadingMask = ElLoading.service({
    lock: true,
    background: 'rgba(0, 0, 0, 0.5)'
  });
  axios.post(apiUrl).then((res: any) => {
    if (!!res.data && res.data.resultCode === "20000") {
      done.value = res.data.message
    }
  }).catch((err) => {
    console.log("err", err)
  }).finally(() => {
    loadingMask.close();
  });
}
</script>
