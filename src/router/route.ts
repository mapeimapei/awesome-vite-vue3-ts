import { RouteRecordRaw } from 'vue-router';
/**
 * 定义静态路由（默认路由）
 * 此路由不要动，前端添加路由的话，请在 `dynamicRoutes 数组` 中添加
 * @description 前端控制直接改 dynamicRoutes 中的路由，后端控制不需要修改，请求接口路由数据时，会覆盖 dynamicRoutes 第一个顶级 children 的内容（全屏，不包含 layout 中的路由出口）
 * @returns 返回路由菜单数据
 */
export const staticRoutes: Array<RouteRecordRaw> = [
	// {
	// 	path: '/login',
	// 	name: 'login',
	// 	component: () => import('@/views/login/index.vue'),
	// 	meta: {
	// 		title: '登录',
	// 	},
	// },
	/**
	 * 提示：写在这里的为全屏界面，不建议写在这里
	 * 请写在 `dynamicRoutes` 路由数组中
	 */

	 
	{
		path: '/demo',
		name: 'demoIndex',
		redirect: { name: 'demo' },
		component: () => import('@/views/demo/index.vue'),
		meta: {
			title: 'demo',
		},
		children:[
			{
				path: 'demo',
				name: 'demo',
				component: () => import('@/views/demo/demo.vue'),
				meta: {
					title: 'demo',
				},
			},
		
			{
				path: 'demo1',
				name: 'demo1',
				component: () => import('@/views/demo/demo1.vue'),
				meta: {
					title: 'demo1',
				},
			},
		
			{
				path: 'demo2',
				name: 'demo2',
				component: () => import('@/views/demo/demo2.vue'),
				meta: {
					title: 'demo2',
				},
			},
		
			{
				path: 'demo3',
				name: 'demo3',
				component: () => import('@/views/demo/demo3.vue'),
				meta: {
					title: 'demo3',
				},
			},
		
		
			{
				path: 'store',
				name: 'store',
				component: () => import('@/views/demo/store.vue'),
				meta: {
					title: 'store',
				},
			},
			{
				path: 'request',
				name: 'request',
				component: () => import('@/views/demo/request.vue'),
				meta: {
					title: 'request',
				},
			},
		]
	},



    {
		path: "/:catchAll(.*)", // 不识别的path自动匹配404
        redirect: '/demo'
    }


];
