<template>
  <ul>
    <li v-for="(item, index) in menu" :key="'menu' + index" class="elli">
      <router-link :title="item.name" :class="{ 'router-link-active': item.path == 'orders' && !!cls }" :to="item.path">{{ item.name }}
      </router-link>
    </li>
  </ul>
</template>
<script lang="ts" setup>

const cls = false

const menu = [
  {
    name: "基本使用 ref  reactive computed watch",
    path: "demo"
  },

  {
    name: "组件通信 props emit refs mitt provide inject",
    path: "demo3"
  },

  {
    name: "axios 封装",
    path: "request"
  },


  {
    name: "store(pinia)",
    path: "store"
  },

]


</script>

<style scoped>
</style>
