<template>
  <div class="loginBox">
    <div class="pt60">
      <div class="tx">欢迎登录</div>
      <el-form :model="loginData" status-icon :rules="rules" ref="loginFormRef" label-width="70px" label-position="top"
        class="loginData">
        <el-form-item label="账号" prop="account">
          <el-input type="text" v-model="loginData.account"></el-input>
        </el-form-item>


        <el-form-item label="输入密码" prop="passwd">
          <el-input type="password" @keyup.enter.native="submitForm(loginFormRef)"
            v-model="loginData.passwd"></el-input>
        </el-form-item>

        <el-form-item label="验证码" prop="verifCode">
          <img :src="verifyCode" @click="getVerifyCodeFn" />

          <el-input v-model="loginData.verifyCode"></el-input>
          <el-button type="primary" @click="verifyCodeFn">验证码校验</el-button>
        </el-form-item>

        <el-form-item>
          <el-button @click="resetForm(loginFormRef)">重 置</el-button>
          <el-button type="primary" @click="submitForm(loginFormRef)">登 录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, getCurrentInstance, onMounted } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

import { getVerifyCodeApi, verifyCodeApi } from "@/api/auth"

import { useRoute, useRouter } from 'vue-router';

import { storeToRefs } from 'pinia';
import { useAuth } from '@/stores';

const verifyCode = ref<any>("")



const loginFormRef = ref<FormInstance>()
const loginData = reactive({
  account: '9725029@qq.com',
  passwd: 'mapei123',
  verifyCode: '',
})

const rules = reactive<FormRules>({
  account: [
    { required: true, message: '请输入正确的账号或名称', trigger: 'blur' }
  ],
  passwd: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
  ]
})

const arrayBufferToBase64 = (buffer: any) => {
  var binary = ''
  var bytes = new Uint8Array(buffer)
  var len = bytes.byteLength
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return window.btoa(binary)
}


const getVerifyCodeFn = () => {
  getVerifyCodeApi().then((res: any) => {
    // verifyCode.value = 'data:image/jpeg;base64,' + arrayBufferToBase64(res.data)
    verifyCode.value = res
  })
}
const verifyCodeFn = () => {
  verifyCodeApi({ "verifyCode": loginData.verifyCode }).then((res: any) => {
    // console.log(res)
  })
}



onMounted(() => {
  getVerifyCodeFn()
})



const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      loginFn()
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}


const storesAuth = useAuth();
const { user, access_token } = storeToRefs(storesAuth);
const route = useRoute();
const router = useRouter();
const { proxy } = getCurrentInstance() as any;
async function loginFn() {
  storesAuth.actionLogin(loginData).then((res: any) => {
    proxy.$message.success("登录成功")
    let redirect = route.query?.redirect || '/blog/post';
    router.push({
      path: redirect as any
    })
  }).catch(err => {
    proxy.$message.error("登录失败：" + JSON.stringify(err))
  })
}

</script>

<style scoped lang="scss">

</style>
