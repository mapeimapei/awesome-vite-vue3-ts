<template>
	<el-form :model="addArticle" :rules="rules" ref="addArticleRef" label-width="100px" class="addArticleBox fx-f1"
		label-position="top">
		<el-form-item label="文章名称" prop="name">
			<el-input v-model="addArticle.name"></el-input>
		</el-form-item>
		<el-form-item label="文章摘要" prop="summary">
			<el-input v-model="addArticle.summary"></el-input>
		</el-form-item>
		<el-form-item label="正文内容" prop="content">
			<el-input type="textarea" v-model="addArticle.content"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button @click="resetForm()">重置</el-button>
			<el-button type="primary" @click="submitForm">提 交</el-button>
		</el-form-item>
	</el-form>
</template>
<script lang="ts" setup>
import { getSingleById, addSingle } from "@/api/cms"
import { reactive, ref, getCurrentInstance, computed, onMounted } from 'vue';
import type { FormInstance, FormRules } from 'element-plus'

//import { storeToRefs} from "pinia"
import { useAuth} from '@/stores';
const { proxy } = getCurrentInstance() as any

const storesAuth = useAuth()
const { user } = proxy.storeToRefs(storesAuth)

interface Article {
	user_name: string,
	user_id: string,
	name: string,
	post_id: string,
	summary: string,
	content: string,
}

// 这个也可以
// const addArticle = reactive<Article>(
// 	{
// 		user_name:"",
// 		user_id:"",
// 		name:"",
// 		post_id:"",
// 		summary:"",
// 		content:"",
// 	}
// )


const addArticle = ref<Article>(
	{
		user_name: "",
		user_id: "",
		name: "",
		post_id: "",
		summary: "",
		content: "",
	}
)

const rules = reactive<FormRules>({
	name: [
		{ required: true, message: '请输入活动名称，此不能为空', trigger: 'blur' },
	],
	content: [
		{ required: true, message: '正文内容不能为空', trigger: 'blur' },
	],

})


const resetForm = () => {
	proxy.$refs['addArticleRef'].resetFields();
}


const submitForm = () => {
	proxy.$refs["addArticleRef"].validate((valid: FormInstance | undefined) => {
		if (valid) {
			addSingleFn()
			console.log('sssss')
		} else {
			console.log('error submit!!');
			return false;
		}
	});
}

const postId = computed(() => {
	return proxy.$route.query.id || ""
})



//新增
const addSingleFn = () => {
	addArticle.value.user_name = user.value.name
	addArticle.value.user_id = user.value.id
	addArticle.value.post_id = postId.value
	let loadingMask = proxy.$loading({
		lock: true,
		background: 'rgba(0, 0, 0, 0.5)'
	});
	addSingle(addArticle.value).then((res: any) => {
		loadingMask.close();

    	const { code,data} = res
    	if (code === 20000) {
			proxy.$notify({
				message: '成功。',
				type: 'success'
			})
			proxy.$router.push('/index')
		} else {
			proxy.$notify({
				message: '失败。',
				type: 'warning'
			});
		}
	}).catch((err) => {
		loadingMask.close();
		proxy.$notify({
			message: '接口异常',
			type: 'warning'
		});
	}).finally(() => {
		loadingMask.close();
	});
}



const getSingle = () => {
	if (!postId.value) return   // this.postId值为空，就跳出getSingle()，直接执行新增addSingle()。不为空，就是编辑，会执行下面的代码
	let loadingMask = proxy.$loading({
		lock: true,
		background: 'rgba(0, 0, 0, 0.5)'
	});
	getSingleById(postId.value).then((res: any) => {


    	const { code,data} = res
    	if (code === 20000) {
			addArticle.value.name = data.name
			addArticle.value.summary = data.summary
			addArticle.value.content = data.content
		} else {
			proxy.$notify({
				message: '获取文章列表失败。',
				type: 'warning'
			});
		}
	}).catch((err) => {
		proxy.$notify({
			message: '获取文章列表接口报错。',
			type: 'warning'
		});
	}).finally(() => {
		loadingMask.close();
	});
}

onMounted(() => {
	getSingle()

})
</script>
