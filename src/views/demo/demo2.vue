<template>
	 <div @click="log">{{ msg }}</div>
</template>

<script lang="ts" setup>

// 变量
const msg = 'Hello!2222222222'

// 函数
function log() {
  console.log(msg)
}



</script>

<style scoped lang="scss">
</style>
