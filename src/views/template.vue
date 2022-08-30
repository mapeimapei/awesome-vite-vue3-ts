<template>
<div id="wrapper" class="fx fx-fdc">
  <cHeader></cHeader>
	<div id="container" class="fx fx-f1">
    <aside class="aside fx-srk">
      <router-view name="sidebar"></router-view>
    </aside>
		<div class="container fx fx-f1 fx-srk">
      <router-view />
		</div>
	</div>
</div><!--app end-->

</template>

<script lang="ts" setup>
import cHeader from '@/components/header.vue';
</script>

<style scoped lang="scss">
</style>
