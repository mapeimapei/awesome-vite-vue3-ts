<template>
	 <div style="background:#fafafa; width:400px; height:400px; float:left">
      <div>C1</div>

      {{state.demo}}  

      {{num3}}

      <div>
        props==> {{props.name}} ==== {{props.sex}}
      
      </div>

      <div>
        emit==>
        
        <button @click="emitFn1">emitFn1</button>
      
      </div>


      <div>
      attrs 主要用于子组件获取父组件中没有通过 props 接收的属性。
        attr==> {{attrs.attr2}}
      {{attrs}}
      
      </div>


      <div>
        v-model == > 

        {{up1}}
         {{up2}}

        <button @click="upFn1">upFn1</button>
        <button @click="upFn2">upFn2</button>

      </div>
      
      <div>
      mittBus 
        <button @click="mittBusFn">mittBusFn</button>
      {{attrs}}
      
      </div>





   </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, reactive,useAttrs,getCurrentInstance, onMounted, nextTick, computed, watch } from 'vue';

const str = ref("demo")
const num3 = ref(10)
const state = reactive({
  demo:"demo"
});

const props = defineProps({
  name:String,
  sex:{
    type:String,
    default:"1111"
  },
  up1:{
    type:Number,
    default:0
  },

  up2:{
    type:String,
    default:""
  },

  
})

// 子组件通过emit更改父组件中的值
const emit = defineEmits(["c1ChangeName","up1","up2"])
const emitFn1 = ()=>{
  emit("c1ChangeName","c1组件修改了父组件中的值")
}

const upFn1 = ()=>{
  emit("update:up1",555555555) 
}

const upFn2 = ()=>{
  emit("update:up2","这个方法就是之前的sync")
}




const changeNum3 = (val:number)=>{

  num3.value = val 


}

//attrs 主要用于子组件获取父组件中没有通过 props 接收的属性。
const attrs = useAttrs();
console.log("attrs",JSON.stringify(attrs)); 
console.log("attrs",attrs.attr2); 

const  {proxy} = getCurrentInstance()

const mittBusFn = ()=>{

  proxy.$mittBus.emit('handleChange',"Vue3中已经没有了EventBus跨组件通信，替代方案mitt.js，但原理方式EventBus是一样的")


}












defineExpose({
  changeNum3,
  str
  
})









</script>

<style scoped lang="scss">




</style>
