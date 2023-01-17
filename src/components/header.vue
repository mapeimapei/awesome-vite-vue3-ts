<template>
	<header class="fx fx-aic fx-srk header">
		<div class="logo">后台管理</div>
		<nav class="fx-f1">
			<ul class="fx fx-aic">
				<li><a href="/">网站首页</a></li>
				<li>
					<router-link to="/blog">博客</router-link>
				</li>
				<li>
					<router-link to="/petStore">宠物商店</router-link>
				</li>
				<li>
					<router-link to="/demo">vue3基础DEMO</router-link>
				</li>

				<li>
					<router-link to="/flask">flask</router-link>
				</li>

			</ul>
		</nav>
		<div class="personalCenter" v-if="user">
			<a href="javascript:">{{ user.name }}</a>
			<a class="t12" href="javascript:" @click="logout">登出</a>
		</div>
	</header>
</template>

<script lang="ts" setup>
import { getCurrentInstance, nextTick } from 'vue'
import { storeToRefs } from 'pinia';
import { useAuth } from '@/stores';

const storesAuth = useAuth();
const { user } = storeToRefs(storesAuth);
const { proxy } = getCurrentInstance() as any;

//登出
const logout = () => {
	proxy.$confirm('确定登出, 是否继续?', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning'
	}).then(() => {
		storesAuth.actionLogout().then(() => {
			// 跳登录页面
			proxy.$router.replace("/login")
		})
	})
}


</script>

<style scoped lang="scss">

</style>
