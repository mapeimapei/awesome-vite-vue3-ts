import { defineStore } from 'pinia';
import {authStates } from './interface';
import { Session } from '@/utils/storage';
import {loginApi} from "@/api/auth"


import { ElLoading,ElMessage  } from 'element-plus'

/**
 * 用户信息
 */
export const useAuth = defineStore('auth', {
	state: (): authStates => {
		return {
			user: null,
			token: ""
		  }
	},
	
	persist: {
		enabled: true,
		// strategies: [
		// 	{ storage: sessionStorage, paths: ['token'] }, // str 和 num
		// 	{ storage: localStorage, paths: ['user'] }, // obj 字段用 localstorage存储
		// ],
	},

	actions: {
		setUser(obj: any) {
			this.user =  obj
			// if(!!obj){
			// 	Session.set("user",obj)
			// }else{
			// 	Session.remove("user")
			// }
		},

		setToken(str: string) {
			this.token =  str
			// if(!!str){
			// 	Session.set("token",str)
			// }else{
			// 	Session.remove("token")
			// }
		},

		// 登录接口
		actionLogin(loginData:any) {

			console.log("loginData",loginData)

			const loading = ElLoading.service({
				lock: true,
				text: 'Loading',
				background: 'rgba(0, 0, 0, 0.7)',
			})
			return new Promise((resolve,reject) => {
				loginApi(loginData).then((res:any)=>{
					const { resultCode,result} = res
					if(resultCode === "20000"){
						this.setUser(result)
						this.setToken(result.token)


						// this.user= result
						// this.token= result.token
						// Session.set("user",result)
						// Session.set("token",result.token)
						// ElMessage({
						// 	message: '登录成功',
						// 	type: 'success',
						// })
						resolve(res)
					}else{
						reject(res)
					}
				}).catch((err)=>{
					console.log(err)
					reject(err)
				}).finally(()=>{
					loading.close()
				})
			});
		},
	},
});
