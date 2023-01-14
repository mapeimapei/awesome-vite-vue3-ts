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
			access_token: "",
			refresh_token: "",
		  }
	},
	
	persist: {
		enabled: true,
		// strategies: [
		// 	{ storage: sessionStorage, paths: ['access_token','refresh_token'] }, // str 和 num
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
			this.access_token =  str
			// if(!!str){
			// 	Session.set("access_token",str)
			// }else{
			// 	Session.remove("access_token")
			// }
		},

		setRefreshToken(str: string) {
			this.refresh_token =  str
			// if(!!str){
			// 	Session.set("refresh_token",str)
			// }else{
			// 	Session.remove("refresh_token")
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
					const { code,data} = res
					if(code === 20000){
						this.setUser(data)
						this.setToken(data.access_token)
						this.setRefreshToken(data.refresh_token)


						// this.user= data
						// this.access_token= data.access_token
						// Session.set("user",data)
						// Session.set("access_token",data.access_token)
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
