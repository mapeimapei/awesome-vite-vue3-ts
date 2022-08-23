import { defineStore } from 'pinia';
import {authStates } from './interface';
import { Session } from '@/utils/storage';
import {loginApi} from "@/api/auth"
/**
 * 用户信息
 * @methods DemoStates 设置demo信息
 */
export const useAuth = defineStore('auth', {
	state: (): authStates => ({
		user: Session.get("user"),
		token: Session.get("token")
	}),
	actions: {
		setUser(obj: any) {
			this.user =  obj
		},

		setToken(str: string) {
			this.token =  str
		},

		// 模拟接口数据
		actionLogin(loginData:any) {
			return new Promise((resolve,reject) => {
				loginApi(loginData).then((res:any)=>{
					//console.log(res)
					const { resultCode,result} = res
					if(resultCode === "20000"){
						//this.setUser(result)
						this.user= result
						this.token= result.token
						Session.set("user",result)
						Session.set("token",result.token)
						resolve(res)
					}else{
						reject(res)
					}
				}).catch((err)=>{
					console.log(err)
					reject(err)
				})
			});
		},
	},
});
