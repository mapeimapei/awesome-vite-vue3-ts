<template>
  <ul>
    <li v-for="(item, index) in menu" :key="'menu' + index">
      <router-link :class="{ 'router-link-active': item.path == 'orders' && !!cls }" :to="item.path">{{ item.name }}
      </router-link>
    </li>
  </ul>
</template>
<script setup>

const cls = false

const menu = [
  {
    name: "商品中心",
    path: "products"
  },
  {
    name: "购物车",
    path: "cart"
  },
  {
    name: "订单中心",
    path: "orders"
  }
]


</script>

<style scoped>
</style>
