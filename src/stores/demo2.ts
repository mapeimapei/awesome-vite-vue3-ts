import { defineStore } from 'pinia';
import { DemoStates, Obj } from './interface';
//import { Session } from '@/utils/storage';
import router from '@/router'
/**
 * 用户信息
 * @methods DemoStates 设置demo信息
 */
export const useDemo2 = defineStore('demo2', {
	state: (): any => ({
		str2: "str2str2str2str2str2",
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
		getStr2: (state) => state.str2 + "_11111111111111111",
	},

});
