<template>
	 <div>
    第二层路由（路由嵌套）
    <div class="fx fx-fdc nav">
      <router-link to="/demo/demo">基本使用 ref  reactive computed watch</router-link>
      <router-link to="/demo/demo3">组件通信 props emit refs mitt provide inject</router-link>
      <router-link to="/demo/request">axios 封装</router-link>
      <router-link to="/demo/store">store(pinia)</router-link>
    </div>


    
    <router-view />


   </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, reactive, onMounted, nextTick, computed, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useDemo } from '@/stores/demo';
const storesDemo = useDemo();
const { str,arr,isOk,obj } = storeToRefs(storesDemo);

const nameRef = ref("nihao")
const num = ref(10)
const num3 = ref(10)
const state = reactive({
  name:"daitu",
  sex:"men"
});


// 计算属性
const baidu = computed(() => {
  return nameRef.value + "____baidu"
});

// 计算属性
const num2 = computed(() => {
  return num.value + 200
});


const changeNameRef = (val:string)=>{
  nameRef.value = nameRef.value +" " + val
}

const changeNumRef =()=>{
  num.value+=2
}


// 打开弹窗
const changeName = (str: string) => {
  state.name = str;
};



// 注意： vue3.0监听器监听的数据对象，不能使用监听值得形式。
watch(
  ()=>state.name,
  (val) => {
    console.log("1111",val)
    setTimeout(()=>{
      console.log("2222")
      state.name = "daitu"
    },2000)
  },
  {
    //immediate: true,
  }
)


//ref的类型 可以监听 num 或者 改为 ()=> num.value
watch(
  num,  
  () => {
    setTimeout(()=>{
      num3.value = 200000
    },2000)
  }
)


const setObj =()=>{
  let obj: any = {
			name:"11111111111",
			sex:"2222222222",
			age:202222
  }
  storesDemo.setObj(obj)
}


watch(
  obj,
  (newVal,oldVal) => {
    console.log("storesDemo 改变了",JSON.stringify(newVal))
  },
  {
    //immediate: true,
    deep:true
  }
)



</script>

<style scoped lang="scss">

::v-deep .nav a{ margin-bottom:10px}

</style>
