<template>
  <div style="background:#34eeee; width:200px; height:200px;">
    <div>C3</div>
    inject== >
    {{ info }}

    <button @click="changeFn">changeFn</button>
    <button @click="changeName('yyyyyyyyyyyyyy')">changeName</button>


  </div>
</template>

<script lang="ts" setup>
import { inject } from 'vue';


// 后代组件通过 inject 可以直接拿到父组件提供的信息
const info: any = inject('name')
const changeName: any = inject('changeName')



const changeFn = () => {
  info.name = "EEEEEEEEEEEEEEEEE"
}





</script>

<style scoped lang="scss">
</style>
