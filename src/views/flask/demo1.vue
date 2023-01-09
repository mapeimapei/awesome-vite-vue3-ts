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
    "fileName": "强者是这样精进人生的_20230109103941_43.jpg"
  }
  blobDownloadApi(params).then(res =>{
    postDownload(res)
  })
}








</script>

<style scoped lang="scss">




</style>
