<template>
	 <div style="background:#fafafa; width:400px; height:400px; float:right">
      <div>C2</div>

      props ==> {{props.num}}


      <div>mitt === > {{aaRef}}</div>

   </div>
</template>

<script lang="ts" setup>
import { ref, toRefs,getCurrentInstance, reactive, onMounted,onUnmounted, nextTick, computed, watch } from 'vue';

const aaRef = ref("")


const props = defineProps({

    num:{
      type:String,
      default:""
    }


})

const  {proxy} = getCurrentInstance()


const someMethod =(val)=>{
  aaRef.value = val
}


proxy.$mittBus.on('handleChange',someMethod)

onUnmounted(()=>{

    proxy.$mittBus.off('handleChange',someMethod)

})




</script>

<style scoped lang="scss">
</style>
