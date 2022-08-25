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

.fx{display: -webkit-flex;  display: -moz-flex; display: -ms-flex; display: flex;}
.fx-f0{-webkit-flex: 0; -moz-flex: 0; -ms-flex: 0; flex: 0; }
.fx-f1{-webkit-flex: 1; -moz-flex: 1; -ms-flex: 1; flex: 1; }
.fx-fdc{-webkit-flex-direction:column; -moz-flex-direction:column; -ms-flex-direction: column;flex-direction:column} /* 垂直排列 */
.fx-fdr{-webkit-flex-direction:row; -moz-flex-direction:row; -ms-flex-direction: row; flex-direction:row;}  /* 横向排列 */
.fx-aic{-webkit-align-items:center;-moz-align-items:center; -ms-align-items: center; align-items:center;}   /* 横向居中对齐 */
.fx-jcc{-webkit-justify-content:center;-moz-justify-content:center; -ms-justify-content: center; justify-content:center;} /* 垂直居中对齐 */
.fx-acs{align-content: space-around;-webkit-align-content:space-around; -ms-align-content: space-around;} /* 位于各行之前、之间、之后都留有空白的容器内 */
.fx-wp{flex-wrap:wrap;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap} /* 超出父元素 换行 */
.fx-jcs{justify-content:flex-start;-webkit-justify-content:flex-start;-ms-justify-content:flex-start;}  /* 头部对齐 */
.fx-srk{flex-shrink: 0;}
.fx-sk{flex-shrink: 0;}
</style>
