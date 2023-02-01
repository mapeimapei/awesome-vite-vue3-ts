<template>
  <div class="p20">

    
    <div>str2 ==> {{ str2 }}</div>

    <div>str ==> {{ str }}</div>
    <div>num ==> {{ num }}</div>
    <div>arr ==> {{ arr }}</div>
    <div>isOk ==> {{ isOk }}</div>
    <div>obj ==> {{ obj }}</div>


    <div>getters str2 ==> {{ storesDemo.str2 }}</div>
   <div>getters str3 ==> {{ storesDemo.getStr3("————————你好") }}</div>

    <div class="btnCls fx fx-fdc">
      <el-button type="primary" @click="setIsOk">setIsOk</el-button>
      <el-button type="primary" @click="setStr">setStr</el-button>
      <el-button type="primary" @click="setObj">setObj</el-button>

      <el-button type="primary" @click="patchFn">批量修改</el-button>


      <el-button type="primary" @click="storesDemo.$reset()">reset</el-button>


      <el-button type="primary" @click="getApiDemoInfo">getApiDemoInfo</el-button>
      <el-button type="primary" @click="storesDemo.routerDemo">storesDemo.routerDemo</el-button>
      <el-button type="primary" @click="goPost('0016620310976427e68140e52ee41f799499a050fdd44ef000')">
        storesDemo.routerDemo2</el-button>

      <div v-show="isShow">该我出现了</div>

    </div>

  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, onMounted,ref } from 'vue';
import { storeToRefs } from 'pinia';
import pinia, { stores } from '@/stores';





import { DemoStates } from '@/stores/interface/index';


const { proxy } = getCurrentInstance() as any;

//教程 https://blog.csdn.net/m0_63470734/article/details/126997877
const storesDemo = stores.useDemo();
// 如果在接收pinia数据时，进行解构则不再是响应式数据，需要使用toRefs
// 如果使用 storesDemo.xxx 则不用toRefs
const { str, num, arr, isOk, obj } = storeToRefs(storesDemo);


const storesDemo2 = stores.useDemo2();
// 如果在接收pinia数据时，进行解构则不再是响应式数据，需要使用toRefs
// 如果使用 storesDemo.xxx 则不用toRefs
const { str2 } = storeToRefs(storesDemo2);


const isShow = ref(false)

// https://blog.csdn.net/qq_42543244/article/details/123461832
// vue3 Pinia对state的订阅监听（$subscribe）
const subscribe = storesDemo.$subscribe((mutation: any, state: { str: string; }) => {
      /*
      * mutation主要包含三个属性值：
      *   events：当前state改变的具体数据，包括改变前的值和改变后的值等等数据
      *   storeId：是当前store的id
      *   type：用于记录这次数据变化是通过什么途径，主要有三个分别是
      *         “direct” ：通过 action 变化的
                ”patch object“ ：通过 $patch 传递对象的方式改变的
                “patch function” ：通过 $patch 传递函数的方式改变的
      *
      * */
      // 我们就可以在此处监听store中值的变化，当变化为某个值的时候，去做一些业务操作之类的
      console.log(mutation)
      console.log(state)
      if (state.str === "收到广东省郭德纲") {
        isShow.value = true
      }else {
        isShow.value = false
      }
    }, {detached: false})  //第二个参数options对象，是各种配置参数
    //detached:布尔值，默认是 false，正常情况下，当订阅所在的组件被卸载时，订阅将被停止删除，
    // 如果设置detached值为 true 时，即使所在组件被卸载，订阅依然在生效
    //参数还有immediate，deep，flush等等参数 和vue3 watch的参数是一样的，多的就不介绍了，用到再看文档吧
    
    // 停止订阅
    // subscribe()  //调用上方声明的变量值，示例（subscribe），即可以停止订阅
    

const patchFn = () => {
    storesDemo.$patch(
      {
      str: "rewretertre",
      num: 101,
      arr: [1,2,3],
      isOk: false,
      obj: {
        name:"tttt",
        sex:"vvvvv",
        age:20
      }
    } as any
  )
}





// store 路由跳转
const goPost = (id: string) => {
  storesDemo.routerDemo2(id)

}


function setIsOk() {
  let aa: boolean = true
  storesDemo.setIsOk(aa)
}


function setStr() {
  let str: string = "收到广东省郭德纲"
  storesDemo.setStr(str)
}


function setObj() {
  let obj: any = {
    name: "11111111111",
    sex: "2222222222",
    age: 202222
  }
  storesDemo.setObj(obj)
}


async function getApiDemoInfo() {
  let obj: any = await storesDemo.getApiDemoInfo()
  storesDemo.setDemo(obj)
}



onMounted(() => {

  console.log("uuid", proxy.$uuid())

})


</script>

<style scoped lang="scss">

.btnCls button{ margin-top: 8px; margin-left: 0;}

</style>
