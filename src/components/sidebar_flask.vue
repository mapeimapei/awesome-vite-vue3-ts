<template>
  <ul>
    <li v-for="(item, index) in menu" :key="'menu' + index" class="elli">
      <router-link 
        :title="item.name" 
        :to="item.path"
      >
        {{ item.name }}
      </router-link>
    </li>
  </ul>
</template>
<script setup>



const menu = [
  {
    name: "flask",
    path: "demo"
  },


]


</script>

<style scoped>
</style>
