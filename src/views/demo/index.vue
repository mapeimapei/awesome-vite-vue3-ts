<template>
	 <div>
    第二层路由（路由嵌套）
    <div class="fx fx-fdc nav">
      <router-link to="/demo/demo">基本使用 ref  reactive computed watch</router-link>
      <router-link to="/demo/demo3">组件通信 props emit refs mitt provide inject</router-link>
      <router-link to="/demo/request">axios 封装</router-link>
      <router-link to="/demo/store">store(pinia)</router-link>
    </div>


    
    <router-view />


   </div>
</template>

<script lang="ts" setup>

</script>

<style scoped lang="scss">

::v-deep .nav a{ margin-bottom:10px}

</style>
