<template>
  <ul>
    <li v-for="(item, index) in menu" :key="'menu' + index">
      <router-link :to="item.path">{{ item.name }}</router-link>
    </li>
  </ul>
</template>

<script lang="ts" setup>
const menu = [
  {
    name: "文章列表",
    path: "posts"
  },
  {
    name: "添加&编辑文章",
    path: "addSingle"
  },
  {
    name: "网络爬虫",
    path: "spider"
  }
]

</script>

<style scoped lang="scss">
</style>



