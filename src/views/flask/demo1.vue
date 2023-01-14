<template>
  <div class="p20">

    <el-button type="primary" @click="blobDownloadFn">blobDownloadFn</el-button>




  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, reactive,useAttrs,getCurrentInstance, onMounted, nextTick, computed, watch } from 'vue';
import { postDownload } from "@/utils/common.js"
import { blobDownloadApi } from "@/api/flask"


const blobDownloadFn = ()=>{
  let params = {
    "fileName": "flask要做的工作_20230112162945_50.txt"
  }
  blobDownloadApi(params).then(res =>{
    postDownload(res)
  })
}








</script>

<style scoped lang="scss">




</style>
