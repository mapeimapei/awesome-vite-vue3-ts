import { defineStore } from 'pinia';
import { DemoStates, Obj } from '../interface';
//import { Session } from '@/utils/storage';
import router from '@/router'
/**
 * 用户信息
 * @methods DemoStates 设置demo信息
 */
export default defineStore('demo', {
	state: (): DemoStates => ({
		str: "ccccc",
		num: 10,
		arr: [],
		isOk: false,
		obj: {
			name: "",
			sex: "",
			age: 20
		}
	}),
	persist: {
		enabled: true,
		strategies: [
			{key: "useDemo", storage: sessionStorage, paths: ['str', 'num'] }, // str 和 num
			{key: "useDemo", storage: localStorage, paths: ['obj','arr','isOk'] }, // obj 字段用 localstorage存储
		],
	},
	actions: {

		routerDemo() {
			router.push("/blog/posts")
		},

		routerDemo2(id: string) {
			router.push({ name: 'addSingle', query: { id: id } })
		},


		async setIsOk(val: boolean) {
			this.isOk = val
		},

		async setStr(str: string) {
			this.str = str
		},

		async setObj(obj: Obj) {
			this.obj = obj
		},

		async setDemo(infos: any) {
			//const infos: any = await this.getApiDemoInfo();
			let { str, num, arr, obj, isOk } = infos
			this.str = str
			this.num = num
			this.arr = arr
			this.obj = obj
			this.isOk = isOk
		},

		// 模拟接口数据
		async getApiDemoInfo(): Promise<any> {
			return new Promise((resolve) => {
				setTimeout(() => {
					// 模拟数据
					const infos: DemoStates = {
						str: "123",
						num: 22222,
						arr: ["a", "b", "ccccc"],
						isOk: true,
						obj: {
							name: "daitu",
							sex: "men",
							age: 20
						}
					};
					resolve(infos);
				}, 1000);
			});
		},
	},

	getters: {
		str2: (state) => state.str + "_11111111111111111",
		getStr3: (state) => {
			// return (userId) => state.users.find((user) => user.id === userId)
			return (userId: string) => state.str + userId
		},
	},

});
