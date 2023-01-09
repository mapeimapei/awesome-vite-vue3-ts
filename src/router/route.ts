import { RouteRecordRaw } from 'vue-router';

import blog from './blog'
import shop from './shop'
import demo from './demo'
import flask from './flask'


const staticRoutes: Array<RouteRecordRaw> = [
	{
		path: "/:catchAll(.*)", // 不识别的path自动匹配404
		redirect: '/blog'
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login.vue'),
		meta: {
			title: '登录',
		},
	},
	blog,
	shop,
	demo,
	flask
]

export default staticRoutes
