<template>
<div>组件通信</div>
      <div>
        emit ==> {{nameRef}}
      </div>

      <div>
        proxy : {{str11}}
        <button @click="change1">change1</button>
      </div>

      <div>
        provide ==> {{state.name}}
      </div>


	 <div class="box">
      <c1 
        ref = "cc1"
        :name="state.name" 
        :sex="state.sex"
        attr1="11111"
        attr2="22222"
        :attr3="state"
        v-model:up1 = "state.up1"
        v-model:up2 = "state.upup"
        @c1ChangeName = "changeName"
      >
      </c1>



      <c2 :num="num3"></c2>
   </div>
</template>

<script lang="ts" setup>
import c1 from "./demo3-c1.vue"
import c2 from "./demo3-c2.vue"


import {Ref, ref, toRefs, reactive, onMounted, getCurrentInstance, nextTick, computed, watch, provide } from 'vue';

const {proxy} = getCurrentInstance() as any
  

const nameRef:Ref = ref("nihao")
const num:Ref = ref(10)
const num3:Ref = ref(10)
const state = reactive<any>({
  name:"daitu",
  sex:"men",
  up1:222,
  upup:"eeee",
});



const changeName = (val:Ref)=>{
  nameRef.value = val
}

const str11 = ref("str11")
const change1 = ()=>{
  proxy.$refs["cc1"].changeNum3("通过ref直接执行子组件中的方法")
  str11.value = proxy.$refs["cc1"].str

}



provide("name", state); //传值
provide("changeName", changeName); //传方法



</script>






<style scoped lang="scss">
.box{ width:850px; padding:20px; height:400px; background:#ccc; }
::v-deep button{ border:1px solid #dedede}
</style>
