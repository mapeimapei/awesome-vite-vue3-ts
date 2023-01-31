import { defineStore } from 'pinia';
import { DemoStates, Obj } from '../interface';
//import { Session } from '@/utils/storage';
import router from '@/router'
/**
 * 用户信息
 * @methods DemoStates 设置demo信息
 */
export default defineStore('demo2', {
	state: (): any => ({
		str2: "useDemo2useDemo2useDemo2",
	}),
	persist: {
		enabled: true,
		strategies: [
			{key: "useDemo", storage: sessionStorage, paths: ['str', 'num'] }, // str 和 num
			{key: "useDemo", storage: localStorage, paths: ['obj','arr','isOk'] }, // obj 字段用 localstorage存储
		],
	},
	actions: {

	},

	getters: {
		demoStr1: (state) => state.str2 + "_11111111111111111",
		demoStr2: (state) => {
			// return (userId) => state.users.find((user) => user.id === userId)
			return (userId: string) => state.str2 + userId
		},
	},

});
