import { defineStore } from 'pinia';
import { DemoStates,Obj } from './interface';
//import { Session } from '@/utils/storage';

/**
 * 用户信息
 * @methods DemoStates 设置demo信息
 */
export const useDemo = defineStore('demo', {
	state: (): DemoStates => ({
		str: "ccccc",
		num: 10,
		arr: [],
		isOk: false,
		obj: {
			name:"",
			sex:"",
			age:20
		}
	}),
	actions: {

		async setIsOk(val: boolean) {
			this.isOk =  val
		},

		async setStr(str: string) {
			this.str =  str
		},

		async setObj(obj: Obj) {
			this.obj =  obj
		},

		async setDemo() {
			const infos: any = await this.getApiDemoInfo();
			let {str,num,arr,obj,isOk} = infos
			this.str = str
			this.num = num
			this.arr = arr
			this.obj = obj
			this.isOk = isOk
		},

		// 模拟接口数据
		async getApiDemoInfo() {
			return new Promise((resolve) => {
				setTimeout(() => {
					// 模拟数据
					const infos:DemoStates = {
						str: "123",
						num: 22222,
						arr: ["a","b","ccccc"],
						isOk: true,
						obj: {
							name:"daitu",
							sex:"men",
							age:20
						}
					};
					resolve(infos);
				}, 1000);
			});
		},
	},
});
