<template>
	 <div>
    <div>str ==> {{str}}</div>
    <div>num ==> {{num}}</div>
    <div>arr ==> {{arr}}</div>
    <div>isOk ==> {{isOk}}</div>
    <div>obj ==> {{obj}}</div>
   
    <el-button type="primary" @click="setIsOk">setIsOk</el-button>
    <el-button type="primary" @click="setStr">setStr</el-button>
    <el-button type="primary" @click="setObj">setObj</el-button>

    <el-button type="primary" @click="getApiDemoInfo">getApiDemoInfo</el-button>
   
   </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance,onMounted  } from 'vue';
import { storeToRefs } from 'pinia';
import { useDemo } from '@/stores/demo';
import { DemoStates } from '@/stores/interface/index';


const { proxy } = <any>getCurrentInstance();

const storesDemo = useDemo();
const { str,num,arr,isOk,obj } = storeToRefs(storesDemo);

function setIsOk(){
  let aa: boolean = true
  storesDemo.setIsOk(true)
}


function setStr(){
  let str: string = "收到广东省郭德纲"
  storesDemo.setStr()
}


function setObj(){
  let obj: any = {
			name:"11111111111",
			sex:"2222222222",
			age:202222
  }
  storesDemo.setObj(setObj)
}


async function getApiDemoInfo(){
  let obj:DemoStates = await storesDemo.getApiDemoInfo()
  storesDemo.setDemo(obj)
}



onMounted(() => {

  console.log("uuid",proxy.$uuid())

})


</script>

<style scoped lang="scss">
</style>
