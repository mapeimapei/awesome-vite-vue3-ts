/**
 * 定义接口来定义对象的类型
 * `stores` 全部类型定义在这里
**/

// 登陆信息
export interface authStates {
    user: any,
    access_token: string,
    refresh_token: string,
}



export interface Obj {
	name:string,
	sex:string,
	age?:number
}

// 用户信息
export interface DemoStates {
	str: string,
	num: number,
	arr: string[],
	isOk: Boolean,
	obj: Obj
}