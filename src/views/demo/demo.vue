<template>
  <div class="p20">
    <div>
      <el-button @click="changeNameRef('ok')">changeNameRef</el-button>
      <div>ref ==> {{ nameRef }}</div>
      <div>baidu ==> {{ baidu }}</div>
    </div>

    <div>
      <el-button @click="changeNumRef">changeNumRef</el-button>
      <div>ref ==> {{ num }}</div>
      <div>num2 ==> {{ num2 }}</div>
      <div>num3 ==> {{ num3 }}</div>
    </div>


    <div>
      reactive
      <el-button @click="changeName('ddddddddd')">changeName</el-button>
      <div :style="{ color: (state.name == 'daitu' ? '#34eeee' : '#000') }">name ==> {{ state.name }}</div>
    </div>


    <div>
      <div style="background:#ccc">{{ obj }}</div>
      <el-button @click="setObj">setObj</el-button>
    </div>


    <div>
      <p>SVG 演示：</p>
      <svg-icon iconClass="bug" />

      <svg-icon iconClass="vue" />
    </div>




  </div>
</template>

<script lang="ts" setup>
import { Ref, ref, toRefs, reactive, onMounted, nextTick, computed, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { stores } from '@/stores';

import svgIcon from './svgIcon.vue';

const storesDemo = stores.useDemo();
const { str, arr, isOk, obj } = storeToRefs(storesDemo);

const nameRef: Ref = ref("nihao")
const num: Ref = ref(10)
const num3: Ref = ref(10)
const state = reactive({
  name: "daitu",
  sex: "men"
});


// 计算属性
const baidu = computed(() => {
  return nameRef.value + "____baidu"
});

// 计算属性
const num2 = computed(() => {
  return num.value + 200
});


const changeNameRef = (val: string) => {
  nameRef.value = nameRef.value + " " + val
}

const changeNumRef = () => {
  num.value += 2
}


// 打开弹窗
const changeName = (str: string) => {
  state.name = str;
};



// 注意： vue3.0监听器监听的数据对象，不能使用监听值得形式。
watch(
  () => state.name,
  (val) => {
    console.log("1111", val)
    setTimeout(() => {
      console.log("2222")
      // state.name = "daitu"
    }, 2000)
  },
  {
    //immediate: true,
  }
)


//ref的类型 可以监听 num 或者 改为 ()=> num.value
watch(
  num,
  () => {
    setTimeout(() => {
      num3.value = 200000
    }, 2000)
  }
)


const setObj = () => {
  let obj: any = {
    name: "11111111111",
    sex: "2222222222",
    age: 202222
  }
  storesDemo.setObj(obj)
}


watch(
  obj,
  (newVal, oldVal) => {
    console.log("storesDemo 改变了", JSON.stringify(newVal))
  },
  {
    //immediate: true,
    deep: true
  }
)



</script>

<style scoped lang="scss">

</style>
