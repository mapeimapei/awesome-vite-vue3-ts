<template>

  <div class="p20">
    <div>user ==> {{ user }}</div>
    <div>token ==> {{ token }}</div>
    <el-button @click="loginFn" type="primary">loginFn</el-button>
    <el-button @click="getPostsFn" type="primary">getPostsFn</el-button>


    <div> postlist ==> {{ state.postlist }}</div>

  </div>

</template>

<script lang="ts" setup>
import { ref, toRefs, reactive, onMounted, nextTick, computed, watch } from 'vue';

import { loginApi } from "@/api/auth"

import { getPostsApi } from "@/api/cms"

import { storeToRefs } from 'pinia';
import { useAuth } from '@/stores';
const storesAuth = useAuth();
const { user, token } = storeToRefs(storesAuth);



const state = reactive({
  loginData: {
    account: '9725029@qq.com',
    passwd: 'mapei123',
  },
  postlist: []


})

const loginFn = () => {
  storesAuth.actionLogin(state.loginData).then((res: any) => {
    console.log(res.result)
  }).catch((err) => {
    console.log(err)
  })
}


const getPostsFn = () => {
  getPostsApi().then((res: any) => {
    console.log(res)
    state.postlist = res.result
  }).catch((err) => {
    console.log(err)
  })
}





</script>

<style scoped lang="scss">
</style>
